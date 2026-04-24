"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Loader2,
  MessageSquare,
  Target,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Shield,
  ShieldCheck,
  Clock,
  Info,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import { DownloadPdfButton } from "@/components/DownloadPdfButton";
import { api, APIError } from "@/lib/api";
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
 * Results page — analysis output for one job.
 *
 * The visual language here matches the landing page: sticky blurred navbar,
 * mesh-orb background, glass-morphism cards. Data flow is unchanged from the
 * previous implementation — we still fetch the full AnalysisResponse via
 * api.getJob(jobId), render ConflictsCard, executive summary, and one
 * country card per target market, each with a Deep-dive CTA to
 * /results/{jobId}/{country}.
 */

export default function ResultsPage() {
  const params = useParams<{ jobId: string }>();
  const router = useRouter();
  const jobId = params.jobId;
  const { t } = useLocale();

  const [response, setResponse] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expired, setExpired] = useState<boolean>(false);
  const countriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!jobId) return;
    let cancelled = false;

    async function fetchJob() {
      try {
        const data = await api.getJob(jobId);
        if (!cancelled) setResponse(data);
      } catch (err) {
        if (cancelled) return;
        if (err instanceof APIError && err.status === 404) {
          setExpired(true);
        } else {
          setError(err instanceof Error ? err.message : t.results.notFound);
        }
      }
    }

    fetchJob();
    return () => {
      cancelled = true;
    };
  }, [jobId, t.results.notFound]);

  // -------- Expired state (404 from the backend cache) ---------------
  if (expired) {
    return (
      <>
        <MeshBackground />
        <div className="relative min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md w-full rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/[0.06] via-card/80 to-violet-500/[0.04] backdrop-blur-md p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_20px_60px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-md shadow-blue-500/20">
                <Clock className="h-5 w-5" />
              </div>
              <h2 className="text-[17px] font-semibold tracking-[-0.015em]">
                {t.results.expired}
              </h2>
            </div>
            <p className="text-[13.5px] text-muted-foreground leading-[1.6] mb-6">
              {t.results.expiredBody}
            </p>
            <Button
              onClick={() => router.push("/")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {t.results.runNewAnalysis}
            </Button>
          </div>
        </div>
      </>
    );
  }

  // -------- Error state -------------------------------------------------
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
            <Button onClick={() => router.push("/")} className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t.results.backToAnalysis}
            </Button>
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

      {/* Sticky navbar mirroring the landing page's navbar — preserves
          visual continuity as the user transitions from form to results. */}
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

          <div className="flex items-center gap-2">
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
          </div>

          <div className="flex items-center gap-2">
            <LanguagePicker />
            <DownloadPdfButton data={response} filename={product.name} />
          </div>
        </div>
      </nav>

      <main className="relative">
        <div id="pdf-target" className="mx-auto max-w-5xl px-5 py-10 pb-20">
          {/* Hero-like header: product name + gradient italic accent + country chips */}
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
              {/* Origin country pill */}
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
                  <span>
                    {t.countries[code] ?? COUNTRY_LABELS[code]}
                  </span>
                </div>
              ))}
            </div>
          </header>

          {/* Conflicts card (silent when empty) */}
          {response.conflicts && response.conflicts.length > 0 && (
            <div className="mb-8 mb-fade-up mb-d2">
              <ConflictsCard conflicts={response.conflicts} />
            </div>
          )}
          {/* Deep-dive hero CTA — educational card that introduces the
              feature so reviewers don't have to scroll through every
              country card to notice that follow-up Q&A is available. */}
          <section
            data-pdf-hide="true"
            className="print-hidden mb-8 mb-fade-up mb-d2 overflow-hidden rounded-2xl border border-blue-500/25 bg-gradient-to-br from-blue-500/[0.04] via-card/80 to-violet-500/[0.05] backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_16px_50px_rgba(59,130,246,0.06)]"
          >
            <div className="px-6 py-6 sm:px-7 sm:py-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-md shadow-blue-500/25">
                  <Sparkles className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.08em] text-blue-700 dark:text-blue-300">
                    {t.deepDiveHero.eyebrow}
                  </div>

                  <h2
                    className="mb-2 font-semibold tracking-[-0.025em] leading-[1.15]"
                    style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}
                  >
                    <span
                      className="mb-shimmer inline-block italic font-semibold"
                      style={{
                        fontFamily:
                          "var(--font-geist-sans), var(--font-sans), sans-serif",
                        paddingRight: "0.08em",
                        letterSpacing: "-0.01em",
                        overflow: "visible",
                      }}
                    >
                      {t.deepDiveHero.title}
                    </span>
                  </h2>

                  <p className="mb-5 text-[13.5px] leading-[1.6] text-muted-foreground max-w-2xl">
                    {t.deepDiveHero.body}
                  </p>

                  <ul className="mb-5 grid gap-2 sm:grid-cols-3 sm:gap-3">
                    <li className="flex items-start gap-2 text-[12.5px] leading-[1.5]">
                      <div className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded bg-blue-500/15 text-blue-600 dark:text-blue-300">
                        <Target className="h-2.5 w-2.5" />
                      </div>
                      <span className="text-foreground/80">
                        {t.deepDiveHero.bullet1}
                      </span>
                    </li>
                    <li className="flex items-start gap-2 text-[12.5px] leading-[1.5]">
                      <div className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded bg-blue-500/15 text-blue-600 dark:text-blue-300">
                        <Shield className="h-2.5 w-2.5" />
                      </div>
                      <span className="text-foreground/80">
                        {t.deepDiveHero.bullet2}
                      </span>
                    </li>
                    <li className="flex items-start gap-2 text-[12.5px] leading-[1.5]">
                      <div className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded bg-blue-500/15 text-blue-600 dark:text-blue-300">
                        <MessageSquare className="h-2.5 w-2.5" />
                      </div>
                      <span className="text-foreground/80">
                        {t.deepDiveHero.bullet3}
                      </span>
                    </li>
                  </ul>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      countriesRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      })
                    }
                    className="border-blue-500/40 text-blue-700 hover:bg-blue-500/10 dark:text-blue-300"
                  >
                    {t.deepDiveHero.scrollCta}
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </section>


          {/* Executive summary — the harmonizer's markdown output */}
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

          {/* ROI + token usage, side by side on wide screens */}
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
          <section ref={countriesRef} className="space-y-6">
            <div className="flex items-baseline justify-between">
              <h2 className="text-[20px] font-semibold tracking-[-0.02em]">
                {t.results.countryReports}
              </h2>
              <span className="text-[12px] text-muted-foreground">
                {numMarkets} / {target_countries.length}
              </span>
            </div>

            {response.country_reports.map((report) => (
              <CountryCard
                key={report.country}
                report={report}
                jobId={response.job_id}
                t={t}
              />
            ))}
          </section>

          {/* Footer */}
          <footer
            data-pdf-hide="true"
            className="print-hidden mt-14 border-t border-border/40 pt-6 flex flex-col items-center gap-2 text-center text-[11.5px] text-muted-foreground"
          >
            <p>
              {t.results.jobId}{" "}
              <code className="font-mono text-[11px] text-foreground/70">
                {response.job_id}
              </code>
            </p>
            {response.agents_version &&
              Object.keys(response.agents_version).length > 0 && (
                <p className="text-[11px] text-muted-foreground/80">
                  <span className="uppercase tracking-[0.06em]">
                    {t.results.agentsFooter}
                  </span>
                  :{" "}
                  <span className="font-mono text-[10.5px] text-foreground/60">
                    {Object.entries(response.agents_version)
                      .map(([name, ver]) => `${name} ${ver}`)
                      .join("  ·  ")}
                  </span>
                </p>
              )}
            <p className="text-[11px]">{t.footer.license}</p>
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
  jobId,
  t,
}: {
  report: CountryReport;
  jobId: string;
  t: Translations;
}) {
  const countryLabel =
    t.countries[report.country] ?? COUNTRY_LABELS[report.country];

  return (
    <article className="group overflow-hidden rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_12px_40px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-border hover:shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_20px_60px_rgba(0,0,0,0.06)]">
      {/* Card header */}
      <header className="flex items-start justify-between gap-4 border-b border-border/40 px-6 py-5">
        <div className="min-w-0">
          <h3 className="text-[18px] font-semibold tracking-[-0.02em]">
            {countryLabel}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-muted-foreground">
            {report.hs_code && (
              <span className="inline-flex items-center gap-1.5">
                <span className="uppercase tracking-[0.06em] text-[10.5px]">
                  HS
                </span>
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

      {/* Findings */}
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

      {/* Recommended actions */}
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

      {/* Deep-dive CTA — styled like the landing page's deep-dive callout */}
      <div
        data-pdf-hide="true"
        className="print-hidden border-t border-blue-500/20 bg-gradient-to-br from-blue-500/[0.06] via-transparent to-violet-500/[0.04] px-6 py-5"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3 min-w-0">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-md shadow-blue-500/20">
              <MessageSquare className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="text-[14px] font-semibold tracking-[-0.015em] text-blue-900 dark:text-blue-100 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                {t.deepDiveCta.headline}
              </div>
              <p className="mt-0.5 text-[12.5px] leading-[1.5] text-muted-foreground">
                {t.deepDiveCta.body}
              </p>
            </div>
          </div>
          <Link
            href={`/results/${jobId}/${report.country}`}
            className="inline-flex"
          >
            <Button
              size="sm"
              className="group/btn bg-blue-600 hover:bg-blue-700 text-white shadow-sm whitespace-nowrap"
            >
              {t.deepDiveCta.button}
              <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// FindingRow — one finding with a risk-coloured left border + icon
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

