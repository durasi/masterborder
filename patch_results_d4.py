#!/usr/bin/env python3
"""Wire up the D4 UI changes in the Results page.

Three precise edits on frontend/app/results/[jobId]/page.tsx:

  1) Extend the lucide-react import to include ShieldCheck (for Verify
     button), Info, HelpCircle (for confidence badge icons). Also add
     ConfidenceLevel to the types import.

  2) Update the FindingRow signature: allow `confidence?: ConfidenceLevel`
     on the finding prop.

  3) Rewrite the citation + source_url footer block inside FindingRow to
     include a confidence badge and a "Verify" button styled like a pill.

Idempotent: skips any edit that has already been applied.
"""

from pathlib import Path
import re
import sys

RESULTS = Path("frontend/app/results/[jobId]/page.tsx")
if not RESULTS.exists():
    print("ERROR: " + str(RESULTS) + " not found.")
    sys.exit(1)

src = RESULTS.read_text(encoding="utf-8")

# --- Edit 1: imports -------------------------------------------------------

if "ShieldCheck" not in src:
    OLD_LUCIDE = "  Shield,\n  ExternalLink,\n} from \"lucide-react\";"
    NEW_LUCIDE = (
        "  Shield,\n"
        "  ShieldCheck,\n"
        "  Info,\n"
        "  HelpCircle,\n"
        "  ExternalLink,\n"
        "} from \"lucide-react\";"
    )
    if OLD_LUCIDE not in src:
        print("ERROR: could not find the lucide-react import anchor.")
        sys.exit(2)
    src = src.replace(OLD_LUCIDE, NEW_LUCIDE, 1)

if "type ConfidenceLevel" not in src:
    # Extend the type import from @/lib/types to include ConfidenceLevel
    OLD_TYPES = (
        "import {\n"
        "  COUNTRY_LABELS,\n"
        "  type AnalysisResponse,\n"
        "  type CountryReport,\n"
        "  type RiskLevel,\n"
        "} from \"@/lib/types\";"
    )
    NEW_TYPES = (
        "import {\n"
        "  COUNTRY_LABELS,\n"
        "  type AnalysisResponse,\n"
        "  type CountryReport,\n"
        "  type RiskLevel,\n"
        "  type ConfidenceLevel,\n"
        "} from \"@/lib/types\";"
    )
    if OLD_TYPES not in src:
        print(
            "ERROR: could not find the @/lib/types import block anchor. "
            "Please add `type ConfidenceLevel` manually to the import."
        )
        sys.exit(3)
    src = src.replace(OLD_TYPES, NEW_TYPES, 1)

# --- Edit 2: FindingRow prop signature ------------------------------------

if "confidence?: ConfidenceLevel" not in src:
    OLD_FINDING_TYPE = (
        "  finding: {\n"
        "    category: string;\n"
        "    title: string;\n"
        "    detail: string;\n"
        "    risk_level: RiskLevel;\n"
        "    citation?: string | null;\n"
        "    source_url?: string | null;\n"
        "  };"
    )
    NEW_FINDING_TYPE = (
        "  finding: {\n"
        "    category: string;\n"
        "    title: string;\n"
        "    detail: string;\n"
        "    risk_level: RiskLevel;\n"
        "    confidence?: ConfidenceLevel | null;\n"
        "    citation?: string | null;\n"
        "    source_url?: string | null;\n"
        "  };"
    )
    if OLD_FINDING_TYPE not in src:
        print("ERROR: could not find FindingRow prop type to extend.")
        sys.exit(4)
    src = src.replace(OLD_FINDING_TYPE, NEW_FINDING_TYPE, 1)

# --- Edit 3: rewrite the citation/source_url footer block ------------------

OLD_FOOTER = '''          {(finding.citation || finding.source_url) && (
            <div className="mt-1.5 flex items-center gap-3 text-[11.5px]">
              {finding.citation && (
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <Shield className="h-3 w-3" />
                  <span className="font-mono text-[11px]">
                    {finding.citation}
                  </span>
                </span>
              )}
              {finding.source_url && (
                <a
                  href={finding.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Source
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
              )}
            </div>
          )}'''

NEW_FOOTER = '''          {(finding.confidence || finding.citation || finding.source_url) && (
            <div className="mt-2 flex flex-wrap items-center gap-2 text-[11.5px]">
              {finding.confidence && (
                <ConfidenceBadge level={finding.confidence} t={t} />
              )}
              {finding.citation && (
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <Shield className="h-3 w-3" />
                  <span className="font-mono text-[11px]">
                    {finding.citation}
                  </span>
                </span>
              )}
              {finding.source_url && (
                <a
                  href={finding.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/[0.06] hover:bg-blue-500/[0.12] px-2.5 py-1 text-[11px] font-medium text-blue-700 dark:text-blue-300 transition-colors"
                >
                  <ShieldCheck className="h-3 w-3" />
                  {t.findings.verify}
                  <ExternalLink className="h-2.5 w-2.5 opacity-70" />
                </a>
              )}
            </div>
          )}'''

if "{t.findings.verify}" not in src:
    if OLD_FOOTER not in src:
        print(
            "ERROR: could not find the existing citation/source footer "
            "block to replace inside FindingRow."
        )
        sys.exit(5)
    src = src.replace(OLD_FOOTER, NEW_FOOTER, 1)

# --- Edit 4: append the ConfidenceBadge component at the bottom ------------

CONFIDENCE_BADGE_FN = '''

// ---------------------------------------------------------------------------
// ConfidenceBadge — shows how well-sourced a single finding is
// ---------------------------------------------------------------------------

const CONFIDENCE_STYLES: Record<ConfidenceLevel, string> = {
  high: "border-emerald-500/40 bg-emerald-500/[0.08] text-emerald-700 dark:text-emerald-300",
  medium: "border-amber-500/40 bg-amber-500/[0.08] text-amber-700 dark:text-amber-300",
  low: "border-slate-500/30 bg-slate-500/[0.06] text-slate-700 dark:text-slate-300",
};

const CONFIDENCE_ICON: Record<
  ConfidenceLevel,
  React.ComponentType<{ className?: string }>
> = {
  high: ShieldCheck,
  medium: Info,
  low: HelpCircle,
};

function ConfidenceBadge({
  level,
  t,
}: {
  level: ConfidenceLevel;
  t: Translations;
}) {
  const Icon = CONFIDENCE_ICON[level];
  const label =
    t.findings.confidence[level] ?? level.charAt(0).toUpperCase() + level.slice(1);
  return (
    <span
      className={
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.06em] " +
        CONFIDENCE_STYLES[level]
      }
      title={t.findings.confidenceTooltip[level]}
    >
      <Icon className="h-2.5 w-2.5" />
      {label}
    </span>
  );
}
'''

if "function ConfidenceBadge" not in src:
    # Append near the very end of the file so it lives alongside RiskBadge.
    # The file ends with `}\n` for the last function; we insert our function
    # before the final blank line.
    src = src.rstrip() + CONFIDENCE_BADGE_FN + "\n"

RESULTS.write_text(src, encoding="utf-8")
print("✓ Results page has ConfidenceBadge + Verify pill.")
