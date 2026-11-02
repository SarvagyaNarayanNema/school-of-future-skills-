import os
import sys
from pathlib import Path

# Add project root and backend directory to sys.path so modules resolve cleanly
ROOT_DIR = Path(__file__).resolve().parent.parent
BACKEND_DIR = Path(__file__).resolve().parent

if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

try:
    from backend.api.chat_routes import router as chat_router
except ModuleNotFoundError:
    from api.chat_routes import router as chat_router

app = FastAPI(
    title="SGSU FutureBot — AI University Intelligence Assistant",
    description="Production-grade RAG backend for Scope Global Skills University (SGSU)",
    version="1.0.0"
)

# Enable CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router)

if __name__ == "__main__":
    import uvicorn
    # Use direct app object or module string depending on working directory
    module_target = "backend.main:app" if Path.cwd().name != "backend" else "main:app"
    uvicorn.run(module_target, host="0.0.0.0", port=8000, reload=True)
