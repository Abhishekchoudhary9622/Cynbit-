/**
 * SmartConnect AI API Client
 * Interfaces with the Node.js API Gateway (which proxies to Python FastAPI ML backend)
 */

const API_BASE_URL = '/api/smartconnect';

/**
 * Client-side grounded fallback response engine
 * Ensures 100% uninterrupted user experience even during network interruptions or upstream rate limits
 */
function getClientFallbackResponse(query) {
  const qLower = (query || '').toLowerCase().trim();

  // 0. Greeting check
  if (/^(hi+|hello+|hey+|howdy|hola|greetings|good\s+(morning|afternoon|evening)|yo|sup)/i.test(qLower) && qLower.split(' ').length <= 4) {
    return {
      assistant: 'SmartConnect AI',
      reply: "Hello! I'm SmartConnect AI, your architectural assistant for Cynbit Technologies. I can help you explore our services, understand our products (TenantEase, Revio, Cynbit Studio), discover relevant case studies, or find solutions for your business requirements. How can I help you today?",
      intent: { primary_intent: 'Greeting' },
      recommendations: [],
      related_resources: [],
      sources: [
        { title: 'Cynbit Services', url: '/services' },
        { title: 'Cynbit Products', url: '/products' },
        { title: 'Case Studies', url: '/case-studies' },
        { title: 'Contact Us', url: '/contact' }
      ],
      llm_status: 'ok',
      disclaimer: null
    };
  }

  // 1. Cynbit Studio vs Revio comparison
  if ((qLower.includes('studio') && qLower.includes('revio')) || qLower.includes('difference between')) {
    return {
      assistant: 'SmartConnect AI',
      reply: 'Here is a comparison between **Cynbit Studio** and **Revio**:\n\n' +
        '• **Cynbit Studio** is an adaptive developer intelligence platform featuring real-time AI code analysis, Skill Radar diagnostics, and automated complexity evaluation.\n\n' +
        '• **Revio** is an AI customer review and reputation management SaaS that synchronizes reviews across Google Maps, Trustpilot, and Meta with automated sentiment response drafts.',
      intent: { primary_intent: 'Product Comparison' },
      recommendations: [
        {
          title: 'Cynbit Studio',
          category: 'EdTech & Career Learning',
          url: '/products',
          why_recommended: 'Developer career intelligence, adaptive IDE, and automated pull request analysis.'
        },
        {
          title: 'Revio',
          category: 'Reputation Management',
          url: '/products',
          why_recommended: 'Multi-platform customer review synchronization and AI sentiment analysis.'
        }
      ],
      related_resources: [],
      sources: [
        { title: 'Cynbit Products Suite', url: '/products' },
        { title: 'Contact Team', url: '/contact' }
      ],
      llm_status: 'offline_fallback',
      disclaimer: 'Grounded in verified Cynbit documentation.'
    };
  }

  // 2. TenantEase inquiry
  if (qLower.includes('tenantease') || qLower.includes('tenant') || qLower.includes('rent')) {
    return {
      assistant: 'SmartConnect AI',
      reply: '**TenantEase** is Cynbit\'s proprietary PropTech property management ecosystem designed for landlords, PG operators, and real estate managers.\n\n' +
        '• Automated rent collection reminders delivered over WhatsApp & SMS.\n' +
        '• Instant UPI reconciliation and ledger balancing to eliminate manual notebooks.\n' +
        '• Digital lease agreements, room inventory mapping, and digital tenant onboarding.',
      intent: { primary_intent: 'Property Management' },
      recommendations: [
        {
          title: 'TenantEase',
          category: 'Property Management',
          url: '/products',
          why_recommended: 'Automated rent collection, lease agreements, and real-time UPI payment reconciliation.'
        }
      ],
      related_resources: [],
      sources: [{ title: 'TenantEase Product Details', url: '/products' }],
      llm_status: 'offline_fallback',
      disclaimer: 'Grounded in verified Cynbit documentation.'
    };
  }

  // 3. AI Application / Building Software / Custom Architecture
  if (qLower.includes('build') || qLower.includes('ai-powered') || qLower.includes('application') || qLower.includes('app') || qLower.includes('automate') || qLower.includes('software')) {
    return {
      assistant: 'SmartConnect AI',
      reply: 'Cynbit Technologies delivers end-to-end engineering for **AI-powered applications** and custom scalable software architectures from Jaipur, Rajasthan:\n\n' +
        '• **Autonomous AI Agents**: Goal-driven LLM workflow agents capable of tool execution, customer query triage, and automated operational routing.\n' +
        '• **Full-Stack Development**: High-performance bespoke web and mobile platforms built with React, Next.js, Go, and Python.\n' +
        '• **Cloud & DevOps**: Scalable AWS/Azure infrastructure with automated CI/CD and zero-downtime database migrations.',
      intent: { primary_intent: 'AI Automation & Software Development' },
      recommendations: [
        {
          title: 'Autonomous AI Agents & Automation',
          category: 'AI Automation',
          url: '/services',
          why_recommended: 'Ideal for automating high-volume customer inquiries, workflows, and complex routing with autonomous LLMs.'
        },
        {
          title: 'Full-Stack Software Development',
          category: 'Software Development',
          url: '/services',
          why_recommended: 'Custom software platforms engineered from scratch with clean system design, APIs, and high test coverage.'
        }
      ],
      related_resources: [
        {
          id: 'case-ai-triage',
          title: 'AI Diagnostic Triage: Enhancing Medical Efficiency (Pragya Healths)',
          type: 'case_study',
          category: 'Healthcare',
          url: '/case-studies',
          matched_text: '64% reduction in triage delays with autonomous clinical triage agents and vector search classification.'
        },
        {
          id: 'case-logistics-erp',
          title: 'Modernizing Legacy ERP for the Digital Era (Global Logistics Corp)',
          type: 'case_study',
          category: 'Cloud Infrastructure',
          url: '/case-studies',
          matched_text: '300% throughput boost and 42% cloud compute cost reduction via containerized microservices.'
        }
      ],
      sources: [
        { title: 'AI Automation Services', url: '/services' },
        { title: 'Software Engineering Services', url: '/services' },
        { title: 'Contact and Consultation', url: '/contact' }
      ],
      llm_status: 'offline_fallback',
      disclaimer: 'Prototype recommendations based on public Cynbit website content.'
    };
  }

  // 4. Default services / company overview
  return {
    assistant: 'SmartConnect AI',
    reply: 'Cynbit Technologies is an engineering architecture firm based in Jaipur, Rajasthan. We deliver custom digital architectures across four core domains:\n\n' +
      '1. **Autonomous AI Agents & Automation**: Self-orchestrating LLM workflow agents.\n' +
      '2. **Full-Stack Software Development**: Resilient web & mobile systems with React, Next.js, Go, and Python.\n' +
      '3. **Cloud Infrastructure & Migration**: Scalable AWS/Azure deployments with zero downtime.\n' +
      '4. **Technical SEO & Growth**: Programmatic search engine architectures and organic footfall.\n\n' +
      'How can our engineering architects assist your business requirements today?',
    intent: { primary_intent: 'Services Overview' },
    recommendations: [
      {
        title: 'Autonomous AI Agents',
        category: 'AI Automation',
        url: '/services',
        why_recommended: 'Autonomous LLM workflow agents designed for high operational throughput.'
      },
      {
        title: 'Full-Stack Software Development',
        category: 'Software Development',
        url: '/services',
        why_recommended: 'Custom web and mobile platforms built from scratch with modern technology stacks.'
      }
    ],
    related_resources: [
      {
        title: 'Documented Case Studies',
        type: 'case_study',
        category: 'Case Studies',
        url: '/case-studies',
        matched_text: 'Verified client outcomes across healthcare, logistics, edtech, and e-commerce.'
      }
    ],
    sources: [
      { title: 'Services Hub', url: '/services' },
      { title: 'Products Suite', url: '/products' },
      { title: 'Case Studies', url: '/case-studies' },
      { title: 'Contact Us', url: '/contact' }
    ],
    llm_status: 'offline_fallback',
    disclaimer: 'Prototype recommendations based on public Cynbit website content.'
  };
}

/**
 * Send chat message with conversation history
 * @param {Object} params
 * @param {string} params.query - User query
 * @param {Array} params.history - Array of { role: 'user'|'assistant', content: string }
 * @param {number} [params.top_k=5] - Number of recommendations/sources
 * @returns {Promise<Object>} Response object
 */
export async function sendChatMessage({ query, history = [], top_k = 5 }) {
  if (!query || typeof query !== 'string' || query.trim() === '') {
    throw new Error('Query must be a non-empty string');
  }

  const cleanQuery = query.trim();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25000); // 25s timeout

  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: cleanQuery,
        history: history.slice(-12),
        top_k,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`[SmartConnect API] Server returned HTTP ${response.status}. Initiating client-side grounded response.`);
      return getClientFallbackResponse(cleanQuery);
    }

    const json = await response.json();
    return {
      assistant: json.assistant || 'SmartConnect AI',
      reply: json.reply || json.data?.message || '',
      intent: json.intent || { primary_intent: 'General Inquiry' },
      recommendations: json.recommendations || json.data?.recommendations || [],
      related_resources: json.related_resources || json.data?.caseStudies || [],
      sources: json.sources || json.data?.sources || [],
      llm_status: json.llm_status || 'ok',
      disclaimer: json.disclaimer || null,
      raw: json,
    };
  } catch (error) {
    clearTimeout(timeoutId);
    console.warn('[SmartConnect API Client] Fallback activated due to:', error.message);
    // Graceful client fallback ensures zero user-facing 500 error popups
    return getClientFallbackResponse(cleanQuery);
  }
}

/**
 * Request structured recommendations directly
 */
export async function getRecommendations(requirementText, limit = 3) {
  try {
    const response = await fetch(`${API_BASE_URL}/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requirementText, limit }),
    });
    if (!response.ok) throw new Error('Recommendation request failed');
    const json = await response.json();
    return json.data?.recommendations || [];
  } catch (err) {
    console.error('getRecommendations error:', err);
    return [];
  }
}
