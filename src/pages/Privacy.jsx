import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { useModal } from '../context/ModalContext';

export default function Privacy() {
  const { openModal } = useModal();

  return (
    <div className="bg-surface text-left overflow-hidden">
      <section className="pt-24 md:pt-32 pb-20 px-4 md:px-8 lg:px-12 bg-surface">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">shield</span>
            Legal & Governance
          </div>
          <h1 className="text-4xl md:text-6xl font-headline font-black text-on-surface tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-on-surface-variant font-medium">
            Effective Date: April 2024 • Last Updated: October 2026
          </p>
        </div>
      </section>

      <section className="pb-24 px-4 md:px-8 lg:px-12 bg-surface">
        <div className="max-w-4xl mx-auto space-y-8 text-on-surface-variant leading-relaxed text-sm md:text-base font-medium">
          <div className="p-6 bg-surface-container rounded-3xl border border-outline-variant/15 space-y-2">
            <h2 className="text-xl font-bold font-headline text-on-surface">1. Data Sovereignty & Collection</h2>
            <p>
              Cynbit Technologies Private Limited ("Cynbit", "we", "our") respects your privacy. We collect information you provide directly to us when filling out discovery forms, enrolling in BitElevate, applying for careers, or communicating with our team. This includes your name, email address, phone number, organization, and project technical specifications.
            </p>
          </div>

          <div className="p-6 bg-surface-container rounded-3xl border border-outline-variant/15 space-y-2">
            <h2 className="text-xl font-bold font-headline text-on-surface">2. How We Use Information</h2>
            <p>
              We process your information solely to deliver customized technical solutions, evaluate code repositories in BitElevate, provide student mentorship, maintain platform uptime, and communicate regarding relevant project milestones. We never sell or license your personal or organizational data to third-party ad networks.
            </p>
          </div>

          <div className="p-6 bg-surface-container rounded-3xl border border-outline-variant/15 space-y-2">
            <h2 className="text-xl font-bold font-headline text-on-surface">3. Security Standards & Confidentiality</h2>
            <p>
              We employ industry-grade encryption (AES-256 at rest and TLS 1.3 in transit) for all stored telemetry and repository credentials. All internal access is governed by strict principle-of-least-privilege RBAC.
            </p>
          </div>

          <div className="p-6 bg-surface-container rounded-3xl border border-outline-variant/15 space-y-2">
            <h2 className="text-xl font-bold font-headline text-on-surface">4. Third-Party Services</h2>
            <p>
              We may utilize certified infrastructure providers (such as AWS, Google Cloud, GitHub, and payment gateways) strictly to host software services and process payments. These entities are bound by confidentiality obligations.
            </p>
          </div>

          <div className="p-6 bg-surface-container rounded-3xl border border-outline-variant/15 space-y-2">
            <h2 className="text-xl font-bold font-headline text-on-surface">5. Your Rights</h2>
            <p>
              You have the right to request access to, correction of, or deletion of your personal data stored within our systems by writing to our compliance team at <strong>privacy@cynbit.in</strong>.
            </p>
          </div>

          <div className="pt-6 border-t border-outline-variant/15 flex items-center justify-between">
            <span className="text-xs text-on-surface-variant font-semibold">Questions about your data?</span>
            <Link to="/contact" className="text-xs font-black uppercase tracking-wider text-primary hover:underline">
              Contact Compliance Team →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

