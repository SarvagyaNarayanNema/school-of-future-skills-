import os
from pathlib import Path
from typing import List
from dotenv import load_dotenv

# Load .env if present
ROOT_DIR = Path(__file__).resolve().parent.parent.parent
load_dotenv(ROOT_DIR / ".env")

class Settings:
    PROJECT_NAME: str = "School of Future Skills & IT Platform"
    API_V1_STR: str = "/api"
    
    # Security & JWT
    SECRET_KEY: str = os.getenv("SECRET_KEY", "fsit-future-skills-super-secret-production-key-2026")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440")) # 24 hours
    
    # Database URL: defaults to SQLite for immediate zero-config execution,
    # and automatically supports PostgreSQL (e.g. Supabase, Neon, AWS RDS) via DATABASE_URL
    raw_db_url: str = os.getenv("DATABASE_URL", "sqlite:///./futureskills.db")
    if raw_db_url.startswith("postgres://"):
        raw_db_url = raw_db_url.replace("postgres://", "postgresql://", 1)
    DATABASE_URL: str = raw_db_url
    
    # CORS Origins
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://sarvagyanarayannema.github.io"
    ]
    
    # Upload Storage
    UPLOAD_DIR: Path = ROOT_DIR / "uploads"
    MAX_UPLOAD_SIZE_BYTES: int = 25 * 1024 * 1024 # 25 MB
    ALLOWED_EXTENSIONS: set = {".pdf", ".zip", ".tar.gz", ".py", ".ipynb", ".docx", ".png", ".jpg"}
    
    # Server-Side AI Keys (NEVER exposed to frontend)
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")

settings = Settings()
settings.UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

