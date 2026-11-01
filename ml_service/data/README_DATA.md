# Dataset notes

`cynbit_public_content.json` contains structured content extracted from publicly accessible Cynbit pages inspected on 2026-11-01. It includes the service page, products, contact information, 13 case studies and selected blog pages. It is a useful prototype corpus, not a full 82-page archive. The public sitemap advertised 82 URLs.

`intent_training.csv` contains curated synthetic example queries labelled against Cynbit's public capability categories. These are not real customer prompts, enquiries, CRM records or production labels. They are used only to demonstrate a baseline intent classifier.

Case-study outcomes and other claims are transcribed as they appear on the public pages. They have not been independently audited. Keep the source URL attached when showing them and do not convert them into guarantees.

To refresh the corpus, run `python src/scrape_cynbit.py --max-pages 82 --output data/live_scrape.json`. The scraper observes `robots.txt`, honours the advertised crawl delay, and skips disallowed paths. Review any refreshed content before using it in a production assistant.
