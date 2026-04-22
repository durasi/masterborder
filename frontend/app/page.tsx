"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { api, APIError } from "@/lib/api";
import {
  COUNTRY_LABELS,
  type CountryCode,
} from "@/lib/types";
import { UsageStatsFooter } from "@/components/UsageStatsFooter";
import { LanguagePicker } from "@/components/LanguagePicker";
import { useLocale } from "@/lib/i18n/context";

const ALL_COUNTRIES: CountryCode[] = ["US", "DE", "GB", "TR", "JP"];

export default function HomePage() {
  const router = useRouter();
  const { t, locale } = useLocale();

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [category, setCategory] = useState("");
  const [originCountry, setOriginCountry] = useState<CountryCode>("TR");
  const [estimatedValue, setEstimatedValue] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [unit, setUnit] = useState<string>("pieces");
  const [selectedCountries, setSelectedCountries] = useState<Set<CountryCode>>(
    new Set(["US", "DE", "GB"]),
  );
  const [includeRouteRisk, setIncludeRouteRisk] = useState(true);

  const [loading, setLoading] = useState(false);
  const [progressStep, setProgressStep] = useState(0);

  // Rotate progress messages while analyzing — keeps the user engaged during the ~25-35s wait
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
  const [error, setError] = useState<string | null>(null);

  const toggleCountry = (code: CountryCode) => {
    setSelectedCountries((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  };

  const targetCountries = ALL_COUNTRIES.filter((c) => c !== originCountry);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!productName.trim() || !productDescription.trim()) {
      setError(t.form.errorMissing);
      return;
    }
    if (selectedCountries.size === 0) {
      setError(t.form.errorNoCountry);
      return;
    }

    setLoading(true);
    try {
      const valueNum = estimatedValue.trim()
        ? Number.parseFloat(estimatedValue)
        : undefined;
      const quantityNum = quantity.trim()
        ? Number.parseFloat(quantity)
        : undefined;

      const response = await api.analyze({
        product: {
          name: productName.trim(),
          description: productDescription.trim(),
          category: category.trim() || null,
          origin_country: originCountry,
          estimated_value_usd: Number.isFinite(valueNum) ? valueNum : null,
          quantity: Number.isFinite(quantityNum ?? NaN) ? quantityNum : null,
          unit: Number.isFinite(quantityNum ?? NaN) ? unit : null,
        },
        target_countries: Array.from(selectedCountries),
        include_route_risk: includeRouteRisk,
        preferred_language: locale,
      });

      router.push(`/results/${response.job_id}`);
    } catch (err) {
      if (err instanceof APIError && err.isRateLimit) {
        setError(err.rateLimitMessage ?? t.form.errorRateLimit);
      } else {
        setError(err instanceof Error ? err.message : t.form.errorGeneric);
      }
      setLoading(false);
    }
  }

  function fillSampleProduct() {
    setProductName(t.form.sampleProductName);
    setProductDescription(t.form.sampleProductDescription);
    setCategory("consumer_goods");
    setEstimatedValue("25");
    setQuantity("50");
    setUnit("pieces");
    setOriginCountry("TR");
    setSelectedCountries(new Set(["US", "DE", "GB"]));
    setIncludeRouteRisk(true);
    setError(null);
  }

  const count = selectedCountries.size;
  const analyzingLabel = count === 1 ? t.form.analyzingMarket : t.form.analyzingMarkets;

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="mx-auto max-w-3xl">
        {/* Hero */}
        <header className="mb-10 text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <img
              src="/masterborder-logo.svg"
              alt=""
              aria-hidden="true"
              className="h-12 w-12"
              width={48}
              height={48}
            />
            <span className="text-2xl font-bold tracking-tight">
              MasterBorder
            </span>
          </div>
          <div className="mb-5 flex items-center justify-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              {t.hero.livePill}
            </span>
            <LanguagePicker />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            {t.hero.titleLine1}
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t.hero.titleLine2}
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            {t.hero.subtitle}
          </p>
        </header>

        {/* Feature grid */}
        <div className="mb-10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div className="rounded-lg border border-border/60 bg-muted/20 p-3">
            <div className="font-semibold mb-0.5">{t.features.parallelTitle}</div>
            <div className="text-xs text-muted-foreground">
              {t.features.parallelBody}
            </div>
          </div>
          <div className="rounded-lg border border-border/60 bg-muted/20 p-3">
            <div className="font-semibold mb-0.5">{t.features.citationsTitle}</div>
            <div className="text-xs text-muted-foreground">
              {t.features.citationsBody}
            </div>
          </div>
          <div className="rounded-lg border border-border/60 bg-muted/20 p-3">
            <div className="font-semibold mb-0.5">{t.features.deepDiveTitle}</div>
            <div className="text-xs text-muted-foreground">
              {t.features.deepDiveBody}
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <CardTitle>{t.form.cardTitle}</CardTitle>
                <CardDescription>
                  {t.form.cardDescription}
                </CardDescription>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={fillSampleProduct}
                disabled={loading}
                className="shrink-0"
              >
                {t.form.trySample}
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
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

              <div className="grid grid-cols-2 gap-4">
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

              <div className="grid grid-cols-[1fr_140px] gap-4">
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
                    </SelectContent>
                  </Select>
                </div>
              </div>

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

              <Separator />

              <div className="space-y-2">
                <div>
                  <Label>{t.form.targetLabel}</Label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t.form.targetHint}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {targetCountries.map((code) => {
                    const active = selectedCountries.has(code);
                    return (
                      <button
                        type="button"
                        key={code}
                        onClick={() => toggleCountry(code)}
                        disabled={loading}
                        className={
                          "flex items-center justify-between rounded-md border px-3 py-2 text-sm transition " +
                          (active
                            ? "border-primary bg-primary/5 text-foreground"
                            : "border-border bg-background text-muted-foreground hover:border-ring")
                        }
                      >
                        <span>{COUNTRY_LABELS[code]}</span>
                        <span
                          className={
                            "inline-flex h-4 w-4 items-center justify-center rounded-full border text-[10px] " +
                            (active
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border")
                          }
                        >
                          {active ? "✓" : ""}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeRouteRisk}
                  onChange={(e) => setIncludeRouteRisk(e.target.checked)}
                  disabled={loading}
                  className="mt-0.5 h-4 w-4 rounded border-border"
                />
                <span className="text-sm">
                  <span className="font-medium">{t.form.routeRiskTitle}</span>
                  <span className="block text-muted-foreground text-xs">
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

              {loading && (
                <div className="text-center space-y-1">
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300 transition-opacity">
                    {[
                      t.form.progressStep1,
                      t.form.progressStep2,
                      t.form.progressStep3,
                      t.form.progressStep4,
                      t.form.progressStep5,
                      t.form.progressStep6,
                    ][progressStep]}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t.form.dispatchingHint}
                  </p>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        <footer className="mt-6 flex flex-col items-center gap-2 text-center text-xs text-muted-foreground">
          <UsageStatsFooter />
          <p>{t.footer.license}</p>
        </footer>
      </div>
    </div>
  );
}
