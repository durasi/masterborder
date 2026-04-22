/**
 * MasterBorder API types — TypeScript mirror of backend/schemas/models.py.
 *
 * Keep this in sync if backend schemas change. The field names and enum values
 * must match exactly; we don't do any runtime transformation on the client.
 */

export type CountryCode = "US" | "DE" | "GB" | "TR" | "JP";

export type RiskLevel = "low" | "medium" | "high" | "blocked";

export interface Product {
  name: string;
  description: string;
  category?: string | null;
  origin_country: CountryCode;
  estimated_value_usd?: number | null;
}

export interface AnalysisRequest {
  product: Product;
  target_countries: CountryCode[];
  include_route_risk: boolean;
}

export interface ComplianceFinding {
  category: string;
  title: string;
  detail: string;
  risk_level: RiskLevel;
  source_url?: string | null;
  citation?: string | null;
}

export interface CountryReport {
  country: CountryCode;
  hs_code?: string | null;
  tariff_rate?: number | null;
  findings: ComplianceFinding[];
  overall_risk: RiskLevel;
  recommended_actions: string[];
}

export interface AnalysisResponse {
  job_id: string;
  created_at: string; // ISO datetime
  completed_at?: string | null;
  request: AnalysisRequest;
  country_reports: CountryReport[];
  summary?: string | null;
  token_usage?: TokenUsage;
}

export interface RecommendRequest {
  user_question?: string | null;
  reset_conversation?: boolean;
}

export interface RecommendResponse {
  country: CountryCode;
  job_id: string;
  message: string;
  turn_number: number;
}

// ───────────────────────────────────────────
// UI helpers (not from backend)
// ───────────────────────────────────────────

export const COUNTRY_LABELS: Record<CountryCode, string> = {
  US: "🇺🇸 United States",
  DE: "🇩🇪 Germany",
  GB: "🇬🇧 United Kingdom",
  TR: "🇹🇷 Turkey",
  JP: "🇯🇵 Japan",
};

export const RISK_COLORS: Record<RiskLevel, string> = {
  low: "text-green-700 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-950 dark:border-green-900",
  medium: "text-yellow-700 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-950 dark:border-yellow-900",
  high: "text-orange-700 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-950 dark:border-orange-900",
  blocked: "text-red-700 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950 dark:border-red-900",
};

export const RISK_LABELS: Record<RiskLevel, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  blocked: "Blocked",
};


/** Public usage stats returned by GET /api/stats */
export interface UsageStats {
  total_analyses: number;
  total_recommends: number;
  unique_users: number;
  last_24h: number;
  last_7d: number;
  top_countries: { country: string; count: number }[];
  server_time: string;
}


/** Aggregate Opus 4.7 usage + estimated USD cost for one analysis job. */
export interface TokenUsage {
  input_tokens: number;
  output_tokens: number;
  estimated_cost_usd: number;
}
