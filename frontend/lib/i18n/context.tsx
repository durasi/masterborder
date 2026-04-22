"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
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

function detectInitialLocale(): Locale {
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

  if (typeof navigator !== "undefined") {
    const browser = navigator.language.split("-")[0] as Locale;
    if (LOCALES.includes(browser)) return browser;
  }

  return "en";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const detected = detectInitialLocale();
    setLocaleState(detected);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", detected);
      document.documentElement.setAttribute("dir", isRTL(detected) ? "rtl" : "ltr");
    }
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", next);
      document.documentElement.setAttribute("dir", isRTL(next) ? "rtl" : "ltr");
    }
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: dictionaries[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);
