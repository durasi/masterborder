import type { Translations } from "./en";

export const es: Translations = {
  locale: "es",
  dir: "ltr",
  languageName: "Español",
  flag: "🇪🇸",

  hero: {
    livePill: "En vivo · Construido con Opus 4.7",
    titleLine1: "Envíe a través de fronteras,",
    titleLine2: "sin conjeturas",
    subtitle:
      "Convierta una descripción de producto en un informe de cumplimiento listo para exportar a hasta 5 mercados — en menos de un minuto, por menos de un centavo.",
  },

  features: {
    eyebrow: "Qué hay dentro",
    heading: "Un taller completo de cumplimiento, diseñado para vendedores globales.",
    sub: "Cada análisis se apoya en quince capacidades trabajando juntas — desde agentes paralelos hasta exportaciones PDF verificables.",
    category: {
      core: "Núcleo",
      compliance: "Cumplimiento",
      shipping: "Envío",
      experience: "Experiencia",
      reach: "Alcance",
    },
    items: {
      parallel: {
        title: "Agentes-país paralelos",
        body: "Un agente por destino disparado simultáneamente. Aceleración 5× sobre revisión secuencial — 60 segundos para trabajo que tomaba días.",
      },
      harmonizer: {
        title: "Armonizador de extremo a extremo",
        body: "Un agente dedicado sintetiza todos los informes-país en un único resumen ejecutivo con rutas, clasificación y próximos pasos concretos.",
      },
      thinking: {
        title: "Razonamiento extendido adaptativo",
        body: "Opus 4.7 decide cuándo se justifica el razonamiento profundo — las compensaciones difíciles obtienen el cómputo necesario, las fáciles no desperdician tokens.",
      },
      citations: {
        title: "Citas regulatorias",
        body: "Cada hallazgo enlaza a una fuente primaria — 19 CFR, reglamentos UE, MoHAP, ESMA, JIS — verificable por cualquier revisor.",
      },
      geopolitics: {
        title: "Conciencia geopolítica en vivo",
        body: "Disrupciones mar Rojo, primas Hormuz, espacio aéreo ruso, ferrocarril Belt & Road, hubs EAU — todo integrado en cada recomendación.",
      },
      ranking: {
        title: "Clasificación multicriterio",
        body: "Costo puesto (0,40), tiempo al mercado (0,35), riesgo de cumplimiento (0,25). Las matemáticas se muestran, no se ocultan — puede confiar o cuestionarlas.",
      },
      routes: {
        title: "Recomendaciones de rutas",
        body: "Rutas primarias y de respaldo por aire, mar, ferrocarril y TIR — con tiempo de tránsito y bandas de costo indicativas para cada destino.",
      },
      checklist: {
        title: "Lista de documentos por ruta",
        body: "A.TR, B/L, AWB, CMR, informes REACH, declaraciones UKCA / CE / JIS / ESMA, registros OFAC/BIS — nada se olvida.",
      },
      landedCost: {
        title: "Estimaciones de costo puesto",
        body: "FOB, flete, seguro, aranceles, sobrecostos de cumplimiento — desglosados por país para saber exactamente adónde va el dinero.",
      },
      deepDive: {
        title: "Exploración profunda interactiva",
        body: "Haga preguntas de seguimiento por país. Cada sesión retiene el contexto regulatorio completo — las respuestas siguen fundamentadas, nunca genéricas.",
      },
      telemetry: {
        title: "Telemetría en vivo",
        body: "Server-sent events transmiten el progreso de cada agente — bandera del país, segundos transcurridos, tokens consumidos, nivel de riesgo — en tiempo real.",
      },
      humanLoop: {
        title: "Humano en el bucle",
        body: "Claude propone. Usted decide. Cada recomendación se presenta como una opción con compensaciones, nunca como un veredicto de caja negra.",
      },
      languages: {
        title: "Soporte en 16 idiomas",
        body: "UI completa, salida de análisis y renderizado PDF en 16 idiomas — incluidos CJK, árabe y devanagari con correcta representación tipográfica.",
      },
      pdf: {
        title: "Exportación PDF verificable",
        body: "Un clic produce un informe profesional con verificación QR, sección completa de fuentes regulatorias y tipografía apta para jurado.",
      },
      costTransparency: {
        title: "Transparencia de costos",
        body: "Cada ejecución muestra el uso real de tokens y el costo en dólares — sin recargos ocultos, sin precios misteriosos, solo recibos honestos.",
      },
    },
  },

  metrics: {
    perAnalysis: "por análisis",
    perRun: "por ejecución",
    parallelAgents: "agentes paralelos",
    languages: "idiomas",
  },

  howItWorks: {
    eyebrow: "Cómo funciona",
    heading: "El comercio transfronterizo tiene 100+ reglas por producto. Las sacamos a la luz en 60 segundos.",
    sub: "Un breve recorrido por lo que ocurre entre pulsar \"Analizar\" y obtener un informe firmado y verificable.",
    contextHeading: "Por qué el cumplimiento transfronterizo es difícil hoy",
    contextP1: "Cada producto que cruza una frontera enfrenta una maraña de regulaciones: aranceles, clasificación SA, cribado de sanciones, reglas de etiquetado, límites químicos REACH/RoHS, leyes de embalaje, declaraciones de trabajo forzoso y licencias de importación. Un informe REACH faltante detiene un contenedor en Hamburgo durante semanas. Un código SA equivocado en aduana EE.UU. puede significar 25% de arancel en vez de 8%.",
    contextP2: "Los agentes aduaneros tradicionales cobran $500–$2.000 por envío y toman 5–15 días por mercado. Para un vendedor que apunta a cinco países, son semanas de coordinación y tarifas de cinco cifras — antes de empacar una sola caja.",
    pipelineHeading: "El pipeline de cuatro pasos",
    steps: {
      describe: {
        title: "Describir",
        body: "Detalles del producto, país de origen, mercados objetivo. Lenguaje natural — sin códigos SA ni terminología aduanera requerida.",
      },
      parallel: {
        title: "Análisis paralelo",
        body: "N agentes Opus 4.7 se activan simultáneamente — uno por mercado objetivo — cada uno extrae regulaciones, aranceles y listas de sanciones específicas de su país.",
      },
      harmonize: {
        title: "Armonizar",
        body: "Un agente armonizador sintetiza todos los informes en un resumen ejecutivo único con rutas de envío, estimaciones de costo puesto y recomendaciones clasificadas por riesgo.",
      },
      deliver: {
        title: "Entregar",
        body: "Informe en vivo con chat de exploración profunda interactivo, lista de documentos por ruta y exportación PDF verificable — listo para abogado, agente o cliente.",
      },
    },
    impactHeading: "Por qué esto importa",
    impactLead: "El cumplimiento no es un problema de papeleo — es un problema de acceso al mercado. Equivocarse significa ser excluido de las mayores economías del mundo.",
    impacts: {
      smallExporter: {
        title: "Los pequeños exportadores se quedan locales",
        body: "Un artesano en Turquía no puede permitirse $1.500 × 5 mercados para contratar un agente por destino. Solo venden domésticamente y dejan el crecimiento sobre la mesa.",
      },
      bigExporter: {
        title: "Los grandes exportadores pierden semanas en coordinación",
        body: "Cinco países significan cinco agentes, cinco hilos de correo, cinco cronogramas. Lo que debería ser una decisión única se convierte en un mes de trabajo operativo.",
      },
      mistakeCost: {
        title: "Cada error es caro",
        body: "Un código SA equivocado, un informe faltante, una sanción no detectada — cada uno significa retrasos en aduana, multas, inventario dañado, daño reputacional.",
      },
      access: {
        title: "La IA cierra la brecha",
        body: "Mismo análisis, $0,42 en vez de $7.500. 60 segundos en vez de semanas. Experiencia de exportación de repente disponible para cualquiera con un producto y una idea.",
      },
    },
    bottomLineLabel: "En resumen:",
    bottomLine: "Abrir un nuevo mercado debería ser una decisión, no un proyecto. MasterBorder lo convierte en decisión.",
  },

  form: {
    cardTitle: "Analizar un producto",
    cardDescription:
      "Ingrese los detalles de su producto y elija mercados objetivo, o pruebe una muestra para ver cómo se ve el resultado.",
    trySample: "Probar muestra",
    seeExample: "Ver ejemplo",
    sampleProductName: "Billetera de cuero",
    sampleProductDescription: "Billetera bifold de cuero de vacuno genuino, curtido al cromo, 4 ranuras para tarjetas y bolsillo para monedas. Artesanal con técnicas tradicionales.",
    quantityLabel: "Cantidad",
    quantityPlaceholder: "ej., 50",
    unitLabel: "Unidad",
    unitPieces: "piezas",
    unitKg: "kg",
    unitGrams: "gramos",
    unitLiters: "litros",
    unitMeters: "metros",
    unitSqm: "m²",
    unitPairs: "pares",
    unitDozens: "docenas",
    unitBoxes: "cajas",
    unitTons: "toneladas",
    unitPounds: "libras (lbs)",
    unitOunces: "onzas (oz)",
    unitGallons: "galones (US)",
    unitFeet: "pies (ft)",
    unitInches: "pulgadas (in)",
    unitCubicFeet: "pies cúbicos (ft³)",
    productNameLabel: "Nombre del producto",
    productNamePlaceholder: "ej., billetera de cuero",
    descriptionLabel: "Descripción",
    descriptionPlaceholder:
      "Materiales, fabricación, tratamiento, etc. (ej., 'Cuero de vacuno genuino, curtido al cromo, artesanal')",
    categoryLabel: "Categoría",
    categoryOptional: "(opcional)",
    categoryPlaceholder: "ej., accesorios",
    valueLabel: "Valor por unidad (USD)",
    valuePlaceholder: "45,00",
    originLabel: "País de origen",
    targetLabel: "Países objetivo",
    targetHint: "Elija uno o más mercados a analizar —",
    selectedLabel: "seleccionado(s)",
    routeRiskTitle: "Incluir análisis de riesgo de ruta",
    routeRiskBody:
      "Considera zonas de conflicto activas, disrupciones de estrechos y riesgos de vías marítimas (recomendado).",
    analyzeButton: "Analizar",
    analyzingMarket: "Analizando {count} mercado en paralelo…",
    analyzingMarkets: "Analizando {count} mercados en paralelo…",
    dispatchingHint:
      "Opus 4.7 está despachando Agentes-País en paralelo. Esto suele tomar 25–35 segundos.",
    progressStep1: "Despachando Agentes-País…",
    progressStep2: "Verificando aranceles y códigos SA…",
    progressStep3: "Revisando listas de sanciones…",
    progressStep4: "Analizando reglas de etiquetado y empaque…",
    progressStep5: "Cruzando regulaciones…",
    progressStep6: "Armonizando resultados…",
    errorMissing: "Por favor ingrese nombre y descripción del producto.",
    errorNoCountry: "Seleccione al menos un país objetivo.",
    errorGeneric: "Análisis fallido. Por favor intente de nuevo.",
    errorRateLimit: "Límite diario alcanzado. Por favor intente en 24 horas.",
  },

  results: {
    backToAnalysis: "← Nuevo análisis",
    analyzedFor: "Analizado para",
    origin: "Origen:",
    executiveSummary: "Resumen Ejecutivo",
    executiveSummaryDescription:
      "Análisis armonizado en {count} mercados · Recomendación con humano en el bucle",
    countryReports: "Informes por País",
    complianceFindings: "Hallazgos de Cumplimiento",
    recommendedActions: "Acciones Recomendadas",
    deepDive: "Exploración profunda en {country}",
    downloadPdf: "Descargar PDF",
    jobId: "ID del Trabajo:",
    notFound: "Análisis no encontrado. Puede haber expirado — ejecute uno nuevo.",
    loading: "Cargando análisis…",
  },

  deepDive: {
    backToResults: "← Volver a resultados",
    subtitle: "Exploración de cumplimiento interactiva · {country}",
    placeholder: "Haga una pregunta de seguimiento (ej., opciones de flete, selección de laboratorio, cronograma)…",
    send: "Enviar",
    downloadPdf: "Descargar PDF",
    thinking: "Pensando…",
    errorSend: "No se pudo enviar. Intente de nuevo.",
  },

  risk: {
    low: "Bajo",
    medium: "Medio",
    high: "Alto",
    blocked: "Bloqueado",
    suffix: "riesgo",
  },

  footer: {
    license: "Licencia MIT · Construido con Claude Code + Opus 4.7 · El agente propone, usted decide.",
    servedAnalyses: "Servidos {analyses} {analysesNoun} para {users} {usersNoun}",
    analysesSingular: "análisis",
    analysesPlural: "análisis",
    usersSingular: "usuario único",
    usersPlural: "usuarios únicos",
    todaySuffix: "hoy",
    topMarket: "mercado más analizado:",
  },

  nav: {
    languageLabel: "Idioma",
    howItWorks: "Cómo funciona",
    example: "Ejemplo",
    github: "GitHub",
    trySample: "Probar muestra",
  },

  countries: {
    US: "Estados Unidos",
    DE: "Alemania",
    GB: "Reino Unido",
    TR: "Turquía",
    JP: "Japón",
  },

  pdf: {
    downloadPdf: "Descargar PDF",
    generatingPdf: "Generando PDF…",
    pdfReady: "PDF listo",
  },

  deepDiveCta: {
    headline: "Profundice en este mercado",
    body: "Plan semana a semana de entrada al mercado — documentos, laboratorios, estimaciones de costos, cronogramas. Impulsado por Opus 4.7.",
    button: "Iniciar exploración",
  },

  roi: {
    headline: "Este análisis le ahorró {savings} y ~{days} días",
    masterborderLabel: "MasterBorder",
    brokerLabel: "Agente tradicional",
    vs: "vs",
    lowerCost: "menor costo",
    faster: "más rápido",
    disclaimer: "Referencia agente: típico del sector $500–$2.000 / 5–15 días por envío.",
  },

  telemetry: {
    headline: "Telemetría de agente en vivo",
    elapsed: "Transcurrido",
    progress: "Progreso",
    tokensSoFar: "tokens hasta ahora",
    tokensAbbr: "tokens",
    queued: "en cola",
    risk: "Riesgo",
    failed: "falló",
    harmonizer: "Agente Armonizador",
    waiting: "esperando agentes",
    synthesizing: "sintetizando resumen ejecutivo…",
    done: "listo",
  },

  example: {
    bannerTitle: "Este es un análisis-ejemplo pre-calculado",
    bannerBody: "Salida real de Opus 4.7 de una ejecución en vivo — congelada aquí para que pueda ver el producto sin consumir créditos API.",
    ctaRunYourOwn: "Ejecute el suyo",
    deepDiveDisabled: "La exploración profunda está deshabilitada en ejemplos — ejecute su propio análisis para chatear con el agente.",
    footerNote: "Análisis-ejemplo — pre-calculado. Ejecute el suyo desde inicio para un informe fresco.",
  },
};
