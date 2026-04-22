"""Shared fixtures for MasterBorder tests."""
import pytest

from backend.schemas.models import (
    AnalysisRequest,
    ComplianceFinding,
    CountryCode,
    CountryReport,
    Product,
    RiskLevel,
)


@pytest.fixture
def sample_product() -> Product:
    return Product(
        name="Leather Wallet",
        description="Genuine cowhide bifold wallet, chrome-tanned",
        category="consumer_goods",
        origin_country=CountryCode.TR,
        estimated_value_usd=25.0,
    )


@pytest.fixture
def sample_request(sample_product) -> AnalysisRequest:
    return AnalysisRequest(
        product=sample_product,
        target_countries=[CountryCode.US, CountryCode.DE],
        include_route_risk=True,
    )


@pytest.fixture
def sample_finding() -> ComplianceFinding:
    return ComplianceFinding(
        category="tariff",
        title="MFN duty on leather wallets",
        detail="HTS 4202.31.6000 subject to 8% MFN duty.",
        risk_level=RiskLevel.LOW,
        source_url="https://hts.usitc.gov",
        citation="HTSUS 4202.31.6000",
    )


@pytest.fixture
def sample_country_report(sample_finding) -> CountryReport:
    return CountryReport(
        country=CountryCode.US,
        hs_code="420231",
        tariff_rate=0.08,
        overall_risk=RiskLevel.MEDIUM,
        findings=[sample_finding],
        recommended_actions=["Confirm HTS classification"],
    )
