<p align="center">
  <img src="https://raw.githubusercontent.com/durasi/masterborder/main/frontend/public/masterborder-logo.svg" width="96" alt="MasterBorder logo" />
</p>

<h1 align="center">MasterBorder</h1>

<p align="center">
  <strong>Cross-border trade compliance, in minutes instead of weeks.</strong>
</p>

<p align="center">
  Built for the <a href="https://cerebralvalley.ai/e/built-with-4-7-hackathon">Cerebral Valley × Anthropic "Built with Opus 4.7" hackathon</a> (21–26 April 2026).
</p>

<p align="center">
  <a href="https://github.com/durasi/masterborder/actions/workflows/tests.yml"><img alt="Tests" src="https://github.com/durasi/masterborder/actions/workflows/tests.yml/badge.svg" /></a>
  <a href="LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" /></a>
  <a href="https://www.anthropic.com"><img alt="Built with Opus 4.7" src="https://img.shields.io/badge/Built%20with-Claude%20Opus%204.7-blue" /></a>
</p>

<p align="center">
  <a href="https://masterborder.vercel.app"><strong>🌐 Open the app</strong></a> · 
  <a href="https://masterborder-production.up.railway.app/docs">API docs</a> · 
  <a href="#agents">Agents</a> · 
  <a href="#features">Features</a>
</p>

---

🌍 **UI available in 16 languages** — English · Türkçe · Español · Français · Deutsch · Português · العربية (RTL) · 中文 · 日本語 · 한국어 · Русский · Italiano · Nederlands · हिन्दी · Bahasa · Polski. The interface defaults to English; use the language picker in the header to switch. Opus 4.7 generates the executive summary, findings, and deep-dive in the selected language while keeping regulation identifiers (e.g. `19 CFR Part 134`, `Regulation (EU) 2023/1115`) in their canonical form.

---

## The problem

A small or mid-size exporter shipping a consumer product into multiple markets has to answer questions like:

- What's the HS code, and does every destination country classify the product the same way?
- Are any ingredients or materials restricted by destination-country regulations (REACH, California Prop 65, JIS, EUDR)?
- Is the supplier or the buyer on an OFAC, BIS, or EU sanctions list?
- What packaging, labeling, or certification rules apply per market — and where do those rules actively conflict with each other?
- What's the actual landed cost once tariffs, import VAT, freight, and broker fees are added?

Today, answering all of these means days of research across government portals, expensive enterprise compliance subscriptions, and a customs broker on retainer. Most small and mid-size exporters don't have any of that. They guess, ship, and hope the first shipment clears.

## The solution

**MasterBorder** runs one specialized Opus 4.7 agent **per target market in parallel**, then fires three more Opus 4.7 agents concurrently to (a) synthesize the findings into a single harmonized executive summary, (b) detect cross-market conflicts that will bite the exporter if left unresolved, and (c) grade every finding's confidence against the authoritative sources it cites. The exporter can drill into any country for a week-by-week go-to-market plan with document names, test labs, and cost estimates.

One product + N target markets → one professional PDF report in under a minute, with a verifiable sources section and confidence signals every reviewer can trust.

---

## Live

- **App**: https://masterborder.vercel.app
- **API**: https://masterborder-production.up.railway.app
- **API docs (Swagger)**: https://masterborder-production.up.railway.app/docs
- **Health**: https://masterborder-production.up.railway.app/health

Try a sample: click **Try sample** on the landing page — it fills in a consumer-product example targeting two markets and auto-submits, then scrolls directly to the live agent telemetry so you can watch each Opus 4.7 call stream in real time.

---

## Architecture

```
┌──────────────────────────┐      ┌───────────────────────────────────────────┐
│  Next.js 16 (Vercel)     │      │  FastAPI (Railway, Docker, Python 3.12)   │
│  React 19 + shadcn/ui    │ ───> │  AsyncAnthropic + slowapi rate limiting   │
│  @react-pdf/renderer     │ <─── │  SQLite-backed job + conversation store   │
│  16-language i18n        │      └───────────────────────────────────────────┘
└──────────────────────────┘                            │
                                                        ▼
                        ┌───────────────────────────────────────────────────┐
                        │  asyncio.gather — N parallel Country Agents       │
                        │  ┌─────────┐ ┌─────────┐ ┌─────────┐              │
                        │  │ US agt  │ │ DE agt  │ │ UK agt  │ … + TR, JP   │
                        │  └─────────┘ └─────────┘ └─────────┘              │
                        └───────────────────────────────────────────────────┘
                                                        │
                                                        ▼
                        ┌───────────────────────────────────────────────────┐
                        │  asyncio.gather — three Opus 4.7 calls in parallel│
                        │  ┌──────────────┐ ┌───────────┐ ┌──────────────┐  │
                        │  │ Harmonizer   │ │ Conflict  │ │ Confidence   │  │
                        │  │ Agent        │ │ Extractor │ │ Grader       │  │
                        │  └──────────────┘ └───────────┘ └──────────────┘  │
                        └───────────────────────────────────────────────────┘
                                                        │
                                                        ▼
                        ┌───────────────────────────────────────────────────┐
                        │  Recommendation Agent — interactive deep-dive     │
                        │  Multi-turn chat, mirrors user's language, full   │
                        │  context preserved across turns                   │
                        └───────────────────────────────────────────────────┘
```

**Why it's more than a prompt chain:** the Country Agents run **truly in parallel** via `asyncio.gather`, each with a jurisdiction-tailored system prompt built from a `CountryProfile` (official sources, key regulations, FTA status with origin country, sanctions regimes). The three post-pipeline agents — Harmonizer, Conflict Extractor, and Confidence Grader — also fan out concurrently, so the slowest of the three (the Harmonizer's long-form synthesis) bounds the latency for all three. Five markets finish in ~25 seconds; the full cross-market analysis lands in under a minute, end to end.

---

## Agents

| Agent | File | Responsibility |
|---|---|---|
| **Country Agent** | `backend/countries/agent.py` | Produces one `CountryReport` for one target market. JSON-structured output: HS code, tariff rate, 4–8 findings, recommended actions, overall risk level. Every finding cites a primary source. |
| **Pipeline** | `backend/agents/pipeline.py`, `backend/agents/stream_pipeline.py` | Dispatches one Country Agent per target market in parallel via `asyncio.gather`, then fans out the three post-pipeline agents with a second `asyncio.gather`, aggregates token usage across all Opus 4.7 calls, and streams progress as Server-Sent Events to the frontend. |
| **Harmonizer** | `backend/agents/harmonizer.py` | Consumes all Country Reports in a single context window, produces a Markdown executive summary: ranked recommendation, shared vs. divergent requirements, geopolitical context, first concrete action. |
| **Conflict Extractor** | `backend/agents/conflict_extractor.py` | Reads the Country Reports and the Harmonizer's summary and extracts structured cross-market conflicts — HS code mismatches, labeling asymmetries, certification gaps, documentation divergences, tariff splits — each with a short title, concrete detail, and practical impact for the seller. |
| **Confidence Grader** | `backend/agents/confidence_grader.py` | Rates every individual finding HIGH, MEDIUM, or LOW based on how well it's supported by cited authorities: explicit regulatory references and authoritative URLs (gov, europa.eu, customs, standards bodies) earn HIGH; established trade-practice references earn MEDIUM; uncited inferences earn LOW. Grades are merged into the findings in place, so the UI can render a verify-vs-trust signal per finding. |
| **Recommender** | `backend/agents/recommender.py` | Interactive deep-dive for one chosen country. First turn: full week-by-week plan (timeline, documents, test labs, costs, risks). Follow-ups: multi-turn conversation with full context preservation. Mirrors the user's language if they switch mid-conversation. |

All six agents use `claude-opus-4-7` with `thinking={"type": "adaptive"}`, so the model itself decides when a call warrants extended reasoning and when a direct response is enough. Thinking-trace sizes are logged server-side per agent so the adaptive behaviour is observable, not just claimed. The Harmonizer's `max_tokens` is set to 8192 for long-form synthesis; the Country Agents use structured JSON output; the Conflict Extractor and Confidence Grader return strictly JSON schemas and fail gracefully to empty output without blocking the primary result.

---

## Country coverage

Five shipped market profiles:

- 🇺🇸 **United States** — HTS, Section 301, CBP, OFAC SDN, BIS Entity List, Prop 65, FTC Leather Guides
- 🇩🇪 **Germany / EU** — TARIC, REACH Annex XVII, CITES, EUDR, VerpackG / LUCID, GPSR
- 🇬🇧 **United Kingdom** — UKGT, BTOM, IPAFFS, CITES UK, UKCA, Private Attestation
- 🇹🇷 **Türkiye** — Gümrük Kanunu, DİİB, TSE, KVKK, A.TR / EUR.1
- 🇯🇵 **Japan** — customs.go.jp, Industrial Safety and Health Act, JIS, food labeling

Each profile is a `CountryProfile` dataclass (`backend/countries/profiles.py`) with:
- Official source list (what URLs the agent trusts)
- Key regulations (what texts the agent cites)
- FTA status with the origin country (origin-dependent preferential rate)
- Sanctions regimes the agent screens against
- Unique concerns per jurisdiction (e.g. Prop 65 for the US, EUDR for the EU)

Adding a sixth country is one dataclass entry. See `profiles.py` for the template.

---

## Features

- **Parallel country agents** — one Opus 4.7 agent per target market, dispatched concurrently
- **Cross-market conflict detection** — a dedicated Opus 4.7 agent surfaces concrete divergences between target markets (different HS codes, asymmetric registration duties, tariff splits, de minimis threshold gaps) as a highlighted card above the country reports
- **Confidence grading per finding** — a third Opus 4.7 agent grades every finding HIGH / MEDIUM / LOW based on whether it carries an explicit regulatory citation, a reputable secondary source, or is a best-effort inference. The UI renders a tinted badge next to each finding and turns source URLs into a premium **Verify** pill
- **Adaptive extended thinking on every call** — each of the six agents runs with `thinking={type: adaptive}`, so Opus 4.7 itself decides whether a given call (a three-market leather-wallet scan, a cross-market conflict sweep, or a single finding's confidence grade) warrants extra reasoning. Trace sizes land in the backend logs, so reviewers can verify the adaptive behaviour is real, not decorative
- **Agent versioning end-to-end** — every agent module declares a version constant (`country-agent-1.0`, `harmonizer-1.0`, `conflict-extractor-1.0`, `confidence-grader-1.0`, `recommender-1.0`) that ships on every `AnalysisResponse` and renders as a small monospace strip in the Results footer. Sets up the `v1` → `v2` migration story for when a regulation revision (REACH 2026, UFLPA Entity List update) needs to bump one specific agent without breaking existing sessions
- **Primary-source citations** — every finding links to HTS code, CFR section, EU regulation number, or official URL
- **Interactive deep-dive** — multi-turn chat with full context preservation, week-by-week go-to-market plan, language mirrors the user
- **Quantity + unit input** — shipment-level inputs drive real duty math. Sixteen units supported: metric (pieces, kg, grams, liters, meters, sqm, pairs, dozens, boxes, tons) plus imperial (pounds, ounces, US gallons, feet, inches, cubic feet) for US declarations
- **Customs clearance channels, by destination** — every agent explains which risk lane a shipment is likely to hit. Turkey's yeşil / sarı / mavi / kırmızı is mapped one-to-one to EU Union Customs Code green / yellow / orange / red, US CBP release / CF 28 / CET-NII exam, UK CDS routes 6 / 3 / 2 / 1, and Japan NACCS IDE / NAK / KEN. Port-of-entry guidance included for Turkey (Ambarlı / Mersin / İzmir / Gebze / Halkalı)
- **Live progress messages during analysis** — rotating status copy (Dispatching agents → Checking tariffs → Reviewing sanctions → Labeling rules → Cross-referencing → Harmonizing) displayed in the user's language while the pipeline runs
- **Localized sample product** — Try sample fills a product name and description in the active locale (e.g. Deri Cüzdan in Turkish, Cartera de cuero in Spanish) and auto-submits, then smooth-scrolls to the live agent telemetry
- **Multilingual PDF export** — Noto Sans, Noto Sans Arabic, Noto Sans SC, JP, KR, and Noto Sans Devanagari registered with `@react-pdf/renderer`. Turkish diacritics, Cyrillic, Greek, and Latin-extended characters render correctly in exported PDFs
- **Professional PDF export** — vector PDFs with shield logo, footnote markers, dedicated regulatory sources page, verification QR code
- **Deep-dive PDF** — separate template for exporting the chat transcript as a country-specific brief
- **Persistent job store** — SQLite-backed storage (`backend/utils/storage.py`) keeps jobs and deep-dive conversations available across requests and restarts, so the Results page never loses the analysis the SSE stream just produced
- **Cohesive UI language** — the landing, Results, and deep-dive pages share a single visual vocabulary: mesh-gradient background, sticky blurred navbar, glass-morphism cards, gradient shimmer title accent, and a consistent Verify / Deep-dive CTA treatment across all three surfaces
- **Live usage counter** — privacy-preserving (SHA256-hashed IPs), rolling 24h / 7d windows, top-country tracking
- **Per-job cost transparency** — token counts + estimated USD cost for every analysis, aggregating all parallel Opus 4.7 calls (Opus 4.7 rate: $15/M input + $75/M output)
- **Test suite + CI** — pytest tests (schemas, profiles, stats), GitHub Actions workflow, <1 second runtime
- **16-language UI + report generation** — dropdown picker, RTL support (Arabic), URL-param locale override (`?lang=tr`), full translation coverage (hero, form, results, deep-dive, conflicts card, confidence badges, PDF buttons, country names, unit labels, progress messages, sample product)
- **Rate limiting** — 5 analyses/day + 20 recommendations/day per IP (SlowAPI)

## Known limitations

- PDFs for non-Latin scripts (Arabic, Chinese, Japanese, Korean, Hindi) currently default to the registered Noto Sans family, which covers Latin, Cyrillic, Greek, and Turkish diacritics correctly. Dynamic per-locale font family switching (Noto Sans Arabic for AR, Noto Sans SC for ZH, etc.) is wired but not yet applied per-Text element — the next PDF improvement on the list.

---

## Repository layout

```
masterborder/
├── backend/
│   ├── agents/
│   │   ├── pipeline.py             # parallel dispatch (non-streaming)
│   │   ├── stream_pipeline.py      # SSE-streaming variant, 3-way gather
│   │   ├── harmonizer.py           # executive summary
│   │   ├── conflict_extractor.py   # cross-market conflicts
│   │   ├── confidence_grader.py    # per-finding confidence
│   │   └── recommender.py          # deep-dive chat
│   ├── api/
│   │   ├── main.py                 # FastAPI app
│   │   └── stats.py                # usage counter
│   ├── countries/
│   │   ├── agent.py                # Country Agent template
│   │   └── profiles.py             # 5 shipped country profiles
│   ├── schemas/
│   │   └── models.py               # Pydantic schemas (RiskLevel, ConfidenceLevel, ConflictType, …)
│   └── utils/
│       ├── storage.py              # SQLite-backed job + conversation store
│       └── languages.py            # ISO → English name mapping for prompts
├── frontend/
│   ├── app/
│   │   ├── page.tsx                # landing
│   │   ├── layout.tsx              # LocaleProvider wrap
│   │   └── results/[jobId]/
│   │       ├── page.tsx            # results dashboard
│   │       └── [country]/
│   │           └── page.tsx        # deep-dive chat
│   ├── components/
│   │   ├── landing/                # MeshBackground, Navbar, Hero, MetricStrip,
│   │   │                           #   CountryChip, HowItWorks, FeatureGrid
│   │   ├── ConflictsCard.tsx       # amber cross-market conflicts card
│   │   ├── LanguagePicker.tsx
│   │   ├── MasterBorderReport.tsx  # analysis PDF
│   │   ├── DeepDiveReport.tsx      # deep-dive PDF
│   │   ├── TokenUsageBadge.tsx
│   │   └── UsageStatsFooter.tsx
│   └── lib/
│       ├── api.ts                  # typed fetch client
│       ├── types.ts                # shared TS types
│       └── i18n/
│           ├── en.ts               # base dictionary + Translations type
│           ├── tr.ts, es.ts, fr.ts, de.ts, pt.ts, ar.ts,
│           ├── zh.ts, ja.ts, ko.ts, ru.ts, it.ts, nl.ts,
│           ├── hi.ts, id.ts, pl.ts
│           ├── index.ts            # central dictionaries map
│           └── context.tsx         # LocaleProvider + useLocale
├── tests/                          # pytest suite
├── .github/workflows/tests.yml
├── Dockerfile                      # Railway backend image
└── README.md
```

---

## Running locally

```bash
# Clone
git clone https://github.com/durasi/masterborder.git
cd masterborder

# Backend
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env
uvicorn backend.api.main:app --reload --port 8000

# Frontend (new terminal)
cd frontend
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
npm run dev
```

Open http://localhost:3000, click **Try sample**, submit. The analysis runs against your Anthropic API key.

### Tests

```bash
pytest                         # pytest suite, <1 second
cd frontend && npm run build   # Next.js type check + build
```

---

## Tech stack

**Backend**
- Python 3.12, FastAPI, AsyncAnthropic SDK, Pydantic v2
- SQLite (stdlib) for persistent job + conversation storage
- SlowAPI (rate limiting)
- pytest + pytest-asyncio
- Hosted on Railway (Docker, single worker pinned to preserve SQLite's single-writer model)

**Frontend**
- Next.js 16.2.4 (Turbopack) + React 19
- shadcn/ui (Radix + Nova preset) + Tailwind CSS
- @react-pdf/renderer 4.5.1 (vector PDFs)
- Inter variable font for the main UI, Geist Sans italic for the display accent, Geist Mono for tabular numerics
- lucide-react icon set
- qrcode (verification QR)
- Hosted on Vercel

**Deployment**
- GitHub → auto-deploy to Vercel (frontend) + Railway (backend) on push to `main`
- `NEXT_PUBLIC_API_URL` env var links the two
- CORS regex `https://.*\.vercel\.app` for preview deployments

---

## Security & privacy

- Job and conversation data live in a SQLite file on the backend container, scoped by job ID and cleared on a 24-hour TTL
- Usage counter stores **SHA256 hashes of IP addresses only** — no raw IPs, no fingerprints
- No third-party analytics, no tracking cookies
- `ANTHROPIC_API_KEY` lives in `.env` / Railway env vars, never in the repo
- Rate limits (5 analyses/day, 20 recommendations/day per IP) protect the hackathon API credit budget

---

## Author

**Seçkin Sefa Durası**
- Web: https://seckin.ws
- Email: i@seckin.ws
- GitHub: https://github.com/durasi
- LinkedIn: https://linkedin.com/in/durasi
- X: https://x.com/seckinws

## License

[MIT License](LICENSE)
