"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, XCircle, Sparkles } from "lucide-react";
import type { CountryCode } from "@/lib/types";
import { COUNTRY_LABELS } from "@/lib/types";
import { useLocale } from "@/lib/i18n/context";

// Per-country state machine for the live telemetry row.
export type AgentState =
  | { status: "pending"; country: CountryCode }
  | { status: "running"; country: CountryCode; startedAt: number }
  | {
      status: "complete";
      country: CountryCode;
      durationS: number;
      tokens: { input: number; output: number };
      findingsCount: number;
      risk: "low" | "medium" | "high" | "blocked";
      hsCode?: string | null;
      tariffRate?: number | null;
    }
  | {
      status: "error";
      country: CountryCode;
      durationS: number;
      error: string;
    };

export type HarmonizerState = "idle" | "running" | "done" | "error";

type Props = {
  agents: AgentState[];
  harmonizer: HarmonizerState;
  totalTokens: number;
  elapsedS: number;
};

const RISK_STYLES: Record<"low" | "medium" | "high" | "blocked", string> = {
  low: "text-green-700 dark:text-green-400",
  medium: "text-yellow-700 dark:text-yellow-400",
  high: "text-orange-700 dark:text-orange-400",
  blocked: "text-red-700 dark:text-red-400",
};

export function AgentTelemetryOverlay({
  agents,
  harmonizer,
  totalTokens,
  elapsedS,
}: Props) {
  const { t } = useLocale();
  const completedCount = agents.filter(
    (a) => a.status === "complete" || a.status === "error",
  ).length;

  return (
    <div className="mt-6 rounded-xl border-2 border-blue-500/40 bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-blue-950/30 p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-base font-semibold text-blue-900 dark:text-blue-100">
            {t.telemetry.headline}
          </h3>
        </div>
        <div className="text-xs font-mono text-blue-800/70 dark:text-blue-200/70 tabular-nums">
          {t.telemetry.elapsed}: {elapsedS.toFixed(1)}s
        </div>
      </div>

      {/* Agent rows */}
      <div className="space-y-2">
        {agents.map((agent) => (
          <AgentRow key={agent.country} agent={agent} />
        ))}
      </div>

      {/* Harmonizer row */}
      <div className="mt-3 pt-3 border-t border-blue-500/20">
        <HarmonizerRow state={harmonizer} />
      </div>

      {/* Footer totals */}
      <div className="mt-4 pt-3 border-t border-blue-500/20 flex flex-wrap items-center justify-between gap-2 text-xs text-blue-800/80 dark:text-blue-200/80">
        <span>
          {t.telemetry.progress}:{" "}
          <span className="font-semibold tabular-nums">
            {completedCount} / {agents.length}
          </span>
        </span>
        <span className="font-mono tabular-nums">
          {totalTokens.toLocaleString()} {t.telemetry.tokensSoFar}
        </span>
      </div>
    </div>
  );
}

function AgentRow({ agent }: { agent: AgentState }) {
  const { t } = useLocale();
  const label = t.countries[agent.country] ?? COUNTRY_LABELS[agent.country];

  // Live-ticking elapsed timer while the agent is running.
  const [nowMs, setNowMs] = useState<number>(() => Date.now());
  useEffect(() => {
    if (agent.status !== "running") return;
    const id = setInterval(() => setNowMs(Date.now()), 200);
    return () => clearInterval(id);
  }, [agent.status]);

  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="flex-shrink-0 w-5">
        {agent.status === "pending" && (
          <span className="text-blue-400/50">○</span>
        )}
        {agent.status === "running" && (
          <Loader2 className="h-4 w-4 animate-spin text-blue-600 dark:text-blue-400" />
        )}
        {agent.status === "complete" && (
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
        )}
        {agent.status === "error" && (
          <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
        )}
      </div>

      <div className="flex-1 min-w-0 font-medium text-blue-900 dark:text-blue-100 truncate">
        {label}
      </div>

      <div className="flex-shrink-0 text-xs font-mono tabular-nums text-blue-800/80 dark:text-blue-200/80">
        {agent.status === "pending" && (
          <span className="opacity-60">{t.telemetry.queued}</span>
        )}
        {agent.status === "running" && (
          <span>
            {((nowMs - agent.startedAt) / 1000).toFixed(1)}s
          </span>
        )}
        {agent.status === "complete" && (
          <span className="inline-flex items-center gap-2 flex-wrap justify-end">
            <span>{agent.durationS.toFixed(1)}s</span>
            <span className="opacity-60">·</span>
            <span>
              {(agent.tokens.input + agent.tokens.output).toLocaleString()}{" "}
              {t.telemetry.tokensAbbr}
            </span>
            <span className="opacity-60">·</span>
            <span className={`${RISK_STYLES[agent.risk]} font-semibold`}>
              {t.telemetry.risk}: {t.risk[agent.risk]}
            </span>
          </span>
        )}
        {agent.status === "error" && (
          <span className="text-red-600 dark:text-red-400">
            {t.telemetry.failed} ({agent.durationS.toFixed(1)}s)
          </span>
        )}
      </div>
    </div>
  );
}

function HarmonizerRow({ state }: { state: HarmonizerState }) {
  const { t } = useLocale();
  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="flex-shrink-0 w-5">
        {state === "idle" && <span className="text-blue-400/50">○</span>}
        {state === "running" && (
          <Loader2 className="h-4 w-4 animate-spin text-purple-600 dark:text-purple-400" />
        )}
        {state === "done" && (
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
        )}
        {state === "error" && (
          <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
        )}
      </div>
      <div className="flex-1 font-medium text-blue-900 dark:text-blue-100">
        {t.telemetry.harmonizer}
      </div>
      <div className="flex-shrink-0 text-xs font-mono text-blue-800/80 dark:text-blue-200/80">
        {state === "idle" && (
          <span className="opacity-60">{t.telemetry.waiting}</span>
        )}
        {state === "running" && <span>{t.telemetry.synthesizing}</span>}
        {state === "done" && <span>{t.telemetry.done}</span>}
        {state === "error" && (
          <span className="text-red-600 dark:text-red-400">
            {t.telemetry.failed}
          </span>
        )}
      </div>
    </div>
  );
}
