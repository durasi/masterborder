"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "@/lib/i18n/context";
import { dictionaries, Locale, LOCALES } from "@/lib/i18n";

export function LanguagePicker() {
  const { locale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const timer = window.setTimeout(() => {
      document.addEventListener("click", onDown);
    }, 0);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("click", onDown);
    };
  }, [open]);

  const current = dictionaries[locale];

  const selectLocale = (l: Locale) => {
    try { localStorage.setItem("masterborder-locale", l); } catch {}
    document.cookie = `masterborder-locale=${l}; path=/; max-age=31536000; SameSite=Lax`;
    const url = new URL(window.location.href);
    url.searchParams.set("lang", l);
    window.location.href = url.toString();
  };

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={t.nav.languageLabel}
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/30 px-3 py-1.5 text-xs font-medium hover:bg-muted/60 transition-colors"
      >
        <span>{current.flag}</span>
        <span>{current.languageName}</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <path d="M1 3.5 L5 7.5 L9 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div role="menu" className="absolute right-0 mt-1 w-48 max-h-80 overflow-y-auto rounded-xl border border-border bg-background shadow-lg py-1 z-50">
          {LOCALES.map((l) => {
            const entry = dictionaries[l];
            const active = l === locale;
            return (
              <button
                key={l}
                type="button"
                role="menuitem"
                onClick={() => selectLocale(l)}
                className={`flex w-full items-center gap-2 px-3 py-2 text-sm text-left hover:bg-muted/40 transition-colors ${active ? "bg-muted/60 font-medium" : ""}`}
              >
                <span className="text-base">{entry.flag}</span>
                <span className="flex-1">{entry.languageName}</span>
                {active && <span className="text-primary">✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
