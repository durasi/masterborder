import type { Translations } from "./en";

export const ru: Translations = {
  locale: "ru",
  dir: "ltr",
  languageName: "Русский",
  flag: "🇷🇺",

  hero: {
    livePill: "Онлайн · Создано с Opus 4.7",
    titleLine1: "Экспорт через границы,",
    titleLine2: "без догадок",
    subtitle: "Тарифы, санкции, правила маркировки и проверки принудительного труда для каждого целевого рынка — собраны в одном отчёте с официальными ссылками и интерактивным агентом глубокого анализа.",
  },

  features: {
    parallelTitle: "Параллельные агенты",
    parallelBody: "Один агент Opus 4.7 на целевой рынок, запускаются одновременно. Пять рынков за ~25 секунд.",
    citationsTitle: "Нормативные ссылки",
    citationsBody: "Каждый вывод ссылается на первоисточник — код HTS, раздел CFR, номер регламента ЕС или официальный URL.",
    deepDiveTitle: "Интерактивный глубокий анализ",
    deepDiveBody: "Выберите страну и задавайте уточняющие вопросы. Агент сохраняет полный контекст на всех этапах.",
  },

  form: {
    cardTitle: "Анализ продукта",
    cardDescription: "Введите данные продукта и выберите целевые рынки или попробуйте образец.",
    trySample: "Попробовать образец",
    productNameLabel: "Название продукта",
    productNamePlaceholder: "напр., кожаный кошелёк",
    descriptionLabel: "Описание",
    descriptionPlaceholder: "Материалы, обработка, отделка (напр., 'Натуральная коровья кожа, хромовое дубление')",
    categoryLabel: "Категория",
    categoryOptional: "(необязательно)",
    categoryPlaceholder: "напр., аксессуары",
    valueLabel: "Цена за единицу (USD)",
    valuePlaceholder: "45.00",
    originLabel: "Страна происхождения",
    targetLabel: "Целевые страны",
    targetHint: "Выберите один или несколько рынков",
    routeRiskTitle: "Включить анализ рисков маршрута",
    routeRiskBody: "Учитывает активные конфликтные зоны, перебои в проливах и риски морских путей (рекомендуется).",
    analyzeButton: "Анализировать",
    analyzingMarket: "Параллельный анализ {count} рынка…",
    analyzingMarkets: "Параллельный анализ {count} рынков…",
    dispatchingHint: "Opus 4.7 запускает страновых агентов параллельно. Обычно занимает 25-35 секунд.",
    errorMissing: "Пожалуйста, введите название и описание продукта.",
    errorNoCountry: "Выберите хотя бы одну целевую страну.",
    errorGeneric: "Анализ не удался. Попробуйте снова.",
    errorRateLimit: "Достигнут дневной лимит. Попробуйте снова через 24 часа.",
  },

  results: {
    backToAnalysis: "← Новый анализ",
    analyzedFor: "Анализ для:",
    origin: "Происхождение:",
    executiveSummary: "Резюме",
    executiveSummaryDescription: "Согласованный анализ {count} рынков · Рекомендация с участием человека",
    countryReports: "Отчёты по странам",
    complianceFindings: "Выводы о соответствии",
    recommendedActions: "Рекомендуемые действия",
    deepDive: "Углублённый анализ {country}",
    downloadPdf: "Скачать PDF",
    jobId: "ID задачи:",
    notFound: "Анализ не найден. Возможно, истёк срок — запустите новый анализ.",
    loading: "Загрузка анализа…",
  },

  deepDive: {
    backToResults: "← Назад к результатам",
    subtitle: "Интерактивный углублённый анализ соответствия · {country}",
    placeholder: "Задайте уточняющий вопрос (напр., варианты перевозки, лаборатория)…",
    send: "Отправить",
    downloadPdf: "Скачать PDF",
    thinking: "Думаю…",
    errorSend: "Не удалось отправить сообщение.",
  },

  risk: {
    low: "Низкий",
    medium: "Средний",
    high: "Высокий",
    blocked: "Блокирован",
    suffix: "риск",
  },

  footer: {
    license: "Лицензия MIT · Создано с Claude Code + Opus 4.7 · Агент предлагает, вы решаете.",
    servedAnalyses: "Обслужено {analyses} {analysesNoun} для {users} {usersNoun}",
    analysesSingular: "анализ",
    analysesPlural: "анализов",
    usersSingular: "уникальный пользователь",
    usersPlural: "уникальных пользователей",
    todaySuffix: "сегодня",
    topMarket: "самый анализируемый рынок:",
  },

  nav: {
    languageLabel: "Язык",
  },
};
