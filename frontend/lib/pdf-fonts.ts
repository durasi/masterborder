/**
 * @react-pdf font registration for multilingual support.
 *
 * Helvetica (the default) only renders Latin-1 glyphs correctly.
 * Non-Latin scripts (Arabic, CJK, Devanagari, Thai, Cyrillic, Greek, Turkish
 * diacritics) render as □ tofu or break line layout.
 *
 * This module registers Noto Sans (and its script-specific siblings) so PDFs
 * generated from 16-language UI content stay legible.
 *
 * CJK fonts are hosted locally under /public/fonts for reliability — they
 * are large files and third-party CDNs (jsDelivr, gstatic) were unreliable.
 * Latin, Arabic, and Devanagari still come from jsDelivr's Google Fonts
 * mirror (TTF files only — WOFF2 is not supported by @react-pdf).
 */

import { Font } from "@react-pdf/renderer";

let registered = false;

export function registerPdfFonts(): void {
  if (registered) return;
  registered = true;

  // Noto Sans — Latin, Latin Extended, Cyrillic, Greek, Turkish diacritics.
  // We register JP glyph fallbacks in the same family so EN-language PDFs
  // that happen to contain Japanese content (e.g. target country = JP) can
  // render CJK glyphs without manually switching fontFamily per span.
  Font.register({
    family: "Noto Sans",
    fonts: [
      {
        src: "https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSans/NotoSans-Regular.ttf",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSans/NotoSans-Bold.ttf",
        fontWeight: "bold",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSans/NotoSans-Italic.ttf",
        fontStyle: "italic",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSans/NotoSans-BoldItalic.ttf",
        fontWeight: "bold",
        fontStyle: "italic",
      },
      // JP glyph fallback — same family, so @react-pdf falls back here when
      // a glyph is missing from the Latin set.
      { src: "/fonts/NotoSansJP-Regular.otf" },
      { src: "/fonts/NotoSansJP-Regular.otf", fontStyle: "italic" },
      { src: "/fonts/NotoSansJP-Bold.otf", fontWeight: "bold" },
      {
        src: "/fonts/NotoSansJP-Bold.otf",
        fontWeight: "bold",
        fontStyle: "italic",
      },
    ],
  });

  // Prevent @react-pdf from emitting "Could not resolve font" warnings
  // for hyphenation callback which tries 400/italic etc.
  Font.registerHyphenationCallback((word) => [word]);

  // Noto Sans Arabic — AR locale (RTL)
  Font.register({
    family: "Noto Sans Arabic",
    fonts: [
      {
        src: "https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSansArabic/NotoSansArabic-Regular.ttf",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSansArabic/NotoSansArabic-Bold.ttf",
        fontWeight: "bold",
      },
    ],
  });

  // Noto Sans SC — Simplified Chinese (zh). Register all four style/weight
  // permutations pointing at the local OTF files so @react-pdf never fails
  // to resolve a variant when italic or bold is requested within ZH content.
  Font.register({
    family: "Noto Sans SC",
    fonts: [
      { src: "/fonts/NotoSansSC-Regular.otf" },
      { src: "/fonts/NotoSansSC-Regular.otf", fontStyle: "italic" },
      { src: "/fonts/NotoSansSC-Bold.otf", fontWeight: "bold" },
      {
        src: "/fonts/NotoSansSC-Bold.otf",
        fontWeight: "bold",
        fontStyle: "italic",
      },
    ],
  });

  // Noto Sans JP — Japanese (ja).
  // JP script has no true italic. We register the regular file under all four
  // style/weight combinations so @react-pdf never fails to resolve a variant
  // when mixed text asks for bold or italic within a JP-language page.
  Font.register({
    family: "Noto Sans JP",
    fonts: [
      { src: "/fonts/NotoSansJP-Regular.otf" },
      { src: "/fonts/NotoSansJP-Regular.otf", fontStyle: "italic" },
      { src: "/fonts/NotoSansJP-Bold.otf", fontWeight: "bold" },
      {
        src: "/fonts/NotoSansJP-Bold.otf",
        fontWeight: "bold",
        fontStyle: "italic",
      },
    ],
  });

  // Noto Sans KR — Korean (ko). Register all four style/weight permutations
  // pointing at the local OTF files so @react-pdf never fails to resolve a
  // variant when italic or bold is requested within KR content.
  Font.register({
    family: "Noto Sans KR",
    fonts: [
      { src: "/fonts/NotoSansKR-Regular.otf" },
      { src: "/fonts/NotoSansKR-Regular.otf", fontStyle: "italic" },
      { src: "/fonts/NotoSansKR-Bold.otf", fontWeight: "bold" },
      {
        src: "/fonts/NotoSansKR-Bold.otf",
        fontWeight: "bold",
        fontStyle: "italic",
      },
    ],
  });

  // Noto Sans Devanagari — Hindi (hi)
  Font.register({
    family: "Noto Sans Devanagari",
    fonts: [
      {
        src: "https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSansDevanagari/NotoSansDevanagari-Regular.ttf",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSansDevanagari/NotoSansDevanagari-Bold.ttf",
        fontWeight: "bold",
      },
    ],
  });
}

/**
 * Pick the correct font family for a given locale.
 * Latin + Cyrillic + Greek + Turkish all use the shared "Noto Sans" family.
 */
export function fontFor(locale: string): { regular: string; bold: string } {
  const l = locale.toLowerCase();
  if (l.startsWith("ar")) return { regular: "Noto Sans Arabic", bold: "Noto Sans Arabic" };
  if (l.startsWith("zh")) return { regular: "Noto Sans SC", bold: "Noto Sans SC" };
  if (l.startsWith("ko")) return { regular: "Noto Sans KR", bold: "Noto Sans KR" };
  if (l.startsWith("hi")) return { regular: "Noto Sans Devanagari", bold: "Noto Sans Devanagari" };
  // Default to Noto Sans JP for all Latin-family locales because Noto Sans JP
  // contains full Latin glyphs *and* CJK ideographs — letting PDFs render
  // Japanese-language compliance text (e.g. 牛革, トルコ製) correctly even when
  // the UI locale is English or another Latin language.
  return { regular: "Noto Sans JP", bold: "Noto Sans JP" };
}
