/**
 * DeepDiveReport — vector PDF for a country-specific go-to-market plan.
 *
 * Renders the multi-turn conversation between the user and the Recommendation
 * Agent (deep-dive + follow-up questions) as a structured A4 document, using
 * the same visual language as the main compliance report: shield logo, official
 * metadata badge, Word-style footer with verification QR code.
 */

import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { registerPdfFonts, fontFor } from "@/lib/pdf-fonts";

import type { AnalysisResponse, CountryCode } from "@/lib/types";

registerPdfFonts();

const COUNTRY_PLAIN: Record<CountryCode, string> = {
  US: "United States",
  DE: "Germany",
  GB: "United Kingdom",
  TR: "Turkey",
  JP: "Japan",
};

const LOGO_URL =
  typeof window !== "undefined"
    ? `${window.location.origin}/masterborder-logo.svg`
    : "/masterborder-logo.svg";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  data: AnalysisResponse;
  country: CountryCode;
  messages: ChatMessage[];
  verifyQrDataUrl?: string;
  verifyUrl?: string;
  locale?: string;
}

type PdfStyles = ReturnType<typeof makeStyles>;

function makeStyles(primaryFont: string) {
  return StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingHorizontal: 40,
    paddingBottom: 28,
    fontSize: 10,
    fontFamily: primaryFont,
    color: "#0a0a0a",
    lineHeight: 1.45,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#0a0a0a",
  },
  headerLeft: { flex: 1, paddingRight: 20, paddingTop: 8 },
  brand: {
    fontSize: 8,
    fontFamily: primaryFont,
    letterSpacing: 0.8,
    color: "#737373",
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontFamily: primaryFont,
    marginBottom: 6,
    lineHeight: 1.2,
  },
  subtitle: {
    fontSize: 10,
    color: "#404040",
    fontFamily: primaryFont,
    marginBottom: 6,
  },
  meta: { fontSize: 9, color: "#525252", lineHeight: 1.5 },
  reportIdRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
    marginTop: 10,
  },
  reportIdLabel: {
    fontSize: 8,
    lineHeight: 1,
    color: "#737373",
    letterSpacing: 0.8,
    fontFamily: primaryFont,
  },
  reportIdValue: {
    fontSize: 8,
    lineHeight: 1,
    fontFamily: "Courier-Bold",
    color: "#1e40af",
  },

  // Badge (right side)
  badgeBlock: {
    alignItems: "center",
    width: 120,
  },
  logo: { width: 80, height: 80, marginBottom: 8 },
  badgeLabel: {
    fontSize: 6,
    color: "#737373",
    letterSpacing: 0.5,
    textAlign: "center",
  },
  badgeValue: {
    fontSize: 8,
    fontFamily: primaryFont,
    color: "#0a0a0a",
    textAlign: "center",
    marginBottom: 2,
  },
  badgeMono: {
    fontSize: 7.5,
    fontFamily: "Courier-Bold",
    color: "#1e40af",
    marginTop: 1,
    textAlign: "center",
  },
  badgeDivider: {
    width: 60,
    height: 1,
    backgroundColor: "#d4d4d4",
    marginVertical: 4,
  },

  // Conversation turn
  turnBlock: { marginBottom: 14 },
  turnLabel: {
    fontSize: 8,
    fontFamily: primaryFont,
    letterSpacing: 1,
    marginBottom: 4,
  },
  turnLabelUser: { color: "#737373" },
  turnLabelAssistant: { color: "#1e40af" },

  // User question box
  userBox: {
    backgroundColor: "#f5f5f5",
    borderLeftWidth: 3,
    borderLeftColor: "#a3a3a3",
    padding: 8,
    marginBottom: 4,
  },
  userText: { fontSize: 10, color: "#262626", lineHeight: 1.4 },

  // Assistant response rendering
  responseHeading1: {
    fontSize: 14,
    fontFamily: primaryFont,
    marginTop: 8,
    marginBottom: 5,
  },
  responseHeading2: {
    fontSize: 12,
    fontFamily: primaryFont,
    marginTop: 6,
    marginBottom: 4,
  },
  responseHeading3: {
    fontSize: 11,
    fontFamily: primaryFont,
    marginTop: 5,
    marginBottom: 3,
  },
  responseParagraph: {
    fontSize: 10,
    marginBottom: 5,
    textAlign: "justify",
  },
  responseBullet: {
    fontSize: 10,
    marginBottom: 3,
    paddingLeft: 14,
  },
  responseNumbered: {
    fontSize: 10,
    marginBottom: 3,
    paddingLeft: 14,
  },

  // Divider between turns
  turnDivider: {
    height: 0.5,
    backgroundColor: "#e5e5e5",
    marginVertical: 10,
  },

  // Footer — in-flow (not absolute) but still repeated on every page
  // via the `fixed` attribute. Because it's in-flow, content can never
  // render below it on the final page.
  footerWrapper: {
    marginTop: "auto",
    paddingTop: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderTopWidth: 0.5,
    borderTopColor: "#d4d4d4",
    paddingTop: 6,
  },
  footerLeft: { flex: 1, paddingRight: 8 },
  footerBrand: {
    fontSize: 7,
    fontFamily: primaryFont,
    color: "#404040",
    marginBottom: 1,
  },
  footerUrl: {
    fontSize: 6.5,
    color: "#1d4ed8",
    marginBottom: 1,
  },
  footerAuthor: {
    fontSize: 6,
    color: "#737373",
    marginBottom: 1,
  },
  footerMeta: { fontSize: 6, color: "#a3a3a3" },
  footerRight: { alignItems: "flex-end" },
  footerQRLabel: {
    fontSize: 5.5,
    color: "#737373",
    textAlign: "center",
    marginBottom: 2,
    letterSpacing: 0.3,
  },
  qrImage: { width: 44, height: 44 },
});
}

// ─────────────────────────────────────────────────────────────
// Structured markdown parser (same shape used by the main report)
// ─────────────────────────────────────────────────────────────

type Block =
  | { kind: "h1"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "bullet"; text: string }
  | { kind: "numbered"; text: string; num: number };

function parseMarkdown(markdown: string): Block[] {
  const blocks: Block[] = [];
  // Strip emoji & non-BMP characters that Helvetica can't render
  // (they appear as <ú<ø / =Å / >ê garbage in the PDF).
  const stripEmoji = (s: string) =>
    s
      // Strip surrogate pairs (emoji like 🇺🇸, 📅, 💰)
      .replace(/[\u{1F300}-\u{1FAFF}]/gu, "")
      .replace(/[\u{1F000}-\u{1F2FF}]/gu, "")
      .replace(/[\u{2600}-\u{27BF}]/gu, "")
      .replace(/[\u{1F1E6}-\u{1F1FF}]/gu, "")
      // Unicode variation selectors / zero-width joiners
      .replace(/[\u200B-\u200D\uFEFF\uFE0F]/g, "")
      // Collapse extra spaces left behind
      .replace(/[ \t]{2,}/g, " ")
      .trim();

  const normalized = stripEmoji(markdown)
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .replace(/^-{3,}\s*$/gm, "")
    .replace(/\|/g, "  ")
    .replace(/\n{3,}/g, "\n\n");

  for (const rawLine of normalized.split("\n")) {
    const line = rawLine.trim();
    if (!line) continue;

    // Markdown headings
    if (/^#\s/.test(line)) {
      blocks.push({ kind: "h1", text: line.replace(/^#\s+/, "") });
      continue;
    }
    if (/^##\s/.test(line)) {
      blocks.push({ kind: "h2", text: line.replace(/^##\s+/, "") });
      continue;
    }
    if (/^#{3,6}\s/.test(line)) {
      blocks.push({ kind: "h3", text: line.replace(/^#{3,6}\s+/, "") });
      continue;
    }

    // Bullets
    const bulletMatch = line.match(/^[-*•]\s+(.*)$/);
    if (bulletMatch) {
      blocks.push({ kind: "bullet", text: bulletMatch[1] });
      continue;
    }

    // Numbered list items
    const numMatch = line.match(/^(\d+)\.\s+(.*)$/);
    if (numMatch) {
      blocks.push({
        kind: "numbered",
        text: numMatch[2],
        num: parseInt(numMatch[1], 10),
      });
      continue;
    }

    blocks.push({ kind: "paragraph", text: line });
  }

  return blocks;
}

function MarkdownBlocks({ markdown, styles }: { markdown: string; styles: PdfStyles }) {
  const blocks = parseMarkdown(markdown);
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.kind) {
          case "h1":
            return (
              <Text key={i} style={styles.responseHeading1}>
                {block.text}
              </Text>
            );
          case "h2":
            return (
              <Text key={i} style={styles.responseHeading2}>
                {block.text}
              </Text>
            );
          case "h3":
            return (
              <Text key={i} style={styles.responseHeading3}>
                {block.text}
              </Text>
            );
          case "bullet":
            return (
              <Text key={i} style={styles.responseBullet}>
                • {block.text}
              </Text>
            );
          case "numbered":
            return (
              <Text key={i} style={styles.responseNumbered}>
                {block.num}. {block.text}
              </Text>
            );
          case "paragraph":
            return (
              <Text key={i} style={styles.responseParagraph}>
                {block.text}
              </Text>
            );
        }
      })}
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Main document
// ─────────────────────────────────────────────────────────────

export function DeepDiveReport({
  data,
  country,
  messages,
  verifyQrDataUrl,
  verifyUrl,
  locale = "en",
}: Props) {
  const primaryFont = fontFor(locale).regular;
  const styles = makeStyles(primaryFont);
  const { product } = data.request;
  const reportDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const shortId = data.job_id.slice(0, 8).toUpperCase();
  const countryName = COUNTRY_PLAIN[country];

  return (
    <Document
      title={`MasterBorder Deep Dive - ${product.name} - ${countryName}`}
      author="MasterBorder"
      subject={`Go-to-market plan for ${countryName}`}
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Text style={styles.brand}>
              MASTERBORDER  ·  DEEP-DIVE REPORT
            </Text>
            <Text style={styles.title}>{countryName} Go-to-Market Plan</Text>
            <Text style={styles.subtitle}>
              Product: {product.name}
            </Text>
            <Text style={styles.meta}>
              Origin: {COUNTRY_PLAIN[product.origin_country]}
              {"\n"}
              Target market: {countryName}
            </Text>
            <View style={styles.reportIdRow}>
              <Text style={styles.reportIdLabel}>REPORT ID</Text>
              <Text style={styles.reportIdValue}>
                {shortId}-{country}
              </Text>
            </View>
          </View>

          <View style={styles.badgeBlock}>
            <Image src={LOGO_URL} style={styles.logo} />
            <Text style={styles.badgeLabel}>ISSUED</Text>
            <Text style={styles.badgeValue}>{reportDate}</Text>
          </View>
        </View>

        {/* Conversation turns */}
        {messages.map((msg, i) => {
          const isAssistantResponse = msg.role === "assistant";
          const isFirstTurn = i < 2;

          return (
            <View key={i} style={styles.turnBlock}>
              {isAssistantResponse ? (
                <>
                  {!isFirstTurn && (
                    <Text
                      style={[styles.turnLabel, styles.turnLabelAssistant]}
                    >
                      AGENT RESPONSE
                    </Text>
                  )}
                  <MarkdownBlocks markdown={msg.content} styles={styles} />
                </>
              ) : (
                <>
                  {!isFirstTurn && (
                    <Text style={[styles.turnLabel, styles.turnLabelUser]}>
                      FOLLOW-UP QUESTION
                    </Text>
                  )}
                  <View style={styles.userBox}>
                    <Text style={styles.userText}>{msg.content}</Text>
                  </View>
                </>
              )}
            </View>
          );
        })}

        {/* Footer sits in normal flow at the bottom of each page */}
        <View style={styles.footerWrapper} fixed>
          <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <Text style={styles.footerBrand}>
              MasterBorder  ·  Deep-Dive Report  ·  {countryName}
            </Text>
            {verifyUrl && (
              <Text style={styles.footerUrl}>{verifyUrl}</Text>
            )}
            <Text style={styles.footerAuthor}>
              Built with Opus 4.7: a Claude Code hackathon, April 2026 — Generated by MasterBorder — github.com/durasi
            </Text>
            <Text
              style={styles.footerMeta}
              render={({ pageNumber, totalPages }) =>
                `Report ${shortId}-${country}  ·  Page ${pageNumber} of ${totalPages}  ·  Built with Opus 4.7`
              }
            />
          </View>

          {verifyQrDataUrl && (
            <View style={styles.footerRight}>
              <Image src={verifyQrDataUrl} style={styles.qrImage} />
            </View>
          )}
          </View>
        </View>
      </Page>
    </Document>
  );
}
