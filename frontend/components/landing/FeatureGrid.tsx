"use client";

import {
  Zap,
  GitMerge,
  Brain,
  FileText,
  Globe,
  BarChart3,
  Route,
  ClipboardCheck,
  DollarSign,
  MessageSquare,
  Activity,
  Users,
  Languages,
  FileDown,
  Wallet,
} from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

/**
 * FeatureGrid — fifteen capabilities arranged in five categories.
 * Each card has a colored left border keyed off a CSS custom property (--cat-color)
 * so the hover glow, icon tint, and background wash all derive from a single token.
 * Category colors are defined in globals.css (--cat-core, --cat-compliance, ...).
 */

type CategoryKey = "core" | "compliance" | "shipping" | "experience" | "reach";

interface FeatureDef {
  category: CategoryKey;
  icon: React.ComponentType<{ className?: string }>;
  titleKey: string;
  bodyKey: string;
}

const CATEGORY_COLOR: Record<CategoryKey, string> = {
  core: "var(--cat-core)",
  compliance: "var(--cat-compliance)",
  shipping: "var(--cat-shipping)",
  experience: "var(--cat-experience)",
  reach: "var(--cat-reach)",
};

const FEATURES: FeatureDef[] = [
  // Core (3)
  { category: "core", icon: Zap, titleKey: "parallelTitle", bodyKey: "parallelBody" },
  { category: "core", icon: GitMerge, titleKey: "harmonizerTitle", bodyKey: "harmonizerBody" },
  { category: "core", icon: Brain, titleKey: "thinkingTitle", bodyKey: "thinkingBody" },
  // Compliance (3)
  { category: "compliance", icon: FileText, titleKey: "citationsTitle", bodyKey: "citationsBody" },
  { category: "compliance", icon: Globe, titleKey: "geopoliticsTitle", bodyKey: "geopoliticsBody" },
  { category: "compliance", icon: BarChart3, titleKey: "rankingTitle", bodyKey: "rankingBody" },
  // Shipping (3)
  { category: "shipping", icon: Route, titleKey: "routesTitle", bodyKey: "routesBody" },
  { category: "shipping", icon: ClipboardCheck, titleKey: "checklistTitle", bodyKey: "checklistBody" },
  { category: "shipping", icon: DollarSign, titleKey: "landedCostTitle", bodyKey: "landedCostBody" },
  // Experience (3)
  { category: "experience", icon: MessageSquare, titleKey: "deepDiveTitle", bodyKey: "deepDiveBody" },
  { category: "experience", icon: Activity, titleKey: "telemetryTitle", bodyKey: "telemetryBody" },
  { category: "experience", icon: Users, titleKey: "humanLoopTitle", bodyKey: "humanLoopBody" },
  // Reach (3)
  { category: "reach", icon: Languages, titleKey: "languagesTitle", bodyKey: "languagesBody" },
  { category: "reach", icon: FileDown, titleKey: "pdfTitle", bodyKey: "pdfBody" },
  { category: "reach", icon: Wallet, titleKey: "costTransparencyTitle", bodyKey: "costTransparencyBody" },
];

export function FeatureGrid() {
  const { t } = useLocale();

  return (
    <section id="features" className="mx-auto mt-20 max-w-6xl">
      <div className="mb-10 text-center mb-fade-up mb-d5">
        <span className="mb-3 inline-block rounded-full bg-blue-500/10 px-3 py-1 text-[11.5px] font-medium uppercase tracking-[0.06em] text-blue-700 dark:text-blue-300">
          {t.features.eyebrow}
        </span>
        <h2
          className="mx-auto mb-3 max-w-[720px] font-semibold tracking-[-0.03em] leading-[1.15]"
          style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
        >
          {t.features.heading}
        </h2>
        <p className="mx-auto max-w-[580px] text-[15px] leading-[1.55] text-muted-foreground">
          {t.features.sub}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          const catColor = CATEGORY_COLOR[f.category];
          const catLabel = t.features.category[f.category];
          const title = (t.features.items as Record<string, { title: string; body: string }>)[f.titleKey.replace("Title", "")]?.title
            ?? (t.features as unknown as Record<string, string>)[f.titleKey]
            ?? f.titleKey;
          const body = (t.features.items as Record<string, { title: string; body: string }>)[f.titleKey.replace("Title", "")]?.body
            ?? (t.features as unknown as Record<string, string>)[f.bodyKey]
            ?? f.bodyKey;

          return (
            <div
              key={i}
              className="group mb-fade-up relative overflow-hidden rounded-2xl border border-border/60 bg-card/80 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1"
              style={{
                borderLeft: `3px solid ${catColor}`,
                animationDelay: `${0.75 + i * 0.05}s`,
                // @ts-expect-error custom CSS property for the hover effects below
                "--cat-color": catColor,
              }}
            >
              {/* Background wash on hover */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(135deg, color-mix(in srgb, var(--cat-color) 10%, transparent) 0%, transparent 60%)",
                }}
              />

              <div className="relative z-10">
                <div className="mb-2.5 flex items-center gap-2.5">
                  <div
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-300 group-hover:-rotate-3 group-hover:scale-110"
                    style={{
                      background: "color-mix(in srgb, var(--cat-color) 10%, transparent)",
                      color: "color-mix(in srgb, var(--cat-color) 70%, hsl(var(--muted-foreground)))",
                    }}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span
                    className="text-[10.5px] font-medium uppercase tracking-[0.08em]"
                    style={{ color: "color-mix(in srgb, var(--cat-color) 70%, hsl(var(--muted-foreground)))" }}
                  >
                    {catLabel}
                  </span>
                </div>

                <div className="mb-1.5 text-[14.5px] font-semibold tracking-[-0.015em] text-foreground">
                  {title}
                </div>
                <div className="text-[12.5px] leading-[1.55] text-muted-foreground">
                  {body}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
