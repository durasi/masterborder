"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/lib/i18n/context";

/**
 * AnimatedNumber — counts up from 0 to target on mount with cubic easing.
 * Used for the hero metric strip. Starts after a delay so the hero fade-up
 * has room to breathe first.
 */
function AnimatedNumber({
  target,
  decimals = 0,
  delay = 500,
  duration = 1400,
}: {
  target: number;
  decimals?: number;
  delay?: number;
  duration?: number;
}) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      const startTime = performance.now();
      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;
        setValue(current);
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setValue(target);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target, delay, duration]);

  return (
    <span style={{ fontVariantNumeric: "tabular-nums" }}>
      {decimals > 0 ? value.toFixed(decimals) : Math.floor(value)}
    </span>
  );
}

/**
 * MetricStrip — 4 key numbers shown as a single joined card.
 * On mobile the strip wraps into a 2x2 grid.
 */
export function MetricStrip() {
  const { t } = useLocale();

  const items = [
    { value: 60, unit: "s", decimals: 0, label: t.metrics.perAnalysis },
    { value: 0.42, unit: "¢", decimals: 2, label: t.metrics.perRun },
    { value: 5, unit: null, decimals: 0, label: t.metrics.parallelAgents },
    { value: 16, unit: null, decimals: 0, label: t.metrics.languages },
  ];

  return (
    <div
      className="mb-fade-up mb-d3 mx-auto flex max-w-[700px] items-stretch justify-center overflow-hidden rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md transition-all duration-300 hover:border-border hover:-translate-y-0.5 hover:shadow-lg flex-wrap sm:flex-nowrap"
    >
      {items.map((item, i) => (
        <div
          key={i}
          className={
            "flex-1 basis-1/2 sm:basis-0 py-5 px-3 text-center transition-colors duration-300 hover:bg-blue-500/5 " +
            (i < items.length - 1 ? "border-r border-border/40 " : "") +
            (i < 2 ? "border-b border-border/40 sm:border-b-0 " : "") +
            (i === 1 ? "sm:border-r border-r-0 " : "")
          }
        >
          <div
            className="font-semibold tracking-[-0.035em] leading-none text-foreground"
            style={{ fontSize: "clamp(1.625rem, 3.5vw, 2.125rem)" }}
          >
            <AnimatedNumber
              target={item.value}
              decimals={item.decimals}
              delay={600 + i * 100}
            />
            {item.unit && (
              <span className="text-[0.65em] font-medium text-muted-foreground ml-0.5">
                {item.unit}
              </span>
            )}
          </div>
          <div className="mt-2 text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
