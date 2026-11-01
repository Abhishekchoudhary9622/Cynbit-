# Model Card — Cynbit Service Intelligence Baseline

## Purpose
Classify free-text business requirements into one of seven public Cynbit capability/product categories and provide an initial recommendation for services/products. A separate TF-IDF content index retrieves related public case studies and articles.

## Classes
- AI Automation
- Software Development
- Cloud Infrastructure
- Digital Marketing & SEO
- Property Management
- EdTech & Career Learning
- Reputation Management

## Model
TF-IDF (unigrams and bigrams) + Logistic Regression with balanced class weights. Recommendation content retrieval uses TF-IDF vectors and cosine similarity. This is a lightweight, interpretable baseline chosen to be trainable and deployable without downloading large model weights.

## Data
- 112 curated synthetic requirement examples, 16 per class. Not real visitor queries or CRM data.
- 31 structured public content extracts (service catalogue, products, 13 case studies, selected blogs, company/contact page).
- Public source pages are linked in `data/cynbit_public_content.json`.

## Evaluation
A random stratified 75/25 holdout split (random_state=42) produced:
- Accuracy: 0.7857
- Macro F1: 0.7885
- Train examples: 84
- Test examples: 28

These metrics measure a small, curated synthetic benchmark only. They are not evidence of production accuracy, customer intent prevalence or conversion lift. Do not use the classifier for automated high-stakes decisions.

## Limitations
- Synthetic examples may be easier and more repetitive than real customer language.
- Small benchmark and held-out sample make metrics unstable.
- Intent confidence scores are not probability-calibrated.
- Website content can change; refresh and manually review data.
- The system cannot predict lead conversion or revenue without labelled, consented lead outcome data.
- Case study outcome statements are transcribed from the public website and not independently verified.

## Recommended next validation
Collect a consented, anonymized set of real customer requirements; label them with the Cynbit team; keep a separate test set; evaluate macro-F1 and confusion matrix for classification and Precision@3 / NDCG@3 for recommendations; calibrate confidence; and add human approval before recommendations become business commitments.
