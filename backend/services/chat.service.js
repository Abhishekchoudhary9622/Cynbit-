import { retrievalService } from './retrieval.service.js';
import { recommendationService } from './recommendation.service.js';
import { caseStudyService } from './caseStudy.service.js';
import { leadService } from './lead.service.js';

export class ChatService {
  constructor() {
    this.primaryApiKey = process.env.GEMINI_API_KEY || '';
    this.fallbackApiKey = process.env.GEMINI_API_KEY_FALLBACK || '';
    this.modelName = process.env.GEMINI_MODEL || 'gemini-3.5-flash';
  }

  /**
   * Extract business requirements ONLY when user explicitly expresses commercial project interest
   */
  extractRequirements(message, history = []) {
    const text = (message + ' ' + history.map(h => h.content).join(' ')).toLowerCase();
    
    // Check if the user is genuinely asking to build a commercial project with Cynbit
    const isCommercialInquiry = 
      text.includes('hire cynbit') || text.includes('hire your team') || 
      text.includes('quote for') || text.includes('project scope') ||
      text.includes('i run an e-commerce') || text.includes('i run an ecommerce') ||
      text.includes('looking for an agency') || text.includes('consultation for my business') ||
      (text.includes('build') && (text.includes('for my company') || text.includes('for our business')));

    if (!isCommercialInquiry) {
      return {
        hasRequirements: false,
        industry: null,
        problem: null,
        goal: null,
        followUpQuestions: []
      };
    }

    let industry = 'General Enterprise';
    if (text.includes('e-commerce') || text.includes('ecommerce') || text.includes('retail') || text.includes('store')) {
      industry = 'Retail & E-commerce';
    } else if (text.includes('health') || text.includes('clinic') || text.includes('hospital')) {
      industry = 'Healthcare & HealthTech';
    } else if (text.includes('real estate') || text.includes('tenant') || text.includes('landlord')) {
      industry = 'Real Estate & PropTech';
    } else if (text.includes('logistics') || text.includes('supply chain')) {
      industry = 'Logistics & Supply Chain';
    }

    let problem = 'Commercial software or AI agent development';
    let goal = 'Design and ship scalable, secure custom software architecture';

    const followUpQuestions = [
      'What is your target timeline or rollout milestone?',
      'Do you have existing systems, APIs, or databases that need integration?',
      'Would you like an architectural discovery call with Cynbit engineering architects?'
    ];

    return {
      hasRequirements: true,
      industry,
      problem,
      goal,
      followUpQuestions
    };
  }

  /**
   * Determine query type: 'general_qa', 'cynbit', 'mixed', or 'greeting'
   */
  classifyIntent(message) {
    const lower = (message || '').toLowerCase().trim();

    // Check for greetings
    if (/^(hi+|hello+|hey+|howdy|hola|greetings|good\s+(morning|afternoon|evening)|yo|sup)/i.test(lower) && lower.split(/\s+/).length <= 4) {
      return 'greeting';
    }

    const cynbitKeywords = [
      /\bcynbit(\.in)?\b/i,
      /\btenantease\b/i,
      /\btenant\s+ease\b/i,
      /\brevio\b/i,
      /\bcynbit\s+studio\b/i,
      /\bbitelevate\b/i,
      /\bbit\s+elevate\b/i,
      /\bjaipur\b/i
    ];
    const hasCynbitMention = cynbitKeywords.some(regex => regex.test(lower));

    const companyDirectPhrases = [
      'what services does cynbit', 'what services do you offer', 'what do you offer',
      'your services', 'your products', 'tell me about tenantease', 'tell me about revio',
      'tell me about cynbit studio', 'compare cynbit studio', 'show relevant case studies',
      'how can i contact cynbit', 'cynbit pricing', 'about cynbit'
    ];
    const isDirectCompany = companyDirectPhrases.some(p => lower.includes(p));

    const mixedPhrases = [
      'how cynbit', 'how could cynbit', 'how can cynbit', 'cynbit implement',
      'cynbit capabilities', 'using cynbit', 'cynbit help'
    ];
    const isMixed = hasCynbitMention && mixedPhrases.some(p => lower.includes(p));

    if (isMixed) return 'mixed';
    if (hasCynbitMention || isDirectCompany) return 'cynbit';

    if (lower.includes('contact') || lower.includes('hire you') || lower.includes('talk to team') || lower.includes('schedule a call')) {
      return 'contact_info';
    }

    // Default to open-ended general QA (coding, math, AI/ML, science, interview, writing, etc.)
    return 'general_qa';
  }

  /**
   * Main conversational orchestrator
   */
  async processMessage({ message, conversationHistory = [], sessionContext = {} }) {
    if (!message || typeof message !== 'string') {
      throw new Error('Message is required and must be a string');
    }

    const intent = this.classifyIntent(message);
    const requirements = this.extractRequirements(message, conversationHistory);
    
    // Only retrieve RAG context for Cynbit-specific or mixed queries
    const needsCynbitContext = (intent === 'cynbit' || intent === 'mixed' || intent === 'contact_info');
    const retrievedChunks = needsCynbitContext ? retrievalService.retrieve(message, 4, 1.2) : [];
    const recommendations = needsCynbitContext ? recommendationService.getRecommendations(message, requirements, 2) : [];
    const caseStudies = needsCynbitContext ? caseStudyService.searchCaseStudies(message, 2) : [];

    // Lead blueprint is strictly for explicit commercial inquiries
    let leadBlueprint = null;
    if (requirements.hasRequirements || intent === 'contact_info') {
      leadBlueprint = leadService.generateLeadSummary({
        conversationHistory,
        requirements: {
          industry: requirements.industry,
          problem: requirements.problem,
          goal: requirements.goal,
          offering: recommendations[0]?.name || 'Autonomous AI Agents & Custom Software Development',
          details: requirements.followUpQuestions
        }
      });
    }

    // Attempt generation with Gemini LLM
    let answerText = null;
    let llmStatus = 'ok';
    try {
      answerText = await this.callGemini({
        message,
        conversationHistory,
        retrievedChunks,
        recommendations,
        caseStudies,
        requirements,
        intent
      });
    } catch (err) {
      llmStatus = (intent === 'general_qa') ? 'error' : 'offline_fallback';
      answerText = this.generateGroundedFallback({
        message,
        intent,
        retrievedChunks,
        requirements,
        recommendations,
        caseStudies
      });
    }

    const suggestedActions = this.computeSuggestedActions(intent, requirements);

    return {
      message: answerText,
      intent,
      requirements,
      recommendations: needsCynbitContext ? recommendations : [],
      caseStudies: needsCynbitContext ? caseStudies : [],
      leadBlueprint,
      suggestedActions,
      llm_status: llmStatus,
      sources: needsCynbitContext ? retrievedChunks.map(c => ({
        title: c.title,
        category: c.category,
        url: c.url
      })) : []
    };
  }

  /**
   * Compute dynamic quick actions
   */
  computeSuggestedActions(intent, requirements) {
    if (intent === 'greeting') {
      return [
        { label: 'Explore Services', query: 'What services does Cynbit offer?' },
        { label: 'Explore Products', query: 'Tell me about Cynbit Studio, TenantEase, and Revio' },
        { label: 'Find Case Studies', query: 'Show me your published case studies' },
        { label: 'Ask a Coding Question', query: 'Explain binary search in Python' }
      ];
    }

    if (requirements.hasRequirements) {
      return [
        { label: 'Connect with Cynbit Team', query: 'I would like to discuss my requirements with the Cynbit team' },
        { label: 'View Related Case Studies', query: 'Show me case studies related to my requirement' }
      ];
    }

    return [];
  }

  /**
   * Grounded fallback response generator
   */
  generateGroundedFallback({ message, intent, retrievedChunks, requirements, recommendations, caseStudies }) {
    const lower = message.toLowerCase();

    // 1. General QA: When LLM fails, show clear retryable message
    if (intent === 'general_qa') {
      return "I am currently experiencing a temporary connection issue while contacting the AI model. Please verify your connection and try asking your question again in a moment.";
    }

    // 2. Greeting
    if (intent === 'greeting') {
      return "Hello! I'm SmartConnect AI, your conversational assistant for Cynbit Technologies. I can answer any general technical, programming, AI, career, or business question, as well as provide verified details about Cynbit's engineering services, SaaS products (TenantEase, Revio, Cynbit Studio), and documented case studies. How can I help you today?";
    }

    // 3. Product Comparison: Cynbit Studio vs Revio
    if (lower.includes('studio') && lower.includes('revio')) {
      return "Here is a direct comparison between **Cynbit Studio** and **Revio** based on their core focus:\n\n" +
        "• **Cynbit Studio** is a developer intelligence & career prep platform. It features an adaptive IDE with real-time AI code analysis, Skill Radar diagnostics, and automated complexity feedback.\n\n" +
        "• **Revio** is an AI-powered customer review & reputation management SaaS that synchronizes multi-location customer feedback across Google Maps, Trustpilot, and Meta with automated sentiment-aware response drafts.\n\n" +
        "Both products are part of Cynbit's proprietary SaaS suite. You can explore details on our [Products page](/products).";
    }

    // 4. TenantEase inquiry
    if (lower.includes('tenantease') || lower.includes('tenant ease')) {
      return "**TenantEase** is Cynbit's proprietary PropTech property management ecosystem designed for landlords, PG operators, and real estate managers.\n\n" +
        "**Core Capabilities:**\n" +
        "• Automated rent reminders delivered directly over WhatsApp and SMS.\n" +
        "• Real-time UPI payment tracking and automated reconciliation to end manual book-keeping.\n" +
        "• Digital lease agreements, room inventory mapping, and instant tenant onboarding.\n\n" +
        "You can explore full product details on our [Products page](/products).";
    }

    // 5. Contact Information
    if (intent === 'contact_info') {
      return "You can connect directly with the Cynbit Technologies team through our official communication channels:\n\n" +
        "• **Headquarters**: Cynbit Technologies, Jaipur, Rajasthan, India\n" +
        "• **Client Inquiries & Partnerships**: opportunities@cynbit.in\n" +
        "• **Careers & BitElevate**: careers@cynbit.in\n" +
        "• **Support Desk**: support@cynbit.in\n" +
        "• **Contact Page**: Visit our [Contact page](/contact) to submit a project scope. We guarantee an architect response within 24 hours.";
    }

    // 6. Case Studies
    if (lower.includes('case stud')) {
      return "Cynbit has published multiple verified case studies:\n\n" +
        "1. **AI Diagnostic Triage (Pragya Healths)**: 64% reduction in patient triage wait times and 99.2% classification accuracy over 150k+ cases.\n\n" +
        "2. **Modernizing Legacy ERP (Global Logistics Corp)**: 300% throughput increase, 42% cloud compute cost reduction, and zero downtime during cutover.\n\n" +
        "Explore full details on our [Case Studies page](/case-studies).";
    }

    // 7. General Cynbit overview
    return "Cynbit Technologies is an engineering architecture firm based in Jaipur, Rajasthan, delivering autonomous AI agents, full-stack software development, cloud modernization, and proprietary SaaS platforms (Cynbit Studio, TenantEase, Revio).\n\n" +
      "Explore our offerings at [Services](/services), [Products](/products), or reach out directly via our [Contact page](/contact).";
  }

  /**
   * Call Gemini Flash model with conversation history
   */
  async callGemini({ message, conversationHistory = [], retrievedChunks = [], recommendations = [], caseStudies = [], requirements = {}, intent }) {
    const isGeneral = (intent === 'general_qa');
    
    let systemInstruction = "";
    if (isGeneral) {
      systemInstruction = "You are SmartConnect AI, an intelligent, versatile conversational AI assistant. " +
        "You can answer ANY question asked by the user across programming, computer science, algorithms, AI/ML, mathematics, science, career guidance, writing, and general knowledge. " +
        "Answer directly, accurately, and thoroughly with code examples and explanations where helpful. " +
        "Do NOT mention Cynbit services, products, or sales pitches unless the user asks about Cynbit.";
    } else {
      systemInstruction = "You are SmartConnect AI, an intelligent assistant for Cynbit Technologies (cynbit.in). " +
        "Answer the user's question using the verified Cynbit context provided. Include markdown links (/services, /products, /case-studies, /contact) where relevant. " +
        "If the user asks a mixed question combining general knowledge and Cynbit, synthesize both accurately.\n\n" +
        "VERIFIED CYNBIT CONTEXT:\n" +
        retrievedChunks.map(c => `[${c.title} (${c.url})]: ${c.content}`).join('\n\n');
    }

    const contents = [];
    // Include conversation history
    for (const turn of conversationHistory.slice(-8)) {
      if (turn.role && turn.content) {
        contents.push({
          role: turn.role === 'user' ? 'user' : 'model',
          parts: [{ text: turn.content.slice(0, 1500) }]
        });
      }
    }
    // Append current user message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const keys = [this.primaryApiKey, this.fallbackApiKey].filter(Boolean);
    const candidateModels = [this.modelName, 'gemini-3.5-flash', 'gemini-flash-latest', 'gemini-3.8-flash'];
    let lastError = null;

    for (const key of keys) {
      for (const model of candidateModels) {
        try {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout

          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents,
              systemInstruction: { parts: [{ text: systemInstruction }] },
              generationConfig: {
                temperature: 0.4,
                maxOutputTokens: 1200
              }
            }),
            signal: controller.signal
          });
          clearTimeout(timeoutId);

          if (response.ok) {
            const data = await response.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text && text.trim().length > 0) {
              return text.trim();
            }
          }
        } catch (e) {
          lastError = e;
        }
      }
    }

    throw lastError || new Error('All Gemini API endpoints failed');
  }
}

export const chatService = new ChatService();
