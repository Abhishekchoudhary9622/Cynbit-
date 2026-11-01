async function run10PromptsTest() {
  const { chatService } = await import('./backend/services/chat.service.js');

  const testPrompts = [
    {
      id: 1,
      name: 'Services Overview',
      input: 'What services does Cynbit offer?',
      assertions: (res) => {
        return res.message.includes('Autonomous AI Agents') &&
               res.message.includes('Full-Stack') &&
               res.message.includes('Cloud Infrastructure') &&
               res.message.includes('/services');
      }
    },
    {
      id: 2,
      name: 'Product Comparison (Cynbit Studio vs Revio)',
      input: 'What is the difference between Cynbit Studio and Revio?',
      assertions: (res) => {
        return res.message.includes('Cynbit Studio') &&
               res.message.includes('Revio') &&
               res.message.includes('developer') &&
               res.message.includes('review');
      }
    },
    {
      id: 3,
      name: 'Product Details (TenantEase)',
      input: 'Tell me about TenantEase',
      assertions: (res) => {
        return res.message.includes('TenantEase') &&
               res.message.includes('rent') &&
               res.message.includes('WhatsApp');
      }
    },
    {
      id: 4,
      name: 'Requirement Discovery (E-commerce Customer Support)',
      input: 'I run an e-commerce business and want to automate customer support using AI',
      assertions: (res) => {
        return res.requirements.industry === 'Retail & E-commerce' &&
               res.requirements.followUpQuestions.length > 0 &&
               res.recommendations.some(r => r.name.includes('AI Agents')) &&
               Boolean(res.leadBlueprint);
      }
    },
    {
      id: 5,
      name: 'Custom SaaS Platform Request',
      input: 'Can you help us build a scalable SaaS web platform from scratch?',
      assertions: (res) => {
        return res.recommendations.some(r => r.name.includes('Software Development') || r.name.includes('AI Agents')) &&
               res.requirements.followUpQuestions.length > 0;
      }
    },
    {
      id: 6,
      name: 'Healthcare Case Studies',
      input: 'Do you have any case studies in healthcare?',
      assertions: (res) => {
        return res.message.includes('Pragya Healths') &&
               res.message.includes('64%');
      }
    },
    {
      id: 7,
      name: 'Legacy Cloud Migration',
      input: 'How do you handle legacy database and infrastructure migration?',
      assertions: (res) => {
        return res.message.includes('Global Logistics') ||
               res.message.includes('zero-downtime') ||
               res.recommendations.some(r => r.name.includes('Cloud Infrastructure'));
      }
    },
    {
      id: 8,
      name: 'Contact & Office Information',
      input: 'How can I contact Cynbit or schedule a consultation?',
      assertions: (res) => {
        return res.message.includes('Jaipur') &&
               res.message.includes('opportunities@cynbit.in') &&
               res.message.includes('/contact');
      }
    },
    {
      id: 9,
      name: 'Pricing Inquiry & Policy',
      input: 'What are your pricing rates or packages?',
      assertions: (res) => {
        return res.message.includes('custom-engineered') &&
               res.message.includes('Audit') &&
               !res.message.includes('$99/mo'); // Never invent fake fixed generic pricing
      }
    },
    {
      id: 10,
      name: 'Unrelated Query Handling',
      input: 'What is the capital of France and what is the weather there?',
      assertions: (res) => {
        return res.intent === 'unrelated' &&
               res.message.includes('specialize exclusively in Cynbit') &&
               !res.message.toLowerCase().includes('paris'); // Politely decline without going off-topic
      }
    }
  ];

  console.log('--- STARTING 10 PROMPTS VERIFICATION SUITE ---\n');
  let passed = 0;

  for (const test of testPrompts) {
    try {
      const res = await chatService.processMessage({ message: test.input });
      const ok = test.assertions(res);
      if (ok) {
        console.log(`[PASS] Prompt #${test.id}: ${test.name}`);
        passed++;
      } else {
        console.error(`[FAIL] Prompt #${test.id}: ${test.name} - Assertion failed.`);
        console.log('Result was:', JSON.stringify(res, null, 2));
      }
    } catch (e) {
      console.error(`[ERROR] Prompt #${test.id}: ${test.name}`, e);
    }
  }

  console.log(`\nRESULTS: ${passed} / ${testPrompts.length} PROMPTS PASSED!`);
  if (passed !== testPrompts.length) {
    process.exit(1);
  }
}

run10PromptsTest();

