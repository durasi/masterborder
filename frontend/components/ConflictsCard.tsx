"use client";

import {
  AlertTriangle,
  FileText,
  Tags,
  ShieldCheck,
  BookOpen,
  Percent,
  ArrowLeftRight,
} from "lucide-react";
import type { ComponentType } from "react";

import { COUNTRY_LABELS, type Conflict, type ConflictType } from "@/lib/types";
import { useLocale } from "@/lib/i18n/context";

/**
 * ConflictsCard — "Cross-market conflicts detected" block.
 *
 * Rendered on the Results page between the executive summary and the per-
 * country report sections. Returns null when there are no conflicts so it
 * never pollutes the output of simple one-or-two-country analyses.
 *
 * The conflict objects are produced server-side by the Haiku 4.5 conflict
 * extractor, so this component is purely presentational.
 */

const ICON_BY_TYPE: Record<ConflictType, ComponentType<{ className?: string }>> = {
  hs_code: FileText,
  labeling: Tags,
  certification: ShieldCheck,
  documentation: BookOpen,
  tariff: Percent,
  other: ArrowLeftRight,
};

interface ConflictsCardProps {
  conflicts: Conflict[];
}

export function ConflictsCard({ conflicts }: ConflictsCardProps) {
  const { t } = useLocale();

  if (!conflicts || conflicts.length === 0) return null;

  // When the extractor returns an empty array, the whole card stays hidden.
  // We deliberately don't render a "no conflicts" state: absence of divergence
  // is a healthy outcome, not something the seller needs to read about.

  return (
    <section className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/[0.06] via-card/70 to-red-500/[0.04] backdrop-blur-md overflow-hidden">
      <header className="flex items-start gap-3 border-b border-amber-500/20 px-6 py-4">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-300">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h2 className="text-[16px] font-semibold tracking-[-0.015em]">
            {t.conflicts.title}{" "}
            <span className="text-muted-foreground font-normal">
              ({conflicts.length})
            </span>
          </h2>
          <p className="mt-0.5 text-[12.5px] leading-[1.55] text-muted-foreground">
            {t.conflicts.subtitle}
          </p>
        </div>
      </header>

      <ul className="divide-y divide-amber-500/10">
        {conflicts.map((c, idx) => {
          const Icon = ICON_BY_TYPE[c.type] ?? ArrowLeftRight;
          const typeLabel = t.conflicts.types[c.type] ?? t.conflicts.types.other;
          return (
            <li
              key={`${c.type}-${idx}`}
              className="flex gap-4 px-6 py-4 transition-colors hover:bg-amber-500/[0.03]"
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-background/60 text-amber-700 dark:text-amber-300">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <div className="flex items-center gap-1 text-[12px] font-mono tabular-nums text-muted-foreground">
                    {c.countries.map((code, i) => (
                      <span key={`${code}-${i}`} className="inline-flex items-center">
                        <span className="whitespace-nowrap">
                          {COUNTRY_LABELS[code]?.split(" ")[0] ?? code}
                        </span>
                        {i < c.countries.length - 1 && (
                          <span className="mx-1 text-amber-500/70">↔</span>
                        )}
                      </span>
                    ))}
                  </div>
                  <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.06em] text-amber-700 dark:text-amber-300">
                    {typeLabel}
                  </span>
                </div>
                <div className="text-[14px] font-semibold tracking-[-0.01em]">
                  {c.title}
                </div>
                <div className="mt-1 text-[13px] leading-[1.55] text-muted-foreground">
                  {c.detail}
                </div>
                <div className="mt-1.5 text-[12.5px] leading-[1.5] text-foreground/80">
                  <span className="font-medium text-amber-700 dark:text-amber-300">
                    {t.conflicts.impactLabel}
                  </span>{" "}
                  {c.impact}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
