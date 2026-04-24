import type { Translations } from "./en";

export const pl: Translations = {
  locale: "pl",
  dir: "ltr",
  languageName: "Polski",
  flag: "🇵🇱",

  hero: {
    livePill: "Na żywo · Zbudowane z Opus 4.7",
    titleLine1: "Wysyłaj przez granice,",
    titleLine2: "bez zgadywania",
    subtitle:
      "Zamień opis produktu w gotowy do eksportu raport zgodności dla maksymalnie 5 rynków — w mniej niż minutę, za mniej niż centa.",
  },

  features: {
    eyebrow: "Co jest w środku",
    heading: "Kompletny warsztat zgodności, zaprojektowany specjalnie dla globalnych sprzedawców.",
    sub: "Każda analiza opiera się na piętnastu funkcjach działających razem — od równoległych agentów po weryfikowalne eksporty PDF.",
    category: {
      core: "Rdzeń",
      compliance: "Zgodność",
      shipping: "Wysyłka",
      experience: "Doświadczenie",
      reach: "Zasięg",
    },
    items: {
      parallel: {
        title: "Równoległe agenty krajowe",
        body: "Jeden agent na miejsce docelowe uruchamiany jednocześnie. 5× przyspieszenie względem przeglądu sekwencyjnego — 60 sekund na pracę, która zajmowała dni.",
      },
      harmonizer: {
        title: "Harmonizator end-to-end",
        body: "Dedykowany agent łączy wszystkie raporty krajowe w jedno podsumowanie wykonawcze z trasami, rankingiem i konkretnymi następnymi krokami.",
      },
      thinking: {
        title: "Adaptacyjne rozszerzone myślenie",
        body: "Opus 4.7 decyduje, kiedy głębokie rozumowanie jest uzasadnione — trudne kompromisy otrzymują potrzebną moc obliczeniową, łatwe nie marnują tokenów.",
      },
      citations: {
        title: "Cytaty regulacyjne",
        body: "Każde znalezisko prowadzi do źródła pierwotnego — 19 CFR, rozporządzenia UE, MoHAP, ESMA, JIS — możliwe do weryfikacji przez każdego recenzenta.",
      },
      geopolitics: {
        title: "Świadomość geopolityczna na żywo",
        body: "Zakłócenia Morza Czerwonego, premie Hormuz, rosyjska przestrzeń powietrzna, kolej Pasa i Szlaku, huby tranzytowe ZEA — wszystko wbudowane w każdą rekomendację.",
      },
      ranking: {
        title: "Ranking wielokryterialny",
        body: "Koszt dostawy (0,40), czas wejścia na rynek (0,35), ryzyko zgodności (0,25). Matematyka jest pokazana, nie ukryta — możesz zaufać lub podważyć.",
      },
      routes: {
        title: "Rekomendacje tras",
        body: "Trasy główne i zapasowe przez powietrze, morze, kolej i TIR — z czasem tranzytu i orientacyjnymi pasmami kosztów dla każdego celu.",
      },
      checklist: {
        title: "Lista dokumentów dla trasy",
        body: "A.TR, B/L, AWB, CMR, raporty testowe REACH, deklaracje UKCA / CE / JIS / ESMA, zapisy OFAC/BIS — nic nie zostaje zapomniane.",
      },
      landedCost: {
        title: "Szacunki kosztu dostawy",
        body: "FOB, fracht, ubezpieczenie, cła, koszty zgodności — rozbite na kraje, aby wiedzieć dokładnie, gdzie idą pieniądze.",
      },
      deepDive: {
        title: "Interaktywne zgłębianie",
        body: "Zadawaj pytania uzupełniające dla każdego kraju. Każda sesja zachowuje pełny kontekst regulacyjny — odpowiedzi pozostają ugruntowane, nigdy ogólne.",
      },
      telemetry: {
        title: "Nakładka telemetrii na żywo",
        body: "Server-sent events transmitują postęp każdego agenta — flaga kraju, upływające sekundy, zużyte tokeny, poziom ryzyka — w czasie rzeczywistym.",
      },
      humanLoop: {
        title: "Człowiek w pętli",
        body: "Claude proponuje. Ty decydujesz. Każda rekomendacja jest przedstawiana jako opcja z kompromisami, nigdy jako werdykt czarnej skrzynki.",
      },
      languages: {
        title: "Wsparcie 16 języków",
        body: "Pełny interfejs, wyniki analizy i renderowanie PDF w 16 językach — w tym CJK, arabski i dewanagari z prawidłowym kształtowaniem czcionek.",
      },
      pdf: {
        title: "Weryfikowalny eksport PDF",
        body: "Jedno kliknięcie tworzy profesjonalny raport z weryfikacją QR, pełną sekcją źródeł regulacyjnych i typografią jury-gotową.",
      },
      costTransparency: {
        title: "Przejrzystość kosztów",
        body: "Każde uruchomienie pokazuje rzeczywiste użycie tokenów i koszt w dolarach — bez ukrytych marż, bez tajemniczego cennika, tylko uczciwe paragony.",
      },
    },
  },

  metrics: {
    perAnalysis: "na analizę",
    perRun: "na uruchomienie",
    parallelAgents: "równoległe agenty",
    languages: "języków",
  },

  howItWorks: {
    eyebrow: "Jak to działa",
    heading: "Handel transgraniczny ma ponad 100 zasad na produkt. Odsłaniamy je w 60 sekund.",
    sub: "Krótka wycieczka po tym, co dzieje się między naciśnięciem \"Analizuj\" a otrzymaniem podpisanego, weryfikowalnego raportu.",
    contextHeading: "Dlaczego zgodność transgraniczna jest dziś trudna",
    contextP1: "Każdy produkt przekraczający granicę napotyka gąszcz regulacji: taryfy, klasyfikację HS, screening sankcji, zasady etykietowania, limity chemiczne REACH/RoHS, prawa opakowaniowe, deklaracje pracy przymusowej i licencje importowe. Brak raportu REACH zatrzyma kontener w Hamburgu na tygodnie. Błędny kod HS w amerykańskim cle może oznaczać cło 25% zamiast 8%.",
    contextP2: "Tradycyjni agenci celni pobierają 500-2 000 $ za przesyłkę i zajmują 5-15 dni na rynek. Dla sprzedawcy celującego w pięć krajów to tygodnie koordynacji i pięciocyfrowe opłaty — zanim spakowana zostanie jedna skrzynia.",
    pipelineHeading: "Czteroetapowy potok",
    steps: {
      describe: {
        title: "Opisz",
        body: "Szczegóły produktu, kraj pochodzenia, rynki docelowe. Język naturalny — bez kodów HS ani terminologii celnej.",
      },
      parallel: {
        title: "Analiza równoległa",
        body: "N agentów Opus 4.7 uruchamia się jednocześnie — po jednym na rynek docelowy — każdy pobiera specyficzne dla swojego kraju regulacje, taryfy i listy sankcji.",
      },
      harmonize: {
        title: "Harmonizuj",
        body: "Agent harmonizator łączy wszystkie raporty w jedno podsumowanie wykonawcze z trasami wysyłki, szacunkami kosztu dostawy i rekomendacjami uszeregowanymi według ryzyka.",
      },
      deliver: {
        title: "Dostarcz",
        body: "Raport na żywo z interaktywnym czatem zgłębiania, listą dokumentów dla trasy i weryfikowalnym eksportem PDF — gotowy dla prawnika, agenta lub klienta.",
      },
    },
    impactHeading: "Dlaczego to ma znaczenie",
    impactLead: "Zgodność to nie problem papierologii — to problem dostępu do rynku. Pomyłka oznacza wykluczenie z największych gospodarek świata.",
    impacts: {
      smallExporter: {
        title: "Mali eksporterzy pozostają lokalni",
        body: "Rzemieślnik w Turcji nie może sobie pozwolić na 1 500 $ × 5 rynków, aby zatrudnić agenta na każde miejsce docelowe. Sprzedają tylko wewnętrznie i tracą wzrost.",
      },
      bigExporter: {
        title: "Duzi eksporterzy palą tygodnie na koordynację",
        body: "Pięć krajów oznacza pięciu agentów, pięć wątków e-mail, pięć harmonogramów. To, co powinno być jedną decyzją, staje się miesiącem pracy operacyjnej.",
      },
      mistakeCost: {
        title: "Każdy błąd jest kosztowny",
        body: "Błędny kod HS, brakujący raport testowy, pominięty screening sankcji — każdy oznacza opóźnienia celne, kary, zepsuty zapas, szkodę reputacyjną.",
      },
      access: {
        title: "AI zamyka lukę",
        body: "Ta sama analiza, 0,42 $ zamiast 7 500 $. 60 sekund zamiast tygodni. Wiedza eksportowa nagle dostępna dla każdego z produktem i pomysłem.",
      },
    },
    bottomLineLabel: "Podsumowanie:",
    bottomLine: "Otwarcie nowego rynku powinno być decyzją, a nie projektem. MasterBorder czyni je decyzją.",
  },

  form: {
    cardTitle: "Analizuj produkt",
    cardDescription:
      "Wprowadź szczegóły produktu i wybierz rynki docelowe, lub wypróbuj próbkę, aby zobaczyć, jak wygląda wynik.",
    trySample: "Wypróbuj próbkę",
    seeExample: "Zobacz przykład",
    sampleProductName: "Skórzany portfel",
    sampleProductDescription: "Prawdziwy skórzany portfel dwudzielny, garbowany chromem, 4 kieszenie na karty i kieszeń na monety. Ręcznie wykonany tradycyjnymi technikami.",
    quantityLabel: "Ilość",
    quantityPlaceholder: "np., 50",
    unitLabel: "Jednostka",
    unitPieces: "sztuk",
    unitKg: "kg",
    unitGrams: "gramów",
    unitLiters: "litrów",
    unitMeters: "metrów",
    unitSqm: "m²",
    unitPairs: "par",
    unitDozens: "tuzinów",
    unitBoxes: "pudełek",
    unitTons: "ton",
    unitPounds: "funtów (lbs)",
    unitOunces: "uncji (oz)",
    unitGallons: "galonów (US)",
    unitFeet: "stóp (ft)",
    unitInches: "cali (in)",
    unitCubicFeet: "stóp sześciennych (ft³)",
    productNameLabel: "Nazwa produktu",
    productNamePlaceholder: "np., skórzany portfel",
    descriptionLabel: "Opis",
    descriptionPlaceholder:
      "Materiały, wykonanie, obróbka itp. (np., 'Prawdziwa skóra, garbowana chromem, ręcznie wykonana')",
    categoryLabel: "Kategoria",
    categoryOptional: "(opcjonalnie)",
    categoryPlaceholder: "np., akcesoria",
    valueLabel: "Wartość za jednostkę (USD)",
    valuePlaceholder: "45,00",
    originLabel: "Kraj pochodzenia",
    targetLabel: "Kraje docelowe",
    targetHint: "Wybierz jeden lub więcej rynków do analizy —",
    selectedLabel: "wybrane",
    routeRiskTitle: "Uwzględnij analizę ryzyka trasy",
    routeRiskBody:
      "Rozważa aktywne strefy konfliktów, zakłócenia cieśnin i ryzyka tras morskich (zalecane).",
    analyzeButton: "Analizuj",
    analyzingMarket: "Analizowanie {count} rynku równolegle…",
    analyzingMarkets: "Analizowanie {count} rynków równolegle…",
    dispatchingHint:
      "Opus 4.7 wysyła Agentów Krajowych równolegle. Zwykle zajmuje to 25-35 sekund.",
    progressStep1: "Wysyłanie Agentów Krajowych…",
    progressStep2: "Sprawdzanie taryf i kodów HS…",
    progressStep3: "Przeglądanie list sankcji…",
    progressStep4: "Analizowanie zasad etykietowania i opakowania…",
    progressStep5: "Krzyżowe odwołania regulacji…",
    progressStep6: "Harmonizowanie wyników…",
    errorMissing: "Proszę wprowadzić nazwę i opis produktu.",
    errorNoCountry: "Wybierz co najmniej jeden kraj docelowy.",
    errorGeneric: "Analiza nieudana. Spróbuj ponownie.",
    errorRateLimit: "Dzienny limit osiągnięty. Spróbuj ponownie za 24 godziny.",
  },

  results: {
    backToAnalysis: "← Nowa analiza",
    analyzedFor: "Analizowane dla",
    origin: "Pochodzenie:",
    executiveSummary: "Streszczenie Wykonawcze",
    executiveSummaryDescription:
      "Zharmonizowana analiza na {count} rynkach · Rekomendacja z człowiekiem w pętli",
    countryReports: "Raporty Krajowe",
    complianceFindings: "Ustalenia Zgodności",
    recommendedActions: "Zalecane Działania",
    deepDive: "Zgłębianie w {country}",
    downloadPdf: "Pobierz PDF",
    jobId: "ID Zadania:",
    notFound: "Nie znaleziono analizy. Mogła wygasnąć — uruchom nową.",
    loading: "Ładowanie analizy…",
  },

  deepDive: {
    backToResults: "← Wróć do wyników",
    subtitle: "Interaktywne zgłębianie zgodności · {country}",
    placeholder: "Zadaj pytanie uzupełniające (np., opcje frachtu, wybór laboratorium, harmonogram)…",
    send: "Wyślij",
    downloadPdf: "Pobierz PDF",
    thinking: "Myślę…",
    errorSend: "Nie można wysłać wiadomości. Spróbuj ponownie.",
  },

  risk: {
    low: "Niskie",
    medium: "Średnie",
    high: "Wysokie",
    blocked: "Zablokowane",
    suffix: "ryzyko",
  },

  footer: {
    license: "Licencja MIT · Zbudowane z Claude Code + Opus 4.7 · Agent proponuje, ty decydujesz.",
    servedAnalyses: "Dostarczono {analyses} {analysesNoun} dla {users} {usersNoun}",
    analysesSingular: "analiza",
    analysesPlural: "analiz",
    usersSingular: "unikalny użytkownik",
    usersPlural: "unikalnych użytkowników",
    todaySuffix: "dzisiaj",
    topMarket: "najbardziej analizowany rynek:",
  },

  nav: {
    languageLabel: "Język",
    howItWorks: "Jak to działa",
    example: "Przykład",
    github: "GitHub",
    trySample: "Wypróbuj",
  },

  countries: {
    US: "Stany Zjednoczone",
    DE: "Niemcy",
    GB: "Wielka Brytania",
    TR: "Turcja",
    JP: "Japonia",
  },

  pdf: {
    downloadPdf: "Pobierz PDF",
    generatingPdf: "Generowanie PDF…",
    pdfReady: "PDF gotowy",
  },

  deepDiveCta: {
    headline: "Zgłęb ten rynek",
    body: "Tygodniowy plan wejścia na rynek — dokumenty, laboratoria testowe, szacunki kosztów, harmonogramy. Zasilane przez Opus 4.7.",
    button: "Rozpocznij zgłębianie",
  },

  roi: {
    headline: "Ta analiza zaoszczędziła {savings} i około {days} dni",
    masterborderLabel: "MasterBorder",
    brokerLabel: "Tradycyjny agent",
    vs: "vs",
    lowerCost: "niższy koszt",
    faster: "szybszy",
    disclaimer: "Punkt odniesienia agenta: typowe w branży 500-2 000 $ / 5-15 dni na przesyłkę.",
  },

  telemetry: {
    headline: "Telemetria agenta na żywo",
    elapsed: "Upłynęło",
    progress: "Postęp",
    tokensSoFar: "tokenów dotąd",
    tokensAbbr: "tokeny",
    queued: "w kolejce",
    risk: "Ryzyko",
    failed: "nieudane",
    harmonizer: "Agent Harmonizator",
    waiting: "czeka na agentów",
    synthesizing: "syntetyzowanie streszczenia wykonawczego…",
    done: "gotowe",
  },

  example: {
    bannerTitle: "To jest wcześniej obliczona przykładowa analiza",
    bannerBody: "Prawdziwy wynik Opus 4.7 z uruchomienia na żywo — zamrożony tutaj, abyś mógł zobaczyć produkt bez zużywania kredytów API.",
    ctaRunYourOwn: "Uruchom własne",
    deepDiveDisabled: "Zgłębianie jest wyłączone w przykładach — uruchom własną analizę, aby porozmawiać z agentem.",
    footerNote: "Przykładowa analiza — wcześniej obliczona. Uruchom własne ze strony głównej, aby otrzymać świeży raport.",
  },
  conflicts: {
    title: "Wykryto konflikty między rynkami",
    subtitle: "Konkretne rozbieżności między rynkami docelowymi do uzgodnienia.",
    impactLabel: "Wpływ:",
    types: {
      hs_code: "Kod HS",
      labeling: "Etykietowanie",
      certification: "Certyfikacja",
      documentation: "Dokumenty",
      tariff: "Cło",
      other: "Inne",
    },
  },
  findings: {
    verify: "Zweryfikuj",
    confidence: {
      high: "Wysoka pewność",
      medium: "Średnia pewność",
      low: "Niska pewność",
    },
    confidenceTooltip: {
      high: "Poparte wyraźnym cytatem regulacyjnym lub autorytatywnym źródłem.",
      medium: "Odwołuje się do utrwalonej praktyki lub wiarygodnego źródła wtórnego.",
      low: "Wnioskowanie bez cytowanego autorytetu — zweryfikuj przed działaniem.",
    },
  },
};
