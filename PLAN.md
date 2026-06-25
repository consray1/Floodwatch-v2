# FloodWatch AI - Implementation Plan

## Tech Stack
- Frontend: Next.js 14, Tailwind CSS, Leaflet
- Backend: FastAPI (Python 3.12)
- Database: PostgreSQL 16 (Docker)
- Dev DB UI: pgAdmin
- SMS/WhatsApp/Voice: Twilio
- Speech-to-text: Whisper (local)
- AI: Stubs (GPT-5.5 integration ready)

## File Manifest

### Root
```
/
├── docker-compose.yml
├── .env.example
├── .gitignore
├── README.md
├── AGENTS.md
└── PLAN.md
```

### Backend
```
backend/
├── requirements.txt
├── Dockerfile
├── alembic.ini
├── alembic/
│   ├── env.py
│   └── versions/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── config.py
│   ├── database.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── report.py
│   │   ├── incident.py
│   │   ├── alert.py
│   │   └── ...
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── report.py
│   │   ├── incident.py
│   │   └── ...
│   ├── api/
│   │   ├── __init__.py
│   │   └── v1/
│   │       ├── __init__.py
│   │       ├── router.py
│   │       ├── auth.py
│   │       ├── reports.py
│   │       ├── incidents.py
│   │       ├── alerts.py
│   │       ├── analytics.py
│   │       └── webhooks.py
│   ├── services/
│   │   ├── __init__.py
│   │   ├── ai/
│   │   │   ├── __init__.py
│   │   │   ├── classifier.py      # stub
│   │   │   ├── extractor.py       # stub
│   │   │   ├── summarizer.py      # stub
│   │   │   ├── duplicate_detector.py  # stub
│   │   │   └── trust_scorer.py    # stub
│   │   ├── twilio_service.py
│   │   └── whisper_service.py
│   ├── core/
│   │   ├── __init__.py
│   │   ├── security.py            # JWT, password hashing
│   │   └── rbac.py                # role middleware
│   └── utils/
│       └── ...
└── tests/
    ├── __init__.py
    ├── conftest.py
    ├── test_auth.py
    ├── test_reports.py
    └── ...
```

### Frontend
```
frontend/
├── package.json
├── next.config.js
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   └── dashboard/
│   │       ├── page.tsx
│   │       ├── incidents/page.tsx
│   │       ├── reports/page.tsx
│   │       └── layout.tsx
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   ├── Map/
│   │   │   └── IncidentMap.tsx    # Leaflet
│   │   ├── ReportForm/
│   │   ├── AlertBanner/
│   │   └── ...
│   ├── lib/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── utils.ts
│   └── types/
│       └── index.ts
└── public/
```

## Build Order (15 Steps)
1. Root files (docker-compose.yml, .env.example, .gitignore)
2. Backend: requirements.txt, Dockerfile, config
3. Backend: SQLAlchemy models + Alembic migrations
4. Backend: Auth (JWT, password hashing, RBAC)
5. Backend: CRUD endpoints (reports, incidents, alerts)
6. Backend: Webhooks + Twilio service + Whisper service
7. Backend: AI stubs
8. Backend: Tests (pytest, 80% coverage)
9. Frontend: Next.js scaffold + Tailwind + shadcn/ui
10. Frontend: API client lib
11. Frontend: Auth pages (login/register)
12. Frontend: Dashboard + Leaflet map
13. Frontend: Report submission form
14. Frontend: Incident list + Alert banner
15. README + final polish

## Key Decisions
- Map: Leaflet (free, no API key)
- CSS: Tailwind CSS
- pgAdmin: Included in docker-compose
- AI: Stubbed, logs input, returns valid JSON
- Auth: JWT access (15min) + refresh (7d)
- API: REST /api/v1/*, OpenAPI at /docs
- AI responses: JSON only, schema-validated, logged
- Env vars: All secrets in .env, never committed

## Key Conventions
- Python: Black + Ruff linting, Pydantic v2
- TS: ESLint + Prettier, shadcn/ui components

## Last Updated
Step 0 - Plan created, ready to begin Step 1