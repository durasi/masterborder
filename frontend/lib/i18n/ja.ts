import type { Translations } from "./en";

export const ja: Translations = {
  locale: "ja",
  dir: "ltr",
  languageName: "日本語",
  flag: "🇯🇵",

  hero: {
    livePill: "ライブ · Opus 4.7で構築",
    titleLine1: "国境を越えて出荷する、",
    titleLine2: "推測に頼ることなく",
    subtitle:
      "製品説明を最大5市場の輸出準備コンプライアンスレポートに変換します — 1分以内、1セント未満で。",
  },

  features: {
    eyebrow: "中身",
    heading: "グローバル販売者向けに特別に設計された、完全なコンプライアンスワークベンチ。",
    sub: "すべての分析は、並列エージェントから検証可能なPDF出力まで、15の機能が連携して動作します。",
    category: {
      core: "コア",
      compliance: "コンプライアンス",
      shipping: "出荷",
      experience: "体験",
      reach: "リーチ",
    },
    items: {
      parallel: {
        title: "並列国別エージェント",
        body: "各目的地に1つのエージェントが同時に起動。順次レビューと比較して5倍の高速化 — かつて数日かかった作業を60秒で。",
      },
      harmonizer: {
        title: "エンドツーエンドハーモナイザー",
        body: "専用エージェントがすべての国別レポートを、ルーティング、ランキング、具体的な次のステップを含む単一のエグゼクティブサマリーに統合します。",
      },
      thinking: {
        title: "適応型拡張思考",
        body: "Opus 4.7は深い推論が必要な時を判断 — 難しいトレードオフは必要な計算力を得て、簡単なものはトークンを無駄にしません。",
      },
      citations: {
        title: "規制引用",
        body: "すべての発見は一次情報源にリンク — 19 CFR、EU規則、MoHAP、ESMA、JIS — 誰でも検証可能。",
      },
      geopolitics: {
        title: "ライブ地政学認識",
        body: "紅海混乱、ホルムズプレミアム、ロシア領空、一帯一路鉄道、UAEトランジットハブ — すべてが各推奨に組み込まれています。",
      },
      ranking: {
        title: "多基準ランキング",
        body: "着地コスト(0.40)、市場投入時間(0.35)、コンプライアンスリスク(0.25)。数式は隠さず表示 — 信頼するか疑問視するかはあなた次第。",
      },
      routes: {
        title: "ルート推奨",
        body: "空、海、鉄道、TIRの主要ルートとバックアップルート — 各目的地の輸送時間と指標的コスト帯付き。",
      },
      checklist: {
        title: "ルート別書類チェックリスト",
        body: "A.TR、B/L、AWB、CMR、REACHテストレポート、UKCA / CE / JIS / ESMA宣言、OFAC/BISスクリーニング記録 — 何も忘れません。",
      },
      landedCost: {
        title: "着地コスト見積もり",
        body: "FOB、運賃、保険、関税、コンプライアンス諸経費 — 国別に分解され、資金の流れが正確にわかります。",
      },
      deepDive: {
        title: "インタラクティブな深掘り",
        body: "国ごとにフォローアップ質問。各セッションは完全な規制コンテキストを保持 — 回答は根拠があり、決して一般的ではありません。",
      },
      telemetry: {
        title: "ライブテレメトリーオーバーレイ",
        body: "Server-sent eventsが各エージェントの進捗をストリーミング — 国旗、経過秒、消費トークン、リスクレベル — リアルタイムで。",
      },
      humanLoop: {
        title: "ヒューマン・イン・ザ・ループ",
        body: "Claudeが提案。あなたが決定。すべての推奨はトレードオフ付きの選択肢として提示され、ブラックボックスの判決ではありません。",
      },
      languages: {
        title: "16言語サポート",
        body: "16言語でのフルUI、分析出力、PDFレンダリング — 適切なフォント整形を備えたCJK、アラビア語、デーヴァナーガリーを含む。",
      },
      pdf: {
        title: "検証可能なPDF出力",
        body: "ワンクリックでQR検証、完全な規制ソースセクション、審査員品質のタイポグラフィを備えたプロフェッショナルレポートを生成。",
      },
      costTransparency: {
        title: "コスト透明性",
        body: "すべての実行で実際のトークン使用量とドルコストを表示 — 隠れたマークアップなし、謎の価格設定なし、正直な使用明細のみ。",
      },
    },
  },

  metrics: {
    perAnalysis: "分析あたり",
    perRun: "実行あたり",
    parallelAgents: "並列エージェント",
    languages: "言語",
  },

  howItWorks: {
    eyebrow: "仕組み",
    heading: "国境を越えた貿易には製品ごとに100以上のルールがあります。60秒で明らかにします。",
    sub: "「分析」を押してから署名済みの検証可能なレポートを取得するまでに何が起こるかの短いツアー。",
    contextHeading: "なぜ国境を越えたコンプライアンスは今日難しいのか",
    contextP1: "国境を越えるすべての製品は、関税、HS分類、制裁スクリーニング、ラベリングルール、REACH/RoHS化学物質制限、包装法、強制労働証明、輸入ライセンスなど、複雑な規制網に直面します。REACHテストレポートが欠けると、ハンブルクで数週間コンテナが拘束されます。米国税関での誤ったHSコードは8%の代わりに25%の関税を意味することがあります。",
    contextP2: "従来の通関業者は出荷ごとに500〜2,000ドルを請求し、市場ごとに5〜15日を要します。5カ国を対象とする販売者にとっては、数週間の調整と5桁の手数料 — 一箱も梱包される前に。",
    pipelineHeading: "4ステップパイプライン",
    steps: {
      describe: {
        title: "記述",
        body: "製品詳細、原産国、対象市場。自然言語 — HSコードや税関用語は不要。",
      },
      parallel: {
        title: "並列分析",
        body: "N個のOpus 4.7エージェントが同時に起動 — 各対象市場に1つ — それぞれが国固有の規制、関税、制裁リストを取得。",
      },
      harmonize: {
        title: "調和",
        body: "ハーモナイザーエージェントがすべてのレポートを、出荷ルート、着地コスト見積もり、リスクランク付き推奨を含む単一のエグゼクティブサマリーに統合。",
      },
      deliver: {
        title: "配信",
        body: "インタラクティブな深掘りチャット、ルート別書類チェックリスト、検証可能なPDF出力を含むライブレポート — 弁護士、ブローカー、顧客向け。",
      },
    },
    impactHeading: "なぜこれが重要か",
    impactLead: "コンプライアンスは書類の問題ではなく、市場アクセスの問題です。間違えると世界最大の経済から締め出されます。",
    impacts: {
      smallExporter: {
        title: "小規模輸出業者は国内に留まる",
        body: "トルコの職人は各目的地にブローカーを雇うために1,500ドル × 5市場を支払う余裕がありません。国内販売のみで、成長の機会を逃します。",
      },
      bigExporter: {
        title: "大規模輸出業者は調整で数週間を浪費",
        body: "5カ国は5人のブローカー、5つのメールスレッド、5つのタイムラインを意味します。単一の決定であるべきものが1カ月のオペレーション作業になります。",
      },
      mistakeCost: {
        title: "すべての間違いは高額",
        body: "誤ったHSコード、欠けているテストレポート、見逃された制裁スクリーニング — それぞれが税関の遅延、罰金、在庫の劣化、評判の損害を意味します。",
      },
      access: {
        title: "AIがギャップを埋める",
        body: "同じ分析、7,500ドルではなく0.42ドル。数週間ではなく60秒。輸出専門知識が、製品とアイデアを持つ誰にでも突然利用可能に。",
      },
    },
    bottomLineLabel: "要点:",
    bottomLine: "新しい市場を開くことは、プロジェクトではなく決定であるべきです。MasterBorderはそれを決定にします。",
  },

  form: {
    cardTitle: "製品を分析",
    cardDescription:
      "製品詳細を入力して対象市場を選択するか、サンプルを試して出力の見た目を確認してください。",
    trySample: "サンプルを試す",
    seeExample: "例を見る",
    sampleProductName: "革の財布",
    sampleProductDescription: "本牛革二つ折り財布、クロム鞣し、カードスロット4つとコインポケット。伝統的な革細工技術による手作り。",
    quantityLabel: "数量",
    quantityPlaceholder: "例: 50",
    unitLabel: "単位",
    unitPieces: "個",
    unitKg: "kg",
    unitGrams: "グラム",
    unitLiters: "リットル",
    unitMeters: "メートル",
    unitSqm: "m²",
    unitPairs: "組",
    unitDozens: "ダース",
    unitBoxes: "箱",
    unitTons: "トン",
    unitPounds: "ポンド (lbs)",
    unitOunces: "オンス (oz)",
    unitGallons: "ガロン (US)",
    unitFeet: "フィート (ft)",
    unitInches: "インチ (in)",
    unitCubicFeet: "立方フィート (ft³)",
    productNameLabel: "製品名",
    productNamePlaceholder: "例: 革の財布",
    descriptionLabel: "説明",
    descriptionPlaceholder:
      "素材、製法、処理など(例: '本牛革、クロム鞣し、手作り')",
    categoryLabel: "カテゴリー",
    categoryOptional: "(オプション)",
    categoryPlaceholder: "例: アクセサリー",
    valueLabel: "単位あたりの価値 (USD)",
    valuePlaceholder: "45.00",
    originLabel: "原産国",
    targetLabel: "対象国",
    targetHint: "分析する1つ以上の市場を選択 —",
    selectedLabel: "選択済み",
    routeRiskTitle: "ルートリスク分析を含める",
    routeRiskBody:
      "活発な紛争地帯、海峡の混乱、海運リスクを考慮(推奨)。",
    analyzeButton: "分析",
    analyzingMarket: "{count}市場を並列で分析中…",
    analyzingMarkets: "{count}市場を並列で分析中…",
    dispatchingHint:
      "Opus 4.7が国別エージェントを並列で派遣中。通常25〜35秒かかります。",
    progressStep1: "国別エージェントを派遣中…",
    progressStep2: "関税とHSコードを確認中…",
    progressStep3: "制裁リストを確認中…",
    progressStep4: "ラベリングと包装ルールを分析中…",
    progressStep5: "規制を相互参照中…",
    progressStep6: "結果を調和中…",
    errorMissing: "製品名と説明の両方を入力してください。",
    errorNoCountry: "少なくとも1つの対象国を選択してください。",
    errorGeneric: "分析に失敗しました。再試行してください。",
    errorRateLimit: "日次制限に達しました。24時間後に再試行してください。",
  },

  results: {
    backToAnalysis: "← 新しい分析",
    analyzedFor: "分析対象",
    origin: "原産:",
    executiveSummary: "エグゼクティブサマリー",
    executiveSummaryDescription:
      "{count}市場にわたる調和された分析 · ヒューマン・イン・ザ・ループ推奨",
    countryReports: "国別レポート",
    complianceFindings: "コンプライアンス発見",
    recommendedActions: "推奨アクション",
    deepDive: "{country}の深掘り",
    downloadPdf: "PDFダウンロード",
    jobId: "ジョブID:",
    notFound: "分析が見つかりません。期限切れの可能性 — 新しい分析を実行してください。",
    loading: "分析を読み込み中…",
  },

  deepDive: {
    backToResults: "← 結果に戻る",
    subtitle: "インタラクティブコンプライアンス深掘り · {country}",
    placeholder: "フォローアップ質問をしてください(例: 運送オプション、ラボ選択、タイムライン)…",
    send: "送信",
    downloadPdf: "PDFダウンロード",
    thinking: "考え中…",
    errorSend: "メッセージを送信できませんでした。再試行してください。",
  },

  risk: {
    low: "低",
    medium: "中",
    high: "高",
    blocked: "ブロック",
    suffix: "リスク",
  },

  footer: {
    license: "MITライセンス · Claude Code + Opus 4.7で構築 · エージェントが提案、あなたが決定。",
    servedAnalyses: "{users}{usersNoun}に{analyses}{analysesNoun}を提供",
    analysesSingular: "分析",
    analysesPlural: "分析",
    usersSingular: "ユニークユーザー",
    usersPlural: "ユニークユーザー",
    todaySuffix: "本日",
    topMarket: "最も分析された市場:",
  },

  nav: {
    languageLabel: "言語",
    howItWorks: "仕組み",
    example: "例",
    github: "GitHub",
    trySample: "サンプル",
  },

  countries: {
    US: "アメリカ合衆国",
    DE: "ドイツ",
    GB: "イギリス",
    TR: "トルコ",
    JP: "日本",
  },

  pdf: {
    downloadPdf: "PDFダウンロード",
    generatingPdf: "PDF生成中…",
    pdfReady: "PDF準備完了",
  },

  deepDiveCta: {
    headline: "この市場をより深く掘り下げる",
    body: "週ごとの市場投入計画 — 書類、テストラボ、コスト見積もり、タイムライン。Opus 4.7による。",
    button: "深掘りを開始",
  },

  roi: {
    headline: "この分析で{savings}と約{days}日を節約",
    masterborderLabel: "MasterBorder",
    brokerLabel: "従来のブローカー",
    vs: "vs",
    lowerCost: "低コスト",
    faster: "高速",
    disclaimer: "ブローカーベンチマーク: 業界標準 500〜2,000ドル / 出荷あたり5〜15日。",
  },

  telemetry: {
    headline: "ライブエージェントテレメトリー",
    elapsed: "経過",
    progress: "進捗",
    tokensSoFar: "これまでのトークン",
    tokensAbbr: "トークン",
    queued: "キュー中",
    risk: "リスク",
    failed: "失敗",
    harmonizer: "ハーモナイザーエージェント",
    waiting: "エージェント待機中",
    synthesizing: "エグゼクティブサマリーを合成中…",
    done: "完了",
  },

  example: {
    bannerTitle: "これは事前計算された分析例です",
    bannerBody: "ライブ実行からの実際のOpus 4.7出力 — APIクレジットを消費せずに製品を見られるようここで固定。",
    ctaRunYourOwn: "自分で実行",
    deepDiveDisabled: "例では深掘りが無効 — エージェントとチャットするには独自の分析を実行してください。",
    footerNote: "分析例 — 事前計算済み。最新レポートはホームから独自に実行。",
  },
  conflicts: {
    title: "市場間の矛盾を検出",
    subtitle: "対象市場間で調整が必要な具体的な相違点。",
    impactLabel: "影響:",
    types: {
      hs_code: "HSコード",
      labeling: "ラベル表示",
      certification: "認証",
      documentation: "書類",
      tariff: "関税",
      other: "その他",
    },
  },
  findings: {
    verify: "検証",
    confidence: {
      high: "高信頼度",
      medium: "中信頼度",
      low: "低信頼度",
    },
    confidenceTooltip: {
      high: "明示的な規制引用または権威ある出典URLに裏付けられています。",
      medium: "確立された慣行または信頼できる二次情報源を参照しています。",
      low: "引用された権威のない推論 — 実行前に検証してください。",
    },
  },
};
