# School of Future Skills & Information Technology (FSIT)
## Scope Global Skills University — Enterprise Digital Learning & Innovation Platform

An enterprise-grade, full-stack educational technology platform combining an institutional portal, student dashboard, interactive 3D AI assistant (FutureBot), course and curriculum engine, assignment submission workflow, and gamified student XP ecosystem.

---

## 🏛️ System Architecture

```
                       ┌────────────────────────────────────────┐
                       │          Client Web Browser            │
                       │   React 18 + Vite + Three.js + Tailwind│
                       └───────────────────┬────────────────────┘
                                           │
                        HTTPS / REST APIs  │  JWT Bearer Authentication
                                           ▼
                       ┌────────────────────────────────────────┐
                       │        FastAPI Application Server      │
                       │   Security Middleware, Rate Limiter,   │
                       │     Magic-Byte File Verification       │
                       └───────────┬────────────────┬───────────┘
                                   │                │
                    SQLAlchemy ORM │                │ RAG Retrieval
                                   ▼                ▼
       ┌───────────────────────────────┐   ┌───────────────────────────────┐
       │   PostgreSQL / SQLite Engine  │   │  Indexed Knowledge Chunks     │
       │   25 Relational Tables        │   │  SGSU Academic Documents      │
       └───────────────────────────────┘   └───────────────────────────────┘
```

---

## 🚀 Key Features

### 1. Dual-Layout Public & Student Portal
- **Public Collegiate Site**: Modern dark-navy & electric-cyan university design with high-contrast typography, faculty dossiers, showcase sections, program guides, and interactive project galleries.
- **Authenticated Student Dashboard**: Real-time course progress tracking, assignment submission queue, academic timetable, event RSVP manager, and XP leaderboard.

### 2. FutureBot 3D AI Assistant
- **Interactive Procedural Mascot**: Developed in Three.js and React Three Fiber with glossy pearl materials, illuminated cyan visor expressions, and responsive animation state machines (`idle`, `greeting`, `listening`, `thinking`, `responding`, `success`, `error`).
- **RAG Intelligence Pipeline**: Grounded on indexed university documentation, circulars, and course catalogs with built-in prompt-injection mitigation and security advisory guards.

### 3. Academic Engine & Workflows
- **Programmes & Curriculum**: 8 core technology specialization tracks with modular syllabi and progress checklists.
- **Assignment System**: Secure file submission supporting PDF, ZIP, DOCX, and source code with magic-byte validation and anti-traversal storage isolation.
- **Gamification & XP**: Dynamic level calculations, achievement unlocks, streak counters, and live university leaderboard.

---

## 🔒 Security Hardening

- **Authentication & RBAC**: Signed HMAC-SHA256 JWTs with server-side token revocation and blacklisting on logout.
- **Rate Limiting**: Sliding-window rate limiter (15 requests/minute per client IP) on authentication and password-reset endpoints.
- **Account Enumeration Defense**: Consistent, timing-mitigated responses on `/api/auth/password-reset`.
- **Upload Validation**: Two-layer verification combining MIME type whitelist and file header magic bytes (`PDF`, `PNG`, `JPEG`, `ZIP`, `DOCX`, and clean UTF-8 code).
- **Prompt Injection Filter**: Multi-pattern regex defense sanitizing adversarial instructions (`system override`, `ignore previous instructions`, `reveal prompt`).
- **HTTP Security Headers**: Automatic injection of `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `X-XSS-Protection`, `Referrer-Policy`, and restrictive `Permissions-Policy`.

---

## 🧪 Automated Testing

### Frontend Unit Tests (Vitest)
Executes 10 automated unit tests covering asset resolution, SVG data URI RFC-2397 compliance, and FutureBot state machines.
```bash
npm test
# Or run with Vitest directly
npx vitest run
```

### Backend & End-to-End User Journey Tests (Pytest)
Executes 23 automated integration and journey tests covering auth, RBAC, courses, assignments, events, health probes, and the 4 primary user workflows:
1. Public Visitor Journey (Catalog browsing, details, events, RAG query)
2. Student Portal Journey (Sign in, assignments, event RSVP, token revocation)
3. Faculty Journey (Sign in, course inspection, assignment workflow)
4. Administrator Journey (Sign in, readiness check, leaderboard, session revocation)

```bash
python -m pytest backend/tests/ -v
```

---

## 💾 Database Disaster Recovery & Backup

The platform includes an automated backup and restoration engine located at `backend/app/db/backup.py`.

### Create a Timestamped Backup
```bash
python backend/app/db/backup.py
```
Backups are compressed with gzip and stored under `backend/backups/fsit_backup_<timestamp>.sql.gz`.

### Test Non-Destructive Backup & Recovery
```bash
python backend/app/db/backup.py test
```
Verifies table structure and record integrity across all 25 tables in an isolated test environment.

### Restore Database
```bash
python backend/app/db/backup.py restore backend/backups/<backup_filename>.sql.gz
```

---

## 🐳 Production Deployment (Docker)

### 1. Configure Production Secrets
Copy `.env.example` to `.env` and configure your credentials:
```bash
cp .env.example .env
```

### 2. Launch with Docker Compose
Orchestrates PostgreSQL 16, FastAPI backend with 4 Uvicorn workers, and Nginx Alpine frontend with automatic gzip and asset caching:
```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

### 3. Verify Health Probes
- **Liveness Probe**: `GET http://localhost:8000/api/health` -> `{"status": "healthy"}`
- **Readiness Probe**: `GET http://localhost:8000/api/health/ready` -> `{"status": "ready", "database": "connected"}`

---

## 👥 Platform Engineering Team (Website Builders)

- **Sarvagya Narayan Nema** — *Lead Full-Stack Developer & Platform Architect*
- **Dimpy Rai** — *Frontend UI/UX & Curriculum Designer*
- **Hemant** — *Backend & Systems Developer*
- **Soumya Malviya** — *Integration & Testing Specialist*

---

## 📜 License
Academic & Institutional Rights Reserved © Scope Global Skills University (SGSU).
