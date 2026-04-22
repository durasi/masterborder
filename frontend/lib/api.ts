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
