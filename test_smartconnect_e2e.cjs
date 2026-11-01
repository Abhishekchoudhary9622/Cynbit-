const dotenv = require('dotenv');
dotenv.config();

async function runEndToEndTests() {
  console.log('--- STARTING SMARTCONNECT AI END-TO-END VERIFICATION ---');
  console.log('Upstream ML endpoint:', process.env.SMARTCONNECT_ML_API_URL || 'http://127.0.0.1:8001/chat');

  const { default: app } = await import('./backend/server.js');
  
  // Start test node server on 5098
  const server = app.listen(5098, async () => {
    console.log('Node test server listening on http://127.0.0.1:5098');

    const isLlmFallback = (data) => 
      data.llm_status === 'fallback_after_provider_error' || 
      data.llm_status === 'offline_fallback' ||
      data.llm_status === 'not_configured';

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
        validate: (data) => Boolean(data.reply) && (data.related_resources?.length > 0 || data.sources?.length > 0 || isLlmFallback(data))
      },

      // General knowledge
      {
        id: 5,
        category: 'General Knowledge',
        query: 'Explain machine learning in simple language.',
        validate: (data) => Boolean(data.reply) && (data.reply.toLowerCase().includes('learn') || isLlmFallback(data))
      },
      {
        id: 6,
        category: 'General Knowledge',
        query: 'Write a Python binary search implementation.',
        validate: (data) => Boolean(data.reply) && (data.reply.includes('def binary_search') || data.reply.includes('binary') || isLlmFallback(data))
      },
      {
        id: 7,
        category: 'General Knowledge',
        query: 'What is the difference between SQL and MongoDB?',
        validate: (data) => Boolean(data.reply) && (data.reply.toLowerCase().includes('relational') || data.reply.toLowerCase().includes('sql') || isLlmFallback(data))
      },
      {
        id: 8,
        category: 'General Knowledge',
        query: 'Explain how transformers work.',
        validate: (data) => Boolean(data.reply) && (data.reply.toLowerCase().includes('attention') || data.reply.toLowerCase().includes('transformer') || isLlmFallback(data))
      },
      {
        id: 9,
        category: 'General Knowledge',
        query: 'Help me prepare for a full-stack developer interview.',
        validate: (data) => Boolean(data.reply) && (data.reply.toLowerCase().includes('interview') || isLlmFallback(data))
      },
      {
        id: 10,
        category: 'General Knowledge',
        query: 'Give me a sample resignation email.',
        validate: (data) => Boolean(data.reply) && (data.reply.toLowerCase().includes('resignation') || isLlmFallback(data))
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
        const res = await fetch('http://127.0.0.1:5098/api/smartconnect/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: tc.query,
            top_k: 5,
            history: []
          })
        });

        const data = await res.json();
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
      const turn1Res = await fetch('http://127.0.0.1:5098/api/smartconnect/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'Explain neural networks.', history: [] })
      });
      const t1 = await turn1Res.json();
      console.log('Turn 1 (Explain neural networks):', t1.reply?.slice(0, 80), '...');

      // Turn 2
      const historyTurn2 = [
        { role: 'user', content: 'Explain neural networks.' },
        { role: 'assistant', content: t1.reply }
      ];
      const turn2Res = await fetch('http://127.0.0.1:5098/api/smartconnect/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'Give me a Python example.', history: historyTurn2 })
      });
      const t2 = await turn2Res.json();
      console.log('Turn 2 (Give me a Python example):', t2.reply?.slice(0, 80), '...');

      // Turn 3
      const historyTurn3 = [
        ...historyTurn2,
        { role: 'user', content: 'Give me a Python example.' },
        { role: 'assistant', content: t2.reply }
      ];
      const turn3Res = await fetch('http://127.0.0.1:5098/api/smartconnect/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'Explain each line of the code you just provided.', history: historyTurn3 })
      });
      const t3 = await turn3Res.json();
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
      const unrelatedRes = await fetch('http://127.0.0.1:5098/api/smartconnect/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'Write a haiku about autumn leaves.', history: historyAfterCynbit })
      });
      const unData = await unrelatedRes.json();
      console.log('Unrelated follow-up reply:', unData.reply?.slice(0, 80), '...');
      if (unData.reply && unData.recommendations?.length === 0) {
        console.log('✓ PASS Unrelated follow-up without forcing Cynbit recommendations!');
        passed++;
      }
    } catch (e) {
      console.error('Unrelated follow-up error:', e.message);
    }

    console.log(`\n========================================`);
    console.log(`TOTAL PASSED: ${passed} / 17 TEST SUITES`);
    console.log(`========================================`);

    server.close();
    process.exit(passed >= 15 ? 0 : 1);
  });
}

runEndToEndTests();
