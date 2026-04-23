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
  UsageStats,
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

// ───────────────────────────────────────────────────────────────
// Streaming analyze — Server-Sent Events for live agent telemetry
// ───────────────────────────────────────────────────────────────

export type StreamEvent =
  | { type: "started"; job_id: string; total_countries: number; countries: CountryCode[]; created_at: string }
  | { type: "agent_start"; country: CountryCode }
  | {
      type: "agent_complete";
      country: CountryCode;
      status: "ok" | "error";
      duration_s: number;
      tokens?: { input: number; output: number };
      hs_code?: string | null;
      tariff_rate?: number | null;
      findings_count?: number;
      risk?: "low" | "medium" | "high" | "blocked";
      error?: string;
    }
  | { type: "harmonize_start"; agents_succeeded: number }
  | { type: "done"; response: AnalysisResponse; errors?: unknown[]; harmonizer_error?: string }
  | { type: "error"; message: string };

export type StreamHandlers = {
  onEvent: (event: StreamEvent) => void;
  signal?: AbortSignal;
};

/** Parses a single SSE frame ("event: X\ndata: Y") into a StreamEvent, or null if malformed. */
function parseFrame(frame: string): StreamEvent | null {
  const lines = frame.split("\n");
  let eventName = "";
  let dataLine = "";
  for (const line of lines) {
    if (line.startsWith("event:")) eventName = line.slice(6).trim();
    else if (line.startsWith("data:")) dataLine = line.slice(5).trim();
  }
  if (!eventName || !dataLine) return null;
  try {
    const payload = JSON.parse(dataLine);
    return { type: eventName, ...payload } as StreamEvent;
  } catch {
    return null;
  }
}

/**
 * POST /api/analyze/stream with SSE parsing.
 * Calls onEvent for each server-sent frame. Resolves when the stream closes.
 * Throws APIError on non-2xx HTTP status (including 429 rate limits).
 */
export async function analyzeStream(
  body: AnalysisRequest,
  handlers: StreamHandlers,
): Promise<void> {
  const res = await fetch(`${API_URL}/api/analyze/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: handlers.signal,
  });

  if (!res.ok) {
    let detail: unknown;
    try {
      detail = await res.json();
    } catch {
      // no JSON body
    }
    throw new APIError(res.status, `${res.status} ${res.statusText} on /api/analyze/stream`, detail);
  }

  if (!res.body) {
    throw new APIError(500, "Response body is empty — streaming not supported");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  // SSE frames are separated by a blank line (\n\n). We accumulate chunks into
  // a buffer and pull out complete frames as they arrive. The last partial
  // frame stays in the buffer for the next chunk.
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let sepIdx: number;
    while ((sepIdx = buffer.indexOf("\n\n")) !== -1) {
      const rawFrame = buffer.slice(0, sepIdx);
      buffer = buffer.slice(sepIdx + 2);
      const event = parseFrame(rawFrame);
      if (event) handlers.onEvent(event);
    }
  }

  // Flush trailing frame if the server closed without a final \n\n.
  if (buffer.trim().length > 0) {
    const event = parseFrame(buffer);
    if (event) handlers.onEvent(event);
  }
}

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
