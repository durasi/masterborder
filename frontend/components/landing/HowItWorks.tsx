"use client";

import {
  FileEdit,
  Cpu,
  GitMerge,
  FileCheck2,
  AlertTriangle,
  Clock,
  DollarSign,
  Users,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

/**
 * HowItWorks — in-page educational section.
 *
 * Explains cross-border trade compliance to people outside the industry:
 * why it's hard today, what the 4-step pipeline does, and why it matters
 * economically. Anchored by #how-it-works.
 *
 * Visual emphasis: step 4 (Deliver) carries the interactive deep-dive
 * capability, which is a core differentiator. We highlight it with a
 * blue-tinted border and follow the pipeline with a dedicated callout
 * card that explains the deep-dive experience in more detail.
 */
export function HowItWorks() {
  const { t } = useLocale();

  const steps = [
    { key: "describe", icon: FileEdit, highlight: false },
    { key: "parallel", icon: Cpu, highlight: false },
    { key: "harmonize", icon: GitMerge, highlight: false },
    { key: "deliver", icon: FileCheck2, highlight: true },
  ] as const;

  const impacts = [
    { key: "smallExporter", icon: AlertTriangle },
    { key: "bigExporter", icon: Clock },
    { key: "mistakeCost", icon: DollarSign },
    { key: "access", icon: Users },
  ] as const;

  return (
    <section id="how-it-works" className="mx-auto mt-24 max-w-5xl scroll-mt-20">
      <div className="mb-12 text-center">
        <span className="mb-3 inline-block rounded-full bg-blue-500/10 px-3 py-1 text-[11.5px] font-medium uppercase tracking-[0.06em] text-blue-700 dark:text-blue-300">
          {t.howItWorks.eyebrow}
        </span>
        <h2
          className="mx-auto mb-4 max-w-[760px] font-semibold tracking-[-0.03em] leading-[1.1]"
          style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}
        >
          {t.howItWorks.heading}
        </h2>
        <p className="mx-auto max-w-[640px] text-[15px] leading-[1.6] text-muted-foreground">
          {t.howItWorks.sub}
        </p>
      </div>

      {/* Sector context */}
      <div className="mb-16 rounded-2xl border border-border/60 bg-card/70 p-6 sm:p-8 backdrop-blur-md">
        <h3 className="mb-3 text-[17px] font-semibold tracking-tight">
          {t.howItWorks.contextHeading}
        </h3>
        <p className="mb-4 text-[14.5px] leading-[1.65] text-muted-foreground">
          {t.howItWorks.contextP1}
        </p>
        <p className="text-[14.5px] leading-[1.65] text-muted-foreground">
          {t.howItWorks.contextP2}
        </p>
      </div>

      {/* Four-step pipeline */}
      <div className="mb-10">
        <div className="mb-8 text-center">
          <h3
            className="font-semibold tracking-[-0.02em]"
            style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.625rem)" }}
          >
            {t.howItWorks.pipelineHeading}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const stepData = (
              t.howItWorks.steps as Record<string, { title: string; body: string }>
            )[step.key];
            return (
              <div
                key={step.key}
                className={
                  "group relative rounded-xl border bg-card/80 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg " +
                  (step.highlight
                    ? "border-blue-500/50 bg-gradient-to-br from-blue-500/[0.06] via-card/80 to-violet-500/[0.04] ring-1 ring-blue-500/20 shadow-[0_0_0_1px_rgba(37,99,235,0.08),_0_8px_24px_rgba(37,99,235,0.08)] hover:border-blue-500/60"
                    : "border-border/60 hover:border-blue-500/40")
                }
              >
                <div className="absolute right-4 top-4 font-mono text-[13px] font-medium tabular-nums text-blue-600/40 dark:text-blue-400/40">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3"
                  style={{
                    background: "color-mix(in srgb, var(--cat-core) 12%, transparent)",
                    color: "var(--cat-core)",
                  }}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="mb-1.5 flex items-center gap-2">
                  <span className="text-[15px] font-semibold tracking-[-0.015em]">
                    {stepData.title}
                  </span>
                  {step.highlight && (
                    <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                  )}
                </div>
                <div className="text-[13px] leading-[1.55] text-muted-foreground">
                  {stepData.body}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deep-dive callout — emphasizes the signature interactive capability */}
      <div className="mb-16 overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/[0.08] via-transparent to-violet-500/[0.06] p-6 sm:p-7 backdrop-blur-md">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-lg shadow-blue-500/30">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center gap-2 flex-wrap">
              <h3 className="text-[17px] font-semibold tracking-[-0.015em]">
                {t.features.items.deepDive.title}
              </h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/15 px-2 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.08em] text-blue-700 dark:text-blue-300">
                <Sparkles className="h-2.5 w-2.5" />
                {t.deepDiveCta.headline}
              </span>
            </div>
            <p className="mb-3 text-[13.5px] leading-[1.6] text-muted-foreground">
              {t.features.items.deepDive.body}
            </p>
            <p className="text-[13px] leading-[1.55] text-foreground/80">
              {t.deepDiveCta.body}
            </p>
          </div>
        </div>
      </div>

      {/* Impact */}
      <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-blue-500/5 via-transparent to-violet-500/5 p-6 sm:p-8 backdrop-blur-md">
        <h3 className="mb-2 text-[17px] font-semibold tracking-tight">
          {t.howItWorks.impactHeading}
        </h3>
        <p className="mb-6 text-[14px] leading-[1.6] text-muted-foreground">
          {t.howItWorks.impactLead}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {impacts.map((impact) => {
            const Icon = impact.icon;
            const impactData = (
              t.howItWorks.impacts as Record<string, { title: string; body: string }>
            )[impact.key];
            return (
              <div
                key={impact.key}
                className="flex gap-3 rounded-lg border border-border/40 bg-background/60 p-4 transition-colors hover:border-border"
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-muted/60 text-muted-foreground">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="mb-1 text-[13.5px] font-semibold tracking-tight">
                    {impactData.title}
                  </div>
                  <div className="text-[12.5px] leading-[1.55] text-muted-foreground">
                    {impactData.body}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 rounded-lg border border-blue-500/30 bg-blue-500/5 px-4 py-3 text-[13.5px] leading-[1.55]">
          <span className="font-semibold text-blue-900 dark:text-blue-100">
            {t.howItWorks.bottomLineLabel}
          </span>{" "}
          <span className="text-foreground/90">{t.howItWorks.bottomLine}</span>
        </div>
      </div>
    </section>
  );
}
