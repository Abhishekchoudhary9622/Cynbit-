# Cynbit SmartConnect ML Prototype

A reproducible prototype that uses selected public Cynbit website content to classify user requirements and recommend relevant services, products, case studies and articles.

## What is included

- `data/cynbit_public_content.json`: 31 source-linked structured documents collected from publicly accessible Cynbit pages inspected on 2026-11-01.
- `data/intent_training.csv`: 112 curated synthetic requirement examples across seven capability categories. These are not real visitors, enquiries or CRM data.
- `src/scrape_cynbit.py`: refresh crawler driven by the public sitemap and robots.txt. It honours the advertised crawl delay and skips disallowed/private paths.
- `src/train_model.py`: trains and evaluates a TF-IDF + Logistic Regression intent classifier and builds a TF-IDF content retrieval index.
- `src/recommendation.py`: hybrid intent + content-similarity recommender.
- `src/api.py`: FastAPI endpoints for intent prediction, recommendations and knowledge search.
- `src/demo.py`: sample CLI demonstration.
- `artifacts/`: trained classifier, retrieval index and evaluation metrics.

## Data provenance and limits

The public sitemap advertised 82 URLs. This initial prototype contains 31 selected structured extracts: company/contact information, service descriptions, three products, 13 case studies and selected blogs. It is not a full archive of all 82 URLs. Some entries are concise structured summaries extracted from the public pages; each record retains its source URL.

The classifier training examples are curated synthetic examples inspired by published categories. They are not real Cynbit customer data. The model is a baseline proof-of-concept, not a production-grade conversion or lead-scoring model. The held-out metrics describe performance on a small synthetic benchmark only.

The case-study outcome claims are transcribed from Cynbit's public pages and are not independently verified. Do not represent them as guarantees.

## Setup

Python 3.10+ recommended.

```bash
python -m venv .venv
# Windows: .venv\\Scripts\\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
python src/train_model.py
python src/demo.py
```

## Run API

```bash
uvicorn src.api:app --reload --app-dir .
```

Open `http://127.0.0.1:8000/docs` for the interactive API docs.

Example:

```bash
curl -X POST http://127.0.0.1:8000/recommend \\
  -H "Content-Type: application/json" \\
  -d '{"query":"I need an AI chatbot to answer e-commerce customer questions and track orders","top_k":5}'
```

## Refresh public website data

```bash
python src/scrape_cynbit.py --max-pages 82 --output data/live_scrape.json
```

The refresh script:
- reads the public `robots.txt` and sitemap;
- only visits `cynbit.in` / `www.cynbit.in` pages;
- respects the crawl delay (minimum 1 second if advertised);
- skips `/api/`, `/admin/`, `/portal/` and any URL disallowed by robots.txt;
- saves source URL, title, description and extracted main text;
- reports errors without stopping the whole crawl.

Review refreshed data before ingesting it into a production RAG system. Public crawl permission is not permission to access private user data or restricted endpoints.

## Endpoints

- `GET /health`
- `POST /predict-intent` body: `{"query":"..."}`
- `POST /recommend` body: `{"query":"...","top_k":5}`
- `POST /search-knowledge` body: `{"query":"...","top_k":5}`

## Next steps for a production SmartConnect integration

1. Confirm the data with Cynbit and obtain permission to use it in a deployed assistant.
2. Replace synthetic intent examples with reviewed, anonymized, consented historical enquiries if available.
3. Evaluate recommendations with human-reviewed relevance judgments (Precision@3 / NDCG@3).
4. Add an LLM/RAG layer for conversational responses and citations; this prototype exposes the retrieval/recommendation foundation but does not call an LLM.
5. Connect to Cynbit's actual contact form/API only with repository access and approval.
6. Add privacy notice, consent, retention limits, abuse protection, monitoring and admin review.

## Model design

- Intent classification: TF-IDF unigrams/bigrams + Logistic Regression.
- Content retrieval: TF-IDF + cosine similarity over the public content corpus.
- Ranking: lexical semantic similarity with a small, transparent boost when document categories align with predicted intent.

This is deliberately a lightweight, interpretable baseline. Sentence-transformer embeddings or a learned ranking model can be evaluated later, once a larger reviewed dataset is available.
