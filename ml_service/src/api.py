from __future__ import annotations

from typing import Literal

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

from .recommendation import SmartConnectRecommender
from .smartconnect.chat_engine import SmartConnectChatEngine
from .smartconnect.llm_client import LLMClient

app = FastAPI(
    title="Cynbit SmartConnect AI API",
    version="0.2.0",
    description="Cynbit public-content intent classification, recommendations, retrieval and chat.",
)
engine = SmartConnectRecommender()
llm_client = LLMClient()
chat_engine = SmartConnectChatEngine(engine, llm_client)


class QueryRequest(BaseModel):
    query: str = Field(min_length=3, max_length=3000)
    top_k: int = Field(default=5, ge=1, le=10)


class HistoryMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=2000)


class ChatRequest(QueryRequest):
    history: list[HistoryMessage] = Field(default_factory=list, max_length=12)


@app.get("/health")
def health():
    return {
        "status": "ok",
        "model": "TF-IDF + LogisticRegression",
        "content_documents": len(engine.docs),
        "chat": "enabled",
        "llm_configured": llm_client.is_configured,
    }


@app.post("/predict-intent")
def predict_intent(req: QueryRequest):
    try:
        return engine.predict_intent(req.query)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc


@app.post("/recommend")
def recommend(req: QueryRequest):
    try:
        return engine.recommend(req.query, req.top_k)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc


@app.post("/search-knowledge")
def search_knowledge(req: QueryRequest):
    try:
        return {"results": engine.search_knowledge(req.query, req.top_k)}
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc


@app.post("/chat")
def chat(req: ChatRequest):
    try:
        history = [turn.model_dump() for turn in req.history]
        return chat_engine.chat(req.query, history=history, top_k=req.top_k)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc
