# FloodWatch AI

## Project Overview
Community-powered flood intelligence platform that complements HUSIKA and ICPAC hazard monitoring systems. Multi-channel reporting (Web, SMS, WhatsApp, Voice) with AI analysis for real-time incident visualization and emergency response.

## Tech Stack (from requirements)
- **AI**: GPT-5.5 (primary), Whisper (speech-to-text)
- **Database**: PostgreSQL via Supabase
- **Backend**: Railway or Render (API at `/api/v1`, OpenAPI compliant)
- **Frontend**: Vercel
- **Containerization**: Docker + Docker Compose

## Key Requirements Files
| File | Purpose |
|------|---------|
| `AI_REQUIREMENTS.md` | AI tasks: classification, entity extraction, summarization, duplicate detection |
| `API_REQUIREMENTS.md` | REST API endpoints: auth, reports, incidents, alerts, analytics, webhooks |
| `DB_REQUIREMENTS.md` | PostgreSQL schema: users, reports, incidents, alerts, trust/risk scores |
| `Security Requirements.md` | JWT auth, RBAC (Citizen/Responder/Analyst/Admin), OWASP compliance |
| `Deployment Requirements.md` | Docker, Vercel, Railway/Render, Supabase; 80% min test coverage |

## AI Response Contract
All AI responses must be:
- JSON format only
- Schema-validated
- Retry/fallback handling with logging

## Security Posture
- JWT authentication with refresh tokens
- Password hashing required
- Rate limiting and API throttling
- Protection against: SQL injection, XSS, CSRF, SSRF, broken access control
- Audit logging for auth and security events
