import React from 'react';
import { Link } from 'react-router-dom';

export default function Cookies() {
  return (
    <div className="bg-surface text-left overflow-hidden">
      <section className="pt-24 md:pt-32 pb-20 px-4 md:px-8 lg:px-12 bg-surface">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">cookie</span>
            Browser Privacy
          </div>
          <h1 className="text-4xl md:text-6xl font-headline font-black text-on-surface tracking-tight">
            Cookie Policy
          </h1>
          <p className="text-sm text-on-surface-variant font-medium">
            Effective Date: April 2024 • Last Updated: October 2026
          </p>
        </div>
      </section>

      <section className="pb-24 px-4 md:px-8 lg:px-12 bg-surface">
        <div className="max-w-4xl mx-auto space-y-8 text-on-surface-variant leading-relaxed text-sm md:text-base font-medium">
          <div className="p-6 bg-surface-container rounded-3xl border border-outline-variant/15 space-y-2">
            <h2 className="text-xl font-bold font-headline text-on-surface">Essential Cookies</h2>
            <p>
              These cookies are technically required for core security, session validation, authentication tokens, and user preferences (such as theme and navigation state).
            </p>
          </div>

          <div className="p-6 bg-surface-container rounded-3xl border border-outline-variant/15 space-y-2">
            <h2 className="text-xl font-bold font-headline text-on-surface">Analytics Cookies</h2>
            <p>
              We use aggregated analytics cookies (e.g. Google Analytics) to measure page load performance, Core Web Vitals, and aggregate traffic patterns to improve site ergonomics.
            </p>
          </div>

          <div className="p-6 bg-surface-container rounded-3xl border border-outline-variant/15 space-y-2">
            <h2 className="text-xl font-bold font-headline text-on-surface">Functional Cookies</h2>
            <p>
              These cookies remember filter selections on our BitElevate tracks, active search terms, and form preferences to provide a seamless user experience.
            </p>
          </div>

          <div className="p-6 bg-surface-container rounded-3xl border border-outline-variant/15 space-y-2">
            <h2 className="text-xl font-bold font-headline text-on-surface">Managing Cookies</h2>
            <p>
              You can control or disable non-essential cookies at any time via your browser settings. Note that disabling essential cookies may impact interactive portal functionality.
            </p>
          </div>

          <div className="pt-6 border-t border-outline-variant/15 flex items-center justify-between">
            <span className="text-xs text-on-surface-variant font-semibold">Have questions about cookies?</span>
            <Link to="/contact" className="text-xs font-black uppercase tracking-wider text-primary hover:underline">
              Contact Privacy Team →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

