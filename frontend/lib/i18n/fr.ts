import type { Translations } from "./en";

export const fr: Translations = {
  locale: "fr",
  dir: "ltr",
  languageName: "Français",
  flag: "🇫🇷",

  hero: {
    livePill: "En direct · Propulsé par Opus 4.7",
    titleLine1: "Expédiez à travers les frontières,",
    titleLine2: "sans deviner",
    subtitle:
      "Transformez une description produit en rapport de conformité prêt à l'export pour jusqu'à 5 marchés — en moins d'une minute, pour moins d'un centime.",
  },

  features: {
    eyebrow: "Ce qu'il y a à l'intérieur",
    heading: "Un atelier de conformité complet, conçu pour les vendeurs mondiaux.",
    sub: "Chaque analyse s'appuie sur quinze capacités travaillant de concert — des agents parallèles aux exports PDF vérifiables.",
    category: {
      core: "Cœur",
      compliance: "Conformité",
      shipping: "Expédition",
      experience: "Expérience",
      reach: "Portée",
    },
    items: {
      parallel: {
        title: "Agents-pays parallèles",
        body: "Un agent par destination, lancés simultanément. Accélération 5× par rapport à l'examen séquentiel — 60 secondes pour un travail qui prenait des jours.",
      },
      harmonizer: {
        title: "Harmoniseur de bout en bout",
        body: "Un agent dédié synthétise tous les rapports-pays en un résumé exécutif unique avec routage, classement et prochaines étapes concrètes.",
      },
      thinking: {
        title: "Raisonnement étendu adaptatif",
        body: "Opus 4.7 décide quand un raisonnement profond est justifié — les arbitrages difficiles obtiennent le calcul nécessaire, les faciles n'épuisent pas de tokens.",
      },
      citations: {
        title: "Citations réglementaires",
        body: "Chaque constat renvoie à une source primaire — 19 CFR, règlements UE, MoHAP, ESMA, JIS — vérifiable par tout réviseur.",
      },
      geopolitics: {
        title: "Conscience géopolitique en temps réel",
        body: "Perturbation mer Rouge, primes Hormuz, espace aérien russe, rail Belt & Road, hubs EAU — tout intégré à chaque recommandation.",
      },
      ranking: {
        title: "Classement multi-critères",
        body: "Coût rendu (0,40), délai de mise sur le marché (0,35), risque de conformité (0,25). Les calculs sont visibles, pas cachés — à vous de faire confiance ou contester.",
      },
      routes: {
        title: "Recommandations d'itinéraires",
        body: "Routes principales et de secours par air, mer, rail et TIR — avec temps de transit et fourchettes de coûts indicatives pour chaque destination.",
      },
      checklist: {
        title: "Liste de documents par route",
        body: "A.TR, B/L, AWB, CMR, rapports REACH, déclarations UKCA / CE / JIS / ESMA, dossiers OFAC/BIS — rien n'est oublié.",
      },
      landedCost: {
        title: "Estimations du coût rendu",
        body: "FOB, fret, assurance, droits, frais de conformité — ventilés par pays pour savoir exactement où va l'argent.",
      },
      deepDive: {
        title: "Exploration approfondie interactive",
        body: "Posez des questions de suivi par pays. Chaque session conserve le contexte réglementaire complet — les réponses restent ancrées, jamais génériques.",
      },
      telemetry: {
        title: "Télémétrie en direct",
        body: "Server-sent events diffusent la progression de chaque agent — drapeau-pays, secondes écoulées, tokens consommés, niveau de risque — en temps réel.",
      },
      humanLoop: {
        title: "Humain dans la boucle",
        body: "Claude propose. Vous décidez. Chaque recommandation est présentée comme une option avec compromis, jamais comme un verdict boîte noire.",
      },
      languages: {
        title: "Support 16 langues",
        body: "UI complète, sortie d'analyse et rendu PDF en 16 langues — y compris CJK, arabe et devanagari avec un rendu de police correct.",
      },
      pdf: {
        title: "Export PDF vérifiable",
        body: "Un clic produit un rapport professionnel avec vérification QR, section sources réglementaires complète et typographie de qualité jury.",
      },
      costTransparency: {
        title: "Transparence des coûts",
        body: "Chaque exécution montre l'utilisation réelle des tokens et le coût en dollars — pas de marge cachée, pas de tarification mystérieuse, juste des reçus honnêtes.",
      },
    },
  },

  metrics: {
    perAnalysis: "par analyse",
    perRun: "par exécution",
    parallelAgents: "agents parallèles",
    languages: "langues",
  },

  howItWorks: {
    eyebrow: "Comment ça marche",
    heading: "Le commerce transfrontalier a 100+ règles par produit. Nous les révélons en 60 secondes.",
    sub: "Une brève visite de ce qui se passe entre \"Analyser\" et l'obtention d'un rapport signé et vérifiable.",
    contextHeading: "Pourquoi la conformité transfrontalière est difficile aujourd'hui",
    contextP1: "Chaque produit qui franchit une frontière fait face à un enchevêtrement de réglementations : droits de douane, classification SH, filtrage des sanctions, règles d'étiquetage, limites chimiques REACH/RoHS, lois d'emballage, attestations de travail forcé et licences d'importation. Un rapport REACH manquant immobilise un conteneur à Hambourg pendant des semaines. Un mauvais code SH à la douane américaine peut signifier 25% de droits au lieu de 8%.",
    contextP2: "Les commissionnaires en douane traditionnels facturent 500–2 000 $ par expédition et prennent 5–15 jours par marché. Pour un vendeur ciblant cinq pays, cela représente des semaines de coordination et des frais à cinq chiffres — avant même qu'une seule boîte ne soit emballée.",
    pipelineHeading: "Le pipeline en quatre étapes",
    steps: {
      describe: {
        title: "Décrire",
        body: "Détails du produit, pays d'origine, marchés cibles. Langage naturel — pas de codes SH ou de terminologie douanière requise.",
      },
      parallel: {
        title: "Analyse parallèle",
        body: "N agents Opus 4.7 s'activent simultanément — un par marché cible — chacun tirant les réglementations, tarifs et listes de sanctions spécifiques à son pays.",
      },
      harmonize: {
        title: "Harmoniser",
        body: "Un agent harmoniseur synthétise tous les rapports en un résumé exécutif unique avec routes d'expédition, estimations de coût rendu et recommandations classées par risque.",
      },
      deliver: {
        title: "Livrer",
        body: "Rapport en direct avec chat d'exploration approfondie interactif, liste de documents par route, et export PDF vérifiable — prêt pour avocat, commissionnaire ou client.",
      },
    },
    impactHeading: "Pourquoi c'est important",
    impactLead: "La conformité n'est pas un problème de paperasse — c'est un problème d'accès au marché. Se tromper signifie être exclu des plus grandes économies mondiales.",
    impacts: {
      smallExporter: {
        title: "Les petits exportateurs restent locaux",
        body: "Un artisan en Turquie ne peut pas se permettre 1 500 $ × 5 marchés pour engager un commissionnaire par destination. Ils vendent uniquement localement et laissent la croissance de côté.",
      },
      bigExporter: {
        title: "Les grands exportateurs perdent des semaines en coordination",
        body: "Cinq pays, c'est cinq commissionnaires, cinq fils d'e-mails, cinq calendriers. Ce qui devrait être une décision unique devient un mois de travail opérationnel.",
      },
      mistakeCost: {
        title: "Chaque erreur coûte cher",
        body: "Un mauvais code SH, un rapport manquant, un filtrage de sanction raté — chacun signifie retards douaniers, amendes, stock abîmé, atteinte à la réputation.",
      },
      access: {
        title: "L'IA comble l'écart",
        body: "Même analyse, 0,42 $ au lieu de 7 500 $. 60 secondes au lieu de semaines. L'expertise export soudainement accessible à quiconque a un produit et une idée.",
      },
    },
    bottomLineLabel: "En résumé :",
    bottomLine: "Ouvrir un nouveau marché devrait être une décision, pas un projet. MasterBorder en fait une décision.",
  },

  form: {
    cardTitle: "Analyser un produit",
    cardDescription:
      "Entrez les détails de votre produit et choisissez les marchés cibles, ou essayez un échantillon pour voir le résultat.",
    trySample: "Essayer un échantillon",
    seeExample: "Voir l'exemple",
    sampleProductName: "Portefeuille en cuir",
    sampleProductDescription: "Portefeuille bifold en cuir de vachette véritable, tannage au chrome, 4 emplacements cartes et poche à monnaie. Artisanal avec techniques traditionnelles.",
    quantityLabel: "Quantité",
    quantityPlaceholder: "ex., 50",
    unitLabel: "Unité",
    unitPieces: "pièces",
    unitKg: "kg",
    unitGrams: "grammes",
    unitLiters: "litres",
    unitMeters: "mètres",
    unitSqm: "m²",
    unitPairs: "paires",
    unitDozens: "douzaines",
    unitBoxes: "boîtes",
    unitTons: "tonnes",
    unitPounds: "livres (lbs)",
    unitOunces: "onces (oz)",
    unitGallons: "gallons (US)",
    unitFeet: "pieds (ft)",
    unitInches: "pouces (in)",
    unitCubicFeet: "pieds cubes (ft³)",
    productNameLabel: "Nom du produit",
    productNamePlaceholder: "ex., portefeuille en cuir",
    descriptionLabel: "Description",
    descriptionPlaceholder:
      "Matériaux, fabrication, traitement, etc. (ex., 'Cuir de vachette véritable, tannage chrome, artisanal')",
    categoryLabel: "Catégorie",
    categoryOptional: "(optionnel)",
    categoryPlaceholder: "ex., accessoires",
    valueLabel: "Valeur par unité (USD)",
    valuePlaceholder: "45,00",
    originLabel: "Pays d'origine",
    targetLabel: "Pays cibles",
    targetHint: "Choisissez un ou plusieurs marchés à analyser —",
    selectedLabel: "sélectionné(s)",
    routeRiskTitle: "Inclure l'analyse de risque d'itinéraire",
    routeRiskBody:
      "Prendre en compte zones de conflit actives, perturbations des détroits et risques des voies maritimes (recommandé).",
    analyzeButton: "Analyser",
    analyzingMarket: "Analyse de {count} marché en parallèle…",
    analyzingMarkets: "Analyse de {count} marchés en parallèle…",
    dispatchingHint:
      "Opus 4.7 lance les agents-pays en parallèle. Cela prend généralement 25–35 secondes.",
    progressStep1: "Lancement des agents-pays…",
    progressStep2: "Vérification des tarifs et codes SH…",
    progressStep3: "Examen des listes de sanctions…",
    progressStep4: "Analyse des règles d'étiquetage et d'emballage…",
    progressStep5: "Recoupement des réglementations…",
    progressStep6: "Harmonisation des résultats…",
    errorMissing: "Veuillez entrer à la fois un nom et une description de produit.",
    errorNoCountry: "Sélectionnez au moins un pays cible.",
    errorGeneric: "Analyse échouée. Veuillez réessayer.",
    errorRateLimit: "Limite quotidienne atteinte. Veuillez réessayer dans 24 heures.",
  },

  results: {
    backToAnalysis: "← Nouvelle analyse",
    analyzedFor: "Analysé pour",
    origin: "Origine :",
    executiveSummary: "Résumé Exécutif",
    executiveSummaryDescription:
      "Analyse harmonisée sur {count} marchés · Recommandation avec humain dans la boucle",
    countryReports: "Rapports par Pays",
    complianceFindings: "Constats de Conformité",
    recommendedActions: "Actions Recommandées",
    deepDive: "Exploration approfondie de {country}",
    downloadPdf: "Télécharger PDF",
    jobId: "ID du Job :",
    notFound: "Analyse introuvable. Elle a peut-être expiré — veuillez lancer une nouvelle analyse.",
    loading: "Chargement de l'analyse…",
  },

  deepDive: {
    backToResults: "← Retour aux résultats",
    subtitle: "Exploration conformité interactive · {country}",
    placeholder: "Posez une question de suivi (ex., options de fret, choix de laboratoire, calendrier)…",
    send: "Envoyer",
    downloadPdf: "Télécharger PDF",
    thinking: "Réflexion…",
    errorSend: "Message non envoyé. Veuillez réessayer.",
  },

  risk: {
    low: "Faible",
    medium: "Moyen",
    high: "Élevé",
    blocked: "Bloqué",
    suffix: "risque",
  },

  footer: {
    license: "Licence MIT · Conçu avec Claude Code + Opus 4.7 · L'agent propose, vous décidez.",
    servedAnalyses: "{analyses} {analysesNoun} servies pour {users} {usersNoun}",
    analysesSingular: "analyse",
    analysesPlural: "analyses",
    usersSingular: "utilisateur unique",
    usersPlural: "utilisateurs uniques",
    todaySuffix: "aujourd'hui",
    topMarket: "marché le plus analysé :",
  },

  nav: {
    languageLabel: "Langue",
    howItWorks: "Comment ça marche",
    example: "Exemple",
    github: "GitHub",
    trySample: "Essayer",
  },

  countries: {
    US: "États-Unis",
    DE: "Allemagne",
    GB: "Royaume-Uni",
    TR: "Turquie",
    JP: "Japon",
  },

  pdf: {
    downloadPdf: "Télécharger PDF",
    generatingPdf: "Génération PDF…",
    pdfReady: "PDF prêt",
  },

  deepDiveCta: {
    headline: "Explorez ce marché en profondeur",
    body: "Plan de mise sur le marché semaine par semaine — documents, laboratoires, estimations de coûts, calendriers. Propulsé par Opus 4.7.",
    button: "Démarrer l'exploration",
  },

  roi: {
    headline: "Cette analyse vous a fait économiser {savings} et ~{days} jours",
    masterborderLabel: "MasterBorder",
    brokerLabel: "Commissionnaire traditionnel",
    vs: "vs",
    lowerCost: "coût inférieur",
    faster: "plus rapide",
    disclaimer: "Référence commissionnaire : typique 500–2 000 $ / 5–15 jours par expédition.",
  },

  telemetry: {
    headline: "Télémétrie agent en direct",
    elapsed: "Écoulé",
    progress: "Progrès",
    tokensSoFar: "tokens jusqu'ici",
    tokensAbbr: "tokens",
    queued: "en file",
    risk: "Risque",
    failed: "échoué",
    harmonizer: "Agent Harmoniseur",
    waiting: "en attente des agents",
    synthesizing: "synthèse du résumé…",
    done: "terminé",
  },

  example: {
    bannerTitle: "Ceci est une analyse-exemple pré-calculée",
    bannerBody: "Vraie sortie Opus 4.7 d'une exécution en direct — figée ici pour que vous puissiez voir le produit sans consommer de crédits API.",
    ctaRunYourOwn: "Lancez la vôtre",
    deepDiveDisabled: "L'exploration est désactivée sur les exemples — lancez votre propre analyse pour chatter avec l'agent.",
    footerNote: "Analyse-exemple — pré-calculée. Lancez la vôtre depuis l'accueil pour un rapport frais.",
  },
  conflicts: {
    title: "Conflits inter-marchés détectés",
    subtitle: "Divergences concrètes entre marchés cibles à concilier.",
    impactLabel: "Impact :",
    types: {
      hs_code: "Code SH",
      labeling: "Étiquetage",
      certification: "Certification",
      documentation: "Documents",
      tariff: "Tarif",
      other: "Autre",
    },
  },
};
