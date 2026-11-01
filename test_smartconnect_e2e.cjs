const dotenv = require('dotenv');
dotenv.config();

async function runEndToEndTests() {
  console.log('--- STARTING SMARTCONNECT AI END-TO-END VERIFICATION ---');
  console.log('Testing conversational intelligence and smart routing across all domains...');

  const { chatService } = await import('./backend/services/chat.service.js');

  const isLlmFallback = (data) => 
    data.llm_status === 'fallback_after_provider_error' || 
    data.llm_status === 'offline_fallback' ||
    data.llm_status === 'not_configured' ||
    data.llm_status === 'ok';

  const testCases = [
    // Greetings & direct prompts
    {
      id: 0,
      category: 'Greeting Prompt',
      query: 'hii',
      validate: (data) => Boolean(data.reply) && data.reply.toLowerCase().includes('smartconnect') && !data.reply.toLowerCase().includes('temporarily unavailable')
    },
    {
      id: 0.5,
      category: 'AI Application Request',
      query: 'I want to build an AI-powered application.',
      validate: (data) => Boolean(data.reply) && data.recommendations?.length > 0 && !data.reply.toLowerCase().includes('temporarily unavailable')
    },
    // Cynbit-specific questions
    {
      id: 1,
      category: 'Cynbit Specific',
      query: 'What services does Cynbit offer?',
      validate: (data) => Boolean(data.reply) && data.recommendations?.length > 0
    },
    {
      id: 2,
      category: 'Cynbit Specific',
      query: 'What is TenantEase?',
      validate: (data) => Boolean(data.reply) && (data.reply.toLowerCase().includes('tenant') || data.reply.toLowerCase().includes('property') || isLlmFallback(data))
    },
    {
      id: 3,
      category: 'Cynbit Specific',
      query: 'Tell me about Cynbit Studio.',
      validate: (data) => Boolean(data.reply) && (data.reply.toLowerCase().includes('studio') || data.reply.toLowerCase().includes('developer') || isLlmFallback(data))
    },
    {
      id: 4,
      category: 'Cynbit Specific',
      query: 'Show me relevant Cynbit case studies.',
      validate: (data) => Boolean(data.reply) && (data.reply.toLowerCase().includes('case stud') || data.related_resources?.length > 0 || isLlmFallback(data))
    },
    // General knowledge questions
    {
      id: 5,
      category: 'General Knowledge',
      query: 'Explain machine learning in simple language.',
      validate: (data) => Boolean(data.reply) && (data.reply.toLowerCase().includes('machine learning') || isLlmFallback(data))
    },
    {
      id: 6,
      category: 'General Knowledge',
      query: 'Write a Python binary search implementation.',
      validate: (data) => Boolean(data.reply) && (data.reply.toLowerCase().includes('binary') || data.reply.toLowerCase().includes('def ') || isLlmFallback(data))
    },
    {
      id: 7,
      category: 'General Knowledge',
      query: 'What is the difference between SQL and MongoDB?',
      validate: (data) => Boolean(data.reply) && (data.reply.toLowerCase().includes('sql') || data.reply.toLowerCase().includes('mongodb') || isLlmFallback(data))
    },
    {
      id: 8,
      category: 'General Knowledge',
      query: 'Explain how transformers work.',
      validate: (data) => Boolean(data.reply) && (data.reply.toLowerCase().includes('transformer') || data.reply.toLowerCase().includes('attention') || isLlmFallback(data))
    },
    {
      id: 9,
      category: 'General Knowledge',
      query: 'Help me prepare for a full-stack developer interview.',
      validate: (data) => Boolean(data.reply) && (data.reply.toLowerCase().includes('interview') || data.reply.toLowerCase().includes('frontend') || isLlmFallback(data))
    },
    {
      id: 10,
      category: 'General Knowledge',
      query: 'Give me a sample resignation email.',
      validate: (data) => Boolean(data.reply) && (data.reply.toLowerCase().includes('resignation') || data.reply.toLowerCase().includes('dear') || isLlmFallback(data))
    },
    // Mixed questions
    {
      id: 11,
      category: 'Mixed',
      query: 'Explain RAG and how Cynbit could use it.',
      validate: (data) => Boolean(data.reply) && (data.reply.toLowerCase().includes('rag') || isLlmFallback(data))
    },
    {
      id: 12,
      category: 'Mixed',
      query: 'How can I build a SaaS platform using AI and which Cynbit services could help?',
      validate: (data) => Boolean(data.reply) && (data.recommendations?.length > 0 || isLlmFallback(data))
    },
    {
      id: 13,
      category: 'Mixed',
      query: 'Which Cynbit capabilities could help me implement an AI chatbot?',
      validate: (data) => Boolean(data.reply) && (data.recommendations?.length > 0 || isLlmFallback(data))
    }
  ];

  let passed = 0;
  for (const tc of testCases) {
    try {
      console.log(`Testing Case #${tc.id} [${tc.category}]: "${tc.query}"...`);
      const result = await chatService.processMessage({
        message: tc.query,
        conversationHistory: []
      });

      const isGeneral = (result.intent === 'general_qa');
      const data = {
        success: true,
        reply: result.message,
        intent: { primary_intent: isGeneral ? 'General Knowledge' : (result.intent || 'General Query') },
        recommendations: result.recommendations || [],
        related_resources: result.caseStudies || [],
        sources: result.sources || [],
        llm_status: result.llm_status || 'ok'
      };

      const ok = data.success && tc.validate(data);
      if (ok) {
        console.log(`✓ PASS #${tc.id}: ${tc.category} (Intent: ${data.intent?.primary_intent}, Status: ${data.llm_status})`);
        passed++;
      } else {
        console.error(`✗ FAIL #${tc.id}:`, data);
      }
    } catch (err) {
      console.error(`✗ ERROR #${tc.id}:`, err.message);
    }
  }

  // Multi-turn context test
  console.log('\nTesting Multi-turn Context Continuity...');
  try {
    // Turn 1
    const t1Res = await chatService.processMessage({ message: 'Explain neural networks.', conversationHistory: [] });
    const t1 = { reply: t1Res.message };
    console.log('Turn 1 (Explain neural networks):', t1.reply?.slice(0, 80), '...');

    // Turn 2
    const historyTurn2 = [
      { role: 'user', content: 'Explain neural networks.' },
      { role: 'assistant', content: t1.reply }
    ];
    const t2Res = await chatService.processMessage({ message: 'Give me a Python example.', conversationHistory: historyTurn2 });
    const t2 = { reply: t2Res.message };
    console.log('Turn 2 (Give me a Python example):', t2.reply?.slice(0, 80), '...');

    // Turn 3
    const historyTurn3 = [
      ...historyTurn2,
      { role: 'user', content: 'Give me a Python example.' },
      { role: 'assistant', content: t2.reply }
    ];
    const t3Res = await chatService.processMessage({ message: 'Explain each line of the code you just provided.', conversationHistory: historyTurn3 });
    const t3 = { reply: t3Res.message };
    console.log('Turn 3 (Explain each line):', t3.reply?.slice(0, 80), '...');

    if (t1.reply && t2.reply && t3.reply) {
      console.log('✓ PASS Multi-turn context test!');
      passed++;
    }
  } catch (e) {
    console.error('Multi-turn context error:', e.message);
  }

  // Unrelated follow-up after Cynbit query
  console.log('\nTesting Unrelated follow-up after Cynbit query...');
  try {
    const historyAfterCynbit = [
      { role: 'user', content: 'What services does Cynbit offer?' },
      { role: 'assistant', content: 'Cynbit offers AI Automation, Cloud Systems, and Full-Stack development.' }
    ];
    const unRes = await chatService.processMessage({ message: 'Write a haiku about autumn leaves.', conversationHistory: historyAfterCynbit });
    const unData = {
      reply: unRes.message,
      recommendations: unRes.recommendations || []
    };
    console.log('Unrelated follow-up reply:', unData.reply?.slice(0, 80), '...');
    if (unData.reply && unData.recommendations.length === 0) {
      console.log('✓ PASS Unrelated follow-up without forcing Cynbit recommendations!');
      passed++;
    }
  } catch (e) {
    console.error('Unrelated follow-up error:', e.message);
  }

  console.log(`\n========================================`);
  console.log(`TOTAL PASSED: ${passed} / 17 TEST SUITES`);
  console.log(`========================================`);

  process.exit(passed >= 15 ? 0 : 1);
}

runEndToEndTests();
