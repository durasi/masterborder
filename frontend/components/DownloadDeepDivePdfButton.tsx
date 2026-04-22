"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import type { AnalysisResponse, CountryCode } from "@/lib/types";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface DownloadDeepDivePdfButtonProps {
  data: AnalysisResponse;
  country: CountryCode;
  messages: ChatMessage[];
}

/**
 * Generates and downloads a PDF of the deep-dive conversation for the
 * current country. Includes the initial go-to-market plan and every
 * follow-up question + answer turn, formatted for A4 paper.
 */
export function DownloadDeepDivePdfButton({
  data,
  country,
  messages,
}: DownloadDeepDivePdfButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const disabled = messages.length === 0;

  async function handleDownload() {
    setLoading(true);
    setError(null);

    try {
      const [{ pdf }, { DeepDiveReport }, QRCodeMod] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./DeepDiveReport"),
        import("qrcode"),
      ]);

      // QR points back to this deep-dive page so a PDF recipient can
      // open the live conversation in a browser.
      const origin =
        typeof window !== "undefined"
          ? window.location.origin
          : "https://masterborder.vercel.app";
      const verifyUrl = `${origin}/results/${data.job_id}/${country}`;

      const verifyQrDataUrl = await QRCodeMod.toDataURL(verifyUrl, {
        errorCorrectionLevel: "H",
        margin: 1,
        width: 256,
        color: { dark: "#0a0a0a", light: "#ffffff" },
      });

      const blob = await pdf(
        <DeepDiveReport
          data={data}
          country={country}
          messages={messages}
          verifyQrDataUrl={verifyQrDataUrl}
          verifyUrl={verifyUrl}
        />,
      ).toBlob();

      const productSlug = data.request.product.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `masterborder-${productSlug}-${country.toLowerCase()}-deepdive.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "PDF export failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <Button
        variant="outline"
        size="sm"
        onClick={handleDownload}
        disabled={loading || disabled}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
            Preparing PDF…
          </>
        ) : (
          <>
            <Download className="mr-2 h-3.5 w-3.5" />
            Download PDF
          </>
        )}
      </Button>
      {error && (
        <span className="text-xs text-destructive max-w-xs text-right">
          {error}
        </span>
      )}
    </div>
  );
}
