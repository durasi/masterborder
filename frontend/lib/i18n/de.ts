import type { Translations } from "./en";

export const de: Translations = {
  locale: "de",
  dir: "ltr",
  languageName: "Deutsch",
  flag: "🇩🇪",

  hero: {
    livePill: "Live · Entwickelt mit Opus 4.7",
    titleLine1: "Versenden Sie grenzüberschreitend,",
    titleLine2: "ohne zu raten",
    subtitle:
      "Verwandeln Sie eine Produktbeschreibung in einen exportfertigen Compliance-Bericht für bis zu 5 Märkte — in unter einer Minute, für weniger als einen Cent.",
  },

  features: {
    eyebrow: "Was drin ist",
    heading: "Ein vollständiger Compliance-Workbench, maßgeschneidert für globale Verkäufer.",
    sub: "Jede Analyse nutzt fünfzehn Fähigkeiten im Zusammenspiel — von parallelen Agenten bis zu verifizierbaren PDF-Exporten.",
    category: {
      core: "Kern",
      compliance: "Compliance",
      shipping: "Versand",
      experience: "Erlebnis",
      reach: "Reichweite",
    },
    items: {
      parallel: {
        title: "Parallele Länderagenten",
        body: "Ein Agent pro Zielmarkt läuft gleichzeitig. 5× Beschleunigung gegenüber sequenzieller Prüfung — 60 Sekunden für Arbeit, die früher Tage dauerte.",
      },
      harmonizer: {
        title: "End-to-End-Harmonizer",
        body: "Ein dedizierter Agent fasst alle Länderberichte in einer einzigen Zusammenfassung mit Routen, Ranking und konkreten nächsten Schritten zusammen.",
      },
      thinking: {
        title: "Adaptives erweitertes Denken",
        body: "Opus 4.7 entscheidet, wann tiefes Reasoning erforderlich ist — schwierige Kompromisse bekommen die Rechenleistung, die sie brauchen, einfache verschwenden keine Tokens.",
      },
      citations: {
        title: "Regulatorische Zitate",
        body: "Jeder Befund verlinkt zu einer Primärquelle — 19 CFR, EU-Verordnungen, MoHAP, ESMA, JIS — von jedem Prüfer nachvollziehbar.",
      },
      geopolitics: {
        title: "Live-Geopolitik-Bewusstsein",
        body: "Rotes-Meer-Störungen, Hormuz-Aufschläge, russischer Luftraum, Belt-&-Road-Schiene, VAE-Transithubs — alles in jede Empfehlung eingearbeitet.",
      },
      ranking: {
        title: "Multikriterielles Ranking",
        body: "Landed Cost (0,40), Time-to-Market (0,35), Compliance-Risiko (0,25). Die Mathematik ist sichtbar, nicht versteckt — Sie können ihr vertrauen oder sie hinterfragen.",
      },
      routes: {
        title: "Routenempfehlungen",
        body: "Primäre und Backup-Routen über Luft, See, Schiene und TIR — mit Transitzeit und indikativen Kostenbändern für jedes Ziel.",
      },
      checklist: {
        title: "Dokumentencheckliste pro Route",
        body: "A.TR, B/L, AWB, CMR, REACH-Prüfberichte, UKCA / CE / JIS / ESMA-Erklärungen, OFAC/BIS-Screening-Unterlagen — nichts wird vergessen.",
      },
      landedCost: {
        title: "Landed-Cost-Schätzungen",
        body: "FOB, Fracht, Versicherung, Zoll, Compliance-Aufwand — aufgeschlüsselt pro Land, damit Sie genau wissen, wohin das Geld fließt.",
      },
      deepDive: {
        title: "Interaktives Deep-Dive",
        body: "Stellen Sie pro Land Folgefragen. Jede Sitzung behält den vollständigen regulatorischen Kontext — Antworten bleiben fundiert, nie generisch.",
      },
      telemetry: {
        title: "Live-Telemetrie-Overlay",
        body: "Server-Sent Events streamen den Fortschritt jedes Agenten — Länderflagge, vergangene Sekunden, verbrauchte Tokens, Risikostufe — in Echtzeit.",
      },
      humanLoop: {
        title: "Mensch im Loop",
        body: "Claude schlägt vor. Sie entscheiden. Jede Empfehlung wird als Option mit Abwägungen präsentiert, nie als Black-Box-Urteil.",
      },
      languages: {
        title: "16-Sprachen-Unterstützung",
        body: "Vollständige UI, Analyse-Ausgabe und PDF-Rendering in 16 Sprachen — einschließlich CJK, Arabisch und Devanagari mit korrekter Schriftdarstellung.",
      },
      pdf: {
        title: "Verifizierbarer PDF-Export",
        body: "Ein Klick erzeugt einen professionellen Bericht mit QR-Verifizierung, vollständigem Quellenverzeichnis und jurytauglicher Typografie.",
      },
      costTransparency: {
        title: "Kostentransparenz",
        body: "Jeder Lauf zeigt echte Token-Nutzung und Dollar-Kosten — keine versteckten Aufschläge, keine geheimnisvolle Preisgestaltung, nur ehrliche Belege.",
      },
    },
  },

  metrics: {
    perAnalysis: "pro Analyse",
    perRun: "pro Lauf",
    parallelAgents: "parallele Agenten",
    languages: "Sprachen",
  },

  howItWorks: {
    eyebrow: "So funktioniert's",
    heading: "Grenzüberschreitender Handel hat 100+ Regeln pro Produkt. Wir bringen sie in 60 Sekunden ans Licht.",
    sub: "Ein kurzer Rundgang durch das, was zwischen \"Analyse starten\" und einem signierten, verifizierbaren Bericht passiert.",
    contextHeading: "Warum grenzüberschreitende Compliance heute schwer ist",
    contextP1: "Jedes Produkt, das eine Grenze überquert, steht vor einem Geflecht von Vorschriften: Zölle, HS-Klassifizierung, Sanktionsprüfung, Kennzeichnungsregeln, REACH/RoHS-Chemikaliengrenzwerte, Verpackungsgesetze, Zwangsarbeitserklärungen und Importlizenzen. Ein fehlender REACH-Prüfbericht hält einen Container in Hamburg wochenlang zurück. Ein falscher HS-Code beim US-Zoll kann 25% statt 8% Zoll bedeuten.",
    contextP2: "Traditionelle Zollagenten verlangen 500–2.000 $ pro Sendung und benötigen 5–15 Tage pro Markt. Für einen Verkäufer mit fünf Zielländern bedeutet das Wochen der Koordination und fünfstellige Gebühren — bevor auch nur eine Kiste gepackt ist.",
    pipelineHeading: "Die vierstufige Pipeline",
    steps: {
      describe: {
        title: "Beschreiben",
        body: "Produktdetails, Ursprungsland, Zielmärkte. Natürliche Sprache — keine HS-Codes oder Zollterminologie erforderlich.",
      },
      parallel: {
        title: "Parallele Analyse",
        body: "N Opus-4.7-Agenten laufen gleichzeitig — einer pro Zielmarkt — jeder zieht länderspezifische Vorschriften, Zölle und Sanktionslisten heran.",
      },
      harmonize: {
        title: "Harmonisieren",
        body: "Ein Harmonizer-Agent fasst alle Berichte in einer einzigen Zusammenfassung zusammen: Versandrouten, Landed-Cost-Schätzungen und risikobasierte Empfehlungen.",
      },
      deliver: {
        title: "Ausliefern",
        body: "Live-Bericht mit interaktivem Deep-Dive-Chat, Dokumentencheckliste pro Route und verifizierbarem PDF-Export — bereit für Anwalt, Zollagenten oder Kunden.",
      },
    },
    impactHeading: "Warum das wichtig ist",
    impactLead: "Compliance ist kein Papierkramproblem — es ist ein Marktzugangsproblem. Wer es falsch macht, wird von den größten Volkswirtschaften der Welt ausgeschlossen.",
    impacts: {
      smallExporter: {
        title: "Kleine Exporteure bleiben lokal",
        body: "Ein Handwerker in der Türkei kann sich nicht 1.500 $ × 5 Märkte leisten, um für jedes Ziel einen Zollagenten zu engagieren. Sie verkaufen nur inländisch und verpassen Wachstum.",
      },
      bigExporter: {
        title: "Große Exporteure verbrennen Wochen mit Koordination",
        body: "Fünf Länder bedeuten fünf Agenten, fünf E-Mail-Threads, fünf Zeitpläne. Was eine einzige Entscheidung sein sollte, wird zu einem Monat Operations-Arbeit.",
      },
      mistakeCost: {
        title: "Jeder Fehler ist teuer",
        body: "Ein falscher HS-Code, ein fehlender Prüfbericht, eine übersehene Sanktionsprüfung — jeder bedeutet Zollverzögerungen, Strafen, verdorbene Ware, Reputationsschaden.",
      },
      access: {
        title: "KI schließt die Lücke",
        body: "Gleiche Analyse, 0,42 $ statt 7.500 $. 60 Sekunden statt Wochen. Export-Expertise plötzlich verfügbar für jeden mit einem Produkt und einer Idee.",
      },
    },
    bottomLineLabel: "Das Fazit:",
    bottomLine: "Einen neuen Markt zu erschließen sollte eine Entscheidung sein, kein Projekt. MasterBorder macht es dazu.",
  },

  form: {
    cardTitle: "Produkt analysieren",
    cardDescription:
      "Geben Sie Ihre Produktdetails ein und wählen Sie Zielmärkte, oder probieren Sie ein Beispiel, um zu sehen, wie die Ausgabe aussieht.",
    trySample: "Beispiel probieren",
    seeExample: "Beispiel ansehen",
    sampleProductName: "Ledergeldbörse",
    sampleProductDescription: "Echte Rindsleder-Faltgeldbörse, chromgegerbt, 4 Kartenfächer und Münzfach. Handgefertigt mit traditionellen Ledertechniken.",
    quantityLabel: "Menge",
    quantityPlaceholder: "z.B. 50",
    unitLabel: "Einheit",
    unitPieces: "Stück",
    unitKg: "kg",
    unitGrams: "Gramm",
    unitLiters: "Liter",
    unitMeters: "Meter",
    unitSqm: "m²",
    unitPairs: "Paare",
    unitDozens: "Dutzend",
    unitBoxes: "Kartons",
    unitTons: "Tonnen",
    unitPounds: "Pfund (lbs)",
    unitOunces: "Unzen (oz)",
    unitGallons: "Gallonen (US)",
    unitFeet: "Fuß (ft)",
    unitInches: "Zoll (in)",
    unitCubicFeet: "Kubikfuß (ft³)",
    productNameLabel: "Produktname",
    productNamePlaceholder: "z.B. Ledergeldbörse",
    descriptionLabel: "Beschreibung",
    descriptionPlaceholder:
      "Materialien, Verarbeitung, Behandlung usw. (z.B. 'Echtes Rindsleder, chromgegerbt, handgefertigt')",
    categoryLabel: "Kategorie",
    categoryOptional: "(optional)",
    categoryPlaceholder: "z.B. Accessoires",
    valueLabel: "Wert pro Einheit (USD)",
    valuePlaceholder: "45,00",
    originLabel: "Ursprungsland",
    targetLabel: "Zielländer",
    targetHint: "Wählen Sie einen oder mehrere Märkte zur Analyse —",
    selectedLabel: "ausgewählt",
    routeRiskTitle: "Routenrisikoanalyse einbeziehen",
    routeRiskBody:
      "Aktive Konfliktzonen, Meerengenstörungen und Schifffahrtsrisiken berücksichtigen (empfohlen).",
    analyzeButton: "Analysieren",
    analyzingMarket: "{count} Markt wird parallel analysiert…",
    analyzingMarkets: "{count} Märkte werden parallel analysiert…",
    dispatchingHint:
      "Opus 4.7 versendet Länderagenten parallel. Dies dauert typischerweise 25–35 Sekunden.",
    progressStep1: "Länderagenten werden versandt…",
    progressStep2: "Zölle und HS-Codes werden geprüft…",
    progressStep3: "Sanktionslisten werden überprüft…",
    progressStep4: "Kennzeichnungs- und Verpackungsregeln werden analysiert…",
    progressStep5: "Vorschriften werden abgeglichen…",
    progressStep6: "Ergebnisse werden harmonisiert…",
    errorMissing: "Bitte geben Sie sowohl Produktnamen als auch Beschreibung ein.",
    errorNoCountry: "Wählen Sie mindestens ein Zielland.",
    errorGeneric: "Analyse fehlgeschlagen. Bitte erneut versuchen.",
    errorRateLimit: "Tageslimit erreicht. Bitte in 24 Stunden erneut versuchen.",
  },

  results: {
    backToAnalysis: "Neue Analyse",
    analyzedFor: "Analysiert für",
    origin: "Ursprung:",
    executiveSummary: "Zusammenfassung",
    executiveSummaryDescription:
      "Harmonisierte Analyse über {count} Märkte · Human-in-the-Loop-Empfehlung",
    countryReports: "Länderberichte",
    complianceFindings: "Compliance-Befunde",
    recommendedActions: "Empfohlene Maßnahmen",
    deepDive: "Deep-Dive in {country}",
    downloadPdf: "PDF herunterladen",
    jobId: "Job-ID:",
    notFound: "Analyse nicht gefunden. Möglicherweise abgelaufen — bitte neue Analyse starten.",
    loading: "Analyse wird geladen…",
  },

  deepDive: {
    backToResults: "Zurück zu Ergebnissen",
    subtitle: "Interaktives Compliance-Deep-Dive · {country}",
    placeholder: "Stellen Sie eine Folgefrage (z.B. Frachtoptionen, Laborauswahl, Zeitplan)…",
    send: "Senden",
    downloadPdf: "PDF herunterladen",
    thinking: "Denkt nach…",
    errorSend: "Nachricht konnte nicht gesendet werden. Bitte erneut versuchen.",
  },

  risk: {
    low: "Niedrig",
    medium: "Mittel",
    high: "Hoch",
    blocked: "Blockiert",
    suffix: "Risiko",
  },

  footer: {
    license: "MIT-lizenziert · Entwickelt mit Claude Code + Opus 4.7 · Der Agent schlägt vor, Sie entscheiden.",
    servedAnalyses: "{analyses} {analysesNoun} für {users} {usersNoun} bereitgestellt",
    analysesSingular: "Analyse",
    analysesPlural: "Analysen",
    usersSingular: "eindeutiger Benutzer",
    usersPlural: "eindeutige Benutzer",
    todaySuffix: "heute",
    topMarket: "meistanalysierter Markt:",
  },

  nav: {
    languageLabel: "Sprache",
    howItWorks: "So funktioniert's",
    example: "Beispiel",
    github: "GitHub",
    trySample: "Beispiel probieren",
  },

  countries: {
    US: "Vereinigte Staaten",
    DE: "Deutschland",
    GB: "Vereinigtes Königreich",
    TR: "Türkei",
    JP: "Japan",
  },

  pdf: {
    downloadPdf: "PDF herunterladen",
    generatingPdf: "PDF wird erstellt…",
    pdfReady: "PDF bereit",
  },

  deepDiveCta: {
    headline: "Tauchen Sie tiefer in diesen Markt ein",
    body: "Wochenbasierter Go-to-Market-Plan — Dokumente, Testlabore, Kostenschätzungen, Zeitpläne. Angetrieben von Opus 4.7.",
    button: "Deep-Dive starten",
  },

  roi: {
    headline: "Diese Analyse hat Ihnen {savings} und ~{days} Tage gespart",
    masterborderLabel: "MasterBorder",
    brokerLabel: "Traditioneller Agent",
    vs: "vs",
    lowerCost: "geringere Kosten",
    faster: "schneller",
    disclaimer: "Agenten-Benchmark: branchenüblich 500–2.000 $ / 5–15 Tage pro Sendung.",
  },

  telemetry: {
    headline: "Live-Agenten-Telemetrie",
    elapsed: "Verstrichen",
    progress: "Fortschritt",
    tokensSoFar: "Tokens bisher",
    tokensAbbr: "Tokens",
    queued: "in Warteschlange",
    risk: "Risiko",
    failed: "fehlgeschlagen",
    harmonizer: "Harmonizer-Agent",
    waiting: "wartet auf Agenten",
    synthesizing: "Zusammenfassung wird synthetisiert…",
    done: "fertig",
  },

  example: {
    bannerTitle: "Dies ist eine vorberechnete Beispielanalyse",
    bannerBody: "Echte Opus-4.7-Ausgabe aus einem Live-Lauf — hier eingefroren, damit Sie das Produkt sehen können, ohne API-Credits zu verbrauchen.",
    ctaRunYourOwn: "Eigene starten",
    deepDiveDisabled: "Deep-Dive ist bei Beispielen deaktiviert — starten Sie Ihre eigene Analyse, um mit dem Agenten zu chatten.",
    footerNote: "Beispielanalyse — vorberechnet. Starten Sie Ihre eigene von der Startseite für einen aktuellen Bericht.",
  },
  conflicts: {
    title: "Markt-übergreifende Konflikte erkannt",
    subtitle: "Konkrete Unterschiede zwischen Zielmärkten, die Sie abstimmen müssen.",
    impactLabel: "Auswirkung:",
    types: {
      hs_code: "HS-Code",
      labeling: "Kennzeichnung",
      certification: "Zertifizierung",
      documentation: "Dokumente",
      tariff: "Zoll",
      other: "Sonstiges",
    },
  },
  findings: {
    verify: "Überprüfen",
    confidence: {
      high: "Hohe Sicherheit",
      medium: "Mittlere Sicherheit",
      low: "Niedrige Sicherheit",
    },
    confidenceTooltip: {
      high: "Durch explizite regulatorische Zitation oder autoritative Quellen-URL gestützt.",
      medium: "Bezieht sich auf etablierte Praxis oder seriöse Sekundärquelle.",
      low: "Schätzung ohne zitierte Autorität — vor dem Handeln überprüfen.",
    },
  },
};
