import type { Translations } from "./en";

export const pt: Translations = {
  locale: "pt",
  dir: "ltr",
  languageName: "Português",
  flag: "🇵🇹",

  hero: {
    livePill: "Ao vivo · Construído com Opus 4.7",
    titleLine1: "Envie através de fronteiras,",
    titleLine2: "sem adivinhar",
    subtitle:
      "Transforme uma descrição de produto num relatório de conformidade pronto para exportação para até 5 mercados — em menos de um minuto, por menos de um cêntimo.",
  },

  features: {
    eyebrow: "O que está dentro",
    heading: "Uma bancada completa de conformidade, criada para vendedores globais.",
    sub: "Cada análise baseia-se em quinze capacidades trabalhando em conjunto — desde agentes paralelos até exportações PDF verificáveis.",
    category: {
      core: "Núcleo",
      compliance: "Conformidade",
      shipping: "Envio",
      experience: "Experiência",
      reach: "Alcance",
    },
    items: {
      parallel: {
        title: "Agentes-país paralelos",
        body: "Um agente por destino disparado simultaneamente. Aceleração 5× sobre revisão sequencial — 60 segundos para trabalho que levava dias.",
      },
      harmonizer: {
        title: "Harmonizador ponta-a-ponta",
        body: "Um agente dedicado sintetiza todos os relatórios-país num único resumo executivo com rotas, classificação e próximos passos concretos.",
      },
      thinking: {
        title: "Raciocínio estendido adaptativo",
        body: "Opus 4.7 decide quando o raciocínio profundo é justificado — trade-offs difíceis recebem o cálculo necessário, os fáceis não desperdiçam tokens.",
      },
      citations: {
        title: "Citações regulatórias",
        body: "Cada achado liga a uma fonte primária — 19 CFR, regulamentos UE, MoHAP, ESMA, JIS — verificável por qualquer revisor.",
      },
      geopolitics: {
        title: "Consciência geopolítica ao vivo",
        body: "Disrupções mar Vermelho, prémios Hormuz, espaço aéreo russo, caminho-de-ferro Belt & Road, hubs EAU — tudo integrado em cada recomendação.",
      },
      ranking: {
        title: "Classificação multi-critérios",
        body: "Custo final (0,40), tempo-ao-mercado (0,35), risco de conformidade (0,25). A matemática é mostrada, não escondida — pode confiar ou contestar.",
      },
      routes: {
        title: "Recomendações de rotas",
        body: "Rotas primárias e de backup por ar, mar, caminho-de-ferro e TIR — com tempo de trânsito e faixas de custo indicativas para cada destino.",
      },
      checklist: {
        title: "Lista de documentos por rota",
        body: "A.TR, B/L, AWB, CMR, relatórios REACH, declarações UKCA / CE / JIS / ESMA, registos OFAC/BIS — nada fica esquecido.",
      },
      landedCost: {
        title: "Estimativas de custo final",
        body: "FOB, frete, seguro, taxas, custos de conformidade — desagregados por país para saber exatamente onde vai o dinheiro.",
      },
      deepDive: {
        title: "Exploração profunda interativa",
        body: "Faça perguntas de seguimento por país. Cada sessão retém o contexto regulatório completo — respostas ficam fundamentadas, nunca genéricas.",
      },
      telemetry: {
        title: "Telemetria ao vivo",
        body: "Server-sent events transmitem o progresso de cada agente — bandeira do país, segundos decorridos, tokens consumidos, nível de risco — em tempo real.",
      },
      humanLoop: {
        title: "Humano no ciclo",
        body: "Claude propõe. Você decide. Cada recomendação é apresentada como opção com trade-offs, nunca como veredito de caixa preta.",
      },
      languages: {
        title: "Suporte em 16 idiomas",
        body: "UI completa, saída de análise e renderização PDF em 16 idiomas — incluindo CJK, árabe e devanagari com moldagem de fontes correta.",
      },
      pdf: {
        title: "Exportação PDF verificável",
        body: "Um clique produz um relatório profissional com verificação QR, secção completa de fontes regulatórias e tipografia pronta para júri.",
      },
      costTransparency: {
        title: "Transparência de custos",
        body: "Cada execução mostra uso real de tokens e custo em dólares — sem margens escondidas, sem preços misteriosos, apenas recibos honestos.",
      },
    },
  },

  metrics: {
    perAnalysis: "por análise",
    perRun: "por execução",
    parallelAgents: "agentes paralelos",
    languages: "idiomas",
  },

  howItWorks: {
    eyebrow: "Como funciona",
    heading: "O comércio transfronteiriço tem mais de 100 regras por produto. Revelamo-las em 60 segundos.",
    sub: "Um breve passeio pelo que acontece entre premir \"Analisar\" e obter um relatório assinado e verificável.",
    contextHeading: "Porque a conformidade transfronteiriça é difícil hoje",
    contextP1: "Cada produto que atravessa uma fronteira enfrenta uma rede de regulamentações: tarifas, classificação SH, triagem de sanções, regras de rotulagem, limites químicos REACH/RoHS, leis de embalagem, declarações de trabalho forçado e licenças de importação. Um relatório REACH em falta retém um contentor em Hamburgo durante semanas. Um código SH errado na alfândega dos EUA pode significar 25% de taxa em vez de 8%.",
    contextP2: "Despachantes aduaneiros tradicionais cobram 500-2.000 $ por remessa e levam 5-15 dias por mercado. Para um vendedor visando cinco países, são semanas de coordenação e taxas de cinco dígitos — antes de uma única caixa ser embalada.",
    pipelineHeading: "O pipeline de quatro passos",
    steps: {
      describe: {
        title: "Descrever",
        body: "Detalhes do produto, país de origem, mercados-alvo. Linguagem natural — sem códigos SH ou terminologia aduaneira necessária.",
      },
      parallel: {
        title: "Análise paralela",
        body: "N agentes Opus 4.7 disparam simultaneamente — um por mercado-alvo — cada um extraindo regulamentações, tarifas e listas de sanções específicas do seu país.",
      },
      harmonize: {
        title: "Harmonizar",
        body: "Um agente harmonizador sintetiza todos os relatórios num único resumo executivo com rotas de envio, estimativas de custo final e recomendações classificadas por risco.",
      },
      deliver: {
        title: "Entregar",
        body: "Relatório ao vivo com chat de exploração profunda interativo, lista de documentos por rota e exportação PDF verificável — pronto para advogado, despachante ou cliente.",
      },
    },
    impactHeading: "Porque isto importa",
    impactLead: "A conformidade não é um problema de papelada — é um problema de acesso ao mercado. Errar significa ser excluído das maiores economias do mundo.",
    impacts: {
      smallExporter: {
        title: "Pequenos exportadores ficam locais",
        body: "Um artesão na Turquia não pode pagar 1.500 $ × 5 mercados para contratar um despachante por destino. Vendem apenas domesticamente e perdem crescimento.",
      },
      bigExporter: {
        title: "Grandes exportadores queimam semanas em coordenação",
        body: "Cinco países significam cinco despachantes, cinco threads de email, cinco cronogramas. O que deveria ser uma decisão única torna-se um mês de trabalho operacional.",
      },
      mistakeCost: {
        title: "Cada erro é caro",
        body: "Código SH errado, relatório em falta, triagem de sanções perdida — cada um significa atrasos alfandegários, multas, inventário estragado, dano reputacional.",
      },
      access: {
        title: "A IA fecha a lacuna",
        body: "Mesma análise, 0,42 $ em vez de 7.500 $. 60 segundos em vez de semanas. Expertise de exportação subitamente disponível para quem tenha um produto e uma ideia.",
      },
    },
    bottomLineLabel: "Em resumo:",
    bottomLine: "Abrir um novo mercado deve ser uma decisão, não um projeto. MasterBorder torna-o decisão.",
  },

  form: {
    cardTitle: "Analisar um produto",
    cardDescription:
      "Insira os detalhes do seu produto e escolha mercados-alvo, ou experimente uma amostra para ver como fica o resultado.",
    trySample: "Experimentar amostra",
    seeExample: "Ver exemplo",
    sampleProductName: "Carteira de couro",
    sampleProductDescription: "Carteira bifold de couro de vaca genuíno, curtida a crómio, 4 ranhuras para cartões e bolso para moedas. Feita à mão com técnicas tradicionais.",
    quantityLabel: "Quantidade",
    quantityPlaceholder: "ex., 50",
    unitLabel: "Unidade",
    unitPieces: "peças",
    unitKg: "kg",
    unitGrams: "gramas",
    unitLiters: "litros",
    unitMeters: "metros",
    unitSqm: "m²",
    unitPairs: "pares",
    unitDozens: "dúzias",
    unitBoxes: "caixas",
    unitTons: "toneladas",
    unitPounds: "libras (lbs)",
    unitOunces: "onças (oz)",
    unitGallons: "galões (US)",
    unitFeet: "pés (ft)",
    unitInches: "polegadas (in)",
    unitCubicFeet: "pés cúbicos (ft³)",
    productNameLabel: "Nome do produto",
    productNamePlaceholder: "ex., carteira de couro",
    descriptionLabel: "Descrição",
    descriptionPlaceholder:
      "Materiais, fabrico, tratamento, etc. (ex., 'Couro de vaca genuíno, curtido a crómio, feito à mão')",
    categoryLabel: "Categoria",
    categoryOptional: "(opcional)",
    categoryPlaceholder: "ex., acessórios",
    valueLabel: "Valor por unidade (USD)",
    valuePlaceholder: "45,00",
    originLabel: "País de origem",
    targetLabel: "Países-alvo",
    targetHint: "Escolha um ou mais mercados para analisar —",
    selectedLabel: "selecionado(s)",
    routeRiskTitle: "Incluir análise de risco de rota",
    routeRiskBody:
      "Considera zonas de conflito ativas, disrupções de estreitos e riscos de vias marítimas (recomendado).",
    analyzeButton: "Analisar",
    analyzingMarket: "A analisar {count} mercado em paralelo…",
    analyzingMarkets: "A analisar {count} mercados em paralelo…",
    dispatchingHint:
      "Opus 4.7 está a despachar Agentes-País em paralelo. Isto leva tipicamente 25-35 segundos.",
    progressStep1: "A despachar Agentes-País…",
    progressStep2: "A verificar tarifas e códigos SH…",
    progressStep3: "A rever listas de sanções…",
    progressStep4: "A analisar regras de rotulagem e embalagem…",
    progressStep5: "A cruzar regulamentações…",
    progressStep6: "A harmonizar resultados…",
    errorMissing: "Por favor insira nome e descrição do produto.",
    errorNoCountry: "Selecione pelo menos um país-alvo.",
    errorGeneric: "Análise falhou. Tente novamente.",
    errorRateLimit: "Limite diário atingido. Tente novamente em 24 horas.",
  },

  results: {
    backToAnalysis: "Nova análise",
    analyzedFor: "Analisado para",
    origin: "Origem:",
    executiveSummary: "Resumo Executivo",
    executiveSummaryDescription:
      "Análise harmonizada em {count} mercados · Recomendação com humano no ciclo",
    countryReports: "Relatórios por País",
    complianceFindings: "Achados de Conformidade",
    recommendedActions: "Ações Recomendadas",
    deepDive: "Exploração profunda em {country}",
    downloadPdf: "Descarregar PDF",
    jobId: "ID da Tarefa:",
    agentsFooter: "Agentes",
    notFound: "Análise não encontrada. Pode ter expirado — execute uma nova análise.",
    expired: "Análise expirada",
    expiredBody: "Esta análise não está mais no cache — mantemos as tarefas por 24 horas. Execute uma nova análise para ver resultados atualizados.",
    runNewAnalysis: "Executar nova análise",
    loading: "A carregar análise…",
  },

  deepDive: {
    backToResults: "Voltar aos resultados",
    subtitle: "Exploração de conformidade interativa · {country}",
    placeholder: "Faça uma pergunta de seguimento (ex., opções de frete, seleção de laboratório, cronograma)…",
    send: "Enviar",
    downloadPdf: "Descarregar PDF",
    thinking: "A pensar…",
    errorSend: "Não foi possível enviar. Tente novamente.",
  },

  risk: {
    low: "Baixo",
    medium: "Médio",
    high: "Alto",
    blocked: "Bloqueado",
    suffix: "risco",
  },

  footer: {
    license: "Licença MIT · Construído com Claude Code + Opus 4.7 · O agente propõe, você decide.",
    servedAnalyses: "{analyses} {analysesNoun} servidas para {users} {usersNoun}",
    analysesSingular: "análise",
    analysesPlural: "análises",
    usersSingular: "utilizador único",
    usersPlural: "utilizadores únicos",
    todaySuffix: "hoje",
    topMarket: "mercado mais analisado:",
  },

  nav: {
    languageLabel: "Idioma",
    howItWorks: "Como funciona",
    example: "Exemplo",
    github: "GitHub",
    trySample: "Experimentar",
  },

  countries: {
    US: "Estados Unidos",
    DE: "Alemanha",
    GB: "Reino Unido",
    TR: "Turquia",
    JP: "Japão",
  },

  pdf: {
    downloadPdf: "Descarregar PDF",
    generatingPdf: "A gerar PDF…",
    pdfReady: "PDF pronto",
  },

  deepDiveCta: {
    headline: "Aprofunde-se neste mercado",
    body: "Plano semanal de entrada no mercado — documentos, laboratórios, estimativas de custos, cronogramas. Alimentado por Opus 4.7.",
    button: "Iniciar exploração",
  },

  deepDiveHero: {
    eyebrow: "Análise aprofundada interativa",
    title: "Quer um plano semana a semana?",
    body: "Cada cartão de país abaixo abre um chat multi-turno com Opus 4.7. Contexto regulamentar completo preservado — pergunte qualquer coisa, em qualquer idioma.",
    bullet1: "Cronograma semanal de entrada no mercado",
    bullet2: "Lista de documentos e laboratórios com custos",
    bullet3: "Perguntas e respostas — espelha seu idioma",
    scrollCta: "Escolha um mercado abaixo",
  },

  roi: {
    headline: "Esta análise poupou-lhe {savings} e ~{days} dias",
    masterborderLabel: "MasterBorder",
    brokerLabel: "Despachante tradicional",
    vs: "vs",
    lowerCost: "custo inferior",
    faster: "mais rápido",
    disclaimer: "Referência despachante: típico da indústria 500-2.000 $ / 5-15 dias por remessa.",
  },

  telemetry: {
    headline: "Telemetria de agente ao vivo",
    elapsed: "Decorrido",
    progress: "Progresso",
    tokensSoFar: "tokens até agora",
    tokensAbbr: "tokens",
    queued: "em fila",
    risk: "Risco",
    failed: "falhou",
    harmonizer: "Agente Harmonizador",
    waiting: "à espera de agentes",
    synthesizing: "a sintetizar resumo executivo…",
    done: "concluído",
  },

  example: {
    bannerTitle: "Esta é uma análise-exemplo pré-calculada",
    bannerBody: "Saída real Opus 4.7 de uma execução ao vivo — congelada aqui para ver o produto sem consumir créditos API.",
    ctaRunYourOwn: "Execute a sua",
    deepDiveDisabled: "Exploração profunda desativada em exemplos — execute a sua análise para conversar com o agente.",
    footerNote: "Análise-exemplo — pré-calculada. Execute a sua a partir do início para um relatório atualizado.",
  },
  conflicts: {
    title: "Conflitos entre mercados detectados",
    subtitle: "Divergências concretas entre mercados-alvo que precisa conciliar.",
    impactLabel: "Impacto:",
    types: {
      hs_code: "Código SH",
      labeling: "Rotulagem",
      certification: "Certificação",
      documentation: "Documentos",
      tariff: "Tarifa",
      other: "Outro",
    },
  },
  findings: {
    verify: "Verificar",
    confidence: {
      high: "Alta confiança",
      medium: "Confiança média",
      low: "Baixa confiança",
    },
    confidenceTooltip: {
      high: "Apoiado por citação regulamentar explícita ou URL de fonte oficial.",
      medium: "Refere prática estabelecida ou fonte secundária respeitada.",
      low: "Inferência sem autoridade citada — verifique antes de agir.",
    },
  },
};
