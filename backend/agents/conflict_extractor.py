"""Conflict Extraction Agent — structured cross-market divergence extractor.

After the Country Agents finish and while the Harmonizer is writing its
executive summary, this agent runs in parallel to extract explicit
cross-market conflicts (HS code mismatches, divergent labeling rules,
certification differences, documentation gaps, tariff asymmetries). The
result is a structured list that the frontend renders as a dedicated
"Cross-market conflicts" card at the top of the Results page.

Why a separate agent instead of folding this into the Harmonizer?
  * The Harmonizer's markdown output is fragile — any schema-forcing prompt
    edit risks breaking its formatting in the 16 target languages.
  * Running conflict extraction as a dedicated Opus 4.7 call in parallel
    with the harmonizer keeps each agent's prompt focused on one task,
    which improves structured-output reliability.
  * Keeping conflict extraction in one focused agent makes it straight-
    forward to unit-test and evolve independently.

Latency: runs concurrently with the Harmonizer via asyncio.gather in
stream_pipeline, so it adds no wall-clock time to the user-visible path.
"""

from __future__ import annotations

import json
import os
import re

from anthropic import AsyncAnthropic
from dotenv import load_dotenv

from backend.schemas.models import (
    AnalysisResponse,
    Conflict,
    ConflictType,
    CountryCode,
    CountryReport,
)

load_dotenv()

MODEL = "claude-opus-4-7"


SYSTEM_PROMPT = """You extract structured CROSS-MARKET CONFLICTS from a set of
country compliance reports for one product.

A conflict is a concrete disagreement between two or more destination markets
that the seller needs to reconcile. Good examples:
  - HS classification differs: 4202.31 in US vs 4202.32 in DE
  - Labeling language differs: Japanese JIS mark required in JP, English origin
    statement required in UK
  - Certification differs: UKCA required in GB, CE required in DE, neither
    required in US
  - Documentation differs: REACH test report required for EU, UFLPA attestation
    required for US
  - Tariff treatment differs: MFN 8% in US vs free (FTA) in DE

What is NOT a conflict:
  - A single-country requirement with no counterpart elsewhere
  - "Both countries require X" — that's shared, not a conflict
  - Generic differences in language or currency

For each conflict you find, emit an object with exactly these fields:
  {
    "type": "hs_code" | "labeling" | "certification" | "documentation" | "tariff" | "other",
    "countries": ["US","DE"],   // ISO-2 codes, 2+ entries
    "title": "HS code differs", // 3-5 words, no trailing period
    "detail": "4202.31 (US) vs 4202.32 (DE)",  // concrete facts, under 90 chars
    "impact": "Duty rate 8% vs 3.7% - pricing needs per-market adjustment"
               // 1 sentence, what the seller must DO about it, under 140 chars
  }

Return a JSON object with a single key "conflicts" whose value is an array.
Return an empty array if there are no genuine cross-market conflicts.

Output strictly valid JSON. No markdown fences. No prose outside the JSON.

Write the human-readable fields (title, detail, impact) in this language:
{output_language}. Keep ISO codes and numbers untouched regardless of language.
"""


def _country_reports_brief(reports: list[CountryReport]) -> str:
    """Compact textual snapshot of all country reports for the extractor prompt.

    We feed the extractor a trimmed view — HS code, tariff, top findings — rather
    than the full markdown bodies, both to stay well within the model context window and
    to keep costs predictable regardless of how verbose the Country Agents were.
    """
    lines: list[str] = []
    for r in reports:
        lines.append(f"## {r.country.value}")
        if r.hs_code:
            lines.append(f"HS code: {r.hs_code}")
        if r.tariff_rate is not None:
            lines.append(f"Tariff rate: {r.tariff_rate}")
        lines.append(f"Overall risk: {r.overall_risk.value}")
        if r.findings:
            lines.append("Findings:")
            for f in r.findings[:12]:
                citation = f" [{f.citation}]" if f.citation else ""
                lines.append(
                    f"  - ({f.risk_level.value}) [{f.category}] {f.title}: {f.detail}{citation}"
                )
        lines.append("")
    return "\n".join(lines)


def _sanitize_conflict_dict(raw: dict) -> Conflict | None:
    """Coerce a single extractor-output dict into a valid Conflict or None.

    Defensive normalisation: unknown conflict types become OTHER, unknown
    country codes are dropped, conflicts with fewer than 2 valid countries
    are discarded, and missing/blank string fields cause the row to be
    skipped. Returning None signals skip.
    """
    try:
        type_raw = str(raw.get("type", "other")).strip().lower()
        try:
            conflict_type = ConflictType(type_raw)
        except ValueError:
            conflict_type = ConflictType.OTHER

        countries_raw = raw.get("countries") or []
        countries: list[CountryCode] = []
        for code in countries_raw:
            try:
                countries.append(CountryCode(str(code).upper()))
            except ValueError:
                continue
        if len(countries) < 2:
            return None

        title = str(raw.get("title", "")).strip()
        detail = str(raw.get("detail", "")).strip()
        impact = str(raw.get("impact", "")).strip()
        if not (title and detail and impact):
            return None

        return Conflict(
            type=conflict_type,
            countries=countries,
            title=title[:120],
            detail=detail[:200],
            impact=impact[:240],
        )
    except Exception:  # noqa: BLE001 — any parse error means skip
        return None


_JSON_BLOCK_RE = re.compile(r"\{[\s\S]*\}")


async def extract_conflicts(
    response: AnalysisResponse,
    harmonizer_summary: str | None,
    preferred_language: str = "en",
) -> tuple[list[Conflict], tuple[int, int]]:
    """Run the Conflict Extractor agent.

    Returns ``(conflicts, (input_tokens, output_tokens))``. On any unrecoverable
    error (API failure, unparseable output) returns ``([], (0, 0))`` - conflict
    detection is best-effort and must never block the primary analysis result.
    """
    if len(response.country_reports) < 2:
        # Can't have a cross-market conflict with fewer than two markets.
        return [], (0, 0)

    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        return [], (0, 0)

    client = AsyncAnthropic(api_key=api_key)

    brief = _country_reports_brief(response.country_reports)
    summary_excerpt = (harmonizer_summary or "")[:4000]
    user_prompt = (
        "Country reports:\n\n"
        f"{brief}\n\n"
        "Harmonizer summary (excerpt):\n\n"
        f"{summary_excerpt}\n\n"
        "Return the JSON object now."
    )

    system = SYSTEM_PROMPT.replace(
        "{output_language}", preferred_language or "en"
    )

    try:
        msg = await client.messages.create(
            model=MODEL,
            max_tokens=1500,
            system=system,
            messages=[{"role": "user", "content": user_prompt}],
        )
    except Exception:  # noqa: BLE001
        return [], (0, 0)

    text = ""
    for block in msg.content:
        if getattr(block, "type", None) == "text":
            text += block.text  # type: ignore[attr-defined]

    # Best-effort JSON extraction.
    parsed: dict | None = None
    try:
        parsed = json.loads(text)
    except json.JSONDecodeError:
        match = _JSON_BLOCK_RE.search(text)
        if match:
            try:
                parsed = json.loads(match.group(0))
            except json.JSONDecodeError:
                parsed = None

    if not parsed:
        return [], (msg.usage.input_tokens, msg.usage.output_tokens)

    raw_list = parsed.get("conflicts", []) if isinstance(parsed, dict) else []
    conflicts: list[Conflict] = []
    for raw in raw_list:
        if not isinstance(raw, dict):
            continue
        sanitized = _sanitize_conflict_dict(raw)
        if sanitized is not None:
            conflicts.append(sanitized)

    return conflicts[:8], (msg.usage.input_tokens, msg.usage.output_tokens)
