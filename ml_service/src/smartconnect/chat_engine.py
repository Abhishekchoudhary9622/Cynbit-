from __future__ import annotations

import re
from typing import Any

from .llm_client import LLMClient
from .knowledge_engine import ConversationalKnowledgeEngine


GENERAL_SYSTEM_PROMPT = """You are SmartConnect AI, an intelligent, versatile, and highly capable conversational AI assistant.
You can answer ANY question asked by a user across a wide variety of domains:
- Programming, algorithms, debugging, and software engineering (provide clear, correct, production-grade code with complexity analysis)
- Artificial intelligence, machine learning, deep learning, NLP, and computer vision
- Mathematics, physics, engineering, and science
- Career guidance, interview preparation, and technical resume/portfolio advice
- Professional writing, documentation, emails, and drafting
- General knowledge, history, geography, and culture

Guidelines:
1. Provide accurate, clear, in-depth, and helpful responses.
2. For coding questions, provide working code in the requested language with explanation.
3. Maintain full conversation context across turns (e.g., if a user refers to 'it' or 'the code', refer to previous turns).
4. Do NOT attach unsolicited Cynbit service recommendations or sales pitches to general questions. Answer the question directly and naturally.
5. Be warm, professional, and intellectually rigorous."""


CYNBIT_SYSTEM_PROMPT = """You are SmartConnect AI, an intelligent conversational assistant with specialized knowledge about Cynbit Technologies (cynbit.in).

Your goals:
1. Answer questions about Cynbit Technologies, its services, products (TenantEase, Revio, Cynbit Studio), team, case studies, and engineering capabilities using verified reference material.
2. When answering general questions connected to Cynbit (mixed queries), combine your broad technical knowledge with verified Cynbit capabilities.
3. Provide helpful Markdown links for Cynbit resources when relevant:
   - Services: [Our Services](/services)
   - Products: [Products Suite](/products)
   - Case Studies: [Case Studies](/case-studies)
   - Contact: [Contact Page](/contact)
4. Do not invent pricing or client details that are not supported by the verified reference material.
5. Maintain conversational context across multi-turn exchanges."""


CYNBIT_CORE_ENTITIES = {
    "cynbit", "tenantease", "tenant ease", "revio", "cynbit studio",
    "bitelevate", "bit elevate", "jaipur", "cynbit.in"
}


class SmartConnectChatEngine:
    def __init__(self, recommender: Any, llm_client: LLMClient | None = None) -> None:
        self.recommender = recommender
        self.llm = llm_client or LLMClient()

    @staticmethod
    def _classify_query(query: str, history: list[dict[str, str]] | None = None) -> str:
        q_lower = query.lower().strip()

        # 1. Greetings (short greeting turns)
        if re.search(r"^(hi+|hello+|hey+|howdy|hola|greetings|good\s+(morning|afternoon|evening|day)|yo|sup)\b", q_lower):
            if len(q_lower.split()) <= 4:
                return "greeting"

        # Check for explicit mentions of Cynbit entities using word boundaries
        has_cynbit_mention = any(
            re.search(r"\b" + re.escape(entity) + r"\b", q_lower)
            for entity in CYNBIT_CORE_ENTITIES
        )

        # Check for explicit questions about the company itself
        company_intents = [
            "what services does cynbit", "what does cynbit do", "what services do you offer",
            "what do you offer", "your services", "your products", "cynbit products",
            "cynbit's products", "cynbit services", "tell me about tenantease",
            "tell me about revio", "tell me about cynbit studio", "cynbit studio and revio",
            "compare cynbit studio", "show relevant case studies", "cynbit case studies",
            "how can i contact cynbit", "contact cynbit", "cynbit pricing", "work at cynbit",
            "about cynbit", "who founded cynbit", "cynbit office"
        ]
        is_direct_company_query = any(ci in q_lower for ci in company_intents)

        # Mixed queries: technical or general topic explicitly linked to Cynbit
        # e.g., "Explain RAG and how Cynbit could implement it", "How could Cynbit use it?"
        mixed_indicators = [
            "how cynbit", "how could cynbit", "how can cynbit", "cynbit implement",
            "cynbit use", "cynbit capabilities", "with cynbit", "using cynbit", "cynbit help"
        ]
        is_mixed = has_cynbit_mention and any(m in q_lower for m in mixed_indicators)

        # Context-based Cynbit reference: e.g. "How could Cynbit use it?" or "Can Cynbit build this?"
        if history and not has_cynbit_mention:
            # Check if current turn asks about Cynbit specifically
            if any(re.search(r"\b" + re.escape(ci) + r"\b", q_lower) for ci in ["cynbit", "your team", "your company"]):
                is_mixed = True

        if is_mixed:
            return "mixed"

        if has_cynbit_mention or is_direct_company_query:
            return "cynbit"

        # Explicit commercial service inquiry: User explicitly seeking client engagement
        # e.g., "I want to build an AI-powered application.", "I need an app developed", "hire your company"
        commercial_hire_phrases = [
            "hire your company", "hire cynbit", "work with your team", "request a quote",
            "book a consultation", "schedule a demo", "i want to build an ai",
            "build an ai-powered", "build an ai application", "build an ai platform",
            "develop an ai-powered", "customer support automation", "ai customer support"
        ]
        if any(ch in q_lower for ch in commercial_hire_phrases):
            return "cynbit"

        # All other queries: General knowledge, coding, math, career, writing, AI/ML, etc.
        return "general"

    @staticmethod
    def _unique_sources(*groups: list[dict[str, Any]]) -> list[dict[str, Any]]:
        sources: list[dict[str, Any]] = []
        seen: set[str] = set()
        for group in groups:
            for item in group:
                url = item.get("url")
                if url and url not in seen:
                    seen.add(url)
                    sources.append({
                        "title": item.get("title", "Cynbit resource"),
                        "type": item.get("type", "website"),
                        "url": url,
                    })
        return sources[:6]

    @staticmethod
    def _build_context(
        knowledge: list[dict[str, Any]],
        recommendation: dict[str, Any],
    ) -> str:
        chunks: list[str] = []
        for item in knowledge[:4]:
            chunks.append(
                f"[SOURCE: {item.get('url', '')}]\n"
                f"TITLE: {item.get('title', '')}\n"
                f"CATEGORY: {item.get('category', '')}\n"
                f"CONTENT: {str(item.get('text', ''))[:1600]}"
            )
        for key in ("recommended_services_products", "related_case_studies_and_articles"):
            for item in recommendation.get(key, [])[:3]:
                chunks.append(
                    f"[SOURCE: {item.get('url', '')}]\n"
                    f"TITLE: {item.get('title', '')}\n"
                    f"CATEGORY: {item.get('category', '')}\n"
                    f"DETAILS: {item.get('why_recommended', item.get('matched_text', ''))}"
                )
        return "\n\n---\n\n".join(chunks)[:9000]

    def _format_conversation_history(
        self, history: list[dict[str, str]] | None, limit: int = 10
    ) -> list[dict[str, str]]:
        messages: list[dict[str, str]] = []
        if not history:
            return messages
        for turn in history[-limit:]:
            role = turn.get("role")
            content = turn.get("content", "")
            if role in ("user", "assistant") and content.strip():
                messages.append({"role": role, "content": content.strip()[:2000]})
        return messages

    def _cynbit_offline_fallback(
        self,
        query: str,
        knowledge: list[dict[str, Any]],
        recommendation: dict[str, Any],
    ) -> str:
        q_lower = query.lower()
        services = recommendation.get("recommended_services_products", [])
        related = recommendation.get("related_case_studies_and_articles", [])

        lines = [
            "*(Notice: Grounded response based on verified Cynbit documentation)*\n"
        ]

        if "tenantease" in q_lower or "tenant" in q_lower:
            lines.append(
                "**TenantEase** is Cynbit's proprietary PropTech property management platform designed for landlords and property managers.\n\n"
                "• **Automated Rent Reminders**: Direct WhatsApp & SMS notifications with integrated payment links.\n"
                "• **Instant UPI Reconciliation**: Real-time payment tracking to eliminate manual bookkeeping.\n"
                "• **Digital Tenancy & Inventory**: Digital lease generation, room management, and automated tenant records.\n\n"
                "Learn more on our [Products page](/products)."
            )
        elif "studio" in q_lower and "revio" in q_lower:
            lines.append(
                "**Cynbit Studio vs. Revio**:\n\n"
                "• **Cynbit Studio**: An adaptive developer intelligence & career prep platform featuring real-time AI code analysis, Skill Radar diagnostics, and pull request review assistance.\n\n"
                "• **Revio**: An AI-powered customer review & multi-location reputation management SaaS that synchronizes reviews across Google Maps, Trustpilot, and Meta with automated sentiment-aware response drafting.\n\n"
                "Explore both on our [Products page](/products)."
            )
        elif "case stud" in q_lower:
            lines.append(
                "**Cynbit Published Case Studies**:\n\n"
                "1. **Pragya Healths (AI Diagnostic Triage)**: Achieved a 64% reduction in patient triage wait times and 99.2% classification accuracy using autonomous clinical triage agents.\n\n"
                "2. **Global Logistics Corp (Legacy ERP Modernization)**: 300% throughput increase and 42% cloud compute cost reduction via containerized Go microservices and zero-downtime cutover.\n\n"
                "Read the full details on our [Case Studies page](/case-studies)."
            )
        else:
            lines.append(
                "**Cynbit Technologies** delivers custom digital engineering and autonomous AI systems from Jaipur, Rajasthan:\n\n"
                "• **Autonomous AI Agents**: Goal-driven multi-turn LLM workflow agents for query triage, document automation, and operational routing.\n"
                "• **Full-Stack Software Development**: Scalable bespoke web and mobile platforms engineered with modern stacks.\n"
                "• **Cloud Infrastructure & Modernization**: High-resilience cloud architectures and legacy migration with zero downtime.\n"
                "• **Proprietary Products**: TenantEase (PropTech), Revio (Reputation AI), and Cynbit Studio (Developer Intelligence).\n\n"
                "For inquiries, visit our [Contact page](/contact) or email `opportunities@cynbit.in`."
            )

        if services:
            lines.append("\n**Relevant Offerings:**")
            for item in services[:2]:
                title = item.get("title", "Offering")
                url = item.get("url", "/services")
                why = item.get("why_recommended", "")
                lines.append(f"• [{title}]({url}): {why}" if why else f"• [{title}]({url})")

        return "\n".join(lines)

    def chat(
        self,
        query: str,
        history: list[dict[str, str]] | None = None,
        top_k: int = 5,
    ) -> dict[str, Any]:
        query = query.strip()
        if not query:
            raise ValueError("Query cannot be empty.")

        query_type = self._classify_query(query, history)

        # ---------------------------------------------------------
        # 1. GREETING PATH
        # ---------------------------------------------------------
        if query_type == "greeting":
            return {
                "assistant": "SmartConnect AI",
                "reply": (
                    "Hello! I'm SmartConnect AI, your conversational assistant for Cynbit Technologies. "
                    "I can answer any general technical, programming, AI, career, or business question, "
                    "as well as provide verified details about Cynbit's engineering services, SaaS products "
                    "(TenantEase, Revio, Cynbit Studio), and documented case studies. How can I help you today?"
                ),
                "intent": {"primary_intent": "Greeting", "ranked_intents": []},
                "recommendations": [],
                "related_resources": [],
                "sources": [],
                "llm_status": "ok",
                "disclaimer": None,
            }

        # ---------------------------------------------------------
        # 2. GENERAL QUESTIONS PATH (Open-ended, programming, AI/ML, career, etc.)
        # ---------------------------------------------------------
        if query_type == "general":
            intent = {"primary_intent": "General Knowledge", "ranked_intents": []}
            history_messages = self._format_conversation_history(history, limit=10)
            llm_messages: list[dict[str, str]] = [
                {"role": "system", "content": GENERAL_SYSTEM_PROMPT},
                *history_messages,
                {"role": "user", "content": query},
            ]

            if not self.llm.is_configured:
                llm_status = "not_configured"
                kb = ConversationalKnowledgeEngine.get_response(query, history=history)
                reply = kb["reply"]
            else:
                try:
                    reply = self.llm.generate(llm_messages)
                    llm_status = "ok"
                except Exception as err:
                    llm_status = "fallback_after_provider_error"
                    kb = ConversationalKnowledgeEngine.get_response(query, history=history)
                    reply = kb["reply"]

            # Strictly no unsolicited recommendations or blueprints for general queries
            return {
                "assistant": "SmartConnect AI",
                "reply": reply,
                "intent": intent,
                "recommendations": [],
                "related_resources": [],
                "sources": [],
                "llm_status": llm_status,
                "disclaimer": None,
            }

        # ---------------------------------------------------------
        # 3. CYNBIT-SPECIFIC OR MIXED QUESTIONS PATH
        # ---------------------------------------------------------
        intent = self.recommender.predict_intent(query, top_k=3)
        recommendation = self.recommender.recommend(query, top_k=top_k)
        knowledge = self.recommender.search_knowledge(query, top_k=top_k)
        sources = self._unique_sources(
            knowledge,
            recommendation.get("recommended_services_products", []),
            recommendation.get("related_case_studies_and_articles", []),
        )

        context = self._build_context(knowledge, recommendation)
        system_content = (
            f"{CYNBIT_SYSTEM_PROMPT}\n\n"
            f"=== VERIFIED CYNBIT REFERENCE MATERIAL ===\n{context}\n"
            f"=== END OF REFERENCE MATERIAL ===\n\n"
            f"Use the verified material above to accurately answer questions regarding Cynbit. "
            f"If the user asks a mixed question (e.g. general tech + Cynbit implementation), "
            f"use your general knowledge for the technical concept and verified Cynbit material for Cynbit claims."
        )

        history_messages = self._format_conversation_history(history, limit=10)
        llm_messages = [
            {"role": "system", "content": system_content},
            *history_messages,
            {"role": "user", "content": query},
        ]

        if not self.llm.is_configured:
            llm_status = "not_configured"
            kb = ConversationalKnowledgeEngine.get_response(query, history=history)
            reply = kb["reply"] if (kb.get("intent", {}).get("primary_intent") != "General Knowledge" or not knowledge) else self._cynbit_offline_fallback(query, knowledge, recommendation)
        else:
            try:
                reply = self.llm.generate(llm_messages)
                llm_status = "ok"
            except Exception:
                llm_status = "fallback_after_provider_error"
                kb = ConversationalKnowledgeEngine.get_response(query, history=history)
                reply = kb["reply"] if (kb.get("intent", {}).get("primary_intent") != "General Knowledge" or not knowledge) else self._cynbit_offline_fallback(query, knowledge, recommendation)

        # Include recommendations and resources for Cynbit and mixed inquiries
        services_recs = recommendation.get("recommended_services_products", [])
        related_resources = recommendation.get("related_case_studies_and_articles", [])

        return {
            "assistant": "SmartConnect AI",
            "reply": reply,
            "intent": intent,
            "recommendations": services_recs if services_recs else [],
            "related_resources": related_resources if related_resources else [],
            "sources": sources,
            "llm_status": llm_status,
            "disclaimer": recommendation.get("disclaimer"),
        }
