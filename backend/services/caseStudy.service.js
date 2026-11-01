/**
 * Cynbit Published Case Studies Discovery Service
 * Searches only real, documented case studies based on industry, problem, and technology.
 */

export const publishedCaseStudies = [
  {
    id: 'ai-diagnostic-triage',
    title: 'AI Diagnostic Triage: Enhancing Medical Efficiency',
    client: 'Pragya Healths',
    industry: 'Healthcare',
    category: 'AI & Automation',
    problem: 'Triage intake bottlenecks and diagnostic delays in high-volume emergency and OPD departments.',
    solution: 'Engineered an autonomous clinical triage agent using vector search and classification LLMs to evaluate urgency and route patient data.',
    impact: '64% reduction in patient triage wait times; 99.2% classification accuracy over 150k+ cases.',
    tech: ['Python FastAPI', 'PyTorch', 'Vector Search', 'HIPAA-compliant Cloud'],
    link: '/case-studies'
  },
  {
    id: 'legacy-erp-modernization',
    title: 'Modernizing Legacy ERP for the Digital Era',
    client: 'Global Logistics Corp',
    industry: 'Enterprise & Logistics',
    category: 'Cloud & Infrastructure',
    problem: 'Rigid monolithic 14-year-old on-premise ERP failing to scale during rapid multi-country expansion.',
    solution: 'Decomposed the monolith into containerized Kubernetes microservices with a dual-write zero-downtime database cutover.',
    impact: '300% throughput increase; 42% reduction in cloud compute costs; 0.0s operational downtime during migration.',
    tech: ['Go', 'Kubernetes', 'PostgreSQL', 'Terraform', 'Apache Kafka'],
    link: '/case-studies'
  },
  {
    id: 'iot-rural-monitoring',
    title: 'IoT Remote Patient Monitoring for Rural Health',
    client: 'WizHealth Rural Care',
    industry: 'Healthcare & IoT',
    category: 'IoT & Edge Computing',
    problem: 'Intermittent electricity and patchy cellular connectivity in rural health centers preventing consistent patient vitals monitoring.',
    solution: 'Developed custom edge computing firmware with local persistent caching and store-and-forward batch MQTT telemetry synchronization.',
    impact: '10,000+ rural patients monitored continuously; 99.98% vital data integrity with 72-hour battery resilience.',
    tech: ['C++', 'MQTT', 'Node.js', 'TimescaleDB', 'Docker'],
    link: '/case-studies'
  },
  {
    id: 'hyperlocal-seo-retail',
    title: 'Hyper-Local SEO Yields Record Growth for Retail Chain',
    client: 'Urban Wardrobe',
    industry: 'Retail & eCommerce',
    category: 'Growth & SEO',
    problem: 'Disconnected local discovery and duplicate listings across 65 physical retail store branches.',
    solution: 'Constructed an automated programmatic local SEO engine generating sub-second landing pages with localized JSON-LD schema graphs.',
    impact: '+240% organic search traffic; +180% store footfall increase; #1 Google rankings across 50+ regional keywords.',
    tech: ['Next.js SSR', 'Schema.org JSON-LD', 'Google Maps API', 'Core Web Vitals'],
    link: '/case-studies'
  },
  {
    id: 'cloud-health-data-migration',
    title: 'Migrating Critical Health Data with Zero Downtime',
    client: 'National Imaging Network',
    industry: 'Healthcare & Cloud',
    category: 'Cloud Migration',
    problem: 'Migrating 12TB of sensitive patient DICOM imaging records and EHR databases with strict zero-loss compliance.',
    solution: 'Architected a multi-region dual-write streaming data pipeline with cryptographic SHA-256 integrity verification.',
    impact: '100% data integrity verified with zero minutes of clinical disruption across all active hospital sites.',
    tech: ['AWS S3', 'PostgreSQL', 'Go Workers', 'AES-256 Encryption'],
    link: '/case-studies'
  },
  {
    id: 'cross-border-payments',
    title: 'Cross-Border Payment Liquidity & Settlement Broker',
    client: 'FinVenture Global',
    industry: 'Fintech & Banking',
    category: 'Fintech & Systems',
    problem: 'High foreign exchange costs and 3-day clearing latency impeding small export merchants.',
    solution: 'Created an intelligent currency liquidity router that predicts settlement windows and automates banking gateway reconciliation.',
    impact: 'Settlement reduced from 3 days to 3 seconds; ₹1.8 Cr saved in FX fees across $45M+ in processed transactions.',
    tech: ['TypeScript', 'FastAPI', 'Redis', 'Banking Gateway APIs'],
    link: '/case-studies'
  },
  {
    id: 'real-time-collaboration',
    title: 'Real-time Collaborative Engine for Digital Storytellers',
    client: 'Cloudy Tales Studio',
    industry: 'EdTech & Media',
    category: 'Full-Stack Software',
    problem: 'Sync conflicts and high canvas lag when multiple creative directors collaborated remotely on narrative storyboards.',
    solution: 'Engineered an Operational Transformation and CRDT-based WebSocket synchronization engine supporting 50+ concurrent users per canvas.',
    impact: 'Sub-35ms sync latency across distributed editors with zero state collision or lost drafts.',
    tech: ['WebSockets', 'Rust', 'Redis Pub/Sub', 'React Canvas'],
    link: '/case-studies'
  }
];

export class CaseStudyService {
  /**
   * Search published case studies matching a query or domain
   */
  search(query, limit = 2) {
    if (!query || typeof query !== 'string') {
      return publishedCaseStudies.slice(0, limit);
    }

    const text = query.toLowerCase();
    const scored = publishedCaseStudies.map(cs => {
      let score = 0;
      if (text.includes(cs.industry.toLowerCase())) score += 5;
      if (text.includes(cs.client.toLowerCase())) score += 5;
      if (text.includes(cs.category.toLowerCase())) score += 3;
      
      const words = text.split(/\s+/).filter(w => w.length > 2);
      for (const w of words) {
        if (cs.problem.toLowerCase().includes(w)) score += 2;
        if (cs.solution.toLowerCase().includes(w)) score += 2;
        if (cs.tech.some(t => t.toLowerCase().includes(w))) score += 2;
      }

      return { cs, score };
    });

    scored.sort((a, b) => b.score - a.score);

    const matches = scored.filter(s => s.score > 0).slice(0, limit).map(s => s.cs);
    return matches.length > 0 ? matches : publishedCaseStudies.slice(0, limit);
  }

  searchCaseStudies(query, limit = 2) {
    return this.search(query, limit);
  }
}

export const caseStudyService = new CaseStudyService();
