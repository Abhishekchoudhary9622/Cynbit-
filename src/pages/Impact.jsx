import React from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { ArrowRight, Heart, Sparkles, GraduationCap, Users, Globe2 } from 'lucide-react';

export default function Impact() {
  const { openModal } = useModal();

  return (
    <div className="bg-surface text-left overflow-hidden">
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-20 px-4 md:px-8 lg:px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">volunteer_activism</span>
            Our initiatives
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-black text-on-surface tracking-tight leading-tight">
            Cynbit for Society
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant font-medium leading-relaxed">
            We believe technology is a lever for social progress. Our initiatives evolve alongside the student journey, moving from building raw skills to nurturing resilient individuals capable of transforming communities.
          </p>
        </div>
      </section>

      {/* BitElevate Evolution */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-surface-container-low border-y border-outline-variant/10">
        <div className="max-w-screen-2xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="text-xs font-black uppercase tracking-widest text-primary">Flagship Initiative</div>
            <h2 className="text-3xl md:text-5xl font-headline font-black text-on-surface tracking-tight">
              BitElevate evolution
            </h2>
            <p className="text-sm md:text-base text-on-surface-variant font-medium">
              Transforming raw potential into verified technical mastery and holistic human growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-outline-variant/15 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                  Phase 1.0 • Technical Mastery
                </span>
                <span className="material-symbols-outlined text-primary text-2xl">code</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-headline text-on-surface">
                Technical capability & career readiness.
              </h3>
              <p className="text-on-surface-variant text-sm md:text-base leading-relaxed font-medium">
                Demolishing outdated rote memorization. We provide tier-2 and tier-3 college engineering students with access to real production codebases, automated pull-request evaluations, and modern architectural standards.
              </p>
              <ul className="space-y-2 text-xs md:text-sm text-on-surface-variant">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Zero-cost open learning tracks & mentorship
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Bridging the university-to-employability gap
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Hands-on engineering across 16+ core technical domains
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-outline-variant/15 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-widest text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                  Phase 2.0 • Human Resilience
                </span>
                <span className="material-symbols-outlined text-secondary text-2xl">self_improvement</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-headline text-on-surface">
                Holistic well-being & mental health.
              </h3>
              <p className="text-on-surface-variant text-sm md:text-base leading-relaxed font-medium">
                High technical performance without burnout. We incorporate mental wellness workshops, psychological resilience sessions, and community support networks to build emotionally resilient tech leaders.
              </p>
              <ul className="space-y-2 text-xs md:text-sm text-on-surface-variant">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Mental health awareness and stress management
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Peer-to-peer psychological safety circles
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Compassionate leadership & career design counseling
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Partnership: Manav Seva Trust */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto rounded-[3rem] bg-gradient-to-br from-surface-container to-surface-container-high p-8 md:p-16 border border-outline-variant/20 shadow-md">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-tertiary/10 text-tertiary font-bold text-xs uppercase tracking-widest">
                Strategic Alliance • Jaipur
              </div>
              <h2 className="text-3xl md:text-5xl font-headline font-black text-on-surface tracking-tight leading-tight">
                Affiliation with Manav Seva Trust.
              </h2>
              <p className="text-on-surface-variant text-base md:text-lg leading-relaxed font-medium">
                Through our ongoing collaboration with Manav Seva Trust in Rajasthan, we provide foundational computer literacy, digital enablement, and IT training to government schools and underserved youth.
              </p>
              <div className="grid sm:grid-cols-2 gap-6 pt-2">
                <div className="bg-white p-5 rounded-2xl border border-outline-variant/15 shadow-sm">
                  <div className="text-3xl font-black font-headline text-primary">50,000+</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mt-1">
                    Lives Touched Across Rajasthan
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-outline-variant/15 shadow-sm">
                  <div className="text-3xl font-black font-headline text-secondary">25+</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mt-1">
                    Community Learning Centers
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-outline-variant/15 shadow-sm space-y-6">
              <h4 className="text-xl font-bold font-headline text-on-surface">
                Our Shared Social Commitments
              </h4>
              <div className="space-y-4 text-sm text-on-surface-variant font-medium">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-xl mt-0.5">devices</span>
                  <div>
                    <strong className="text-on-surface">Digital Labs:</strong> Setting up modern computer systems and internet infrastructure in rural schools.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-xl mt-0.5">school</span>
                  <div>
                    <strong className="text-on-surface">Volunteer Mentorship:</strong> Cynbit engineers dedicate hours each week to mentor grassroots students.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-tertiary text-xl mt-0.5">diversity_1</span>
                  <div>
                    <strong className="text-on-surface">Inclusive Opportunities:</strong> Providing full scholarships for advanced BitElevate engineering tracks.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 md:px-8 bg-surface-container-low border-t border-outline-variant/10 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-headline font-black text-on-surface tracking-tight">
            Build the future with us.
          </h2>
          <p className="text-on-surface-variant text-base font-medium">
            Interested in supporting our social initiatives or creating educational partnerships?
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button 
              onClick={() => openModal('Support Cynbit Social Impact', 'general')}
              className="bg-primary text-on-primary px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest shadow-lg hover:bg-primary-container transition-all flex items-center gap-2"
            >
              Collaborate for impact <ArrowRight className="w-4 h-4" />
            </button>
            <Link 
              to="/bitelevate" 
              className="px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest bg-white border border-outline-variant/30 text-on-surface hover:bg-surface-container transition-all"
            >
              Explore BitElevate
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

