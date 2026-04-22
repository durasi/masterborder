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

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    // Hydrate preference: localStorage > browser language > en
    const saved = typeof window !== "undefined"
      ? (localStorage.getItem(STORAGE_KEY) as Locale | null)
      : null;

    let next: Locale = "en";
    if (saved && LOCALES.includes(saved)) {
      next = saved;
    } else if (typeof navigator !== "undefined") {
      const browserLang = navigator.language.split("-")[0] as Locale;
      if (LOCALES.includes(browserLang)) next = browserLang;
    }

    setLocaleState(next);
    applyDocumentAttrs(next);
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, next);
    }
    applyDocumentAttrs(next);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: dictionaries[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

function applyDocumentAttrs(locale: Locale) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("lang", locale);
  document.documentElement.setAttribute("dir", isRTL(locale) ? "rtl" : "ltr");
}

export const useLocale = () => useContext(LocaleContext);
