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
      "Turn a product description into an export-ready compliance report for up to 5 markets — in under a minute, for less than a cent.",
  },

  features: {
    eyebrow: "What's inside",
    heading: "A full compliance workbench, purpose-built for global sellers.",
    sub: "Every analysis draws on fifteen capabilities working in concert — from parallel agents to verifiable PDF exports.",
    category: {
      core: "Core",
      compliance: "Compliance",
      shipping: "Shipping",
      experience: "Experience",
      reach: "Reach",
    },
    items: {
      parallel: {
        title: "Parallel country agents",
        body: "One agent per destination fires simultaneously. 5× speedup over sequential review — 60 seconds for work that used to take days.",
      },
      harmonizer: {
        title: "End-to-end harmonizer",
        body: "A dedicated agent synthesizes all country reports into a single executive summary with routing, ranking and concrete next steps.",
      },
      thinking: {
        title: "Adaptive extended thinking",
        body: "Opus 4.7 decides when deep reasoning is warranted — so tough trade-offs get the compute they need, easy ones don't waste tokens.",
      },
      citations: {
        title: "Regulatory citations",
        body: "Every finding links back to a primary source — 19 CFR, EU regulations, MoHAP, ESMA, JIS — verifiable by any reviewer.",
      },
      geopolitics: {
        title: "Live geopolitics awareness",
        body: "Red Sea disruption, Hormuz premiums, Russian airspace, Belt & Road rail, UAE transit hubs — all baked into every recommendation.",
      },
      ranking: {
        title: "Multi-criteria ranking",
        body: "Landed cost (0.40), time-to-market (0.35), compliance risk (0.25). The math is shown, not hidden — you can trust or challenge it.",
      },
      routes: {
        title: "Route recommendations",
        body: "Primary and backup routes across air, sea, rail and TIR — with transit time and indicative cost bands for every destination.",
      },
      checklist: {
        title: "Per-route document checklist",
        body: "A.TR, B/L, AWB, CMR, REACH test reports, UKCA / CE / JIS / ESMA declarations, OFAC/BIS screening records — nothing forgotten.",
      },
      landedCost: {
        title: "Landed cost estimates",
        body: "FOB, freight, insurance, duty, compliance overhead — broken down per country so you know exactly where the money goes.",
      },
      deepDive: {
        title: "Interactive deep-dive",
        body: "Ask follow-up questions per country. Each session retains full regulatory context so answers stay grounded, never generic.",
      },
      telemetry: {
        title: "Live telemetry overlay",
        body: "Server-sent events stream each agent's progress — country flag, elapsed seconds, tokens consumed, risk level — as it happens.",
      },
      humanLoop: {
        title: "Human in the loop",
        body: "Claude proposes. You decide. Every recommendation is framed as an option with trade-offs, never a black-box verdict.",
      },
      languages: {
        title: "16-language support",
        body: "Full UI, analysis output, and PDF rendering across 16 languages — including CJK, Arabic and Devanagari with proper font shaping.",
      },
      pdf: {
        title: "Verifiable PDF export",
        body: "One click produces a professional report with QR verification, full regulatory sources section and beautifully-typeset typography.",
      },
      costTransparency: {
        title: "Cost transparency",
        body: "Every run shows real token usage and dollar cost — no hidden markup, no mystery pricing, just honest usage receipts.",
      },
    },
  },

  metrics: {
    perAnalysis: "per analysis",
    perRun: "per run",
    parallelAgents: "parallel agents",
    languages: "languages",
  },

  howItWorks: {
    eyebrow: "How it works",
    heading: "Cross-border trade has 100+ rules per product. We surface them in 60 seconds.",
    sub: "A short tour of what happens between hitting \"Analyze\" and getting a signed, verifiable report.",
    contextHeading: "Why cross-border compliance is hard today",
    contextP1: "Every product crossing a border faces a tangle of regulations: tariffs, HS classification, sanctions screening, labeling rules, REACH/RoHS chemical limits, packaging laws, forced-labor attestations, and import licenses. A missing REACH test report will hold a container at Hamburg for weeks. A wrong HS code at US Customs can mean 25% duty instead of 8%.",
    contextP2: "Traditional customs brokers charge $500–$2,000 per shipment and take 5–15 days per market. For a seller targeting five countries, that's weeks of coordination and five figures in fees — before a single box is packed.",
    pipelineHeading: "The four-step pipeline",
    steps: {
      describe: {
        title: "Describe",
        body: "Product details, origin country, target markets. Natural language — no HS codes or customs terminology required.",
      },
      parallel: {
        title: "Parallel analysis",
        body: "N Opus 4.7 agents fire simultaneously — one per target market — each pulling its country's specific regulations, tariffs and sanctions lists.",
      },
      harmonize: {
        title: "Harmonize",
        body: "A harmonizer agent synthesizes all reports into a single executive summary with shipping routes, landed cost estimates and risk-ranked recommendations.",
      },
      deliver: {
        title: "Deliver",
        body: "Live report with interactive deep-dive chat, document checklist per route, and a verifiable PDF export — ready for counsel, broker or customer.",
      },
    },
    impactHeading: "Why this matters",
    impactLead: "Compliance isn't a paperwork problem — it's a market-access problem. Getting it wrong means gatekept from the world's biggest economies.",
    impacts: {
      smallExporter: {
        title: "Small exporters stay local",
        body: "A craftsperson in Turkey can't afford $1,500 × 5 markets to hire a broker for each destination. They sell only domestically and leave growth on the table.",
      },
      bigExporter: {
        title: "Big exporters burn weeks on coordination",
        body: "Five countries means five brokers, five email threads, five timelines. What should be a single decision becomes a month of operations work.",
      },
      mistakeCost: {
        title: "Every mistake is expensive",
        body: "A wrong HS code, a missing test report, a sanctions screening miss — each one means customs delays, fines, spoiled inventory, reputational damage.",
      },
      access: {
        title: "AI closes the gap",
        body: "Same analysis, $0.42 instead of $7,500. 60 seconds instead of weeks. Export expertise suddenly available to anyone with a product and an idea.",
      },
    },
    bottomLineLabel: "The bottom line:",
    bottomLine: "Opening a new market should be a decision, not a project. MasterBorder makes it one.",
  },

  form: {
    cardTitle: "Analyze a product",
    cardDescription:
      "Enter your product details and pick target markets, or try a sample to see what the output looks like.",
    trySample: "Try sample",
    seeExample: "See example",
    sampleProductName: "Leather Wallet",
    sampleProductDescription: "Genuine cowhide bifold wallet, chrome-tanned, 4 card slots and coin pocket. Handcrafted with traditional leatherworking techniques.",
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
    targetHint: "Pick one or more markets to analyze —",
    selectedLabel: "selected",
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
    backToAnalysis: "New analysis",
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
    backToResults: "Back to results",
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
    howItWorks: "How it works",
    example: "Example",
    github: "GitHub",
    trySample: "Try sample",
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

  example: {
    bannerTitle: "This is a pre-computed example analysis",
    bannerBody: "Real Opus 4.7 output from a live run — frozen here so you can see the product without burning API credits.",
    ctaRunYourOwn: "Run your own",
    deepDiveDisabled: "Deep-dive is disabled on examples — run your own analysis to chat with the agent.",
    footerNote: "Example analysis — pre-computed. Run your own from the home page to get a fresh, up-to-the-minute report.",
  },

  conflicts: {
    title: "Cross-market conflicts detected",
    subtitle: "Concrete disagreements between target markets you need to reconcile.",
    impactLabel: "Impact:",
    types: {
      hs_code: "HS code",
      labeling: "Labeling",
      certification: "Certification",
      documentation: "Documents",
      tariff: "Tariff",
      other: "Other",
    },
  },
  findings: {
    verify: "Verify",
    confidence: {
      high: "High confidence",
      medium: "Medium confidence",
      low: "Low confidence",
    },
    confidenceTooltip: {
      high: "Backed by an explicit regulatory citation or an authoritative source URL.",
      medium: "References an established practice or reputable secondary source.",
      low: "Best-effort inference without a cited authority — verify before acting.",
    },
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
    eyebrow: string;
    heading: string;
    sub: string;
    category: {
      core: string;
      compliance: string;
      shipping: string;
      experience: string;
      reach: string;
    };
    items: {
      parallel: { title: string; body: string };
      harmonizer: { title: string; body: string };
      thinking: { title: string; body: string };
      citations: { title: string; body: string };
      geopolitics: { title: string; body: string };
      ranking: { title: string; body: string };
      routes: { title: string; body: string };
      checklist: { title: string; body: string };
      landedCost: { title: string; body: string };
      deepDive: { title: string; body: string };
      telemetry: { title: string; body: string };
      humanLoop: { title: string; body: string };
      languages: { title: string; body: string };
      pdf: { title: string; body: string };
      costTransparency: { title: string; body: string };
    };
  };
  metrics: {
    perAnalysis: string;
    perRun: string;
    parallelAgents: string;
    languages: string;
  };
  howItWorks: {
    eyebrow: string;
    heading: string;
    sub: string;
    contextHeading: string;
    contextP1: string;
    contextP2: string;
    pipelineHeading: string;
    steps: {
      describe: { title: string; body: string };
      parallel: { title: string; body: string };
      harmonize: { title: string; body: string };
      deliver: { title: string; body: string };
    };
    impactHeading: string;
    impactLead: string;
    impacts: {
      smallExporter: { title: string; body: string };
      bigExporter: { title: string; body: string };
      mistakeCost: { title: string; body: string };
      access: { title: string; body: string };
    };
    bottomLineLabel: string;
    bottomLine: string;
  };
  form: {
    cardTitle: string;
    cardDescription: string;
    trySample: string;
    seeExample: string;
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
    selectedLabel: string;
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
    howItWorks: string;
    example: string;
    github: string;
    trySample: string;
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
  example: {
    bannerTitle: string;
    bannerBody: string;
    ctaRunYourOwn: string;
    deepDiveDisabled: string;
    footerNote: string;
  };

  conflicts: {
    title: string;
    subtitle: string;
    impactLabel: string;
    types: {
      hs_code: string;
      labeling: string;
      certification: string;
      documentation: string;
      tariff: string;
      other: string;
    };
  };

  findings: {
    verify: string;
    confidence: {
      high: string;
      medium: string;
      low: string;
    };
    confidenceTooltip: {
      high: string;
      medium: string;
      low: string;
    };
  };
};
