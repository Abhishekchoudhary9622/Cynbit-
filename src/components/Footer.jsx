import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { ArrowRight, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { openModal } = useModal();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 5000);
    }
  };

  return (
    <footer className="bg-surface border-t border-outline-variant/10 pt-20 pb-12 px-4 md:px-8 lg:px-12 overflow-hidden font-body">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Col 1: Logo & Socials & Direct Contact */}
          <div className="lg:col-span-4 space-y-12">
            <div>
              <Link to="/" className="inline-block hover:scale-105 transition-transform">
                <img 
                  alt="Cynbit Logo" 
                  src="/logo.svg" 
                  className="h-12 w-auto" 
                />
              </Link>
            </div>

            <div className="space-y-8">
              <div className="flex gap-6 items-center">
                <a 
                  href="https://www.linkedin.com/company/cynbit-in/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title="LinkedIn" 
                  className="transition-all hover:-translate-y-2 group block"
                >
                  <img 
                    alt="LinkedIn" 
                    src="/icons/linkedin.svg" 
                    className="w-10 h-10 opacity-60 group-hover:opacity-100 transition-all group-hover:scale-110 grayscale group-hover:grayscale-0 filter drop-shadow-sm" 
                  />
                </a>
                <a 
                  href="https://www.instagram.com/cynbit.in/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title="Instagram" 
                  className="transition-all hover:-translate-y-2 group block"
                >
                  <img 
                    alt="Instagram" 
                    src="/icons/instagram.svg" 
                    className="w-10 h-10 opacity-60 group-hover:opacity-100 transition-all group-hover:scale-110 grayscale group-hover:grayscale-0 filter drop-shadow-sm" 
                  />
                </a>
                <a 
                  href="https://www.facebook.com/people/Cynbit-Technologies/61557066036732/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title="Facebook" 
                  className="transition-all hover:-translate-y-2 group block"
                >
                  <img 
                    alt="Facebook" 
                    src="/icons/facebook.svg" 
                    className="w-10 h-10 opacity-60 group-hover:opacity-100 transition-all group-hover:scale-110 grayscale group-hover:grayscale-0 filter drop-shadow-sm" 
                  />
                </a>
                <a 
                  href="https://x.com/Cynbit_in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title="X" 
                  className="transition-all hover:-translate-y-2 group block"
                >
                  <img 
                    alt="X" 
                    src="/icons/twitter.svg" 
                    className="w-10 h-10 opacity-60 group-hover:opacity-100 transition-all group-hover:scale-110 grayscale group-hover:grayscale-0 filter drop-shadow-sm" 
                  />
                </a>
              </div>

              <div className="space-y-6 pt-10 border-t border-outline-variant/10">
                <div className="flex items-center gap-5 text-on-surface-variant group">
                  <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all shadow-sm">
                    <span className="material-symbols-outlined text-xl">mail</span>
                  </div>
                  <a 
                    href="mailto:opportunities@cynbit.in" 
                    className="text-base md:text-lg font-bold tracking-tight hover:text-primary transition-colors"
                  >
                    opportunities@cynbit.in
                  </a>
                </div>

                <div className="flex items-start gap-5 text-on-surface-variant group">
                  <div className="w-10 h-10 rounded-full bg-secondary/5 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-all shadow-sm pt-1">
                    <span className="material-symbols-outlined text-xl">call</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <a href="tel:+918947962667" className="text-base font-bold tracking-tight hover:text-primary transition-colors">
                      +91 89479 62667
                    </a>
                    <a href="tel:+917891209777" className="text-base font-bold tracking-tight hover:text-primary transition-colors">
                      +91 78912 09777
                    </a>
                    <a href="tel:+918302337367" className="text-base font-bold tracking-tight hover:text-primary transition-colors">
                      +91 83023 37367
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links (Explore & Impact) */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="text-primary font-bold text-xs uppercase tracking-wider font-headline">
                Explore
              </h4>
              <ul className="space-y-3.5">
                <li>
                  <Link to="/story" className="text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all inline-block font-medium text-sm underline-offset-4 hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/team" className="text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all inline-block font-medium text-sm underline-offset-4 hover:underline">
                    Core Team
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all inline-block font-medium text-sm underline-offset-4 hover:underline">
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all inline-block font-medium text-sm underline-offset-4 hover:underline">
                    Product Suite
                  </Link>
                </li>
                <li>
                  <Link to="/case-studies" className="text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all inline-block font-medium text-sm underline-offset-4 hover:underline">
                    Case Studies
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-primary font-bold text-xs uppercase tracking-wider font-headline">
                Impact
              </h4>
              <ul className="space-y-3.5">
                <li>
                  <Link to="/bitelevate" className="text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all inline-block font-medium text-sm underline-offset-4 hover:underline">
                    BitElevate
                  </Link>
                </li>
                <li>
                  <Link to="/impact" className="text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all inline-block font-medium text-sm underline-offset-4 hover:underline">
                    Social Initiatives
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all inline-block font-medium text-sm underline-offset-4 hover:underline">
                    Expert Blog
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all inline-block font-medium text-sm underline-offset-4 hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all inline-block font-medium text-sm underline-offset-4 hover:underline">
                    Contact Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 3: Newsletter & Headquarters */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h4 className="text-primary font-bold text-xs uppercase tracking-wider font-headline mb-4">
                Stay Connected
              </h4>
              <div className="p-8 bg-surface-container-low rounded-[2rem] border border-outline-variant/10 shadow-sm group">
                <h5 className="text-lg font-bold text-on-surface mb-2 font-headline">
                  Subscribe to our Briefing
                </h5>
                <p className="text-sm text-on-surface-variant mb-6 font-medium leading-relaxed">
                  Join 25k+ architects receiving our weekly technical and strategic deep-dives.
                </p>

                {subscribed ? (
                  <div className="flex items-center gap-2 p-3 bg-primary/10 text-primary rounded-xl text-xs font-bold">
                    <Check className="w-4 h-4" />
                    Thank you for subscribing! Check your inbox soon.
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-3">
                    <input 
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      className="w-full px-4 py-3 rounded-full bg-white border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:border-primary transition-colors"
                    />
                    <button 
                      type="submit"
                      className="w-full bg-primary text-on-primary py-3.5 rounded-full font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20 hover:bg-primary-container hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                    >
                      Join the Newsletter
                      <span className="material-symbols-outlined text-sm">east</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div>
              <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 shadow-sm hover:bg-primary/10 transition-colors group">
                <div className="flex items-center gap-5">
                  <div className="w-8 h-8 group-hover:rotate-12 transition-transform flex-shrink-0">
                    <img 
                      alt="Location" 
                      src="/icons/location.svg" 
                      className="w-full h-full grayscale group-hover:grayscale-0" 
                    />
                  </div>
                  <div className="font-headline text-left">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                      Headquarters
                    </p>
                    <p className="text-xs font-bold text-on-surface">
                      32/115 Pratap Nagar, Jaipur
                    </p>
                    <p className="text-[10px] font-medium text-on-surface-variant">
                      Rajasthan, 302033, India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-on-surface-variant opacity-60 font-headline">
              © 2026 Cynbit Technologies. Engineered for Optimism.
            </p>
          </div>
          <div>
            <div className="flex flex-wrap justify-center gap-6 text-[10px] font-black uppercase tracking-[0.15em] text-on-surface-variant opacity-70 font-headline">
              <Link to="/terms" className="hover:text-primary transition-colors">
                Terms
              </Link>
              <Link to="/cookies" className="hover:text-primary transition-colors">
                Cookies
              </Link>
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link to="/navigation" className="hover:text-primary transition-colors">
                Navigation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

