"use client";

import { useState } from "react";
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

import { api } from "@/lib/api";
import {
  COUNTRY_LABELS,
  type CountryCode,
} from "@/lib/types";

const ALL_COUNTRIES: CountryCode[] = ["US", "DE", "GB", "TR", "JP"];

export default function HomePage() {
  const router = useRouter();

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [category, setCategory] = useState("");
  const [originCountry, setOriginCountry] = useState<CountryCode>("TR");
  const [estimatedValue, setEstimatedValue] = useState<string>("");
  const [selectedCountries, setSelectedCountries] = useState<Set<CountryCode>>(
    new Set(["US", "DE", "GB"]),
  );
  const [includeRouteRisk, setIncludeRouteRisk] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleCountry = (code: CountryCode) => {
    setSelectedCountries((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  };

  // Countries user can pick from (exclude origin so they don't analyze their home market)
  const targetCountries = ALL_COUNTRIES.filter((c) => c !== originCountry);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!productName.trim() || !productDescription.trim()) {
      setError("Please enter both a product name and description.");
      return;
    }
    if (selectedCountries.size === 0) {
      setError("Select at least one target country.");
      return;
    }

    setLoading(true);
    try {
      const valueNum = estimatedValue.trim()
        ? Number.parseFloat(estimatedValue)
        : undefined;

      const response = await api.analyze({
        product: {
          name: productName.trim(),
          description: productDescription.trim(),
          category: category.trim() || null,
          origin_country: originCountry,
          estimated_value_usd: Number.isFinite(valueNum) ? valueNum : null,
        },
        target_countries: Array.from(selectedCountries),
        include_route_risk: includeRouteRisk,
      });

      router.push(`/results/${response.job_id}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Analysis failed. Please try again.",
      );
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-semibold tracking-tight">
            MasterBorder
          </h1>
          <p className="mt-2 text-muted-foreground">
            Open-source cross-border trade compliance, powered by Opus 4.7.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Analyze a product</CardTitle>
            <CardDescription>
              Enter your product details and pick target markets. We&apos;ll run
              a parallel compliance analysis and produce an actionable report.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Product name */}
              <div className="space-y-1.5">
                <Label htmlFor="name">Product name</Label>
                <Input
                  id="name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g., leather wallet"
                  disabled={loading}
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  placeholder="Materials, craftsmanship, treatment, etc. (e.g., 'Genuine cowhide, chrome-tanned, handcrafted')"
                  rows={3}
                  disabled={loading}
                  required
                />
              </div>

              {/* Category + Value (side by side) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="category">
                    Category{" "}
                    <span className="text-muted-foreground text-xs">
                      (optional)
                    </span>
                  </Label>
                  <Input
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g., accessories"
                    disabled={loading}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="value">
                    Value per unit (USD){" "}
                    <span className="text-muted-foreground text-xs">
                      (optional)
                    </span>
                  </Label>
                  <Input
                    id="value"
                    type="number"
                    step="0.01"
                    min="0"
                    value={estimatedValue}
                    onChange={(e) => setEstimatedValue(e.target.value)}
                    placeholder="45.00"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Origin country */}
              <div className="space-y-1.5">
                <Label htmlFor="origin">Origin country</Label>
                <Select
                  value={originCountry}
                  onValueChange={(v) => {
                    const next = v as CountryCode;
                    setOriginCountry(next);
                    // If the user had this country selected as target, remove it
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

              {/* Target countries */}
              <div className="space-y-2">
                <div>
                  <Label>Target countries</Label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Pick one or more markets to analyze
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

              {/* Route risk toggle */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeRouteRisk}
                  onChange={(e) => setIncludeRouteRisk(e.target.checked)}
                  disabled={loading}
                  className="mt-0.5 h-4 w-4 rounded border-border"
                />
                <span className="text-sm">
                  <span className="font-medium">Include route risk analysis</span>
                  <span className="block text-muted-foreground text-xs">
                    Consider active conflict zones, strait disruptions, and
                    shipping lane risks (recommended).
                  </span>
                </span>
              </label>

              {error && (
                <div className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                  {error}
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing {selectedCountries.size}{" "}
                    {selectedCountries.size === 1 ? "market" : "markets"} in
                    parallel…
                  </>
                ) : (
                  <>Analyze</>
                )}
              </Button>

              {loading && (
                <p className="text-center text-xs text-muted-foreground">
                  Opus 4.7 is dispatching Country Agents in parallel. This
                  typically takes 25–35 seconds.
                </p>
              )}
            </form>
          </CardContent>
        </Card>

        <footer className="mt-6 text-center text-xs text-muted-foreground">
          <p>
            MIT licensed · Built with Claude Code + Opus 4.7 · The agent
            proposes, you decide.
          </p>
        </footer>
      </div>
    </div>
  );
}
