import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/lib/i18n/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Disable static generation so URL query params (?lang=XX) are honored on every request
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
