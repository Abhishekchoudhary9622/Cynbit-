from __future__ import annotations
import json, sys
from pathlib import Path
import joblib
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, f1_score, classification_report, confusion_matrix
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import normalize

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'data'
ARTIFACTS = ROOT / 'artifacts'
ARTIFACTS.mkdir(exist_ok=True)


def main() -> None:
    df = pd.read_csv(DATA / 'intent_training.csv')
    if df['label'].nunique() < 2:
        raise ValueError('At least two intent classes are required.')
    X_train, X_test, y_train, y_test = train_test_split(
        df['text'], df['label'], test_size=0.25, random_state=42, stratify=df['label']
    )
    pipeline = Pipeline([
        ('tfidf', TfidfVectorizer(ngram_range=(1, 2), min_df=1, max_features=12000,
                                  strip_accents='unicode', sublinear_tf=True,
                                  stop_words='english')),
        ('classifier', LogisticRegression(max_iter=1500, class_weight='balanced',
                                          C=2.0, random_state=42))
    ])
    pipeline.fit(X_train, y_train)
    pred = pipeline.predict(X_test)
    report = classification_report(y_test, pred, output_dict=True, zero_division=0)
    metrics = {
        'model': 'TF-IDF + LogisticRegression',
        'task': 'service-intent classification',
        'accuracy_test_split': round(float(accuracy_score(y_test, pred)), 4),
        'macro_f1_test_split': round(float(f1_score(y_test, pred, average='macro')), 4),
        'train_rows': int(len(X_train)),
        'test_rows': int(len(X_test)),
        'total_rows': int(len(df)),
        'classes': sorted(df['label'].unique().tolist()),
        'classification_report': report,
        'confusion_matrix_labels': sorted(df['label'].unique().tolist()),
        'confusion_matrix': confusion_matrix(y_test, pred, labels=sorted(df['label'].unique())).tolist(),
        'data_warning': 'Training examples are curated synthetic examples, not actual Cynbit visitor or CRM data. Test metrics measure this small synthetic benchmark only; they are not production performance estimates.'
    }
    # Refit the production artifact on all curated examples after evaluating the holdout split.
    final_pipeline = Pipeline([
        ('tfidf', TfidfVectorizer(ngram_range=(1, 2), min_df=1, max_features=12000,
                                  strip_accents='unicode', sublinear_tf=True,
                                  stop_words='english')),
        ('classifier', LogisticRegression(max_iter=1500, class_weight='balanced',
                                          C=2.0, random_state=42))
    ])
    final_pipeline.fit(df['text'], df['label'])
    joblib.dump(final_pipeline, ARTIFACTS / 'intent_classifier.joblib')

    corpus = json.loads((DATA / 'cynbit_public_content.json').read_text(encoding='utf-8'))['documents']
    def doc_text(d):
        meta = ' '.join(str(v) for v in d.get('metadata', {}).values())
        return ' '.join([d.get('title',''), d.get('type',''), d.get('category') or '', d.get('text',''), meta])
    corpus_texts = [doc_text(d) for d in corpus]
    doc_vectorizer = TfidfVectorizer(ngram_range=(1,2), min_df=1, max_features=30000,
                                     strip_accents='unicode', sublinear_tf=True,
                                     stop_words='english')
    doc_matrix = doc_vectorizer.fit_transform(corpus_texts)
    joblib.dump({'vectorizer': doc_vectorizer, 'matrix': doc_matrix,
                 'document_ids': [d['id'] for d in corpus]}, ARTIFACTS / 'content_retrieval_index.joblib')
    (ARTIFACTS / 'metrics.json').write_text(json.dumps(metrics, indent=2), encoding='utf-8')
    print(json.dumps({k:v for k,v in metrics.items() if k not in ('classification_report','confusion_matrix')}, indent=2))

if __name__ == '__main__':
    main()
