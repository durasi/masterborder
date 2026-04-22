"""MasterBorder FastAPI application — HTTP interface for the agent pipeline.

Exposes the full analysis workflow as REST endpoints for the Next.js frontend:
- POST /api/analyze → run parallel Country Agents + Harmonizer
- GET  /api/jobs/{job_id} → retrieve cached analysis result
- POST /api/recommend/{job_id}/{country} → Recommendation Agent (first or follow-up)

In-memory job cache is used for simplicity. Production would use Redis or SQLite
for persistence, but for the hackathon MVP this is sufficient.
"""

from datetime import datetime
from typing import Any

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from backend.agents.harmonizer import harmonize
from backend.agents.pipeline import run_pipeline
from backend.agents.recommender import recommend_for_country
from backend.schemas.models import (
    AnalysisRequest,
    AnalysisResponse,
    CountryCode,
)

app = FastAPI(
    title="MasterBorder API",
    description="Cross-border trade compliance dashboard — built with Opus 4.7",
    version="0.3.0",
)

# CORS: allow the Next.js frontend (local + Vercel deploy) to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://masterborder.vercel.app",
        "https://*.vercel.app",  # Vercel preview deployments
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory cache: job_id → AnalysisResponse
# NOTE: Process-local. If backend restarts or runs multiple workers, cache is lost.
# Acceptable for hackathon MVP.
_job_cache: dict[str, AnalysisResponse] = {}

# Conversation history cache: (job_id, country_code) → list of messages
_conversation_cache: dict[tuple[str, str], list[dict[str, str]]] = {}


# ───────────────────────────────────────────────────────────────
# Health & info
# ───────────────────────────────────────────────────────────────

@app.get("/")
async def root() -> dict[str, Any]:
    """API info and endpoint map."""
    return {
        "service": "MasterBorder API",
        "version": "0.3.0",
        "status": "ok",
        "timestamp": datetime.utcnow().isoformat(),
        "endpoints": {
            "POST /api/analyze": "Run parallel compliance analysis across target countries",
            "GET /api/jobs/{job_id}": "Retrieve analysis result by job_id",
            "POST /api/recommend/{job_id}/{country}": "Deep-dive for chosen country (first call or follow-up)",
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
async def analyze(request: AnalysisRequest) -> AnalysisResponse:
    """Run the full MasterBorder pipeline.

    Steps (all in this single call):
      1. Parallel Country Agents (asyncio.gather) — one per target country.
      2. Harmonization Agent — produces executive summary.

    Returns the full AnalysisResponse including per-country reports and
    the harmonizer's summary. The response is cached by job_id for later
    retrieval via GET /api/jobs/{job_id} and for Recommendation follow-ups.

    Typical duration: ~30 seconds for 3 countries (parallel).
    """
    try:
        response = await run_pipeline(request)
        response.summary = await harmonize(response)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {exc}") from exc

    _job_cache[response.job_id] = response
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


class RecommendResponse(BaseModel):
    country: CountryCode
    job_id: str
    message: str = Field(..., description="Markdown response from the Recommendation Agent.")
    turn_number: int = Field(..., description="1 for initial plan, >1 for follow-ups.")


@app.post("/api/recommend/{job_id}/{country}", response_model=RecommendResponse)
async def recommend(
    job_id: str,
    country: CountryCode,
    body: RecommendRequest,
) -> RecommendResponse:
    """Generate a deep-dive for the chosen country or answer a follow-up."""
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

    # Validate: follow-up calls need a question
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
        )
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Recommendation failed: {exc}") from exc

    # Update conversation cache
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

    return RecommendResponse(
        country=country,
        job_id=job_id,
        message=message,
        turn_number=turn_number,
    )
