"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  AlertTriangle,
  ArrowLeft,
  Sparkles,
  Loader2,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Shield,
  ShieldCheck,
  Info,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { DownloadPdfButton } from "@/components/DownloadPdfButton";
import {
  COUNTRY_LABELS,
  type AnalysisResponse,
  type CountryReport,
  type RiskLevel,
  type ConfidenceLevel,
} from "@/lib/types";
import { TokenUsageBadge } from "@/components/TokenUsageBadge";
import { RoiCard } from "@/components/RoiCard";
import { ConflictsCard } from "@/components/ConflictsCard";
import { LanguagePicker } from "@/components/LanguagePicker";
import { MeshBackground } from "@/components/landing/MeshBackground";
import { useLocale } from "@/lib/i18n/context";
import type { Translations } from "@/lib/i18n/en";

/**
 * Examples page — pre-computed analyses served from /public/examples/*.json.
 *
 * Visually aligned with the Results page so a reviewer clicking "See example"
 * from the landing page lands on something that feels like the real product,
 * not a legacy template. The only differences from the live Results page:
 *
 *   - An amber "pre-computed example" banner sits right under the navbar
 *   - No deep-dive CTA (the job isn't live on the backend); each country
 *     card ends in a muted card explaining the sample's limits
 *   - Data source is a static JSON fetch instead of api.getJob()
 */

const KNOWN_EXAMPLES: Record<string, string> = {
  "leather-wallet-tr-to-us-de-uk-jp": "/examples/leather-wallet.json",
};

export default function ExamplePage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const { t } = useLocale();

  const [response, setResponse] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    const jsonPath = KNOWN_EXAMPLES[slug];
    if (!jsonPath) {
      setError(t.results.notFound);
      return;
    }

    let cancelled = false;
    async function loadExample() {
      try {
        const res = await fetch(jsonPath, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as AnalysisResponse;
        if (!cancelled) setResponse(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : t.results.notFound);
        }
      }
    }
    loadExample();
    return () => {
      cancelled = true;
    };
  }, [slug, t.results.notFound]);

  // -------- Error state ------------------------------------------------
  if (error) {
    return (
      <>
        <MeshBackground />
        <div className="relative min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md w-full rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_12px_40px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-semibold tracking-tight">
                {t.results.notFound}
              </h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {error}
            </p>
            <Link href="/">
              <Button className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t.results.backToAnalysis}
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  // -------- Loading state ----------------------------------------------
  if (!response) {
    return (
      <>
        <MeshBackground />
        <div className="relative min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
            <p className="text-sm text-muted-foreground">{t.results.loading}</p>
          </div>
        </div>
      </>
    );
  }

  // -------- Loaded ------------------------------------------------------
  const { product, target_countries } = response.request;
  const numMarkets = response.country_reports.length;

  return (
    <>
      <MeshBackground />

      {/* Sticky navbar — same vocabulary as the live Results page */}
      <nav
        data-pdf-hide="true"
        className="print-hidden sticky top-0 z-40 border-b border-border/40 bg-background/70 backdrop-blur-lg"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-sm font-medium transition-colors hover:text-foreground text-muted-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span>{t.results.backToAnalysis}</span>
          </Link>

          <Link
            href="/"
            className="hidden sm:flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-muted/60 transition-colors"
          >
            <Image
              src="/masterborder-logo.svg"
              alt="MasterBorder"
              width={22}
              height={22}
              priority
            />
            <span className="text-sm font-semibold tracking-tight">
              MasterBorder
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <LanguagePicker />
            <DownloadPdfButton data={response} filename={product.name} />
          </div>
        </div>
      </nav>

      <main className="relative">
        <div id="pdf-target" className="mx-auto max-w-5xl px-5 py-10 pb-20">
          {/* Amber banner — makes it unmistakable this is a pre-computed sample */}
          <div
            data-pdf-hide="true"
            className="print-hidden mb-8 flex items-center gap-4 rounded-2xl border border-amber-500/40 bg-gradient-to-br from-amber-500/[0.06] via-card/60 to-amber-500/[0.03] px-5 py-4 backdrop-blur-md"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-300">
              <BookOpen className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-semibold tracking-[-0.01em]">
                {t.example.bannerTitle}
              </div>
              <div className="mt-0.5 text-[12.5px] leading-[1.5] text-muted-foreground">
                {t.example.bannerBody}
              </div>
            </div>
            <Link href="/" className="flex-shrink-0">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap">
                {t.example.ctaRunYourOwn}
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          {/* Hero-like header */}
          <header className="mb-10 mb-fade-up mb-d1">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-[11.5px] font-medium uppercase tracking-[0.06em] text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="h-3 w-3" />
              <span>{t.results.executiveSummary}</span>
            </div>

            <h1
              className="mb-4 font-semibold tracking-[-0.035em] leading-[1.05]"
              style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
            >
              <span
                className="mb-shimmer inline-block italic font-semibold"
                style={{
                  fontFamily:
                    "var(--font-geist-sans), var(--font-sans), sans-serif",
                  paddingRight: "0.1em",
                  letterSpacing: "-0.01em",
                  overflow: "visible",
                }}
              >
                {product.name}
              </span>
            </h1>

            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/80 backdrop-blur-sm px-3 py-1 text-[12px] font-medium">
                <span className="text-muted-foreground">{t.results.origin}</span>
                <span>
                  {t.countries[product.origin_country] ??
                    COUNTRY_LABELS[product.origin_country]}
                </span>
              </div>

              <span className="text-muted-foreground mx-0.5">→</span>

              {target_countries.map((code) => (
                <div
                  key={code}
                  className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 px-3 py-1 text-[12px] font-medium text-blue-900 dark:text-blue-100"
                >
                  <span>{t.countries[code] ?? COUNTRY_LABELS[code]}</span>
                </div>
              ))}
            </div>
          </header>

          {/* Cross-market conflicts (silent when the example has none) */}
          {response.conflicts && response.conflicts.length > 0 && (
            <div className="mb-8 mb-fade-up mb-d2">
              <ConflictsCard conflicts={response.conflicts} />
            </div>
          )}

          {/* Executive Summary */}
          {response.summary && (
            <section className="mb-8 mb-fade-up mb-d3 overflow-hidden rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_12px_40px_rgba(0,0,0,0.04)]">
              <header className="flex items-start gap-3 border-b border-border/40 px-6 py-5">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-md shadow-blue-500/20">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-[17px] font-semibold tracking-[-0.015em]">
                    {t.results.executiveSummary}
                  </h2>
                  <p className="mt-0.5 text-[12.5px] leading-[1.55] text-muted-foreground">
                    {t.results.executiveSummaryDescription.replace(
                      "{count}",
                      String(numMarkets),
                    )}
                  </p>
                </div>
              </header>
              <div className="px-6 py-6">
                <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-table:text-[13px] prose-th:font-semibold prose-td:align-top prose-a:text-blue-600 hover:prose-a:text-blue-700">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {response.summary}
                  </ReactMarkdown>
                </div>
              </div>
            </section>
          )}

          {/* ROI + token usage */}
          {response.token_usage && (
            <div
              className="mb-8 grid gap-4 md:grid-cols-2 mb-fade-up mb-d3 print-hidden"
              data-pdf-hide="true"
            >
              <RoiCard usage={response.token_usage} />
              <TokenUsageBadge usage={response.token_usage} />
            </div>
          )}

          {/* Per-country reports */}
          <section className="space-y-6">
            <div className="flex items-baseline justify-between">
              <h2 className="text-[20px] font-semibold tracking-[-0.02em]">
                {t.results.countryReports}
              </h2>
              <span className="text-[12px] text-muted-foreground">
                {numMarkets} / {target_countries.length}
              </span>
            </div>

            {response.country_reports.map((report) => (
              <CountryCard key={report.country} report={report} t={t} />
            ))}
          </section>

          <footer
            data-pdf-hide="true"
            className="print-hidden mt-14 border-t border-border/40 pt-6 flex flex-col items-center gap-2 text-center text-[11.5px] text-muted-foreground"
          >
            <p>{t.example.footerNote}</p>
          </footer>
        </div>
      </main>
    </>
  );
}

// ---------------------------------------------------------------------------
// CountryCard — one glass card per target market
// ---------------------------------------------------------------------------

function CountryCard({
  report,
  t,
}: {
  report: CountryReport;
  t: Translations;
}) {
  const countryLabel =
    t.countries[report.country] ?? COUNTRY_LABELS[report.country];

  return (
    <article className="group overflow-hidden rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_12px_40px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-border hover:shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_20px_60px_rgba(0,0,0,0.06)]">
      <header className="flex items-start justify-between gap-4 border-b border-border/40 px-6 py-5">
        <div className="min-w-0">
          <h3 className="text-[18px] font-semibold tracking-[-0.02em]">
            {countryLabel}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-muted-foreground">
            {report.hs_code && (
              <span className="inline-flex items-center gap-1.5">
                <span className="uppercase tracking-[0.06em] text-[10.5px]">HS</span>
                <code className="font-mono tabular-nums text-foreground/80">
                  {report.hs_code}
                </code>
              </span>
            )}
            {report.tariff_rate !== null &&
              report.tariff_rate !== undefined && (
                <span className="inline-flex items-center gap-1.5">
                  <span className="uppercase tracking-[0.06em] text-[10.5px]">
                    Tariff
                  </span>
                  <span className="font-semibold tabular-nums text-foreground/80">
                    {(report.tariff_rate * 100).toFixed(1)}%
                  </span>
                </span>
              )}
          </div>
        </div>
        <RiskBadge level={report.overall_risk} t={t} />
      </header>

      {report.findings.length > 0 && (
        <div className="px-6 py-5">
          <h4 className="mb-3 text-[11.5px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
            {t.results.complianceFindings}{" "}
            <span className="text-foreground/60">({report.findings.length})</span>
          </h4>
          <ul className="space-y-2">
            {report.findings.map((f, i) => (
              <FindingRow key={i} finding={f} t={t} />
            ))}
          </ul>
        </div>
      )}

      {report.recommended_actions.length > 0 && (
        <div className="border-t border-border/40 px-6 py-5">
          <h4 className="mb-3 text-[11.5px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
            {t.results.recommendedActions}
          </h4>
          <ol className="space-y-1.5 text-[13.5px] leading-[1.55]">
            {report.recommended_actions.map((action, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex-shrink-0 mt-1 h-5 w-5 rounded-md bg-muted/60 text-[11px] font-medium tabular-nums flex items-center justify-center text-muted-foreground">
                  {i + 1}
                </span>
                <span className="text-foreground/85">{action}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Deep-dive disabled notice — the example job isn't live on the backend */}
      <div
        data-pdf-hide="true"
        className="print-hidden border-t border-border/40 bg-muted/30 px-6 py-4"
      >
        <div className="flex items-center gap-2.5 text-[12.5px] text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 flex-shrink-0" />
          <span>{t.example.deepDiveDisabled}</span>
        </div>
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// FindingRow — one finding with a risk-coloured left border + icon + D4 UI
// ---------------------------------------------------------------------------

const RISK_ICON: Record<RiskLevel, React.ComponentType<{ className?: string }>> = {
  low: CheckCircle2,
  medium: AlertCircle,
  high: AlertTriangle,
  blocked: XCircle,
};

const RISK_ACCENT: Record<RiskLevel, string> = {
  low: "border-l-emerald-500/70 bg-emerald-500/[0.03]",
  medium: "border-l-amber-500/70 bg-amber-500/[0.03]",
  high: "border-l-orange-500/70 bg-orange-500/[0.03]",
  blocked: "border-l-red-500/70 bg-red-500/[0.04]",
};

const RISK_ICON_COLOR: Record<RiskLevel, string> = {
  low: "text-emerald-600 dark:text-emerald-400",
  medium: "text-amber-600 dark:text-amber-400",
  high: "text-orange-600 dark:text-orange-400",
  blocked: "text-red-600 dark:text-red-400",
};

function FindingRow({
  finding,
  t,
}: {
  finding: {
    category: string;
    title: string;
    detail: string;
    risk_level: RiskLevel;
    confidence?: ConfidenceLevel | null;
    citation?: string | null;
    source_url?: string | null;
  };
  t: Translations;
}) {
  const Icon = RISK_ICON[finding.risk_level];
  return (
    <li
      className={
        "rounded-md border border-border/40 border-l-4 px-3.5 py-2.5 text-[13px] leading-[1.5] transition-colors hover:bg-background/80 " +
        RISK_ACCENT[finding.risk_level]
      }
    >
      <div className="flex items-start gap-2.5">
        <Icon
          className={
            "h-3.5 w-3.5 flex-shrink-0 mt-0.5 " +
            RISK_ICON_COLOR[finding.risk_level]
          }
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="font-semibold tracking-[-0.01em]">
              {finding.title}
            </span>
            <span className="text-[10.5px] uppercase tracking-[0.08em] text-muted-foreground">
              {finding.category}
            </span>
            <span className="ml-auto text-[10.5px] uppercase tracking-[0.08em] font-medium text-muted-foreground">
              {riskLabel(finding.risk_level, t)}
            </span>
          </div>
          <p className="mt-1 text-foreground/75">{finding.detail}</p>
          {(finding.confidence || finding.citation || finding.source_url) && (
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
          )}
        </div>
      </div>
    </li>
  );
}

// ---------------------------------------------------------------------------
// RiskBadge — pill for the country's overall_risk
// ---------------------------------------------------------------------------

function riskLabel(level: RiskLevel, t: Translations): string {
  switch (level) {
    case "low":
      return t.risk.low;
    case "medium":
      return t.risk.medium;
    case "high":
      return t.risk.high;
    case "blocked":
      return t.risk.blocked;
  }
}

function RiskBadge({ level, t }: { level: RiskLevel; t: Translations }) {
  const styles: Record<RiskLevel, string> = {
    low: "border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 text-emerald-700 dark:text-emerald-300",
    medium:
      "border-amber-500/40 bg-gradient-to-br from-amber-500/10 to-amber-500/5 text-amber-700 dark:text-amber-300",
    high: "border-orange-500/40 bg-gradient-to-br from-orange-500/10 to-orange-500/5 text-orange-700 dark:text-orange-300",
    blocked:
      "border-red-500/40 bg-gradient-to-br from-red-500/10 to-red-500/5 text-red-700 dark:text-red-300",
  };
  const dotColor: Record<RiskLevel, string> = {
    low: "bg-emerald-500",
    medium: "bg-amber-500",
    high: "bg-orange-500",
    blocked: "bg-red-500",
  };
  return (
    <span
      className={
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11.5px] font-semibold uppercase tracking-[0.06em] shrink-0 " +
        styles[level]
      }
    >
      <span className={"h-1.5 w-1.5 rounded-full " + dotColor[level]} />
      {riskLabel(level, t)} {t.risk.suffix}
    </span>
  );
}

// ---------------------------------------------------------------------------
// ConfidenceBadge — matches the Results page exactly
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
    t.findings.confidence[level] ??
    level.charAt(0).toUpperCase() + level.slice(1);
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
