import type { Translations } from "./en";

export const tr: Translations = {
  locale: "tr",
  dir: "ltr",
  languageName: "Türkçe",
  flag: "🇹🇷",

  hero: {
    livePill: "Canlı · Opus 4.7 ile geliştirildi",
    titleLine1: "Sınır ötesi ihracat,",
    titleLine2: "tahmine yer bırakmadan",
    subtitle:
      "Her hedef pazar için gümrük vergileri, yaptırımlar, etiketleme kuralları ve zorla çalıştırma kontrolleri — resmi kaynak atıflı tek bir raporda harmanlanmış, interaktif derin-analiz ajanıyla birlikte.",
  },

  features: {
    parallelTitle: "Paralel ajanlar",
    parallelBody:
      "Her hedef pazar için bir Opus 4.7 ajanı, eş zamanlı gönderilir. 5 pazar yaklaşık 25 saniyede.",
    citationsTitle: "Resmi mevzuat atıfları",
    citationsBody:
      "Her bulgu birincil kaynağa atıfta bulunur — HTS kodu, CFR bölümü, AB yönetmeliği numarası veya resmi URL.",
    deepDiveTitle: "İnteraktif derin-analiz",
    deepDiveBody:
      "Bir ülke seç ve takip soruları sor. Ajan her turda tüm bağlamı korur.",
  },

  form: {
    cardTitle: "Ürün analiz et",
    cardDescription:
      "Ürün bilgilerini gir ve hedef pazarları seç, veya çıktının nasıl göründüğünü görmek için örneği dene.",
    trySample: "Örneği dene",
    seeExample: "Örneği görüntüle",
    sampleProductName: "Deri Cüzdan",
    sampleProductDescription: "Gerçek dana derisi cüzdan, krom tabaklı, 4 kart yuvası ve bozuk para cebi. İstanbul'da el yapımı.",
    quantityLabel: "Miktar",
    quantityPlaceholder: "örn. 50",
    unitLabel: "Birim",
    unitPieces: "adet",
    unitKg: "kg",
    unitGrams: "gram",
    unitLiters: "litre",
    unitMeters: "metre",
    unitSqm: "m²",
    unitPairs: "çift",
    unitDozens: "düzine",
    unitBoxes: "kutu",
    unitTons: "ton",
    unitPounds: "pound (lbs)",
    unitOunces: "ons (oz)",
    unitGallons: "galon (ABD)",
    unitFeet: "fit (ft)",
    unitInches: "inç (in)",
    unitCubicFeet: "kübik fit (ft³)",
    productNameLabel: "Ürün adı",
    productNamePlaceholder: "ör. deri cüzdan",
    descriptionLabel: "Açıklama",
    descriptionPlaceholder:
      "Malzemeler, işçilik, işleme (ör. 'Hakiki dana derisi, krom tabaklı, el yapımı')",
    categoryLabel: "Kategori",
    categoryOptional: "(isteğe bağlı)",
    categoryPlaceholder: "ör. aksesuar",
    valueLabel: "Birim başı değer (USD)",
    valuePlaceholder: "45.00",
    originLabel: "Menşe ülke",
    targetLabel: "Hedef ülkeler",
    targetHint: "Analiz için bir veya daha fazla pazar seç",
    routeRiskTitle: "Rota risk analizini dahil et",
    routeRiskBody:
      "Aktif çatışma bölgeleri, boğaz kesintileri ve nakliye hattı risklerini dikkate alır (önerilir).",
    analyzeButton: "Analiz et",
    analyzingMarket: "{count} pazar paralel analiz ediliyor…",
    analyzingMarkets: "{count} pazar paralel analiz ediliyor…",
    dispatchingHint:
      "Opus 4.7 ülke ajanlarını paralel gönderiyor. Genellikle 25–35 saniye sürer.",
    progressStep1: "Ülke ajanları gönderiliyor…",
    progressStep2: "Gümrük tarifeleri ve HS kodları kontrol ediliyor…",
    progressStep3: "Yaptırım listeleri inceleniyor…",
    progressStep4: "Etiketleme ve ambalaj kuralları analiz ediliyor…",
    progressStep5: "Mevzuatlar çapraz kontrol ediliyor…",
    progressStep6: "Sonuçlar harmonize ediliyor…",
    errorMissing: "Lütfen ürün adı ve açıklaması gir.",
    errorNoCountry: "En az bir hedef ülke seç.",
    errorGeneric: "Analiz başarısız oldu. Lütfen tekrar dene.",
    errorRateLimit: "Günlük sınıra ulaşıldı. Lütfen 24 saat sonra tekrar dene.",
  },

  results: {
    backToAnalysis: "← Yeni analiz",
    analyzedFor: "Analiz edilen:",
    origin: "Menşe:",
    executiveSummary: "Yönetici Özeti",
    executiveSummaryDescription:
      "{count} pazar genelinde harmanlanmış analiz · İnsan-onaylı öneri",
    countryReports: "Ülke Raporları",
    complianceFindings: "Uyum Bulguları",
    recommendedActions: "Önerilen Aksiyonlar",
    deepDive: "{country} için derin-analiz",
    downloadPdf: "PDF İndir",
    jobId: "Görev ID:",
    notFound: "Analiz bulunamadı. Süresi dolmuş olabilir — lütfen yeni bir analiz başlat.",
    loading: "Analiz yükleniyor…",
  },

  deepDive: {
    backToResults: "← Sonuçlara dön",
    subtitle: "İnteraktif uyum derin-analizi · {country}",
    placeholder: "Bir takip sorusu sor (ör. navlun seçenekleri, laboratuvar seçimi, takvim)…",
    send: "Gönder",
    downloadPdf: "PDF İndir",
    thinking: "Düşünüyor…",
    errorSend: "Mesaj gönderilemedi. Lütfen tekrar dene.",
  },

  risk: {
    low: "Düşük",
    medium: "Orta",
    high: "Yüksek",
    blocked: "Engelli",
    suffix: "risk",
  },

  footer: {
    license: "MIT lisanslı · Claude Code + Opus 4.7 ile geliştirildi · Ajan önerir, siz karar verirsiniz.",
    servedAnalyses: "{users} {usersNoun} için {analyses} {analysesNoun} sunuldu",
    analysesSingular: "analiz",
    analysesPlural: "analiz",
    usersSingular: "tekil kullanıcı",
    usersPlural: "tekil kullanıcı",
    todaySuffix: "bugün",
    topMarket: "en çok analiz edilen pazar:",
  },

  nav: {
    languageLabel: "Dil",
  },
  countries: {
    US: "Amerika Birleşik Devletleri",
    DE: "Almanya",
    GB: "Birleşik Krallık",
    TR: "Türkiye",
    JP: "Japonya",
  },
  pdf: {
    downloadPdf: "PDF İndir",
    generatingPdf: "PDF oluşturuluyor…",
    pdfReady: "PDF hazır",
  },
  deepDiveCta: {
    headline: "Bu pazarda derine in",
    body: "Haftalık pazara giriş planı — belgeler, test laboratuvarları, maliyet tahminleri, zaman çizelgesi. Opus 4.7 destekli.",
    button: "Derin analizi başlat",
  },


  roi: {
    headline: "Bu analiz size {savings} ve ~{days} gün kazandırdı",
    masterborderLabel: "MasterBorder",
    brokerLabel: "Geleneksel gümrük müşaviri",
    vs: "vs",
    lowerCost: "daha düşük maliyet",
    faster: "daha hızlı",
    disclaimer: "Müşavir referansı: sevkiyat başına sektörde tipik $500–$2.000 / 5–15 gün.",
  },
  telemetry: {
    headline: "Canlı agent telemetrisi",
    elapsed: "Geçen süre",
    progress: "İlerleme",
    tokensSoFar: "token şu ana kadar",
    tokensAbbr: "token",
    queued: "sırada",
    risk: "Risk",
    failed: "başarısız",
    harmonizer: "Harmonizer Agent",
    waiting: "agent'lar bekleniyor",
    synthesizing: "özet hazırlanıyor…",
    done: "tamam",
  },
  example: {
    bannerTitle: "Bu, önceden hazırlanmış bir örnek analizdir",
    bannerBody: "Canlı bir analizin gerçek Opus 4.7 çıktısı — ürünü görmeniz için dondurulmuş halde, API kredisi harcanmaz.",
    ctaRunYourOwn: "Kendi analizini çalıştır",
    deepDiveDisabled: "Derin analiz örneklerde devre dışı — agent ile sohbet etmek için kendi analizini çalıştır.",
    footerNote: "Örnek analiz — önceden hazırlanmış. Güncel bir rapor için ana sayfadan kendi analizinizi çalıştırın.",
  },

};
