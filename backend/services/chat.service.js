import { retrievalService } from './retrieval.service.js';
import { recommendationService } from './recommendation.service.js';
import { caseStudyService } from './caseStudy.service.js';
import { leadService } from './lead.service.js';

export class ChatService {
  constructor() {
    this.primaryApiKey = process.env.GEMINI_API_KEY || '';
    this.fallbackApiKey = process.env.GEMINI_FALLBACK_API_KEY || '';
    this.modelName = process.env.GEMINI_MODEL || 'gemini-3.8-flash';
  }

  /**
   * Extract business requirements and domain context from user input
   */
  extractRequirements(message, history = []) {
    const text = (message + ' ' + history.map(h => h.content).join(' ')).toLowerCase();
    
    let industry = null;
    if (text.includes('e-commerce') || text.includes('ecommerce') || text.includes('retail') || text.includes('store') || text.includes('shop')) {
      industry = 'Retail & E-commerce';
    } else if (text.includes('health') || text.includes('clinic') || text.includes('hospital') || text.includes('patient') || text.includes('medical')) {
      industry = 'Healthcare & HealthTech';
    } else if (text.includes('real estate') || text.includes('tenant') || text.includes('landlord') || text.includes('rent') || text.includes('property')) {
      industry = 'Real Estate & PropTech';
    } else if (text.includes('logistics') || text.includes('supply chain') || text.includes('freight') || text.includes('fleet')) {
      industry = 'Logistics & Supply Chain';
    } else if (text.includes('saas') || text.includes('b2b') || text.includes('software company')) {
      industry = 'SaaS & Enterprise Tech';
    } else if (text.includes('student') || text.includes('college') || text.includes('intern') || text.includes('education') || text.includes('edtech')) {
      industry = 'EdTech & Career Prep';
    }

    let problem = null;
    if (text.includes('support') || text.includes('faq') || text.includes('customer service') || text.includes('tickets')) {
      problem = 'High volume manual customer support inquiries and repetitive response latency';
    } else if (text.includes('rent') || text.includes('tenant') || text.includes('collection')) {
      problem = 'Manual rent reconciliation and unstructured tenant communication across scattered chats';
    } else if (text.includes('monolith') || text.includes('downtime') || text.includes('migrate') || text.includes('slow database') || text.includes('scale')) {
      problem = 'Legacy monolithic infrastructure bottlenecks and high latency under scale';
    } else if (text.includes('review') || text.includes('reputation') || text.includes('rating') || text.includes('google maps')) {
      problem = 'Scattered customer reviews across multi-location platforms with no automated sentiment response';
    } else if (text.includes('ranking') || text.includes('traffic') || text.includes('visibility') || text.includes('seo')) {
      problem = 'Low search engine visibility and disjointed local branch discovery';
    } else if (text.includes('build') || text.includes('develop') || text.includes('new product') || text.includes('web app')) {
      problem = 'Engineering a production-ready custom digital platform from architecture to launch';
    }

    let goal = null;
    if (problem) {
      if (problem.includes('support')) goal = 'Automate repetitive customer queries 24/7 with autonomous AI agents';
      else if (problem.includes('rent')) goal = 'Automate UPI rent reminders and digital lease tracking';
      else if (problem.includes('monolith')) goal = 'Zero-downtime microservices cloud migration and auto-scaling';
      else if (problem.includes('review')) goal = 'Centralize review monitoring and automate multi-platform AI replies';
      else if (problem.includes('visibility')) goal = 'Achieve organic #1 rankings and programmatic local search growth';
      else goal = 'Design and ship scalable, secure custom software architecture';
    }

    const followUpQuestions = [];
    if (industry === 'Retail & E-commerce' || text.includes('support') || text.includes('chatbot') || text.includes('customer support')) {
      followUpQuestions.push('Are you looking to automate FAQs, order/shipping tracking, or both?');
      followUpQuestions.push('Do you already have an existing store platform (e.g. Shopify, WooCommerce, or custom React)?');
      followUpQuestions.push('Do you need integration with an existing CRM, ticketing desk, or order database?');
    } else if (industry === 'Real Estate & PropTech' || text.includes('tenant') || text.includes('property')) {
      followUpQuestions.push('How many properties or rental units do you currently manage?');
      followUpQuestions.push('Do you prefer automated rent reminders via WhatsApp, SMS, or email?');
    } else if (text.includes('cloud') || text.includes('migrate') || text.includes('legacy') || text.includes('infrastructure')) {
      followUpQuestions.push('What is your current technology stack (e.g. on-premise servers, AWS, monolithic DB)?');
      followUpQuestions.push('What is your primary constraint (e.g., zero downtime requirement, compliance, cost optimization)?');
    } else if (text.includes('saas') || text.includes('web app') || text.includes('custom software')) {
      followUpQuestions.push('Are you building an MVP from scratch or upgrading an existing production system?');
      followUpQuestions.push('Do you have UI/UX designs ready, or do you need end-to-end design and engineering?');
    }

    return {
      hasRequirements: Boolean(industry || problem || goal),
      industry,
      problem,
      goal,
      followUpQuestions
    };
  }

  /**
   * Determine intent of the user message
   */
  classifyIntent(message) {
    const lower = (message || '').toLowerCase().trim();

    // Check for greetings
    if (/^(hi+|hello+|hey+|howdy|hola|greetings|good\s+(morning|afternoon|evening)|yo|sup)/i.test(lower) && lower.length < 30) {
      return 'greeting';
    }

    // Check for clear off-topic / unrelated queries
    const offTopicKeywords = [
      'weather', 'capital of', 'president of', 'joke', 'recipe', 'cooking',
      'who won the world cup', 'movie recommendation', 'poem about', 'write a poem',
      'dating advice', 'astrology', 'horoscope', 'flight to'
    ];
    for (const kw of offTopicKeywords) {
      if (lower.includes(kw)) {
        return 'unrelated';
      }
    }

    // Product comparisons
    if ((lower.includes('vs') || lower.includes('compare') || lower.includes('difference between')) && 
        (lower.includes('studio') || lower.includes('revio') || lower.includes('tenantease'))) {
      return 'product_comparison';
    }

    // Contact / reach out / hire
    if (lower.includes('contact') || lower.includes('email') || lower.includes('phone') || 
        lower.includes('location') || lower.includes('office') || lower.includes('hire') || 
        lower.includes('talk to team') || lower.includes('schedule a call')) {
      return 'contact_info';
    }

    // Pricing / cost
    if (lower.includes('price') || lower.includes('pricing') || lower.includes('cost') || 
        lower.includes('quote') || lower.includes('rates') || lower.includes('how much')) {
      return 'pricing_inquiry';
    }

    // Case studies / portfolio
    if (lower.includes('case study') || lower.includes('case studies') || lower.includes('past work') || 
        lower.includes('portfolio') || lower.includes('projects') || lower.includes('clients') ||
        lower.includes('healthcare project') || lower.includes('logistics project')) {
      return 'case_study_request';
    }

    // Specific product inquiries
    if (lower.includes('tenantease') || lower.includes('tenant ease')) return 'product_tenantease';
    if (lower.includes('revio')) return 'product_revio';
    if (lower.includes('cynbit studio') || (lower.includes('studio') && lower.includes('code'))) return 'product_studio';
    if (lower.includes('bitelevate') || lower.includes('internship') || lower.includes('engineering track')) return 'product_bitelevate';

    // Requirement discovery / problem statement
    if (lower.includes('i run') || lower.includes('i have a') || lower.includes('we need') || 
        lower.includes('i want to') || lower.includes('looking to') || lower.includes('looking for') || 
        lower.includes('automate') || lower.includes('build a') || lower.includes('migrate')) {
      return 'requirement_discovery';
    }

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
    
    // 1. RAG Retrieval from verified knowledge base
    const retrievedChunks = retrievalService.retrieve(message, 4, 1.2);

    // 2. Recommendations & Case Studies
    const recommendations = recommendationService.getRecommendations(message, requirements, 2);
    const caseStudies = caseStudyService.searchCaseStudies(message, 2);

    // 3. Generate lead blueprint if requirements exist or contact intent
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

    // 4. Try Gemini API generation
    let answerText = null;
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
      // Graceful fallback to verified grounded template engine
      // This ensures 100% uptime even in offline sandbox or on network limits
      answerText = this.generateGroundedFallback({
        message,
        intent,
        retrievedChunks,
        requirements,
        recommendations,
        caseStudies
      });
    }

    // Suggested actions based on current context
    const suggestedActions = this.computeSuggestedActions(intent, requirements);

    return {
      message: answerText,
      intent,
      requirements,
      recommendations,
      caseStudies,
      leadBlueprint: requirements.hasRequirements ? leadBlueprint : null,
      suggestedActions,
      sources: retrievedChunks.map(c => ({
        title: c.title,
        category: c.category,
        url: c.url
      }))
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
        { label: 'Automate Support with AI', query: 'I run an e-commerce business and want to automate customer support using AI' }
      ];
    }

    if (requirements.followUpQuestions && requirements.followUpQuestions.length > 0) {
      return [
        { label: 'Connect with Cynbit Team', query: 'I would like to discuss my requirements with the Cynbit team' },
        { label: 'View Related Case Studies', query: 'Show me case studies related to my requirement' },
        { label: 'Explore All Services', query: 'What other services does Cynbit offer?' }
      ];
    }

    if (intent === 'product_comparison') {
      return [
        { label: 'Explore TenantEase', query: 'What is TenantEase?' },
        { label: 'Schedule a Product Demo', query: 'How do I book a demo for Cynbit products?' }
      ];
    }

    return [
      { label: 'Find the Right Solution', query: 'Help me find the right solution for my business' },
      { label: 'Explore Products', query: 'What products does Cynbit offer?' },
      { label: 'Contact Us', query: 'How can I contact the Cynbit team?' }
    ];
  }

  /**
   * Grounded deterministic response generator (used when offline/sandboxed or as resilient fallback)
   */
  generateGroundedFallback({ message, intent, retrievedChunks, requirements, recommendations, caseStudies }) {
    const lower = message.toLowerCase();

    // 1. Unrelated / Out-of-Scope query
    if (intent === 'unrelated') {
      return "I specialize exclusively in Cynbit Technologies' verified engineering capabilities, autonomous AI agents, custom software architectures, and SaaS products. While I cannot assist with general knowledge or external queries, I would be delighted to help you explore our technology services, examine case studies, or recommend architectural solutions for your business!";
    }

    // 2. Greeting
    if (intent === 'greeting') {
      return "Hello! I'm SmartConnect AI, your architectural assistant for Cynbit Technologies. I can help you explore our AI automation services, understand proprietary SaaS products (Cynbit Studio, TenantEase, Revio), discover proven case studies, or design a custom software blueprint for your business. How can I help you today?";
    }

    // 3. Product Comparison: Cynbit Studio vs Revio
    if (intent === 'product_comparison' || (lower.includes('studio') && lower.includes('revio'))) {
      return "Here is a direct comparison between **Cynbit Studio** and **Revio** based on their core focus:\n\n" +
        "• **Cynbit Studio** is a developer intelligence & career prep platform. It features an adaptive IDE with real-time AI code analysis, Skill Radar diagnostics, and automated complexity feedback designed to elevate engineering standards.\n\n" +
        "• **Revio** is an AI-powered customer review & reputation management SaaS. It synchronizes multi-location customer feedback across Google Maps, Trustpilot, and Meta, using AI sentiment analysis to draft context-aware review responses.\n\n" +
        "Both products are built and maintained under Cynbit's proprietary SaaS suite. You can explore details on our [Products page](/products).";
    }

    // 4. TenantEase inquiry
    if (intent === 'product_tenantease' || lower.includes('tenantease') || lower.includes('tenant ease')) {
      return "**TenantEase** is Cynbit's proprietary PropTech property management ecosystem designed for landlords, PG operators, and real estate managers.\n\n" +
        "**Core Capabilities:**\n" +
        "• Automated rent reminders delivered directly over WhatsApp and SMS.\n" +
        "• Real-time UPI payment tracking and automated reconciliation to end manual book-keeping.\n" +
        "• Digital lease agreements, room inventory mapping, and instant tenant onboarding.\n\n" +
        "You can explore full product details on our [Products page](/products).";
    }

    // 5. Pricing / Cost policy
    if (intent === 'pricing_inquiry') {
      return "Cynbit Technologies does not offer generic off-the-shelf pricing because every architecture is custom-engineered to client scale, security, and performance constraints.\n\n" +
        "Our engagements follow structured architectural milestones:\n" +
        "1. **Strategic Discovery Audit**: We review your existing codebase, technical debt, and business goals.\n" +
        "2. **Architectural Blueprint**: We deliver a detailed scope, timeline, and milestone proposal within 3 to 5 business days.\n\n" +
        "To receive a customized architecture proposal and estimate, you can connect with our engineering architects at `opportunities@cynbit.in` or submit an inquiry through our [Contact page](/contact).";
    }

    // 6. Contact Information & Location
    if (intent === 'contact_info') {
      return "You can connect directly with the Cynbit Technologies team through our official communication channels:\n\n" +
        "• **Headquarters**: Cynbit Technologies, Jaipur, Rajasthan, India\n" +
        "• **Client Inquiries & Partnerships**: opportunities@cynbit.in\n" +
        "• **Careers & BitElevate**: careers@cynbit.in\n" +
        "• **Support Desk**: support@cynbit.in\n" +
        "• **Contact Page**: Visit our [Contact page](/contact) to submit a project scope. We guarantee an architect response within 24 hours.";
    }

    // 7. Case Study inquiry (Healthcare, Logistics, etc.)
    if (intent === 'case_study_request' || lower.includes('case stud') || lower.includes('past work') || lower.includes('pragya')) {
      if (lower.includes('health') || lower.includes('pragya') || lower.includes('wizhealth')) {
        return "Cynbit has published multiple verified healthcare case studies:\n\n" +
          "1. **AI Diagnostic Triage (Pragya Healths)**:\n" +
          "• *Challenge*: Severe intake bottlenecks and diagnostic delays in high-volume emergency and OPD departments.\n" +
          "• *Solution*: Autonomous clinical triage agent utilizing vector search and LLM classification to evaluate urgency and route patient data.\n" +
          "• *Impact*: **64% reduction in patient triage wait times** and 99.2% classification accuracy over 150k+ cases.\n\n" +
          "2. **IoT Remote Patient Monitoring (WizHealth Rural Care)**:\n" +
          "• *Challenge*: Patchy rural cellular connectivity preventing consistent vitals telemetry.\n" +
          "• *Solution*: Edge computing firmware with store-and-forward batch MQTT synchronization.\n" +
          "• *Impact*: 10,000+ rural patients monitored with 99.98% vital data integrity.\n\n" +
          "You can read the full case studies on our [Case Studies page](/case-studies).";
      }

      if (lower.includes('logistics') || lower.includes('erp') || lower.includes('legacy') || lower.includes('migration')) {
        return "Here is our documented case study on legacy modernization:\n\n" +
          "**Modernizing Legacy ERP for the Digital Era (Global Logistics Corp)**:\n" +
          "• *Challenge*: A rigid 14-year-old on-premise ERP monolith failing under international shipping scale.\n" +
          "• *Solution*: Decomposed into containerized Go/Kubernetes microservices with a dual-write zero-downtime database cutover.\n" +
          "• *Impact*: **300% throughput increase**, **42% reduction in cloud compute costs**, and zero seconds of downtime during cutover.\n\n" +
          "Explore full case study details on our [Case Studies page](/case-studies).";
      }
    }

    // 8. Requirement discovery (e.g. e-commerce customer support)
    if (requirements.hasRequirements) {
      let response = `I understand your goal! For a **${requirements.industry || 'modern business'}** looking to solve **${requirements.problem || 'operational bottlenecks'}**, Cynbit's **${recommendations[0]?.name || 'Autonomous AI Agents'}** is an exact match.\n\n`;

      if (recommendations[0]) {
        response += `**Recommended Offering: ${recommendations[0].name}**\n${recommendations[0].matchReason}\n\n`;
      }

      if (requirements.followUpQuestions.length > 0) {
        response += `To help us tailor the most effective architecture for you, could you share:\n`;
        requirements.followUpQuestions.forEach((q, idx) => {
          response += `${idx + 1}. ${q}\n`;
        });
        response += `\n`;
      }

      if (caseStudies.length > 0) {
        response += `**Relevant Documented Work:**\n• [${caseStudies[0].title} (${caseStudies[0].client})](/case-studies): ${caseStudies[0].impact}\n\n`;
      }

      response += `Whenever you're ready, I can compile your requirements into a structured **Project Blueprint** and transfer it directly to our inquiry form so the Cynbit team can review it.`;
      return response;
    }

    // 9. Services overview
    if (lower.includes('service') || lower.includes('what do you do') || lower.includes('capabilities')) {
      return "Cynbit Technologies delivers custom digital architecture across four foundational pillars:\n\n" +
        "1. **Autonomous AI Agents & Automation**: LLM workflow automation, intelligent customer support agents, and AI voice interfaces.\n" +
        "2. **Full-Stack Software Development**: Custom high-throughput web and mobile platforms built with React, Next.js, Go, and Python.\n" +
        "3. **Cloud Infrastructure & DevOps**: Scalable AWS/Azure systems, automated GitOps CI/CD, and zero-downtime legacy database migrations.\n" +
        "4. **Technical SEO & Growth**: Programmatic search engine architectures and multi-channel performance marketing.\n\n" +
        "You can explore all our service specifications on the [Services page](/services).";
    }

    // Default grounded RAG synthesis
    if (retrievedChunks.length > 0) {
      let synthesis = `Based on Cynbit Technologies' verified published documentation:\n\n`;
      retrievedChunks.slice(0, 2).forEach(c => {
        synthesis += `• **${c.title}**: ${c.content.slice(0, 220)}...\n\n`;
      });
      synthesis += `You can learn more by visiting our [Services](/services), [Products](/products), or [Contact](/contact) page.`;
      return synthesis;
    }

    return "Cynbit Technologies is an engineering firm based in Jaipur, Rajasthan, specializing in autonomous AI agents, custom software development, cloud infrastructure, and proprietary SaaS platforms (Cynbit Studio, TenantEase, Revio). How can I assist with your technical or business goals today?";
  }

  /**
   * Call Gemini 3.8 Flash model with RAG context
   */
  async callGemini({ message, conversationHistory, retrievedChunks, recommendations, caseStudies, requirements, intent }) {
    // If running in sandboxed environment without external network access, this will throw,
    // which triggers our comprehensive deterministic grounded fallback above.
    const contextPrompt = this.buildContextPrompt({
      retrievedChunks,
      recommendations,
      caseStudies,
      requirements,
      intent
    });

    const messagesPayload = [
      {
        role: 'user',
        parts: [{ text: `${contextPrompt}\n\nUser Question: ${message}` }]
      }
    ];

    // Try primary key, then fallback key
    const keys = [this.primaryApiKey, this.fallbackApiKey].filter(Boolean);
    let lastError = null;

    for (const key of keys) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.modelName}:generateContent?key=${key}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2500); // 2.5s fast timeout

        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: messagesPayload,
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: 600
            }
          }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`Gemini API error status ${response.status}: ${errText}`);
        }

        const data = await response.json();
        const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidate && candidate.trim().length > 0) {
          return candidate.trim();
        }
      } catch (e) {
        lastError = e;
      }
    }

    throw lastError || new Error('All Gemini API endpoints failed');
  }

  /**
   * Build RAG context block for LLM prompt
   */
  buildContextPrompt({ retrievedChunks, recommendations, caseStudies, requirements, intent }) {
    let prompt = `You are SmartConnect AI, the intelligent customer assistant for Cynbit Technologies (cynbit.in).
Your job is to provide accurate, grounded answers, explore Cynbit's services and SaaS products, understand visitor business requirements, recommend solutions, and guide inquiries to the Cynbit team.

STRICT GUIDELINES:
1. ONLY use the verified Cynbit knowledge base provided below.
2. NEVER invent company facts, pricing numbers, guarantees, client names, or capabilities that are not in the provided context.
3. For pricing inquiries, clearly state that Cynbit provides custom architectures based on milestone scopes and audits, and redirect them to contact the team.
4. If a question is unrelated to Cynbit's business, software engineering, or AI services, politely decline and redirect them back to Cynbit's offerings.
5. Include relevant markdown links to official Cynbit pages: /services, /products, /case-studies, /bitelevate, /contact.
6. Keep responses clear, professional, concise, and helpful.

VERIFIED CYNBIT CONTEXT:
`;

    if (retrievedChunks.length > 0) {
      prompt += retrievedChunks.map(c => `[${c.title} (${c.url})]\n${c.content}`).join('\n\n');
    }

    if (recommendations.length > 0) {
      prompt += `\n\nRECOMMENDED OFFERINGS:\n` + recommendations.map(r => `• ${r.name}: ${r.description} (Why: ${r.matchReason})`).join('\n');
    }

    if (caseStudies.length > 0) {
      prompt += `\n\nPUBLISHED CASE STUDIES:\n` + caseStudies.map(cs => `• ${cs.title} for ${cs.client} (${cs.industry}): ${cs.impact}`).join('\n');
    }

    if (requirements.hasRequirements) {
      prompt += `\n\nDETECTED USER REQUIREMENTS:
Industry: ${requirements.industry || 'Unknown'}
Problem: ${requirements.problem || 'Unknown'}
Goal: ${requirements.goal || 'Unknown'}
Suggested Follow-up Questions: ${requirements.followUpQuestions.join('; ')}
`;
    }

    return prompt;
  }
}

export const chatService = new ChatService();

