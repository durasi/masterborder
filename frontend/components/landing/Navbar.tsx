"use client";

import Link from "next/link";
import { LanguagePicker } from "@/components/LanguagePicker";
import { useLocale } from "@/lib/i18n/context";

/**
 * Navbar — sticky, blurred background, logo + nav links + language picker + CTA.
 * Triggers "Try sample" via an optional onTrySample callback (the home page
 * wires this up to fillSampleProduct); if omitted the CTA is hidden.
 * Nav links use anchor hrefs so they scroll to in-page sections (#how-it-works,
 * #features) with the smooth-scroll behavior configured globally.
 */
interface NavbarProps {
  onTrySample?: () => void;
}

export function Navbar({ onTrySample }: NavbarProps) {
  const { t } = useLocale();

  return (
    <nav
      className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-xl transition-colors"
      style={{
        backgroundColor: "color-mix(in srgb, var(--background) 70%, transparent)",
        WebkitBackdropFilter: "saturate(180%) blur(24px)",
        backdropFilter: "saturate(180%) blur(24px)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-semibold tracking-tight transition-opacity hover:opacity-80"
        >
          <img
            src="/masterborder-logo.svg"
            alt=""
            aria-hidden="true"
            width={30}
            height={30}
            className="h-[30px] w-[30px] transition-transform duration-300 ease-out group-hover:rotate-[8deg] group-hover:scale-110"
            style={{ filter: "drop-shadow(0 2px 8px var(--accent-glow))" }}
          />
          <span className="text-[15px]">MasterBorder</span>
        </Link>

        {/* Nav links (hidden on mobile) */}
        <div className="hidden items-center gap-0.5 md:flex">
          <a
            href="#how-it-works"
            className="relative rounded-lg px-3 py-1.5 text-[13.5px] text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
          >
            {t.nav.howItWorks}
          </a>
          <Link
            href="/examples/leather-wallet-tr-to-us-de-uk-jp"
            className="relative rounded-lg px-3 py-1.5 text-[13.5px] text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
          >
            {t.nav.example}
          </Link>
          <a
            href="https://github.com/durasi/masterborder"
            target="_blank"
            rel="noopener noreferrer"
            className="relative rounded-lg px-3 py-1.5 text-[13.5px] text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
          >
            {t.nav.github}
          </a>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <LanguagePicker />
          {onTrySample && (
            <button
              type="button"
              onClick={onTrySample}
              className="relative overflow-hidden rounded-lg bg-foreground px-4 py-2 text-[13px] font-medium text-background transition-all duration-200 hover:-translate-y-px hover:shadow-md"
            >
              <span className="relative z-10">{t.nav.trySample}</span>
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 hover:translate-x-full"
              />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
