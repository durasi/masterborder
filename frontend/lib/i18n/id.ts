import type { Translations } from "./en";

export const id: Translations = {
  locale: "id",
  dir: "ltr",
  languageName: "Bahasa Indonesia",
  flag: "🇮🇩",

  hero: {
    livePill: "Langsung · Dibangun dengan Opus 4.7",
    titleLine1: "Kirim lintas batas,",
    titleLine2: "tanpa menebak-nebak",
    subtitle:
      "Ubah deskripsi produk menjadi laporan kepatuhan siap ekspor untuk hingga 5 pasar — dalam waktu kurang dari satu menit, dengan biaya kurang dari satu sen.",
  },

  features: {
    eyebrow: "Apa yang ada di dalam",
    heading: "Workbench kepatuhan lengkap, dirancang khusus untuk penjual global.",
    sub: "Setiap analisis mengandalkan lima belas kemampuan yang bekerja bersama — dari agen paralel hingga ekspor PDF yang dapat diverifikasi.",
    category: {
      core: "Inti",
      compliance: "Kepatuhan",
      shipping: "Pengiriman",
      experience: "Pengalaman",
      reach: "Jangkauan",
    },
    items: {
      parallel: {
        title: "Agen negara paralel",
        body: "Satu agen per tujuan diaktifkan bersamaan. Percepatan 5× dibanding peninjauan sekuensial — 60 detik untuk pekerjaan yang dulu butuh berhari-hari.",
      },
      harmonizer: {
        title: "Harmonisator end-to-end",
        body: "Agen khusus mensintesis semua laporan negara menjadi satu ringkasan eksekutif dengan routing, peringkat, dan langkah-langkah berikutnya yang konkret.",
      },
      thinking: {
        title: "Pemikiran diperluas adaptif",
        body: "Opus 4.7 memutuskan kapan penalaran mendalam diperlukan — trade-off sulit mendapatkan komputasi yang dibutuhkan, yang mudah tidak membuang token.",
      },
      citations: {
        title: "Kutipan regulasi",
        body: "Setiap temuan terhubung ke sumber primer — 19 CFR, regulasi UE, MoHAP, ESMA, JIS — dapat diverifikasi oleh peninjau mana pun.",
      },
      geopolitics: {
        title: "Kesadaran geopolitik langsung",
        body: "Gangguan Laut Merah, premi Hormuz, wilayah udara Rusia, kereta Belt & Road, hub transit UAE — semua disertakan dalam setiap rekomendasi.",
      },
      ranking: {
        title: "Peringkat multi-kriteria",
        body: "Landed cost (0,40), waktu ke pasar (0,35), risiko kepatuhan (0,25). Matematikanya ditampilkan, bukan disembunyikan — Anda bisa percaya atau menantangnya.",
      },
      routes: {
        title: "Rekomendasi rute",
        body: "Rute utama dan cadangan melalui udara, laut, kereta, dan TIR — dengan waktu transit dan pita biaya indikatif untuk setiap tujuan.",
      },
      checklist: {
        title: "Daftar dokumen per rute",
        body: "A.TR, B/L, AWB, CMR, laporan uji REACH, deklarasi UKCA / CE / JIS / ESMA, catatan penyaringan OFAC/BIS — tidak ada yang terlupakan.",
      },
      landedCost: {
        title: "Estimasi landed cost",
        body: "FOB, ongkos kirim, asuransi, bea, biaya kepatuhan — dirinci per negara sehingga Anda tahu persis kemana uang mengalir.",
      },
      deepDive: {
        title: "Deep-dive interaktif",
        body: "Ajukan pertanyaan lanjutan per negara. Setiap sesi mempertahankan konteks regulasi penuh — jawaban tetap berdasar, tidak pernah umum.",
      },
      telemetry: {
        title: "Overlay telemetri langsung",
        body: "Server-sent events mengalirkan progres setiap agen — bendera negara, detik berlalu, token dikonsumsi, level risiko — secara real-time.",
      },
      humanLoop: {
        title: "Manusia dalam loop",
        body: "Claude mengusulkan. Anda memutuskan. Setiap rekomendasi disajikan sebagai opsi dengan trade-off, bukan sebagai vonis kotak hitam.",
      },
      languages: {
        title: "Dukungan 16 bahasa",
        body: "UI lengkap, output analisis, dan rendering PDF dalam 16 bahasa — termasuk CJK, Arab, dan Devanagari dengan pembentukan font yang tepat.",
      },
      pdf: {
        title: "Ekspor PDF yang dapat diverifikasi",
        body: "Satu klik menghasilkan laporan profesional dengan verifikasi QR, bagian sumber regulasi lengkap, dan tipografi kualitas juri.",
      },
      costTransparency: {
        title: "Transparansi biaya",
        body: "Setiap run menampilkan penggunaan token nyata dan biaya dolar — tanpa markup tersembunyi, tanpa harga misterius, hanya tanda terima yang jujur.",
      },
    },
  },

  metrics: {
    perAnalysis: "per analisis",
    perRun: "per run",
    parallelAgents: "agen paralel",
    languages: "bahasa",
  },

  howItWorks: {
    eyebrow: "Cara kerjanya",
    heading: "Perdagangan lintas batas memiliki 100+ aturan per produk. Kami mengungkapnya dalam 60 detik.",
    sub: "Tur singkat tentang apa yang terjadi antara menekan \"Analisis\" dan mendapatkan laporan yang ditandatangani dan dapat diverifikasi.",
    contextHeading: "Mengapa kepatuhan lintas batas sulit hari ini",
    contextP1: "Setiap produk yang melintasi perbatasan menghadapi jalinan regulasi: tarif, klasifikasi HS, penyaringan sanksi, aturan pelabelan, batas kimia REACH/RoHS, undang-undang pengemasan, pernyataan kerja paksa, dan lisensi impor. Laporan uji REACH yang hilang akan menahan kontainer di Hamburg selama berminggu-minggu. Kode HS yang salah di Bea Cukai AS dapat berarti bea 25% bukan 8%.",
    contextP2: "Broker bea cukai tradisional mengenakan biaya 500-2.000 $ per pengiriman dan membutuhkan 5-15 hari per pasar. Bagi penjual yang menargetkan lima negara, itu berarti berminggu-minggu koordinasi dan biaya lima digit — sebelum satu kotak pun dikemas.",
    pipelineHeading: "Pipeline empat langkah",
    steps: {
      describe: {
        title: "Deskripsikan",
        body: "Detail produk, negara asal, pasar target. Bahasa alami — tidak perlu kode HS atau terminologi bea cukai.",
      },
      parallel: {
        title: "Analisis paralel",
        body: "N agen Opus 4.7 aktif bersamaan — satu per pasar target — masing-masing menarik regulasi, tarif, dan daftar sanksi spesifik negaranya.",
      },
      harmonize: {
        title: "Harmoniskan",
        body: "Agen harmonisator mensintesis semua laporan menjadi satu ringkasan eksekutif dengan rute pengiriman, estimasi landed cost, dan rekomendasi berperingkat risiko.",
      },
      deliver: {
        title: "Sampaikan",
        body: "Laporan langsung dengan obrolan deep-dive interaktif, daftar dokumen per rute, dan ekspor PDF yang dapat diverifikasi — siap untuk penasihat, broker, atau pelanggan.",
      },
    },
    impactHeading: "Mengapa ini penting",
    impactLead: "Kepatuhan bukan masalah dokumen — itu masalah akses pasar. Salah berarti terhalang dari ekonomi terbesar dunia.",
    impacts: {
      smallExporter: {
        title: "Eksportir kecil tetap lokal",
        body: "Seorang pengrajin di Turki tidak mampu membayar 1.500 $ × 5 pasar untuk menyewa broker per tujuan. Mereka hanya menjual domestik dan meninggalkan pertumbuhan.",
      },
      bigExporter: {
        title: "Eksportir besar membakar waktu berminggu-minggu untuk koordinasi",
        body: "Lima negara berarti lima broker, lima thread email, lima jadwal. Apa yang seharusnya menjadi satu keputusan menjadi kerja operasional sebulan.",
      },
      mistakeCost: {
        title: "Setiap kesalahan mahal",
        body: "Kode HS salah, laporan uji hilang, penyaringan sanksi terlewat — masing-masing berarti keterlambatan bea cukai, denda, inventaris rusak, kerusakan reputasi.",
      },
      access: {
        title: "AI menutup kesenjangan",
        body: "Analisis sama, 0,42 $ bukan 7.500 $. 60 detik bukan berminggu-minggu. Keahlian ekspor tiba-tiba tersedia untuk siapa pun dengan produk dan ide.",
      },
    },
    bottomLineLabel: "Intinya:",
    bottomLine: "Membuka pasar baru seharusnya menjadi keputusan, bukan proyek. MasterBorder menjadikannya keputusan.",
  },

  form: {
    cardTitle: "Analisis produk",
    cardDescription:
      "Masukkan detail produk Anda dan pilih pasar target, atau coba sampel untuk melihat seperti apa outputnya.",
    trySample: "Coba sampel",
    seeExample: "Lihat contoh",
    sampleProductName: "Dompet kulit",
    sampleProductDescription: "Dompet bifold kulit sapi asli, disamak krom, 4 slot kartu dan saku koin. Buatan tangan dengan teknik kulit tradisional.",
    quantityLabel: "Kuantitas",
    quantityPlaceholder: "mis., 50",
    unitLabel: "Unit",
    unitPieces: "buah",
    unitKg: "kg",
    unitGrams: "gram",
    unitLiters: "liter",
    unitMeters: "meter",
    unitSqm: "m²",
    unitPairs: "pasang",
    unitDozens: "lusin",
    unitBoxes: "kotak",
    unitTons: "ton",
    unitPounds: "pon (lbs)",
    unitOunces: "ons (oz)",
    unitGallons: "galon (US)",
    unitFeet: "kaki (ft)",
    unitInches: "inci (in)",
    unitCubicFeet: "kaki kubik (ft³)",
    productNameLabel: "Nama produk",
    productNamePlaceholder: "mis., dompet kulit",
    descriptionLabel: "Deskripsi",
    descriptionPlaceholder:
      "Bahan, pembuatan, perawatan, dll. (mis., 'Kulit sapi asli, disamak krom, buatan tangan')",
    categoryLabel: "Kategori",
    categoryOptional: "(opsional)",
    categoryPlaceholder: "mis., aksesoris",
    valueLabel: "Nilai per unit (USD)",
    valuePlaceholder: "45,00",
    originLabel: "Negara asal",
    targetLabel: "Negara target",
    targetHint: "Pilih satu atau lebih pasar untuk dianalisis —",
    selectedLabel: "dipilih",
    routeRiskTitle: "Sertakan analisis risiko rute",
    routeRiskBody:
      "Mempertimbangkan zona konflik aktif, gangguan selat, dan risiko jalur pelayaran (direkomendasikan).",
    analyzeButton: "Analisis",
    analyzingMarket: "Menganalisis {count} pasar secara paralel…",
    analyzingMarkets: "Menganalisis {count} pasar secara paralel…",
    dispatchingHint:
      "Opus 4.7 sedang mengirim Agen Negara secara paralel. Ini biasanya memakan waktu 25-35 detik.",
    progressStep1: "Mengirim Agen Negara…",
    progressStep2: "Memeriksa tarif dan kode HS…",
    progressStep3: "Meninjau daftar sanksi…",
    progressStep4: "Menganalisis aturan pelabelan dan pengemasan…",
    progressStep5: "Referensi silang regulasi…",
    progressStep6: "Mengharmoniskan hasil…",
    errorMissing: "Harap masukkan nama dan deskripsi produk.",
    errorNoCountry: "Pilih setidaknya satu negara target.",
    errorGeneric: "Analisis gagal. Silakan coba lagi.",
    errorRateLimit: "Batas harian tercapai. Silakan coba lagi dalam 24 jam.",
  },

  results: {
    backToAnalysis: "← Analisis baru",
    analyzedFor: "Dianalisis untuk",
    origin: "Asal:",
    executiveSummary: "Ringkasan Eksekutif",
    executiveSummaryDescription:
      "Analisis yang diharmoniskan di {count} pasar · Rekomendasi manusia-dalam-loop",
    countryReports: "Laporan Negara",
    complianceFindings: "Temuan Kepatuhan",
    recommendedActions: "Tindakan yang Direkomendasikan",
    deepDive: "Deep-dive di {country}",
    downloadPdf: "Unduh PDF",
    jobId: "ID Pekerjaan:",
    notFound: "Analisis tidak ditemukan. Mungkin sudah kedaluwarsa — jalankan analisis baru.",
    loading: "Memuat analisis…",
  },

  deepDive: {
    backToResults: "← Kembali ke hasil",
    subtitle: "Deep-dive kepatuhan interaktif · {country}",
    placeholder: "Ajukan pertanyaan lanjutan (mis., opsi pengiriman, pemilihan lab, jadwal)…",
    send: "Kirim",
    downloadPdf: "Unduh PDF",
    thinking: "Berpikir…",
    errorSend: "Tidak dapat mengirim pesan. Silakan coba lagi.",
  },

  risk: {
    low: "Rendah",
    medium: "Sedang",
    high: "Tinggi",
    blocked: "Diblokir",
    suffix: "risiko",
  },

  footer: {
    license: "Lisensi MIT · Dibangun dengan Claude Code + Opus 4.7 · Agen mengusulkan, Anda memutuskan.",
    servedAnalyses: "Menyajikan {analyses} {analysesNoun} untuk {users} {usersNoun}",
    analysesSingular: "analisis",
    analysesPlural: "analisis",
    usersSingular: "pengguna unik",
    usersPlural: "pengguna unik",
    todaySuffix: "hari ini",
    topMarket: "pasar paling banyak dianalisis:",
  },

  nav: {
    languageLabel: "Bahasa",
    howItWorks: "Cara kerjanya",
    example: "Contoh",
    github: "GitHub",
    trySample: "Coba sampel",
  },

  countries: {
    US: "Amerika Serikat",
    DE: "Jerman",
    GB: "Inggris Raya",
    TR: "Turki",
    JP: "Jepang",
  },

  pdf: {
    downloadPdf: "Unduh PDF",
    generatingPdf: "Membuat PDF…",
    pdfReady: "PDF siap",
  },

  deepDiveCta: {
    headline: "Selami lebih dalam pasar ini",
    body: "Rencana masuk pasar mingguan — dokumen, lab uji, estimasi biaya, jadwal. Didukung oleh Opus 4.7.",
    button: "Mulai deep-dive",
  },

  roi: {
    headline: "Analisis ini menghemat {savings} dan sekitar {days} hari",
    masterborderLabel: "MasterBorder",
    brokerLabel: "Broker tradisional",
    vs: "vs",
    lowerCost: "biaya lebih rendah",
    faster: "lebih cepat",
    disclaimer: "Tolok ukur broker: tipikal industri 500-2.000 $ / 5-15 hari per pengiriman.",
  },

  telemetry: {
    headline: "Telemetri agen langsung",
    elapsed: "Berlalu",
    progress: "Kemajuan",
    tokensSoFar: "token sejauh ini",
    tokensAbbr: "token",
    queued: "dalam antrian",
    risk: "Risiko",
    failed: "gagal",
    harmonizer: "Agen Harmonisator",
    waiting: "menunggu agen",
    synthesizing: "mensintesis ringkasan eksekutif…",
    done: "selesai",
  },

  example: {
    bannerTitle: "Ini adalah analisis-contoh yang telah dihitung sebelumnya",
    bannerBody: "Output Opus 4.7 asli dari run langsung — dibekukan di sini sehingga Anda dapat melihat produk tanpa membakar kredit API.",
    ctaRunYourOwn: "Jalankan milik Anda",
    deepDiveDisabled: "Deep-dive dinonaktifkan pada contoh — jalankan analisis Anda sendiri untuk mengobrol dengan agen.",
    footerNote: "Analisis-contoh — telah dihitung sebelumnya. Jalankan milik Anda dari beranda untuk laporan segar.",
  },
};
