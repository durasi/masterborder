"""Country Agent — produces a detailed compliance report for a single country.

Uses the country's profile (profiles.py) to tailor the prompt, then queries
Opus 4.7 to generate a structured CountryReport. One agent instance handles
one country; parallel dispatch happens at the pipeline level.
"""

import json
import os

from anthropic import AsyncAnthropic
from dotenv import load_dotenv

from backend.countries.profiles import CountryProfile, get_profile
from backend.utils.languages import get_language_name
from backend.schemas.models import (
    ComplianceFinding,
    CountryCode,
    CountryReport,
    Product,
    RiskLevel,
)

load_dotenv()

MODEL = "claude-opus-4-7"


def _build_system_prompt(profile: CountryProfile, language: str = "en") -> str:
    """Construct a country-specific system prompt."""
    lang_name = get_language_name(language)
    lang_directive = (
        f"CRITICAL OUTPUT LANGUAGE: Respond entirely in {lang_name}. "
        "All values in the JSON output (title, detail, recommended_actions, citation text) "
        "MUST be written in {lang_name}. The JSON KEYS (hs_code, findings, title, detail, etc.) "
        "and category enum values (tariff, sanctions, chemicals, etc.) and risk_level enum values "
        "(low, medium, high, blocked) stay in English. Only the human-readable values are translated. "
        "Regulation identifiers like '19 CFR 134' or 'Regulation (EU) 2023/1115' stay in their "
        "original form (do not translate law names).\n\n"
    ).format(lang_name=lang_name)
    return lang_directive + f"""You are a trade compliance specialist focused on {profile.name} (ISO: {profile.code}).

Your domain knowledge:

## Official sources you reference
{chr(10).join(f"- {s}" for s in profile.official_sources)}

## Key regulations
{chr(10).join(f"- {r}" for r in profile.key_regulations)}

## FTA with Turkey
{profile.fta_with_turkey or "No preferential trade agreement"}

## Sanctions regimes you check
{chr(10).join(f"- {s}" for s in profile.sanctions_regimes)}

## Unique concerns for this jurisdiction
{chr(10).join(f"- {c}" for c in profile.unique_concerns)}

Your output must be a JSON object matching this schema exactly:

{{
  "hs_code": "string (6-digit HS code, e.g. '420231')",
  "tariff_rate": number (decimal, e.g. 0.12 for 12%),
  "findings": [
    {{
      "category": "tariff|sanctions|chemicals|documents|labeling|dual_use|origin",
      "title": "short title",
      "detail": "1-2 sentences of actionable detail",
      "risk_level": "low|medium|high|blocked",
      "source_url": "MANDATORY when a primary-source URL exists — see rules below",
      "citation": "specific article/section/proclamation identifier — e.g. '19 CFR Part 134' or 'Regulation (EU) 2023/1115, Art. 3'"
    }}
  ],
  "overall_risk": "low|medium|high|blocked",
  "recommended_actions": ["actionable step 1", "actionable step 2", ...]
}}

## Rules for source_url and citation

Each finding MUST cite the primary regulatory source it is based on.

1. `citation` is ALMOST ALWAYS populatable: it is the short identifier of the law,
   regulation, proclamation, or official guidance (e.g. "19 USC 1307",
   "Regulation (EU) 2021/1323", "Section 232 Proclamation 9705",
   "Natasha's Law / PPDS guidance (FSA)"). You must fill this in whenever you
   name or quote a specific regulation in `detail`.

2. `source_url` should be the CANONICAL primary-source URL when you are
   confident it exists. Prefer, in order:
   - United States: ecfr.gov, cbp.gov, ustr.gov, treasury.gov (OFAC),
     federalregister.gov, usitc.gov
   - European Union: eur-lex.europa.eu, ec.europa.eu (DG TAXUD, DG TRADE),
     trade.ec.europa.eu
   - United Kingdom: legislation.gov.uk, gov.uk (HMRC / DEFRA / DBT),
     trade-tariff.service.gov.uk
   - Turkey: resmigazete.gov.tr, ticaret.gov.tr, mevzuat.gov.tr
   - Japan: customs.go.jp, meti.go.jp, mhlw.go.jp, japaneselawtranslation.go.jp

3. Only include `source_url` if you are reasonably confident the URL is real
   and correct. DO NOT fabricate URLs. If you are not sure, set `source_url`
   to null and keep `citation` populated — a verifiable citation string is
   more valuable than a broken link.

4. For each finding, prefer a single authoritative URL (the regulation itself)
   over a secondary commentary or news source.

## Customs clearance depth

When the origin or target country is Turkey, address the Turkish customs
clearance channels in at least one finding:
- "Kırmızı hat" (red line): full physical + documentary inspection, highest scrutiny
- "Sarı hat" (yellow line): documentary inspection only
- "Mavi hat" (blue line): post-release audit for trusted operators (YYS)
- "Yeşil hat" (green line): automated release, authorized economic operators only
Mention customs broker (gümrük müşaviri) requirements — which products require
a licensed broker, and port-of-entry specifics (Ambarlı, Mersin, İzmir, Gebze)
when shipping conditions differ materially between ports.

Each destination has an analog to Turkey's four-lane system — name the
specific equivalent in at least one finding:

- European Union (DE, AT, FR, NL, IT etc.):
  * Green channel  ↔ Yeşil hat  → automated release, AEO-C / AEO-F operators
  * Yellow channel ↔ Sarı hat   → documentary check only
  * Orange channel (EU-specific) → targeted documentary + intelligence check
  * Red channel    ↔ Kırmızı hat → full physical + documentary inspection
  Reference: Union Customs Code (EU) 952/2013, Risk Management Framework

- United States (CBP / ACE):
  * Release from manifest        ↔ Yeşil hat  → no exam, 1C/1D entries
  * Documentary review (CF 28)   ↔ Sarı hat   → CBP Form 28 Request for Info
  * Intensive exam (CET/NII)     ↔ Kırmızı hat → Centralized Exam + X-ray
  Additional US-only layers: Continuous bond vs single-entry bond sizing,
  CEE (Center of Excellence and Expertise) account, PGA filings (FDA, USDA)

- United Kingdom (HMRC / CDS):
  * Route 6 — automated release  ↔ Yeşil hat
  * Route 3 — post-clearance     ↔ Mavi hat (post-release audit)
  * Route 2 — documentary hold   ↔ Sarı hat
  * Route 1 — physical exam hold ↔ Kırmızı hat
  Trusted Trader / AEO UK status implications, CDS declaration categories

- Japan (NACCS / JCD):
  * Immediate release (IDE)      ↔ Yeşil hat  → AEO Japan operators
  * Standard (NAK)               ↔ Sarı hat   → documentary exam
  * Inspection category (KEN)    ↔ Kırmızı hat → physical + sample
  Reference: Customs Law Article 67-3, AEO Japan certification

## Quantity and tariff calculation

If the user provides a quantity + unit, use it to:
- Compute actual duty burden at the stated tariff rate, not just the percentage
- Check if the shipment falls under de minimis thresholds
  (US: $800, EU: €150 for duty, €22 removed for VAT, UK: £135, Japan: ¥10,000)
- Identify simplified-entry eligibility based on total value and weight
- Flag quantity-triggered restrictions (e.g. quotas, licensing thresholds)

## Other rules

- Be specific. Cite concrete regulation numbers in `detail` as well.
- If uncertain about a fact, lower the risk_level and flag uncertainty in `detail`.
- Include 3-7 findings covering the most important compliance dimensions.
- `overall_risk` reflects the MAXIMUM risk across findings (one blocked → overall blocked).
- Account for current geopolitical context (Iran-Israel tensions, strait/route
  disruptions, recent sanctions updates) if relevant to this country's trade
  with the origin.
- Output ONLY valid JSON. No prose before or after."""


async def analyze_country(product: Product, country: CountryCode, language: str = "en") -> tuple["CountryReport", tuple[int, int]]:
    """Run a Country Agent for a single target country (async)."""
    profile = get_profile(country.value)
    client = AsyncAnthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

    quantity_line = (
        f"Quantity: {product.quantity} {product.unit.value}"
        if product.quantity and product.unit
        else "Quantity: unspecified (tariff calculations will assume 1 unit)"
    )

    user_message = f"""Analyze trade compliance for this product targeting {profile.name}:

Product: {product.name}
Description: {product.description}
Category: {product.category or "unspecified"}
Origin country: {product.origin_country.value}
Estimated value per unit (USD): {product.estimated_value_usd or "unspecified"}
{quantity_line}

Return the JSON report."""

    response = await client.messages.create(
        model=MODEL,
        max_tokens=4096,
        thinking={"type": "adaptive"},
        system=_build_system_prompt(profile, language),
        messages=[{"role": "user", "content": user_message}],
    )

    # Adaptive thinking responses can emit a thinking block before the text
    # block. Join all text blocks so JSON parsing stays correct regardless
    # of block ordering. Without this filter, ``content[0].text`` would
    # raise AttributeError whenever the model decided to think first.
    raw_parts: list[str] = []
    thinking_chars = 0
    for block in response.content:
        block_type = getattr(block, "type", None)
        if block_type == "text":
            raw_parts.append(block.text)
        elif block_type == "thinking":
            trace = getattr(block, "thinking", "") or ""
            thinking_chars += len(trace)

    if thinking_chars > 0:
        print(
            f"[country:{country.value}] Adaptive thinking: "
            f"{thinking_chars:,} chars of reasoning trace"
        )

    raw = "".join(raw_parts).strip()
    # Some models wrap JSON in markdown code fences; strip if present
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
        raw = raw.strip()

    data = json.loads(raw)

    findings = [
        ComplianceFinding(
            category=f["category"],
            title=f["title"],
            detail=f["detail"],
            risk_level=RiskLevel(f["risk_level"]),
            source_url=f.get("source_url"),
            citation=f.get("citation"),
        )
        for f in data["findings"]
    ]

    report = CountryReport(
        country=country,
        hs_code=data.get("hs_code"),
        tariff_rate=data.get("tariff_rate"),
        findings=findings,
        overall_risk=RiskLevel(data["overall_risk"]),
        recommended_actions=data.get("recommended_actions", []),
    )

    # Token accounting (pipeline aggregates these across all agents)
    usage_in = getattr(response.usage, "input_tokens", 0) or 0
    usage_out = getattr(response.usage, "output_tokens", 0) or 0
    return report, (usage_in, usage_out)
