import React from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { ArrowRight, ShieldCheck, CheckCircle2, Users, Linkedin, Sparkles } from 'lucide-react';

export default function Team() {
  const { openModal } = useModal();

  const leaders = [
    {
      name: "Mohak Saini",
      role: "Founder & CEO",
      responsibility: "Technical Strategy & Systemic Design",
      description: "Steering the overarching architectural vision, AI research initiatives, and proprietary SaaS platforms at Cynbit. Dedicated to building autonomous, friction-free business infrastructures.",
      linkedin: "https://www.linkedin.com/company/cynbit-in/",
      imageBadge: "MS"
    },
    {
      name: "Ashutosh Upadhyay",
      role: "Co-Founder",
      responsibility: "Intuitive Architecture & Quality Engineering",
      description: "Directing intuitive product ergonomics, software quality frameworks, and ensuring that high-throughput enterprise systems remain human-centric and uncompromisingly reliable.",
      linkedin: "https://www.linkedin.com/company/cynbit-in/",
      imageBadge: "AU"
    },
    {
      name: "Dhawan Nama",
      role: "Co-Founder & CTO",
      responsibility: "Ecosystem Scalability & Engineering Protocols",
      description: "Spearheading cloud-native architectures, distributed backend pipelines, and scaling BitElevate's automated code verification and evaluation engines across global dimensions.",
      linkedin: "https://www.linkedin.com/company/cynbit-in/",
      imageBadge: "DN"
    }
  ];

  return (
    <div className="bg-surface text-left overflow-hidden">
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-20 px-4 md:px-8 lg:px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">groups</span>
            The inner circle
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-black text-on-surface tracking-tight leading-tight">
            Meet the Architects behind Cynbit
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant font-medium leading-relaxed">
            At Cynbit, we assemble a board of digital architects selected for their technical rigor and commitment to a resilient, optimistic future.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-16 px-4 md:px-8 lg:px-12 bg-surface-container-low border-y border-outline-variant/10">
        <div className="max-w-screen-2xl mx-auto grid sm:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-3xl border border-outline-variant/15 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">shield_person</span>
            </div>
            <h3 className="text-lg font-bold font-headline text-on-surface">Radical Integrity</h3>
            <p className="text-xs md:text-sm text-on-surface-variant font-medium leading-relaxed">
              Leadership bound by technical transparency, open architectural reviews, and high ethical standards.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-outline-variant/15 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">verified</span>
            </div>
            <h3 className="text-lg font-bold font-headline text-on-surface">Proven Rigor</h3>
            <p className="text-xs md:text-sm text-on-surface-variant font-medium leading-relaxed">
              A documented history of solving complex systemic challenges across AI, distributed systems, and SaaS.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-outline-variant/15 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-tertiary/10 text-tertiary flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">diversity_3</span>
            </div>
            <h3 className="text-lg font-bold font-headline text-on-surface">Collaborative Hub</h3>
            <p className="text-xs md:text-sm text-on-surface-variant font-medium leading-relaxed">
              A decentralized hub connecting developers, AI researchers, and engineering mentors worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Board */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
              Board of Architects
            </div>
            <h2 className="text-3xl md:text-5xl font-headline font-black text-on-surface tracking-tight">
              The core leadership
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {leaders.map((leader, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-8 border border-outline-variant/15 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Avatar Icon */}
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-secondary text-white font-headline font-black text-xl flex items-center justify-center shadow-md">
                      {leader.imageBadge}
                    </div>
                    <a 
                      href={leader.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold font-headline text-on-surface">
                      {leader.name}
                    </h3>
                    <div className="text-xs font-black uppercase tracking-wider text-primary mt-1">
                      {leader.role}
                    </div>
                    <div className="text-xs font-semibold text-on-surface-variant/80 mt-0.5">
                      {leader.responsibility}
                    </div>
                  </div>

                  <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                    {leader.description}
                  </p>
                </div>

                <div className="pt-8 border-t border-outline-variant/10 mt-6 flex items-center justify-between text-xs text-on-surface-variant">
                  <span className="flex items-center gap-1.5 font-bold text-primary">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    Director
                  </span>
                  <span>Jaipur, India</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 md:px-8 bg-surface-container-low border-y border-outline-variant/10 text-center">
        <div className="max-w-screen-2xl mx-auto space-y-8">
          <h2 className="text-2xl md:text-4xl font-headline font-black text-on-surface">
            Expertise Verified. Delivering architectural software rigor at global scale.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-3xl md:text-4xl font-black font-headline text-primary">100+</div>
              <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mt-1">Projects Deployed</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black font-headline text-secondary">15+</div>
              <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mt-1">Specialized Architects</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black font-headline text-tertiary">1000+</div>
              <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mt-1">Engineers Mentored</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black font-headline text-emerald-600">99.9%</div>
              <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mt-1">Platform Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 md:px-8 bg-surface text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-headline font-black text-on-surface tracking-tight">
            Building the optimistic future.
          </h2>
          <p className="text-on-surface-variant text-base font-medium">
            Interested in joining our inner circle or collaborating on a high-stakes project?
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button 
              onClick={() => openModal('Start a Conversation with Architects', 'general')}
              className="bg-primary text-on-primary px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest shadow-lg hover:bg-primary-container transition-all flex items-center gap-2"
            >
              Start a conversation <ArrowRight className="w-4 h-4" />
            </button>
            <Link 
              to="/careers" 
              className="px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest bg-white border border-outline-variant/30 text-on-surface hover:bg-surface-container transition-all"
            >
              View openings
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

