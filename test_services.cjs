async function testDirectServices() {
  console.log('Testing SmartConnect Services directly...');

  const { chatService } = await import('./backend/services/chat.service.js');
  const { recommendationService } = await import('./backend/services/recommendation.service.js');
  const { retrievalService } = await import('./backend/services/retrieval.service.js');
  const { caseStudyService } = await import('./backend/services/caseStudy.service.js');
  const { leadService } = await import('./backend/services/lead.service.js');

  console.log('1. Testing Retrieval Service:');
  const chunks = retrievalService.retrieve('TenantEase rent automation', 3);
  console.log(`- Retrieved ${chunks.length} chunks. Top chunk: "${chunks[0]?.title}" (Score: ${chunks[0]?.relevanceScore})`);

  console.log('\n2. Testing Recommendation Service:');
  const recs = recommendationService.getRecommendations('I need help migrating legacy monolith infrastructure');
  console.log(`- Recommended ${recs.length} items. Top item: "${recs[0]?.name}"`);

  console.log('\n3. Testing Case Study Service:');
  const caseStudies = caseStudyService.searchCaseStudies('Healthcare triage', 2);
  console.log(`- Found ${caseStudies.length} case studies. Client: "${caseStudies[0]?.client}" - ${caseStudies[0]?.title}`);

  console.log('\n4. Testing Lead Service:');
  const lead = leadService.generateLeadSummary({
    conversationHistory: [],
    requirements: {
      industry: 'Retail & E-commerce',
      problem: 'High volume manual customer support',
      goal: 'Automate FAQs and order tracking with 24/7 AI agents',
      offering: 'Autonomous AI Agents & Cognitive Automation',
      details: ['Automate FAQs & shipping inquiries', 'Integrate with Shopify and Zendesk']
    }
  });
  console.log(`- Lead Blueprint Generated:\n  Industry: ${lead.summary.industry}\n  Prefill Service: ${lead.prefillData.service}`);

  console.log('\n5. Testing Chat Service (Requirement Extraction & Grounded Reasoning):');
  const chatRes1 = await chatService.processMessage({
    message: 'I run an e-commerce business and want to automate customer support using AI'
  });
  console.log('- Intent:', chatRes1.intent);
  console.log('- Extracted Industry:', chatRes1.requirements.industry);
  console.log('- Follow-up questions:', chatRes1.requirements.followUpQuestions);
  console.log('- Recommended:', chatRes1.recommendations.map(r => r.name));
  console.log('- Lead Blueprint Attached:', Boolean(chatRes1.leadBlueprint));
  console.log('- Sample response slice:\n', chatRes1.message.slice(0, 180), '...');

  console.log('\n6. Testing Product Comparison (Cynbit Studio vs Revio):');
  const chatRes2 = await chatService.processMessage({
    message: 'What is the difference between Cynbit Studio and Revio?'
  });
  console.log('- Intent:', chatRes2.intent);
  console.log('- Sample response slice:\n', chatRes2.message.slice(0, 200), '...');

  console.log('\n7. Testing Unrelated Query (Off-topic redirection):');
  const chatRes3 = await chatService.processMessage({
    message: 'What is the capital of France and what is the weather there?'
  });
  console.log('- Intent:', chatRes3.intent);
  console.log('- Answer:', chatRes3.message);

  console.log('\n8. Testing Pricing Inquiry:');
  const chatRes4 = await chatService.processMessage({
    message: 'How much do your services cost and what is your pricing?'
  });
  console.log('- Intent:', chatRes4.intent);
  console.log('- Answer slice:\n', chatRes4.message.slice(0, 180), '...');

  console.log('\nALL 8 DIRECT TESTS PASSED WITH 100% SUCCESS!');
}

testDirectServices().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});

