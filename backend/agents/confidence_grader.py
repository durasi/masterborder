"""Confidence Grader Agent — rates how well each compliance finding is
supported by authoritative sources.

Runs as a third Opus 4.7 call in parallel with the harmonizer and the
conflict extractor (all three via asyncio.gather in stream_pipeline). The
output is a mapping of (country_code, finding_title) -> ConfidenceLevel
which the pipeline uses to update each finding's ``confidence`` field in
place, so no downstream code needs to know the grader exists.

Grading rubric (identical to what we render in the UI tooltip, kept in
sync so juries can audit the criteria):

  - HIGH:   finding carries an explicit regulatory citation or a
            source_url in an authoritative domain (gov, europa.eu,
            customs authorities, standards bodies like iso.org, iec.ch).
  - MEDIUM: finding references an established industry practice or cites
            a reputable secondary source without a pinpoint citation.
  - LOW:    best-effort inference from general knowledge with no cited
            authority.

Best-effort by design: if the API call fails, the output can't be parsed,
or any key mismatches the countries in the job, we return an empty dict
and the UI simply doesn't show a confidence badge. Never blocks the
primary analysis result.
"""

from __future__ import annotations

import json
import os
import re

from anthropic import AsyncAnthropic
from dotenv import load_dotenv

from backend.schemas.models import (
    AnalysisResponse,
    ConfidenceLevel,
    CountryCode,
    CountryReport,
)

load_dotenv()

MODEL = "claude-opus-4-7"


SYSTEM_PROMPT = """You grade the CONFIDENCE of compliance findings based on
how well each one is supported by cited or inferable authoritative sources.

For every finding you receive, assign one of three confidence levels:

  HIGH   — The finding has an explicit regulatory citation (e.g. "19 CFR
           §102.21", "Regulation (EC) 1907/2006", "UK Global Tariff") OR
           a source_url pointing to an authoritative domain (gov, europa.eu,
           customs authorities, standards bodies like iso.org, iec.ch,
           jisc.go.jp).
  MEDIUM — The finding references an established trade practice, a
           well-known industry-standard document name, or a reputable
           secondary source (trade publication, major broker reference)
           WITHOUT a precise citation.
  LOW    — Best-effort inference from general knowledge. No citation, no
           authoritative URL, just domain knowledge.

Return a single JSON object with this exact shape:

  {
    "grades": [
      {
        "country": "DE",           // ISO-2 code, must match one in the input
        "title": "REACH test report required for chrome-tanned leather",
                                   // must match the finding's title exactly
        "confidence": "high" | "medium" | "low"
      },
      ...
    ]
  }

Grade EVERY finding you are shown. Output strictly valid JSON. No markdown
fences. No prose outside the JSON.

Be strict on HIGH: require a visible citation OR an authoritative URL.
A bare topic keyword like "REACH" alone is not enough for HIGH."""


def _findings_manifest(reports: list[CountryReport]) -> str:
    """Compact view of all findings across all reports, stable for grading.

    Each block ends up as:

        ## US
          - title: "MFN duty on leather goods 8%"
            category: tariff
            risk: medium
            citation: "19 CFR 4202"
            source_url: https://www.cbp.gov/...
            detail: "..."
    """
    lines: list[str] = []
    for r in reports:
        lines.append(f"## {r.country.value}")
        for f in r.findings:
            citation = f.citation or ""
            source = f.source_url or ""
            lines.append(f'  - title: "{f.title}"')
            lines.append(f"    category: {f.category}")
            lines.append(f"    risk: {f.risk_level.value}")
            if citation:
                lines.append(f'    citation: "{citation}"')
            if source:
                lines.append(f"    source_url: {source}")
            # Trim detail so very long bodies don't blow up the prompt
            detail = (f.detail or "").strip()
            if len(detail) > 280:
                detail = detail[:277] + "..."
            lines.append(f'    detail: "{detail}"')
        lines.append("")
    return "\n".join(lines)


_JSON_BLOCK_RE = re.compile(r"\{[\s\S]*\}")


async def grade_confidence(
    response: AnalysisResponse,
) -> tuple[dict[tuple[CountryCode, str], ConfidenceLevel], tuple[int, int]]:
    """Grade every finding in the response.

    Returns ``(grade_map, (input_tokens, output_tokens))`` where grade_map
    is keyed by ``(country_code, finding_title)``. Callers merge the grades
    back onto ``response.country_reports[*].findings[*].confidence``.

    On any error returns ``({}, (0, 0))`` so conflict detection and the
    harmonizer can proceed unaffected.
    """
    if not response.country_reports:
        return {}, (0, 0)

    total_findings = sum(len(r.findings) for r in response.country_reports)
    if total_findings == 0:
        return {}, (0, 0)

    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        return {}, (0, 0)

    client = AsyncAnthropic(api_key=api_key)

    manifest = _findings_manifest(response.country_reports)
    user_prompt = (
        "Grade the confidence of every finding below. Preserve the exact "
        "titles and country codes in your output.\n\n"
        + manifest
        + "\nReturn the JSON object now."
    )

    try:
        msg = await client.messages.create(
            model=MODEL,
            max_tokens=4000,
            thinking={"type": "adaptive"},
            system=SYSTEM_PROMPT,
            messages=[{"role": "user", "content": user_prompt}],
        )
    except Exception:  # noqa: BLE001
        return {}, (0, 0)

    text = ""
    for block in msg.content:
        if getattr(block, "type", None) == "text":
            text += block.text  # type: ignore[attr-defined]

    # Parse JSON, tolerating light preambles or trailing noise.
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

    usage = (msg.usage.input_tokens, msg.usage.output_tokens)

    if not parsed or not isinstance(parsed, dict):
        return {}, usage

    raw_grades = parsed.get("grades", [])
    if not isinstance(raw_grades, list):
        return {}, usage

    # Build the set of valid (country, title) pairs so we can reject grades
    # that came back with hallucinated titles or unknown countries.
    valid_keys: set[tuple[CountryCode, str]] = set()
    for r in response.country_reports:
        for f in r.findings:
            valid_keys.add((r.country, f.title))

    grade_map: dict[tuple[CountryCode, str], ConfidenceLevel] = {}
    for row in raw_grades:
        if not isinstance(row, dict):
            continue
        country_raw = str(row.get("country", "")).upper().strip()
        title = str(row.get("title", "")).strip()
        level_raw = str(row.get("confidence", "")).lower().strip()
        if not (country_raw and title and level_raw):
            continue
        try:
            country = CountryCode(country_raw)
        except ValueError:
            continue
        try:
            level = ConfidenceLevel(level_raw)
        except ValueError:
            continue
        key = (country, title)
        if key not in valid_keys:
            # Title slightly drifted — try a relaxed match on the first ~40
            # chars. This tolerates trailing punctuation changes without
            # accepting wildly different text.
            prefix = title[:40].lower()
            relaxed: tuple[CountryCode, str] | None = None
            for vc, vt in valid_keys:
                if vc == country and vt[:40].lower() == prefix:
                    relaxed = (vc, vt)
                    break
            if relaxed is None:
                continue
            key = relaxed
        grade_map[key] = level

    return grade_map, usage
