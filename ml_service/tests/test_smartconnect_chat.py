from src.smartconnect.chat_engine import SmartConnectChatEngine


class FakeLLM:
    def __init__(self, configured=False):
        self.is_configured = configured

    def generate(self, messages):
        assert messages[0]["role"] == "system"
        return "This is a grounded test answer."


class FakeRecommender:
    def predict_intent(self, query, top_k=3):
        return {"primary_intent": "AI Automation", "ranked_intents": []}

    def recommend(self, query, top_k=5):
        return {
            "recommended_services_products": [
                {"title": "AI Automation", "type": "service", "url": "https://www.cynbit.in/services"}
            ],
            "related_case_studies_and_articles": [],
            "disclaimer": "Prototype recommendation.",
        }

    def search_knowledge(self, query, top_k=5):
        return [
            {
                "title": "AI Automation Services",
                "type": "service",
                "url": "https://www.cynbit.in/services",
                "text": "Cynbit describes AI automation and autonomous agents.",
            }
        ]


def test_chat_uses_retrieval_fallback_without_api_key():
    chat = SmartConnectChatEngine(FakeRecommender(), FakeLLM(configured=False))
    result = chat.chat("I need AI customer support automation")
    assert result["assistant"] == "SmartConnect AI"
    assert result["llm_status"] == "not_configured"
    assert result["reply"]
    assert result["sources"][0]["url"] == "https://www.cynbit.in/services"


def test_chat_uses_llm_when_configured():
    chat = SmartConnectChatEngine(FakeRecommender(), FakeLLM(configured=True))
    result = chat.chat("I need AI customer support automation", history=[])
    assert result["llm_status"] == "ok"
    assert result["reply"] == "This is a grounded test answer."
