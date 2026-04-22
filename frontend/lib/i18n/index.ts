import { en } from "./en";
import { tr } from "./tr";
import { es } from "./es";
import { fr } from "./fr";
import { de } from "./de";
import { pt } from "./pt";
import { ar } from "./ar";
import { zh } from "./zh";
import { ja } from "./ja";
import { ko } from "./ko";
import { ru } from "./ru";
import { it } from "./it";
import { nl } from "./nl";
import { hi } from "./hi";
import { id } from "./id";
import { pl } from "./pl";

export const dictionaries = {
  en, tr, es, fr, de, pt, ar, zh, ja, ko, ru, it, nl, hi, id, pl,
} as const;

export type Locale = keyof typeof dictionaries;

export const LOCALES: Locale[] = [
  "en", "tr", "es", "fr", "de", "pt", "ar",
  "zh", "ja", "ko", "ru", "it", "nl", "hi", "id", "pl",
];

export const RTL_LOCALES: Locale[] = ["ar"];

export function isRTL(locale: Locale): boolean {
  return RTL_LOCALES.includes(locale);
}
