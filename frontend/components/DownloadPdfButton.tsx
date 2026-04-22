"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import type { AnalysisResponse } from "@/lib/types";

interface DownloadPdfButtonProps {
  data: AnalysisResponse;
  filename: string;
}

/**
 * One-click PDF download with a verification QR code. The QR is generated
 * client-side pointing at the live results URL, so recipients of the PDF
 * can scan it to re-open the analysis in a browser and confirm its origin.
 *
 * The PDF engine, the template, and QRCode generator are all imported
 * lazily so none of them weigh down the initial page bundle.
 */
export function DownloadPdfButton({ data, filename }: DownloadPdfButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDownload() {
    setLoading(true);
    setError(null);

    try {
      const [{ pdf }, { MasterBorderReport }, QRCodeMod] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./MasterBorderReport"),
        import("qrcode"),
      ]);

      // Build the public URL the QR code will encode. Prefer the live origin
      // the user is currently viewing, so the QR works in both local and
      // deployed environments without any extra config.
      const origin =
        typeof window !== "undefined"
          ? window.location.origin
          : "https://masterborder.vercel.app";
      const verifyUrl = `${origin}/results/${data.job_id}`;

      // Generate the QR as a PNG data URL. High error correction makes the
      // code resilient to print/scan noise.
      const verifyQrDataUrl = await QRCodeMod.toDataURL(verifyUrl, {
        errorCorrectionLevel: "H",
        margin: 1,
        width: 256,
        color: { dark: "#0a0a0a", light: "#ffffff" },
      });

      const blob = await pdf(
        <MasterBorderReport
          data={data}
          verifyQrDataUrl={verifyQrDataUrl}
          verifyUrl={verifyUrl}
        />,
      ).toBlob();

      const slug =
        filename
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") || "report";

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `masterborder-${slug}.pdf`;
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
        disabled={loading}
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
