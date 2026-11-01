import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Globe2, 
  ChevronDown 
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    industry: 'SaaS & Enterprise Tech',
    service: 'Autonomous AI Agents',
    budget: '$15k - $50k',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: "How can I start a project with Cynbit?",
      a: "You can start by submitting your project scope via the form on this page or reaching out directly at opportunities@cynbit.in. We schedule an initial 30-minute discovery call within 24 hours to review your requirements, technical stack, and architectural goals."
    },
    {
      q: "What is the typical turnaround for an initial architecture audit?",
      a: "Following the initial discovery session, our lead architects prepare a comprehensive architecture blueprint and proposal within 3 to 5 business days."
    },
    {
      q: "Can Cynbit collaborate with our existing in-house engineers?",
      a: "Absolutely. We routinely operate as an architectural extension of existing technical teams, handling complex AI agent integrations, cloud migrations, or dedicated sprint deliverables."
    },
    {
      q: "Does Cynbit sign Non-Disclosure Agreements (NDAs)?",
      a: "Yes. Intellectual property protection and strict confidentiality are foundational to our engineering practice. We provide mutual NDAs before reviewing sensitive business data or proprietary codebases."
    }
  ];

  return (
    <div className="bg-surface text-left overflow-hidden">
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-16 px-4 md:px-8 lg:px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">hub</span>
            Inquiry Hub
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-black text-on-surface tracking-tight leading-tight">
            Start Your Next Project With Us
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant font-medium leading-relaxed">
            Whether you’re building a product, automating operations, or scaling digitally, our architects are ready to design the solution that scales with your ambition.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-4">
            <div className="p-4 bg-surface-container rounded-2xl border border-outline-variant/15 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                24H
              </div>
              <div>
                <strong className="text-sm text-on-surface">Guaranteed Turnaround:</strong>
                <p className="text-xs text-on-surface-variant">Our engineering architects respond within 24 business hours.</p>
              </div>
            </div>
            <div className="p-4 bg-surface-container rounded-2xl border border-outline-variant/15 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center font-bold">
                GL
              </div>
              <div>
                <strong className="text-sm text-on-surface">Global Delivery:</strong>
                <p className="text-xs text-on-surface-variant">Serving enterprise clients across India, North America, and Europe.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Form & Contact Info */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-surface-container-low border-y border-outline-variant/10">
        <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-12 gap-12">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[2.5rem] border border-outline-variant/15 shadow-xl space-y-8">
            <div className="space-y-2">
              <div className="text-xs font-black uppercase tracking-widest text-primary">Project Intelligence</div>
              <h2 className="text-2xl md:text-4xl font-headline font-black text-on-surface">
                The Blueprint.
              </h2>
              <p className="text-xs md:text-sm text-on-surface-variant font-medium">
                Tell us what you’re building. Our team will analyze your requirements and prepare a tailored strategic overview before we connect.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold font-headline text-on-surface">Blueprint Submitted Successfully!</h3>
                <p className="text-sm text-on-surface-variant max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Our core engineering architects in Jaipur will review your specifications and contact you at <strong>{formData.email}</strong> within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        industry: 'SaaS & Enterprise Tech',
                        service: 'Autonomous AI Agents',
                        budget: '$15k - $50k',
                        message: ''
                      });
                    }}
                    className="bg-primary text-on-primary px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-primary-container transition-all"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Alexander Graham"
                      className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alexander@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Acme Innovations"
                      className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                      Industry Domain
                    </label>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface text-sm focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="SaaS & Enterprise Tech">SaaS & Enterprise Tech</option>
                      <option value="Healthcare & HealthTech">Healthcare & HealthTech</option>
                      <option value="Fintech & Banking">Fintech & Banking</option>
                      <option value="EdTech & Academia">EdTech & Academia</option>
                      <option value="Logistics & Supply Chain">Logistics & Supply Chain</option>
                      <option value="Retail & Headless eCommerce">Retail & Headless eCommerce</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                      Service Requirement
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface text-sm focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="Autonomous AI Agents">Autonomous AI Agents</option>
                      <option value="Full-Stack Custom Development">Full-Stack Custom Development</option>
                      <option value="Cloud Architecture & Migration">Cloud Architecture & Migration</option>
                      <option value="Technical SEO & Performance Ads">Technical SEO & Performance Ads</option>
                      <option value="Proprietary SaaS Licensing">Proprietary SaaS Licensing (Studio / TenantEase / Revio)</option>
                      <option value="BitElevate University Partnership">BitElevate University Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                      Estimated Budget Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface text-sm focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="< $10k (&lt; ₹8 Lakhs)">&lt; $10k (&lt; ₹8 Lakhs)</option>
                      <option value="$10k - $25k (₹8L - ₹20L)">$10k - $25k (₹8L - ₹20L)</option>
                      <option value="$25k - $50k (₹20L - ₹40L)">$25k - $50k (₹20L - ₹40L)</option>
                      <option value="$50k+ (₹40 Lakhs+)">$50k+ (₹40 Lakhs+)</option>
                      <option value="Educational / Internship Enrollment">Educational / Internship Enrollment</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                    Project Goals & Scope
                  </label>
                  <textarea
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your current bottlenecks, target timeline, key technical constraints, or architectural vision..."
                    className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-on-surface-variant/70">
                    🔒 Protected under mutual NDA guidelines
                  </span>
                  <button
                    type="submit"
                    className="bg-primary text-on-primary px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest shadow-xl hover:bg-primary-container transition-all flex items-center gap-2"
                  >
                    Transmit Blueprint
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right: Office & Direct Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            {/* Headquarters Card */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-outline-variant/15 shadow-sm space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <img src="/icons/location.svg" alt="Location" className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-widest text-primary">Headquarters</div>
                  <h3 className="text-xl font-bold font-headline text-on-surface">Jaipur Delivery Hub</h3>
                </div>
              </div>

              <div className="text-sm text-on-surface-variant font-medium leading-relaxed pl-16">
                <p className="font-bold text-on-surface">Cynbit Technologies Private Limited</p>
                <p>32/115 Pratap Nagar, Sanganer</p>
                <p>Jaipur, Rajasthan, 302033, India</p>
                <p className="text-xs text-on-surface-variant/70 mt-1">CIN: U62011RJ2024PTC093652</p>
              </div>
            </div>

            {/* Direct Communication Channels */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-outline-variant/15 shadow-sm space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-widest text-secondary">Electronic Mail</div>
                  <h3 className="text-xl font-bold font-headline text-on-surface">Direct Inquiries</h3>
                </div>
              </div>

              <div className="text-sm font-medium space-y-3 pl-16">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">General & Enterprise:</div>
                  <a href="mailto:opportunities@cynbit.in" className="text-base font-bold text-primary hover:underline">
                    opportunities@cynbit.in
                  </a>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Student & Technical Support:</div>
                  <a href="mailto:support@cynbit.in" className="text-base font-bold text-secondary hover:underline">
                    support@cynbit.in
                  </a>
                </div>
              </div>
            </div>

            {/* Telephone Card */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-outline-variant/15 shadow-sm space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-tertiary/10 text-tertiary flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-widest text-tertiary">Voice Lines</div>
                  <h3 className="text-xl font-bold font-headline text-on-surface">Direct Dispatch</h3>
                </div>
              </div>

              <div className="text-sm font-medium space-y-2 pl-16">
                <div>
                  <a href="tel:+918947962667" className="text-base font-bold text-on-surface hover:text-primary transition-colors">
                    +91 89479 62667
                  </a>
                </div>
                <div>
                  <a href="tel:+917891209777" className="text-base font-bold text-on-surface hover:text-primary transition-colors">
                    +91 78912 09777
                  </a>
                </div>
                <div>
                  <a href="tel:+918302337367" className="text-base font-bold text-on-surface hover:text-primary transition-colors">
                    +91 83023 37367
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Inquiries FAQ */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto max-w-3xl space-y-12">
          <div className="text-center space-y-3">
            <div className="text-xs font-black uppercase tracking-widest text-primary">Technical FAQ</div>
            <h2 className="text-3xl md:text-5xl font-headline font-black text-on-surface tracking-tight">
              Common Inquiries.
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-surface-container rounded-2xl border border-outline-variant/15 overflow-hidden transition-all"
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
    </div>
  );
}

