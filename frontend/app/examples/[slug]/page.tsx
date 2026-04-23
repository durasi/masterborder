"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AlertTriangle, ArrowRight, Sparkles, Loader2, BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { DownloadPdfButton } from "@/components/DownloadPdfButton";
import {
  COUNTRY_LABELS,
  RISK_COLORS,
  type AnalysisResponse,
  type CountryReport,
  type RiskLevel,
} from "@/lib/types";
import { TokenUsageBadge } from "@/components/TokenUsageBadge";
import { RoiCard } from "@/components/RoiCard";
import { LanguagePicker } from "@/components/LanguagePicker";
import { useLocale } from "@/lib/i18n/context";
import type { Translations } from "@/lib/i18n/en";

// Known examples live as static JSON files under /public/examples/<slug>.json.
// Fetching them at runtime (rather than importing at build time) keeps the
// example fresh whenever the JSON is regenerated without rebuilding the app.
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

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <CardTitle>{t.results.notFound}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{error}</p>
            <Link href="/">
              <Button>{t.results.backToAnalysis}</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">{t.results.loading}</p>
        </div>
      </div>
    );
  }

  const { product, target_countries } = response.request;
  const numMarkets = response.country_reports.length;

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div id="pdf-target" className="mx-auto max-w-4xl bg-background">
        {/* Top bar with language picker */}
        <div className="mb-4 flex justify-end print-hidden" data-pdf-hide="true">
          <LanguagePicker />
        </div>

        {/* Example banner — makes it unmistakable this is a pre-computed sample */}
        <div
          className="mb-4 flex items-center gap-3 rounded-lg border-2 border-amber-400/50 bg-amber-50 dark:bg-amber-950/20 px-4 py-3 print-hidden"
          data-pdf-hide="true"
        >
          <BookOpen className="h-5 w-5 text-amber-700 dark:text-amber-400 flex-shrink-0" />
          <div className="flex-1 text-sm">
            <div className="font-semibold text-amber-900 dark:text-amber-100">
              {t.example.bannerTitle}
            </div>
            <div className="text-amber-800/80 dark:text-amber-200/80 text-xs">
              {t.example.bannerBody}
            </div>
          </div>
          <Link href="/" className="flex-shrink-0">
            <Button size="sm" variant="outline">
              {t.example.ctaRunYourOwn}
              <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* Header */}
        <header className="mb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {t.results.backToAnalysis}
              </Link>
              <h1 className="text-3xl font-semibold tracking-tight mt-2">
                {product.name}
              </h1>
              <p className="text-muted-foreground mt-1">
                {t.results.analyzedFor}{" "}
                {target_countries
                  .map((c) => t.countries[c] ?? COUNTRY_LABELS[c].replace(/^\S+\s/, ""))
                  .join(", ")}{" "}
                · {t.results.origin}{" "}
                {t.countries[product.origin_country] ?? COUNTRY_LABELS[product.origin_country]}
              </p>
            </div>
            <div className="pt-8 print-hidden" data-pdf-hide="true">
              <DownloadPdfButton data={response} filename={product.name} />
            </div>
          </div>
        </header>

        {/* Executive summary (harmonizer output) */}
        {response.summary && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t.results.executiveSummary}</CardTitle>
              <CardDescription>
                {t.results.executiveSummaryDescription.replace(
                  "{count}",
                  String(numMarkets),
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {response.summary}
                </ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ROI badge — dramatic savings vs traditional broker */}
        {response.token_usage && <RoiCard usage={response.token_usage} />}

        {/* Token usage transparency badge */}
        {response.token_usage && <TokenUsageBadge usage={response.token_usage} />}

        {/* Per-country reports */}
        <div className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">{t.results.countryReports}</h2>
          {response.country_reports.map((report) => (
            <CountryCard key={report.country} report={report} t={t} />
          ))}
        </div>

        <footer
          data-pdf-hide="true"
          className="print-hidden mt-10 text-center text-xs text-muted-foreground"
        >
          <p>
            {t.example.footerNote}
          </p>
        </footer>
      </div>
    </div>
  );
}

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
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-xl">{countryLabel}</CardTitle>
            <CardDescription className="mt-1 space-x-3">
              {report.hs_code && (
                <span>
                  HS:{" "}
                  <code className="font-mono text-xs">{report.hs_code}</code>
                </span>
              )}
              {report.tariff_rate !== null &&
                report.tariff_rate !== undefined && (
                  <span>
                    Tariff:{" "}
                    <span className="font-medium">
                      {(report.tariff_rate * 100).toFixed(1)}%
                    </span>
                  </span>
                )}
            </CardDescription>
          </div>
          <RiskBadge level={report.overall_risk} t={t} />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {report.findings.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold mb-2">
              {t.results.complianceFindings} ({report.findings.length})
            </h3>
            <ul className="space-y-2">
              {report.findings.map((f, i) => (
                <li
                  key={i}
                  className={
                    "rounded-md border px-3 py-2 text-sm " +
                    RISK_COLORS[f.risk_level]
                  }
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-medium">{f.title}</span>
                      <span className="text-xs ml-2 opacity-70">
                        {f.category}
                      </span>
                    </div>
                    <span className="text-xs uppercase tracking-wide opacity-70 shrink-0">
                      {riskLabel(f.risk_level, t)}
                    </span>
                  </div>
                  <p className="mt-1 opacity-90">{f.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {report.recommended_actions.length > 0 && (
          <>
            <Separator />
            <div>
              <h3 className="text-sm font-semibold mb-2">
                {t.results.recommendedActions}
              </h3>
              <ol className="list-decimal list-inside text-sm space-y-1 text-muted-foreground">
                {report.recommended_actions.map((action, i) => (
                  <li key={i}>{action}</li>
                ))}
              </ol>
            </div>
          </>
        )}

        {/* Deep-dive CTA intentionally disabled for examples —
            the example job_id is no longer live on the backend. */}
        <Separator />
        <div className="rounded-lg border border-muted-foreground/20 bg-muted/30 p-4 mt-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 flex-shrink-0" />
            <span>{t.example.deepDiveDisabled}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

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
  const colors: Record<RiskLevel, string> = {
    low: "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
    medium:
      "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800",
    high: "bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800",
    blocked:
      "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
  };
  return (
    <span
      className={
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold shrink-0 " +
        colors[level]
      }
    >
      {riskLabel(level, t)} {t.risk.suffix}
    </span>
  );
}
