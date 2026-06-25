# FloodWatch AI

**Community-powered flood intelligence platform** that transforms unstructured reports into actionable real-time alerts.

Complements HUSIKA and ICPAC hazard monitoring systems by providing operational intelligence on active flooding — where it's happening, what's affected, and who needs help.

---

## Overview

FloodWatch AI collects community reports via multiple channels (Web, SMS, WhatsApp, Voice), applies AI analysis for classification and de-duplication, and surfaces verified incidents on a live dashboard.

### Core Problem It Solves

| Traditional Warning | FloodWatch AI |
|---------------------|---------------|
| "Flooding will occur" | "Flooding is happening **now** at [location]" |
| | Which roads are blocked |
| | Which bridges are damaged |
| | Which communities need evacuation |
| | Where responders should be deployed |

---

## Features

- [x] **Multi-channel reporting** — Web, SMS (Twilio), WhatsApp, Voice
- [x] **AI classification** — Hazard type, severity, confidence scoring
- [x] **Duplicate detection** — Aggregate related reports into incidents
- [x] **Live incident map** — Real-time GIS visualization with Leaflet
- [x] **Risk scoring** — Per-incident and per-community risk assessment
- [x] **Role-based access** — Citizen, Responder, Analyst, Admin
- [x] **Alert generation** — Actionable alerts to response teams
- [x] **Audit logging** — Security and compliance logging

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, Tailwind CSS, Leaflet, shadcn/ui |
| Backend | FastAPI (Python 3.12), SQLAlchemy, Alembic |
| Database | PostgreSQL 16 (Docker / Supabase) |
| AI | GPT-5.5 (primary), Whisper (local, speech-to-text) |
| SMS/Voice | Twilio |
| Deployment | Vercel (frontend), Railway/Render (backend) |
| Containerization | Docker, Docker Compose |

---

## Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js 20+
- Python 3.12+

### 1. Clone the repo

```bash
git clone git@github.com:consray1/Floodwatch-v2.git
cd Floodwatch-v2
```

### 2. Start infrastructure

```bash
docker compose up -d
```

This starts:
- **PostgreSQL 16** on port 5432
- **pgAdmin** on port 5050 (http://localhost:5050)

### 3. Backend setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt

# Run migrations
alembic upgrade head

# Start server
uvicorn app.main:app --reload
```

API docs available at http://localhost:8000/docs

### 4. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

App runs at http://localhost:3000

---

## Project Structure

```
Floodwatch-v2/
├── docker-compose.yml     # PostgreSQL + pgAdmin
├── .env.example           # Environment variables template
├── backend/               # FastAPI application
│   ├── app/
│   │   ├── api/v1/       # REST endpoints
│   │   ├── core/          # Security, config
│   │   ├── models/         # SQLAlchemy models
│   │   ├── schemas/        # Pydantic schemas
│   │   └── services/       # AI stubs, Twilio, Whisper
│   └── tests/
├── frontend/              # Next.js application
│   ├── src/app/           # App router pages
│   ├── src/components/    # React components
│   └── src/lib/           # API client, utilities
└── PLAN.md               # Implementation roadmap
```

---

## Documentation

| Document | Purpose |
|----------|---------|
| `AGENTS.md` | Guidance for AI coding agents |
| `PLAN.md` | Full implementation plan and file manifest |
| `AI_REQUIREMENTS.md` | AI task specifications |
| `API_REQUIREMENTS.md` | REST API specification |
| `DB_REQUIREMENTS.md` | Database schema design |
| `Security Requirements.md` | Security & RBAC requirements |
| `Deployment Requirements.md` | Infrastructure & CI/CD specs |

---

## User Roles

| Role | Permissions |
|------|-------------|
| **Citizen** | Submit reports, view public incidents |
| **Responder** | Update incident status, view all incidents |
| **Analyst** | View analytics, manage alerts |
| **Admin** | Full access, user management |

---

## API Overview

Base URL: `/api/v1`

| Endpoint | Methods |
|----------|---------|
| `/auth` | register, login, logout, me |
| `/reports` | create, list, get, update, delete |
| `/incidents` | create, list, get, update, delete |
| `/alerts` | create, list, get |
| `/analytics` | risk, incidents |
| `/webhooks` | sms, whatsapp, voice |
| `/health` | GET |

---

## License

MIT