from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api.chat_routes import router as chat_router

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
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
