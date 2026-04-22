/**
 * MasterBorder API client.
 *
 * Thin wrapper around fetch with typed request/response shapes.
 * Reads NEXT_PUBLIC_API_URL at build time; defaults to http://localhost:8000.
 */

import type {
  AnalysisRequest,
  AnalysisResponse,
  CountryCode,
  RecommendRequest,
  RecommendResponse,
} from "./types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

class APIError extends Error {
  constructor(
    public status: number,
    message: string,
    public detail?: unknown,
  ) {
    super(message);
    this.name = "APIError";
  }

  /** True if the error is a 429 rate-limit response from the backend. */
  get isRateLimit(): boolean {
    return this.status === 429;
  }

  /** Returns the user-friendly message from the backend's rate-limit payload, if any. */
  get rateLimitMessage(): string | null {
    if (!this.isRateLimit) return null;
    const d = this.detail as { detail?: { message?: string } } | undefined;
    return d?.detail?.message ?? null;
  }
}

async function request<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const url = `${API_URL}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });

  if (!res.ok) {
    let detail: unknown;
    try {
      detail = await res.json();
    } catch {
      // no JSON body
    }
    throw new APIError(
      res.status,
      `${res.status} ${res.statusText} on ${path}`,
      detail,
    );
  }

  return (await res.json()) as T;
}

export const api = {
  /** Run the full parallel analysis pipeline (~30s for 3 countries). */
  analyze(body: AnalysisRequest): Promise<AnalysisResponse> {
    return request<AnalysisResponse>("/api/analyze", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  /** Retrieve a cached job by id. */
  getJob(jobId: string): Promise<AnalysisResponse> {
    return request<AnalysisResponse>(
      `/api/jobs/${encodeURIComponent(jobId)}`,
    );
  },

  /** Deep-dive for a chosen country. First call: omit user_question. Follow-ups: provide it. */
  recommend(
    jobId: string,
    country: CountryCode,
    body: RecommendRequest = {},
  ): Promise<RecommendResponse> {
    return request<RecommendResponse>(
      `/api/recommend/${encodeURIComponent(jobId)}/${country}`,
      {
        method: "POST",
        body: JSON.stringify(body),
      },
    );
  },
};

export { APIError };


/** Fetch public usage stats (for the landing-page counter). */
export async function getStats(): Promise<UsageStats> {
  const res = await fetch(`${API_URL}/api/stats`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new APIError(res.status, `Stats fetch failed: ${res.status}`);
  }
  return (await res.json()) as UsageStats;
}
