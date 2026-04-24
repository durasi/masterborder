import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/lib/i18n/context";

// Inter — the modern sans-serif for the entire UI.
// Variable font: pulls 100–900 weight range in one request.
// Exposed as --font-sans so every shadcn component and layout section
// inherits it consistently.
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

// Geist Sans — kept available for the hero accent specifically.
// Inter's italic rendering with tight tracking clipped edges on longer
// phrases; Geist's italic holds up better at display size.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// Geist Mono for tabular numerics (metric strip) and code blocks.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const dynamic = "force-dynamic";

const SITE_URL = "https://masterborder.vercel.app";
const SITE_TITLE = "MasterBorder — Cross-border trade compliance in minutes";
const SITE_DESCRIPTION =
  "One specialized Claude Opus 4.7 agent per target market, in parallel. Harmonized executive summary, interactive country deep-dive, professional PDF with regulatory citations.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "MasterBorder",
    type: "website",
    images: [
      {
        url: "/masterborder-logo.svg",
        width: 1200,
        height: 630,
        alt: "MasterBorder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/masterborder-logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
