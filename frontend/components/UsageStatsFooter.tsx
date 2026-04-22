"use client";

import { useEffect, useState } from "react";
import { getStats } from "@/lib/api";
import type { UsageStats } from "@/lib/types";

/**
 * Tiny live counter shown in the landing-page footer.
 *
 * Polls /api/stats on mount and then every 60 seconds. Fails silently —
 * if the backend is unreachable the counter simply doesn't render, and
 * the rest of the footer is unaffected.
 */
export function UsageStatsFooter() {
  const [stats, setStats] = useState<UsageStats | null>(null);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        const s = await getStats();
        if (alive) setStats(s);
      } catch {
        // Swallow errors — counter is nice-to-have, never critical.
      }
    }

    load();
    const id = setInterval(load, 60_000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  if (!stats || stats.total_analyses === 0) {
    // Don't render anything until we have actual usage to report.
    return null;
  }

  const topCountry = stats.top_countries[0];

  return (
    <p className="text-xs text-muted-foreground">
      Served{" "}
      <span className="font-semibold text-foreground">
        {stats.total_analyses.toLocaleString()}
      </span>{" "}
      {stats.total_analyses === 1 ? "analysis" : "analyses"} for{" "}
      <span className="font-semibold text-foreground">
        {stats.unique_users.toLocaleString()}
      </span>{" "}
      {stats.unique_users === 1 ? "unique user" : "unique users"}
      {stats.last_24h > 0 && (
        <>
          {" · "}
          <span className="font-semibold text-foreground">
            {stats.last_24h}
          </span>{" "}
          today
        </>
      )}
      {topCountry && (
        <>
          {" · most-analyzed market: "}
          <span className="font-semibold text-foreground">
            {topCountry.country}
          </span>
        </>
      )}
    </p>
  );
}
