import type { Translations } from "./en";

export const ko: Translations = {
  locale: "ko",
  dir: "ltr",
  languageName: "한국어",
  flag: "🇰🇷",

  hero: {
    livePill: "라이브 · Opus 4.7로 구축",
    titleLine1: "국경을 넘어,",
    titleLine2: "추측 없이 수출",
    subtitle: "관세, 제재, 라벨링 규정, 강제 노동 점검을 각 대상 시장별로—공식 인용과 인터랙티브 심층 분석 에이전트를 갖춘 하나의 보고서에 통합.",
  },

  features: {
    parallelTitle: "병렬 에이전트",
    parallelBody: "대상 시장당 하나의 Opus 4.7 에이전트가 동시에 디스패치됩니다. 5개 시장을 약 25초에.",
    citationsTitle: "규제 인용",
    citationsBody: "모든 발견은 1차 출처를 인용합니다—HTS 코드, CFR 섹션, EU 규정 번호 또는 공식 URL.",
    deepDiveTitle: "인터랙티브 심층 분석",
    deepDiveBody: "국가를 선택하고 후속 질문을 하세요. 에이전트가 모든 턴에서 전체 컨텍스트를 유지합니다.",
  },

  form: {
    cardTitle: "제품 분석",
    cardDescription: "제품 세부 정보를 입력하고 대상 시장을 선택하거나 샘플을 시도해 보세요.",
    trySample: "샘플 시도",
    productNameLabel: "제품명",
    productNamePlaceholder: "예: 가죽 지갑",
    descriptionLabel: "설명",
    descriptionPlaceholder: "재료, 가공, 처리 (예: '정품 소가죽, 크롬 무두질, 수공예')",
    categoryLabel: "카테고리",
    categoryOptional: "(선택)",
    categoryPlaceholder: "예: 액세서리",
    valueLabel: "단위당 가격 (USD)",
    valuePlaceholder: "45.00",
    originLabel: "원산지",
    targetLabel: "대상 국가",
    targetHint: "분석할 시장을 하나 이상 선택",
    routeRiskTitle: "경로 위험 분석 포함",
    routeRiskBody: "분쟁 지역, 해협 혼란 및 해상 경로 위험을 고려합니다 (권장).",
    analyzeButton: "분석",
    analyzingMarket: "{count}개 시장 병렬 분석 중…",
    analyzingMarkets: "{count}개 시장 병렬 분석 중…",
    dispatchingHint: "Opus 4.7이 국가 에이전트를 병렬로 디스패치 중입니다. 일반적으로 25~35초 소요.",
    errorMissing: "제품명과 설명을 입력해 주세요.",
    errorNoCountry: "대상 국가를 하나 이상 선택하세요.",
    errorGeneric: "분석 실패. 다시 시도하세요.",
    errorRateLimit: "일일 한도 도달. 24시간 후 다시 시도하세요.",
  },

  results: {
    backToAnalysis: "← 새 분석",
    analyzedFor: "분석 대상:",
    origin: "원산지:",
    executiveSummary: "경영 요약",
    executiveSummaryDescription: "{count}개 시장 통합 분석 · Human-in-the-loop 권장",
    countryReports: "국가 보고서",
    complianceFindings: "규정 준수 발견",
    recommendedActions: "권장 조치",
    deepDive: "{country} 심층 분석",
    downloadPdf: "PDF 다운로드",
    jobId: "작업 ID:",
    notFound: "분석을 찾을 수 없습니다. 만료되었을 수 있습니다—새 분석을 시작하세요.",
    loading: "분석 로딩 중…",
  },

  deepDive: {
    backToResults: "← 결과로 돌아가기",
    subtitle: "인터랙티브 규정 준수 심층 분석 · {country}",
    placeholder: "후속 질문 (예: 운송 옵션, 연구소, 일정)…",
    send: "전송",
    downloadPdf: "PDF 다운로드",
    thinking: "생각 중…",
    errorSend: "메시지 전송 실패.",
  },

  risk: {
    low: "낮음",
    medium: "중간",
    high: "높음",
    blocked: "차단",
    suffix: "위험",
  },

  footer: {
    license: "MIT 라이선스 · Claude Code + Opus 4.7로 구축 · 에이전트가 제안하고, 당신이 결정합니다.",
    servedAnalyses: "{users}명의 {usersNoun}에게 {analyses}회의 {analysesNoun} 제공",
    analysesSingular: "분석",
    analysesPlural: "분석",
    usersSingular: "고유 사용자",
    usersPlural: "고유 사용자",
    todaySuffix: "오늘",
    topMarket: "가장 많이 분석된 시장:",
  },

  nav: {
    languageLabel: "언어",
  },
};
