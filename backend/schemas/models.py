"""Core data models for MasterBorder trade compliance analysis."""

from datetime import datetime
from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field


class CountryCode(str, Enum):
    """ISO 3166-1 alpha-2 country codes supported by MasterBorder."""
    US = "US"
    DE = "DE"  # Germany (EU representative)
    UK = "GB"  # United Kingdom
    TR = "TR"  # Turkey
    JP = "JP"  # Japan


class RiskLevel(str, Enum):
    """Risk classification for compliance findings."""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    BLOCKED = "blocked"


class Product(BaseModel):
    """A product being analyzed for cross-border trade."""
    name: str = Field(..., description="Product name (e.g., 'leather wallet')")
    description: str = Field(..., description="Detailed description including materials")
    category: Optional[str] = Field(None, description="High-level category (e.g., 'apparel', 'electronics')")
    origin_country: CountryCode = Field(..., description="Country of manufacture/origin")
    estimated_value_usd: Optional[float] = Field(None, description="Per-unit value in USD")


class AnalysisRequest(BaseModel):
    """Input payload for a trade compliance analysis job."""
    product: Product
    target_countries: list[CountryCode] = Field(..., min_length=1, description="Countries to analyze")
    include_route_risk: bool = Field(
        default=True,
        description="Analyze geopolitical/shipping route risk (straits, conflict zones)"
    )


class ComplianceFinding(BaseModel):
    """A single compliance data point for a country."""
    category: str  # e.g., "tariff", "sanctions", "dual_use", "documents"
    title: str
    detail: str
    risk_level: RiskLevel
    source_url: Optional[str] = None
    citation: Optional[str] = None


class CountryReport(BaseModel):
    """Compliance analysis results for a single target country."""
    country: CountryCode
    hs_code: Optional[str] = Field(None, description="Harmonized System code (6-digit)")
    tariff_rate: Optional[float] = Field(None, description="Import duty as decimal (e.g., 0.12 = 12%)")
    findings: list[ComplianceFinding] = Field(default_factory=list)
    overall_risk: RiskLevel
    recommended_actions: list[str] = Field(default_factory=list)


class AnalysisResponse(BaseModel):
    """Full harmonized response for an analysis job."""
    job_id: str
    created_at: datetime
    completed_at: Optional[datetime] = None
    request: AnalysisRequest
    country_reports: list[CountryReport] = Field(default_factory=list)
    summary: Optional[str] = Field(None, description="Human-in-the-loop recommendation summary")
