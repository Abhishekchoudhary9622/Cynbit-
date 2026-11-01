/**
 * Cynbit Verified Knowledge Base
 * Structured chunks with source metadata, category, and canonical links.
 */

export const cynbitKnowledgeBase = [
  // --- COMPANY OVERVIEW & LEADERSHIP ---
  {
    id: 'company-overview',
    category: 'company',
    title: 'Cynbit Technologies Overview',
    source: '/',
    sourceTitle: 'Cynbit Home',
    keywords: ['cynbit', 'company', 'about', 'jaipur', 'headquarters', 'mission', 'vision', 'optimism', 'architects'],
    content: `Cynbit Technologies Private Limited is a premier technology and AI automation firm headquartered in Jaipur, Rajasthan, India (32/115 Pratap Nagar, Sanganer, Jaipur 302033). Incorporated in April 2024 (CIN: U62011RJ2024PTC093652).
Cynbit operates under the guiding philosophy "Engineered for Optimism", dedicated to building resilient digital infrastructures that bridge technical precision with human warmth.
Leadership Board of Architects:
- Mohak Saini: Founder & CEO (Leading technical strategy and systemic design).
- Ashutosh Upadhyay: Co-Founder (Ensuring intuitive product ergonomics and technical integrity).
- Dhawan Nama: Co-Founder & CTO (Ecosystem scalability and high-availability cloud platforms).`
  },
  {
    id: 'company-contact-info',
    category: 'company',
    title: 'Contact Information & Inquiries',
    source: '/contact',
    sourceTitle: 'Contact Hub',
    keywords: ['contact', 'email', 'phone', 'location', 'address', 'reach', 'office', 'support', 'jaipur'],
    content: `Cynbit Technologies Contact Channels:
- Headquarters: 32/115 Pratap Nagar, Jaipur, Rajasthan, 302033, India.
- General & Enterprise Inquiries: opportunities@cynbit.in
- Student & Technical Support: support@cynbit.in
- Phone / Voice Lines: +91 89479 62667, +91 78912 09777, +91 83023 37367.
- Response Guarantee: Initial architectural discovery turnaround within 24 business hours.`
  },
  {
    id: 'company-pricing-policy',
    category: 'company',
    title: 'Pricing and Engagement Model',
    source: '/contact',
    sourceTitle: 'Engagement Terms',
    keywords: ['price', 'pricing', 'cost', 'rates', 'quote', 'budget', 'fees'],
    content: `Cynbit custom software development, AI automation, and cloud engineering projects are priced based on custom architectural blueprints and individual Statements of Work (SOW). Cynbit does NOT have fixed off-the-shelf prices for enterprise solutions because every client's data structures, latency needs, and scaling constraints are unique.
Visitors seeking custom software or AI automation are invited to submit their requirements via the Contact page or SmartConnect AI for a free architectural evaluation.
The only fixed-fee offering is the BitElevate 60-day remote software internship program, priced at a transparent, one-time ₹3,999 all-inclusive tuition.`
  },

  // --- SERVICES ---
  {
    id: 'service-ai-automation',
    category: 'services',
    title: 'Autonomous AI Agents & Cognitive Automation',
    source: '/services',
    sourceTitle: 'Services Hub - AI Automation',
    keywords: ['ai', 'agents', 'autonomous', 'automation', 'llm', 'rag', 'voice', 'cognitive', 'bots'],
    content: `Cynbit engineers autonomous, goal-oriented AI agent systems that move beyond passive chatbots:
1. Autonomous Agents: Intelligent multi-step goal planners equipped with tool utilization, API execution, and verified self-healing error recovery.
2. LLM Automation: Context-aware document parsing, contract analysis, and enterprise database synthesis using fine-tuned open-source and proprietary models.
3. AI Voice Agents: Ultra-low-latency bidirectional conversational voice AI for real-time customer support, booking workflows, and automated operational dispatch.
4. AI Stack Integration: Production deployments leveraging vLLM, LangGraph, pgvector, Pinecone, and custom quantization for maximum throughput at minimal compute cost.`
  },
  {
    id: 'service-software-development',
    category: 'services',
    title: 'Full-Stack Software Development & Custom Platforms',
    source: '/services',
    sourceTitle: 'Services Hub - Software Development',
    keywords: ['software', 'development', 'full-stack', 'web', 'mobile', 'frontend', 'backend', 'saas', 'app'],
    content: `End-to-end custom application engineering:
1. Modern Frontend: High-performance reactive web and mobile interfaces built with React, Next.js, TypeScript, and state-of-the-art UI/UX ergonomics.
2. High-Concurrency Backend: Scalable microservices, distributed event streaming (Kafka/RabbitMQ), and REST/GraphQL APIs written in Go, Python (FastAPI), Node.js, and Rust.
3. Multi-Tenant SaaS Architecture: Modular, multi-tenant databases with strict tenant isolation, role-based access control (RBAC), and subscription billing integration.`
  },
  {
    id: 'service-cloud-devops',
    category: 'services',
    title: 'Cloud Architecture & Legacy Migration',
    source: '/services',
    sourceTitle: 'Services Hub - Cloud Infrastructure',
    keywords: ['cloud', 'devops', 'aws', 'azure', 'gcp', 'kubernetes', 'docker', 'migration', 'infrastructure', 'terraform'],
    content: `Scalable cloud-native infrastructure design and migration:
1. Cloud Platforms: AWS, Google Cloud, and Microsoft Azure infrastructure designed for 99.99% availability.
2. Containerization & Orchestration: Multi-cluster Kubernetes, Docker container management, and automated GitOps CI/CD pipelines.
3. Infrastructure as Code (IaC): Terraform and Ansible automation for reproducible environments.
4. Legacy Migration: Safely refactoring monolithic, on-premise systems into performant microservices with zero downtime and verified data integrity hashing.`
  },
  {
    id: 'service-marketing-seo',
    category: 'services',
    title: 'Technical SEO & Data-Driven Growth Marketing',
    source: '/services',
    sourceTitle: 'Services Hub - Growth Engineering',
    keywords: ['seo', 'marketing', 'growth', 'search', 'performance ads', 'crm', 'funnel', 'google ads', 'meta ads'],
    content: `Mathematical growth engineering and search visibility:
1. Technical SEO: Core Web Vitals optimization, programmatic SEO generation for thousands of pages, structured JSON-LD schemas, and crawl budget maximization.
2. Performance Advertising: Algorithmic bid optimization across Google Ads, Meta Ads, and LinkedIn with custom server-side conversion tracking.
3. CRM Automation: Workflow automation across HubSpot, Zoho, and bespoke webhook triggers connecting user actions to CRM pipelines in real time.`
  },

  // --- PRODUCTS ---
  {
    id: 'product-cynbit-studio',
    category: 'products',
    title: 'Cynbit Studio - Developer Intelligence Platform',
    source: '/products',
    sourceTitle: 'Products - Cynbit Studio',
    keywords: ['studio', 'cynbit studio', 'learning', 'coding', 'evaluation', 'skill radar', 'interview', 'students'],
    content: `Cynbit Studio is a career intelligence and adaptive coding development environment:
- Automated code evaluation assessing cyclomatic complexity, test coverage, and security vulnerabilities in real time (< 1.2s feedback latency).
- Skill Radar: Visual diagnostic mapping across systems design, data structures, cloud deployment, and architectural patterns.
- AI Mentor-in-the-Loop: Guided prompts and progressive hints without giving away answers directly.
- Tailored for developers, engineering students, and universities to bridge the gap between academic theory and industry hiring benchmarks.`
  },
  {
    id: 'product-tenantease',
    category: 'products',
    title: 'TenantEase - Smart Property & Tenant Management',
    source: '/products',
    sourceTitle: 'Products - TenantEase',
    keywords: ['tenantease', 'property', 'tenant', 'landlord', 'rent', 'pg', 'real estate', 'hostel'],
    content: `TenantEase is an all-in-one smart property management SaaS for landlords, PG owners, and real estate operators:
- "Run your property business without the chaos of notebooks and scattered chats."
- Automated Rent Intelligence: WhatsApp and SMS rent collection reminders, automated UPI payment reconciliation, and instant PDF receipts.
- Digital Lease & KYC: Secure tenant document storage, digital rental agreements, and move-in/move-out checklists.
- Maintenance Desk: Centralized ticketing system for plumbing, electrical, and maintenance requests with vendor assignment.`
  },
  {
    id: 'product-revio',
    category: 'products',
    title: 'Revio - AI-First Reputation & Review Management',
    source: '/products',
    sourceTitle: 'Products - Revio',
    keywords: ['revio', 'reviews', 'reputation', 'google maps', 'trustpilot', 'sentiment', 'feedback', 'ratings'],
    content: `Revio is an AI reputation intelligence engine that monitors customer sentiment and manages public reviews:
- Multi-Platform Review Sync: Consolidates reviews from Google Maps, Trustpilot, Meta, and industry platforms into a unified dashboard.
- Sentiment Analysis: Real-time natural language processing that flags negative sentiment, customer frustration, or critical bugs.
- Contextual Smart Replies: AI drafts brand-aligned, empathetic responses tailored to positive or negative feedback for one-click approval.
- Role-based Access Hierarchy: Team collaboration workflows for multi-location businesses.`
  },
  {
    id: 'product-bitelevate',
    category: 'products',
    title: 'BitElevate - Remote Software Engineering Internship',
    source: '/bitelevate',
    sourceTitle: 'BitElevate Ecosystem',
    keywords: ['bitelevate', 'internship', 'training', 'students', 'college', 'pr', 'github', 'mentorship', 'certificate'],
    content: `BitElevate is Cynbit's flagship 60-day remote software development internship and training ecosystem:
- Philosophy: "Stop Watching Tutorials. Start Doing the Work."
- Workflow: Real GitHub repositories with failing tests where interns ship daily pull requests reviewed by senior software architects.
- 16+ Core Dimensions: Full Stack, AI Automation, Machine Learning, Data Science, DevOps, Cloud Computing, Cybersecurity, Blockchain, IoT, and more.
- Recognition: Official college NOC approval, internship credits, university-accepted credentials, and a 21-day exam pause safeguard.
- Program Fee: Transparent ₹3,999 one-time enrollment covering all 60 days, repo provisioning, and mentor code reviews.`
  },

  // --- CASE STUDIES ---
  {
    id: 'case-study-ai-triage',
    category: 'case-studies',
    title: 'AI Diagnostic Triage: Enhancing Medical Efficiency',
    source: '/case-studies',
    sourceTitle: 'Case Studies - Healthcare Triage',
    keywords: ['healthcare', 'medical', 'hospital', 'triage', 'pragya', 'doctor', 'patient', 'diagnosis'],
    content: `Client: Pragya Healths | Industry: Healthcare
Challenge: Prolonged intake waiting times and triage delays during peak hospital hours, overwhelming clinical staff.
Solution: Autonomous triage classification agent parsing unstructured symptoms and routing urgent emergency cases directly to on-duty specialists.
Results: 64% reduction in triage waiting times, 99.2% classification accuracy across 150k+ processed patient cases.
Technologies: Python FastAPI, PyTorch, Vector Search, HIPAA-compliant Cloud.`
  },
  {
    id: 'case-study-legacy-erp',
    category: 'case-studies',
    title: 'Modernizing Legacy ERP for the Digital Era',
    source: '/case-studies',
    sourceTitle: 'Case Studies - Legacy ERP Modernization',
    keywords: ['erp', 'enterprise', 'logistics', 'legacy', 'migration', 'kubernetes', 'modernization'],
    content: `Client: Global Logistics Corp | Industry: Enterprise & Cloud
Challenge: Monolithic 14-year-old on-premise ERP causing severe operational bottlenecks during global expansion.
Solution: Decomposed the monolith into containerized microservices running on AWS Kubernetes with zero downtime during database migration.
Results: 300% throughput increase, 42% reduction in cloud infrastructure costs, zero downtime during migration cutover.
Technologies: Go, Kubernetes, PostgreSQL, Terraform, Apache Kafka.`
  },
  {
    id: 'case-study-iot-monitoring',
    category: 'case-studies',
    title: 'IoT Remote Patient Monitoring for Rural Health',
    source: '/case-studies',
    sourceTitle: 'Case Studies - Rural Health IoT',
    keywords: ['iot', 'rural', 'health', 'remote', 'telemetry', 'hardware', 'wizhealth'],
    content: `Client: WizHealth Rural Care | Industry: Healthcare & IoT
Challenge: Unpredictable electricity and intermittent connectivity in rural Rajasthan clinics preventing reliable patient vitals monitoring.
Solution: Engineered edge computing firmware with lightweight local cache and batched sync telemetry over cellular networks.
Results: 10,000+ rural patients actively monitored with 99.98% vital data integrity and 72-hour battery resilience.
Technologies: C++, MQTT, Node.js, TimescaleDB, Docker.`
  },
  {
    id: 'case-study-hyperlocal-seo',
    category: 'case-studies',
    title: 'Hyper-local SEO Yields Record Growth for Retail Chain',
    source: '/case-studies',
    sourceTitle: 'Case Studies - Local SEO Retail',
    keywords: ['retail', 'seo', 'local', 'store', 'fashion', 'footfall', 'urban wardrobe'],
    content: `Client: Urban Wardrobe | Industry: Commerce & Retail
Challenge: Low organic visibility and disconnected local store discovery across 65 physical retail branches.
Solution: Automated programmatic SEO architecture generating sub-second localized landing pages with dynamic JSON-LD schema graphs.
Results: 240% increase in organic search visits, 180% growth in physical store footfall, and top-3 Google rankings for 50+ local keywords.
Technologies: Next.js SSR, Schema.org JSON-LD, Google Maps API, Core Web Vitals optimization.`
  },
  {
    id: 'case-study-cloud-migration',
    category: 'case-studies',
    title: 'Migrating Critical Health Data with Zero Downtime',
    source: '/case-studies',
    sourceTitle: 'Case Studies - Zero-Downtime Migration',
    keywords: ['migration', 'database', 'health', 'data', 'cloud', 'aws', 'downtime'],
    content: `Client: National Imaging Network | Industry: Healthcare & Cloud
Challenge: Migrating 12TB of sensitive patient DICOM imaging records without interrupting active hospital operations.
Solution: Dual-write streaming pipeline with real-time SHA-256 checksum verification across all database records.
Results: 100% data integrity verified with zero minutes of hospital disruption during cutover.
Technologies: AWS S3, PostgreSQL, Go Workers, AES-256 Encryption.`
  },
  {
    id: 'case-study-cross-border-payments',
    category: 'case-studies',
    title: 'Cross-Border Payment Liquidity & Settlement Broker',
    source: '/case-studies',
    sourceTitle: 'Case Studies - Fintech Payments',
    keywords: ['fintech', 'payments', 'cross-border', 'fx', 'banking', 'currency', 'settlement'],
    content: `Client: FinVenture Global | Industry: Fintech & Banking
Challenge: 3-day clearing delays and exorbitant currency exchange fees hurting export micro-merchants.
Solution: Intelligent currency liquidity routing engine predicting optimal settlement windows with automated banking gateway reconciliation.
Results: Settlement latency dropped from 3 days to 3 seconds; saved merchants ₹1.8 Cr in FX charges across $45M+ in processed volume.
Technologies: TypeScript, FastAPI, Redis, Banking Gateway APIs.`
  }
];

export class KnowledgeService {
  getAllChunks() {
    return cynbitKnowledgeBase;
  }

  getChunkById(id) {
    return cynbitKnowledgeBase.find(chunk => chunk.id === id);
  }

  getChunksByCategory(category) {
    return cynbitKnowledgeBase.filter(chunk => chunk.category === category);
  }
}

export const knowledgeService = new KnowledgeService();

