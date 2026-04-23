"""Harmonization & Recommendation Agent — end-to-end trade solution synthesizer.

Receives N CountryReports from the pipeline and produces a single executive
summary that covers compliance ranking, shipping route optimisation, current
geopolitical constraints, document checklist, and a concrete first-market
recommendation. Opus 4.7's long-context reasoning is enabled via adaptive
thinking so the model can allocate extra reasoning when cross-criteria
trade-offs (tariff vs compliance vs time-to-market vs route risk) warrant it.

The `thinking={"type": "adaptive"}` parameter lets Opus 4.7 itself decide when
a problem is complex enough to benefit from extended reasoning. When the model
does emit a thinking trace, we log its length server-side so the behaviour is
observable to anyone inspecting the backend.
"""

import os

from anthropic import AsyncAnthropic
from dotenv import load_dotenv

from backend.utils.languages import get_language_name
from backend.schemas.models import (
    AnalysisResponse,
    CountryReport,
)

load_dotenv()

MODEL = "claude-opus-4-7"


SYSTEM_PROMPT = """You are the MasterBorder Harmonization & Recommendation Agent.

You receive compliance reports from multiple Country Agents — one report per
target market for the same product, plus the product's origin country. Your job
is to synthesise them into an actionable **end-to-end trade solution** for the
seller (human-in-the-loop).

# What your summary must cover

## 1. Compliance synthesis
- **Shared requirements** — things the seller must do regardless of destination
  (origin marking, supplier screening, HS classification, commercial invoice, etc.)
- **Divergent requirements** — country-specific traps that gate market entry
  (e.g. DE REACH Cr(VI) lab test, US UFLPA attestation, UK UKCA marking, JP JIS
  conformity, AE MoHAP / ESMA registration). Explicitly flag items that BLOCK
  shipment if missing, vs. items that merely raise risk or cost.

## 2. Shipping route selection per destination
Consider the realistic freight options available from the origin country:
- **Air freight**: fastest (1–3 days express, 4–7 standard air cargo),
  most expensive, capacity-constrained for bulky goods
- **Sea freight**: cheapest per kg, slowest (15–45 days), exposed to chokepoint
  and port-congestion risk
- **Rail freight**: middle ground where corridors exist (Turkey↔EU via
  Kapıkule–Halkalı, China↔EU via Middle Corridor, TIR road-rail combined)
- **Road / TIR**: only for EU-adjacent origins and neighbouring countries;
  fast customs at Kapıkule for Turkey→EU

For each destination name a **PRIMARY route** and a **BACKUP route**.
State approximate transit time and indicative cost band.

## 3. Current geopolitical & logistics reality (April 2026)

You MUST bake these live constraints into your route recommendations:

- **Red Sea / Bab el-Mandeb / Suez Canal**: Houthi attacks continue to disrupt
  Suez transit. Most major carriers reroute around the Cape of Good Hope,
  adding ~14 days and ~30–40% cost for Asia↔Europe sea freight. If the
  shipment is Asia-bound or Middle-East-transiting, assume Suez is high-risk.
- **Strait of Hormuz**: elevated marine-insurance War Risk premiums; tanker
  and high-value cargo passing the strait pays significantly more. For
  shipments transiting the Arabian Gulf, consider Jebel Ali (UAE) as a
  **consolidation / transit hub** instead of direct routing.
- **Russia–Ukraine airspace**: Russian airspace remains closed to most Western
  carriers. Europe↔East-Asia air corridors detour south (via Central Asia or
  Middle East), adding 1–3 hours and fuel surcharge.
- **Iran–Israel tensions**: some MENA air corridors are episodically
  constrained; cargo flights may reroute around Iranian airspace.
- **Belt & Road / Middle Corridor rail**: Turkey↔EU segments operational and
  competitive for mid-value, time-sensitive cargo vs. sea.
- **UAE (Jebel Ali, DMCC, Jafza free zones)**: widely used as a neutral
  transit hub for MENA, South Asia, and East Africa. Re-export from UAE is
  duty-friendly (no VAT on re-export), DP World consolidation is reliable.
  If UAE is a target or transit candidate, explicitly consider whether other
  destinations could benefit from a UAE transit leg.

## 4. Document checklist per route
List required paperwork per destination and route combination — e.g.
Commercial Invoice, Packing List, A.TR Movement Certificate (Turkey↔EU),
Bill of Lading / Sea Waybill (sea), AWB (air), CMR (road), CITES permit
(wildlife products only), Certificate of Origin, REACH test report (EU
chemicals), UKCA / CE / JIS / ESMA declaration, OFAC/BIS screening record.

## 5. Multi-criteria ranking

Rank target markets from **easiest** → **hardest** to enter, using a weighted
scoring model you compute and show:

- **Total landed cost** (weight 0.40) = FOB + freight + insurance + duty + compliance cost
- **Time-to-market** (weight 0.35) = compliance-prep days + route transit days
- **Compliance risk** (weight 0.25) = sum of risk_weights across findings
  (low=1, medium=3, high=7, blocked=20)

Show the math per country in a table, then the final weighted score normalised
0–1. If two countries are within 15% of each other, explicitly explain the
trade-off.

## 6. Concrete first step
Recommend ONE market as the concrete starting point. Explain WHY (cheapest
entry? fastest validation? lowest compliance burden?). State the 3–5 actions
the seller should take this week. Tone: pragmatic, decisive, respectful of
the seller's time. You PROPOSE, the seller DECIDES.

# Output format
Clean Markdown, 400–600 words total. Use tables for the ranking and cost
breakdown. Use bullet lists for document checklists. Do NOT wrap the output
in a code fence."""


def _format_reports_for_prompt(reports: list[CountryReport]) -> str:
    """Compact Markdown summary of all country reports for the agent's context."""
    lines = []
    for report in reports:
        lines.append(f"## {report.country.value}")
        lines.append(f"- HS Code: {report.hs_code}")
        if report.tariff_rate is not None:
            lines.append(f"- Tariff: {report.tariff_rate * 100:.1f}%")
        else:
            lines.append("- Tariff: unspecified")
        lines.append(f"- Overall Risk: **{report.overall_risk.value}**")
        lines.append(f"- Findings ({len(report.findings)}):")
        for f in report.findings:
            lines.append(
                f"  - [{f.risk_level.value}] {f.category}: {f.title} — {f.detail}"
            )
        lines.append("- Recommended Actions:")
        for a in report.recommended_actions:
            lines.append(f"  - {a}")
        lines.append("")
    return "\n".join(lines)


async def harmonize(
    response: AnalysisResponse, language: str = "en"
) -> tuple[str, tuple[int, int]]:
    """Generate the end-to-end executive summary across all country reports.

    Calls Opus 4.7 with adaptive thinking enabled so the model can allocate
    extra reasoning when the cross-market trade-off space is complex
    (e.g. shipping route optimisation against live geopolitical constraints).
    """
    client = AsyncAnthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

    reports_md = _format_reports_for_prompt(response.country_reports)
    product = response.request.product

    quantity_line = ""
    if product.quantity and product.unit:
        quantity_line = (
            f"- Shipment quantity: {product.quantity} {product.unit.value}\n"
        )

    user_message = f"""# Product Under Analysis
- Name: {product.name}
- Description: {product.description}
- Origin: {product.origin_country.value}
- Unit value: ${product.estimated_value_usd or 'unspecified'} USD
{quantity_line}

# Country Reports to Synthesize

{reports_md}

Produce the end-to-end trade solution now — compliance synthesis, optimal
route per destination (with a backup), live geopolitical reality check,
document checklist, weighted ranking with math shown, and a concrete first
step. Keep it 400–600 words."""

    result = await client.messages.create(
        model=MODEL,
        max_tokens=8192,
        thinking={"type": "adaptive"},
        system=(
            f"CRITICAL OUTPUT LANGUAGE: Respond entirely in "
            f"{get_language_name(language)}. Use that language for all "
            f"headings, body text, tables, and recommendations. Keep regulation "
            f"identifiers (19 CFR, Regulation (EU), HS codes) in their "
            f"original form — do not translate law names.\n\n"
            + SYSTEM_PROMPT
        ),
        messages=[{"role": "user", "content": user_message}],
    )

    # Adaptive thinking responses may interleave thinking + text blocks. Join
    # all text blocks for the user-facing summary; log any thinking-trace
    # length so the behaviour is observable server-side.
    text_parts: list[str] = []
    thinking_chars = 0
    for block in result.content:
        block_type = getattr(block, "type", None)
        if block_type == "text":
            text_parts.append(block.text)
        elif block_type == "thinking":
            trace = getattr(block, "thinking", "") or ""
            thinking_chars += len(trace)

    final_text = "".join(text_parts).strip()

    if thinking_chars > 0:
        print(
            f"[harmonizer] Adaptive thinking: {thinking_chars:,} chars of "
            f"reasoning trace emitted across "
            f"{len(response.country_reports)} country reports"
        )
    else:
        print(
            f"[harmonizer] Adaptive thinking: no trace emitted (model chose "
            f"direct synthesis for {len(response.country_reports)} reports)"
        )

    usage_in = getattr(result.usage, "input_tokens", 0) or 0
    usage_out = getattr(result.usage, "output_tokens", 0) or 0
    return final_text, (usage_in, usage_out)


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
        print("🚀 End-to-end harmonizer test (3 countries)")
        print("=" * 70)
        response = await run_pipeline(test_request)
        print("\n📊 Harmonizing reports into E2E executive summary...\n")
        summary, _ = await harmonize(response)
        response.summary = summary
        print("=" * 70)
        print(summary)
        print("=" * 70)

    asyncio.run(main())
