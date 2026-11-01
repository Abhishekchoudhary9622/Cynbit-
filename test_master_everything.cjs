/**
 * Master Verification Suite: Comprehensive Test for Cynbit Website & SmartConnect AI
 * Tests EVERY endpoint, service, route, and edge case across Python, Node.js, and Vite.
 */

const TEST_CONFIG = {
  FASTAPI_URL: 'http://127.0.0.1:8001',
  NODE_URL: 'http://127.0.0.1:5000',
  VITE_URL: 'http://localhost:3000'
};

let totalPassed = 0;
let totalFailed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    totalPassed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    totalFailed++;
  }
}

async function testFastAPIEndpoints() {
  console.log('\n======================================================');
  console.log('PART 1: PYTHON FASTAPI ML BACKEND (http://127.0.0.1:8001)');
  console.log('======================================================');

  // 1. Health
  try {
    const res = await fetch(`${TEST_CONFIG.FASTAPI_URL}/health`);
    const data = await res.json();
    assert(res.status === 200 && data.status === 'ok', `GET /health -> 200 OK (${data.model})`);
  } catch (e) {
    assert(false, `GET /health failed: ${e.message}`);
  }

  // 2. Predict Intent
  try {
    const res = await fetch(`${TEST_CONFIG.FASTAPI_URL}/predict-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: 'I want to automate customer support using AI' })
    });
    const data = await res.json();
    assert(res.status === 200 && data.primary_intent, `POST /predict-intent -> ${data.primary_intent}`);
  } catch (e) {
    assert(false, `POST /predict-intent failed: ${e.message}`);
  }

  // 3. Recommend
  try {
    const res = await fetch(`${TEST_CONFIG.FASTAPI_URL}/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: 'property management rent reminder' })
    });
    const data = await res.json();
    assert(res.status === 200 && data.recommended_services_products?.length > 0, `POST /recommend -> ${data.recommended_services_products?.length} products/services`);
  } catch (e) {
    assert(false, `POST /recommend failed: ${e.message}`);
  }

  // 4. Search Knowledge
  try {
    const res = await fetch(`${TEST_CONFIG.FASTAPI_URL}/search-knowledge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: 'TenantEase and Revio' })
    });
    const data = await res.json();
    assert(res.status === 200 && data.results?.length > 0, `POST /search-knowledge -> ${data.results?.length} chunks`);
  } catch (e) {
    assert(false, `POST /search-knowledge failed: ${e.message}`);
  }

  // 5. Chat endpoint greetings
  try {
    const res = await fetch(`${TEST_CONFIG.FASTAPI_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: 'hii' })
    });
    const data = await res.json();
    assert(res.status === 200 && data.reply.includes("SmartConnect AI") && !data.reply.includes("temporarily unavailable"), 
      `POST /chat [Greeting 'hii'] -> 200 OK (Warm introduction)`);
  } catch (e) {
    assert(false, `POST /chat [Greeting] failed: ${e.message}`);
  }

  // 6. Chat endpoint requirements
  try {
    const res = await fetch(`${TEST_CONFIG.FASTAPI_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: 'I want to build an AI-powered application.' })
    });
    const data = await res.json();
    assert(res.status === 200 && data.recommendations?.length > 0 && !data.reply.includes("temporarily unavailable"), 
      `POST /chat [AI App Request] -> 200 OK (${data.recommendations.length} recommendations)`);
  } catch (e) {
    assert(false, `POST /chat [AI App Request] failed: ${e.message}`);
  }
}

async function testNodeBackendEndpoints() {
  console.log('\n======================================================');
  console.log('PART 2: NODE.JS GATEWAY & PROXY (http://127.0.0.1:5000)');
  console.log('======================================================');

  // 1. Health
  try {
    const res = await fetch(`${TEST_CONFIG.NODE_URL}/api/smartconnect/health`);
    const data = await res.json();
    assert(res.status === 200 && data.status === 'healthy', `GET /api/smartconnect/health -> 200 Healthy`);
  } catch (e) {
    assert(false, `Node health check failed: ${e.message}`);
  }

  // 2. Search
  try {
    const res = await fetch(`${TEST_CONFIG.NODE_URL}/api/smartconnect/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: 'Autonomous AI Agents', limit: 3 })
    });
    const data = await res.json();
    assert(res.status === 200 && data.success && data.data.results.length > 0, `POST /api/smartconnect/search -> ${data.data.results.length} chunks`);
  } catch (e) {
    assert(false, `Node search failed: ${e.message}`);
  }

  // 3. Recommend
  try {
    const res = await fetch(`${TEST_CONFIG.NODE_URL}/api/smartconnect/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requirementText: 'Modernize legacy on-premise monolith' })
    });
    const data = await res.json();
    assert(res.status === 200 && data.success && data.data.recommendations.length > 0, `POST /api/smartconnect/recommend -> ${data.data.recommendations[0]?.name}`);
  } catch (e) {
    assert(false, `Node recommend failed: ${e.message}`);
  }

  // 4. Case studies
  try {
    const res = await fetch(`${TEST_CONFIG.NODE_URL}/api/smartconnect/case-studies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: 'Healthcare Pragya' })
    });
    const data = await res.json();
    assert(res.status === 200 && data.success && data.data.caseStudies.length > 0, `POST /api/smartconnect/case-studies -> ${data.data.caseStudies[0]?.client}`);
  } catch (e) {
    assert(false, `Node case studies failed: ${e.message}`);
  }

  // 5. Chat Proxy
  try {
    const res = await fetch(`${TEST_CONFIG.NODE_URL}/api/smartconnect/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: 'What services does Cynbit offer?' })
    });
    const data = await res.json();
    assert(res.status === 200 && data.success && data.reply.length > 50, `POST /api/smartconnect/chat -> 200 OK (Proxy response length: ${data.reply.length})`);
  } catch (e) {
    assert(false, `Node chat proxy failed: ${e.message}`);
  }
}

async function testFrontendRoutes() {
  console.log('\n======================================================');
  console.log('PART 3: FRONTEND WEBSITE PAGES & ROUTES (http://localhost:3000)');
  console.log('======================================================');

  const routes = [
    { path: '/', title: 'Home Page' },
    { path: '/services', title: 'Services Page' },
    { path: '/products', title: 'Products Page' },
    { path: '/case-studies', title: 'Case Studies Page' },
    { path: '/contact', title: 'Contact Page' },
    { path: '/bitelevate', title: 'BitElevate Page' },
    { path: '/bitelevate/paths', title: 'BitElevate Paths Page' },
    { path: '/blog', title: 'Blog Page' },
    { path: '/careers', title: 'Careers Page' },
    { path: '/cookies', title: 'Cookies Policy Page' },
    { path: '/diaries', title: 'Diaries Page' },
    { path: '/impact', title: 'Impact Page' },
    { path: '/privacy', title: 'Privacy Policy Page' },
    { path: '/story', title: 'Story Page' },
    { path: '/team', title: 'Team Page' },
    { path: '/terms', title: 'Terms of Service Page' },
    { path: '/sitemap', title: 'Navigation Sitemap Page' },
  ];

  for (const r of routes) {
    try {
      const res = await fetch(`${TEST_CONFIG.VITE_URL}${r.path}`);
      const text = await res.text();
      assert(res.status === 200 && text.includes('id="root"'), `${r.title} (${r.path}) -> 200 OK (Served HTML)`);
    } catch (e) {
      assert(false, `${r.title} (${r.path}) failed: ${e.message}`);
    }
  }

  // Test SmartConnect API endpoint through Vite middleware
  try {
    const res = await fetch(`${TEST_CONFIG.VITE_URL}/api/smartconnect/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: 'hii' })
    });
    const data = await res.json();
    assert(res.status === 200 && data.reply.includes('SmartConnect AI'), `Vite Proxy /api/smartconnect/chat -> 200 OK`);
  } catch (e) {
    assert(false, `Vite API proxy failed: ${e.message}`);
  }
}

async function testEdgeCasesAndStress() {
  console.log('\n======================================================');
  console.log('PART 4: EDGE CASES, VALIDATION & CONCURRENCY');
  console.log('======================================================');

  // 1. Empty query validation
  try {
    const res = await fetch(`${TEST_CONFIG.NODE_URL}/api/smartconnect/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '' })
    });
    assert(res.status === 400, `Empty query rejection -> 400 Bad Request`);
  } catch (e) {
    assert(false, `Empty query validation error: ${e.message}`);
  }

  // 2. Whitespace-only query
  try {
    const res = await fetch(`${TEST_CONFIG.NODE_URL}/api/smartconnect/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '     ' })
    });
    assert(res.status === 400, `Whitespace query rejection -> 400 Bad Request`);
  } catch (e) {
    assert(false, `Whitespace query validation error: ${e.message}`);
  }

  // 3. Emojis and special characters
  try {
    const res = await fetch(`${TEST_CONFIG.NODE_URL}/api/smartconnect/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: 'Hello 🤖🚀 What are your AI capabilities?' })
    });
    const data = await res.json();
    assert(res.status === 200 && data.reply.length > 20, `Emoji query handling -> 200 OK`);
  } catch (e) {
    assert(false, `Emoji query failed: ${e.message}`);
  }

  // 4. HTML / Script injection safety
  try {
    const res = await fetch(`${TEST_CONFIG.NODE_URL}/api/smartconnect/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '<script>alert("test")</script> tell me about services' })
    });
    const data = await res.json();
    assert(res.status === 200 && !data.reply.includes('<script>'), `XSS sanitization safety -> 200 OK (Clean)`);
  } catch (e) {
    assert(false, `XSS safety test failed: ${e.message}`);
  }

  // 5. Parallel stress test (10 simultaneous requests)
  console.log('  Testing 10 simultaneous concurrent requests...');
  const parallelQueries = [
    'What services does Cynbit offer?',
    'Tell me about TenantEase',
    'How do I contact you?',
    'Explain binary search',
    'What is Cynbit Studio?',
    'Do you have healthcare case studies?',
    'What is Revio?',
    'Help with full-stack interview prep',
    'I want to automate customer support',
    'hii'
  ];

  try {
    const start = Date.now();
    const responses = await Promise.all(
      parallelQueries.map(q =>
        fetch(`${TEST_CONFIG.NODE_URL}/api/smartconnect/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: q })
        }).then(r => r.json())
      )
    );
    const duration = Date.now() - start;
    const allSuccessful = responses.every(r => r.success && Boolean(r.reply));
    assert(allSuccessful, `10 Concurrent Parallel Requests -> 100% Success (${duration}ms total)`);
  } catch (e) {
    assert(false, `Parallel stress test failed: ${e.message}`);
  }
}

async function runMasterTest() {
  console.log('======================================================');
  console.log('MASTER VERIFICATION: EXHAUSTIVE SYSTEM-WIDE TEST');
  console.log('======================================================');

  await testFastAPIEndpoints();
  await testNodeBackendEndpoints();
  await testFrontendRoutes();
  await testEdgeCasesAndStress();

  console.log('\n======================================================');
  console.log(`TOTAL TESTS RUN: ${totalPassed + totalFailed}`);
  console.log(`PASSED: ${totalPassed}`);
  console.log(`FAILED: ${totalFailed}`);
  console.log(`SUCCESS RATE: ${((totalPassed / (totalPassed + totalFailed)) * 100).toFixed(1)}%`);
  console.log('======================================================');

  if (totalFailed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runMasterTest();
