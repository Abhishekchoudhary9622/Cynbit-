from __future__ import annotations
import json
from pathlib import Path
from typing import Any
import joblib
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / 'data' / 'cynbit_public_content.json'
MODEL_PATH = ROOT / 'artifacts' / 'intent_classifier.joblib'
INDEX_PATH = ROOT / 'artifacts' / 'content_retrieval_index.joblib'

INTENT_TO_CATEGORY = {
    'AI Automation': ['AI Automation'],
    'Software Development': ['Software Development'],
    'Cloud Infrastructure': ['Cloud Infrastructure'],
    'Digital Marketing & SEO': ['Digital Marketing & SEO'],
    'Property Management': ['Property Management'],
    'EdTech & Career Learning': ['EdTech & Career Learning'],
    'Reputation Management': ['Reputation Management'],
}

class SmartConnectRecommender:
    def __init__(self):
        for p in (DATA_PATH, MODEL_PATH, INDEX_PATH):
            if not p.exists():
                raise FileNotFoundError(f'Missing {p}. Run: python src/train_model.py')
        self.docs = json.loads(DATA_PATH.read_text(encoding='utf-8'))['documents']
        self.classifier = joblib.load(MODEL_PATH)
        index = joblib.load(INDEX_PATH)
        self.vectorizer = index['vectorizer']
        self.matrix = index['matrix']
        self.doc_ids = index['document_ids']
        self.by_id = {d['id']: d for d in self.docs}

    def predict_intent(self, query: str, top_k: int = 3) -> dict[str, Any]:
        query = query.strip()
        if not query:
            raise ValueError('Query cannot be empty.')
        probs = self.classifier.predict_proba([query])[0]
        classes = self.classifier.classes_
        order = np.argsort(probs)[::-1][:top_k]
        ranked = [{'intent': str(classes[i]), 'confidence': round(float(probs[i]), 4)} for i in order]
        return {'primary_intent': ranked[0]['intent'], 'ranked_intents': ranked,
                'model_note': 'Baseline classifier trained on curated synthetic examples; use confidence as a prototype signal, not a calibrated production probability.'}

    def recommend(self, query: str, top_k: int = 5) -> dict[str, Any]:
        query = query.strip()
        if not query:
            raise ValueError('Query cannot be empty.')
        intent = self.predict_intent(query, top_k=3)
        qv = self.vectorizer.transform([query])
        sims = cosine_similarity(qv, self.matrix).ravel()

        # Curated mapping makes the model's output actionable and traceable to the public catalogue.
        primary_doc_ids = {
            'AI Automation': ['services-ai'],
            'Software Development': ['services-software'],
            'Cloud Infrastructure': ['services-cloud'],
            'Digital Marketing & SEO': ['services-marketing'],
            'Property Management': ['product-tenantease'],
            'EdTech & Career Learning': ['product-studio'],
            'Reputation Management': ['product-revio'],
        }
        services = []
        ranked_intents = intent['ranked_intents']
        for rank, item in enumerate(ranked_intents):
            # Always include the most likely class. Include a secondary class only when its
            # model score is reasonably close; this avoids showing unrelated catalogue items.
            if rank > 0 and item['confidence'] < ranked_intents[0]['confidence'] * 0.62:
                continue
            for doc_id in primary_doc_ids.get(item['intent'], []):
                doc = self.by_id.get(doc_id)
                if not doc:
                    continue
                idx = self.doc_ids.index(doc_id)
                services.append({
                    'id': doc['id'], 'title': doc['title'], 'type': doc['type'],
                    'category': doc.get('category'), 'url': doc['url'],
                    'relevance_score': round(float(sims[idx]), 4),
                    'why_recommended': f"The model identified {item['intent']} as a likely requirement category. This match should be confirmed with the visitor's full context."
                })
            if len(services) >= 3:
                break

        related = []
        ranked_ids = np.argsort(sims)[::-1]
        for idx in ranked_ids:
            doc = self.by_id[self.doc_ids[idx]]
            if doc['type'] not in {'case_study', 'blog'}:
                continue
            score = float(sims[idx])
            if score <= 0.015:
                continue
            related.append({
                'id': doc['id'], 'title': doc['title'], 'type': doc['type'],
                'category': doc.get('category'), 'url': doc['url'],
                'relevance_score': round(score, 4),
                'matched_text': doc['text'][:420]
            })
            if len(related) >= top_k:
                break

        return {
            'query': query,
            'intent': intent,
            'recommended_services_products': services,
            'related_case_studies_and_articles': related,
            'disclaimer': 'Prototype recommendations are based on public Cynbit website content and a baseline classifier trained on curated synthetic examples. They are not official quotations, guarantees or evidence of customer conversion likelihood.'
        }

    def search_knowledge(self, query: str, top_k: int=5) -> list[dict[str, Any]]:
        if not query.strip(): raise ValueError('Query cannot be empty.')
        qv=self.vectorizer.transform([query])
        sims=cosine_similarity(qv,self.matrix).ravel()
        idxs=np.argsort(sims)[::-1][:top_k]
        return [{'title':self.by_id[self.doc_ids[i]]['title'],
                 'type':self.by_id[self.doc_ids[i]]['type'],
                 'url':self.by_id[self.doc_ids[i]]['url'],
                 'similarity':round(float(sims[i]),4),
                 'text':self.by_id[self.doc_ids[i]]['text']}
                for i in idxs if sims[i]>0]
