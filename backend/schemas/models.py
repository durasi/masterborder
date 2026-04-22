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
    preferred_language: str = Field(
        default="en",
        pattern="^(en|tr|es|fr|de|pt|ar|zh|ja|ko|ru|it|nl|hi|id|pl)$",
        description="ISO 639-1 language code for report output (16 languages supported, matches Isarud.com)"
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


class TokenUsage(BaseModel):
    """Opus 4.7 token usage + estimated cost for a single analysis job.

    Opus 4.7 pricing (April 2026):
      - Input:  $15 / 1M tokens
      - Output: $75 / 1M tokens
    """
    input_tokens: int = 0
    output_tokens: int = 0
    estimated_cost_usd: float = 0.0

    @classmethod
    def from_counts(cls, input_tokens: int, output_tokens: int) -> "TokenUsage":
        cost = (input_tokens * 15.0 / 1_000_000) + (output_tokens * 75.0 / 1_000_000)
        return cls(
            input_tokens=input_tokens,
            output_tokens=output_tokens,
            estimated_cost_usd=round(cost, 4),
        )


class AnalysisResponse(BaseModel):
    """Full harmonized response for an analysis job."""
    job_id: str
    created_at: datetime
    completed_at: Optional[datetime] = None
    request: AnalysisRequest
    country_reports: list[CountryReport] = Field(default_factory=list)
    summary: Optional[str] = Field(None, description="Human-in-the-loop recommendation summary")
    token_usage: Optional[TokenUsage] = Field(None, description="Aggregate Opus 4.7 usage across all agents")
