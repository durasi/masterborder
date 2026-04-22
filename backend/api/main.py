"""MasterBorder FastAPI application — HTTP interface for the agent pipeline.

Exposes the full analysis workflow as REST endpoints for the Next.js frontend:
- POST /api/analyze → run parallel Country Agents + Harmonizer
- GET  /api/jobs/{job_id} → retrieve cached analysis result
- POST /api/recommend/{job_id}/{country} → Recommendation Agent (first or follow-up)

In-memory job cache is used for simplicity. Production would use Redis or SQLite
for persistence, but for the hackathon MVP this is sufficient.

Rate limiting: SlowAPI middleware enforces per-IP limits to protect API credit
budget in public deployments (Railway).
"""

import os
from datetime import datetime
from typing import Any

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from slowapi import Limiter
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

from backend.agents.harmonizer import harmonize
from backend.agents.pipeline import run_pipeline
from backend.api.stats import stats
from backend.agents.recommender import recommend_for_country
from backend.schemas.models import (
    AnalysisRequest,
    AnalysisResponse,
    CountryCode,
    TokenUsage,
)

# ───────────────────────────────────────────────────────────────
# Rate limiter (per-IP)
# ───────────────────────────────────────────────────────────────
# Analyze is the expensive endpoint (up to 5 Opus 4.7 calls per request).
# Limit to 5 per IP per day to protect the $500 hackathon credit budget.
# Recommend is cheaper but can still be abused; limit to 20 per IP per day.

limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="MasterBorder API",
    description="Cross-border trade compliance dashboard — built with Opus 4.7",
    version="0.5.0",
)

app.state.limiter = limiter


# Custom 429 handler that returns JSON with a user-friendly message.
# The frontend keys off the `detail.code` field to show the daily-limit UI.
@app.exception_handler(RateLimitExceeded)
async def rate_limit_exceeded_handler(
    request: Request, exc: RateLimitExceeded
) -> JSONResponse:
    return JSONResponse(
        status_code=429,
        content={
            "detail": {
                "code": "rate_limit_exceeded",
                "message": (
                    "Daily limit reached. To keep this public demo affordable, "
                    "each visitor can run a limited number of analyses per day. "
                    "Please try again in 24 hours, or clone the repo on GitHub "
                    "to run MasterBorder locally with your own API key."
                ),
                "limit": str(exc.detail),
                "retry_after_seconds": 86400,
            }
        },
        headers={"Retry-After": "86400"},
    )


# CORS: allow the Next.js frontend (local + Vercel deploy) to call this API
DEFAULT_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://masterborder.vercel.app",
]
extra_origins = os.getenv("ALLOWED_ORIGINS", "")
if extra_origins:
    DEFAULT_ORIGINS.extend(
        origin.strip() for origin in extra_origins.split(",") if origin.strip()
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=DEFAULT_ORIGINS,
    allow_origin_regex=r"https://.*\.vercel\.app",  # allow Vercel preview deployments
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory caches (process-local, reset on restart — acceptable for hackathon MVP)
_job_cache: dict[str, AnalysisResponse] = {}
_conversation_cache: dict[tuple[str, str], list[dict[str, str]]] = {}


# ───────────────────────────────────────────────────────────────
# Health & info
# ───────────────────────────────────────────────────────────────

@app.get("/")
async def root() -> dict[str, Any]:
    """API info and endpoint map."""
    return {
        "service": "MasterBorder API",
        "version": "0.5.0",
        "status": "ok",
        "timestamp": datetime.utcnow().isoformat(),
        "endpoints": {
            "POST /api/analyze": "Run parallel compliance analysis (5/day per IP)",
            "GET /api/jobs/{job_id}": "Retrieve analysis result by job_id",
            "POST /api/recommend/{job_id}/{country}": "Deep-dive (20/day per IP)",
            "GET /health": "Health check",
            "GET /docs": "Interactive API documentation (Swagger UI)",
        },
        "jobs_cached": len(_job_cache),
    }


@app.get("/health")
async def health() -> dict[str, str]:
    """Simple health check for deploy monitoring."""
    return {"status": "healthy"}


# ───────────────────────────────────────────────────────────────
# Analysis — main pipeline endpoint
# ───────────────────────────────────────────────────────────────

@app.post("/api/analyze", response_model=AnalysisResponse)
@limiter.limit("5/day")
async def analyze(
    request: Request,  # required by slowapi to resolve client IP
    body: AnalysisRequest,
) -> AnalysisResponse:
    """Run the full MasterBorder pipeline.

    Steps (all in this single call):
      1. Parallel Country Agents (asyncio.gather) — one per target country.
      2. Harmonization Agent — produces executive summary.

    Returns the full AnalysisResponse including per-country reports and
    the harmonizer's summary. The response is cached by job_id for later
    retrieval via GET /api/jobs/{job_id} and for Recommendation follow-ups.

    Typical duration: ~30 seconds for 3 countries (parallel).
    Rate limit: 5 analyses per IP per day (to protect API credit budget).
    """
    try:
        response = await run_pipeline(body)
        summary_text, (harm_in, harm_out) = await harmonize(response, body.preferred_language)
        response.summary = summary_text
        # Add harmonizer's token usage to the pipeline's aggregate
        if response.token_usage:
            response.token_usage = TokenUsage.from_counts(
                response.token_usage.input_tokens + harm_in,
                response.token_usage.output_tokens + harm_out,
            )
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {exc}") from exc

    _job_cache[response.job_id] = response
    # Track usage (privacy-preserving: only hashed IP is stored)
    client_ip = request.client.host if request.client else "unknown"
    stats.record_analysis(client_ip, [c.value for c in body.target_countries])
    return response


@app.get("/api/jobs/{job_id}", response_model=AnalysisResponse)
async def get_job(job_id: str) -> AnalysisResponse:
    """Retrieve a cached analysis result by job_id."""
    if job_id not in _job_cache:
        raise HTTPException(
            status_code=404,
            detail=f"Job {job_id} not found. It may have expired or the backend restarted.",
        )
    return _job_cache[job_id]


# ───────────────────────────────────────────────────────────────
# Recommendation — interactive HITL deep-dive
# ───────────────────────────────────────────────────────────────

class RecommendRequest(BaseModel):
    """Request payload for the Recommendation endpoint.

    For the first call: omit `user_question` (agent produces the initial plan).
    For follow-ups: provide `user_question`; previous history is auto-loaded
    from the server-side conversation cache.
    """
    user_question: str | None = Field(
        default=None,
        description="Follow-up question. Omit on first call to get the initial deep-dive.",
    )
    reset_conversation: bool = Field(
        default=False,
        description="If true, clears the conversation history for this (job, country) pair.",
    )
    preferred_language: str = Field(
        default="en",
        description="ISO 639-1 language code (en, tr, es, fr, de, etc.) for the response.",
    )


class RecommendResponse(BaseModel):
    country: CountryCode
    job_id: str
    message: str = Field(..., description="Markdown response from the Recommendation Agent.")
    turn_number: int = Field(..., description="1 for initial plan, >1 for follow-ups.")


@app.post("/api/recommend/{job_id}/{country}", response_model=RecommendResponse)
@limiter.limit("20/day")
async def recommend(
    request: Request,  # required by slowapi to resolve client IP
    job_id: str,
    country: CountryCode,
    body: RecommendRequest,
) -> RecommendResponse:
    """Generate a deep-dive for the chosen country or answer a follow-up.

    Rate limit: 20 recommendations per IP per day.
    """
    if job_id not in _job_cache:
        raise HTTPException(
            status_code=404,
            detail=f"Job {job_id} not found. Run POST /api/analyze first.",
        )

    response = _job_cache[job_id]
    cache_key = (job_id, country.value)

    if body.reset_conversation:
        _conversation_cache.pop(cache_key, None)

    history = _conversation_cache.get(cache_key)

    if history and not body.user_question:
        raise HTTPException(
            status_code=400,
            detail="A follow-up call requires `user_question`. "
                   "Set reset_conversation=true to start over.",
        )

    try:
        message = await recommend_for_country(
            response=response,
            chosen_country=country,
            conversation_history=history,
            user_question=body.user_question,
            language=body.preferred_language,
        )
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Recommendation failed: {exc}") from exc

    if not history:
        new_history = [
            {
                "role": "user",
                "content": f"I've chosen to focus on {country.value}. Give me the full go-to-market plan.",
            },
            {"role": "assistant", "content": message},
        ]
    else:
        new_history = history + [
            {"role": "user", "content": body.user_question},
            {"role": "assistant", "content": message},
        ]

    _conversation_cache[cache_key] = new_history
    turn_number = len(new_history) // 2

    # Track deep-dive usage (privacy-preserving: no raw IP stored)
    client_ip = request.client.host if request.client else "unknown"
    stats.record_recommend(client_ip)

    return RecommendResponse(
        country=country,
        job_id=job_id,
        message=message,
        turn_number=turn_number,
    )

@app.get("/api/stats")
async def get_stats() -> dict:
    """Public usage stats for the landing-page counter.

    Returns in-memory counters that reset on Railway redeploys — good enough
    for a hackathon demo and a live "X analyses served" counter on the site.
    Values are aggregate only; no per-user data is ever exposed.

    Response shape:
        {
            "total_analyses": int,
            "total_recommends": int,
            "unique_users": int,
            "last_24h": int,
            "last_7d": int,
            "top_countries": [{"country": "US", "count": 7}, ...],
            "server_time": "2026-04-22T12:34:56+00:00"
        }
    """
    return stats.snapshot()
