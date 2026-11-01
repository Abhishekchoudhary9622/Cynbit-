import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { 
  ArrowRight, 
  CheckCircle2, 
  GitPullRequest, 
  Code2, 
  Sparkles, 
  Star, 
  ShieldCheck, 
  Terminal,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

export default function BitElevate() {
  const { openModal } = useModal();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const universities = [
    "SKIT Jaipur", "JECRC Foundation", "Poornima University", 
    "Manipal University", "Amity University", "Arya College"
  ];

  const faqs = [
    {
      q: "How does the 100% remote workflow work?",
      a: "Upon enrollment, you receive direct login credentials to your private BitElevate Workbench. You are assigned a dedicated production-grade GitHub repository with structured tasks, test suites, and milestone requirements. You push daily PRs which are automatically analyzed by our CI/CD pipeline and reviewed by lead architects."
    },
    {
      q: "Can I use this for college internship credits and NOC approval?",
      a: "Yes! BitElevate is officially recognized for university internship credits. We provide verified offer letters, mid-term progress reports, and official completion certificates with verified digital verification hashes."
    },
    {
      q: "What if I have semester exams during the 60-day period?",
      a: "We offer an exam pause feature. You can pause your internship timeline for up to 21 days during your university exams without forfeiting your progress or mentor support."
    },
    {
      q: "How is this different from typical online bootcamps or tutorial courses?",
      a: "Tutorials teach you to copy syntax. BitElevate simulates a real engineering team. You build actual production features, write automated unit tests, resolve merge conflicts, and defend your architectural choices during code reviews."
    },
    {
      q: "What is included in the ₹3,999 one-time enrollment?",
      a: "The ₹3,999 enrollment fee covers the entire 60-day curriculum: private repository provisioning, daily automated code analysis, weekly live mentor office hours, real pull-request reviews, project hosting credentials, and your permanent verified engineering certificate."
    }
  ];

  const testimonials = [
    {
      name: "Rohan Sharma",
      college: "SKIT Jaipur",
      role: "Full-Stack Engineer at Tech Mahindra",
      quote: "BitElevate completely replaced the fluff. Having a 60-day commit history with 40+ merged pull requests on my GitHub was the exact reason I aced my technical interviews.",
      rating: 5
    },
    {
      name: "Pooja Verma",
      college: "JECRC University",
      role: "Backend Developer at Razorpay",
      quote: "The automated PR feedback and code reviews from real engineers taught me clean architecture and git hygiene that college courses never even mentioned.",
      rating: 5
    },
    {
      name: "Ananya Mehta",
      college: "Poornima College of Engineering",
      role: "Cloud Associate at AWS Partner",
      quote: "I deployed real microservices, configured Docker containers, and set up CI/CD pipelines. It felt like working at an actual engineering startup from day one.",
      rating: 5
    }
  ];

  return (
    <div className="bg-surface text-left overflow-hidden">
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-20 px-4 md:px-8 lg:px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">school</span>
            BitElevate • Remote Engineering Program
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-black text-on-surface tracking-tight leading-[1.08]">
            Stop Watching Tutorials. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Start Doing the Work.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant font-medium leading-relaxed">
            The remote software development internship and technical mastery ecosystem. Ship a pull request a day to production repos, get reviewed by real architects, and build a verified engineering legacy.
          </p>

          <div className="pt-4 flex flex-wrap gap-4 items-center">
            <button
              onClick={() => openModal('Enroll in BitElevate 60-Day Track', 'bitelevate')}
              className="bg-primary text-on-primary px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-xl hover:bg-primary-container transition-all flex items-center gap-3"
            >
              Enroll in BitElevate
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/bitelevate/paths"
              className="px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-on-surface transition-all"
            >
              Explore 16+ Paths
            </Link>
          </div>

          {/* Social Proof Badges */}
          <div className="pt-8 border-t border-outline-variant/10">
            <p className="text-xs font-black uppercase tracking-wider text-on-surface-variant/70 mb-4">
              Trusted by Engineers from Top Universities:
            </p>
            <div className="flex flex-wrap gap-3">
              {universities.map((uni, i) => (
                <span key={i} className="px-3.5 py-1.5 rounded-xl bg-white border border-outline-variant/15 text-xs font-bold text-on-surface">
                  {uni}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Real-World Difference */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-surface-container-low border-y border-outline-variant/10">
        <div className="max-w-screen-2xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="text-xs font-black uppercase tracking-widest text-primary">The Real-World Difference</div>
            <h2 className="text-3xl md:text-5xl font-headline font-black text-on-surface tracking-tight">
              Why it is different
            </h2>
            <p className="text-sm md:text-base text-on-surface-variant font-medium">
              Tutorials teach you to follow. Engineering asks you to ship.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Box 1 */}
            <div className="bg-white p-8 rounded-3xl border border-outline-variant/15 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">play_circle</span>
              </div>
              <h3 className="text-xl font-bold font-headline text-on-surface">Recorded courses</h3>
              <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                You watch someone else code. There is no repository of your own, no peer code review, and nothing substantive that a hiring manager cares about.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-white p-8 rounded-3xl border border-outline-variant/15 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">workspace_premium</span>
              </div>
              <h3 className="text-xl font-bold font-headline text-on-surface">Certificate-only internships</h3>
              <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                Superficial tasks, no real git version control, and generic certificates of completion that get overlooked by serious tech recruiters.
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-white p-8 rounded-3xl border-2 border-primary shadow-xl space-y-4 relative">
              <div className="absolute top-4 right-4 text-[10px] bg-primary text-on-primary font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                The Gold Standard
              </div>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">verified</span>
              </div>
              <h3 className="text-xl font-bold font-headline text-primary">BitElevate</h3>
              <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                Daily pull requests on real software repos, test coverage verification, architect reviews, git commit proof, and placement advancement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Onboarding Flow: How it works */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="text-xs font-black uppercase tracking-widest text-primary">The Onboarding Flow</div>
            <h2 className="text-3xl md:text-5xl font-headline font-black text-on-surface tracking-tight">
              How it works
            </h2>
            <p className="text-sm md:text-base text-on-surface-variant font-medium">
              Four steps from sign-up to verified industry readiness.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 rounded-3xl bg-surface-container border border-outline-variant/15 space-y-3">
              <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">Step 01</span>
              <h4 className="text-xl font-bold font-headline text-on-surface">Pick a lab</h4>
              <p className="text-xs md:text-sm text-on-surface-variant font-medium leading-relaxed">
                Choose one of our specialized tracks: Full Stack Web, AI Automation, Machine Learning, DevOps, Cloud, or UI/UX.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-surface-container border border-outline-variant/15 space-y-3">
              <span className="text-xs font-mono font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-full">Step 02</span>
              <h4 className="text-xl font-bold font-headline text-on-surface">Get your repo</h4>
              <p className="text-xs md:text-sm text-on-surface-variant font-medium leading-relaxed">
                Instant private workbench credentials and your custom GitHub repository initialized with production CI/CD tests.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-surface-container border border-outline-variant/15 space-y-3">
              <span className="text-xs font-mono font-bold text-tertiary bg-tertiary/10 px-3 py-1 rounded-full">Step 03</span>
              <h4 className="text-xl font-bold font-headline text-on-surface">Ship a PR a day</h4>
              <p className="text-xs md:text-sm text-on-surface-variant font-medium leading-relaxed">
                Build real features, write automated unit tests, and resolve issues following real Agile sprint guidelines.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-surface-container border border-outline-variant/15 space-y-3">
              <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full">Step 04</span>
              <h4 className="text-xl font-bold font-headline text-on-surface">Get certified</h4>
              <p className="text-xs md:text-sm text-on-surface-variant font-medium leading-relaxed">
                Code reviews by senior system architects, automated feedback scorecards, and a verified global certification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Investment Card */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-surface-container-low border-y border-outline-variant/10">
        <div className="max-w-screen-2xl mx-auto max-w-4xl">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-14 border border-outline-variant/15 shadow-xl grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                Transparent Program Investment
              </div>
              <h3 className="text-3xl md:text-4xl font-headline font-black text-on-surface">
                One Honest Fee. <br/>Instant Remote Enrollment.
              </h3>
              <p className="text-sm md:text-base text-on-surface-variant font-medium leading-relaxed">
                No hidden costs, no recurring subscriptions, and zero fluff. All-inclusive enrollment covering all 60 days with automated repository provisioning, senior mentor reviews, and verified credentials.
              </p>
              <ul className="space-y-2 text-xs md:text-sm text-on-surface-variant font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" /> Dedicated production repository with automated CI/CD
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" /> Daily pull request review feedback by architects
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" /> Official university internship credit documentation & NOC
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" /> 21-day exam pause safeguard
                </li>
              </ul>
            </div>

            <div className="md:col-span-5 bg-surface-container p-8 rounded-3xl border border-outline-variant/20 text-center space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">All-Inclusive Tuition</span>
                <div className="text-4xl md:text-5xl font-black font-headline text-on-surface mt-1">₹3,999</div>
                <span className="text-xs text-on-surface-variant/70 font-semibold">One-time payment • 60 Days</span>
              </div>
              <button
                onClick={() => openModal('BitElevate Direct Enrollment - ₹3,999', 'bitelevate')}
                className="w-full bg-primary text-on-primary py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-lg hover:bg-primary-container transition-all flex items-center justify-center gap-2"
              >
                Enroll Now
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-on-surface-variant/70">
                🔒 Instant repo provisioning upon registration
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="text-xs font-black uppercase tracking-widest text-primary">Voices of Real Engineers</div>
            <h2 className="text-3xl md:text-5xl font-headline font-black text-on-surface tracking-tight">
              Real Code. Real Mentors. Real Outcomes.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-8 bg-surface-container rounded-3xl border border-outline-variant/15 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex gap-1 text-amber-500">
                    {"★".repeat(t.rating)}
                  </div>
                  <p className="text-sm text-on-surface-variant font-medium leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>
                <div className="pt-4 border-t border-outline-variant/10">
                  <h5 className="font-bold text-on-surface font-headline">{t.name}</h5>
                  <div className="text-xs text-primary font-semibold">{t.role}</div>
                  <div className="text-[11px] text-on-surface-variant/70">{t.college}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-surface-container-low border-t border-outline-variant/10">
        <div className="max-w-screen-2xl mx-auto max-w-3xl space-y-12">
          <div className="text-center space-y-3">
            <div className="text-xs font-black uppercase tracking-widest text-primary">Questions & Answers</div>
            <h2 className="text-3xl md:text-5xl font-headline font-black text-on-surface tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-outline-variant/15 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-on-surface hover:text-primary transition-colors"
                >
                  <span className="text-base md:text-lg font-headline">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-primary' : 'text-on-surface-variant'}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 text-sm text-on-surface-variant font-medium leading-relaxed border-t border-outline-variant/10 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 md:px-8 bg-surface text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-headline font-black text-on-surface tracking-tight">
            Ready to build real software?
          </h2>
          <p className="text-on-surface-variant text-base font-medium">
            Join 1,000+ engineers from top Indian technical universities who transformed their portfolios.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button 
              onClick={() => openModal('Enroll in BitElevate 60-Day Track', 'bitelevate')}
              className="bg-primary text-on-primary px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest shadow-lg hover:bg-primary-container transition-all flex items-center gap-2"
            >
              Enroll in BitElevate <ArrowRight className="w-4 h-4" />
            </button>
            <Link 
              to="/bitelevate/paths" 
              className="px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest bg-white border border-outline-variant/30 text-on-surface hover:bg-surface-container transition-all"
            >
              Explore 16+ Paths
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

