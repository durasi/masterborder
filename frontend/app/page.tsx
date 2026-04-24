"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { APIError, analyzeStream } from "@/lib/api";
import {
  AgentTelemetryOverlay,
  type AgentState,
  type HarmonizerState,
} from "@/components/AgentTelemetryOverlay";
import { COUNTRY_LABELS, type CountryCode } from "@/lib/types";
import { UsageStatsFooter } from "@/components/UsageStatsFooter";
import { useLocale } from "@/lib/i18n/context";

import { MeshBackground } from "@/components/landing/MeshBackground";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { CountryChip } from "@/components/landing/CountryChip";

const ALL_COUNTRIES: CountryCode[] = ["US", "DE", "GB", "TR", "JP"];

export default function HomePage() {
  const router = useRouter();
  const { t, locale } = useLocale();

  // Form state (preserved from previous implementation)
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [category, setCategory] = useState("");
  const [originCountry, setOriginCountry] = useState<CountryCode>("US");
  const [estimatedValue, setEstimatedValue] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [unit, setUnit] = useState<string>("pieces");
  const [selectedCountries, setSelectedCountries] = useState<Set<CountryCode>>(
    new Set(["DE", "GB"]),
  );
  const [includeRouteRisk, setIncludeRouteRisk] = useState(true);

  // Streaming state
  const [loading, setLoading] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [streamAgents, setStreamAgents] = useState<AgentState[]>([]);
  const [streamHarmonizer, setStreamHarmonizer] = useState<HarmonizerState>("idle");
  const [streamTokens, setStreamTokens] = useState(0);
  const [streamStartedAt, setStreamStartedAt] = useState<number | null>(null);
  const [streamElapsedS, setStreamElapsedS] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Auto-submit trigger — set to true by fillSampleProduct; a useEffect
  // watches it and calls runAnalysis() on the next tick, so the form state
  // is guaranteed to be flushed before we read it.
  const [autoSubmitPending, setAutoSubmitPending] = useState(false);

  useEffect(() => {
    if (!loading) {
      setProgressStep(0);
      return;
    }
    const interval = setInterval(() => {
      setProgressStep((s) => (s + 1) % 6);
    }, 3500);
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (!loading || streamStartedAt === null) {
      setStreamElapsedS(0);
      return;
    }
    const id = setInterval(() => {
      setStreamElapsedS((Date.now() - streamStartedAt) / 1000);
    }, 200);
    return () => clearInterval(id);
  }, [loading, streamStartedAt]);

  const toggleCountry = (code: CountryCode) => {
    setSelectedCountries((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  };

  // Origin country is filtered out of the target picker entirely.
  const targetCountries = ALL_COUNTRIES.filter((c) => c !== originCountry);

  // Pull the analysis logic out of the form handler so it can be invoked
  // either from the <form onSubmit> OR programmatically (by the Try sample
  // auto-submit path). Reads state directly — callers must ensure state is
  // already set before calling.
  async function runAnalysis() {
    setError(null);

    if (!productName.trim() || !productDescription.trim()) {
      setError(t.form.errorMissing);
      return;
    }
    if (selectedCountries.size === 0) {
      setError(t.form.errorNoCountry);
      return;
    }

    const targetCountriesArr = Array.from(selectedCountries);
    setStreamAgents(
      targetCountriesArr.map((c) => ({ status: "pending", country: c })),
    );
    setStreamHarmonizer("idle");
    setStreamTokens(0);
    setStreamStartedAt(Date.now());
    setLoading(true);

    const valueNum = estimatedValue.trim()
      ? Number.parseFloat(estimatedValue)
      : undefined;
    const quantityNum = quantity.trim()
      ? Number.parseFloat(quantity)
      : undefined;

    const body = {
      product: {
        name: productName.trim(),
        description: productDescription.trim(),
        category: category.trim() || null,
        origin_country: originCountry,
        estimated_value_usd: Number.isFinite(valueNum) ? valueNum : null,
        quantity: Number.isFinite(quantityNum ?? NaN) ? quantityNum : null,
        unit: Number.isFinite(quantityNum ?? NaN) ? unit : null,
      },
      target_countries: targetCountriesArr,
      include_route_risk: includeRouteRisk,
      preferred_language: locale,
    };

    try {
      let finalJobId: string | null = null;

      await analyzeStream(body, {
        onEvent: (event) => {
          switch (event.type) {
            case "started":
              break;

            case "agent_start":
              setStreamAgents((prev) =>
                prev.map((a) =>
                  a.country === event.country
                    ? { status: "running", country: a.country, startedAt: Date.now() }
                    : a,
                ),
              );
              break;

            case "agent_complete":
              setStreamAgents((prev) =>
                prev.map((a) => {
                  if (a.country !== event.country) return a;
                  if (event.status === "ok" && event.tokens && event.risk) {
                    return {
                      status: "complete",
                      country: a.country,
                      durationS: event.duration_s,
                      tokens: event.tokens,
                      findingsCount: event.findings_count ?? 0,
                      risk: event.risk,
                      hsCode: event.hs_code,
                      tariffRate: event.tariff_rate,
                    };
                  }
                  return {
                    status: "error",
                    country: a.country,
                    durationS: event.duration_s,
                    error: event.error ?? "unknown",
                  };
                }),
              );
              if (event.status === "ok" && event.tokens) {
                setStreamTokens(
                  (prev) => prev + event.tokens!.input + event.tokens!.output,
                );
              }
              break;

            case "harmonize_start":
              setStreamHarmonizer("running");
              break;

            case "done":
              setStreamHarmonizer("done");
              finalJobId = event.response.job_id;
              break;

            case "error":
              setStreamHarmonizer("error");
              setError(event.message);
              break;
          }
        },
      });

      if (finalJobId) {
        router.push(`/results/${finalJobId}`);
      } else {
        setError(t.form.errorGeneric);
        setLoading(false);
      }
    } catch (err) {
      if (err instanceof APIError && err.isRateLimit) {
        setError(err.rateLimitMessage ?? t.form.errorRateLimit);
      } else {
        setError(err instanceof Error ? err.message : t.form.errorGeneric);
      }
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await runAnalysis();
  }

  // Auto-submit once form state has been flushed following a sample fill.
  useEffect(() => {
    if (!autoSubmitPending) return;
    setAutoSubmitPending(false);
    runAnalysis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoSubmitPending]);

  function fillSampleProduct(triggerAnalysis: boolean = false) {
    setProductName(t.form.sampleProductName);
    setProductDescription(t.form.sampleProductDescription);
    setCategory("consumer_goods");
    setEstimatedValue("25");
    setQuantity("50");
    setUnit("pieces");
    setOriginCountry("US");
    setSelectedCountries(new Set(["DE", "GB"]));
    setIncludeRouteRisk(true);
    setError(null);
    if (triggerAnalysis) setAutoSubmitPending(true);
  }

  const count = selectedCountries.size;
  const analyzingLabel = count === 1 ? t.form.analyzingMarket : t.form.analyzingMarkets;

  return (
    <>
      <MeshBackground />
      <Navbar onTrySample={() => fillSampleProduct(true)} />

      <main className="mx-auto max-w-6xl px-5 py-14 pb-24">
        <Hero />

        {/* Form card */}
        <section className="mx-auto mt-14 max-w-3xl mb-fade-up mb-d4">
          <div className="overflow-hidden rounded-[20px] border border-border/60 bg-card/80 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_12px_40px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_20px_60px_rgba(0,0,0,0.06)] hover:border-border dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),_0_12px_40px_rgba(0,0,0,0.25)]">
            <div className="flex items-start justify-between gap-3 border-b border-border/50 px-7 py-5">
              <div className="min-w-0">
                <h2 className="text-[18px] font-semibold tracking-[-0.02em]">
                  {t.form.cardTitle}
                </h2>
                <p className="mt-1 text-[13.5px] leading-[1.5] text-muted-foreground">
                  {t.form.cardDescription}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Link
                  href="/examples/leather-wallet-tr-to-us-de-uk-jp"
                  tabIndex={loading ? -1 : 0}
                  aria-disabled={loading}
                >
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={loading}
                  >
                    {t.form.seeExample}
                  </Button>
                </Link>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fillSampleProduct(true)}
                  disabled={loading}
                  className="border-transparent bg-blue-500/10 text-blue-700 hover:bg-blue-500/15 hover:text-blue-700 dark:text-blue-300"
                >
                  {t.form.trySample}
                </Button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 px-7 py-6">
              <div className="space-y-1.5">
                <Label htmlFor="name">{t.form.productNameLabel}</Label>
                <Input
                  id="name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder={t.form.productNamePlaceholder}
                  disabled={loading}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="description">{t.form.descriptionLabel}</Label>
                <Textarea
                  id="description"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  placeholder={t.form.descriptionPlaceholder}
                  rows={3}
                  disabled={loading}
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="origin">{t.form.originLabel}</Label>
                  <Select
                    value={originCountry}
                    onValueChange={(v) => {
                      const next = v as CountryCode;
                      setOriginCountry(next);
                      setSelectedCountries((prev) => {
                        const s = new Set(prev);
                        s.delete(next);
                        return s;
                      });
                    }}
                    disabled={loading}
                  >
                    <SelectTrigger id="origin">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ALL_COUNTRIES.map((code) => (
                        <SelectItem key={code} value={code}>
                          {COUNTRY_LABELS[code]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="value">
                    {t.form.valueLabel}{" "}
                    <span className="text-muted-foreground text-xs">
                      {t.form.categoryOptional}
                    </span>
                  </Label>
                  <Input
                    id="value"
                    type="number"
                    step="0.01"
                    min="0"
                    value={estimatedValue}
                    onChange={(e) => setEstimatedValue(e.target.value)}
                    placeholder={t.form.valuePlaceholder}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_140px]">
                <div className="space-y-1.5">
                  <Label htmlFor="quantity">
                    {t.form.quantityLabel}{" "}
                    <span className="text-muted-foreground text-xs">
                      {t.form.categoryOptional}
                    </span>
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    step="0.01"
                    min="0"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder={t.form.quantityPlaceholder}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="unit">{t.form.unitLabel}</Label>
                  <Select value={unit} onValueChange={setUnit} disabled={loading}>
                    <SelectTrigger id="unit">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pieces">{t.form.unitPieces}</SelectItem>
                      <SelectItem value="kg">{t.form.unitKg}</SelectItem>
                      <SelectItem value="grams">{t.form.unitGrams}</SelectItem>
                      <SelectItem value="liters">{t.form.unitLiters}</SelectItem>
                      <SelectItem value="meters">{t.form.unitMeters}</SelectItem>
                      <SelectItem value="sqm">{t.form.unitSqm}</SelectItem>
                      <SelectItem value="pairs">{t.form.unitPairs}</SelectItem>
                      <SelectItem value="dozens">{t.form.unitDozens}</SelectItem>
                      <SelectItem value="boxes">{t.form.unitBoxes}</SelectItem>
                      <SelectItem value="tons">{t.form.unitTons}</SelectItem>
                      <SelectItem value="lbs">{t.form.unitPounds}</SelectItem>
                      <SelectItem value="oz">{t.form.unitOunces}</SelectItem>
                      <SelectItem value="gallons">{t.form.unitGallons}</SelectItem>
                      <SelectItem value="feet">{t.form.unitFeet}</SelectItem>
                      <SelectItem value="inches">{t.form.unitInches}</SelectItem>
                      <SelectItem value="cubic_feet">{t.form.unitCubicFeet}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="category">
                  {t.form.categoryLabel}{" "}
                  <span className="text-muted-foreground text-xs">
                    {t.form.categoryOptional}
                  </span>
                </Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder={t.form.categoryPlaceholder}
                  disabled={loading}
                />
              </div>

              {/* Target markets */}
              <div className="space-y-2.5">
                <div>
                  <Label>{t.form.targetLabel}</Label>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {t.form.targetHint}{" "}
                    <span className="font-medium text-foreground">
                      {selectedCountries.size}
                    </span>{" "}
                    {t.form.selectedLabel}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
                  {targetCountries.map((code) => (
                    <CountryChip
                      key={code}
                      code={code}
                      label={COUNTRY_LABELS[code]}
                      selected={selectedCountries.has(code)}
                      disabled={loading}
                      onClick={() => toggleCountry(code)}
                    />
                  ))}
                </div>
              </div>

              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={includeRouteRisk}
                  onChange={(e) => setIncludeRouteRisk(e.target.checked)}
                  disabled={loading}
                  className="mt-0.5 h-4 w-4 rounded border-border"
                />
                <span className="text-sm">
                  <span className="font-medium">{t.form.routeRiskTitle}</span>
                  <span className="block text-xs text-muted-foreground">
                    {t.form.routeRiskBody}
                  </span>
                </span>
              </label>

              {error && (
                <div className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {analyzingLabel.replace("{count}", String(count))}
                  </>
                ) : (
                  <>{t.form.analyzeButton}</>
                )}
              </Button>

              {loading && streamAgents.length > 0 && (
                <AgentTelemetryOverlay
                  agents={streamAgents}
                  harmonizer={streamHarmonizer}
                  totalTokens={streamTokens}
                  elapsedS={streamElapsedS}
                />
              )}
            </form>
          </div>
        </section>

        <HowItWorks />
        <FeatureGrid />

        <footer className="mx-auto mt-20 flex max-w-3xl flex-col items-center gap-3 border-t border-border/40 pt-10 text-center text-xs text-muted-foreground">
          <UsageStatsFooter />
          <p>{t.footer.license}</p>
        </footer>
      </main>
    </>
  );
}
