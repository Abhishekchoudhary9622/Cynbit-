import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useModal } from '../context/ModalContext';

export default function Terms() {
  const { openModal } = useModal();

  return (
    <div className="bg-surface text-left overflow-hidden">
      <section className="pt-24 md:pt-32 pb-20 px-4 md:px-8 lg:px-12 bg-surface">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">description</span>
            Terms of Service
          </div>
          <h1 className="text-4xl md:text-6xl font-headline font-black text-on-surface tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm text-on-surface-variant font-medium">
            Effective Date: April 2024 • Last Updated: October 2026
          </p>
        </div>
      </section>

      <section className="pb-24 px-4 md:px-8 lg:px-12 bg-surface">
        <div className="max-w-4xl mx-auto space-y-8 text-on-surface-variant leading-relaxed text-sm md:text-base font-medium">
          <div className="p-6 bg-surface-container rounded-3xl border border-outline-variant/15 space-y-2">
            <h2 className="text-xl font-bold font-headline text-on-surface">1. Agreement to Terms</h2>
            <p>
              By accessing cynbit.in or utilizing our software products, APIs, or educational tracks (including BitElevate, Cynbit Studio, TenantEase, and Revio), you agree to be bound by these Terms of Service and applicable laws.
            </p>
          </div>

          <div className="p-6 bg-surface-container rounded-3xl border border-outline-variant/15 space-y-2">
            <h2 className="text-xl font-bold font-headline text-on-surface">2. Intellectual Property</h2>
            <p>
              All proprietary codebases, algorithms, brand assets, system architectures, and documentation developed by Cynbit Technologies Private Limited remain the exclusive intellectual property of Cynbit Technologies unless explicitly transferred under a custom enterprise agreement.
            </p>
          </div>

          <div className="p-6 bg-surface-container rounded-3xl border border-outline-variant/15 space-y-2">
            <h2 className="text-xl font-bold font-headline text-on-surface">3. Service Inquiries & Project Delivery</h2>
            <p>
              Project specifications, timelines, and deliverables for bespoke enterprise development are governed by individual Statements of Work (SOW) executed between the client and Cynbit Technologies.
            </p>
          </div>

          <div className="p-6 bg-surface-container rounded-3xl border border-outline-variant/15 space-y-2">
            <h2 className="text-xl font-bold font-headline text-on-surface">4. BitElevate Program Policies</h2>
            <p>
              Enrollees in BitElevate agree to adhere to standard code-of-conduct guidelines, commit authenticity, and respect intellectual property. The ₹3,999 enrollment fee provides 60 days of platform access and mentor reviews. The exam pause policy allows up to 21 days of pause with prior notification.
            </p>
          </div>

          <div className="p-6 bg-surface-container rounded-3xl border border-outline-variant/15 space-y-2">
            <h2 className="text-xl font-bold font-headline text-on-surface">5. Limitation of Liability</h2>
            <p>
              In no event shall Cynbit Technologies Private Limited or its directors be liable for indirect, punitive, or consequential damages resulting from platform downtime, network latency, or external third-party API disruptions.
            </p>
          </div>

          <div className="pt-6 border-t border-outline-variant/15 flex items-center justify-between">
            <span className="text-xs text-on-surface-variant font-semibold">Need a formal enterprise contract?</span>
            <Link to="/contact" className="text-xs font-black uppercase tracking-wider text-primary hover:underline">
              Request Master Services Agreement (MSA) →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

