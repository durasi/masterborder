#!/usr/bin/env python3
"""Extend stream_pipeline.py to grade confidence in parallel with the
harmonizer and the conflict extractor.

Three precise edits:

  1) Add ``from backend.agents.confidence_grader import grade_confidence``
     next to the extract_conflicts import.
  2) Add ``_safe_grade()`` wrapper alongside ``_safe_harmonize`` and
     ``_safe_extract``.
  3) Extend the asyncio.gather to three tasks, merge the grades into the
     country_reports in place, and roll the grader's tokens into the
     aggregate usage number.

Idempotent: skips if grade_confidence is already wired up.
"""

from pathlib import Path
import sys

PIPE = Path("backend/agents/stream_pipeline.py")
if not PIPE.exists():
    print("ERROR: " + str(PIPE) + " not found.")
    sys.exit(1)

src = PIPE.read_text(encoding="utf-8")

if "grade_confidence" in src:
    print("stream_pipeline.py already wires grade_confidence — no-op.")
    sys.exit(0)

# --- Edit 1: import ---------------------------------------------------------

OLD_IMPORT = "from backend.agents.conflict_extractor import extract_conflicts\n"
NEW_IMPORT = (
    "from backend.agents.conflict_extractor import extract_conflicts\n"
    "from backend.agents.confidence_grader import grade_confidence\n"
)
if OLD_IMPORT not in src:
    print("ERROR: could not find the conflict_extractor import to extend.")
    sys.exit(2)
src = src.replace(OLD_IMPORT, NEW_IMPORT, 1)

# --- Edit 2 + 3: gather block ----------------------------------------------

OLD_BLOCK = """    # Run the harmonizer and the conflict extractor in parallel. The extractor
    # is best-effort (Haiku 4.5, ~2-3 s) and typically finishes well before
    # the harmonizer (Opus 4.7, ~15-20 s), so it's effectively free latency.
    # Any extractor failure is contained: we fall back to an empty conflicts
    # list and continue serving the primary result.
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

    harmonize_result, extract_result = await asyncio.gather(
        _safe_harmonize(), _safe_extract()
    )

    if isinstance(harmonize_result, Exception):
        response.summary = None
        response.conflicts = extract_result[0] if extract_result else []
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
        total_in + harm_in + conf_in, total_out + harm_out + conf_out
    )
    response.completed_at = datetime.utcnow()

    yield (
        "done",
        {
            "response": response.model_dump(mode="json"),
            "errors": errors,  # partial failures, if any
        },
    )
"""

NEW_BLOCK = """    # Run the harmonizer, the conflict extractor, and the confidence grader
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
"""

if OLD_BLOCK not in src:
    print(
        "ERROR: could not find the existing gather block to extend. The "
        "file layout may have drifted; please wire grade_confidence in "
        "manually next to harmonize and extract_conflicts."
    )
    sys.exit(3)

src = src.replace(OLD_BLOCK, NEW_BLOCK, 1)

PIPE.write_text(src, encoding="utf-8")
print("✓ stream_pipeline.py now runs harmonize + extract + grade in parallel.")
