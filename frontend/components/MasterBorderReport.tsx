/**
 * MasterBorderReport — vector PDF template rendered by @react-pdf/renderer.
 *
 * Structure:
 *   Page 1+: Header (round logo badge + product meta), Executive Summary,
 *            Country Reports (each card stays on one page)
 *   Page N:  Regulatory Sources (separate <Page> so no break-wrap issues)
 *
 * The logo is a circular SVG medallion served from /masterborder-logo.svg,
 * embedded via @react-pdf's <Image>. All text uses built-in PDF fonts
 * (Helvetica / Helvetica-Bold / Courier-Bold) — no registration needed.
 */

import {
  Document,
  Image,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { registerPdfFonts, fontFor } from "@/lib/pdf-fonts";

import type {
  AnalysisResponse,
  ComplianceFinding,
  CountryCode,
  CountryReport,
  RiskLevel,
} from "@/lib/types";

type RiskPalette = { bg: string; border: string; text: string };

registerPdfFonts();

const COUNTRY_PLAIN: Record<CountryCode, string> = {
  US: "United States",
  DE: "Germany",
  GB: "United Kingdom",
  TR: "Turkey",
  JP: "Japan",
};

const RISK_COLORS: Record<RiskLevel, RiskPalette> = {
  low:     { bg: "#f0fdf4", border: "#86efac", text: "#15803d" },
  medium:  { bg: "#fefce8", border: "#fde047", text: "#a16207" },
  high:    { bg: "#fff7ed", border: "#fdba74", text: "#c2410c" },
  blocked: { bg: "#fef2f2", border: "#fca5a5", text: "#b91c1c" },
};

const RISK_LABEL: Record<RiskLevel, string> = {
  low: "LOW",
  medium: "MEDIUM",
  high: "HIGH",
  blocked: "BLOCKED",
};

const LOGO_URL =
  typeof window !== "undefined"
    ? `${window.location.origin}/masterborder-logo.svg`
    : "/masterborder-logo.svg";

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingHorizontal: 40,
    paddingBottom: 28,
    fontSize: 10,
    fontFamily: "Noto Sans",
    color: "#0a0a0a",
    lineHeight: 1.45,
  },

  // Header row: left = product info, right = circular logo + metadata
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#0a0a0a",
  },
  headerLeft: {
    flex: 1,
    paddingRight: 20,
    paddingTop: 8,
  },
  brand: {
    fontSize: 8,
    fontFamily: "Noto Sans",
    letterSpacing: 0.8,
    color: "#737373",
    marginBottom: 6,
  },
  productName: {
    fontSize: 22,
    fontFamily: "Noto Sans",
    marginBottom: 8,
    textTransform: "capitalize",
    lineHeight: 1.15,
  },
  meta: { fontSize: 9, color: "#525252", lineHeight: 1.6 },
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
    fontFamily: "Noto Sans",
  },
  reportIdValue: {
    fontSize: 8,
    lineHeight: 1,
    fontFamily: "Courier-Bold",
    color: "#1e40af",
  },

  // Right-side circular badge block
  badgeBlock: {
    alignItems: "center",
    width: 120,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  badgeDivider: {
    width: 60,
    height: 1,
    backgroundColor: "#d4d4d4",
    marginVertical: 4,
  },
  badgeLabel: {
    fontSize: 6,
    color: "#737373",
    letterSpacing: 0.5,
    textAlign: "center",
  },
  badgeValue: {
    fontSize: 8,
    fontFamily: "Noto Sans",
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

  // Section headings
  sectionHeading: {
    fontSize: 13,
    fontFamily: "Noto Sans",
    marginTop: 12,
    marginBottom: 6,
  },

  // Summary rendering
  summaryParagraph: {
    fontSize: 10,
    marginBottom: 7,
    textAlign: "justify",
    lineHeight: 1.5,
  },
  summaryBullet: {
    fontSize: 9.5,
    marginBottom: 4,
    paddingLeft: 14,
    lineHeight: 1.45,
  },
  summaryListHeading: {
    fontSize: 10.5,
    fontFamily: "Noto Sans",
    marginTop: 8,
    marginBottom: 4,
  },

  // Country cards
  countryCard: {
    borderWidth: 1,
    borderColor: "#d4d4d4",
    borderRadius: 4,
    padding: 12,
    marginBottom: 10,
  },
  countryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  countryName: { fontSize: 14, fontFamily: "Noto Sans" },
  countryMeta: { fontSize: 8, color: "#525252", marginTop: 2 },
  riskPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 8,
    fontFamily: "Noto Sans",
  },

  // Findings
  findingsLabel: {
    fontSize: 9,
    fontFamily: "Noto Sans",
    marginBottom: 4,
    color: "#404040",
  },
  finding: {
    borderWidth: 1,
    borderRadius: 3,
    padding: 6,
    marginBottom: 4,
  },
  findingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  findingTitle: {
    fontSize: 9,
    fontFamily: "Noto Sans",
    flex: 1,
    paddingRight: 6,
  },
  findingCategory: { fontSize: 7, color: "#737373" },
  findingRisk: {
    fontSize: 7,
    fontFamily: "Noto Sans",
    letterSpacing: 0.5,
  },
  findingDetail: { fontSize: 8.5, marginTop: 2, color: "#262626" },
  footnoteMarker: {
    fontSize: 7,
    fontFamily: "Noto Sans",
    color: "#1d4ed8",
  },

  // Recommended actions
  actionsLabel: {
    fontSize: 9,
    fontFamily: "Noto Sans",
    marginTop: 8,
    marginBottom: 4,
    color: "#404040",
  },
  action: {
    fontSize: 8.5,
    marginBottom: 2,
    color: "#262626",
    paddingLeft: 10,
  },

  // Sources page header (simpler, no big product banner)
  sourcesHeader: {
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: "#0a0a0a",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  sourcesHeaderLogo: { width: 36, height: 36 },
  sourcesHeaderTitle: {
    fontSize: 16,
    fontFamily: "Noto Sans",
  },
  sourcesHeaderSubtitle: {
    fontSize: 8,
    color: "#737373",
    marginTop: 2,
  },

  sourcesIntro: {
    fontSize: 9,
    color: "#525252",
    marginBottom: 12,
    fontStyle: "italic",
  },
  sourceItem: {
    marginBottom: 8,
    paddingLeft: 20,
    position: "relative",
  },
  sourceNumber: {
    position: "absolute",
    left: 0,
    top: 1,
    width: 18,
    fontSize: 8,
    fontFamily: "Noto Sans",
    color: "#1d4ed8",
  },
  sourceContext: {
    fontSize: 7.5,
    color: "#737373",
    marginBottom: 1,
  },
  sourceCitation: {
    fontSize: 9,
    fontFamily: "Noto Sans",
    color: "#0a0a0a",
    marginBottom: 1,
  },
  sourceUrl: {
    fontSize: 8,
    color: "#1d4ed8",
    textDecoration: "underline",
  },

  // Footer — in-flow with marginTop:auto so it sticks to the bottom
  // naturally, and fixed={true} makes it repeat on every page.
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
    fontFamily: "Noto Sans",
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
  footerMeta: {
    fontSize: 6,
    color: "#a3a3a3",
  },
  footerRight: {
    alignItems: "flex-end",
  },
  footerQRLabel: {
    fontSize: 5.5,
    color: "#737373",
    textAlign: "center",
    marginBottom: 2,
    letterSpacing: 0.3,
  },
  qrImage: { width: 44, height: 44 },
});

interface Footnote {
  index: number;
  country: CountryCode;
  title: string;
  citation: string;
  url: string | null;
}

function collectFootnotes(data: AnalysisResponse): {
  footnotes: Footnote[];
  byFindingKey: Map<string, number>;
} {
  const footnotes: Footnote[] = [];
  const byFindingKey = new Map<string, number>();
  let counter = 1;

  for (const report of data.country_reports) {
    report.findings.forEach((f, i) => {
      if (f.citation && f.citation.trim()) {
        footnotes.push({
          index: counter,
          country: report.country,
          title: f.title,
          citation: f.citation.trim(),
          url: f.source_url?.trim() || null,
        });
        byFindingKey.set(`${report.country}|${i}`, counter);
        counter++;
      }
    });
  }

  return { footnotes, byFindingKey };
}

type SummaryBlock =
  | { kind: "heading"; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "bullet"; text: string };

function parseSummary(markdown: string): SummaryBlock[] {
  const blocks: SummaryBlock[] = [];
  // Strip emoji & non-BMP characters that Helvetica can't render
  // (they show up as <ú<ø / =Å / >ê garbage in the PDF).
  const stripEmoji = (s: string) =>
    s
      .replace(/[\u{1F300}-\u{1FAFF}]/gu, "")
      .replace(/[\u{1F000}-\u{1F2FF}]/gu, "")
      .replace(/[\u{2600}-\u{27BF}]/gu, "")
      .replace(/[\u{1F1E6}-\u{1F1FF}]/gu, "")
      .replace(/[\u200B-\u200D\uFEFF\uFE0F]/g, "")
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

    if (/^#{1,6}\s/.test(line)) {
      blocks.push({
        kind: "heading",
        text: line.replace(/^#{1,6}\s+/, "").trim(),
      });
      continue;
    }

    const bulletMatch = line.match(/^[-*•]\s+(.*)$/);
    if (bulletMatch) {
      blocks.push({ kind: "bullet", text: bulletMatch[1].trim() });
      continue;
    }

    const numMatch = line.match(/^\d+\.\s+(.*)$/);
    if (numMatch) {
      blocks.push({ kind: "bullet", text: numMatch[1].trim() });
      continue;
    }

    const isLikelyHeading =
      line.length < 60 &&
      (/^[0-9]+\.\s/.test(line) || line.endsWith(":")) &&
      !line.includes(".");
    if (isLikelyHeading) {
      blocks.push({ kind: "heading", text: line.replace(/:$/, "") });
      continue;
    }

    blocks.push({ kind: "paragraph", text: line });
  }

  return blocks;
}

interface Props {
  data: AnalysisResponse;
  verifyQrDataUrl?: string;
  verifyUrl?: string;
}

export function MasterBorderReport({
  data,
  verifyQrDataUrl,
  verifyUrl,
}: Props) {
  const { product, target_countries } = data.request;
  const reportDate = new Date(data.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const shortId = data.job_id.slice(0, 8).toUpperCase();

  const summaryBlocks = data.summary ? parseSummary(data.summary) : [];
  const firstCountry = data.country_reports[0];
  const restCountries = data.country_reports.slice(1);
  const { footnotes, byFindingKey } = collectFootnotes(data);

  return (
    <Document
      title={`MasterBorder - ${product.name}`}
      author="MasterBorder"
      subject="Cross-border trade compliance analysis"
    >
      {/* ───── Main Page(s) ───── */}
      <Page size="A4" style={styles.page}>
        {/* Header: product info + circular badge */}
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Text style={styles.brand}>
              MASTERBORDER  ·  COMPLIANCE REPORT
            </Text>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.meta}>
              Origin: {COUNTRY_PLAIN[product.origin_country]}
              {"\n"}
              Markets: {target_countries.map((c) => COUNTRY_PLAIN[c]).join(", ")}
            </Text>
            <View style={styles.reportIdRow}>
              <Text style={styles.reportIdLabel}>REPORT ID</Text>
              <Text style={styles.reportIdValue}>{shortId}</Text>
            </View>
          </View>

          <View style={styles.badgeBlock}>
            <Image src={LOGO_URL} style={styles.logo} />
            <Text style={styles.badgeLabel}>ISSUED</Text>
            <Text style={styles.badgeValue}>{reportDate}</Text>
          </View>
        </View>

        {/* Executive Summary */}
        {summaryBlocks.length > 0 && (
          <>
            <Text style={styles.sectionHeading}>Executive Summary</Text>
            {summaryBlocks.map((block, i) => {
              if (block.kind === "heading") {
                return (
                  <Text key={i} style={styles.summaryListHeading}>
                    {block.text}
                  </Text>
                );
              }
              if (block.kind === "bullet") {
                return (
                  <Text key={i} style={styles.summaryBullet}>
                    • {block.text}
                  </Text>
                );
              }
              return (
                <Text key={i} style={styles.summaryParagraph}>
                  {block.text}
                </Text>
              );
            })}
          </>
        )}

        {/* Country Reports — heading on its own (no wrap=false),
            each card handles its own wrap internally. This avoids
            the "View bigger than page height" wrap error when the
            combined heading+card would overflow a page. */}
        {firstCountry && (
          <>
            <Text style={styles.sectionHeading}>Country Reports</Text>
            <CountryCardPdf
              report={firstCountry}
              footnoteOf={(i) =>
                byFindingKey.get(`${firstCountry.country}|${i}`)
              }
            />
          </>
        )}
        {restCountries.map((report) => (
          <CountryCardPdf
            key={report.country}
            report={report}
            footnoteOf={(i) => byFindingKey.get(`${report.country}|${i}`)}
          />
        ))}

{/* Footer (repeated on every page of this <Page> flow) */}
        <FixedFooter
          shortId={shortId}
          verifyQrDataUrl={verifyQrDataUrl}
          verifyUrl={verifyUrl}
        />
      </Page>

      {/* ───── Regulatory Sources Page (separate <Page> ─ no break-wrap issue) ───── */}
      {footnotes.length > 0 && (
        <Page size="A4" style={styles.page}>
          <View style={styles.sourcesHeader}>
            <Image src={LOGO_URL} style={styles.sourcesHeaderLogo} />
            <View>
              <Text style={styles.sourcesHeaderTitle}>
                Regulatory Sources
              </Text>
              <Text style={styles.sourcesHeaderSubtitle}>
                {footnotes.length} primary references cited in this report
                · Report {shortId}
              </Text>
            </View>
          </View>

          <Text style={styles.sourcesIntro}>
            Numbers in square brackets throughout this report correspond to
            the entries below. Citation strings identify the authoritative
            regulation, statute, or official guidance. URLs point to primary
            sources when available.
          </Text>

          {footnotes.map((fn) => (
            <View key={fn.index} style={styles.sourceItem} wrap={false}>
              <Text style={styles.sourceNumber}>[{fn.index}]</Text>
              <Text style={styles.sourceContext}>
                {COUNTRY_PLAIN[fn.country]} — {fn.title}
              </Text>
              <Text style={styles.sourceCitation}>{fn.citation}</Text>
              {fn.url && (
                <Link src={fn.url} style={styles.sourceUrl}>
                  {shortenUrl(fn.url)}
                </Link>
              )}
            </View>
          ))}

<FixedFooter
            shortId={shortId}
            verifyQrDataUrl={verifyQrDataUrl}
            verifyUrl={verifyUrl}
          />
        </Page>
      )}
    </Document>
  );
}

function FixedFooter({
  shortId,
  verifyQrDataUrl,
  verifyUrl,
}: {
  shortId: string;
  verifyQrDataUrl?: string;
  verifyUrl?: string;
}) {
  return (
    <View style={styles.footerWrapper} fixed>
    <View style={styles.footer}>
      <View style={styles.footerLeft}>
        <Text style={styles.footerBrand}>MasterBorder · Compliance Report</Text>
        {verifyUrl && (
          <Text style={styles.footerUrl}>{verifyUrl}</Text>
        )}
        <Text style={styles.footerAuthor}>
          Built with Opus 4.7: a Claude Code hackathon, April 2026 — Generated by MasterBorder — github.com/durasi
        </Text>
        <Text
          style={styles.footerMeta}
          render={({ pageNumber, totalPages }) =>
            `Report ${shortId}  ·  Page ${pageNumber} of ${totalPages}  ·  Built with Opus 4.7`
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
  );
}

function CountryCardPdf({
  report,
  footnoteOf,
}: {
  report: CountryReport;
  footnoteOf: (findingIndex: number) => number | undefined;
}) {
  const risk = RISK_COLORS[report.overall_risk];

  // NOTE: outer View allows wrapping — a full country card can be taller
  // than one page (7 findings + 8 actions + heading). Individual finding
  // rows keep wrap={false} so they don't get split mid-row.
  return (
    <View style={styles.countryCard}>
      <View style={styles.countryHeader}>
        <View>
          <Text style={styles.countryName}>
            {COUNTRY_PLAIN[report.country]}
          </Text>
          <Text style={styles.countryMeta}>
            {report.hs_code ? `HS: ${report.hs_code}` : "HS: unspecified"}
            {report.tariff_rate !== null && report.tariff_rate !== undefined
              ? `  ·  Tariff: ${(report.tariff_rate * 100).toFixed(1)}%`
              : ""}
          </Text>
        </View>
        <Text
          style={[
            styles.riskPill,
            {
              backgroundColor: risk.bg,
              borderColor: risk.border,
              color: risk.text,
            },
          ]}
        >
          {RISK_LABEL[report.overall_risk]} RISK
        </Text>
      </View>

      {report.findings.length > 0 && (
        <>
          <Text style={styles.findingsLabel}>
            Compliance Findings ({report.findings.length})
          </Text>
          {report.findings.map((f, i) => (
            <FindingPdf
              key={i}
              finding={f}
              footnoteNumber={footnoteOf(i)}
            />
          ))}
        </>
      )}

      {report.recommended_actions.length > 0 && (
        <>
          <Text style={styles.actionsLabel}>Recommended Actions</Text>
          {report.recommended_actions.map((a, i) => (
            <Text key={i} style={styles.action}>
              {i + 1}. {a}
            </Text>
          ))}
        </>
      )}
    </View>
  );
}

function FindingPdf({
  finding,
  footnoteNumber,
}: {
  finding: ComplianceFinding;
  footnoteNumber: number | undefined;
}) {
  const risk = RISK_COLORS[finding.risk_level];
  return (
    <View
      style={[
        styles.finding,
        { backgroundColor: risk.bg, borderColor: risk.border },
      ]}
      wrap={false}
    >
      <View style={styles.findingHeader}>
        <Text style={styles.findingTitle}>
          {finding.title}
          <Text style={styles.findingCategory}>  ·  {finding.category}</Text>
        </Text>
        <Text style={[styles.findingRisk, { color: risk.text }]}>
          {RISK_LABEL[finding.risk_level]}
        </Text>
      </View>
      <Text style={styles.findingDetail}>
        {finding.detail}
        {footnoteNumber !== undefined && (
          <Text style={styles.footnoteMarker}> [{footnoteNumber}]</Text>
        )}
      </Text>
    </View>
  );
}

function shortenUrl(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
