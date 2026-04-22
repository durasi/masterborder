"""Pydantic schema validation tests."""
import pytest
from pydantic import ValidationError

from backend.schemas.models import (
    AnalysisRequest,
    ComplianceFinding,
    CountryCode,
    CountryReport,
    Product,
    RiskLevel,
)


def test_product_requires_origin_country():
    """Product cannot be built without origin_country (required field)."""
    with pytest.raises(ValidationError):
        Product(name="Test", description="x")  # missing origin_country


def test_country_report_accepts_findings(sample_finding):
    """CountryReport should accept a list of ComplianceFindings."""
    report = CountryReport(
        country=CountryCode.DE,
        hs_code="420231",
        tariff_rate=0.03,
        overall_risk=RiskLevel.LOW,
        findings=[sample_finding],
    )
    assert len(report.findings) == 1
    assert report.findings[0].citation == "HTSUS 4202.31.6000"


def test_risk_level_enum_accepts_known_values():
    """Every expected risk level must be a valid enum member."""
    for value in ["low", "medium", "high", "blocked"]:
        assert RiskLevel(value)


def test_country_code_covers_supported_markets():
    """All currently shipped country codes must be enum members."""
    for iso in ["US", "DE", "GB", "TR", "JP"]:
        assert CountryCode(iso)


def test_analysis_request_requires_at_least_one_target(sample_product):
    """AnalysisRequest must reject an empty target_countries list."""
    with pytest.raises(ValidationError):
        AnalysisRequest(
            product=sample_product,
            target_countries=[],
            include_route_risk=False,
        )


def test_finding_risk_level_rejects_bad_value():
    """ComplianceFinding.risk_level is strict — invalid strings must fail."""
    with pytest.raises(ValidationError):
        ComplianceFinding(
            category="tariff",
            title="x",
            detail="x",
            risk_level="critical",  # not a valid RiskLevel
        )
