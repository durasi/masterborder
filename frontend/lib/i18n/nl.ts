import type { Translations } from "./en";

export const nl: Translations = {
  locale: "nl",
  dir: "ltr",
  languageName: "Nederlands",
  flag: "🇳🇱",

  hero: {
    livePill: "Live · Gebouwd met Opus 4.7",
    titleLine1: "Export over grenzen,",
    titleLine2: "zonder giswerk",
    subtitle: "Tarieven, sancties, etiketteringsregels en controles op dwangarbeid voor elke doelmarkt — geharmoniseerd in één rapport, met officiële bronverwijzingen en een interactieve deep-dive-agent.",
  },

  features: {
    parallelTitle: "Parallelle agenten",
    parallelBody: "Eén Opus 4.7-agent per doelmarkt, gelijktijdig verzonden. Vijf markten in ~25 seconden.",
    citationsTitle: "Regelgevingsverwijzingen",
    citationsBody: "Elke bevinding verwijst naar een primaire bron — HTS-code, CFR-sectie, EU-verordeningnummer of officiële URL.",
    deepDiveTitle: "Interactieve deep-dive",
    deepDiveBody: "Kies een land en stel vervolgvragen. De agent behoudt volledige context over alle beurten.",
  },

  form: {
    cardTitle: "Product analyseren",
    cardDescription: "Voer productgegevens in en kies doelmarkten, of probeer een voorbeeld.",
    trySample: "Probeer voorbeeld",
    productNameLabel: "Productnaam",
    productNamePlaceholder: "bv. leren portemonnee",
    descriptionLabel: "Beschrijving",
    descriptionPlaceholder: "Materialen, verwerking, behandeling (bv. 'Echt runderleer, chroomgelooid, handgemaakt')",
    categoryLabel: "Categorie",
    categoryOptional: "(optioneel)",
    categoryPlaceholder: "bv. accessoires",
    valueLabel: "Waarde per eenheid (USD)",
    valuePlaceholder: "45.00",
    originLabel: "Land van herkomst",
    targetLabel: "Doellanden",
    targetHint: "Kies één of meer markten om te analyseren",
    routeRiskTitle: "Route-risicoanalyse meenemen",
    routeRiskBody: "Houdt rekening met actieve conflictzones, zeeëngteonderbrekingen en scheepvaartrisico's (aanbevolen).",
    analyzeButton: "Analyseer",
    analyzingMarket: "Parallelle analyse van {count} markt…",
    analyzingMarkets: "Parallelle analyse van {count} markten…",
    dispatchingHint: "Opus 4.7 verzendt land-agenten parallel. Neemt meestal 25-35 seconden.",
    errorMissing: "Voer productnaam en beschrijving in.",
    errorNoCountry: "Selecteer minstens één doelland.",
    errorGeneric: "Analyse mislukt. Probeer opnieuw.",
    errorRateLimit: "Daglimiet bereikt. Probeer opnieuw na 24 uur.",
  },

  results: {
    backToAnalysis: "← Nieuwe analyse",
    analyzedFor: "Geanalyseerd voor",
    origin: "Oorsprong:",
    executiveSummary: "Samenvatting",
    executiveSummaryDescription: "Geharmoniseerde analyse over {count} markten · Human-in-the-loop aanbeveling",
    countryReports: "Landenrapporten",
    complianceFindings: "Nalevingsbevindingen",
    recommendedActions: "Aanbevolen acties",
    deepDive: "Deep-dive in {country}",
    downloadPdf: "PDF downloaden",
    jobId: "Taak-ID:",
    notFound: "Analyse niet gevonden. Mogelijk verlopen — start een nieuwe analyse.",
    loading: "Analyse laden…",
  },

  deepDive: {
    backToResults: "← Terug naar resultaten",
    subtitle: "Interactieve deep-dive compliance · {country}",
    placeholder: "Stel een vervolgvraag (bv. vrachtopties, laboratorium, tijdlijn)…",
    send: "Verzenden",
    downloadPdf: "PDF downloaden",
    thinking: "Aan het nadenken…",
    errorSend: "Kan bericht niet verzenden.",
  },

  risk: {
    low: "Laag",
    medium: "Gemiddeld",
    high: "Hoog",
    blocked: "Geblokkeerd",
    suffix: "risico",
  },

  footer: {
    license: "MIT-licentie · Gebouwd met Claude Code + Opus 4.7 · De agent stelt voor, jij beslist.",
    servedAnalyses: "{analyses} {analysesNoun} geleverd aan {users} {usersNoun}",
    analysesSingular: "analyse",
    analysesPlural: "analyses",
    usersSingular: "unieke gebruiker",
    usersPlural: "unieke gebruikers",
    todaySuffix: "vandaag",
    topMarket: "meest geanalyseerde markt:",
  },

  nav: {
    languageLabel: "Taal",
  },
};
