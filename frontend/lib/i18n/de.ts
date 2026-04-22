import type { Translations } from "./en";

export const de: Translations = {
  locale: "de",
  dir: "ltr",
  languageName: "Deutsch",
  flag: "🇩🇪",

  hero: {
    livePill: "Live · Entwickelt mit Opus 4.7",
    titleLine1: "Export über Grenzen,",
    titleLine2: "ohne Rätselraten",
    subtitle: "Zölle, Sanktionen, Kennzeichnungsvorschriften und Zwangsarbeits-Checks für jeden Zielmarkt — harmonisiert in einem Bericht, mit offiziellen Quellenangaben und einem interaktiven Deep-Dive-Agenten.",
  },

  features: {
    parallelTitle: "Parallele Agenten",
    parallelBody: "Ein Opus-4.7-Agent pro Zielmarkt, gleichzeitig versendet. Fünf Märkte in ~25 Sekunden.",
    citationsTitle: "Regulatorische Quellenangaben",
    citationsBody: "Jeder Befund zitiert eine Primärquelle — HTS-Code, CFR-Abschnitt, EU-Verordnungsnummer oder offizielle URL.",
    deepDiveTitle: "Interaktiver Deep-Dive",
    deepDiveBody: "Wählen Sie ein Land und stellen Sie Folgefragen. Der Agent behält den vollen Kontext über alle Runden.",
  },

  form: {
    cardTitle: "Produkt analysieren",
    cardDescription: "Produktdaten eingeben und Zielmärkte wählen oder ein Beispiel ausprobieren.",
    trySample: "Beispiel laden",
    productNameLabel: "Produktname",
    productNamePlaceholder: "z. B. Ledergeldbörse",
    descriptionLabel: "Beschreibung",
    descriptionPlaceholder: "Materialien, Verarbeitung, Behandlung (z. B. 'Echtes Rindsleder, chromgegerbt, handgefertigt')",
    categoryLabel: "Kategorie",
    categoryOptional: "(optional)",
    categoryPlaceholder: "z. B. Accessoires",
    valueLabel: "Preis pro Einheit (USD)",
    valuePlaceholder: "45.00",
    originLabel: "Ursprungsland",
    targetLabel: "Zielländer",
    targetHint: "Wählen Sie einen oder mehrere Märkte zur Analyse",
    routeRiskTitle: "Routenrisikoanalyse einbeziehen",
    routeRiskBody: "Berücksichtigt aktive Konfliktzonen, Meerengen-Störungen und Schifffahrtsrouten-Risiken (empfohlen).",
    analyzeButton: "Analysieren",
    analyzingMarket: "Analysiere {count} Markt parallel…",
    analyzingMarkets: "Analysiere {count} Märkte parallel…",
    dispatchingHint: "Opus 4.7 versendet die Länder-Agenten parallel. Dies dauert typischerweise 25–35 Sekunden.",
    errorMissing: "Bitte Produktname und Beschreibung eingeben.",
    errorNoCountry: "Mindestens ein Zielland auswählen.",
    errorGeneric: "Analyse fehlgeschlagen. Bitte erneut versuchen.",
    errorRateLimit: "Tageslimit erreicht. Bitte in 24 Stunden erneut versuchen.",
  },

  results: {
    backToAnalysis: "← Neue Analyse",
    analyzedFor: "Analysiert für",
    origin: "Herkunft:",
    executiveSummary: "Zusammenfassung",
    executiveSummaryDescription: "Harmonisierte Analyse über {count} Märkte · Human-in-the-Loop-Empfehlung",
    countryReports: "Länderberichte",
    complianceFindings: "Compliance-Befunde",
    recommendedActions: "Empfohlene Maßnahmen",
    deepDive: "Deep-Dive zu {country}",
    downloadPdf: "PDF herunterladen",
    jobId: "Job-ID:",
    notFound: "Analyse nicht gefunden. Möglicherweise abgelaufen — bitte neue Analyse starten.",
    loading: "Analyse wird geladen…",
  },

  deepDive: {
    backToResults: "← Zurück zu Ergebnissen",
    subtitle: "Interaktiver Compliance-Deep-Dive · {country}",
    placeholder: "Folgefrage stellen (z. B. Frachtoptionen, Laborauswahl, Zeitplan)…",
    send: "Senden",
    downloadPdf: "PDF herunterladen",
    thinking: "Denke nach…",
    errorSend: "Nachricht konnte nicht gesendet werden.",
  },

  risk: {
    low: "Niedrig",
    medium: "Mittel",
    high: "Hoch",
    blocked: "Blockiert",
    suffix: "Risiko",
  },

  footer: {
    license: "MIT-Lizenz · Entwickelt mit Claude Code + Opus 4.7 · Der Agent schlägt vor, Sie entscheiden.",
    servedAnalyses: "{analyses} {analysesNoun} für {users} {usersNoun} bereitgestellt",
    analysesSingular: "Analyse",
    analysesPlural: "Analysen",
    usersSingular: "einzigartiger Nutzer",
    usersPlural: "einzigartige Nutzer",
    todaySuffix: "heute",
    topMarket: "meistanalysierter Markt:",
  },

  nav: {
    languageLabel: "Sprache",
  },
};
