import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { ArrowRight, Briefcase, CheckCircle2, Filter, MapPin, Clock } from 'lucide-react';

export default function Careers() {
  const { openModal } = useModal();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);

  const categories = ['All', 'Engineering & QA', 'Marketing & Growth', 'Operations & Talent'];

  const jobs = [
    {
      id: 'hr-intern',
      title: 'HR & Talent Acquisition Intern',
      category: 'Operations & Talent',
      location: 'Remote / Jaipur',
      type: 'Internship (3-6 Months)',
      description: 'Help us architect the core team at Cynbit. Source top engineering talent, coordinate interviews with technical architects, and enhance our developer-friendly onboarding experience.',
      requirements: [
        'Enthusiastic about tech hiring and team culture',
        'Strong communication and coordination skills',
        'Familiarity with LinkedIn Recruiter and modern hiring platforms'
      ]
    },
    {
      id: 'bizdev-intern',
      title: 'Business Development Intern',
      category: 'Operations & Talent',
      location: 'Remote / Jaipur',
      type: 'Internship (3-6 Months)',
      description: 'Identify enterprise client opportunities for custom AI automation, software engineering, and SaaS platforms. Build relationships with global founders.',
      requirements: [
        'High-agency proactive mindset',
        'Understanding of modern B2B software solutions',
        'Excellent written outreach and discovery presentation skills'
      ]
    },
    {
      id: 'campus-ambassador',
      title: 'Campus Ambassador / Campus Relations Intern',
      category: 'Marketing & Growth',
      location: 'Pan-India / Remote',
      type: 'Internship',
      description: 'Represent BitElevate across engineering colleges and technical universities. Coordinate hackathons, student workshops, and technical seminars.',
      requirements: [
        'Active leader in college tech clubs or student communities',
        'Passionate about practical developer education over rote learning',
        'Strong peer networking and organizational skills'
      ]
    },
    {
      id: 'social-media-intern',
      title: 'Social Media & Brand Intern',
      category: 'Marketing & Growth',
      location: 'Remote',
      type: 'Internship (3-6 Months)',
      description: 'Craft high-signal technical content, engineer visual carousels, and elevate Cynbit and BitElevate across LinkedIn, Twitter/X, and Instagram.',
      requirements: [
        'Deep understanding of tech aesthetics and developer tone of voice',
        'Experience with Canva, Figma, or Adobe Suite',
        'Consistent storytelling and community engagement'
      ]
    },
    {
      id: 'content-marketing-intern',
      title: 'Content Marketing Intern',
      category: 'Marketing & Growth',
      location: 'Remote',
      type: 'Internship (3-6 Months)',
      description: 'Write deep-dive technical articles, case study breakdowns, and research briefings on AI automation, web engineering, and enterprise workflows.',
      requirements: [
        'Ability to break down complex technical concepts clearly',
        'Strong research skills and grasp of SEO best practices',
        'Portfolio of technical or analytical writing'
      ]
    },
    {
      id: 'growth-marketing-intern',
      title: 'Growth Marketing Intern',
      category: 'Marketing & Growth',
      location: 'Remote',
      type: 'Internship (3-6 Months)',
      description: 'Design growth funnels, run experiments on user acquisition for SaaS platforms (TenantEase, Cynbit Studio), and optimize digital conversion loops.',
      requirements: [
        'Data-driven mindset with Google Analytics / Meta Ads understanding',
        'Experiment-driven approach to CAC and LTV optimization',
        'A/B testing and landing page iteration experience'
      ]
    },
    {
      id: 'digital-marketing-intern',
      title: 'Digital Marketing Intern',
      category: 'Marketing & Growth',
      location: 'Remote',
      type: 'Internship (3-6 Months)',
      description: 'Execute multi-channel digital campaigns, coordinate search engine optimization audits, and support CRM marketing automation workflows.',
      requirements: [
        'Knowledge of SEO tools (Ahrefs/Semrush/Search Console)',
        'Understanding of email automation workflows and retargeting',
        'Analytical problem-solving abilities'
      ]
    },
    {
      id: 'qa-testing-intern',
      title: 'QA Testing Intern',
      category: 'Engineering & QA',
      location: 'Remote / Jaipur',
      type: 'Internship (3-6 Months)',
      description: 'Ensure rock-solid stability and zero regression across Cynbit client software and SaaS apps. Write automated test scripts and validate API endpoints.',
      requirements: [
        'Understanding of manual and automated testing principles',
        'Familiarity with Postman, Jest, Cypress, or Playwright',
        'Sharp attention to detail and edge-case discovery'
      ]
    }
  ];

  const filteredJobs = activeCategory === 'All' 
    ? jobs 
    : jobs.filter(j => j.category === activeCategory);

  return (
    <div className="bg-surface text-left overflow-hidden">
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-20 px-4 md:px-8 lg:px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">engineering</span>
            Cynbit careers
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-black text-on-surface tracking-tight leading-tight">
            Explore the opportunities at Cynbit
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant font-medium leading-relaxed">
            At Cynbit, we don't just solve problems; we architect human-centric software solutions. We're looking for thinkers who value growth, technical discipline, and high-impact execution.
          </p>
        </div>
      </section>

      {/* Why Build with Us */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-surface-container-low border-y border-outline-variant/10">
        <div className="max-w-screen-2xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="text-xs font-black uppercase tracking-widest text-primary">The Cynbit Advantage</div>
            <h2 className="text-3xl md:text-5xl font-headline font-black text-on-surface tracking-tight">
              Why build with us?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-outline-variant/15 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">school</span>
              </div>
              <h3 className="text-xl font-bold font-headline text-on-surface">Continuous tech learning.</h3>
              <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                Beyond compensation, we provide an ecosystem where potential is nurtured. Direct mentorship from core architects and exposure to enterprise-grade code.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-outline-variant/15 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">all_inclusive</span>
              </div>
              <h3 className="text-xl font-bold font-headline text-on-surface">Radical flexibility.</h3>
              <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                We judge outcomes, not chair time. Remote-first workflows designed around deep work and asynchronous efficiency rather than meeting fatigue.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-outline-variant/15 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-tertiary/10 text-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">rocket_launch</span>
              </div>
              <h3 className="text-xl font-bold font-headline text-on-surface">High-impact ownership.</h3>
              <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                You won't be pushed into a silo. You'll contribute directly to shipping production code, architectural design, and strategic client deployments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Operating Model */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto space-y-12">
          <div className="space-y-3">
            <div className="text-xs font-black uppercase tracking-widest text-primary">The Methodology</div>
            <h2 className="text-3xl md:text-5xl font-headline font-black text-on-surface tracking-tight">
              Our operating model.
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-surface-container border border-outline-variant/15 space-y-2">
              <span className="text-primary font-mono font-bold text-sm">01</span>
              <h4 className="text-lg font-bold font-headline text-on-surface">Doc-Led Culture</h4>
              <p className="text-xs md:text-sm text-on-surface-variant font-medium leading-relaxed">
                Clear documentation over endless meetings. RFCs and specs before writing code ensure alignment.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-surface-container border border-outline-variant/15 space-y-2">
              <span className="text-secondary font-mono font-bold text-sm">02</span>
              <h4 className="text-lg font-bold font-headline text-on-surface">Zero Bureaucracy</h4>
              <p className="text-xs md:text-sm text-on-surface-variant font-medium leading-relaxed">
                Flat structure with direct access to founders and lead architects. Decisions made in hours, not months.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-surface-container border border-outline-variant/15 space-y-2">
              <span className="text-tertiary font-mono font-bold text-sm">03</span>
              <h4 className="text-lg font-bold font-headline text-on-surface">Engineering Rigor</h4>
              <p className="text-xs md:text-sm text-on-surface-variant font-medium leading-relaxed">
                High standards for PR reviews, type safety, test suites, and resilient system boundaries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Openings Section */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-surface-container-low border-t border-outline-variant/10">
        <div className="max-w-screen-2xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-3">
              <div className="text-xs font-black uppercase tracking-widest text-primary">Open Positions</div>
              <h2 className="text-3xl md:text-5xl font-headline font-black text-on-surface tracking-tight">
                Internship & Core Openings
              </h2>
              <p className="text-on-surface-variant text-sm md:text-base font-medium">
                Nurturing the next generation of technical and strategic architects.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    activeCategory === cat
                      ? 'bg-primary text-on-primary shadow-md'
                      : 'bg-white border border-outline-variant/30 text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Job Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <div 
                key={job.id}
                className="bg-white rounded-3xl p-8 border border-outline-variant/15 shadow-sm hover:shadow-lg transition-all space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider">
                      {job.category}
                    </span>
                    <span className="text-xs text-on-surface-variant font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {job.type}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-bold font-headline text-on-surface">
                      {job.title}
                    </h3>
                    <div className="text-xs text-on-surface-variant font-medium mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-primary" /> {job.location}
                    </div>
                  </div>

                  <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                    {job.description}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                      Requirements:
                    </div>
                    {job.requirements.map((req, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-on-surface-variant">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-outline-variant/10 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-on-surface-variant/70">
                    Apply directly
                  </span>
                  <button
                    onClick={() => openModal(`Apply for ${job.title}`, 'career')}
                    className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-wider hover:bg-primary-container transition-all flex items-center gap-2"
                  >
                    View & Apply
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spontaneous Application */}
      <section className="py-20 px-4 md:px-8 bg-surface text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-headline font-black text-on-surface tracking-tight">
            Don't see your role?
          </h2>
          <p className="text-on-surface-variant text-base font-medium">
            We're always looking for architects of the future. Send us your portfolio and tell us how you can contribute to the Cynbit software vision.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button 
              onClick={() => openModal('Submit Open Application / Portfolio', 'career')}
              className="bg-primary text-on-primary px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest shadow-lg hover:bg-primary-container transition-all flex items-center gap-2"
            >
              Drop a portfolio <ArrowRight className="w-4 h-4" />
            </button>
            <Link 
              to="/story" 
              className="px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest bg-white border border-outline-variant/30 text-on-surface hover:bg-surface-container transition-all"
            >
              Our backstory
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

