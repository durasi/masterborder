"use client";

import type { TokenUsage } from "@/lib/types";

/**
 * Tiny transparency rozeti — shows aggregate Opus 4.7 usage and
 * approximate USD cost for the current analysis. Helps jury see
 * that we track our own API consumption honestly.
 */
export function TokenUsageBadge({ usage }: { usage: TokenUsage }) {
  const total = usage.input_tokens + usage.output_tokens;
  const cost =
    usage.estimated_cost_usd < 0.01
      ? "<$0.01"
      : `$${usage.estimated_cost_usd.toFixed(2)}`;

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/30 px-2.5 py-1 font-mono">
        <span className="h-1.5 w-1.5 rounded-full bg-purple-500" aria-hidden />
        Powered by Claude Opus 4.7
      </span>
      <span>
        <span className="font-semibold text-foreground">
          {total.toLocaleString()}
        </span>{" "}
        tokens
        <span className="mx-1 opacity-60">·</span>
        <span className="font-semibold text-foreground">{cost}</span>
      </span>
      <span className="text-[10px] opacity-75">
        ({usage.input_tokens.toLocaleString()} in /{" "}
        {usage.output_tokens.toLocaleString()} out)
      </span>
    </div>
  );
}
