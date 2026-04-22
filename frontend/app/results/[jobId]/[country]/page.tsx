"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AlertTriangle, ArrowLeft, Loader2, Send, User, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { api, APIError } from "@/lib/api";
import {
  COUNTRY_LABELS,
  type AnalysisResponse,
  type CountryCode,
} from "@/lib/types";
import { DownloadDeepDivePdfButton } from "@/components/DownloadDeepDivePdfButton";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function DeepDivePage() {
  const params = useParams<{ jobId: string; country: string }>();
  const router = useRouter();

  const jobId = params.jobId;
  const country = params.country as CountryCode;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);

  // Load the initial deep-dive on mount
  useEffect(() => {
    if (!jobId || !country) return;
    let cancelled = false;

    async function fetchInitial() {
      try {
        // Fetch both the cached analysis (for the PDF export) and the first
        // deep-dive response in parallel.
        const [jobRes, recRes] = await Promise.all([
          api.getJob(jobId),
          api.recommend(jobId, country, { reset_conversation: true }),
        ]);
        if (cancelled) return;
        setAnalysis(jobRes);
        setMessages([
          {
            role: "user",
            content: `I've chosen to focus on ${country}. Give me the full go-to-market plan.`,
          },
          { role: "assistant", content: recRes.message },
        ]);
      } catch (err) {
        if (cancelled) return;
        if (err instanceof APIError && err.isRateLimit) {
          setError(
            err.rateLimitMessage ??
              "Daily limit reached. Please try again in 24 hours.",
          );
        } else if (err instanceof APIError && err.status === 404) {
          setError(
            "This analysis is no longer available. The cache may have been cleared. Please run a new analysis.",
          );
        } else {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load the deep-dive.",
          );
        }
      } finally {
        if (!cancelled) setInitialLoading(false);
      }
    }

    fetchInitial();
    return () => {
      cancelled = true;
    };
  }, [jobId, country]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, loading]);

  async function sendQuestion() {
    const q = question.trim();
    if (!q || loading) return;

    // Optimistically append the user message
    setMessages((prev) => [...prev, { role: "user", content: q }]);
    setQuestion("");
    setLoading(true);
    setError(null);

    try {
      const res = await api.recommend(jobId, country, {
        user_question: q,
      });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.message },
      ]);
    } catch (err) {
      let msg = "Request failed.";
      if (err instanceof APIError && err.isRateLimit) {
        msg =
          err.rateLimitMessage ??
          "Daily limit reached. Please try again in 24 hours.";
      } else if (err instanceof Error) {
        msg = err.message;
      }
      setError(msg);
      // Remove the optimistic user message on failure so user can retry
      setMessages((prev) => prev.slice(0, -1));
      setQuestion(q);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Cmd/Ctrl + Enter to send
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      sendQuestion();
    }
  }

  if (error && messages.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <CardTitle>Deep-dive unavailable</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{error}</p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => router.push(`/results/${jobId}`)}
              >
                Back to results
              </Button>
              <Button onClick={() => router.push("/")}>
                New analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-6">
        {/* Header */}
        <header className="mb-6 flex items-start justify-between gap-4">
          <div>
            <Link
              href={`/results/${jobId}`}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to results
            </Link>
            <h1 className="text-2xl font-semibold tracking-tight mt-2">
              Deep dive: {COUNTRY_LABELS[country]}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Ask follow-up questions. The agent has the full analysis context.
            </p>
          </div>
          {analysis && messages.length > 0 && (
            <div className="pt-6">
              <DownloadDeepDivePdfButton
                data={analysis}
                country={country}
                messages={messages}
              />
            </div>
          )}
        </header>

        {/* Messages */}
        <div className="space-y-4 mb-6">
          {initialLoading && (
            <div className="flex items-center gap-3 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">
                Generating go-to-market plan for {COUNTRY_LABELS[country]}…
              </span>
            </div>
          )}

          {messages.map((m, i) => (
            <MessageBubble key={i} message={m} />
          ))}

          {loading && (
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 pt-1.5">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Error banner (for send failures, while messages exist) */}
        {error && messages.length > 0 && (
          <div className="mb-4 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Composer */}
        <div className="sticky bottom-4 border rounded-lg bg-background shadow-sm">
          <Textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a follow-up… (⌘+Enter to send)"
            rows={2}
            disabled={loading || initialLoading}
            className="border-0 resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <div className="flex items-center justify-between px-3 pb-2">
            <span className="text-xs text-muted-foreground">
              The agent knows your product, countries, and the executive summary.
            </span>
            <Button
              size="sm"
              onClick={sendQuestion}
              disabled={!question.trim() || loading || initialLoading}
            >
              <Send className="h-3.5 w-3.5 mr-1.5" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  if (message.role === "user") {
    return (
      <div className="flex items-start gap-3 justify-end">
        <div className="max-w-[80%] rounded-lg bg-primary text-primary-foreground px-4 py-2.5 text-sm">
          {message.content}
        </div>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
          <User className="h-4 w-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <Sparkles className="h-4 w-4 text-primary" />
      </div>
      <div className="flex-1 rounded-lg border bg-card px-4 py-3">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
