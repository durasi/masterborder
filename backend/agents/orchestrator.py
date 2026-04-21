"""Orchestrator Agent — plans the analysis workflow using Opus 4.7.

Takes an AnalysisRequest, returns a plan describing what each Country Agent
should focus on for this specific product × country combination.
"""

import os
from anthropic import Anthropic
from dotenv import load_dotenv

from backend.schemas.models import AnalysisRequest

load_dotenv()

# Claude Opus 4.7 model identifier (latest as of hackathon)
MODEL = "claude-opus-4-7"  # Will update to opus-4.7 when API identifier is confirmed

SYSTEM_PROMPT = """You are the Orchestrator Agent for MasterBorder, an open-source \
cross-border trade compliance dashboard.

Your job: given a product and a list of target countries, produce a concise \
analysis plan describing what a Country Agent should focus on for each country.

Consider:
- Product category implications (e.g., electronics → CE marking, food → labeling)
- Country-specific sensitivities (e.g., US → FDA if food/cosmetics, EU → REACH if chemicals)
- Current geopolitical context (active conflicts, sanctions updates, shipping route risks)
- Human-in-the-loop principle: you propose, the human decides

Respond with a structured plan for each country."""


def plan_analysis(request: AnalysisRequest) -> str:
    """Use Opus 4.7 to create an analysis plan for the request."""
    client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

    user_message = f"""Product to analyze:
- Name: {request.product.name}
- Description: {request.product.description}
- Origin: {request.product.origin_country.value}
- Category: {request.product.category or 'not specified'}

Target countries: {', '.join(c.value for c in request.target_countries)}

Include route risk analysis: {request.include_route_risk}

Produce a brief per-country analysis plan (2-3 focus areas each)."""

    response = client.messages.create(
        model=MODEL,
        max_tokens=1024,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_message}],
    )

    return response.content[0].text


if __name__ == "__main__":
    # Quick smoke test
    from backend.schemas.models import Product, CountryCode

    test_request = AnalysisRequest(
        product=Product(
            name="leather wallet",
            description="Genuine cowhide leather wallet, handcrafted",
            category="accessories",
            origin_country=CountryCode.TR,
        ),
        target_countries=[CountryCode.US, CountryCode.DE, CountryCode.UK],
    )

    print("🚀 Calling Orchestrator Agent (Opus 4.7)...")
    print("=" * 60)
    result = plan_analysis(test_request)
    print(result)
    print("=" * 60)
    print("✅ Done")
