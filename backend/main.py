import os
import sys
import time
import logging
from pathlib import Path
from contextlib import asynccontextmanager
from typing import Dict, List
from collections import defaultdict

# Add project root and backend directory to sys.path
SCRIPT_PATH = Path(__file__).resolve()
PROJECT_ROOT = SCRIPT_PATH
while PROJECT_ROOT.parent != PROJECT_ROOT:
    if (PROJECT_ROOT / "backend").is_dir():
        break
    PROJECT_ROOT = PROJECT_ROOT.parent

if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))
if str(SCRIPT_PATH.parent) not in sys.path:
    sys.path.insert(0, str(SCRIPT_PATH.parent))

from fastapi import FastAPI, Request, Response, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import text

from backend.app.core.config import settings
from backend.app.db.session import engine, Base, SessionLocal
from backend.app.db.seed import run_seed

# Import API Routers
from backend.app.api.routes.auth import router as auth_router
from backend.app.api.routes.students import router as students_router
from backend.app.api.routes.faculty import router as faculty_router
from backend.app.api.routes.courses import router as courses_router
from backend.app.api.routes.assignments import router as assignments_router
from backend.app.api.routes.events import router as events_router
from backend.app.api.routes.projects import router as projects_router
from backend.app.api.routes.clubs import router as clubs_router
from backend.app.api.routes.gamification import router as gamification_router
from backend.app.api.routes.notifications import router as notifications_router
from backend.app.api.routes.timetable import router as timetable_router
from backend.app.api.routes.alumni import router as alumni_router
from backend.app.api.routes.chatbot import router as chatbot_router

# Setup structured logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("fsit.api")

# Sliding Window Rate Limiter for Authentication Endpoints
RATE_LIMIT_STORE: Dict[str, List[float]] = defaultdict(list)
RATE_LIMIT_WINDOW_SECONDS = 60
MAX_AUTH_REQUESTS_PER_WINDOW = 15

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Ensure database schema exists and default institutional seed data is ready
    Base.metadata.create_all(bind=engine)
    try:
        run_seed()
    except Exception as e:
        logger.info(f"[*] Note on seed check: {e}")
    yield

app = FastAPI(
    title="School of Future Skills & IT — Academic Enterprise API",
    description="Full-Stack Backend providing authenticated Student Portal, Course Management, Assignment Workflow, Events, Gamification, and FutureBot RAG.",
    version="2.0.0",
    lifespan=lifespan
)

# 1. Security Headers Middleware
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    # Enforce Rate Limiting on Authentication Endpoints (disabled during automated testing)
    if os.environ.get("TESTING") != "1" and request.url.path in ["/api/auth/login", "/api/auth/password-reset"]:
        client_ip = request.client.host if request.client else "unknown"
        now = time.time()
        timestamps = RATE_LIMIT_STORE[client_ip]
        # Purge timestamps outside the sliding window
        RATE_LIMIT_STORE[client_ip] = [t for t in timestamps if now - t < RATE_LIMIT_WINDOW_SECONDS]
        if len(RATE_LIMIT_STORE[client_ip]) >= MAX_AUTH_REQUESTS_PER_WINDOW:
            return Response(
                content='{"detail":"Rate limit exceeded. Too many authentication attempts. Please wait one minute."}',
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                media_type="application/json",
                headers={"Retry-After": str(RATE_LIMIT_WINDOW_SECONDS)}
            )
        RATE_LIMIT_STORE[client_ip].append(now)

    start_time = time.time()
    response = await call_next(request)
    duration_ms = round((time.time() - start_time) * 1000, 2)

    # Attach Production Security Headers
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "SAMEORIGIN"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(self), geolocation=()"
    response.headers["X-Response-Time-Ms"] = str(duration_ms)

    # Log request latency (never log authorization headers or passwords)
    if request.url.path != "/api/health":
        logger.info(f"{request.method} {request.url.path} -> {response.status_code} ({duration_ms}ms)")

    return response

# 2. Strict CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1)(:[0-9]+)?$",
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type", "Accept", "Origin", "X-Requested-With"],
)

# 3. Mount Uploads directory with static asset delivery
settings.UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=str(settings.UPLOAD_DIR)), name="uploads")

# 4. Register Modular Routers under /api
app.include_router(auth_router, prefix=settings.API_V1_STR)
app.include_router(students_router, prefix=settings.API_V1_STR)
app.include_router(faculty_router, prefix=settings.API_V1_STR)
app.include_router(courses_router, prefix=settings.API_V1_STR)
app.include_router(assignments_router, prefix=settings.API_V1_STR)
app.include_router(events_router, prefix=settings.API_V1_STR)
app.include_router(projects_router, prefix=settings.API_V1_STR)
app.include_router(clubs_router, prefix=settings.API_V1_STR)
app.include_router(gamification_router, prefix=settings.API_V1_STR)
app.include_router(notifications_router, prefix=settings.API_V1_STR)
app.include_router(timetable_router, prefix=settings.API_V1_STR)
app.include_router(alumni_router, prefix=settings.API_V1_STR)
app.include_router(chatbot_router, prefix=settings.API_V1_STR)

# 5. Production Health & Readiness Probes
@app.get("/api/health", tags=["Health"])
def health_check():
    """Liveness probe: verifies process is alive and responsive."""
    return {
        "status": "healthy",
        "service": "School of Future Skills & IT (SGSU)",
        "version": "2.0.0",
        "timestamp": time.time()
    }

@app.get("/api/health/ready", tags=["Health"])
def readiness_check():
    """Readiness probe: validates database connectivity and storage directory writeability."""
    checks = {}
    
    # 1. Database Connection Check
    try:
        with SessionLocal() as db:
            db.execute(text("SELECT 1"))
        checks["database"] = "connected"
    except Exception as e:
        logger.error(f"Readiness check failed - Database error: {e}")
        checks["database"] = f"error: {str(e)[:100]}"

    # 2. Storage System Write Check
    try:
        test_file = settings.UPLOAD_DIR / ".readiness_probe"
        test_file.write_text("probe")
        test_file.unlink(missing_ok=True)
        checks["storage"] = "writable"
    except Exception as e:
        logger.error(f"Readiness check failed - Storage error: {e}")
        checks["storage"] = f"error: {str(e)[:100]}"

    is_ready = checks.get("database") == "connected" and checks.get("storage") == "writable"
    status_code = status.HTTP_200_OK if is_ready else status.HTTP_503_SERVICE_UNAVAILABLE

    return Response(
        content=f'{{"status":"{"ready" if is_ready else "unhealthy"}","checks":{{"database":"{checks["database"]}","storage":"{checks["storage"]}"}}}}',
        status_code=status_code,
        media_type="application/json"
    )

if __name__ == "__main__":
    import uvicorn
    module_target = "backend.main:app" if Path.cwd().name != "backend" else "main:app"
    uvicorn.run(module_target, host="0.0.0.0", port=8000, reload=True)
