"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AlertTriangle, ArrowRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { DownloadPdfButton } from "@/components/DownloadPdfButton";
import { api, APIError } from "@/lib/api";
import {
  COUNTRY_LABELS,
  RISK_COLORS,
  RISK_LABELS,
  type AnalysisResponse,
  type CountryReport,
  type RiskLevel,
} from "@/lib/types";
import { TokenUsageBadge } from "@/components/TokenUsageBadge";

export default function ResultsPage() {
  const params = useParams<{ jobId: string }>();
  const router = useRouter();
  const jobId = params.jobId;

  const [response, setResponse] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

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
          setError(
            "This analysis is no longer available. The cache may have been cleared. Please run a new analysis.",
          );
        } else {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load the analysis.",
          );
        }
      }
    }

    fetchJob();
    return () => {
      cancelled = true;
    };
  }, [jobId]);

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <CardTitle>Analysis unavailable</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{error}</p>
            <Button onClick={() => router.push("/")}>Start a new analysis</Button>
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
          <p className="text-sm text-muted-foreground">Loading analysis…</p>
        </div>
      </div>
    );
  }

  const { product, target_countries } = response.request;

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div id="pdf-target" className="mx-auto max-w-4xl bg-background">
        {/* Header */}
        <header className="mb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                ← New analysis
              </Link>
              <h1 className="text-3xl font-semibold tracking-tight mt-2">
                {product.name}
              </h1>
              <p className="text-muted-foreground mt-1">
                Analyzed for{" "}
                {target_countries
                  .map((c) => COUNTRY_LABELS[c].replace(/^\S+\s/, ""))
                  .join(", ")}{" "}
                · Origin: {COUNTRY_LABELS[product.origin_country]}
              </p>
            </div>
            <div className="pt-8 print-hidden" data-pdf-hide="true">
              <DownloadPdfButton
                data={response}
                filename={product.name}
              />
            </div>
          </div>
        </header>

        {/* Executive summary (harmonizer output) */}
        {response.summary && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Executive Summary</CardTitle>
              <CardDescription>
                Harmonized analysis across {response.country_reports.length}{" "}
                markets · Human-in-the-loop recommendation
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

        {/* Token usage transparency badge */}
        {response.token_usage && (
          <TokenUsageBadge usage={response.token_usage} />
        )}

        {/* Per-country reports */}
        <div className="space-y-4 mt-6">
          <h2 className="text-xl font-semibold">Country Reports</h2>
          {response.country_reports.map((report) => (
            <CountryCard
              key={report.country}
              report={report}
              jobId={response.job_id}
            />
          ))}
        </div>

        <footer data-pdf-hide="true" className="print-hidden mt-10 text-center text-xs text-muted-foreground">
          <p>
            Job ID: <code className="font-mono">{response.job_id}</code>
          </p>
        </footer>
      </div>
    </div>
  );
}

function CountryCard({
  report,
  jobId,
}: {
  report: CountryReport;
  jobId: string;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-xl">
              {COUNTRY_LABELS[report.country]}
            </CardTitle>
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
          <RiskBadge level={report.overall_risk} />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Findings */}
        {report.findings.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold mb-2">
              Compliance Findings ({report.findings.length})
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
                      {RISK_LABELS[f.risk_level]}
                    </span>
                  </div>
                  <p className="mt-1 opacity-90">{f.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommended actions */}
        {report.recommended_actions.length > 0 && (
          <>
            <Separator />
            <div>
              <h3 className="text-sm font-semibold mb-2">
                Recommended Actions
              </h3>
              <ol className="list-decimal list-inside text-sm space-y-1 text-muted-foreground">
                {report.recommended_actions.map((action, i) => (
                  <li key={i}>{action}</li>
                ))}
              </ol>
            </div>
          </>
        )}

        {/* Deep dive link */}
        <div className="pt-2">
          <Link
            href={`/results/${jobId}/${report.country}`}
            className="inline-block"
          >
            <Button variant="outline" className="group">
              Deep dive into {COUNTRY_LABELS[report.country]}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

function RiskBadge({ level }: { level: RiskLevel }) {
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
      {RISK_LABELS[level]} risk
    </span>
  );
}
