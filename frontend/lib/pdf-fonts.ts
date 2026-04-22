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
 * Fonts are loaded from jsDelivr's Google Fonts mirror. TTF files only —
 * WOFF2 is not supported by @react-pdf.
 */

import { Font } from "@react-pdf/renderer";

let registered = false;

export function registerPdfFonts(): void {
  if (registered) return;
  registered = true;

  // Noto Sans — Latin, Latin Extended, Cyrillic, Greek, Turkish diacritics
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

  // Noto Sans SC — Simplified Chinese (zh)
  Font.register({
    family: "Noto Sans SC",
    fonts: [
      {
        src: "https://cdn.jsdelivr.net/gh/googlefonts/noto-cjk@main/Sans/OTF/SimplifiedChinese/NotoSansSC-Regular.otf",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/googlefonts/noto-cjk@main/Sans/OTF/SimplifiedChinese/NotoSansSC-Bold.otf",
        fontWeight: "bold",
      },
    ],
  });

  // Noto Sans JP — Japanese (ja)
  Font.register({
    family: "Noto Sans JP",
    fonts: [
      {
        src: "https://cdn.jsdelivr.net/gh/googlefonts/noto-cjk@main/Sans/OTF/Japanese/NotoSansJP-Regular.otf",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/googlefonts/noto-cjk@main/Sans/OTF/Japanese/NotoSansJP-Bold.otf",
        fontWeight: "bold",
      },
    ],
  });

  // Noto Sans KR — Korean (ko)
  Font.register({
    family: "Noto Sans KR",
    fonts: [
      {
        src: "https://cdn.jsdelivr.net/gh/googlefonts/noto-cjk@main/Sans/OTF/Korean/NotoSansKR-Regular.otf",
      },
      {
        src: "https://cdn.jsdelivr.net/gh/googlefonts/noto-cjk@main/Sans/OTF/Korean/NotoSansKR-Bold.otf",
        fontWeight: "bold",
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
  if (l.startsWith("ja")) return { regular: "Noto Sans JP", bold: "Noto Sans JP" };
  if (l.startsWith("ko")) return { regular: "Noto Sans KR", bold: "Noto Sans KR" };
  if (l.startsWith("hi")) return { regular: "Noto Sans Devanagari", bold: "Noto Sans Devanagari" };
  return { regular: "Noto Sans", bold: "Noto Sans" };
}
