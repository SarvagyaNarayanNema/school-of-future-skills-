from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class SourceMetadata(BaseModel):
    source: str
    source_type: str = "official" # "official" | "regulatory" | "secondary"
    authority_level: int = 1 # 1: Official SGSU, 2: Regulatory, 3: Third-Party
    url: Optional[str] = None
    title: str
    published_date: Optional[str] = None
    last_updated: Optional[str] = None
    retrieved_date: Optional[str] = None
    content_type: str = "institutional_profile"

class CitationModel(BaseModel):
    title: str
    source: str
    authority: str
    url: Optional[str] = None
    page: Optional[int] = None

class ActionLink(BaseModel):
    label: str
    route: Optional[str] = None
    url: Optional[str] = None
    type: str = "internal" # "internal" | "external"

class QueryRequest(BaseModel):
    query: str
    history: Optional[List[Dict[str, Any]]] = []
    session_id: Optional[str] = None
    provider: Optional[str] = "autonomous" # "autonomous" | "gemini" | "openai" | "anthropic"

class ChatResponse(BaseModel):
    text: str
    citations: List[CitationModel] = []
    actions: List[ActionLink] = []
    confidence: str = "HIGH" # "HIGH" | "MEDIUM" | "LOW" | "INSUFFICIENT"
    intent: str
    timestamp: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
