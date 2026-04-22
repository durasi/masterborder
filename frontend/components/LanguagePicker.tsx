"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "@/lib/i18n/context";
import { dictionaries, Locale, LOCALES } from "@/lib/i18n";

export function LanguagePicker() {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    // Only register when dropdown is open
    const onPointerDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    // Use capture: false, register on next tick to avoid catching the same click that opened it
    const timer = setTimeout(() => {
      document.addEventListener("pointerdown", onPointerDown);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const current = dictionaries[locale];

  const handleSelect = (l: Locale) => {
    setLocale(l);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
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
        <div
          role="menu"
          className="absolute right-0 mt-1 w-48 max-h-80 overflow-y-auto rounded-xl border border-border bg-background shadow-lg py-1 z-50"
        >
          {LOCALES.map((l) => {
            const entry = dictionaries[l];
            const active = l === locale;
            return (
              <button
                key={l}
                type="button"
                role="menuitem"
                onClick={() => handleSelect(l)}
                className={`flex w-full items-center gap-2 px-3 py-2 text-sm text-left hover:bg-muted/40 transition-colors ${
                  active ? "bg-muted/60 font-medium" : ""
                }`}
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
