from __future__ import annotations

import re
from typing import Any

from .llm_client import LLMClient


SYSTEM_PROMPT = """You are SmartConnect AI, an intelligent and helpful conversational assistant for Cynbit Technologies (cynbit.in).

You are designed to answer questions across a wide range of technical and business subjects while having specialized, verified knowledge about Cynbit Technologies.

You are not a rigid FAQ chatbot. You support natural, flowing paired conversations.

Users can ask questions about software architecture, programming, artificial intelligence, machine learning, cloud engineering, business requirements, education, career preparation, and Cynbit products (TenantEase, Revio, Cynbit Studio).

Your responsibilities:
1. Understand the user's actual question and intent.
2. Respond naturally, clearly, and helpfully.
3. Maintain context across multiple messages.
4. Provide concrete technical explanations with examples or working code when requested.
5. Use verified Cynbit knowledge whenever answering company-specific questions.
6. Provide markdown links for Cynbit resources (/services, /products, /case-studies, /contact).
7. Never invent Cynbit company information, pricing, or client claims.
8. Never force service recommendations into unrelated conversations.
9. Ask clarifying questions only when helpful for architectural scoping."""

CYNBIT_KEYWORDS = {
    "cynbit", "tenantease", "tenant ease", "revio", "cynbit studio", 
    "bitelevate", "bit elevate", "jaipur", "mohak", "ashutosh", "dhawan", 
    "manav seva", "pragya healths", "global logistics", "wizhealth", 
    "urban wardrobe", "cloudy tales", "cynbit.in"
}


class SmartConnectChatEngine:
    def __init__(self, recommender: Any, llm_client: LLMClient | None = None) -> None:
        self.recommender = recommender
        self.llm = llm_client or LLMClient()

    @staticmethod
    def _classify_query(query: str, history: list[dict[str, str]] | None = None) -> str:
        q_lower = query.lower().strip()

        # Check for any greeting variation (hi, hii, hiii, hello, heyy, hey, howdy, etc.)
        if re.search(r"^(hi+|hello+|hey+|howdy|hola|greetings|good\s+(morning|afternoon|evening|day)|yo|sup)\b", q_lower):
            # Only treat as greeting if it's a short intro turn
            if len(q_lower.split()) <= 4:
                return "greeting"

        # Check for direct mentions of Cynbit or its products/services
        has_cynbit_kw = any(kw in q_lower for kw in CYNBIT_KEYWORDS)

        # Check for direct queries about company offerings
        company_phrases = [
            "what services do you", "what services does cynbit", "what do you offer",
            "your services", "your products", "tell me about tenant", "tell me about revio",
            "tell me about studio", "who are you", "contact you", "contact cynbit",
            "hire you", "your pricing", "rates or packages", "schedule a call", 
            "show relevant case studies", "case studies in healthcare", "healthcare case studies",
            "which solution is suitable", "what is tenantease", "what is cynbit",
            "cynbit studio", "how does cynbit work", "how can i contact cynbit",
            "tell me about cynbit's products", "cynbit's products", "cynbit services"
        ]
        is_company_query = any(cp in q_lower for cp in company_phrases)

        # Check if mixed query (general technical + Cynbit context)
        is_mixed = has_cynbit_kw and any(p in q_lower for p in [
            "how cynbit", "how could cynbit", "how can cynbit", "cynbit services could help",
            "cynbit capabilities", "help me implement", "which cynbit", "and cynbit"
        ])

        if is_mixed:
            return "mixed"

        if has_cynbit_kw or is_company_query:
            return "cynbit"

        # Check if user presents a business requirement seeking services/recommendations
        business_phrases = [
            "i run an e-commerce", "i run an ecommerce", "i run a business", "i have a business",
            "i want to automate", "i need ai", "i need automation", "we need", "customer support automation",
            "we need to build a", "looking for an agency", "looking to migrate", "looking for software",
            "can you help us build a scalable saas", "build a scalable saas", "help us migrate",
            "automation for my", "automate customer support", "customer support",
            "i want to build", "want to build an ai", "ai-powered application", "ai-powered app",
            "build an application", "build an app", "build a platform", "build a web application",
            "create an ai", "develop an ai", "help us build", "need a web app", "need a developer"
        ]
        if any(bp in q_lower for bp in business_phrases):
            return "cynbit"

        # Contextual check: If history was discussing Cynbit and user asks follow-up
        if history:
            last_turn = history[-1].get("content", "").lower()
            if any(kw in last_turn for kw in CYNBIT_KEYWORDS) and any(f in q_lower for f in ["how much", "cost", "demo", "contact", "pricing"]):
                return "cynbit"

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
        return sources[:8]

    @staticmethod
    def _build_context(
        knowledge: list[dict[str, Any]],
        recommendation: dict[str, Any],
    ) -> str:
        chunks: list[str] = []
        for item in knowledge[:5]:
            chunks.append(
                f"[SOURCE: {item.get('url', '')}]\n"
                f"TITLE: {item.get('title', '')}\n"
                f"TYPE: {item.get('type', '')}\n"
                f"CONTENT: {str(item.get('text', ''))[:1800]}"
            )
        for key in ("recommended_services_products", "related_case_studies_and_articles"):
            for item in recommendation.get(key, [])[:5]:
                chunks.append(
                    f"[SOURCE: {item.get('url', '')}]\n"
                    f"TITLE: {item.get('title', '')}\n"
                    f"TYPE: {item.get('type', '')}\n"
                    f"CATEGORY: {item.get('category', '')}\n"
                    f"WHY/MATCH: {item.get('why_recommended', item.get('matched_text', ''))}"
                )
        return "\n\n---\n\n".join(chunks)[:10500]

    @staticmethod
    def _fallback_reply(
        query: str,
        intent: dict[str, Any],
        recommendation: dict[str, Any],
        knowledge: list[dict[str, Any]],
    ) -> str:
        primary_intent = intent.get("primary_intent", "Software Architecture & AI Solutions")
        services = recommendation.get("recommended_services_products", [])
        related = recommendation.get("related_case_studies_and_articles", [])
        
        lines = [
            f"Cynbit Technologies delivers custom digital architecture tailored for **{primary_intent}**:\n"
        ]

        if "ai" in query.lower() or "build" in query.lower() or "app" in query.lower() or "platform" in query.lower():
            lines.append(
                "• **Autonomous AI Agents & Workflows**: Multi-turn goal-driven LLM agents that execute tasks, triage complex requests, and automate operations.\n"
                "• **Full-Stack Software Development**: Custom high-throughput web and mobile platforms built with React, Next.js, Go, and Python.\n"
                "• **Cloud & DevOps Modernization**: Resilient AWS/Azure cloud deployments with zero-downtime database cutovers.\n"
            )

        if services:
            lines.append("**Recommended Offerings:**")
            for item in services[:3]:
                title = item.get("title", "Cynbit Offering")
                url = item.get("url", "/services")
                why = item.get("why_recommended", "")
                if why:
                    lines.append(f"• **[{title}]({url})**: {why}")
                else:
                    lines.append(f"• **[{title}]({url})**")
            lines.append("")

        if related:
            lines.append("**Relevant Case Studies:**")
            for item in related[:2]:
                title = item.get("title", "Documented Case Study")
                url = item.get("url", "/case-studies")
                matched = item.get("matched_text", "")
                if matched:
                    lines.append(f"• **[{title}]({url})**: {matched}")
                else:
                    lines.append(f"• **[{title}]({url})**")
            lines.append("")

        lines.append(
            "Would you like to discuss this architecture with our team? "
            "You can reach our engineering architects directly at `opportunities@cynbit.in` or via our [Contact page](/contact)."
        )
        return "\n".join(lines)

    @staticmethod
    def _generate_intelligent_general_fallback(query: str) -> str:
        q = query.lower().strip()

        # 1. Binary Search
        if "binary search" in q or "binary_search" in q:
            return (
                "Here is an efficient, clean implementation of **Binary Search** in Python:\n\n"
                "```python\n"
                "def binary_search(arr: list[int], target: int) -> int:\n"
                "    \"\"\"Return the index of target in a sorted list arr, or -1 if not found.\"\"\"\n"
                "    left, right = 0, len(arr) - 1\n"
                "    while left <= right:\n"
                "        mid = left + (right - left) // 2\n"
                "        if arr[mid] == target:\n"
                "            return mid\n"
                "        elif arr[mid] < target:\n"
                "            left = mid + 1\n"
                "        else:\n"
                "            right = mid - 1\n"
                "    return -1\n\n"
                "# Example:\n"
                "data = [2, 4, 7, 10, 15, 23, 38, 45]\n"
                "print(binary_search(data, 15))  # Output: 4\n"
                "```\n\n"
                "• **Time Complexity**: `O(log n)`\n"
                "• **Space Complexity**: `O(1)` (iterative)"
            )

        # 2. Neural Networks
        if "neural network" in q:
            return (
                "A **Neural Network** is a computational architecture inspired by biological neurons, organized into structured mathematical layers:\n\n"
                "1. **Input Layer**: Ingests raw multidimensional feature vectors.\n"
                "2. **Hidden Layer(s)**: Applies linear transformations followed by non-linear activations: `z = W · x + b`, `a = σ(z)`.\n"
                "3. **Output Layer**: Produces probabilistic classifications (via Softmax) or continuous values.\n\n"
                "**Core Training Lifecycle**:\n"
                "• **Forward Pass**: Passes input through matrices to compute predictions.\n"
                "• **Loss Calculation**: Computes divergence between prediction and ground truth (e.g. Cross-Entropy, MSE).\n"
                "• **Backpropagation**: Calculates partial derivatives `∂L/∂W` via the chain rule to update weights with gradient descent."
            )

        # 3. Python Code / Example
        if "python example" in q or "code example" in q or "give me a python" in q:
            return (
                "Here is a minimal Neural Network implementation from scratch in Python using NumPy:\n\n"
                "```python\n"
                "import numpy as np\n\n"
                "def sigmoid(x):\n"
                "    return 1 / (1 + np.exp(-x))\n\n"
                "def sigmoid_derivative(x):\n"
                "    return x * (1 - x)\n\n"
                "# XOR training data\n"
                "X = np.array([[0,0], [0,1], [1,0], [1,1]])\n"
                "y = np.array([[0], [1], [1], [0]])\n\n"
                "# Initialize weights and bias\n"
                "np.random.seed(42)\n"
                "weights = np.random.uniform(size=(2, 1))\n"
                "bias = 0.5\n\n"
                "# Forward pass\n"
                "predictions = sigmoid(np.dot(X, weights) + bias)\n"
                "print('Initial Output:\\n', predictions)\n"
                "```"
            )

        # 4. Code explanation
        if "explain each line" in q or "explain the code" in q:
            return (
                "Here is a line-by-line explanation of the Python code:\n\n"
                "1. `import numpy as np`: Loads NumPy for hardware-accelerated matrix operations.\n"
                "2. `sigmoid(x)`: Implements the non-linear logistic function `1 / (1 + e^-x)` mapping values to `(0, 1)`.\n"
                "3. `sigmoid_derivative(x)`: Computes `x * (1 - x)` used for gradient computation in backprop.\n"
                "4. `X` & `y`: Define the feature matrix and ground-truth target labels.\n"
                "5. `np.dot(X, weights) + bias`: Multiplies the input matrix by weight parameters and adds bias.\n"
                "6. `predictions`: Applies activation to obtain final layer activations."
            )

        # 5. Machine Learning
        if "machine learning" in q:
            return (
                "**Machine Learning (ML)** is the science of training algorithms to discover underlying patterns from data to make predictions without hardcoded rules.\n\n"
                "• **Supervised Learning**: Models learn from labeled pairs (e.g. regression, classification).\n"
                "• **Unsupervised Learning**: Models discover latent structures in unlabeled data (e.g. clustering, PCA).\n"
                "• **Reinforcement Learning**: Agents learn optimal policies through trial, error, and scalar rewards."
            )

        # 6. SQL vs MongoDB
        if "sql" in q and "mongodb" in q:
            return (
                "**SQL vs MongoDB**: Architectural Comparison:\n\n"
                "| Dimension | SQL (PostgreSQL / MySQL) | MongoDB (NoSQL) |\n"
                "|---|---|---|\n"
                "| **Data Paradigm** | Relational tables, rows, columns | BSON document collections |\n"
                "| **Schema** | Rigid, strict schema with migrations | Flexible, dynamic JSON documents |\n"
                "| **Transactions** | Full ACID guarantees out of the box | Multi-document ACID supported |\n"
                "| **Query Language** | Structured SQL queries & joins | MQL (MongoDB Query Language) aggregation pipelines |\n"
                "| **Scaling** | Vertical scaling + read replicas | Native horizontal sharding |"
            )

        # 7. Transformers
        if "transformer" in q:
            return (
                "**Transformers** ('Attention Is All You Need', Vaswani et al., 2017) are deep learning architectures based on **Self-Attention**:\n\n"
                "1. **Self-Attention**: Computes dynamic relationships between all tokens in a sequence: `Attention(Q, K, V) = softmax(QK^T / √d_k)V`.\n"
                "2. **Multi-Head Attention**: Allows the model to attend to information at different subspace representations simultaneously.\n"
                "3. **Positional Encoding**: Injects positional vectors so the network understands word order without recurrence.\n"
                "4. **Feed-Forward Layers & Residuals**: Preserves gradient stability across deep multi-billion parameter stacks."
            )

        # 8. Full-Stack Interview
        if "interview" in q:
            return (
                "Here is an actionable roadmap for **Full-Stack Developer Interviews**:\n\n"
                "1. **Frontend Architecture**: React virtual DOM reconciliation, hooks lifecycle, state management, and Core Web Vitals (LCP, INP, CLS).\n"
                "2. **Backend Engineering**: RESTful API design, database indexing, connection pooling, caching strategies (Redis), and concurrency.\n"
                "3. **Data Structures & Algorithms**: Hash maps, two-pointer techniques, sliding window, binary search, trees, and graphs.\n"
                "4. **System Design**: Microservices vs monolith, load balancing, rate limiting, and zero-downtime deployment strategies."
            )

        # 9. Resignation Email
        if "resignation" in q:
            return (
                "Here is a polite and professional **Resignation Email** template:\n\n"
                "**Subject:** Resignation — [Your Full Name]\n\n"
                "Dear [Manager's Name],\n\n"
                "Please accept this email as formal notification that I am resigning from my position as [Your Job Title] at [Company Name]. My last working day will be [Date, e.g. two weeks from today].\n\n"
                "I am sincerely grateful for the opportunities I have had during my time with the team. I have enjoyed our collaboration and appreciate the support provided during my tenure.\n\n"
                "During my notice period, I will do everything possible to ensure a seamless transition of my responsibilities and complete any outstanding deliverables.\n\n"
                "I wish you and the team continued success.\n\n"
                "Sincerely,\n\n"
                "[Your Full Name]\n"
                "[Your Contact Information]"
            )

        # 10. Poetry / Haiku
        if "haiku" in q or "poem" in q:
            return (
                "Golden autumn leaves,\n"
                "Dancing gently in the breeze,\n"
                "Winter whispers near."
            )

        # 11. React / Frontend
        if "react" in q or "virtual dom" in q or "hooks" in q:
            return (
                "**React** is a declarative, component-based UI library developed by Meta:\n\n"
                "• **Virtual DOM**: React maintains a lightweight in-memory representation of the DOM. When state changes, React computes the diff (reconciliation) and batches minimal real-DOM updates.\n"
                "• **Hooks**: Functions like `useState`, `useEffect`, `useCallback`, and `useMemo` let functional components manage state and side effects.\n"
                "• **One-Way Data Flow**: State flows down via props and events bubble up, ensuring predictable application architecture."
            )

        # General helpful conversational response
        return (
            f"I can certainly help you explore that topic! Whether you're working on software engineering, "
            f"AI/ML architecture, system design, or business workflows, feel free to share more details about "
            f"what you'd like to build or achieve. I can also help you explore Cynbit Technologies' verified "
            f"services, proprietary SaaS products (TenantEase, Revio, Cynbit Studio), and documented case studies!"
        )

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

        # 1. GREETINGS (hi, hii, hello, hey, good morning, etc.)
        if query_type == "greeting":
            reply = (
                "Hello! I'm SmartConnect AI, your architectural assistant for Cynbit Technologies. "
                "I can help you explore our services, understand our products (TenantEase, Revio, Cynbit Studio), "
                "discover relevant case studies, or assist with your business and technical questions. How can I help you today?"
            )
            return {
                "assistant": "SmartConnect AI",
                "reply": reply,
                "intent": {"primary_intent": "Greeting", "ranked_intents": []},
                "recommendations": [],
                "related_resources": [],
                "sources": [],
                "llm_status": "ok",
                "disclaimer": None,
            }

        # 2. GENERAL KNOWLEDGE QUERY
        if query_type == "general":
            intent = {"primary_intent": "General Knowledge", "ranked_intents": []}
            recommendations = []
            related_resources = []
            sources = []
            disclaimer = None

            if self.llm.is_configured:
                messages: list[dict[str, str]] = [
                    {"role": "system", "content": SYSTEM_PROMPT}
                ]
                for turn in (history or [])[-10:]:
                    messages.append({"role": turn["role"], "content": turn["content"][:2000]})
                messages.append({"role": "user", "content": query})
                try:
                    reply = self.llm.generate(messages)
                    llm_status = "ok"
                except Exception:
                    llm_status = "fallback_after_provider_error"
                    reply = self._generate_intelligent_general_fallback(query)
            else:
                llm_status = "not_configured"
                reply = self._generate_intelligent_general_fallback(query)

            return {
                "assistant": "SmartConnect AI",
                "reply": reply,
                "intent": intent,
                "recommendations": recommendations,
                "related_resources": related_resources,
                "sources": sources,
                "llm_status": llm_status,
                "disclaimer": disclaimer,
            }

        # 3. CYNBIT-SPECIFIC OR MIXED QUERY
        intent = self.recommender.predict_intent(query, top_k=3)
        recommendation = self.recommender.recommend(query, top_k=top_k)
        knowledge = self.recommender.search_knowledge(query, top_k=top_k)
        sources = self._unique_sources(
            knowledge,
            recommendation.get("recommended_services_products", []),
            recommendation.get("related_case_studies_and_articles", []),
        )

        llm_status = "not_configured"
        reply = self._fallback_reply(query, intent, recommendation, knowledge)
        if self.llm.is_configured:
            context = self._build_context(knowledge, recommendation)
            system_msg = SYSTEM_PROMPT + "\n\nVERIFIED CYNBIT REFERENCE MATERIAL:\n" + context
            messages: list[dict[str, str]] = [
                {"role": "system", "content": system_msg}
            ]
            for turn in (history or [])[-10:]:
                messages.append({"role": turn["role"], "content": turn["content"][:2000]})
            messages.append({"role": "user", "content": query})
            try:
                reply = self.llm.generate(messages)
                llm_status = "ok"
            except Exception:
                llm_status = "fallback_after_provider_error"

        return {
            "assistant": "SmartConnect AI",
            "reply": reply,
            "intent": intent,
            "recommendations": recommendation.get("recommended_services_products", []),
            "related_resources": recommendation.get("related_case_studies_and_articles", []),
            "sources": sources,
            "llm_status": llm_status,
            "disclaimer": recommendation.get("disclaimer"),
        }
