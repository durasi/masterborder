// English (en) — base dictionary. Every other locale mirrors these keys.

export const en = {
  locale: "en",
  dir: "ltr",
  languageName: "English",
  flag: "🇺🇸",

  hero: {
    livePill: "Live · Built with Opus 4.7",
    titleLine1: "Ship across borders,",
    titleLine2: "without the guesswork",
    subtitle:
      "Tariffs, sanctions, labeling rules, and forced-labor checks for every target market — harmonized into one report, with official citations and an interactive deep-dive agent.",
  },

  features: {
    parallelTitle: "Parallel agents",
    parallelBody:
      "One Opus 4.7 agent per target market, dispatched concurrently. Five markets in ~25 seconds.",
    citationsTitle: "Regulatory citations",
    citationsBody:
      "Every finding cites a primary source — HTS code, CFR section, EU regulation number, or official URL.",
    deepDiveTitle: "Interactive deep-dive",
    deepDiveBody:
      "Pick a country and ask follow-up questions. The agent keeps full context across turns.",
  },

  form: {
    cardTitle: "Analyze a product",
    cardDescription:
      "Enter your product details and pick target markets, or try a sample to see what the output looks like.",
    trySample: "Try sample",
    sampleProductName: "Leather Wallet",
    sampleProductDescription: "Genuine cowhide bifold wallet, chrome-tanned, 4 card slots and coin pocket. Handcrafted in Istanbul.",
    quantityLabel: "Quantity",
    quantityPlaceholder: "e.g., 50",
    unitLabel: "Unit",
    unitPieces: "pieces",
    unitKg: "kg",
    unitGrams: "grams",
    unitLiters: "liters",
    unitMeters: "meters",
    unitSqm: "m²",
    unitPairs: "pairs",
    unitDozens: "dozens",
    unitBoxes: "boxes",
    unitTons: "tons",
    unitPounds: "pounds (lbs)",
    unitOunces: "ounces (oz)",
    unitGallons: "gallons (US)",
    unitFeet: "feet (ft)",
    unitInches: "inches (in)",
    unitCubicFeet: "cubic feet (ft³)",
    productNameLabel: "Product name",
    productNamePlaceholder: "e.g., leather wallet",
    descriptionLabel: "Description",
    descriptionPlaceholder:
      "Materials, craftsmanship, treatment, etc. (e.g., 'Genuine cowhide, chrome-tanned, handcrafted')",
    categoryLabel: "Category",
    categoryOptional: "(optional)",
    categoryPlaceholder: "e.g., accessories",
    valueLabel: "Value per unit (USD)",
    valuePlaceholder: "45.00",
    originLabel: "Origin country",
    targetLabel: "Target countries",
    targetHint: "Pick one or more markets to analyze",
    routeRiskTitle: "Include route risk analysis",
    routeRiskBody:
      "Consider active conflict zones, strait disruptions, and shipping lane risks (recommended).",
    analyzeButton: "Analyze",
    analyzingMarket: "Analyzing {count} market in parallel…",
    analyzingMarkets: "Analyzing {count} markets in parallel…",
    dispatchingHint:
      "Opus 4.7 is dispatching Country Agents in parallel. This typically takes 25–35 seconds.",
    progressStep1: "Dispatching Country Agents…",
    progressStep2: "Checking tariffs and HS codes…",
    progressStep3: "Reviewing sanctions lists…",
    progressStep4: "Analyzing labeling and packaging rules…",
    progressStep5: "Cross-referencing regulations…",
    progressStep6: "Harmonizing results…",
    errorMissing: "Please enter both a product name and description.",
    errorNoCountry: "Select at least one target country.",
    errorGeneric: "Analysis failed. Please try again.",
    errorRateLimit: "Daily limit reached. Please try again in 24 hours.",
  },

  results: {
    backToAnalysis: "← New analysis",
    analyzedFor: "Analyzed for",
    origin: "Origin:",
    executiveSummary: "Executive Summary",
    executiveSummaryDescription:
      "Harmonized analysis across {count} markets · Human-in-the-loop recommendation",
    countryReports: "Country Reports",
    complianceFindings: "Compliance Findings",
    recommendedActions: "Recommended Actions",
    deepDive: "Deep dive into {country}",
    downloadPdf: "Download PDF",
    jobId: "Job ID:",
    notFound: "Analysis not found. It may have expired — please run a new analysis.",
    loading: "Loading analysis…",
  },

  deepDive: {
    backToResults: "← Back to results",
    subtitle: "Interactive compliance deep-dive · {country}",
    placeholder: "Ask a follow-up question (e.g., freight options, lab selection, timeline)…",
    send: "Send",
    downloadPdf: "Download PDF",
    thinking: "Thinking…",
    errorSend: "Couldn't send message. Please try again.",
  },

  risk: {
    low: "Low",
    medium: "Medium",
    high: "High",
    blocked: "Blocked",
    suffix: "risk",
  },

  footer: {
    license: "MIT licensed · Built with Claude Code + Opus 4.7 · The agent proposes, you decide.",
    servedAnalyses: "Served {analyses} {analysesNoun} for {users} {usersNoun}",
    analysesSingular: "analysis",
    analysesPlural: "analyses",
    usersSingular: "unique user",
    usersPlural: "unique users",
    todaySuffix: "today",
    topMarket: "most-analyzed market:",
  },

  nav: {
    languageLabel: "Language",
  },
  countries: {
    US: "United States",
    DE: "Germany",
    GB: "United Kingdom",
    TR: "Türkiye",
    JP: "Japan",
  },
  pdf: {
    downloadPdf: "Download PDF",
    generatingPdf: "Generating PDF…",
    pdfReady: "PDF ready",
  },
  deepDiveCta: {
    headline: "Go deeper into this market",
    body: "Week-by-week go-to-market plan — documents, test labs, cost estimates, timelines. Powered by Opus 4.7.",
    button: "Start deep-dive",
  },

  roi: {
    headline: "This analysis saved you {savings} and ~{days} days",
    masterborderLabel: "MasterBorder",
    brokerLabel: "Traditional broker",
    vs: "vs",
    lowerCost: "lower cost",
    faster: "faster",
    disclaimer: "Broker benchmark: industry-typical $500–$2,000 / 5–15 days per shipment.",
  },

  telemetry: {
    headline: "Live agent telemetry",
    elapsed: "Elapsed",
    progress: "Progress",
    tokensSoFar: "tokens so far",
    tokensAbbr: "tokens",
    queued: "queued",
    risk: "Risk",
    failed: "failed",
    harmonizer: "Harmonizer Agent",
    waiting: "waiting for agents",
    synthesizing: "synthesizing executive summary…",
    done: "done",
  },

};

export type Translations = {
  locale: string;
  dir: string;
  languageName: string;
  flag: string;
  hero: {
    livePill: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
  };
  features: {
    parallelTitle: string;
    parallelBody: string;
    citationsTitle: string;
    citationsBody: string;
    deepDiveTitle: string;
    deepDiveBody: string;
  };
  form: {
    cardTitle: string;
    cardDescription: string;
    trySample: string;
    sampleProductName: string;
    sampleProductDescription: string;
    quantityLabel: string;
    quantityPlaceholder: string;
    unitLabel: string;
    unitPieces: string;
    unitKg: string;
    unitGrams: string;
    unitLiters: string;
    unitMeters: string;
    unitSqm: string;
    unitPairs: string;
    unitDozens: string;
    unitBoxes: string;
    unitTons: string;
    unitPounds: string;
    unitOunces: string;
    unitGallons: string;
    unitFeet: string;
    unitInches: string;
    unitCubicFeet: string;
    productNameLabel: string;
    productNamePlaceholder: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    categoryLabel: string;
    categoryOptional: string;
    categoryPlaceholder: string;
    valueLabel: string;
    valuePlaceholder: string;
    originLabel: string;
    targetLabel: string;
    targetHint: string;
    routeRiskTitle: string;
    routeRiskBody: string;
    analyzeButton: string;
    analyzingMarket: string;
    analyzingMarkets: string;
    dispatchingHint: string;
    progressStep1: string;
    progressStep2: string;
    progressStep3: string;
    progressStep4: string;
    progressStep5: string;
    progressStep6: string;
    errorMissing: string;
    errorNoCountry: string;
    errorGeneric: string;
    errorRateLimit: string;
  };
  results: {
    backToAnalysis: string;
    analyzedFor: string;
    origin: string;
    executiveSummary: string;
    executiveSummaryDescription: string;
    countryReports: string;
    complianceFindings: string;
    recommendedActions: string;
    deepDive: string;
    downloadPdf: string;
    jobId: string;
    notFound: string;
    loading: string;
  };
  deepDive: {
    backToResults: string;
    subtitle: string;
    placeholder: string;
    send: string;
    downloadPdf: string;
    thinking: string;
    errorSend: string;
  };
  risk: {
    low: string;
    medium: string;
    high: string;
    blocked: string;
    suffix: string;
  };
  footer: {
    license: string;
    servedAnalyses: string;
    analysesSingular: string;
    analysesPlural: string;
    usersSingular: string;
    usersPlural: string;
    todaySuffix: string;
    topMarket: string;
  };
  nav: {
    languageLabel: string;
  };
  countries: {
    US: string;
    DE: string;
    GB: string;
    TR: string;
    JP: string;
  };
  pdf: {
    downloadPdf: string;
    generatingPdf: string;
    pdfReady: string;
  };
  deepDiveCta: {
    headline: string;
    body: string;
    button: string;
  };

  roi: {
    headline: string;
    masterborderLabel: string;
    brokerLabel: string;
    vs: string;
    lowerCost: string;
    faster: string;
    disclaimer: string;
  };

  telemetry: {
    headline: string;
    elapsed: string;
    progress: string;
    tokensSoFar: string;
    tokensAbbr: string;
    queued: string;
    risk: string;
    failed: string;
    harmonizer: string;
    waiting: string;
    synthesizing: string;
    done: string;
  };

};
