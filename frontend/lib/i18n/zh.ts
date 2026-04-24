import type { Translations } from "./en";

export const zh: Translations = {
  locale: "zh",
  dir: "ltr",
  languageName: "中文",
  flag: "🇨🇳",

  hero: {
    livePill: "实时 · 由 Opus 4.7 构建",
    titleLine1: "跨境发货,",
    titleLine2: "无需猜测",
    subtitle:
      "将产品描述转化为最多5个市场的出口合规报告 — 不到一分钟,成本不到一美分。",
  },

  features: {
    eyebrow: "内置功能",
    heading: "为全球卖家量身打造的完整合规工作台。",
    sub: "每次分析都依托十五项协同运作的能力 — 从并行代理到可验证的PDF导出。",
    category: {
      core: "核心",
      compliance: "合规",
      shipping: "运输",
      experience: "体验",
      reach: "覆盖",
    },
    items: {
      parallel: {
        title: "并行国家代理",
        body: "每个目的地一个代理同时启动。相比顺序审查加速5倍 — 过去需要数天的工作如今60秒完成。",
      },
      harmonizer: {
        title: "端到端协调器",
        body: "专用代理将所有国家报告综合为单一执行摘要,包含路线、排名和具体下一步。",
      },
      thinking: {
        title: "自适应扩展思考",
        body: "Opus 4.7 决定何时需要深度推理 — 困难权衡获得所需算力,简单任务不浪费令牌。",
      },
      citations: {
        title: "监管引用",
        body: "每个发现都链接到主要来源 — 19 CFR、欧盟法规、MoHAP、ESMA、JIS — 任何审查者都可验证。",
      },
      geopolitics: {
        title: "实时地缘政治感知",
        body: "红海中断、霍尔木兹溢价、俄罗斯领空、一带一路铁路、阿联酋中转枢纽 — 全部融入每项建议。",
      },
      ranking: {
        title: "多标准排名",
        body: "到岸成本(0.40)、上市时间(0.35)、合规风险(0.25)。算法公开不隐藏 — 您可以信任或质疑。",
      },
      routes: {
        title: "路线建议",
        body: "空运、海运、铁路和TIR的主要和备用路线 — 每个目的地附有运输时间和指示性成本区间。",
      },
      checklist: {
        title: "按路线的单据清单",
        body: "A.TR、B/L、AWB、CMR、REACH测试报告、UKCA / CE / JIS / ESMA 声明、OFAC/BIS筛查记录 — 不遗漏任何事项。",
      },
      landedCost: {
        title: "到岸成本估算",
        body: "FOB、运费、保险、关税、合规费用 — 按国家分解,让您清楚知道资金流向。",
      },
      deepDive: {
        title: "交互式深度分析",
        body: "按国家提出跟进问题。每个会话保留完整的监管上下文 — 答案扎实,绝不泛泛而谈。",
      },
      telemetry: {
        title: "实时遥测叠加",
        body: "服务器推送事件实时传送每个代理的进度 — 国家旗帜、经过秒数、消耗令牌、风险级别。",
      },
      humanLoop: {
        title: "人机协同",
        body: "Claude提议。您决定。每项建议都作为带有权衡的选项呈现,绝非黑箱判决。",
      },
      languages: {
        title: "16种语言支持",
        body: "16种语言的完整UI、分析输出和PDF渲染 — 包括CJK、阿拉伯语和梵文的正确字体渲染。",
      },
      pdf: {
        title: "可验证的PDF导出",
        body: "一键生成带QR验证、完整监管来源章节和评审级排版的专业报告。",
      },
      costTransparency: {
        title: "成本透明",
        body: "每次运行显示真实的令牌使用量和美元成本 — 无隐藏加价、无神秘定价,只有诚实的使用凭证。",
      },
    },
  },

  metrics: {
    perAnalysis: "每次分析",
    perRun: "每次运行",
    parallelAgents: "并行代理",
    languages: "种语言",
  },

  howItWorks: {
    eyebrow: "工作原理",
    heading: "跨境贸易每件产品有100多条规则。我们在60秒内呈现。",
    sub: "从点击\"分析\"到获得已签名、可验证的报告之间发生了什么的简短之旅。",
    contextHeading: "为什么当今跨境合规如此困难",
    contextP1: "每件跨越边境的产品都面临错综复杂的法规:关税、HS分类、制裁筛查、标签规则、REACH/RoHS化学品限制、包装法、强迫劳动声明和进口许可。缺失的REACH测试报告会让集装箱在汉堡滞留数周。美国海关错误的HS代码可能意味着25%而非8%的关税。",
    contextP2: "传统报关代理每批货物收费500–2,000美元,每个市场需要5–15天。对于瞄准五个国家的卖家来说,这意味着数周的协调和五位数的费用 — 还没开始打包一个箱子。",
    pipelineHeading: "四步流水线",
    steps: {
      describe: {
        title: "描述",
        body: "产品详情、原产国、目标市场。自然语言 — 无需HS代码或海关术语。",
      },
      parallel: {
        title: "并行分析",
        body: "N个Opus 4.7代理同时启动 — 每个目标市场一个 — 每个都拉取其国家特定的法规、关税和制裁清单。",
      },
      harmonize: {
        title: "协调",
        body: "协调器代理将所有报告综合为单一执行摘要,包含运输路线、到岸成本估算和风险排名建议。",
      },
      deliver: {
        title: "交付",
        body: "实时报告附带交互式深度聊天、按路线单据清单和可验证PDF导出 — 可直接提供给律师、代理或客户。",
      },
    },
    impactHeading: "为什么这很重要",
    impactLead: "合规不是文书问题 — 而是市场准入问题。做错意味着被世界最大经济体拒之门外。",
    impacts: {
      smallExporter: {
        title: "小型出口商只能留守本地",
        body: "土耳其的手艺人负担不起1,500美元 × 5个市场来为每个目的地雇用代理。他们只在国内销售,错失增长。",
      },
      bigExporter: {
        title: "大型出口商在协调上耗费数周",
        body: "五个国家意味着五个代理、五条邮件线程、五个时间表。本应是单一决策的事变成了一个月的运营工作。",
      },
      mistakeCost: {
        title: "每个错误都代价昂贵",
        body: "错误的HS代码、缺失的测试报告、漏掉的制裁筛查 — 每个都意味着海关延误、罚款、库存损坏、声誉损害。",
      },
      access: {
        title: "AI缩小差距",
        body: "相同分析,0.42美元而非7,500美元。60秒而非数周。出口专业知识突然对任何有产品和想法的人开放。",
      },
    },
    bottomLineLabel: "核心观点:",
    bottomLine: "开拓新市场应该是一个决定,而非一个项目。MasterBorder让它成为决定。",
  },

  form: {
    cardTitle: "分析产品",
    cardDescription:
      "输入产品详情并选择目标市场,或尝试示例查看输出效果。",
    trySample: "尝试示例",
    seeExample: "查看示例",
    sampleProductName: "皮革钱包",
    sampleProductDescription: "真牛皮双折钱包,铬鞣制,4个卡槽和零钱袋。采用传统皮革工艺手工制作。",
    quantityLabel: "数量",
    quantityPlaceholder: "例如:50",
    unitLabel: "单位",
    unitPieces: "件",
    unitKg: "千克",
    unitGrams: "克",
    unitLiters: "升",
    unitMeters: "米",
    unitSqm: "平方米",
    unitPairs: "双",
    unitDozens: "打",
    unitBoxes: "箱",
    unitTons: "吨",
    unitPounds: "磅(lbs)",
    unitOunces: "盎司(oz)",
    unitGallons: "加仑(US)",
    unitFeet: "英尺(ft)",
    unitInches: "英寸(in)",
    unitCubicFeet: "立方英尺(ft³)",
    productNameLabel: "产品名称",
    productNamePlaceholder: "例如:皮革钱包",
    descriptionLabel: "描述",
    descriptionPlaceholder:
      "材料、工艺、处理等(例如:'真牛皮、铬鞣制、手工制作')",
    categoryLabel: "类别",
    categoryOptional: "(可选)",
    categoryPlaceholder: "例如:配饰",
    valueLabel: "单位价值(USD)",
    valuePlaceholder: "45.00",
    originLabel: "原产国",
    targetLabel: "目标国家",
    targetHint: "选择一个或多个要分析的市场 —",
    selectedLabel: "已选",
    routeRiskTitle: "包含路线风险分析",
    routeRiskBody:
      "考虑活跃冲突区、海峡中断和航运风险(建议)。",
    analyzeButton: "分析",
    analyzingMarket: "正在并行分析{count}个市场…",
    analyzingMarkets: "正在并行分析{count}个市场…",
    dispatchingHint:
      "Opus 4.7 正在并行派遣国家代理。通常需要25-35秒。",
    progressStep1: "派遣国家代理…",
    progressStep2: "检查关税和HS代码…",
    progressStep3: "审查制裁清单…",
    progressStep4: "分析标签和包装规则…",
    progressStep5: "交叉参考法规…",
    progressStep6: "协调结果…",
    errorMissing: "请输入产品名称和描述。",
    errorNoCountry: "至少选择一个目标国家。",
    errorGeneric: "分析失败。请重试。",
    errorRateLimit: "已达到每日限额。请24小时后重试。",
  },

  results: {
    backToAnalysis: "← 新建分析",
    analyzedFor: "分析对象",
    origin: "原产:",
    executiveSummary: "执行摘要",
    executiveSummaryDescription:
      "跨{count}个市场的协调分析 · 人机协同建议",
    countryReports: "国家报告",
    complianceFindings: "合规发现",
    recommendedActions: "建议行动",
    deepDive: "深入研究{country}",
    downloadPdf: "下载PDF",
    jobId: "任务ID:",
    notFound: "未找到分析。可能已过期 — 请运行新分析。",
    loading: "加载分析中…",
  },

  deepDive: {
    backToResults: "← 返回结果",
    subtitle: "交互式合规深入研究 · {country}",
    placeholder: "提出跟进问题(例如:货运选项、实验室选择、时间表)…",
    send: "发送",
    downloadPdf: "下载PDF",
    thinking: "思考中…",
    errorSend: "无法发送消息。请重试。",
  },

  risk: {
    low: "低",
    medium: "中",
    high: "高",
    blocked: "受阻",
    suffix: "风险",
  },

  footer: {
    license: "MIT许可 · 由Claude Code + Opus 4.7构建 · 代理提议,您决定。",
    servedAnalyses: "为{users}{usersNoun}提供{analyses}{analysesNoun}",
    analysesSingular: "次分析",
    analysesPlural: "次分析",
    usersSingular: "位独立用户",
    usersPlural: "位独立用户",
    todaySuffix: "今日",
    topMarket: "最多分析市场:",
  },

  nav: {
    languageLabel: "语言",
    howItWorks: "工作原理",
    example: "示例",
    github: "GitHub",
    trySample: "尝试示例",
  },

  countries: {
    US: "美国",
    DE: "德国",
    GB: "英国",
    TR: "土耳其",
    JP: "日本",
  },

  pdf: {
    downloadPdf: "下载PDF",
    generatingPdf: "生成PDF中…",
    pdfReady: "PDF已就绪",
  },

  deepDiveCta: {
    headline: "深入了解此市场",
    body: "按周市场准入计划 — 文件、测试实验室、成本估算、时间表。由Opus 4.7驱动。",
    button: "开始深入研究",
  },

  roi: {
    headline: "此分析为您节省了{savings}和约{days}天",
    masterborderLabel: "MasterBorder",
    brokerLabel: "传统代理",
    vs: "对比",
    lowerCost: "更低成本",
    faster: "更快速",
    disclaimer: "代理基准:行业典型500-2,000美元/每批货物5-15天。",
  },

  telemetry: {
    headline: "实时代理遥测",
    elapsed: "已用时",
    progress: "进度",
    tokensSoFar: "令牌至今",
    tokensAbbr: "令牌",
    queued: "排队中",
    risk: "风险",
    failed: "失败",
    harmonizer: "协调器代理",
    waiting: "等待代理",
    synthesizing: "综合执行摘要…",
    done: "完成",
  },

  example: {
    bannerTitle: "这是预先计算的示例分析",
    bannerBody: "来自实时运行的真实Opus 4.7输出 — 在此冻结,让您可以在不消耗API额度的情况下查看产品。",
    ctaRunYourOwn: "运行您自己的",
    deepDiveDisabled: "示例中深入研究已禁用 — 运行您自己的分析以与代理聊天。",
    footerNote: "示例分析 — 预先计算。从主页运行您自己的以获取最新报告。",
  },
  conflicts: {
    title: "检测到跨市场冲突",
    subtitle: "目标市场之间需要协调的具体分歧。",
    impactLabel: "影响:",
    types: {
      hs_code: "HS编码",
      labeling: "标签",
      certification: "认证",
      documentation: "文件",
      tariff: "关税",
      other: "其他",
    },
  },
};
