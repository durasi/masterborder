"""Pipeline Agent — orchestrates parallel Country Agent dispatch.

Takes an AnalysisRequest and fans out to N Country Agents in parallel using
asyncio.gather. Returns all CountryReports in a single AnalysisResponse.

This is Phase 1 of parallelism. Phase 2 (planned) will migrate to Claude
Managed Agents for long-horizon, resumable background execution.
"""

import asyncio
import uuid
from datetime import datetime

from backend.countries.agent import analyze_country
from backend.schemas.models import (
    AnalysisRequest,
    AnalysisResponse,
    CountryReport,
    Product,
    CountryCode,
)


async def run_pipeline(request: AnalysisRequest) -> AnalysisResponse:
    """Execute the full analysis pipeline: parallel Country Agents → response."""
    job_id = str(uuid.uuid4())
    created_at = datetime.utcnow()

    print(f"[pipeline] Starting job {job_id[:8]}... "
          f"dispatching {len(request.target_countries)} Country Agents in parallel")

    # Parallel dispatch — all Country Agents run concurrently
    tasks = [
        analyze_country(request.product, country)
        for country in request.target_countries
    ]

    reports: list[CountryReport] = await asyncio.gather(*tasks, return_exceptions=False)

    completed_at = datetime.utcnow()
    duration = (completed_at - created_at).total_seconds()

    print(f"[pipeline] Job {job_id[:8]} completed in {duration:.1f}s")

    return AnalysisResponse(
        job_id=job_id,
        created_at=created_at,
        completed_at=completed_at,
        request=request,
        country_reports=reports,
        summary=None,  # Filled by Harmonization Agent (next step)
    )


if __name__ == "__main__":
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

    print("🚀 Pipeline Test: leather wallet TR → US, DE, UK (parallel)")
    print("=" * 70)
    response = asyncio.run(run_pipeline(test_request))
    print(f"\nJob ID: {response.job_id}")
    print(f"Duration: {(response.completed_at - response.created_at).total_seconds():.1f}s")
    print(f"Countries analyzed: {len(response.country_reports)}")
    print()
    for report in response.country_reports:
        print(f"  🌍 {report.country.value}: "
              f"HS {report.hs_code} | "
              f"Risk {report.overall_risk.value} | "
              f"{len(report.findings)} findings")
    print("=" * 70)
    print("✅ Parallel pipeline works")
