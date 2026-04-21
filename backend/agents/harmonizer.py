"""Harmonization & Recommendation Agent — synthesizes multi-country reports.

Takes the list of CountryReports produced by the pipeline and generates a
human-in-the-loop summary: which country is easiest, which has the biggest
barriers, and what the seller should focus on first.

Opus 4.7's 1M context + cross-jurisdiction reasoning shines here.
"""

import os

from anthropic import AsyncAnthropic
from dotenv import load_dotenv

from backend.schemas.models import (
    AnalysisResponse,
    CountryReport,
    RiskLevel,
)

load_dotenv()

MODEL = "claude-opus-4-7"


SYSTEM_PROMPT = """You are the Harmonization & Recommendation Agent for MasterBorder.

You receive compliance reports from multiple Country Agents — each covering a \
different target market for the same product. Your job is to synthesize them \
into an actionable executive summary for the seller (human-in-the-loop).

Your summary must:
1. Rank the target countries from easiest to hardest to enter, with reasoning
2. Highlight the SHARED compliance requirements (things the seller must do regardless of country)
3. Highlight the DIVERGENT requirements (country-specific traps)
4. Consider current geopolitical context (active conflicts, route disruptions, sanctions updates)
5. Recommend a concrete first step — "start with country X because..."

Tone: Pragmatic, decisive, respectful of the seller's time. You PROPOSE, the seller DECIDES.

Format your response as clean Markdown. Aim for 300-500 words."""


def _format_reports_for_prompt(reports: list[CountryReport]) -> str:
    """Compact Markdown summary of all country reports for the agent's context."""
    lines = []
    for report in reports:
        lines.append(f"## {report.country.value}")
        lines.append(f"- HS Code: {report.hs_code}")
        lines.append(f"- Tariff: {report.tariff_rate * 100:.1f}%" if report.tariff_rate is not None else "- Tariff: unspecified")
        lines.append(f"- Overall Risk: **{report.overall_risk.value}**")
        lines.append(f"- Findings ({len(report.findings)}):")
        for f in report.findings:
            lines.append(f"  - [{f.risk_level.value}] {f.category}: {f.title} — {f.detail}")
        lines.append(f"- Recommended Actions:")
        for a in report.recommended_actions:
            lines.append(f"  - {a}")
        lines.append("")
    return "\n".join(lines)


async def harmonize(response: AnalysisResponse) -> str:
    """Generate an executive summary across all country reports."""
    client = AsyncAnthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

    reports_md = _format_reports_for_prompt(response.country_reports)

    product = response.request.product
    user_message = f"""# Product Under Analysis
- Name: {product.name}
- Description: {product.description}
- Origin: {product.origin_country.value}

# Country Reports to Synthesize

{reports_md}

Produce the executive summary now."""

    result = await client.messages.create(
        model=MODEL,
        max_tokens=2048,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_message}],
    )

    return result.content[0].text


if __name__ == "__main__":
    import asyncio
    from backend.agents.pipeline import run_pipeline
    from backend.schemas.models import AnalysisRequest, Product, CountryCode

    test_product = Product(
        name="leather wallet",
        description="Genuine cowhide leather wallet, handcrafted, chrome-tanned",
        category="accessories",
        origin_country=CountryCode.TR,
        estimated_value_usd=45.0,
    )

    test_request = AnalysisRequest(
        product=test_product,
        target_countries=[CountryCode.US, CountryCode.DE, CountryCode.UK],
        include_route_risk=True,
    )

    async def main():
        print("🚀 Full pipeline + harmonization test")
        print("=" * 70)
        response = await run_pipeline(test_request)
        print("\n📊 Harmonizing reports into executive summary...\n")
        summary = await harmonize(response)
        response.summary = summary
        print("=" * 70)
        print(summary)
        print("=" * 70)
        print(f"\n✅ Full pipeline complete. Duration: "
              f"{(response.completed_at - response.created_at).total_seconds():.1f}s "
              f"(harmonization extra ~5-10s)")

    asyncio.run(main())
