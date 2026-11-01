import React from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { ArrowRight, Compass, Target, Calendar, CheckCircle2, Award } from 'lucide-react';

export default function Story() {
  const { openModal } = useModal();

  return (
    <div className="bg-surface text-left overflow-hidden">
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-20 px-4 md:px-8 lg:px-12 bg-surface relative">
        <div className="max-w-screen-2xl mx-auto max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">history_edu</span>
            The Cynbit narrative
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-black text-on-surface tracking-tight leading-tight">
            Cynbit: The Story of a Vision
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant font-medium leading-relaxed">
            Founded in Jaipur, Rajasthan, Cynbit Technologies was built with a vision to create scalable AI solutions, automation systems, and modern software products that bridge human warmth with digital precision.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-surface-container-low border-y border-outline-variant/10">
        <div className="max-w-screen-2xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-outline-variant/15 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">visibility</span>
            </div>
            <div className="text-xs font-black uppercase tracking-widest text-primary">Our Vision</div>
            <h2 className="text-2xl md:text-3xl font-headline font-black text-on-surface">
              The engineering of optimism.
            </h2>
            <p className="text-on-surface-variant text-base leading-relaxed font-medium">
              To be the global architectural benchmark for the digital age—engineering resilient infrastructures that bridge technical precision with human warmth, empowering businesses and builders to flourish without friction.
            </p>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-outline-variant/15 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">track_changes</span>
            </div>
            <div className="text-xs font-black uppercase tracking-widest text-secondary">Our Mission</div>
            <h2 className="text-2xl md:text-3xl font-headline font-black text-on-surface">
              Eliminating the invisible friction.
            </h2>
            <p className="text-on-surface-variant text-base leading-relaxed font-medium">
              To eliminate the invisible friction in enterprise workflows and student career trajectories through autonomous software, robust cloud architectures, and adaptive project-based engineering ecosystems.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto max-w-4xl space-y-16">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
              Architectural Journey
            </div>
            <h2 className="text-3xl md:text-5xl font-headline font-black text-on-surface tracking-tight">
              Milestones of execution.
            </h2>
          </div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:left-8 md:before:left-1/2 before:w-0.5 before:bg-outline-variant/20">
            {/* 2021 */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="md:w-1/2 md:text-right pr-4 md:pr-12 space-y-2 order-2 md:order-1">
                <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  2021 • Foundation
                </span>
                <h3 className="text-2xl font-bold font-headline text-on-surface">Preparatory rigor.</h3>
                <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                  Before the brand identity, there was the logic. We spent 2021 engineering the invisible—building zero-trust modules and core architectural blueprints that would sustain global scale.
                </p>
              </div>
              <div className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm z-10 shadow-lg flex-shrink-0 order-1 md:order-2">
                2021
              </div>
              <div className="md:w-1/2 md:pl-12 order-3"></div>
            </div>

            {/* 2022 */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="md:w-1/2 order-2 md:order-1"></div>
              <div className="w-16 h-16 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-sm z-10 shadow-lg flex-shrink-0 order-1 md:order-2">
                2022
              </div>
              <div className="md:w-1/2 pl-4 md:pl-12 space-y-2 order-3">
                <span className="text-xs font-mono font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                  2022 • Validation
                </span>
                <h3 className="text-2xl font-bold font-headline text-on-surface">Stress testing.</h3>
                <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                  We took our internal frameworks to the market. Partnering with enterprise visionaries, we validated that our architectural approach could eliminate operational friction in high-throughput production environments.
                </p>
              </div>
            </div>

            {/* 2023 */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="md:w-1/2 md:text-right pr-4 md:pr-12 space-y-2 order-2 md:order-1">
                <span className="text-xs font-mono font-bold text-tertiary bg-tertiary/10 px-3 py-1 rounded-full">
                  2023 • Evolution
                </span>
                <h3 className="text-2xl font-bold font-headline text-on-surface">Finalizing the roadmap.</h3>
                <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                  The year of intense experimentation. We refined our proprietary AI engines and finalized the operational blueprints for BitElevate, Cynbit Studio, and TenantEase.
                </p>
              </div>
              <div className="w-16 h-16 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center font-bold text-sm z-10 shadow-lg flex-shrink-0 order-1 md:order-2">
                2023
              </div>
              <div className="md:w-1/2 md:pl-12 order-3"></div>
            </div>

            {/* 2024 */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="md:w-1/2 order-2 md:order-1"></div>
              <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm z-10 shadow-lg flex-shrink-0 order-1 md:order-2">
                2024
              </div>
              <div className="md:w-1/2 pl-4 md:pl-12 space-y-2 order-3">
                <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  2024 • Arrival
                </span>
                <h3 className="text-2xl font-bold font-headline text-on-surface">Birth of Cynbit.</h3>
                <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                  Cynbit Technologies Private Limited was officially incorporated in Jaipur, Rajasthan. Years of relentless engineering merged with our global identity, powering enterprise software and upskilling thousands of engineers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 md:px-8 bg-surface-container-low border-t border-outline-variant/10 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-headline font-black text-on-surface tracking-tight">
            Build the next chapter with us.
          </h2>
          <p className="text-on-surface-variant text-base font-medium">
            Interested in architecting the future of digital evolution with our core team?
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button 
              onClick={() => openModal('Partner with Cynbit', 'general')}
              className="bg-primary text-on-primary px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest shadow-lg hover:bg-primary-container transition-all flex items-center gap-2"
            >
              Partner with us <ArrowRight className="w-4 h-4" />
            </button>
            <Link 
              to="/team" 
              className="px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest bg-white border border-outline-variant/30 text-on-surface hover:bg-surface-container transition-all"
            >
              Meet the architects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

