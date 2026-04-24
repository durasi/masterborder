"use client";

import { useLocale } from "@/lib/i18n/context";
import { MetricStrip } from "./MetricStrip";

/**
 * Hero — large headline with gradient shimmer italic accent on the second line,
 * subtitle, and metric strip below.
 *
 * The accent uses Geist Sans italic. Two subtle but critical CSS details:
 *
 * 1) Italic glyphs overshoot their advance-width box on the right. When we
 *    combine that with `inline-block` + background-clip:text + a tight
 *    letter-spacing, the last letter ("n" in TR "bırakmadan", "s" in EN
 *    "guesswork") gets clipped. We neutralize that by giving the span a
 *    small right padding and letting overflow-visible expose the overshoot.
 *
 * 2) The parent h1 has tracking-[-0.045em] for the primary line. That's too
 *    tight for italic — we relax it on the accent span only.
 */
export function Hero() {
  const { t } = useLocale();

  return (
    <section className="text-center mb-14">
      <h1
        className="mb-6 mb-fade-up mb-d1 font-semibold leading-[1.08]"
        style={{
          fontSize: "clamp(2.75rem, 7vw, 4.75rem)",
          letterSpacing: "-0.035em",
        }}
      >
        <span className="block">{t.hero.titleLine1}</span>
        <span
          className="mb-shimmer inline-block italic font-semibold"
          style={{
            fontFamily:
              "var(--font-geist-sans), var(--font-sans), sans-serif",
            paddingRight: "0.18em",
            paddingLeft: "0.02em",
            paddingBottom: "0.08em",
            letterSpacing: "-0.01em",
            overflow: "visible",
          }}
        >
          {t.hero.titleLine2}
        </span>
      </h1>

      <p
        className="mx-auto max-w-[600px] leading-[1.5] text-muted-foreground font-normal mb-10 mb-fade-up mb-d2"
        style={{ fontSize: "clamp(1.0625rem, 1.8vw, 1.25rem)" }}
      >
        {t.hero.subtitle}
      </p>

      <MetricStrip />
    </section>
  );
}
