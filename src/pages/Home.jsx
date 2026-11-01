import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight,
  Award,
  Star,
  Activity,
  Cpu,
  Layers,
  Terminal,
  Shield,
  Zap,
  Globe
} from 'lucide-react';

export default function Home() {
  const { openModal } = useModal();

  // Dynamic Rotating Hero Text (as seen in Screenshot 3 vs. Screenshot 1)
  const heroPhrases = [
    "AI automation.",
    "Cloud solutions.",
    "Autonomous agents.",
    "Scalable software."
  ];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [fadeState, setFadeState] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState(false);
      setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % heroPhrases.length);
        setFadeState(true);
      }, 300);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const partnerLogos = [
    "Marketing Addict", "Evento", "Urban Wardrobe", "Cloudy Tales", 
    "EContentPrep", "Sofiasa", "Wild basil", "Pragya Healths", "WizHealth"
  ];

  return (
    <div className="overflow-hidden bg-surface text-left">
      {/* ======================================================== */}
      {/* HERO SECTION (Matching Screenshot 3 with Dynamic Rotation) */}
      {/* ======================================================== */}
      <section className="relative pt-20 md:pt-28 pb-20 md:pb-28 px-4 md:px-8 lg:px-12 overflow-hidden bg-surface">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[140px] pointer-events-none animate-pulse"></div>

        <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          {/* Left Hero Text */}
          <div className="lg:col-span-7 space-y-8 text-on-surface">
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-headline font-black tracking-tight text-on-surface leading-[1.08]">
              Architecting <br />
              the future with <br />
              <span 
                className={`text-[#006067] font-serif italic inline-block transition-all duration-300 transform ${
                  fadeState ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
              >
                {heroPhrases[phraseIndex]}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-on-surface-variant font-medium max-w-2xl leading-relaxed">
              Cynbit Technologies architects the digital future with <strong>autonomous AI agents</strong>, custom software development, and scalable business platforms. Based in Jaipur, Rajasthan, we bridge the gap between technical precision and global business growth.
            </p>

            {/* Hero CTAs */}
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <button 
                onClick={() => openModal('Start Discovery Phase', 'general')}
                className="bg-[#006067] text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-xl hover:bg-[#004e52] hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-3 group"
              >
                Start discovery
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link 
                to="/case-studies"
                className="px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest bg-white hover:bg-surface-container border border-outline-variant/30 text-on-surface transition-all hover:-translate-y-0.5 shadow-xs"
              >
                View work
              </Link>
            </div>
          </div>

          {/* Right Hero Interactive Graphic (Screenshot 3 Radar & Floating Badges) */}
          <div className="lg:col-span-5 relative py-6">
            <div className="relative mx-auto w-full max-w-[420px] aspect-square flex items-center justify-center">
              {/* Concentric Radar Canvas */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white via-surface-container-low to-surface-container border border-neutral-200/80 shadow-2xl flex items-center justify-center">
                {/* Concentric rings */}
                <div className="w-[78%] h-[78%] rounded-full border border-neutral-300/60 flex items-center justify-center">
                  <div className="w-[62%] h-[62%] rounded-full border border-neutral-300/40 flex items-center justify-center">
                    <div className="w-[38%] h-[38%] rounded-full border border-neutral-300/30 flex items-center justify-center bg-white shadow-inner">
                      {/* Center Node Icon */}
                      <span className="material-symbols-outlined text-primary text-2xl animate-pulse">hub</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Orbiting Brain Circle Node on Left */}
              <div className="absolute left-6 top-1/3 -translate-y-1/2 w-12 h-12 rounded-full bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center shadow-lg border border-white animate-float-slow z-20">
                <span className="material-symbols-outlined text-2xl">psychology</span>
              </div>

              {/* Top-Right Floating Card: AUTOMATION with animated efficiency bar */}
              <div className="absolute -top-4 right-0 z-20 bg-white/95 rounded-2xl p-4 shadow-xl border border-neutral-200/60 backdrop-blur-md w-56 animate-float-slow">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#006067] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Sparkles className="w-4 h-4 text-cyan-200" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-black uppercase tracking-widest text-[#006067]">
                      AUTOMATION
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-1.5 mt-2 overflow-hidden">
                      <div className="bg-[#006067] h-1.5 rounded-full w-[95%]"></div>
                    </div>
                    <div className="flex justify-between items-center text-[9px] text-neutral-500 font-bold mt-1">
                      <span>Efficiency</span>
                      <span className="text-[#006067]">95%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom-Left Floating Card: RUNTIME Active now */}
              <div className="absolute -bottom-4 left-2 z-20 bg-white/95 rounded-2xl p-4 shadow-xl border border-neutral-200/60 backdrop-blur-md flex items-center gap-3.5 animate-float-delay">
                <div className="w-9 h-9 rounded-xl bg-[#ffedd5] text-[#b45309] flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-lg">terminal</span>
                </div>
                <div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-neutral-400">
                    RUNTIME
                  </div>
                  <div className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    Active now
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* FOUNDATIONAL PILLARS (Screenshots 1, 2, 3) */}
      {/* ======================================================== */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-headline font-black text-on-surface tracking-tight">
              Foundational pillars.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-on-surface-variant font-medium leading-relaxed">
              Integrated excellence across AI technology, full-stack software development, and social responsibility.
            </p>
          </div>

          {/* Top 2 Cards: Custom IT infrastructure & Proprietary SaaS suite */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Card 1: Custom IT infrastructure */}
            <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 border border-outline-variant/20 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group">
              <div className="space-y-6">
                {/* Circular Icon */}
                <div className="w-14 h-14 rounded-full bg-[#e2f3f4] text-[#006067] flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-xs">
                  <span className="material-symbols-outlined text-2xl">settings</span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-on-surface tracking-tight">
                    Custom IT infrastructure
                  </h3>
                  <p className="text-sm md:text-base text-on-surface-variant font-medium mt-4 leading-relaxed">
                    Specialized software architecture and secure cloud foundations. We engineer scalable growth engines designed to accelerate technical maturity.
                  </p>
                </div>

                {/* 2x2 Grid of Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="bg-[#eef2f3] hover:bg-[#e4ecee] p-5 rounded-2xl transition-all duration-200 cursor-pointer group/pill border border-transparent hover:border-primary/20 hover:shadow-xs">
                    <div className="text-[11px] font-black tracking-widest text-[#006067] uppercase">
                      AI AUTOMATION
                    </div>
                    <div className="text-xs text-on-surface-variant font-semibold mt-1">
                      LLM & AGENTS
                    </div>
                  </div>

                  <div className="bg-[#eef2f3] hover:bg-[#e4ecee] p-5 rounded-2xl transition-all duration-200 cursor-pointer group/pill border border-transparent hover:border-primary/20 hover:shadow-xs">
                    <div className="text-[11px] font-black tracking-widest text-[#006067] uppercase">
                      SOFTWARE DEV
                    </div>
                    <div className="text-xs text-on-surface-variant font-semibold mt-1">
                      WEB & MOBILE
                    </div>
                  </div>

                  <div className="bg-[#eef2f3] hover:bg-[#e4ecee] p-5 rounded-2xl transition-all duration-200 cursor-pointer group/pill border border-transparent hover:border-tertiary/20 hover:shadow-xs">
                    <div className="text-[11px] font-black tracking-widest text-[#b47100] uppercase">
                      CLOUD SYSTEMS
                    </div>
                    <div className="text-xs text-on-surface-variant font-semibold mt-1">
                      AWS & AZURE
                    </div>
                  </div>

                  <div className="bg-[#eef2f3] hover:bg-[#e4ecee] p-5 rounded-2xl transition-all duration-200 cursor-pointer group/pill border border-transparent hover:border-secondary/20 hover:shadow-xs">
                    <div className="text-[11px] font-black tracking-widest text-[#12629d] uppercase">
                      TECHNICAL SEO
                    </div>
                    <div className="text-xs text-on-surface-variant font-semibold mt-1">
                      SEARCH GROWTH
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Proprietary SaaS suite */}
            <div className="bg-[#004e52] text-white rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group">
              {/* Subtle Ambient Shimmer */}
              <div className="absolute inset-0 card-shine opacity-30 pointer-events-none"></div>

              <div className="space-y-6 relative z-10">
                {/* Circular Icon */}
                <div className="w-14 h-14 rounded-full bg-white/10 text-white flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-xs border border-white/10">
                  <span className="material-symbols-outlined text-2xl">tab</span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-white tracking-tight">
                    Proprietary SaaS suite
                  </h3>
                  <p className="text-sm md:text-base text-white/80 font-medium mt-4 leading-relaxed">
                    Bespoke digital ecosystems engineered for specific market challenges and organizational excellence.
                  </p>
                </div>

                {/* 3 Horizontal Pill Cards */}
                <div className="space-y-3.5 pt-4">
                  {/* Cynbit Studio */}
                  <Link 
                    to="/products"
                    className="bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4 transition-all duration-300 cursor-pointer hover:translate-x-1.5 border border-white/5 hover:border-white/25 block"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-white text-[#004e52] font-black text-xs flex items-center justify-center flex-shrink-0 shadow-sm">
                        CS
                      </div>
                      <div>
                        <div className="text-xs font-black uppercase tracking-wider text-white">
                          CYNBIT STUDIO
                        </div>
                        <div className="text-[10px] text-white/70 font-bold uppercase mt-0.5 tracking-wider">
                          CAREER INTELLIGENCE
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Revio */}
                  <Link 
                    to="/products"
                    className="bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4 transition-all duration-300 cursor-pointer hover:translate-x-1.5 border border-white/5 hover:border-white/25 block"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-[#ffedd5] text-[#9a3412] flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Sparkles className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-xs font-black uppercase tracking-wider text-white">
                          REVIO
                        </div>
                        <div className="text-[10px] text-white/70 font-bold uppercase mt-0.5 tracking-wider">
                          AI REVIEW ASSISTANT
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* TenantEase */}
                  <Link 
                    to="/products"
                    className="bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4 transition-all duration-300 cursor-pointer hover:translate-x-1.5 border border-white/5 hover:border-white/25 block"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-white text-[#004e52] font-black text-xs flex items-center justify-center flex-shrink-0 shadow-sm">
                        TE
                      </div>
                      <div>
                        <div className="text-xs font-black uppercase tracking-wider text-white">
                          TENANTEASE
                        </div>
                        <div className="text-[10px] text-white/70 font-bold uppercase mt-0.5 tracking-wider">
                          PROPERTY ECOSYSTEM
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Card: Human-centric impact (Screenshot 3) */}
          <div className="bg-[#eef2f3] rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 border border-outline-variant/15 shadow-sm hover:shadow-xl transition-all duration-300 grid lg:grid-cols-12 gap-8 items-center group">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Circular Icon */}
              <div className="w-14 h-14 rounded-full bg-[#9e6200] text-white flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <span className="material-symbols-outlined text-2xl">volunteer_activism</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-on-surface tracking-tight">
                  Human-centric impact
                </h3>
                <p className="text-sm md:text-base text-on-surface-variant font-medium mt-4 leading-relaxed max-w-2xl">
                  Beyond code, we invest in human potential. Through our partnership with <strong>Manav Seva Trust</strong>, we provide Computer and IT teaching to rural areas and government schools, bridging the digital divide wherever we can.
                </p>
              </div>

              <div>
                <Link 
                  to="/impact"
                  className="text-[#9e6200] hover:text-[#774e00] font-black text-xs uppercase tracking-widest inline-flex items-center gap-1.5 transition-all hover:translate-x-1 group/link"
                >
                  EXPLORE OUR MISSION 
                  <span className="text-base font-bold transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">↗</span>
                </Link>
              </div>
            </div>

            {/* Right Column: 2 White Side-by-Side Cards */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-outline-variant/15 flex-1 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <div className="text-xs font-black uppercase tracking-wider text-[#006067]">
                  BITELEVATE
                </div>
                <p className="text-xs text-on-surface-variant font-medium mt-2 leading-relaxed">
                  Technical literacy for the next generation of architects.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-outline-variant/15 flex-1 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
                <div className="text-xs font-black uppercase tracking-wider text-[#9e6200]">
                  MANAV SEVA
                </div>
                <p className="text-xs text-on-surface-variant font-medium mt-2 leading-relaxed">
                  Tech-enabled support for community growth and wellness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* BITELEVATE GLOWING DARK SECTION (Screenshot 4) */}
      {/* ======================================================== */}
      <section className="py-16 px-4 md:px-8 lg:px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto rounded-[3rem] bg-[#071520] text-white p-8 md:p-16 relative overflow-hidden shadow-2xl border border-cyan-900/30">
          {/* Concentric Glowing Radar Rings Effect */}
          <div className="absolute right-12 top-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-cyan-500/10 pointer-events-none animate-pulse-ring hidden lg:block"></div>
          <div className="absolute right-24 top-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-cyan-500/15 pointer-events-none hidden lg:block"></div>
          <div className="absolute right-36 top-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-cyan-500/20 pointer-events-none hidden lg:block"></div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
            {/* Left Details */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fed7aa]/10 text-[#fed7aa] border border-[#fed7aa]/20 font-bold text-xs uppercase tracking-widest shadow-sm">
                <span className="material-symbols-outlined text-sm">school</span>
                EMPOWERING CAREERS
              </div>

              {/* Title */}
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-headline font-black text-white tracking-tight">
                BitElevate.
              </h2>

              {/* Subtitle */}
              <p className="text-neutral-300 text-sm md:text-base font-medium max-w-xl leading-relaxed">
                A globally recognized training program designed to bridge the gap between academic learning and industry mastery. We prepare you for the high-demand world of modern architectural engineering.
              </p>

              {/* 2x2 Feature Points */}
              <div className="grid sm:grid-cols-2 gap-6 pt-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 flex items-center justify-center flex-shrink-0 shadow-inner">
                    <span className="material-symbols-outlined text-xl">verified</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Global Certification</h4>
                    <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                      Industry-standard credentials accepted by top firms worldwide.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 flex items-center justify-center flex-shrink-0 shadow-inner">
                    <span className="material-symbols-outlined text-xl">groups</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Expert Mentorship</h4>
                    <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                      Learn directly from senior architects and tech leaders.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 flex items-center justify-center flex-shrink-0 shadow-inner">
                    <span className="material-symbols-outlined text-xl">compass_calibration</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Industry Projects</h4>
                    <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                      Build real-world systems with professional-grade rigor.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 flex items-center justify-center flex-shrink-0 shadow-inner">
                    <span className="material-symbols-outlined text-xl">work</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Career Placement</h4>
                    <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                      Dedicated support to land roles in premium tech companies.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button & Numbers */}
              <div className="pt-6 flex flex-wrap items-center gap-6">
                <button
                  onClick={() => openModal('Enroll in BitElevate Program', 'bitelevate')}
                  className="bg-white text-neutral-900 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-neutral-100 transition-all shadow-xl hover:scale-105 active:scale-95"
                >
                  JOIN THE PROGRAM
                </button>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl md:text-3xl font-black font-headline text-white">
                    1000+
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    CERTIFIED <br/>ARCHITECTS
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Certificate Card with Floating Badges */}
            <div className="lg:col-span-5 relative py-8">
              <div className="relative mx-auto w-full max-w-sm">
                {/* Central Floating Certificate Card */}
                <div className="w-full bg-[#0a1f2e]/90 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-8 md:p-10 text-center shadow-[0_0_50px_rgba(6,182,212,0.18)] hover:border-cyan-400 hover:shadow-[0_0_60px_rgba(6,182,212,0.32)] transition-all duration-500 relative z-10 group/card">
                  <div className="w-16 h-16 rounded-full bg-white/10 text-white flex items-center justify-center mx-auto mb-4 border border-white/15 shadow-inner group-hover/card:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl text-cyan-300">workspace_premium</span>
                  </div>

                  <div className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan-400">
                    CERTIFIED
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold font-headline text-white mt-1">
                    Software Architect
                  </h3>

                  <div className="flex justify-center gap-1 text-cyan-400 text-lg mt-3">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                  </div>

                  <div className="w-full bg-cyan-950/60 rounded-full h-1 mt-6 overflow-hidden">
                    <div className="bg-gradient-to-r from-cyan-400 to-teal-300 h-1 rounded-full w-4/5 animate-pulse"></div>
                  </div>
                </div>

                {/* Top-Right Floating Pill Badge */}
                <div className="absolute -top-3 -right-2 md:top-2 md:-right-4 z-20 bg-[#071c28]/95 border border-cyan-500/40 rounded-2xl px-4 py-2.5 backdrop-blur-md shadow-2xl flex items-center gap-3 animate-float-slow">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] font-black uppercase tracking-widest text-cyan-400 block">
                      VERIFIED
                    </span>
                    <span className="text-xs font-bold text-white block">
                      Industry Ready
                    </span>
                  </div>
                </div>

                {/* Bottom-Left Floating Pill Badge */}
                <div className="absolute -bottom-3 -left-2 md:bottom-2 md:-left-4 z-20 bg-[#071c28]/95 border border-cyan-500/40 rounded-2xl px-4 py-2.5 backdrop-blur-md shadow-2xl flex items-center gap-3 animate-float-delay">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-sm text-cyan-400">query_stats</span>
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] font-black uppercase tracking-widest text-cyan-400 block">
                      COMPETENCY
                    </span>
                    <span className="text-xs font-bold text-white block">
                      Full-Stack Dev
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* THE SPEED OF A STARTUP. (Screenshot 5) */}
      {/* ======================================================== */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-headline font-black text-on-surface tracking-tight leading-[1.12]">
              The speed of a startup. <br/>
              The rigor of an enterprise.
            </h2>
            <p className="text-base sm:text-lg text-on-surface-variant font-medium leading-relaxed">
              We combine technical agility with structured execution to deliver outcomes that scale with your ambitions.
            </p>
          </div>

          {/* 4 Pastel Tinted Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#eff6f7] hover:bg-[#e4eff1] rounded-[2.5rem] p-8 md:p-10 border border-neutral-200/50 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 space-y-6 group cursor-default">
              <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center text-[#006067] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <span className="material-symbols-outlined text-2xl">bolt</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold font-headline text-on-surface group-hover:text-primary transition-colors">
                  Startup speed
                </h3>
                <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                  Rapid execution without bureaucracy.
                </p>
              </div>
            </div>

            <div className="bg-[#eff6f8] hover:bg-[#e2eff3] rounded-[2.5rem] p-8 md:p-10 border border-neutral-200/50 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 space-y-6 group cursor-default">
              <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center text-[#12629d] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <span className="material-symbols-outlined text-2xl">psychology</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold font-headline text-on-surface group-hover:text-secondary transition-colors">
                  AI-first thinking
                </h3>
                <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                  Systems designed with automation first.
                </p>
              </div>
            </div>

            <div className="bg-[#f4f5f1] hover:bg-[#eaece5] rounded-[2.5rem] p-8 md:p-10 border border-neutral-200/50 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 space-y-6 group cursor-default">
              <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center text-[#b47100] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <span className="material-symbols-outlined text-2xl">terminal</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold font-headline text-on-surface group-hover:text-tertiary transition-colors">
                  End-to-end dev
                </h3>
                <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                  Full ownership from design to deploy.
                </p>
              </div>
            </div>

            <div className="bg-[#f1f6f5] hover:bg-[#e3eeeb] rounded-[2.5rem] p-8 md:p-10 border border-neutral-200/50 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 space-y-6 group cursor-default">
              <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center text-[#047857] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <span className="material-symbols-outlined text-2xl">trending_up</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold font-headline text-on-surface group-hover:text-emerald-700 transition-colors">
                  ROI engineering
                </h3>
                <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                  We build for business outcomes and scale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. ARCHITECTURAL MASTERY ACROSS FOUR DOMAINS (Screenshot 1) */}
      {/* ======================================================== */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-[#0b1218] text-white">
        <div className="max-w-screen-2xl mx-auto space-y-16">
          {/* Section Header */}
          <div className="space-y-3">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-headline font-black text-white tracking-tight leading-tight">
              Architectural mastery across <br/>
              <span className="text-[#22d3ee] italic font-serif">
                four domains.
              </span>
            </h2>
          </div>

          {/* Grid Layout: 2x2 Domain Cards on Left + 2x2 Stats Cards on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 4 Domain Cards (lg:col-span-8) */}
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
              {/* Card 1: Software engineering */}
              <div className="bg-[#141d26] hover:bg-[#192430] border border-cyan-500/10 hover:border-cyan-500/40 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(34,211,238,0.12)] space-y-6 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl">bar_chart</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-headline text-white group-hover:text-cyan-300 transition-colors">
                    Software engineering
                  </h3>
                  <p className="text-sm text-neutral-400 font-medium mt-3 leading-relaxed">
                    Secure full-stack development and cloud migration foundations.
                  </p>
                </div>
              </div>

              {/* Card 2: Digital marketing & SEO */}
              <div className="bg-[#141d26] hover:bg-[#192430] border border-cyan-500/10 hover:border-cyan-500/40 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(34,211,238,0.12)] space-y-6 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl">campaign</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-headline text-white group-hover:text-cyan-300 transition-colors">
                    Digital marketing & SEO
                  </h3>
                  <p className="text-sm text-neutral-400 font-medium mt-3 leading-relaxed">
                    Data-driven ROI engines merging technical SEO with creative precision.
                  </p>
                </div>
              </div>

              {/* Card 3: AI automation */}
              <div className="bg-[#141d26] hover:bg-[#192430] border border-cyan-500/10 hover:border-cyan-500/40 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(34,211,238,0.12)] space-y-6 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl">psychology</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-headline text-white group-hover:text-cyan-300 transition-colors">
                    AI automation
                  </h3>
                  <p className="text-sm text-neutral-400 font-medium mt-3 leading-relaxed">
                    Custom LLMs, autonomous agents, and multi-step cognitive decision pipelines.
                  </p>
                </div>
              </div>

              {/* Card 4: Cloud infrastructure */}
              <div className="bg-[#141d26] hover:bg-[#192430] border border-cyan-500/10 hover:border-cyan-500/40 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(34,211,238,0.12)] space-y-6 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl">cloud</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-headline text-white group-hover:text-cyan-300 transition-colors">
                    Cloud infrastructure
                  </h3>
                  <p className="text-sm text-neutral-400 font-medium mt-3 leading-relaxed">
                    High-availability architectures, Kubernetes, microservices, and continuous scaling.
                  </p>
                </div>
              </div>
            </div>

            {/* Right 4 Glowing Stats Boxes (lg:col-span-4) */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-4">
              <div className="bg-[#141d26] rounded-3xl p-6 md:p-8 border border-cyan-500/15 text-center flex flex-col justify-center items-center hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] transition-all duration-300">
                <div className="text-4xl sm:text-5xl font-black font-headline text-[#22d3ee] tracking-tight">
                  98%
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 mt-2">
                  RETENTION
                </div>
              </div>

              <div className="bg-[#141d26] rounded-3xl p-6 md:p-8 border border-cyan-500/15 text-center flex flex-col justify-center items-center hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] transition-all duration-300">
                <div className="text-4xl sm:text-5xl font-black font-headline text-[#22d3ee] tracking-tight">
                  24/7
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 mt-2">
                  SUPPORT
                </div>
              </div>

              <div className="bg-[#141d26] rounded-3xl p-6 md:p-8 border border-cyan-500/15 text-center flex flex-col justify-center items-center hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] transition-all duration-300">
                <div className="text-4xl sm:text-5xl font-black font-headline text-[#22d3ee] tracking-tight">
                  3x
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 mt-2">
                  ROI UPLIFT
                </div>
              </div>

              <div className="bg-[#141d26] rounded-3xl p-6 md:p-8 border border-cyan-500/15 text-center flex flex-col justify-center items-center hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] transition-all duration-300">
                <div className="text-4xl sm:text-5xl font-black font-headline text-[#22d3ee] tracking-tight">
                  6+
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400 mt-2">
                  GLOBAL REACH
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. ARCHITECTURAL LIFECYCLE (Screenshot 2) */}
      {/* ======================================================== */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto space-y-16">
          {/* Header */}
          <div className="space-y-4 max-w-3xl">
            <div className="text-xs font-black uppercase tracking-[0.2em] text-[#006067]">
              ARCHITECTURAL LIFECYCLE
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-headline font-black text-on-surface tracking-tight">
              How we construct digital success.
            </h2>
            <p className="text-base sm:text-lg text-on-surface-variant font-medium leading-relaxed">
              Our process is a structured sequence of precision and empathy, designed to maximize scalability and minimize friction.
            </p>
          </div>

          {/* Grid Layout: 6 Steps on Left + Layered Visual Card on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 6 Numbered Steps (lg:col-span-7) */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-x-8 gap-y-10">
              {/* Step 01 */}
              <div className="space-y-2 group">
                <div className="text-2xl font-headline font-black text-neutral-300 group-hover:text-primary transition-colors">
                  01
                </div>
                <h4 className="text-xl font-bold font-headline text-on-surface group-hover:text-primary transition-colors">
                  Discovery & audit
                </h4>
                <p className="text-xs sm:text-sm text-on-surface-variant font-medium leading-relaxed">
                  We deep-dive into your existing workflows and technical debt to identify invisible friction points.
                </p>
              </div>

              {/* Step 02 */}
              <div className="space-y-2 group">
                <div className="text-2xl font-headline font-black text-neutral-300 group-hover:text-primary transition-colors">
                  02
                </div>
                <h4 className="text-xl font-bold font-headline text-on-surface group-hover:text-primary transition-colors">
                  Strategy & blueprinting
                </h4>
                <p className="text-xs sm:text-sm text-on-surface-variant font-medium leading-relaxed">
                  A custom architectural roadmap mapping the logic, AI integration, and scalability modules.
                </p>
              </div>

              {/* Step 03 */}
              <div className="space-y-2 group">
                <div className="text-2xl font-headline font-black text-neutral-300 group-hover:text-primary transition-colors">
                  03
                </div>
                <h4 className="text-xl font-bold font-headline text-on-surface group-hover:text-primary transition-colors">
                  High-fidelity design
                </h4>
                <p className="text-xs sm:text-sm text-on-surface-variant font-medium leading-relaxed">
                  Cinematic, user-centric systems designed to turn complex technical logic into seamless human experiences.
                </p>
              </div>

              {/* Step 04 */}
              <div className="space-y-2 group">
                <div className="text-2xl font-headline font-black text-neutral-300 group-hover:text-primary transition-colors">
                  04
                </div>
                <h4 className="text-xl font-bold font-headline text-on-surface group-hover:text-primary transition-colors">
                  Technical implementation
                </h4>
                <p className="text-xs sm:text-sm text-on-surface-variant font-medium leading-relaxed">
                  Deployment of robust technical engines and clean, resilient codebases built for enterprise stability.
                </p>
              </div>

              {/* Step 05 */}
              <div className="space-y-2 group">
                <div className="text-2xl font-headline font-black text-neutral-300 group-hover:text-primary transition-colors">
                  05
                </div>
                <h4 className="text-xl font-bold font-headline text-on-surface group-hover:text-primary transition-colors">
                  Quality & integrity check
                </h4>
                <p className="text-xs sm:text-sm text-on-surface-variant font-medium leading-relaxed">
                  Rigorous stress-testing, automated test suites, and security audits ensuring zero production surprises.
                </p>
              </div>

              {/* Step 06 */}
              <div className="space-y-2 group">
                <div className="text-2xl font-headline font-black text-neutral-300 group-hover:text-primary transition-colors">
                  06
                </div>
                <h4 className="text-xl font-bold font-headline text-on-surface group-hover:text-primary transition-colors">
                  Deployment & evolution
                </h4>
                <p className="text-xs sm:text-sm text-on-surface-variant font-medium leading-relaxed">
                  Live launch followed by continuous telemetry, automated scaling, and ROI performance tracking.
                </p>
              </div>
            </div>

            {/* Right Layered Visual Card Graphic (Screenshot 2) */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-neutral-200/80 shadow-2xl relative space-y-4">
                {/* Pill 1: STRATEGIC AUDIT */}
                <div className="bg-[#f0f4f4] rounded-2xl p-5 border border-neutral-200/50 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#006067] text-white font-bold text-xs flex items-center justify-center">
                      1
                    </span>
                    <span className="text-xs font-black uppercase tracking-wider text-[#006067]">
                      STRATEGIC AUDIT
                    </span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#006067] h-1.5 rounded-full w-2/3"></div>
                  </div>
                </div>

                {/* Pill 2: BLUEPRINT PHASE */}
                <div className="bg-[#f0f4f4] rounded-2xl p-5 border border-neutral-200/50 space-y-3 ml-4">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#12629d] text-white font-bold text-xs flex items-center justify-center">
                      2
                    </span>
                    <span className="text-xs font-black uppercase tracking-wider text-[#12629d]">
                      BLUEPRINT PHASE
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-2 rounded-full bg-[#12629d]/40"></span>
                    <span className="w-8 h-2 rounded-full bg-[#12629d]/40"></span>
                    <span className="w-5 h-2 rounded-full bg-[#12629d]/70"></span>
                  </div>
                </div>

                {/* Pill 3: EXECUTION Deep Teal Card */}
                <div className="bg-[#004e52] text-white rounded-3xl p-6 md:p-8 shadow-xl space-y-4 mt-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-2xl font-black font-headline tracking-wider italic">
                      EXECUTION
                    </h4>
                    <div className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center border border-white/20">
                      <CheckCircle2 className="w-5 h-5 text-teal-300" />
                    </div>
                  </div>

                  <div className="w-full bg-white/20 rounded-full h-1 mt-2">
                    <div className="bg-white h-1 rounded-full w-full"></div>
                  </div>

                  <div className="text-[10px] font-black uppercase tracking-widest text-teal-200">
                    SYSTEM STABILITY: 99.9%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* PARTNER MARQUEE */}
      {/* ======================================================== */}
      <section className="py-16 px-4 md:px-8 border-b border-outline-variant/10 bg-white overflow-hidden">
        <div className="max-w-screen-2xl mx-auto">
          <p className="text-center text-xs font-black uppercase tracking-[0.25em] text-on-surface-variant/60 mb-8">
            Architecting success for visionary brands & enterprises
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
            {partnerLogos.map((partner, index) => (
              <div 
                key={index}
                className="px-6 py-3 rounded-2xl bg-surface-container/60 border border-outline-variant/10 text-on-surface-variant font-bold text-sm md:text-base hover:text-primary hover:border-primary/30 transition-all cursor-default"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* BOTTOM CTA */}
      {/* ======================================================== */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-surface text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-headline font-black text-on-surface tracking-tight leading-tight">
            Ready to build your digital future?
          </h2>
          <p className="text-base md:text-xl text-on-surface-variant font-medium max-w-2xl mx-auto leading-relaxed">
            Let's discuss how our AI automation and custom software development expertise can transform your business vision into a reality.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button
              onClick={() => openModal('Start Discovery Phase', 'general')}
              className="bg-primary text-on-primary px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-xl hover:bg-primary-container hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-3"
            >
              Start discovery phase
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/case-studies"
              className="px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-on-surface transition-all hover:-translate-y-0.5"
            >
              View our work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
