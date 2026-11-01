/**
 * SmartConnect AI API Client
 * Interfaces with the Node.js API Gateway (which proxies to Python FastAPI ML backend)
 */

const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || '/api/smartconnect';

/**
 * Client-side fallback response handler
 * Respects query context: never turns general questions into sales pitches.
 */
function getClientFallbackResponse(query) {
  const qLower = (query || '').toLowerCase().trim();

  // 0. Greeting check
  if (/^(hi+|hello+|hey+|howdy|hola|greetings|good\s+(morning|afternoon|evening)|yo|sup)/i.test(qLower) && qLower.split(/\s+/).length <= 4) {
    return {
      assistant: 'SmartConnect AI',
      reply: "Hello! I'm SmartConnect AI, your conversational assistant for Cynbit Technologies. I can answer any general technical, programming, AI, career, or business question, as well as provide verified details about Cynbit's engineering services, SaaS products (TenantEase, Revio, Cynbit Studio), and documented case studies. How can I help you today?",
      intent: { primary_intent: 'Greeting' },
      recommendations: [],
      related_resources: [],
      sources: [],
      llm_status: 'ok',
      disclaimer: null
    };
  }

  // 1. Cynbit Studio vs Revio comparison
  if (qLower.includes('studio') && qLower.includes('revio')) {
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
        { title: 'Cynbit Products Suite', url: '/products' }
      ],
      llm_status: 'offline_fallback',
      disclaimer: 'Grounded in verified Cynbit documentation.'
    };
  }

  // 2. TenantEase inquiry
  if (qLower.includes('tenantease') || qLower.includes('tenant ease')) {
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

  // 3. Cynbit Services or Case Studies explicitly requested
  if (qLower.includes('cynbit') || (qLower.includes('case stud') && (qLower.includes('your') || qLower.includes('show')))) {
    return {
      assistant: 'SmartConnect AI',
      reply: 'Cynbit Technologies is an engineering architecture firm based in Jaipur, Rajasthan. We deliver custom digital architectures across core domains:\n\n' +
        '• **Autonomous AI Agents**: Goal-driven LLM workflow agents.\n' +
        '• **Full-Stack Software Development**: Resilient web & mobile systems with React, Next.js, Go, and Python.\n' +
        '• **Cloud Infrastructure & Migration**: Scalable AWS/Azure deployments with zero downtime.\n' +
        '• **Proprietary Products**: TenantEase, Revio, and Cynbit Studio.\n\n' +
        'Explore our offerings at [Services](/services), [Products](/products), or [Case Studies](/case-studies).',
      intent: { primary_intent: 'Cynbit Services' },
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
          title: 'AI Diagnostic Triage (Pragya Healths)',
          type: 'case_study',
          category: 'Healthcare',
          url: '/case-studies',
          matched_text: '64% reduction in patient triage wait times with autonomous clinical agents.'
        }
      ],
      sources: [
        { title: 'Services Hub', url: '/services' },
        { title: 'Products Suite', url: '/products' },
        { title: 'Case Studies', url: '/case-studies' }
      ],
      llm_status: 'offline_fallback',
      disclaimer: 'Grounded in verified Cynbit documentation.'
    };
  }

  // 4. Honest retryable error for all general questions (no unsolicited sales pitches)
  return {
    assistant: 'SmartConnect AI',
    reply: 'I am currently unable to reach the AI model to generate this response. Please check your connection and try asking again in a moment.',
    intent: { primary_intent: 'General Query' },
    recommendations: [],
    related_resources: [],
    sources: [],
    llm_status: 'error',
    disclaimer: null
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
  const timeoutId = setTimeout(() => controller.abort(), 28000); // 28s timeout

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
      intent: json.intent || { primary_intent: 'General Query' },
      recommendations: json.recommendations || json.data?.recommendations || [],
      related_resources: json.related_resources || json.data?.caseStudies || [],
      sources: json.sources || json.data?.sources || [],
      leadBlueprint: json.leadBlueprint || json.data?.leadBlueprint || null,
      llm_status: json.llm_status || 'ok',
      disclaimer: json.disclaimer || null,
      raw: json,
    };
  } catch (error) {
    clearTimeout(timeoutId);
    console.warn('[SmartConnect API Client] Fallback activated due to:', error.message);
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
