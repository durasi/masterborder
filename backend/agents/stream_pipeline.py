"""Streaming pipeline — produces Server-Sent Events as each agent completes.

Unlike ``pipeline.run_pipeline`` which blocks until every Country Agent finishes
and returns the whole response at once, this variant yields JSON-serialisable
events the instant each agent completes. It is consumed by the ``/api/analyze/stream``
endpoint so the frontend can render live telemetry (per-country duration, tokens,
risk level) while the analysis is still running.

The non-streaming ``pipeline.run_pipeline`` is intentionally kept untouched; the
existing ``/api/analyze`` endpoint, tests, and CLI entrypoint continue to rely on
it. Any bug here cannot regress the stable path.
"""

from __future__ import annotations

import asyncio
import time
import uuid
from datetime import datetime
from typing import AsyncIterator

from backend.agents.harmonizer import harmonize
from backend.agents.conflict_extractor import extract_conflicts
from backend.agents.confidence_grader import grade_confidence
from backend.countries.agent import analyze_country
from backend.schemas.models import (
    AnalysisRequest,
    AnalysisResponse,
    CountryCode,
    CountryReport,
    TokenUsage,
)


async def _wrap_agent(
    country: CountryCode,
    request: AnalysisRequest,
) -> tuple[CountryCode, CountryReport, tuple[int, int], float, Exception | None]:
    """Run one Country Agent; capture duration + error without propagating.

    Returning the exception instead of raising lets the streaming loop decide
    how to surface per-agent failures without aborting the whole pipeline.
    """
    started = time.perf_counter()
    try:
        report, (tok_in, tok_out) = await analyze_country(
            request.product, country, request.preferred_language
        )
    except Exception as exc:  # noqa: BLE001 — we intentionally capture & report
        elapsed = time.perf_counter() - started
        return country, None, (0, 0), elapsed, exc  # type: ignore[return-value]

    elapsed = time.perf_counter() - started
    return country, report, (tok_in, tok_out), elapsed, None


async def stream_pipeline(
    request: AnalysisRequest,
) -> AsyncIterator[tuple[str, dict]]:
    """Yield ``(event_name, payload)`` tuples as the pipeline progresses.

    Event sequence:
      1. ``started``          — once, with job metadata and the country list.
      2. ``agent_start``      — once per target country (fired as tasks are scheduled).
      3. ``agent_complete``   — as each country finishes (in completion order).
      4. ``harmonize_start``  — when all agents have finished.
      5. ``done``             — final AnalysisResponse payload, fully harmonised.
      6. ``error``            — only on catastrophic failure.

    The caller (the SSE endpoint) is responsible for serialising each payload
    to JSON and framing it as ``event: <name>\\ndata: <json>\\n\\n``.
    """
    job_id = str(uuid.uuid4())
    created_at = datetime.utcnow()
    countries = list(request.target_countries)

    yield (
        "started",
        {
            "job_id": job_id,
            "total_countries": len(countries),
            "countries": [c.value for c in countries],
            "created_at": created_at.isoformat(),
        },
    )

    # Fire every Country Agent as an independent task so as_completed can
    # surface each one the instant it finishes — that's the whole point of
    # this endpoint vs. asyncio.gather in pipeline.py.
    tasks = {
        asyncio.create_task(_wrap_agent(c, request)): c for c in countries
    }

    for c in countries:
        yield ("agent_start", {"country": c.value})

    reports: list[CountryReport] = []
    total_in = 0
    total_out = 0
    errors: list[dict] = []

    for task in asyncio.as_completed(tasks):
        country, report, (tok_in, tok_out), elapsed_s, exc = await task

        if exc is not None or report is None:
            errors.append({"country": country.value, "error": str(exc)})
            yield (
                "agent_complete",
                {
                    "country": country.value,
                    "status": "error",
                    "duration_s": round(elapsed_s, 2),
                    "error": str(exc),
                },
            )
            continue

        reports.append(report)
        total_in += tok_in
        total_out += tok_out

        yield (
            "agent_complete",
            {
                "country": country.value,
                "status": "ok",
                "duration_s": round(elapsed_s, 2),
                "tokens": {"input": tok_in, "output": tok_out},
                "hs_code": report.hs_code,
                "tariff_rate": report.tariff_rate,
                "findings_count": len(report.findings),
                "risk": report.overall_risk.value,
            },
        )

    if not reports:
        yield (
            "error",
            {
                "message": "All Country Agents failed. See per-agent errors.",
                "errors": errors,
            },
        )
        return

    yield ("harmonize_start", {"agents_succeeded": len(reports)})

    # Sort reports to match the order the caller requested, for a deterministic
    # Results page regardless of completion order.
    order_index = {c: i for i, c in enumerate(countries)}
    reports.sort(key=lambda r: order_index.get(r.country, 999))

    response = AnalysisResponse(
        job_id=job_id,
        created_at=created_at,
        completed_at=datetime.utcnow(),
        request=request,
        country_reports=reports,
        summary=None,
        token_usage=TokenUsage.from_counts(total_in, total_out),
    )

    # Run the harmonizer, the conflict extractor, and the confidence grader
    # in parallel. All three are Opus 4.7 calls, and all three are
    # best-effort: any of them can fail without taking down the primary
    # analysis. asyncio.gather keeps the latency bounded by the slowest of
    # the three, which in practice is the harmonizer.
    async def _safe_harmonize():
        try:
            return await harmonize(response, request.preferred_language)
        except Exception as exc:  # noqa: BLE001
            return exc

    async def _safe_extract():
        try:
            return await extract_conflicts(
                response, None, request.preferred_language
            )
        except Exception:  # noqa: BLE001
            return [], (0, 0)

    async def _safe_grade():
        try:
            return await grade_confidence(response)
        except Exception:  # noqa: BLE001
            return {}, (0, 0)

    harmonize_result, extract_result, grade_result = await asyncio.gather(
        _safe_harmonize(), _safe_extract(), _safe_grade()
    )

    # Merge grader output into country_reports in place. Missing keys mean
    # the UI simply hides the badge for that finding.
    grade_map, (grade_in, grade_out) = grade_result
    if grade_map:
        for r in response.country_reports:
            for f in r.findings:
                key = (r.country, f.title)
                if key in grade_map:
                    f.confidence = grade_map[key]

    if isinstance(harmonize_result, Exception):
        response.summary = None
        response.conflicts = extract_result[0] if extract_result else []
        response.token_usage = TokenUsage.from_counts(
            total_in + grade_in, total_out + grade_out
        )
        yield (
            "done",
            {
                "response": response.model_dump(mode="json"),
                "harmonizer_error": str(harmonize_result),
                "errors": errors,
            },
        )
        return

    summary_text, (harm_in, harm_out) = harmonize_result
    conflicts_list, (conf_in, conf_out) = extract_result

    response.summary = summary_text
    response.conflicts = conflicts_list
    response.token_usage = TokenUsage.from_counts(
        total_in + harm_in + conf_in + grade_in,
        total_out + harm_out + conf_out + grade_out,
    )
    response.completed_at = datetime.utcnow()

    yield (
        "done",
        {
            "response": response.model_dump(mode="json"),
            "errors": errors,  # partial failures, if any
        },
    )
