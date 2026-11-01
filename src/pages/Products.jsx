import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { ArrowRight, CheckCircle2, Sparkles, Building2, Star, Code2, ExternalLink } from 'lucide-react';

export default function Products() {
  const { openModal } = useModal();
  const [activeTab, setActiveTab] = useState('studio');

  return (
    <div className="bg-surface text-left overflow-hidden">
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-20 px-4 md:px-8 lg:px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">inventory_2</span>
            Product Suite
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-black text-on-surface tracking-tight leading-tight">
            The Cynbit Product Ecosystem
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant font-medium leading-relaxed">
            Proprietary SaaS platforms and engineering ecosystems designed to eliminate friction, automate operations, and elevate global human potential.
          </p>
        </div>
      </section>

      {/* Product 1: Cynbit Studio */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-surface-container-low border-y border-outline-variant/10">
        <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
              SaaS Ecosystem 01 • Developer Intelligence
            </div>
            <h2 className="text-3xl md:text-5xl font-headline font-black text-on-surface tracking-tight">
              Cynbit Studio
            </h2>
            <p className="text-base md:text-lg text-on-surface-variant font-medium leading-relaxed">
              Not just another coding platform. Cynbit Studio is a career intelligence and adaptive development environment that bridges the gulf between academic training and real-world software engineering.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-xl mt-0.5">psychology</span>
                <div>
                  <h4 className="font-bold text-on-surface text-base">Adaptive Learning & AI Evaluation</h4>
                  <p className="text-xs md:text-sm text-on-surface-variant font-medium">
                    Automated code review algorithms examine algorithmic efficiency, style compliance, edge-case coverage, and security vulnerabilities in real time.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-xl mt-0.5">radar</span>
                <div>
                  <h4 className="font-bold text-on-surface text-base">Skill Radar & Career Intelligence</h4>
                  <p className="text-xs md:text-sm text-on-surface-variant font-medium">
                    Visual diagnostic mapping that highlights strengths across systems design, data structures, cloud deployment, and architectural patterns.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button 
                onClick={() => openModal('Request Cynbit Studio Access / Demo', 'demo')}
                className="bg-primary text-on-primary px-7 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-primary-container transition-all flex items-center gap-2"
              >
                Schedule Studio Demo <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-8 rounded-[2.5rem] border border-outline-variant/15 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/15">
              <span className="text-xs font-mono font-bold text-primary">studio.cynbit.in</span>
              <span className="text-[10px] bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-bold">Live AI Eval</span>
            </div>
            <div className="p-4 rounded-2xl bg-surface-container font-mono text-xs space-y-2">
              <div className="text-on-surface-variant/70">// Skill Assessment Engine</div>
              <div className="text-primary font-bold">function evaluatePR(commitHash) &#123;</div>
              <div className="pl-4 text-on-surface">const coverage = analyzeCoverage();</div>
              <div className="pl-4 text-on-surface">const complexity = computeCyclomatic();</div>
              <div className="pl-4 text-secondary">return generateFeedback(&#123; coverage, complexity &#125;);</div>
              <div className="text-primary font-bold">&#125;</div>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-surface-container text-center">
                <div className="text-lg font-bold text-primary font-headline">94.8%</div>
                <div className="text-[10px] text-on-surface-variant font-bold uppercase">Accuracy Score</div>
              </div>
              <div className="p-3 rounded-xl bg-surface-container text-center">
                <div className="text-lg font-bold text-secondary font-headline">&lt; 1.2s</div>
                <div className="text-[10px] text-on-surface-variant font-bold uppercase">Feedback Latency</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product 2: TenantEase */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 bg-surface-container p-8 rounded-[2.5rem] border border-outline-variant/15 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/15">
              <span className="text-xs font-mono font-bold text-secondary">tenantease.in</span>
              <span className="text-[10px] bg-secondary/10 text-secondary px-2.5 py-0.5 rounded-full font-bold">Smart PMS</span>
            </div>
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-white border border-outline-variant/10 shadow-xs flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-on-surface">Rent Collections - Oct 2026</div>
                  <div className="text-[11px] text-emerald-600 font-semibold">96% Collected On-Time</div>
                </div>
                <span className="text-sm font-black text-on-surface font-headline">₹4,80,000</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-outline-variant/10 shadow-xs flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-on-surface">WhatsApp Automated Reminders</div>
                  <div className="text-[11px] text-on-surface-variant font-medium">14 Delivered • 0 Failures</div>
                </div>
                <span className="material-symbols-outlined text-secondary">send</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-outline-variant/10 shadow-xs flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-on-surface">Maintenance Ticket #108</div>
                  <div className="text-[11px] text-amber-600 font-medium">In Progress • Plumbing</div>
                </div>
                <span className="text-[10px] font-bold bg-amber-500/10 text-amber-700 px-2 py-0.5 rounded">Active</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-widest">
              SaaS Ecosystem 02 • PropTech Automation
            </div>
            <h2 className="text-3xl md:text-5xl font-headline font-black text-on-surface tracking-tight">
              TenantEase
            </h2>
            <p className="text-base md:text-lg text-on-surface-variant font-medium leading-relaxed">
              "Run your property business without the chaos of notebooks and scattered chats." Smart Property & Tenant Management Platform designed for landlords, PG owners, and real estate operators.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary text-xl mt-0.5">payments</span>
                <div>
                  <h4 className="font-bold text-on-surface text-base">Rent & Payment Intelligence</h4>
                  <p className="text-xs md:text-sm text-on-surface-variant font-medium">
                    Automated UPI payment reconciliation, rent reminder scheduling via WhatsApp and SMS, and instant PDF digital receipts.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary text-xl mt-0.5">contract</span>
                <div>
                  <h4 className="font-bold text-on-surface text-base">Digital Lease & Tenant Profiling</h4>
                  <p className="text-xs md:text-sm text-on-surface-variant font-medium">
                    Secure KYC storage, digital rental agreements, move-in/move-out checklists, and centralized multi-property visibility.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button 
                onClick={() => openModal('Request TenantEase Demo', 'demo')}
                className="bg-secondary text-on-secondary px-7 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-secondary/90 transition-all flex items-center gap-2"
              >
                Schedule TenantEase Demo <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product 3: Revio */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-surface-container-low border-t border-outline-variant/10">
        <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary/10 text-tertiary text-xs font-bold uppercase tracking-widest">
              SaaS Ecosystem 03 • AI Reputation Intelligence
            </div>
            <h2 className="text-3xl md:text-5xl font-headline font-black text-on-surface tracking-tight">
              Revio
            </h2>
            <p className="text-base md:text-lg text-on-surface-variant font-medium leading-relaxed">
              The Definitive Review Management System. AI-first platform engineered to monitor customer sentiment, synchronize multi-platform reviews, and generate contextual responses that build public brand trust.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-tertiary text-xl mt-0.5">sync</span>
                <div>
                  <h4 className="font-bold text-on-surface text-base">AI-Driven Multi-Platform Sync</h4>
                  <p className="text-xs md:text-sm text-on-surface-variant font-medium">
                    Aggregate reviews across Google Maps, Trustpilot, Meta, and industry review sites into a single operational command center.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-tertiary text-xl mt-0.5">sentiment_very_satisfied</span>
                <div>
                  <h4 className="font-bold text-on-surface text-base">Contextual Sentiment & Smart Replies</h4>
                  <p className="text-xs md:text-sm text-on-surface-variant font-medium">
                    AI analyzes tone, detects critical customer issues, and drafts brand-aligned responses ready for one-click approval.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button 
                onClick={() => openModal('Request Revio Platform Demo', 'demo')}
                className="bg-tertiary text-on-tertiary px-7 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all flex items-center gap-2"
              >
                Schedule Revio Demo <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-8 rounded-[2.5rem] border border-outline-variant/15 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/15">
              <span className="text-xs font-mono font-bold text-tertiary">revio.cynbit.in</span>
              <span className="text-[10px] bg-tertiary/10 text-tertiary px-2.5 py-0.5 rounded-full font-bold">Live Sentiment</span>
            </div>
            <div className="p-4 rounded-2xl bg-surface-container space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500">
                  {"★".repeat(5)}
                </div>
                <span className="text-[10px] text-on-surface-variant font-bold">Google Maps • 2m ago</span>
              </div>
              <p className="text-xs text-on-surface font-medium italic">
                "Unmatched architecture and seamless onboarding. The team delivered our AI platform two weeks ahead of schedule."
              </p>
              <div className="pt-2 border-t border-outline-variant/10 text-[11px] text-primary font-bold flex items-center justify-between">
                <span>AI Suggested Reply Ready</span>
                <span className="text-[10px] bg-primary/10 px-2 py-0.5 rounded">Tone: Professional</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 md:px-8 bg-surface text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-headline font-black text-on-surface tracking-tight">
            Deploy proprietary software in your operations.
          </h2>
          <p className="text-on-surface-variant text-base font-medium">
            Contact our engineering architects to discuss custom enterprise licenses, integrations, and deployment.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button 
              onClick={() => openModal('Enterprise Product Deployment Inquiry', 'demo')}
              className="bg-primary text-on-primary px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest shadow-lg hover:bg-primary-container transition-all flex items-center gap-2"
            >
              Request Enterprise License <ArrowRight className="w-4 h-4" />
            </button>
            <Link 
              to="/contact" 
              className="px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest bg-surface-container border border-outline-variant/30 text-on-surface hover:bg-surface-container-high transition-all"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

