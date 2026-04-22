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
  if (typeof navigator !== "undefined") {
    const browser = navigator.language.split("-")[0] as Locale;
    if (LOCALES.includes(browser)) return browser;
  }
  return "en";
}

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function LocaleProvider({ children }: { children: ReactNode }) {
  // Lazy initializer runs synchronously on the FIRST render.
  // On the server it returns "en" (no window). On the client the very first
  // render already picks up the URL / localStorage / navigator value. With
  // suppressHydrationWarning on <html>, the mismatch between the SSR markup
  // and the client's first render is treated as expected, and React keeps
  // the client-side value instead of resetting it to the server version.
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
