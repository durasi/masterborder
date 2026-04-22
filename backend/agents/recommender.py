"""Recommendation Agent — interactive deep-dive for a chosen target country.

After the harmonizer produces an executive summary, the user picks a country
to focus on. This agent generates a detailed go-to-market plan for that
country and answers follow-up questions in a multi-turn conversation.

Opus 4.7's reasoning shines here: it cross-references the country's
regulations, the product specifics, and the current geopolitical context
to produce actionable week-by-week plans.
"""

import os

from anthropic import AsyncAnthropic
from dotenv import load_dotenv

from backend.countries.profiles import get_profile
from backend.schemas.models import (
    AnalysisResponse,
    CountryCode,
    CountryReport,
)

load_dotenv()

MODEL = "claude-opus-4-7"


def _build_system_prompt(
    response: AnalysisResponse,
    chosen_country: CountryCode,
    chosen_report: CountryReport,
) -> str:
    """Build the system prompt with full analysis context."""
    profile = get_profile(chosen_country.value)
    product = response.request.product

    # Include the executive summary + full chosen country report
    summary_section = (
        f"\n## Executive Summary (from Harmonizer Agent)\n\n{response.summary}\n"
        if response.summary else ""
    )

    findings_md = "\n".join(
        f"- [{f.risk_level.value}] {f.category}: {f.title} — {f.detail}"
        for f in chosen_report.findings
    )
    actions_md = "\n".join(f"- {a}" for a in chosen_report.recommended_actions)

    return f"""You are the Recommendation Agent for MasterBorder, an open-source \
cross-border trade compliance tool.

The user (a seller/exporter) has just completed a multi-country analysis and \
has chosen to focus on: **{profile.name}**. Your job is to produce a concrete, \
actionable go-to-market plan for this specific country × product pairing, and \
answer follow-up questions with specificity.

# Context

## Product
- Name: {product.name}
- Description: {product.description}
- Origin: {product.origin_country.value}
- Category: {product.category or 'unspecified'}
- Value per unit (USD): {product.estimated_value_usd or 'unspecified'}

## Chosen target: {profile.name} ({chosen_country.value})
- HS Code: {chosen_report.hs_code}
- Tariff: {chosen_report.tariff_rate * 100:.1f}% if applicable
- Overall Risk: {chosen_report.overall_risk.value}

### Findings for this country
{findings_md}

### Initial recommended actions
{actions_md}

{summary_section}

# Your output format (for FIRST message)

Respond with clean Markdown containing these sections:

## 📅 Week-by-Week Timeline
Concrete actions for Week 1, Week 2, Week 3, Week 4+. Each week has 2-4 \
specific tasks with deadlines relative to target launch.

## 📄 Documents You Need
For each required document:
- **Name** (e.g., "A.TR Movement Certificate")
- **Who issues it** (chamber of commerce, customs authority, test lab)
- **Typical cost & lead time**
- **Sample fields** if it's a form you fill out

## 🧪 Testing & Certification
Specific labs or certification bodies relevant to this product-country pair:
- Accredited labs (ideally in origin country for cost efficiency)
- Test methods & standards (EN ISO numbers, ASTM, etc.)
- Typical cost ranges

## 💰 Cost Estimate (one-time + recurring)
Itemized table: document fees, tests, registration, legal review, first-year \
compliance overhead. Use EUR or USD consistently.

## ⚠️ Risk Mitigation
3-5 contingency scenarios and how to prepare:
- What if supplier ownership changes (sanctions screen)?
- What if regulations change mid-shipment?
- What if first shipment is held at customs?

## 🎯 First Concrete Action
ONE thing the user should do TODAY or THIS WEEK to move forward. Specific, \
no ambiguity.

# For FOLLOW-UP messages
Answer the user's specific question with the same depth and specificity. \
Reference previous parts of the conversation where relevant. Stay in the \
advisor role: propose, don't dictate. End with "Your call." when appropriate.

# Style rules
- Be specific. Cite concrete regulation numbers, lab names, cost figures.
- If uncertain, say so explicitly and suggest how the user can verify.
- Account for current geopolitical context (active conflicts, route \
disruptions, recent sanctions) when relevant.
- Respect the user's time. No fluff."""


async def recommend_for_country(
    response: AnalysisResponse,
    chosen_country: CountryCode,
    conversation_history: list[dict] | None = None,
    user_question: str | None = None,
) -> str:
    """Generate initial deep-dive or answer a follow-up question.

    Args:
        response: The full AnalysisResponse from pipeline + harmonizer.
        chosen_country: Which country the user picked to focus on.
        conversation_history: Previous messages in [{"role": "...", "content": "..."}] format.
            None means this is the first call (initial deep-dive).
        user_question: User's follow-up question. Required if conversation_history is non-empty.

    Returns:
        Markdown text response from the Recommendation Agent.
    """
    # Find the chosen country's report
    chosen_report = next(
        (r for r in response.country_reports if r.country == chosen_country),
        None,
    )
    if chosen_report is None:
        raise ValueError(
            f"No report for {chosen_country.value} in the analysis response. "
            f"Available: {[r.country.value for r in response.country_reports]}"
        )

    client = AsyncAnthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
    system_prompt = _build_system_prompt(response, chosen_country, chosen_report)

    # Build message list
    messages: list[dict] = []
    if conversation_history:
        messages.extend(conversation_history)
        if user_question:
            messages.append({"role": "user", "content": user_question})
        elif messages and messages[-1]["role"] != "user":
            raise ValueError("Conversation history must end with a user message, or provide user_question")
    else:
        # First call: bootstrap with the initial deep-dive request
        messages.append({
            "role": "user",
            "content": f"I've chosen to focus on {chosen_country.value}. "
                       "Give me the full go-to-market plan.",
        })

    result = await client.messages.create(
        model=MODEL,
        max_tokens=8192,
        system=system_prompt,
        messages=messages,
    )

    return result.content[0].text


if __name__ == "__main__":
    import asyncio
    from backend.agents.pipeline import run_pipeline
    from backend.agents.harmonizer import harmonize
    from backend.schemas.models import AnalysisRequest, Product

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
        print("🚀 Full pipeline → Recommendation deep-dive test")
        print("=" * 70)

        # Step 1 — pipeline + harmonizer
        response = await run_pipeline(test_request)
        response.summary = await harmonize(response)

        # Step 2 — user picks Germany, initial deep-dive
        print("\n🎯 User chose: DE (Germany)")
        print("📝 Requesting initial go-to-market plan...\n")
        plan = await recommend_for_country(response, CountryCode.DE)
        print("=" * 70)
        print(plan)
        print("=" * 70)

        # Step 3 — follow-up question (multi-turn)
        print("\n💬 Follow-up: 'Can I use a Turkish lab for Cr VI testing, or must it be German?'\n")
        history = [
            {"role": "user", "content": "I've chosen to focus on DE. Give me the full go-to-market plan."},
            {"role": "assistant", "content": plan},
        ]
        follow_up = await recommend_for_country(
            response,
            CountryCode.DE,
            conversation_history=history,
            user_question="Can I use a Turkish lab for Cr VI testing, or must it be German-accredited?",
        )
        print("=" * 70)
        print(follow_up)
        print("=" * 70)
        print("\n✅ Recommendation Agent: initial deep-dive + follow-up both work")

    asyncio.run(main())
