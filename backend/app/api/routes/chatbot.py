from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from backend.app.db.session import get_db
from backend.app.core.dependencies import get_optional_user, get_current_user
from backend.app.models.entities import User, ChatConversation, ChatMessage
from backend.app.schemas.domain import ChatResponse
from backend.app.services.rag_service import process_chat_query
from pydantic import BaseModel, Field

router = APIRouter(prefix="/chat", tags=["FutureBot AI Intelligence"])

class ChatQueryInput(BaseModel):
    query: str = Field(..., max_length=1500, description="User question or inquiry")
    session_id: Optional[str] = "session-guest"
    history: Optional[List[dict]] = []

@router.post("", response_model=ChatResponse)
async def ask_futurebot(
    input_data: ChatQueryInput,
    current_user: Optional[User] = Depends(get_optional_user),
    db: Session = Depends(get_db)
):
    """
    RAG-driven chat assistant for Future Skills and SGSU intelligence.
    Extracts relevant document chunks, searches academic catalog, applies safeguards,
    and returns verified response with official citations.
    """
    query = input_data.query.strip()
    if not query:
        raise HTTPException(status_code=400, detail="Query cannot be blank.")

    user_id = current_user.id if current_user else None
    response = await process_chat_query(
        db=db,
        query=query[:1500],
        session_id=input_data.session_id,
        user_id=user_id
    )
    return response


@router.get("/history/{session_id}")
def get_chat_history(
    session_id: str,
    current_user: Optional[User] = Depends(get_optional_user),
    db: Session = Depends(get_db)
):
    """
    Retrieves stored conversation messages.
    Enforces privacy: if a conversation belongs to an authenticated user, only that user or an admin can access it.
    """
    conv = db.query(ChatConversation).filter(ChatConversation.id == session_id).first()
    if not conv:
        return {"session_id": session_id, "messages": []}

    if conv.user_id:
        if not current_user or (current_user.id != conv.user_id and current_user.role != "admin"):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Unauthorized to access this private conversation history."
            )

    msgs = db.query(ChatMessage).filter(
        ChatMessage.conversation_id == session_id
    ).order_by(ChatMessage.created_at.asc()).all()

    return {
        "session_id": session_id,
        "title": conv.title,
        "messages": [
            {
                "id": m.id,
                "sender": m.sender,
                "content": m.content,
                "intent": m.intent,
                "confidence": m.confidence,
                "created_at": m.created_at.isoformat() if m.created_at else None
            }
            for m in msgs
        ]
    }


@router.delete("/history/{session_id}")
def clear_chat_history(
    session_id: str,
    current_user: Optional[User] = Depends(get_optional_user),
    db: Session = Depends(get_db)
):
    """
    Deletes conversation history with ownership validation.
    """
    conv = db.query(ChatConversation).filter(ChatConversation.id == session_id).first()
    if conv:
        if conv.user_id:
            if not current_user or (current_user.id != conv.user_id and current_user.role != "admin"):
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Unauthorized to delete this private conversation."
                )
        db.delete(conv)
        db.commit()
    return {"message": f"Conversation {session_id} deleted."}
