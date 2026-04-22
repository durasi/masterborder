# MasterBorder

**Cross-border trade compliance, in minutes instead of weeks.**

Built for the [Cerebral Valley × Anthropic "Built with Opus 4.7" hackathon](https://cerebralvalley.ai/e/built-with-4-7-hackathon) (21–26 April 2026).

[![Tests](https://github.com/durasi/masterborder/actions/workflows/tests.yml/badge.svg)](https://github.com/durasi/masterborder/actions/workflows/tests.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Built with Opus 4.7](https://img.shields.io/badge/Built%20with-Claude%20Opus%204.7-blue)](https://www.anthropic.com)

🌍 **UI available in 16 languages** — English · Türkçe · Español · Français · Deutsch · Português · العربية (RTL) · 中文 · 日本語 · 한국어 · Русский · Italiano · Nederlands · हिन्दी · Bahasa · Polski. Select from the picker at [masterborder.vercel.app](https://masterborder.vercel.app); Opus 4.7 generates the executive summary, findings, and deep-dive in the chosen language while keeping regulation identifiers (e.g. `19 CFR Part 134`, `Regulation (EU) 2023/1115`) in their canonical form.

---

## The problem

A small exporter shipping a leather wallet from Istanbul to the US, Germany, and the UK has to answer questions like:

- What's the HS code, and what tariff applies?
- Does California Prop 65 require a Cr VI warning?
- Is my supplier on an OFAC or BIS list?
- Does EU REACH Annex XVII restrict my tannery's dyes?
- Does the UK need an EORI number or a separate customs declaration post-Brexit?

Today, answering all of these means days of research across government portals, paid compliance databases that cost **$50K+/year** (Thomson Reuters World-Check, Refinitiv), and a customs broker on retainer. Most small exporters don't have any of that. They guess, ship, and hope.

## The solution

**MasterBorder** runs one specialized Opus 4.7 agent **per target market in parallel**, synthesizes the findings into a single harmonized executive summary, and lets the exporter drill into any country for a week-by-week go-to-market plan with document names, test labs, and cost estimates. Every finding cites a primary regulatory source (HTS code, CFR section, EU regulation number, official URL).

One product + N target markets → one professional PDF report in under 30 seconds.

---

## Live

- **App**: https://masterborder.vercel.app
- **API**: https://masterborder-production.up.railway.app
- **API docs (Swagger)**: https://masterborder-production.up.railway.app/docs
- **Health**: https://masterborder-production.up.railway.app/health

Try a sample: click **Try sample** on the landing page — it fills in a leather wallet from Türkiye targeting the US, Germany, and the UK.

---

## Architecture

```
┌──────────────────────────┐      ┌───────────────────────────────────────────┐
│  Next.js 16 (Vercel)     │      │  FastAPI (Railway, Docker, Python 3.12)   │
│  React 19 + shadcn/ui    │ ───> │  AsyncAnthropic + slowapi rate limiting   │
│  @react-pdf/renderer     │ <─── │  In-memory job + conversation cache       │
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
                        │  Harmonization Agent  — cross-market synthesis    │
                        │  Markdown executive summary, ranking, shared vs.  │
                        │  divergent requirements, first-move recommendation│
                        └───────────────────────────────────────────────────┘
                                                        │
                                                        ▼
                        ┌───────────────────────────────────────────────────┐
                        │  Recommendation Agent — interactive deep-dive     │
                        │  Multi-turn chat, mirrors user's language, full   │
                        │  context preserved across turns                   │
                        └───────────────────────────────────────────────────┘
```

**Why it's more than a prompt chain:** the Country Agents run **truly in parallel** via `asyncio.gather`, each with a jurisdiction-tailored system prompt built from a `CountryProfile` (official sources, key regulations, FTA status with origin country, sanctions regimes). Five markets finish in ~25 seconds — the same query serialized would be ~2 minutes. The Harmonizer then has all N reports in a single context window to reason across.

---

## Agents

| Agent | File | Responsibility |
|---|---|---|
| **Country Agent** | `backend/countries/agent.py` | Produces one `CountryReport` for one target market. JSON-structured output: HS code, tariff rate, 4–8 findings, recommended actions, overall risk level. Every finding cites a primary source. |
| **Pipeline** | `backend/agents/pipeline.py` | Dispatches one Country Agent per target market in parallel via `asyncio.gather`, aggregates token usage. |
| **Harmonizer** | `backend/agents/harmonizer.py` | Consumes all Country Reports in a single context window, produces a Markdown executive summary: ranked recommendation, shared vs. divergent requirements, geopolitical context, first concrete action. |
| **Recommender** | `backend/agents/recommender.py` | Interactive deep-dive for one chosen country. First turn: full week-by-week plan (timeline, documents, test labs, costs, risks). Follow-ups: multi-turn conversation with full context preservation. Mirrors the user's language if they switch mid-conversation. |

All four agents use `claude-opus-4-7`. The Harmonizer's `max_tokens` is set to 8192 for long-form synthesis; the Country Agents use structured JSON output.

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
- FTA status with Türkiye (origin-dependent preferential rate)
- Sanctions regimes the agent screens against
- Unique concerns per jurisdiction (e.g. Prop 65 for the US, EUDR for the EU)

Adding a sixth country = one dataclass entry. See `profiles.py` for the template.

---

## Features

- ✅ **Parallel country agents** — one Opus 4.7 agent per target market, dispatched concurrently
- ✅ **Primary-source citations** — every finding links to HTS code, CFR section, EU regulation number, or official URL
- ✅ **Interactive deep-dive** — multi-turn chat with full context preservation, week-by-week go-to-market plan
- ✅ **Professional PDF export** — vector PDFs with shield logo, footnote markers, dedicated regulatory sources page, verification QR code
- ✅ **Deep-dive PDF** — separate template for exporting the chat transcript as a country-specific brief
- ✅ **Live usage counter** — privacy-preserving (SHA256-hashed IPs), rolling 24h / 7d windows, top-country tracking
- ✅ **Per-job cost transparency** — token counts + estimated USD cost for every analysis (Opus 4.7 rate: $15/M input + $75/M output)
- ✅ **Test suite + CI** — 17 pytest tests (schemas, profiles, stats), GitHub Actions workflow, <1 second runtime
- ✅ **16-language UI + report generation** — dropdown picker, RTL support (Arabic), URL-param locale override (`?lang=tr`)
- ✅ **Rate limiting** — 5 analyses/day + 20 recommendations/day per IP (SlowAPI), to protect the hackathon API credit budget

## Roadmap (not in scope for hackathon)

- 🚧 More country profiles (China, Canada, UAE, Saudi Arabia — contributions welcome)
- 🚧 CLI tool (`masterborder analyze --product X --to US,DE`)
- 🚧 Integration with Claude Managed Agents (evaluating after the Michael Cohen talk on 23 April)
- 🚧 PDF font registration for non-Latin scripts (Noto Sans SC/JP/KR, Noto Naskh Arabic, Noto Sans Devanagari) — currently PDFs are Latin-script only

---

## Repository layout

```
masterborder/
├── backend/
│   ├── agents/
│   │   ├── pipeline.py        # parallel dispatch
│   │   ├── harmonizer.py      # executive summary
│   │   └── recommender.py     # deep-dive chat
│   ├── api/
│   │   ├── main.py            # FastAPI app
│   │   └── stats.py           # in-memory usage counter
│   ├── countries/
│   │   ├── agent.py           # Country Agent template
│   │   └── profiles.py        # 5 shipped country profiles
│   ├── schemas/
│   │   └── models.py          # Pydantic schemas
│   └── utils/
│       └── languages.py       # ISO → English name mapping for prompts
├── frontend/
│   ├── app/
│   │   ├── page.tsx           # landing
│   │   ├── layout.tsx         # LocaleProvider wrap
│   │   └── results/[jobId]/
│   │       ├── page.tsx       # results dashboard
│   │       └── [country]/
│   │           └── page.tsx   # deep-dive chat
│   ├── components/
│   │   ├── LanguagePicker.tsx
│   │   ├── MasterBorderReport.tsx   # analysis PDF
│   │   ├── DeepDiveReport.tsx       # deep-dive PDF
│   │   ├── TokenUsageBadge.tsx
│   │   └── UsageStatsFooter.tsx
│   └── lib/
│       ├── api.ts             # typed fetch client
│       ├── types.ts           # shared TS types
│       └── i18n/
│           ├── en.ts          # base dictionary (35 keys)
│           ├── tr.ts, es.ts, fr.ts, de.ts, pt.ts, ar.ts,
│           ├── zh.ts, ja.ts, ko.ts, ru.ts, it.ts, nl.ts,
│           ├── hi.ts, id.ts, pl.ts
│           ├── index.ts       # central dictionaries map
│           └── context.tsx    # LocaleProvider + useLocale
├── tests/                     # pytest suite (17 tests)
├── .github/workflows/tests.yml
├── Dockerfile                 # Railway backend image
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
pytest                 # 17 tests, <1 second
cd frontend && npm run build   # Next.js type check + build
```

---

## Tech stack

**Backend**
- Python 3.12, FastAPI, AsyncAnthropic SDK, Pydantic v2
- SlowAPI (rate limiting)
- pytest + pytest-asyncio
- Hosted on Railway (Docker)

**Frontend**
- Next.js 16.2.4 (Turbopack) + React 19
- shadcn/ui (Radix + Nova preset) + Tailwind CSS
- @react-pdf/renderer 4.5.1 (vector PDFs)
- qrcode (verification QR)
- Hosted on Vercel

**Deployment**
- GitHub → auto-deploy to Vercel (frontend) + Railway (backend) on push to `main`
- `NEXT_PUBLIC_API_URL` env var links the two
- CORS regex `https://.*\.vercel\.app` for preview deployments

---

## Security & privacy

- No user data is stored server-side beyond the analysis cache (in-memory, cleared on restart)
- Usage counter stores **SHA256 hashes of IP addresses only** — no raw IPs, no fingerprints
- No third-party analytics, no tracking cookies
- `ANTHROPIC_API_KEY` lives in `.env` / Railway env vars, never in the repo
- Rate limits (5 analyses/day, 20 recommendations/day per IP) protect the hackathon API credit budget

---

## Author

**Seçkin Sefa Durası**
Digital Processes Executive @ BSH Türkiye (Bosch) · solo developer with 7+ live App Store apps
- Web: https://seckin.ws
- Email: i@seckin.ws
- GitHub: https://github.com/durasi
- LinkedIn: https://linkedin.com/in/durasi
- X: https://x.com/seckinws

## License

MIT — see [LICENSE](LICENSE). Free for commercial use, modification, distribution, private use. Attribution appreciated, not required.

---

*Built with Claude Code + Opus 4.7. The agent proposes, you decide.*
