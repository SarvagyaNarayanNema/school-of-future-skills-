from fastapi import APIRouter, HTTPException, Depends
from backend.models.schemas import QueryRequest, ChatResponse, CitationModel, ActionLink
from typing import Dict, Any

router = APIRouter(prefix="/api", tags=["FutureBot"])

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: QueryRequest):
    """
    RAG-powered chat endpoint for SGSU FutureBot
    """
    query = request.query.strip()
    if not query:
        raise HTTPException(status_code=400, detail="Query cannot be empty")

    # In production, query pgvector / hybrid retriever and LLM service
    response = ChatResponse(
        text=f"### SGSU Intelligence Service\n\nReceived query: '{query}'. Processing via verified institutional knowledge base.",
        citations=[
            CitationModel(
                title="SGSU Official Institutional Charter",
                source="sgsuniversity.ac.in",
                authority="Official SGSU Portal (Level 1)",
                url="https://sgsuniversity.ac.in/"
            )
        ],
        actions=[
            ActionLink(label="Explore Courses", route="/courses", type="internal"),
            ActionLink(label="Official SGSU Website", url="https://sgsuniversity.ac.in/", type="external")
        ],
        confidence="HIGH",
        intent="UNIVERSITY_INFO"
    )
    return response

@router.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "SGSU FutureBot Intelligence RAG",
        "authority_tier": "Level 1 Official Portal (sgsuniversity.ac.in)"
    }
