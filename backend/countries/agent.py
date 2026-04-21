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
from backend.schemas.models import (
    ComplianceFinding,
    CountryCode,
    CountryReport,
    Product,
    RiskLevel,
)

load_dotenv()

MODEL = "claude-opus-4-7"


def _build_system_prompt(profile: CountryProfile) -> str:
    """Construct a country-specific system prompt."""
    return f"""You are a trade compliance specialist focused on {profile.name} (ISO: {profile.code}).

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
      "source_url": "official URL if known, else null",
      "citation": "specific article/section if known, else null"
    }}
  ],
  "overall_risk": "low|medium|high|blocked",
  "recommended_actions": ["actionable step 1", "actionable step 2", ...]
}}

Rules:
- Be specific. Cite concrete regulation numbers when possible.
- If uncertain, lower the confidence and flag in the detail.
- Include 3-7 findings covering the most important compliance dimensions.
- The overall_risk should reflect the MAXIMUM risk across findings (one high → overall high).
- Account for current geopolitical context (Iran-Israel tensions, strait/route disruptions,
  recent sanctions updates) if relevant to this country's trade with the origin.
- Output ONLY valid JSON. No prose before or after."""


async def analyze_country(product: Product, country: CountryCode) -> CountryReport:
    """Run a Country Agent for a single target country (async)."""
    profile = get_profile(country.value)
    client = AsyncAnthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

    system_prompt = _build_system_prompt(profile)

    user_message = f"""Analyze this product for export to {profile.name}:

Product: {product.name}
Description: {product.description}
Category: {product.category or 'unspecified'}
Origin country: {product.origin_country.value}
Estimated value (USD): {product.estimated_value_usd or 'unspecified'}

Produce the compliance JSON report now."""

    response = await client.messages.create(
        model=MODEL,
        max_tokens=2048,
        system=system_prompt,
        messages=[{"role": "user", "content": user_message}],
    )

    raw_text = response.content[0].text.strip()

    # Strip markdown code fences if present
    if raw_text.startswith("```"):
        lines = raw_text.split("\n")
        raw_text = "\n".join(lines[1:-1] if lines[-1].startswith("```") else lines[1:])

    data = json.loads(raw_text)

    return CountryReport(
        country=country,
        hs_code=data.get("hs_code"),
        tariff_rate=data.get("tariff_rate"),
        findings=[ComplianceFinding(**f) for f in data.get("findings", [])],
        overall_risk=RiskLevel(data.get("overall_risk", "medium")),
        recommended_actions=data.get("recommended_actions", []),
    )


if __name__ == "__main__":
    import asyncio

    test_product = Product(
        name="leather wallet",
        description="Genuine cowhide leather wallet, handcrafted, chrome-tanned",
        category="accessories",
        origin_country=CountryCode.TR,
        estimated_value_usd=45.0,
    )

    async def main():
        print("🌍 Testing Async Country Agent — Germany (DE)")
        print("=" * 60)
        report = await analyze_country(test_product, CountryCode.DE)
        print(f"HS Code: {report.hs_code}")
        print(f"Overall Risk: {report.overall_risk.value}")
        print(f"Findings: {len(report.findings)}")
        print("=" * 60)
        print("✅ Async Country Agent works")

    asyncio.run(main())
