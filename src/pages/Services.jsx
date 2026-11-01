import React from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { 
  ArrowRight, 
  Bot, 
  Code, 
  Cpu, 
  Database, 
  Layers, 
  Cloud, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp,
  Search,
  CheckCircle2
} from 'lucide-react';

export default function Services() {
  const { openModal } = useModal();

  const techStack = [
    { category: "Languages", items: ["TypeScript", "Python", "Go", "Rust", "JavaScript", "SQL"] },
    { category: "Frameworks", items: ["React", "Next.js", "FastAPI", "Node.js", "Tailwind CSS", "Express"] },
    { category: "AI & Machine Learning", items: ["PyTorch", "vLLM", "LangChain", "OpenAI / Anthropic", "Gemini API", "Hugging Face"] },
    { category: "Cloud & Infrastructure", items: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "Terraform"] },
    { category: "Databases & Storage", items: ["PostgreSQL", "Redis", "Pinecone", "MongoDB", "ClickHouse", "pgvector"] }
  ];

  return (
    <div className="bg-surface text-left overflow-hidden">
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-20 px-4 md:px-8 lg:px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">terminal</span>
            Services Hub
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-black text-on-surface tracking-tight leading-tight">
            Built for Scale. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Designed for Performance.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant font-medium leading-relaxed">
            Custom software engineering, cognitive AI automation, and high-performance digital marketing built to scale enterprise operations with zero invisible friction.
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={() => openModal('Schedule Technical Architecture Consultation', 'general')}
              className="bg-primary text-on-primary px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-xl hover:bg-primary-container transition-all flex items-center gap-3"
            >
              Initiate Architecture Consultation
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/products"
              className="px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-on-surface transition-all"
            >
              Explore Proprietary Products
            </Link>
          </div>
        </div>
      </section>

      {/* Pillar 1: Autonomous AI */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-surface-container-low border-y border-outline-variant/10">
        <div className="max-w-screen-2xl mx-auto space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
              Domain 01 • Cognitive Engineering
            </div>
            <h2 className="text-3xl md:text-5xl font-headline font-black text-on-surface tracking-tight">
              Autonomous AI agents & cognitive automation
            </h2>
            <p className="text-on-surface-variant text-base font-medium">
              Moving beyond basic chatbots. We build autonomous agentic systems that observe, plan, execute API calls, and resolve complex workflows without human intervention.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-outline-variant/15 space-y-4 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">smart_toy</span>
              </div>
              <h3 className="text-xl font-bold font-headline text-on-surface">Autonomous agents</h3>
              <p className="text-xs md:text-sm text-on-surface-variant font-medium leading-relaxed">
                Goal-driven agent loops equipped with tool-use, multi-step planning, and verified error recovery mechanisms.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-outline-variant/15 space-y-4 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">neurology</span>
              </div>
              <h3 className="text-xl font-bold font-headline text-on-surface">LLM automation</h3>
              <p className="text-xs md:text-sm text-on-surface-variant font-medium leading-relaxed">
                Context-aware knowledge extraction, document parsing, contract intelligence, and internal database synthesis.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-outline-variant/15 space-y-4 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-tertiary/10 text-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">record_voice_over</span>
              </div>
              <h3 className="text-xl font-bold font-headline text-on-surface">AI Voice Agents</h3>
              <p className="text-xs md:text-sm text-on-surface-variant font-medium leading-relaxed">
                Ultra-low latency bidirectional voice AI for automated customer inquiries, booking workflows, and dispatch.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-outline-variant/15 space-y-4 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">integration_instructions</span>
              </div>
              <h3 className="text-xl font-bold font-headline text-on-surface">AI stack integration</h3>
              <p className="text-xs md:text-sm text-on-surface-variant font-medium leading-relaxed">
                Deployment with vLLM, LangGraph, pgvector, and custom model quantization for maximum throughput at minimal compute cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar 2: Software Development & Cloud */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-widest">
              Domain 02 • Core Infrastructure
            </div>
            <h2 className="text-3xl md:text-5xl font-headline font-black text-on-surface tracking-tight">
              Scalable software development & cloud solutions
            </h2>
            <p className="text-on-surface-variant text-base font-medium">
              Resilient enterprise software engineered to handle peak loads, distributed transactions, and critical business continuity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-surface-container p-8 rounded-3xl border border-outline-variant/15 space-y-4 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">web</span>
              </div>
              <h3 className="text-xl font-bold font-headline text-on-surface">Full-stack dev</h3>
              <p className="text-xs md:text-sm text-on-surface-variant font-medium leading-relaxed">
                Modern responsive web and mobile interfaces built with React, Next.js, TypeScript, and state-of-the-art UI ergonomics.
              </p>
            </div>

            <div className="bg-surface-container p-8 rounded-3xl border border-outline-variant/15 space-y-4 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">dns</span>
              </div>
              <h3 className="text-xl font-bold font-headline text-on-surface">Backend systems</h3>
              <p className="text-xs md:text-sm text-on-surface-variant font-medium leading-relaxed">
                High-concurrency microservices, robust REST & GraphQL APIs, asynchronous queues, and real-time WebSockets in Go, Python, and Node.
              </p>
            </div>

            <div className="bg-surface-container p-8 rounded-3xl border border-outline-variant/15 space-y-4 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-tertiary/10 text-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">cloud_sync</span>
              </div>
              <h3 className="text-xl font-bold font-headline text-on-surface">Cloud infrastructure</h3>
              <p className="text-xs md:text-sm text-on-surface-variant font-medium leading-relaxed">
                Multi-region Kubernetes clusters, Docker containerization, Terraform IaC, automated autoscaling, and disaster recovery.
              </p>
            </div>

            <div className="bg-surface-container p-8 rounded-3xl border border-outline-variant/15 space-y-4 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">published_with_changes</span>
              </div>
              <h3 className="text-xl font-bold font-headline text-on-surface">Legacy migration</h3>
              <p className="text-xs md:text-sm text-on-surface-variant font-medium leading-relaxed">
                Migrating cumbersome monolithic systems to modern cloud stacks with zero data loss and minimal operational downtime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar 3: Marketing & Technical SEO */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-surface-container-low border-t border-outline-variant/10">
        <div className="max-w-screen-2xl mx-auto space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary/10 text-tertiary text-xs font-bold uppercase tracking-widest">
              Domain 03 • Growth Engineering
            </div>
            <h2 className="text-3xl md:text-5xl font-headline font-black text-on-surface tracking-tight">
              Data-driven marketing & technical SEO engineering
            </h2>
            <p className="text-on-surface-variant text-base font-medium">
              We engineer revenue growth through mathematical optimization, programmatic search engine positioning, and automated sales conversion funnels.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-outline-variant/15 space-y-4 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">campaign</span>
              </div>
              <h3 className="text-xl font-bold font-headline text-on-surface">Performance ads</h3>
              <p className="text-xs md:text-sm text-on-surface-variant font-medium leading-relaxed">
                Google, Meta, and LinkedIn campaign engineering backed by custom tracking pixels, offline conversions, and ROAS optimization.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-outline-variant/15 space-y-4 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">travel_explore</span>
              </div>
              <h3 className="text-xl font-bold font-headline text-on-surface">Technical SEO</h3>
              <p className="text-xs md:text-sm text-on-surface-variant font-medium leading-relaxed">
                Core Web Vitals acceleration, programmatic internal link indexing, structured JSON-LD schemas, and international search domination.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-outline-variant/15 space-y-4 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-tertiary/10 text-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">hub</span>
              </div>
              <h3 className="text-xl font-bold font-headline text-on-surface">CRM automation</h3>
              <p className="text-xs md:text-sm text-on-surface-variant font-medium leading-relaxed">
                End-to-end customer journey orchestration across HubSpot, Zoho, and bespoke webhook event triggers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Matrix */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="text-xs font-black uppercase tracking-widest text-primary">Technical Stacks</div>
            <h2 className="text-3xl md:text-5xl font-headline font-black text-on-surface tracking-tight">
              Tools of the architects.
            </h2>
            <p className="text-sm md:text-base text-on-surface-variant font-medium">
              We leverage modern, battle-tested technologies built for latency reduction and multi-year longevity.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((stack, i) => (
              <div key={i} className="p-6 bg-surface-container rounded-3xl border border-outline-variant/15 space-y-4">
                <h4 className="text-sm font-black uppercase tracking-wider text-primary font-headline">
                  {stack.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {stack.items.map((item, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-white text-xs font-bold text-on-surface border border-outline-variant/20 shadow-2xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 md:px-8 bg-surface-container-low border-t border-outline-variant/10 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-headline font-black text-on-surface tracking-tight">
            Ready to construct?
          </h2>
          <p className="text-on-surface-variant text-base font-medium">
            Let's blueprint your custom software solution or AI workflow automation.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button 
              onClick={() => openModal('Initiate Project Blueprint', 'general')}
              className="bg-primary text-on-primary px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest shadow-lg hover:bg-primary-container transition-all flex items-center gap-2"
            >
              Initiate Blueprint <ArrowRight className="w-4 h-4" />
            </button>
            <Link 
              to="/case-studies" 
              className="px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest bg-white border border-outline-variant/30 text-on-surface hover:bg-surface-container transition-all"
            >
              Review Case Studies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

