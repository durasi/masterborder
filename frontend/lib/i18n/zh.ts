import type { Translations } from "./en";

export const zh: Translations = {
  locale: "zh",
  dir: "ltr",
  languageName: "中文",
  flag: "🇨🇳",

  hero: {
    livePill: "在线 · 由 Opus 4.7 构建",
    titleLine1: "跨境出口,",
    titleLine2: "无需猜测",
    subtitle: "关税、制裁、标签规则和强迫劳动检查——针对每个目标市场,整合在一份报告中,包含官方引用和交互式深度分析代理。",
  },

  features: {
    parallelTitle: "并行代理",
    parallelBody: "每个目标市场一个 Opus 4.7 代理,同时调度。五个市场约 25 秒内完成。",
    citationsTitle: "监管引用",
    citationsBody: "每项发现均引用一级来源——HTS 代码、CFR 章节、欧盟法规编号或官方 URL。",
    deepDiveTitle: "交互式深度分析",
    deepDiveBody: "选择一个国家并提出后续问题。代理在各轮对话中保留完整上下文。",
  },

  form: {
    cardTitle: "分析产品",
    cardDescription: "输入产品详情并选择目标市场,或尝试样品查看输出效果。",
    trySample: "尝试样品",
    productNameLabel: "产品名称",
    productNamePlaceholder: "例如:皮革钱包",
    descriptionLabel: "描述",
    descriptionPlaceholder: "材料、工艺、处理方式(例如:'真牛皮、铬鞣制、手工制作')",
    categoryLabel: "类别",
    categoryOptional: "(可选)",
    categoryPlaceholder: "例如:配饰",
    valueLabel: "单价(美元)",
    valuePlaceholder: "45.00",
    originLabel: "原产国",
    targetLabel: "目标国家",
    targetHint: "选择一个或多个市场进行分析",
    routeRiskTitle: "包含路线风险分析",
    routeRiskBody: "考虑活跃冲突区、海峡中断和航运路线风险(推荐)。",
    analyzeButton: "分析",
    analyzingMarket: "正在并行分析 {count} 个市场…",
    analyzingMarkets: "正在并行分析 {count} 个市场…",
    dispatchingHint: "Opus 4.7 正在并行调度国家代理。通常需要 25-35 秒。",
    errorMissing: "请输入产品名称和描述。",
    errorNoCountry: "至少选择一个目标国家。",
    errorGeneric: "分析失败。请重试。",
    errorRateLimit: "已达每日限制。请 24 小时后重试。",
  },

  results: {
    backToAnalysis: "← 新建分析",
    analyzedFor: "已分析",
    origin: "原产地:",
    executiveSummary: "执行摘要",
    executiveSummaryDescription: "跨 {count} 个市场的协调分析 · 人机协作建议",
    countryReports: "国家报告",
    complianceFindings: "合规发现",
    recommendedActions: "建议行动",
    deepDive: "深入分析 {country}",
    downloadPdf: "下载 PDF",
    jobId: "任务 ID:",
    notFound: "未找到分析。可能已过期——请启动新的分析。",
    loading: "加载分析中…",
  },

  deepDive: {
    backToResults: "← 返回结果",
    subtitle: "交互式合规深度分析 · {country}",
    placeholder: "提出后续问题(例如:运费选项、实验室、时间表)……",
    send: "发送",
    downloadPdf: "下载 PDF",
    thinking: "思考中…",
    errorSend: "消息发送失败。请重试。",
  },

  risk: {
    low: "低",
    medium: "中",
    high: "高",
    blocked: "阻止",
    suffix: "风险",
  },

  footer: {
    license: "MIT 许可 · 由 Claude Code + Opus 4.7 构建 · 代理提议,您决定。",
    servedAnalyses: "为 {users} 位{usersNoun}提供 {analyses} 次{analysesNoun}",
    analysesSingular: "分析",
    analysesPlural: "分析",
    usersSingular: "独立用户",
    usersPlural: "独立用户",
    todaySuffix: "今天",
    topMarket: "最多分析的市场:",
  },

  nav: {
    languageLabel: "语言",
  },
};
