/**
 * Cynbit Service & Product Recommendation Engine
 * Maps customer business requirements to verified Cynbit capabilities and SaaS products.
 */

export const recommendationCatalog = [
  {
    id: 'rec-ai-agents',
    name: 'Autonomous AI Agents & Cognitive Automation',
    type: 'service',
    category: 'AI & Automation',
    link: '/services',
    triggers: [
      'automate', 'automation', 'agent', 'agents', 'chatbot', 'bot', 'support', 
      'customer support', 'triage', 'workflow', 'llm', 'voice agent', 'repetitive'
    ],
    description: 'Goal-driven autonomous agents capable of multi-step planning, tool utilization, and API execution to eliminate manual operational friction.',
    matchReason: 'Ideal for automating manual business processes, high-volume customer inquiries, and complex operational routing without human latency.',
    relatedCaseStudy: {
      title: 'AI Diagnostic Triage: Enhancing Medical Efficiency',
      impact: '64% Reduction in Triage Delays (Pragya Healths)',
      link: '/case-studies'
    }
  },
  {
    id: 'rec-fullstack',
    name: 'Full-Stack Software Development',
    type: 'service',
    category: 'Software Engineering',
    link: '/services',
    triggers: [
      'software', 'web app', 'mobile app', 'saas', 'application', 'platform', 
      'build a web', 'custom development', 'fullstack', 'frontend', 'backend'
    ],
    description: 'High-performance bespoke web and mobile applications engineered with React, Next.js, Go, Python, and scalable multi-tenant architectures.',
    matchReason: 'Matches your need for a robust, production-grade custom software platform built from scratch with clean system design and high test coverage.',
    relatedCaseStudy: {
      title: 'Real-time Collaborative Engine for Digital Storytellers',
      impact: '< 35ms Sync Latency (Cloudy Tales)',
      link: '/case-studies'
    }
  },
  {
    id: 'rec-cloud-devops',
    name: 'Cloud Infrastructure & Legacy Migration',
    type: 'service',
    category: 'Cloud & Infrastructure',
    link: '/services',
    triggers: [
      'cloud', 'migrate', 'migration', 'aws', 'azure', 'kubernetes', 'docker', 
      'devops', 'infrastructure', 'scale', 'uptime', 'monolith', 'server'
    ],
    description: 'Resilient multi-cloud deployments (AWS, Azure, GCP), automated GitOps CI/CD, and zero-downtime legacy database and ERP migrations.',
    matchReason: 'Directly solves infrastructure bottlenecks, ensuring 99.99% availability, automated autoscaling, and secure zero-loss data migration.',
    relatedCaseStudy: {
      title: 'Modernizing Legacy ERP for the Digital Era',
      impact: '300% Throughput Boost & 42% Cost Cut (Global Logistics)',
      link: '/case-studies'
    }
  },
  {
    id: 'rec-seo-growth',
    name: 'Technical SEO & Programmatic Growth',
    type: 'service',
    category: 'Growth & Marketing',
    link: '/services',
    triggers: [
      'seo', 'ranking', 'traffic', 'search', 'marketing', 'google ads', 
      'organic', 'footfall', 'visibility', 'conversions'
    ],
    description: 'Programmatic SEO architectures, Core Web Vitals acceleration, schema markup, and high-ROI multi-channel paid acquisition pipelines.',
    matchReason: 'Engineers consistent search visibility and local discovery to turn organic search into a predictable customer acquisition channel.',
    relatedCaseStudy: {
      title: 'Hyper-local SEO Yields Record Growth for Retail Chain',
      impact: '+240% Organic Visits & +180% Footfall (Urban Wardrobe)',
      link: '/case-studies'
    }
  },
  {
    id: 'rec-tenantease',
    name: 'TenantEase (Smart Property & Rent Management)',
    type: 'product',
    category: 'PropTech SaaS',
    link: '/products',
    triggers: [
      'property', 'tenant', 'rent', 'landlord', 'pg', 'real estate', 
      'hostel', 'collection', 'lease', 'apartment'
    ],
    description: 'Proprietary property management software that automates rent collection over WhatsApp/SMS, reconciles UPI payments, and manages digital leases.',
    matchReason: 'Specifically built to eliminate the chaos of manual notebooks and scattered chats for landlords and real estate operators.',
    relatedCaseStudy: {
      title: 'PropTech Automation Matrix',
      impact: '96% On-Time Rent Collection Rate',
      link: '/products'
    }
  },
  {
    id: 'rec-revio',
    name: 'Revio (AI Review & Reputation Management)',
    type: 'product',
    category: 'Reputation SaaS',
    link: '/products',
    triggers: [
      'review', 'reviews', 'reputation', 'google maps', 'trustpilot', 
      'feedback', 'ratings', 'customer sentiment', 'star rating'
    ],
    description: 'AI-first review engine that synchronizes reviews across Google Maps, Trustpilot, and Meta, analyzing customer sentiment and drafting smart responses.',
    matchReason: 'Perfect for businesses wanting to safeguard their public reputation, monitor multi-location feedback, and boost conversion trust.',
    relatedCaseStudy: {
      title: 'AI Reputation Intelligence',
      impact: 'Consolidated Sentiment Across 4+ Review Platforms',
      link: '/products'
    }
  },
  {
    id: 'rec-cynbit-studio',
    name: 'Cynbit Studio (Developer Intelligence & Career Prep)',
    type: 'product',
    category: 'Developer Intelligence',
    link: '/products',
    triggers: [
      'coding', 'learn code', 'studio', 'skill radar', 'engineer skill', 
      'evaluate code', 'interview prep', 'developer platform'
    ],
    description: 'Adaptive development environment providing real-time AI code analysis, Skill Radar diagnostics, and automated complexity evaluations.',
    matchReason: 'Equips aspiring developers and engineering teams to diagnose architectural gaps and reach production-grade code quality.',
    relatedCaseStudy: {
      title: 'Adaptive Learning Pathways for EdTech',
      impact: '< 1.2s Real-Time Automated PR Evaluation Feedback',
      link: '/products'
    }
  },
  {
    id: 'rec-bitelevate',
    name: 'BitElevate (60-Day Remote Engineering Internship)',
    type: 'product',
    category: 'Educational Ecosystem',
    link: '/bitelevate',
    triggers: [
      'internship', 'student', 'college', 'training', 'pr', 'github', 
      'credentials', 'noc', 'exam pause', 'fresher', 'bitelevate'
    ],
    description: 'Project-based remote software engineering internship where students ship daily pull requests on production repos reviewed by architects.',
    matchReason: 'Replaces passive tutorial watching with verified git commits, real code reviews, and recognized university internship credits.',
    relatedCaseStudy: {
      title: 'BitElevate Outcomes Matrix',
      impact: '1,000+ Graduated Engineers with 88% Placement Advancement',
      link: '/bitelevate'
    }
  }
];

export class RecommendationService {
  /**
   * Recommend services or products based on user requirements and extracted intents
   */
  getRecommendations(userRequirementText, extractedRequirements = null, limit = 2) {
    if (!userRequirementText || typeof userRequirementText !== 'string') {
      return [];
    }

    const text = userRequirementText.toLowerCase();
    const scored = recommendationCatalog.map(item => {
      let score = 0;

      // Check trigger keywords
      for (const trigger of item.triggers) {
        if (text.includes(trigger.toLowerCase())) {
          score += 3;
        }
      }

      // Check extracted requirements if provided
      if (extractedRequirements) {
        if (extractedRequirements.industry && item.matchReason.toLowerCase().includes(extractedRequirements.industry.toLowerCase())) {
          score += 2;
        }
        if (extractedRequirements.problem && text.includes(extractedRequirements.problem.toLowerCase())) {
          score += 3;
        }
      }

      return { item, score };
    });

    // Sort descending by score
    scored.sort((a, b) => b.score - a.score);

    // Filter items with at least one strong match
    const matches = scored
      .filter(s => s.score > 0)
      .slice(0, limit)
      .map(s => s.item);

    // If nothing matched, provide top general recommendation (AI Automation + Full Stack)
    if (matches.length === 0) {
      return [recommendationCatalog[0], recommendationCatalog[1]];
    }

    return matches;
  }
}

export const recommendationService = new RecommendationService();

