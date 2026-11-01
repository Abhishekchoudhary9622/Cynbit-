import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Building, 
  Activity, 
  Cloud, 
  GraduationCap, 
  ShoppingCart,
  ChevronRight
} from 'lucide-react';

export default function CaseStudies() {
  const { openModal } = useModal();
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Healthcare', 'Enterprise & Cloud', 'EdTech & Media', 'Commerce & SEO'];

  const studies = [
    {
      id: 'ai-diagnostic-triage',
      title: 'AI Diagnostic Triage: Enhancing Medical Efficiency',
      category: 'Healthcare',
      client: 'Pragya Healths',
      impact: '64% Reduction in Triage Delay',
      summary: 'Developed an autonomous clinical intake and triage classification agent that parses unstructured symptoms and routes critical patient cases to ER specialists in real time.',
      metrics: [
        { label: 'Triage Time', value: '-64%' },
        { label: 'Accuracy', value: '99.2%' },
        { label: 'Cases Processed', value: '150k+' }
      ],
      tech: ['Python FastAPI', 'PyTorch', 'Vector Search', 'HIPAA Cloud']
    },
    {
      id: 'legacy-erp-modernization',
      title: 'Modernizing Legacy ERP for the Digital Era',
      category: 'Enterprise & Cloud',
      client: 'Global Logistics Corp',
      impact: '300% Throughput Boost',
      summary: 'Decomposed a monolithic 14-year-old on-premise ERP into resilient, containerized microservices running on AWS Kubernetes with zero-downtime database migration.',
      metrics: [
        { label: 'Throughput', value: '+300%' },
        { label: 'Cloud Costs', value: '-42%' },
        { label: 'Downtime', value: '0.0s' }
      ],
      tech: ['Go', 'Kubernetes', 'PostgreSQL', 'Terraform', 'Kafka']
    },
    {
      id: 'iot-rural-monitoring',
      title: 'IoT Remote Patient Monitoring for Rural Health',
      category: 'Healthcare',
      client: 'WizHealth Rural Care',
      impact: '10,000+ Monitored Lives',
      summary: 'Engineered a resilient edge computing firmware and batch-sync telemetry pipeline for rural health clinics facing unpredictable electricity and intermittent internet connectivity.',
      metrics: [
        { label: 'Active Patients', value: '10,000+' },
        { label: 'Data Integrity', value: '99.98%' },
        { label: 'Battery Life', value: '72 Hours' }
      ],
      tech: ['C++', 'MQTT', 'Node.js', 'TimescaleDB', 'Docker']
    },
    {
      id: 'edtech-adaptive-learning',
      title: 'AI-Driven Adaptive Learning Pathways for EdTech',
      category: 'EdTech & Media',
      client: 'BitElevate Labs',
      impact: '88% Course Completion',
      summary: 'Replaced passive video watching with continuous code telemetry that diagnoses syntax weaknesses, dynamically adapts challenge difficulties, and provides instant code review feedback.',
      metrics: [
        { label: 'Completion Rate', value: '88%' },
        { label: 'Student Growth', value: '3.5x' },
        { label: 'Graduates Placed', value: '1,000+' }
      ],
      tech: ['Next.js', 'TypeScript', 'AST Analysis', 'Python AI Engine']
    },
    {
      id: 'real-time-collaboration',
      title: 'Real-time Collaborative Engine for Digital Storytellers',
      category: 'EdTech & Media',
      client: 'Cloudy Tales Studio',
      impact: '< 35ms Sync Latency',
      summary: 'Designed an Operational Transformation and CRDT-based real-time canvas engine allowing 50+ simultaneous creators to write, illustrate, and direct narrative sequences without sync collisions.',
      metrics: [
        { label: 'Sync Latency', value: '< 35ms' },
        { label: 'Simultaneous Users', value: '50+' },
        { label: 'State Collisions', value: 'Zero' }
      ],
      tech: ['WebSockets', 'Rust', 'Redis Pub/Sub', 'React Canvas']
    },
    {
      id: 'hyperlocal-seo',
      title: 'Hyper-local SEO Yields Record Growth for Retail Chain',
      category: 'Commerce & SEO',
      client: 'Urban Wardrobe',
      impact: '+240% Local Store Footfall',
      summary: 'Constructed an automated programmatic local SEO architecture that generated high-performance landing pages, dynamic schema tags, and optimized local map visibility across 65 store branches.',
      metrics: [
        { label: 'Organic Visits', value: '+240%' },
        { label: 'Store Footfall', value: '+180%' },
        { label: 'Top 3 Keywords', value: '50+' }
      ],
      tech: ['Next.js SSR', 'Schema JSON-LD', 'Google API', 'Core Web Vitals']
    },
    {
      id: 'cloud-health-migration',
      title: 'Migrating Critical Health Data with Zero Downtime',
      category: 'Enterprise & Cloud',
      client: 'National Imaging Network',
      impact: '12TB Data Streamed with 100% Integrity',
      summary: 'Planned and executed a multi-region dual-write cloud migration for 12TB of DICOM imaging archives and electronic health records with continuous integrity hashing.',
      metrics: [
        { label: 'Data Migrated', value: '12 TB' },
        { label: 'File Integrity', value: '100.0%' },
        { label: 'Disruption Time', value: '0 Mins' }
      ],
      tech: ['AWS S3', 'PostgreSQL', 'Golang Workers', 'AES-256']
    },
    {
      id: 'cross-border-payments',
      title: 'Revolutionizing Cross-Border Payments for Global Commerce',
      category: 'Commerce & SEO',
      client: 'FinVenture Global',
      impact: '₹1.8 Cr Saved in FX Fees',
      summary: 'Created an intelligent currency liquidity router that predicts optimal settlement windows and reconciles multi-currency payments in seconds instead of 3 banking days.',
      metrics: [
        { label: 'Settlement Time', value: '3 Secs' },
        { label: 'FX Fee Reduction', value: '82%' },
        { label: 'Transaction Vol', value: '$45M+' }
      ],
      tech: ['TypeScript', 'FastAPI', 'Redis', 'Banking Gateway APIs']
    }
  ];

  const filteredStudies = activeFilter === 'All'
    ? studies
    : studies.filter(s => s.category === activeFilter);

  return (
    <div className="bg-surface text-left overflow-hidden">
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-20 px-4 md:px-8 lg:px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">auto_graph</span>
            Proven Solutions
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-black text-on-surface tracking-tight leading-tight">
            From Challenge to <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Scalable Solutions
            </span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant font-medium leading-relaxed">
            Case Studies in Digital Excellence. Explore how our architectural precision, AI integrations, and custom software solve real-world systemic challenges for global organizations.
          </p>
        </div>
      </section>

      {/* Filter Tabs & Case Studies Grid */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-surface-container-low border-y border-outline-variant/10">
        <div className="max-w-screen-2xl mx-auto space-y-12">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 border-b border-outline-variant/10 pb-6">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                  activeFilter === filter
                    ? 'bg-primary text-on-primary shadow-md'
                    : 'bg-white border border-outline-variant/30 text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {filteredStudies.map((study) => (
              <div 
                key={study.id}
                className="bg-white rounded-3xl p-8 md:p-10 border border-outline-variant/15 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider">
                      {study.category}
                    </span>
                    <span className="text-xs font-bold text-on-surface-variant/80">
                      Client: {study.client}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold font-headline text-on-surface hover:text-primary transition-colors">
                    {study.title}
                  </h3>

                  <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                    {study.summary}
                  </p>

                  {/* Impact Stats */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {study.metrics.map((m, idx) => (
                      <div key={idx} className="p-3 bg-surface-container rounded-2xl text-center">
                        <div className="text-lg md:text-xl font-black font-headline text-primary">
                          {m.value}
                        </div>
                        <div className="text-[10px] font-bold uppercase text-on-surface-variant mt-0.5">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {study.tech.map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono font-bold bg-surface-container-high px-2.5 py-1 rounded-lg text-on-surface-variant">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-outline-variant/10 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified Outcome
                  </span>
                  <button 
                    onClick={() => openModal(`Consultation for ${study.title}`, 'general')}
                    className="text-xs font-black uppercase tracking-wider text-primary hover:text-primary-container flex items-center gap-1 group"
                  >
                    Architect Similar Solution
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 md:px-8 bg-surface text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-headline font-black text-on-surface tracking-tight">
            Engineering Global Success.
          </h2>
          <p className="text-on-surface-variant text-base font-medium">
            Have a challenge of similar magnitude? Let's talk architecture.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button 
              onClick={() => openModal('Initiate Case Study Consultation', 'general')}
              className="bg-primary text-on-primary px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest shadow-lg hover:bg-primary-container transition-all flex items-center gap-2"
            >
              Start Architecture Blueprint <ArrowRight className="w-4 h-4" />
            </button>
            <Link 
              to="/services" 
              className="px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest bg-white border border-outline-variant/30 text-on-surface hover:bg-surface-container transition-all"
            >
              View Services Hub
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

