# Cynbit Public Website Scrape & ML Prototype Report

**Prepared:** 1 November 2026  
**Source:** https://www.cynbit.in/  
**Scope:** Public website content only; no private APIs, admin portal, authenticated content, visitor analytics or customer records were accessed.

## 1. Public crawl discovery

The public `robots.txt` file allows crawling of public pages, identifies `https://cynbit.in/sitemap.xml`, advertises a one-second crawl delay, and disallows `/api/`, `/admin/` and `/portal/`. The public sitemap lists 82 URLs.

For this first prototype, 31 selected page records were structured from public extraction: company overview, service catalogue, three SaaS products, 13 case studies, nine blog articles and contact information. The selected records are in `data/cynbit_public_content.json`; exact source URLs are also available in `data/source_manifest.csv`.

This is a focused prototype corpus, not a complete extraction of all 82 sitemap URLs. `src/scrape_cynbit.py` is included to refresh the full public sitemap with a one-second minimum delay, robots rules and private-path exclusions. The scraper needs to be run in an environment with internet access.

## 2. What was collected

| Content type | Count | Use in prototype |
|---|---:|---|
| Company and contact | 2 | Company context and enquiry routing |
| Services | 4 | Capability descriptions and recommendations |
| Products | 3 | Product discovery (Studio, TenantEase, Revio) |
| Case studies | 13 | Similar-project recommendations |
| Blogs | 9 | Supporting knowledge and related reading |
| **Total** | **31** | Public content corpus |

Case-study challenge, solution and outcome fields are transcribed from the public case-study pages. These public claims have not been independently audited and should not be restated as guarantees.

## 3. ML model built

### Intent classifier

- Algorithm: TF-IDF word unigrams/bigrams + Logistic Regression.
- Classes: AI Automation; Software Development; Cloud Infrastructure; Digital Marketing & SEO; Property Management; EdTech & Career Learning; Reputation Management.
- Training examples: 112 curated synthetic user requirement examples (16 per class).
- Held-out evaluation: stratified 75/25 split, random state 42.

### Evaluation on the synthetic holdout

- Accuracy: **78.57%**
- Macro-F1: **0.7885**
- Training rows: 84
- Test rows: 28

These metrics only describe the small synthetic benchmark. They are not production performance estimates and do not measure real Cynbit visitor intent. The final serialized classifier is refit on all 112 curated examples after the holdout evaluation.

### Recommendation engine

A separate TF-IDF content index and cosine similarity search retrieves matching services, products, case studies and articles. The predicted intent selects a traceable service/product candidate, while similarity ranks related public content. Results preserve source URLs.

## 4. Prototype API

FastAPI provides:

- `GET /health`
- `POST /predict-intent`
- `POST /recommend`
- `POST /search-knowledge`

The API was smoke-tested using FastAPI TestClient. Five automated tests passed, covering Property Management/TenantEase, EdTech/Cynbit Studio, SEO/TrendMart, AI Automation and empty-query validation.

## 5. Limitations and production requirements

1. Website content is a small and changing knowledge corpus; refresh and manually review before production use.
2. Synthetic queries are not a substitute for real, anonymized, consented enquiries labelled by Cynbit staff.
3. This prototype does not predict lead conversion or revenue. That requires historical lead outcomes and careful evaluation.
4. The prototype contains the ML classifier and retrieval/recommendation API; it does not yet integrate an LLM conversation model, website widget, production CRM, email sender or live contact form.
5. Case-study results are public website claims, not independently verified facts.
6. Obtain Cynbit's approval before deploying scraped content or connecting to production systems. Provide privacy notice, consent, retention controls, rate limiting, human review and access controls.

## 6. Recommended next step

Use this as a baseline in SmartConnect AI. Ask Cynbit for an approved export of anonymized enquiry text and service labels (and, only if appropriate, outcomes). Have the team label a held-out evaluation set. Then compare the baseline against sentence-transformer embeddings and evaluate recommendations with Precision@3 or NDCG@3 before production rollout.
