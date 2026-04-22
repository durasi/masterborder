<div align="center">

# MasterBorder

### Open-source cross-border trade compliance, powered by Opus 4.7

**[🌐 Live demo](https://masterborder.vercel.app)** · **[📖 API Docs](https://masterborder-production.up.railway.app/docs)** · **[🎬 Demo Video](#demo)**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Built with Opus 4.7](https://img.shields.io/badge/Built%20with-Opus%204.7-9333ea.svg)](https://www.anthropic.com)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-black.svg)](https://nextjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.136-009688.svg)](https://fastapi.tiangolo.com)
[![Tests](https://github.com/durasi/masterborder/actions/workflows/tests.yml/badge.svg)](https://github.com/durasi/masterborder/actions/workflows/tests.yml)

</div>

---

## The problem

Small exporters face an impossible choice: spend weeks manually checking tariffs, sanctions, HS codes, and regulations across countries — or pay \$50,000+/year for enterprise compliance platforms that are out of reach for small sellers.

**MasterBorder makes enterprise-grade cross-border trade compliance available to everyone.** Paste your product description, pick target markets, get a harmonized report with per-country risk analysis, official regulatory citations, and an interactive deep-dive agent that can answer follow-up questions in real time.

## What it does

1. **Multi-country parallel analysis** — dispatches a Country Agent per target market (US, DE, GB, TR, JP), each running against a country-specific compliance profile. Five parallel Opus 4.7 calls complete in ~25 seconds.
2. **Harmonization Agent** — synthesizes all country reports into an executive summary with market ranking, shared vs. divergent requirements, geopolitical context, and a concrete "first step" recommendation.
3. **Interactive deep-dive** — pick a country and get a full go-to-market plan. Follow-up questions keep the analysis context, so you can drill into freight options, lab selection, document timelines, or anything else.
4. **Official PDF report** — one-click download produces a vector, text-searchable A4 report with a verification QR code, regulatory source citations, and footnotes linking back to primary legal sources.
5. **Rate-limited public demo** — 5 analyses + 20 deep-dives per IP per day so you can try it without running up anyone's API bill.

## Architecture

```
┌──────────────────────────┐        ┌─────────────────────────────┐
│  Next.js 16 (Vercel)     │        │  FastAPI (Railway)          │
│  · Analysis form         │◄──────►│  · Orchestrator             │
│  · Results dashboard     │  HTTP  │  · 5× Country Agents (async)│
│  · Deep-dive chat UI     │        │  · Harmonization Agent      │
│  · PDF export (vector)   │        │  · Recommendation Agent     │
└──────────────────────────┘        │  · Per-IP rate limiter      │
                                     └────────────┬────────────────┘
                                                  │
                                                  ▼
                                     ┌─────────────────────────────┐
                                     │  Anthropic API · Opus 4.7   │
                                     └─────────────────────────────┘
```

### Agent pipeline

- **Country Agent** — produces a structured `CountryReport` for one jurisdiction using a profile with official sources, key regulations, FTAs, and sanctions regimes. Every finding must cite a primary legal source (HTS code, CFR section, EU regulation number, etc.) with a canonical URL when available.
- **Harmonization Agent** — reads all country reports and produces a markdown executive summary with ranking, shared requirements, divergent traps, and geopolitical context.
- **Recommendation Agent** — stateful multi-turn agent that generates a country-specific go-to-market plan and answers follow-up questions, maintaining conversation history server-side.

All three agents use the same Opus 4.7 model (`claude-opus-4-7`); the prompts differ.

## Tech stack

**Backend** — Python 3.12, FastAPI, Anthropic SDK (AsyncAnthropic), Pydantic, SlowAPI (rate limiting), Docker, Railway

**Frontend** — Next.js 16.2 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4, shadcn/ui (Radix + Nova preset), `@react-pdf/renderer`, `qrcode`, `lucide-react`

**Deployment** — Vercel (frontend) + Railway (backend), auto-deploy on git push

## Try it

### Live demo
Visit **[masterborder.vercel.app](https://masterborder.vercel.app)** and analyze any product. Rate-limited to 5 analyses per IP per day.

### Run locally

```bash
# Clone and set up
git clone https://github.com/durasi/masterborder.git
cd masterborder

# Backend
python3.12 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
echo "ANTHROPIC_API_KEY=sk-ant-..." > .env
uvicorn backend.api.main:app --reload --port 8000

# Frontend (in a new terminal)
cd frontend
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Why this was interesting to build

- **Parallel dispatch** matters: running 5 Country Agents in parallel via `asyncio.gather` turns a 2-minute sequential analysis into a ~25-second one.
- **Harmonization is the real product** — individual country reports are useful, but the synthesis ("where do all these rules agree, where do they diverge, what should I do first?") is what makes the tool worth opening.
- **Structured outputs with citations** force Opus 4.7 to be specific. Requiring a `citation` field for each finding turned vague guidance into auditable regulatory references.
- **Human-in-the-loop is the right pattern** for compliance advice: the agent proposes, the human decides. Every recommendation ends with *"You decide."*

## Project status

- ✅ Five country profiles (US, DE, GB, TR, JP) — extensible via `backend/countries/profiles.py`
- ✅ Multi-turn deep-dive chat with conversation cache
- ✅ Vector PDF export with QR verification + regulatory source citations
- ✅ Rate limiting (5 analyses/day/IP, 20 recommendations/day/IP)
- ✅ CORS-protected API with typed Pydantic schemas
- ✅ Live deployment on Vercel + Railway
- 🚧 More country profiles (China, Canada, UAE, Saudi Arabia — contributions welcome)
- 🚧 CLI tool (`masterborder analyze --product X --to US,DE`)
- 🚧 Integration with Claude Managed Agents

## Repository layout

```
masterborder/
├── backend/
│   ├── agents/              # Orchestrator, harmonizer, recommender
│   ├── api/main.py          # FastAPI entrypoint (HTTP endpoints)
│   ├── countries/           # Per-country profiles + Country Agent
│   └── schemas/models.py    # Pydantic request/response types
├── frontend/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # UI components + PDF template
│   └── lib/                 # API client, TS types, helpers
├── Dockerfile               # Railway deployment
├── requirements.txt         # Python dependencies
└── README.md
```

## Author

**Seçkin Sefa Durası** — software developer, musician, and occasional compliance researcher based in Istanbul, Turkey.

- 🌐 Website: [seckin.ws](https://seckin.ws)
- 📧 Email: [i@seckin.ws](mailto:i@seckin.ws)
- 💼 LinkedIn: [linkedin.com/in/durasi](https://www.linkedin.com/in/durasi)
- 🐙 GitHub: [github.com/durasi](https://github.com/durasi)
- 𝕏 / Twitter: [x.com/seckinws](https://x.com/seckinws)
- 💬 Discord: `seckin.ws`

## License

MIT — see [LICENSE](./LICENSE). You can use, modify, fork, and ship this commercially; attribution appreciated but not required.

---

Built with [Claude Code](https://www.anthropic.com/claude-code) + Opus 4.7 for the [Cerebral Valley × Anthropic hackathon](https://cerebralvalley.ai/e/built-with-4-7-hackathon), April 2026.
