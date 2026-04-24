#!/usr/bin/env python3
"""Add ConfidenceLevel enum and confidence field to ComplianceFinding.

Two precise edits to backend/schemas/models.py:

  1) After the RiskLevel enum, add ConfidenceLevel (high/medium/low).
  2) Inside ComplianceFinding, add `confidence: Optional[ConfidenceLevel] = None`
     right after risk_level.

Idempotent: skips if the enum and field already exist.
"""

from pathlib import Path
import sys

MODELS = Path("backend/schemas/models.py")
if not MODELS.exists():
    print("ERROR: " + str(MODELS) + " not found. Run from repo root.")
    sys.exit(1)

src = MODELS.read_text(encoding="utf-8")

if "class ConfidenceLevel" in src and "confidence: Optional[ConfidenceLevel]" in src:
    print("models.py already has ConfidenceLevel + confidence field — no-op.")
    sys.exit(0)

# --- Edit 1: ConfidenceLevel enum, placed after RiskLevel ------------------

CONFIDENCE_ENUM = '''


class ConfidenceLevel(str, Enum):
    """How well supported a finding is by authoritative sources.

    The grader agent assigns this per finding:
      - HIGH:   backed by an explicit regulatory citation or a verifiable
                URL in an authoritative domain (gov, europa.eu, customs
                authorities, standards bodies).
      - MEDIUM: references an established trade practice or a reputable
                secondary source without a pinpoint citation.
      - LOW:    best-effort inference from general knowledge without any
                cited authority.
    """
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"
'''

RISK_END_ANCHOR = '''class RiskLevel(str, Enum):
    """Risk classification for compliance findings."""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    BLOCKED = "blocked"'''

if "class ConfidenceLevel" not in src:
    if RISK_END_ANCHOR not in src:
        print("ERROR: could not find RiskLevel enum to anchor after.")
        sys.exit(2)
    src = src.replace(RISK_END_ANCHOR, RISK_END_ANCHOR + CONFIDENCE_ENUM, 1)

# --- Edit 2: confidence field on ComplianceFinding -------------------------

OLD_FINDING_BLOCK = '''class ComplianceFinding(BaseModel):
    """A single compliance data point for a country."""
    category: str  # e.g., "tariff", "sanctions", "dual_use", "documents"
    title: str
    detail: str
    risk_level: RiskLevel
    source_url: Optional[str] = None
    citation: Optional[str] = None'''

NEW_FINDING_BLOCK = '''class ComplianceFinding(BaseModel):
    """A single compliance data point for a country."""
    category: str  # e.g., "tariff", "sanctions", "dual_use", "documents"
    title: str
    detail: str
    risk_level: RiskLevel
    confidence: Optional[ConfidenceLevel] = Field(
        None,
        description="How well supported this finding is by cited sources. "
                    "Filled in by the confidence grader agent after the country "
                    "agents run; None means not graded.",
    )
    source_url: Optional[str] = None
    citation: Optional[str] = None'''

if "confidence: Optional[ConfidenceLevel]" not in src:
    if OLD_FINDING_BLOCK not in src:
        print("ERROR: could not find the ComplianceFinding block to extend.")
        sys.exit(3)
    src = src.replace(OLD_FINDING_BLOCK, NEW_FINDING_BLOCK, 1)

MODELS.write_text(src, encoding="utf-8")
print("✓ models.py patched with ConfidenceLevel + confidence field.")
