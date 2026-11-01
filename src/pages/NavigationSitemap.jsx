import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight } from 'lucide-react';

export default function NavigationSitemap() {
  const sections = [
    {
      title: "Company",
      links: [
        { label: "Home", path: "/", desc: "Main landing hub & architecture overview" },
        { label: "Our Story", path: "/story", desc: "The vision and timeline behind Cynbit" },
        { label: "Our Team", path: "/team", desc: "Board of digital architects & leadership" },
        { label: "Careers", path: "/careers", desc: "Openings, culture, and high-impact roles" },
        { label: "Social Impact", path: "/impact", desc: "Manav Seva Trust alliance & community initiatives" }
      ]
    },
    {
      title: "Expertise & Products",
      links: [
        { label: "Services Hub", path: "/services", desc: "AI Automation, Full-Stack, and Cloud" },
        { label: "Product Suite", path: "/products", desc: "Cynbit Studio, TenantEase, and Revio" },
        { label: "Case Studies", path: "/case-studies", desc: "Real-world engineering case studies" }
      ]
    },
    {
      title: "BitElevate Academy",
      links: [
        { label: "The Ecosystem", path: "/bitelevate", desc: "60-day remote software internship program" },
        { label: "Learning Paths", path: "/bitelevate/paths", desc: "16+ core technical learning dimensions" },
        { label: "Student Diaries", path: "/diaries", desc: "Real stories and student engineering journeys" }
      ]
    },
    {
      title: "Resources & Legal",
      links: [
        { label: "Blog & Insights", path: "/blog", desc: "Technical research and industry deep-dives" },
        { label: "Featured Post", path: "/blog/ai-agents-business-operations", desc: "Autonomous AI Agents in 2026" },
        { label: "Contact Us", path: "/contact", desc: "Blueprint submission & Jaipur office dispatch" },
        { label: "Privacy Policy", path: "/privacy", desc: "Data protection and sovereignty standards" },
        { label: "Terms of Service", path: "/terms", desc: "Platform terms and program policies" },
        { label: "Cookie Policy", path: "/cookies", desc: "Cookie governance & browser preferences" }
      ]
    }
  ];

  return (
    <div className="bg-surface text-left overflow-hidden">
      <section className="pt-24 md:pt-32 pb-20 px-4 md:px-8 lg:px-12 bg-surface">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">map</span>
            Index of Architecture
          </div>
          <h1 className="text-4xl md:text-6xl font-headline font-black text-on-surface tracking-tight">
            Navigation Sitemap
          </h1>
          <p className="text-base md:text-lg text-on-surface-variant font-medium leading-relaxed">
            Direct index to all platforms, engineering tracks, documentation, and initiatives across the Cynbit ecosystem.
          </p>
        </div>
      </section>

      <section className="pb-24 px-4 md:px-8 lg:px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto max-w-5xl grid md:grid-cols-2 gap-8">
          {sections.map((sec, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-outline-variant/15 shadow-sm space-y-6">
              <h3 className="text-xl font-bold font-headline text-primary border-b border-outline-variant/10 pb-3">
                {sec.title}
              </h3>
              <div className="space-y-4">
                {sec.links.map((link, i) => (
                  <Link
                    key={i}
                    to={link.path}
                    className="block p-3 rounded-2xl hover:bg-surface-container transition-all group"
                  >
                    <div className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors flex items-center justify-between">
                      <span>{link.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                    <div className="text-xs text-on-surface-variant font-medium mt-0.5">
                      {link.desc}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

