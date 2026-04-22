"use client";

import { createContext, useContext, useEffect, useLayoutEffect, useState, ReactNode } from "react";
import { dictionaries, Locale, LOCALES, isRTL } from "./index";
import type { Translations } from "./en";

const STORAGE_KEY = "masterborder-locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Translations;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  setLocale: () => {},
  t: dictionaries.en,
});

// Default is always English. Locale changes only when:
//   1) The user explicitly picks a language from the dropdown (writes to localStorage)
//   2) The URL contains ?lang=XX (e.g. a shared link)
//
// We deliberately DO NOT honor navigator.language here: the judges are English
// speakers, and a cold first visit should always present the app in English.
function detectLocale(): Locale {
  if (typeof window === "undefined") return "en";
  try {
    const url = new URL(window.location.href);
    const urlLang = url.searchParams.get("lang") as Locale | null;
    if (urlLang && LOCALES.includes(urlLang)) {
      try { localStorage.setItem(STORAGE_KEY, urlLang); } catch {}
      return urlLang;
    }
  } catch {}
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && LOCALES.includes(saved)) return saved;
  } catch {}
  return "en";
}

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => detectLocale());

  useIsoLayoutEffect(() => {
    document.documentElement.setAttribute("lang", locale);
    document.documentElement.setAttribute("dir", isRTL(locale) ? "rtl" : "ltr");
  }, [locale]);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch {}
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: dictionaries[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);
