#!/usr/bin/env python3
"""Add ConfidenceLevel type and confidence field to frontend/lib/types.ts.

Two edits:
  1) Append `export type ConfidenceLevel = "high" | "medium" | "low";`
     right after the existing RiskLevel type.
  2) Add `confidence?: ConfidenceLevel;` to the ComplianceFinding interface,
     right after risk_level.

Idempotent.
"""

from pathlib import Path
import re
import sys

TYPES = Path("frontend/lib/types.ts")
if not TYPES.exists():
    print("ERROR: " + str(TYPES) + " not found.")
    sys.exit(1)

src = TYPES.read_text(encoding="utf-8")

if "ConfidenceLevel" in src and "confidence?:" in src:
    print("types.ts already has ConfidenceLevel + confidence field — no-op.")
    sys.exit(0)

# --- Edit 1: ConfidenceLevel type ------------------------------------------

RISK_TYPE_LINE = 'export type RiskLevel = "low" | "medium" | "high" | "blocked";'
CONFIDENCE_TYPE_LINE = 'export type ConfidenceLevel = "high" | "medium" | "low";'

if "ConfidenceLevel" not in src:
    if RISK_TYPE_LINE not in src:
        # Try a relaxed regex: any export type RiskLevel = ...;
        m = re.search(r'^export type RiskLevel\s*=[^;]+;', src, re.MULTILINE)
        if not m:
            print("ERROR: could not find RiskLevel type declaration.")
            sys.exit(2)
        anchor = m.group(0)
        src = src.replace(anchor, anchor + "\n" + CONFIDENCE_TYPE_LINE, 1)
    else:
        src = src.replace(
            RISK_TYPE_LINE,
            RISK_TYPE_LINE + "\n" + CONFIDENCE_TYPE_LINE,
            1,
        )

# --- Edit 2: confidence on ComplianceFinding interface ---------------------

if "confidence?:" not in src:
    # Find `risk_level: RiskLevel;` inside the ComplianceFinding interface
    # and insert the confidence line right after it.
    pattern = re.compile(
        r"(export interface ComplianceFinding \{[\s\S]*?risk_level:\s*RiskLevel;)",
        re.MULTILINE,
    )
    m = pattern.search(src)
    if not m:
        print("ERROR: could not find ComplianceFinding.risk_level anchor.")
        sys.exit(3)
    src = src.replace(
        m.group(1),
        m.group(1) + "\n  confidence?: ConfidenceLevel;",
        1,
    )

TYPES.write_text(src, encoding="utf-8")
print("✓ types.ts has ConfidenceLevel + confidence field.")
