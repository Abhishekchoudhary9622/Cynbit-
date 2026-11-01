from pathlib import Path
import sys
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'src'))
from recommendation import SmartConnectRecommender

engine=SmartConnectRecommender()

def test_property_management_intent_and_product():
    result=engine.recommend('We need rent reminders and digital tenant records for our apartments.')
    assert result['intent']['primary_intent']=='Property Management'
    assert any(x['id']=='product-tenantease' for x in result['recommended_services_products'])

def test_edtech_intent_and_product():
    result=engine.recommend('Create an adaptive coding platform with AI mentor and placement preparation.')
    assert result['intent']['primary_intent']=='EdTech & Career Learning'
    assert any(x['id']=='product-studio' for x in result['recommended_services_products'])

def test_marketing_case_study():
    result=engine.recommend('Improve local SEO and organic search traffic for our retail chain.')
    assert result['intent']['primary_intent']=='Digital Marketing & SEO'
    assert any(x['id']=='case-trendmart' for x in result['related_case_studies_and_articles'])

def test_ai_automation_intent():
    result=engine.predict_intent('We want an AI assistant to automate repetitive customer support requests.')
    assert result['primary_intent']=='AI Automation'

def test_empty_query_rejected():
    try:
        engine.recommend('   ')
    except ValueError:
        return
    assert False, 'Empty query should be rejected.'
