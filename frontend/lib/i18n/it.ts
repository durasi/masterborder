import type { Translations } from "./en";

export const it: Translations = {
  locale: "it",
  dir: "ltr",
  languageName: "Italiano",
  flag: "🇮🇹",

  hero: {
    livePill: "Live · Costruito con Opus 4.7",
    titleLine1: "Spedisci oltre confine,",
    titleLine2: "senza tirare a indovinare",
    subtitle:
      "Trasforma una descrizione di prodotto in un report di conformità pronto per l'export per fino a 5 mercati — in meno di un minuto, per meno di un centesimo.",
  },

  features: {
    eyebrow: "Cosa c'è dentro",
    heading: "Un banco di lavoro completo di conformità, progettato per venditori globali.",
    sub: "Ogni analisi si basa su quindici capacità che lavorano insieme — dagli agenti paralleli agli export PDF verificabili.",
    category: {
      core: "Core",
      compliance: "Conformità",
      shipping: "Spedizione",
      experience: "Esperienza",
      reach: "Portata",
    },
    items: {
      parallel: {
        title: "Agenti-paese paralleli",
        body: "Un agente per destinazione attivato simultaneamente. Accelerazione 5× rispetto alla revisione sequenziale — 60 secondi per lavoro che richiedeva giorni.",
      },
      harmonizer: {
        title: "Armonizzatore end-to-end",
        body: "Un agente dedicato sintetizza tutti i report-paese in un unico riassunto esecutivo con percorsi, classificazione e prossimi passi concreti.",
      },
      thinking: {
        title: "Pensiero esteso adattivo",
        body: "Opus 4.7 decide quando è giustificato il ragionamento profondo — i trade-off difficili ottengono il calcolo necessario, quelli facili non sprecano token.",
      },
      citations: {
        title: "Citazioni normative",
        body: "Ogni riscontro rimanda a una fonte primaria — 19 CFR, regolamenti UE, MoHAP, ESMA, JIS — verificabile da qualsiasi revisore.",
      },
      geopolitics: {
        title: "Consapevolezza geopolitica live",
        body: "Interruzione Mar Rosso, premi Hormuz, spazio aereo russo, ferrovia Belt & Road, hub transit EAU — tutto incorporato in ogni raccomandazione.",
      },
      ranking: {
        title: "Classifica multi-criteri",
        body: "Costo finale (0,40), time-to-market (0,35), rischio conformità (0,25). La matematica è mostrata, non nascosta — puoi fidarti o contestarla.",
      },
      routes: {
        title: "Raccomandazioni di rotte",
        body: "Rotte primarie e di backup via aria, mare, ferrovia e TIR — con tempo di transito e fasce di costo indicative per ogni destinazione.",
      },
      checklist: {
        title: "Lista documenti per rotta",
        body: "A.TR, B/L, AWB, CMR, report REACH, dichiarazioni UKCA / CE / JIS / ESMA, registri OFAC/BIS — nulla viene dimenticato.",
      },
      landedCost: {
        title: "Stime di costo finale",
        body: "FOB, nolo, assicurazione, dazi, spese di conformità — suddivisi per paese così sai esattamente dove va il denaro.",
      },
      deepDive: {
        title: "Approfondimento interattivo",
        body: "Fai domande di approfondimento per paese. Ogni sessione mantiene il contesto normativo completo — le risposte rimangono fondate, mai generiche.",
      },
      telemetry: {
        title: "Overlay telemetria live",
        body: "Server-sent events trasmettono il progresso di ogni agente — bandiera del paese, secondi trascorsi, token consumati, livello di rischio — in tempo reale.",
      },
      humanLoop: {
        title: "Umano nel ciclo",
        body: "Claude propone. Tu decidi. Ogni raccomandazione è presentata come opzione con trade-off, mai come verdetto scatola nera.",
      },
      languages: {
        title: "Supporto 16 lingue",
        body: "UI completa, output di analisi e rendering PDF in 16 lingue — inclusi CJK, arabo e devanagari con corretta modellazione dei font.",
      },
      pdf: {
        title: "Export PDF verificabile",
        body: "Un click produce un report professionale con verifica QR, sezione completa di fonti normative e tipografia di qualità jury.",
      },
      costTransparency: {
        title: "Trasparenza dei costi",
        body: "Ogni esecuzione mostra l'uso reale di token e il costo in dollari — nessun markup nascosto, nessun prezzo misterioso, solo ricevute oneste.",
      },
    },
  },

  metrics: {
    perAnalysis: "per analisi",
    perRun: "per esecuzione",
    parallelAgents: "agenti paralleli",
    languages: "lingue",
  },

  howItWorks: {
    eyebrow: "Come funziona",
    heading: "Il commercio transfrontaliero ha più di 100 regole per prodotto. Le portiamo alla luce in 60 secondi.",
    sub: "Un breve tour di ciò che accade tra premere \"Analizza\" e ottenere un report firmato e verificabile.",
    contextHeading: "Perché la conformità transfrontaliera è difficile oggi",
    contextP1: "Ogni prodotto che attraversa un confine affronta un groviglio di normative: tariffe, classificazione HS, screening sanzioni, regole di etichettatura, limiti chimici REACH/RoHS, leggi sull'imballaggio, dichiarazioni di lavoro forzato e licenze di importazione. Un report REACH mancante tiene un container ad Amburgo per settimane. Un codice HS sbagliato alla dogana USA può significare dazi del 25% invece dell'8%.",
    contextP2: "I doganieri tradizionali addebitano 500-2.000 $ per spedizione e impiegano 5-15 giorni per mercato. Per un venditore che punta a cinque paesi, sono settimane di coordinamento e tariffe a cinque cifre — prima che un singolo scatolone sia imballato.",
    pipelineHeading: "La pipeline in quattro passi",
    steps: {
      describe: {
        title: "Descrivi",
        body: "Dettagli prodotto, paese di origine, mercati target. Linguaggio naturale — non servono codici HS o terminologia doganale.",
      },
      parallel: {
        title: "Analisi parallela",
        body: "N agenti Opus 4.7 si attivano simultaneamente — uno per mercato target — ognuno estraendo normative, tariffe e liste di sanzioni specifiche del proprio paese.",
      },
      harmonize: {
        title: "Armonizza",
        body: "Un agente armonizzatore sintetizza tutti i report in un unico riassunto esecutivo con rotte di spedizione, stime di costo finale e raccomandazioni classificate per rischio.",
      },
      deliver: {
        title: "Consegna",
        body: "Report live con chat di approfondimento interattivo, lista documenti per rotta e export PDF verificabile — pronto per avvocato, broker o cliente.",
      },
    },
    impactHeading: "Perché questo è importante",
    impactLead: "La conformità non è un problema di scartoffie — è un problema di accesso al mercato. Sbagliare significa essere esclusi dalle più grandi economie del mondo.",
    impacts: {
      smallExporter: {
        title: "I piccoli esportatori rimangono locali",
        body: "Un artigiano in Turchia non può permettersi 1.500 $ × 5 mercati per assumere un broker per ogni destinazione. Vendono solo internamente e perdono crescita.",
      },
      bigExporter: {
        title: "I grandi esportatori bruciano settimane in coordinamento",
        body: "Cinque paesi significano cinque broker, cinque thread email, cinque calendari. Ciò che dovrebbe essere una singola decisione diventa un mese di lavoro operativo.",
      },
      mistakeCost: {
        title: "Ogni errore è costoso",
        body: "Codice HS sbagliato, report mancante, screening sanzioni perso — ognuno significa ritardi doganali, multe, inventario rovinato, danno reputazionale.",
      },
      access: {
        title: "L'IA colma il divario",
        body: "Stessa analisi, 0,42 $ invece di 7.500 $. 60 secondi invece di settimane. Competenza export improvvisamente disponibile per chiunque abbia un prodotto e un'idea.",
      },
    },
    bottomLineLabel: "In sintesi:",
    bottomLine: "Aprire un nuovo mercato dovrebbe essere una decisione, non un progetto. MasterBorder lo rende una decisione.",
  },

  form: {
    cardTitle: "Analizza un prodotto",
    cardDescription:
      "Inserisci i dettagli del tuo prodotto e scegli i mercati target, o prova un campione per vedere come appare il risultato.",
    trySample: "Prova il campione",
    seeExample: "Vedi l'esempio",
    sampleProductName: "Portafoglio in pelle",
    sampleProductDescription: "Portafoglio bifold in vera pelle bovina, conciato al cromo, 4 scomparti per carte e tasca per monete. Fatto a mano con tecniche tradizionali.",
    quantityLabel: "Quantità",
    quantityPlaceholder: "es., 50",
    unitLabel: "Unità",
    unitPieces: "pezzi",
    unitKg: "kg",
    unitGrams: "grammi",
    unitLiters: "litri",
    unitMeters: "metri",
    unitSqm: "m²",
    unitPairs: "paia",
    unitDozens: "dozzine",
    unitBoxes: "scatole",
    unitTons: "tonnellate",
    unitPounds: "libbre (lbs)",
    unitOunces: "once (oz)",
    unitGallons: "galloni (US)",
    unitFeet: "piedi (ft)",
    unitInches: "pollici (in)",
    unitCubicFeet: "piedi cubi (ft³)",
    productNameLabel: "Nome prodotto",
    productNamePlaceholder: "es., portafoglio in pelle",
    descriptionLabel: "Descrizione",
    descriptionPlaceholder:
      "Materiali, lavorazione, trattamento, ecc. (es., 'Vera pelle bovina, conciata al cromo, fatta a mano')",
    categoryLabel: "Categoria",
    categoryOptional: "(opzionale)",
    categoryPlaceholder: "es., accessori",
    valueLabel: "Valore per unità (USD)",
    valuePlaceholder: "45,00",
    originLabel: "Paese di origine",
    targetLabel: "Paesi target",
    targetHint: "Scegli uno o più mercati da analizzare —",
    selectedLabel: "selezionato/i",
    routeRiskTitle: "Includi analisi del rischio di rotta",
    routeRiskBody:
      "Considera zone di conflitto attive, interruzioni degli stretti e rischi delle rotte marittime (consigliato).",
    analyzeButton: "Analizza",
    analyzingMarket: "Analisi di {count} mercato in parallelo…",
    analyzingMarkets: "Analisi di {count} mercati in parallelo…",
    dispatchingHint:
      "Opus 4.7 sta inviando gli Agenti-Paese in parallelo. Tipicamente richiede 25-35 secondi.",
    progressStep1: "Invio Agenti-Paese…",
    progressStep2: "Verifica tariffe e codici HS…",
    progressStep3: "Revisione liste di sanzioni…",
    progressStep4: "Analisi regole di etichettatura e imballaggio…",
    progressStep5: "Riferimenti incrociati alle normative…",
    progressStep6: "Armonizzazione risultati…",
    errorMissing: "Inserisci sia nome che descrizione del prodotto.",
    errorNoCountry: "Seleziona almeno un paese target.",
    errorGeneric: "Analisi fallita. Riprova.",
    errorRateLimit: "Limite giornaliero raggiunto. Riprova tra 24 ore.",
  },

  results: {
    backToAnalysis: "Nuova analisi",
    analyzedFor: "Analizzato per",
    origin: "Origine:",
    executiveSummary: "Riassunto Esecutivo",
    executiveSummaryDescription:
      "Analisi armonizzata su {count} mercati · Raccomandazione con umano nel ciclo",
    countryReports: "Report per Paese",
    complianceFindings: "Riscontri di Conformità",
    recommendedActions: "Azioni Raccomandate",
    deepDive: "Approfondimento in {country}",
    downloadPdf: "Scarica PDF",
    jobId: "ID Lavoro:",
    notFound: "Analisi non trovata. Potrebbe essere scaduta — esegui una nuova analisi.",
    loading: "Caricamento analisi…",
  },

  deepDive: {
    backToResults: "Torna ai risultati",
    subtitle: "Approfondimento di conformità interattivo · {country}",
    placeholder: "Fai una domanda di approfondimento (es., opzioni di trasporto, selezione laboratorio, tempistiche)…",
    send: "Invia",
    downloadPdf: "Scarica PDF",
    thinking: "Sto pensando…",
    errorSend: "Impossibile inviare il messaggio. Riprova.",
  },

  risk: {
    low: "Basso",
    medium: "Medio",
    high: "Alto",
    blocked: "Bloccato",
    suffix: "rischio",
  },

  footer: {
    license: "Licenza MIT · Costruito con Claude Code + Opus 4.7 · L'agente propone, tu decidi.",
    servedAnalyses: "Fornite {analyses} {analysesNoun} per {users} {usersNoun}",
    analysesSingular: "analisi",
    analysesPlural: "analisi",
    usersSingular: "utente unico",
    usersPlural: "utenti unici",
    todaySuffix: "oggi",
    topMarket: "mercato più analizzato:",
  },

  nav: {
    languageLabel: "Lingua",
    howItWorks: "Come funziona",
    example: "Esempio",
    github: "GitHub",
    trySample: "Prova campione",
  },

  countries: {
    US: "Stati Uniti",
    DE: "Germania",
    GB: "Regno Unito",
    TR: "Turchia",
    JP: "Giappone",
  },

  pdf: {
    downloadPdf: "Scarica PDF",
    generatingPdf: "Generazione PDF…",
    pdfReady: "PDF pronto",
  },

  deepDiveCta: {
    headline: "Approfondisci questo mercato",
    body: "Piano settimanale di ingresso al mercato — documenti, laboratori di test, stime di costi, tempistiche. Alimentato da Opus 4.7.",
    button: "Inizia approfondimento",
  },

  roi: {
    headline: "Questa analisi ti ha fatto risparmiare {savings} e ~{days} giorni",
    masterborderLabel: "MasterBorder",
    brokerLabel: "Broker tradizionale",
    vs: "vs",
    lowerCost: "costo inferiore",
    faster: "più veloce",
    disclaimer: "Benchmark broker: tipico del settore 500-2.000 $ / 5-15 giorni per spedizione.",
  },

  telemetry: {
    headline: "Telemetria agente live",
    elapsed: "Trascorso",
    progress: "Progresso",
    tokensSoFar: "token finora",
    tokensAbbr: "token",
    queued: "in coda",
    risk: "Rischio",
    failed: "fallito",
    harmonizer: "Agente Armonizzatore",
    waiting: "in attesa agenti",
    synthesizing: "sintesi riassunto esecutivo…",
    done: "completato",
  },

  example: {
    bannerTitle: "Questa è un'analisi-esempio pre-calcolata",
    bannerBody: "Output reale Opus 4.7 da esecuzione live — congelato qui per vedere il prodotto senza consumare crediti API.",
    ctaRunYourOwn: "Esegui la tua",
    deepDiveDisabled: "L'approfondimento è disabilitato negli esempi — esegui la tua analisi per chattare con l'agente.",
    footerNote: "Analisi-esempio — pre-calcolata. Esegui la tua dalla home per un report aggiornato.",
  },
  conflicts: {
    title: "Conflitti tra mercati rilevati",
    subtitle: "Divergenze concrete tra mercati target da conciliare.",
    impactLabel: "Impatto:",
    types: {
      hs_code: "Codice HS",
      labeling: "Etichettatura",
      certification: "Certificazione",
      documentation: "Documenti",
      tariff: "Tariffa",
      other: "Altro",
    },
  },
  findings: {
    verify: "Verifica",
    confidence: {
      high: "Alta affidabilità",
      medium: "Media affidabilità",
      low: "Bassa affidabilità",
    },
    confidenceTooltip: {
      high: "Supportato da citazione regolatoria esplicita o URL di fonte autorevole.",
      medium: "Fa riferimento a pratica consolidata o fonte secondaria affidabile.",
      low: "Inferenza senza autorità citata — verificare prima di agire.",
    },
  },
};
