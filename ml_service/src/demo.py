from recommendation import SmartConnectRecommender

if __name__ == '__main__':
    engine=SmartConnectRecommender()
    tests=[
        'I want to automate customer support and FAQs using an AI assistant.',
        'Our property company needs rent reminders and tenant records.',
        'We need to migrate our application to AWS with autoscaling.',
        'Help us improve local SEO and marketing campaigns.',
        'I want an adaptive coding platform with AI mentor and mock interviews.'
    ]
    for q in tests:
        print('\n'+'='*90+'\nQUERY:',q)
        result=engine.recommend(q,top_k=5)
        print('PREDICTED INTENT:',result['intent']['primary_intent'])
        print('SERVICE / PRODUCT MATCHES:')
        for item in result['recommended_services_products']:
            print(f" - [{item['type']}] {item['title']} | {item['url']} | score={item['relevance_score']}")
        print('RELATED CASE STUDIES / ARTICLES:')
        for item in result['related_case_studies_and_articles']:
            print(f" - [{item['type']}] {item['title']} | {item['url']} | score={item['relevance_score']}")
