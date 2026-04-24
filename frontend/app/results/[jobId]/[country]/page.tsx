"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  AlertTriangle,
  ArrowLeft,
  Loader2,
  Send,
  User,
  Sparkles,
  MessageSquare,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { api, APIError } from "@/lib/api";
import {
  COUNTRY_LABELS,
  type AnalysisResponse,
  type CountryCode,
} from "@/lib/types";
import { DownloadDeepDivePdfButton } from "@/components/DownloadDeepDivePdfButton";
import { LanguagePicker } from "@/components/LanguagePicker";
import { MeshBackground } from "@/components/landing/MeshBackground";
import { useLocale } from "@/lib/i18n/context";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

/**
 * DeepDivePage — interactive follow-up Q&A with Opus 4.7 for a single
 * target market.
 *
 * Shares the visual vocabulary of the landing and Results pages: mesh-orb
 * background, sticky blurred navbar, glass morphism panels. Functional
 * behaviour is identical to the previous version (initial /api/recommend
 * with reset_conversation=true, subsequent user_question follow-ups,
 * cmd+Enter to send, auto-scroll, error/rate-limit handling).
 *
 * One visible fix: the country name now comes from t.countries[code]
 * (localized, flag-free) with a separate flag chip, instead of the raw
 * COUNTRY_LABELS[code] which embeds the flag emoji in the string and
 * produced duplicated flags when interpolated into titles.
 */
export default function DeepDivePage() {
  const params = useParams<{ jobId: string; country: string }>();
  const router = useRouter();
  const { t, locale } = useLocale();

  const jobId = params.jobId;
  const country = params.country as CountryCode;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);

  // Name for humans, without the flag emoji that COUNTRY_LABELS carries.
  // This is what goes into the page title.
  const countryName =
    t.countries[country] ??
    (COUNTRY_LABELS[country] ?? country).replace(/^\S+\s+/, "");

  // The flag emoji in isolation — rendered as a separate pill so it never
  // ends up duplicated with the localized country name beside it.
  const countryFlag = (COUNTRY_LABELS[country] ?? "").split(" ")[0] ?? "";

  // Load the initial deep-dive on mount
  useEffect(() => {
    if (!jobId || !country) return;
    let cancelled = false;

    async function fetchInitial() {
      try {
        const [jobRes, recRes] = await Promise.all([
          api.getJob(jobId),
          api.recommend(jobId, country, {
            reset_conversation: true,
            preferred_language: locale,
          }),
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
          setError(err.rateLimitMessage ?? t.form.errorRateLimit);
        } else if (err instanceof APIError && err.status === 404) {
          setError(t.results.notFound);
        } else {
          setError(err instanceof Error ? err.message : t.deepDive.errorSend);
        }
      } finally {
        if (!cancelled) setInitialLoading(false);
      }
    }

    fetchInitial();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId, country]);

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, loading]);

  async function sendQuestion() {
    const q = question.trim();
    if (!q || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: q }]);
    setQuestion("");
    setLoading(true);
    setError(null);

    try {
      const res = await api.recommend(jobId, country, {
        user_question: q,
        preferred_language: locale,
      });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.message },
      ]);
    } catch (err) {
      let msg: string = t.deepDive.errorSend;
      if (err instanceof APIError && err.isRateLimit) {
        msg = err.rateLimitMessage ?? t.form.errorRateLimit;
      } else if (err instanceof Error) {
        msg = err.message;
      }
      setError(msg);
      setMessages((prev) => prev.slice(0, -1));
      setQuestion(q);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      sendQuestion();
    }
  }

  // -------- Error state (no messages yet) -------------------------------
  if (error && messages.length === 0) {
    return (
      <>
        <MeshBackground />
        <div className="relative min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md w-full rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_12px_40px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-semibold tracking-tight">
                {t.results.notFound}
              </h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {error}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => router.push(`/results/${jobId}`)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t.deepDive.backToResults}
              </Button>
              <Button className="flex-1" onClick={() => router.push("/")}>
                {t.results.backToAnalysis}
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // -------- Main ---------------------------------------------------------
  return (
    <>
      <MeshBackground />

      {/* Sticky navbar */}
      <nav className="sticky top-0 z-40 border-b border-border/40 bg-background/70 backdrop-blur-lg">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-5 py-3">
          <Link
            href={`/results/${jobId}`}
            className="group flex items-center gap-2.5 text-sm font-medium transition-colors hover:text-foreground text-muted-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span>{t.deepDive.backToResults}</span>
          </Link>

          <Link
            href="/"
            className="hidden sm:flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-muted/60 transition-colors"
          >
            <Image
              src="/masterborder-logo.svg"
              alt="MasterBorder"
              width={22}
              height={22}
              priority
            />
            <span className="text-sm font-semibold tracking-tight">
              MasterBorder
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <LanguagePicker />
            {analysis && messages.length > 0 && (
              <DownloadDeepDivePdfButton
                data={analysis}
                country={country}
                messages={messages}
              />
            )}
          </div>
        </div>
      </nav>

      <main className="relative">
        <div className="mx-auto max-w-4xl px-5 py-10 pb-40">
          {/* Hero-like header */}
          <header className="mb-8 mb-fade-up mb-d1">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-[11.5px] font-medium uppercase tracking-[0.06em] text-blue-700 dark:text-blue-300">
              <MessageSquare className="h-3 w-3" />
              <span>{t.deepDiveCta.headline}</span>
            </div>

            <h1
              className="mb-4 font-semibold tracking-[-0.03em] leading-[1.05]"
              style={{ fontSize: "clamp(1.875rem, 4.5vw, 2.75rem)" }}
            >
              <span>
                {t.results.deepDive
                  .replace("{country}", countryName)}
              </span>
            </h1>

            <div className="flex flex-wrap items-center gap-2">
              {countryFlag && (
                <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 px-3 py-1 text-[13px] font-medium text-blue-900 dark:text-blue-100">
                  <span className="text-[15px] leading-none">
                    {countryFlag}
                  </span>
                  <span>{countryName}</span>
                </div>
              )}
              <p className="text-[13px] text-muted-foreground">
                {t.deepDive.subtitle.replace("{country}", countryName)}
              </p>
            </div>
          </header>

          {/* Conversation */}
          <div className="space-y-4 mb-6 mb-fade-up mb-d2">
            {initialLoading && (
              <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/80 backdrop-blur-md px-5 py-4">
                <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                <span className="text-sm text-muted-foreground">
                  {t.deepDive.subtitle.replace("{country}", countryName)}
                </span>
              </div>
            )}

            {messages.map((m, i) => (
              <MessageBubble key={i} message={m} />
            ))}

            {loading && (
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-md shadow-blue-500/20">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="flex-1 pt-2">
                  <span className="text-sm text-muted-foreground inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t.deepDive.thinking}
                  </span>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Inline error banner (messages already exist) */}
          {error && messages.length > 0 && (
            <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-2.5 text-sm text-destructive">
              {error}
            </div>
          )}
        </div>

        {/* Composer — sticky at the bottom of the viewport */}
        <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-border/40 bg-background/80 backdrop-blur-lg">
          <div className="mx-auto max-w-4xl px-5 py-4">
            <div className="rounded-xl border border-border/60 bg-card/90 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.04),_0_12px_40px_rgba(0,0,0,0.04)]">
              <Textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.deepDive.placeholder}
                rows={2}
                disabled={loading || initialLoading}
                className="border-0 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
              />
              <div className="flex items-center justify-between px-3 pb-2.5 pt-0.5">
                <span className="text-[11px] text-muted-foreground font-mono">
                  ⌘+Enter
                </span>
                <Button
                  size="sm"
                  onClick={sendQuestion}
                  disabled={!question.trim() || loading || initialLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Send className="h-3.5 w-3.5 mr-1.5" />
                  {t.deepDive.send}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  if (message.role === "user") {
    return (
      <div className="flex items-start gap-3 justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-gradient-to-br from-blue-600 to-blue-700 text-white px-4 py-2.5 text-[14px] leading-[1.5] shadow-sm shadow-blue-500/20">
          {message.content}
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
          <User className="h-4 w-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-md shadow-blue-500/20">
        <Sparkles className="h-4 w-4" />
      </div>
      <div className="flex-1 rounded-2xl rounded-tl-md border border-border/60 bg-card/80 backdrop-blur-md px-5 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-code:text-foreground/80 prose-code:bg-muted/60 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
