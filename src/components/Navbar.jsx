import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { 
  ChevronDown, 
  Menu, 
  X, 
  BookOpen, 
  Users, 
  Briefcase, 
  Globe2, 
  Terminal, 
  Layers, 
  TrendingUp, 
  GraduationCap, 
  Compass, 
  BookMarked,
  ArrowRight,
  Mail,
  Phone
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { openModal } = useModal();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <>
      <nav 
        className={`sticky top-0 z-40 transition-all duration-300 border-b ${
          scrolled 
            ? 'glass-nav border-outline-variant/20 shadow-md py-3' 
            : 'glass-nav border-outline-variant/10 shadow-sm py-4 md:py-5'
        }`}
      >
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center px-4 md:px-8">
          {/* Brand Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center hover:scale-105 active:scale-95 transition-transform duration-200"
            >
              <img 
                alt="Cynbit Logo" 
                src="/logo.svg" 
                className="h-8 md:h-10 w-auto" 
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-1">
            {/* Company Dropdown */}
            <div className="relative group/nav">
              <button 
                className="px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-1 transition-all hover:text-primary text-on-surface-variant group-hover/nav:text-primary"
              >
                Company
                <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover/nav:rotate-180">
                  expand_more
                </span>
              </button>

              <div className="absolute top-full left-0 pt-3 transition-all duration-300 origin-top-left opacity-0 translate-y-2 invisible group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:visible">
                <div className="bg-white rounded-3xl shadow-2xl border border-outline-variant/10 overflow-hidden w-72 p-2">
                  <Link 
                    to="/story" 
                    className="flex items-start gap-4 p-4 rounded-2xl transition-all hover:bg-primary/10 group/link active:scale-[0.98] border border-transparent hover:border-primary/20 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span className="material-symbols-outlined text-primary/60 group-hover/link:text-primary group-hover/link:scale-110 transition-all duration-300">
                      history_edu
                    </span>
                    <div>
                      <div className="text-sm font-bold text-on-surface group-hover/link:text-primary transition-colors">
                        Our Story
                      </div>
                      <div className="text-[10px] text-on-surface-variant opacity-70 mt-0.5 font-medium group-hover/link:opacity-100 transition-opacity">
                        The vision behind Cynbit.
                      </div>
                    </div>
                  </Link>

                  <Link 
                    to="/team" 
                    className="flex items-start gap-4 p-4 rounded-2xl transition-all hover:bg-primary/10 group/link active:scale-[0.98] border border-transparent hover:border-primary/20 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span className="material-symbols-outlined text-primary/60 group-hover/link:text-primary group-hover/link:scale-110 transition-all duration-300">
                      groups
                    </span>
                    <div>
                      <div className="text-sm font-bold text-on-surface group-hover/link:text-primary transition-colors">
                        Our Team
                      </div>
                      <div className="text-[10px] text-on-surface-variant opacity-70 mt-0.5 font-medium group-hover/link:opacity-100 transition-opacity">
                        Meet the architects.
                      </div>
                    </div>
                  </Link>

                  <Link 
                    to="/careers" 
                    className="flex items-start gap-4 p-4 rounded-2xl transition-all hover:bg-primary/10 group/link active:scale-[0.98] border border-transparent hover:border-primary/20 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span className="material-symbols-outlined text-primary/60 group-hover/link:text-primary group-hover/link:scale-110 transition-all duration-300">
                      work
                    </span>
                    <div>
                      <div className="text-sm font-bold text-on-surface group-hover/link:text-primary transition-colors">
                        Careers
                      </div>
                      <div className="text-[10px] text-on-surface-variant opacity-70 mt-0.5 font-medium group-hover/link:opacity-100 transition-opacity">
                        Join the revolution.
                      </div>
                    </div>
                  </Link>

                  <Link 
                    to="/impact" 
                    className="flex items-start gap-4 p-4 rounded-2xl transition-all hover:bg-primary/10 group/link active:scale-[0.98] border border-transparent hover:border-primary/20 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span className="material-symbols-outlined text-primary/60 group-hover/link:text-primary group-hover/link:scale-110 transition-all duration-300">
                      public
                    </span>
                    <div>
                      <div className="text-sm font-bold text-on-surface group-hover/link:text-primary transition-colors">
                        Social Impact
                      </div>
                      <div className="text-[10px] text-on-surface-variant opacity-70 mt-0.5 font-medium group-hover/link:opacity-100 transition-opacity">
                        Our global footprint.
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Expertise Dropdown */}
            <div className="relative group/nav">
              <button 
                className="px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-1 transition-all hover:text-primary text-on-surface-variant group-hover/nav:text-primary"
              >
                Expertise
                <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover/nav:rotate-180">
                  expand_more
                </span>
              </button>

              <div className="absolute top-full left-0 pt-3 transition-all duration-300 origin-top-left opacity-0 translate-y-2 invisible group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:visible">
                <div className="bg-white rounded-3xl shadow-2xl border border-outline-variant/10 overflow-hidden w-72 p-2">
                  <Link 
                    to="/services" 
                    className="flex items-start gap-4 p-4 rounded-2xl transition-all hover:bg-primary/10 group/link active:scale-[0.98] border border-transparent hover:border-primary/20 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span className="material-symbols-outlined text-primary/60 group-hover/link:text-primary group-hover/link:scale-110 transition-all duration-300">
                      terminal
                    </span>
                    <div>
                      <div className="text-sm font-bold text-on-surface group-hover/link:text-primary transition-colors">
                        Services Hub
                      </div>
                      <div className="text-[10px] text-on-surface-variant opacity-70 mt-0.5 font-medium group-hover/link:opacity-100 transition-opacity">
                        Tailored tech solutions.
                      </div>
                    </div>
                  </Link>

                  <Link 
                    to="/products" 
                    className="flex items-start gap-4 p-4 rounded-2xl transition-all hover:bg-primary/10 group/link active:scale-[0.98] border border-transparent hover:border-primary/20 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span className="material-symbols-outlined text-primary/60 group-hover/link:text-primary group-hover/link:scale-110 transition-all duration-300">
                      inventory_2
                    </span>
                    <div>
                      <div className="text-sm font-bold text-on-surface group-hover/link:text-primary transition-colors">
                        Product Suite
                      </div>
                      <div className="text-[10px] text-on-surface-variant opacity-70 mt-0.5 font-medium group-hover/link:opacity-100 transition-opacity">
                        Next-gen toolkits.
                      </div>
                    </div>
                  </Link>

                  <Link 
                    to="/case-studies" 
                    className="flex items-start gap-4 p-4 rounded-2xl transition-all hover:bg-primary/10 group/link active:scale-[0.98] border border-transparent hover:border-primary/20 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span className="material-symbols-outlined text-primary/60 group-hover/link:text-primary group-hover/link:scale-110 transition-all duration-300">
                      auto_graph
                    </span>
                    <div>
                      <div className="text-sm font-bold text-on-surface group-hover/link:text-primary transition-colors">
                        Case Studies
                      </div>
                      <div className="text-[10px] text-on-surface-variant opacity-70 mt-0.5 font-medium group-hover/link:opacity-100 transition-opacity">
                        Real-world results.
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* BitElevate Dropdown */}
            <div className="relative group/nav">
              <button 
                className="px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-1 transition-all hover:text-primary text-on-surface-variant group-hover/nav:text-primary"
              >
                BitElevate
                <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover/nav:rotate-180">
                  expand_more
                </span>
              </button>

              <div className="absolute top-full left-0 pt-3 transition-all duration-300 origin-top-left opacity-0 translate-y-2 invisible group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:visible">
                <div className="bg-white rounded-3xl shadow-2xl border border-outline-variant/10 overflow-hidden w-72 p-2">
                  <Link 
                    to="/bitelevate" 
                    className="flex items-start gap-4 p-4 rounded-2xl transition-all hover:bg-primary/10 group/link active:scale-[0.98] border border-transparent hover:border-primary/20 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span className="material-symbols-outlined text-primary/60 group-hover/link:text-primary group-hover/link:scale-110 transition-all duration-300">
                      school
                    </span>
                    <div>
                      <div className="text-sm font-bold text-on-surface group-hover/link:text-primary transition-colors">
                        The Ecosystem
                      </div>
                      <div className="text-[10px] text-on-surface-variant opacity-70 mt-0.5 font-medium group-hover/link:opacity-100 transition-opacity">
                        Unstructured learning.
                      </div>
                    </div>
                  </Link>

                  <Link 
                    to="/bitelevate/paths" 
                    className="flex items-start gap-4 p-4 rounded-2xl transition-all hover:bg-primary/10 group/link active:scale-[0.98] border border-transparent hover:border-primary/20 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span className="material-symbols-outlined text-primary/60 group-hover/link:text-primary group-hover/link:scale-110 transition-all duration-300">
                      route
                    </span>
                    <div>
                      <div className="text-sm font-bold text-on-surface group-hover/link:text-primary transition-colors">
                        Learning Paths
                      </div>
                      <div className="text-[10px] text-on-surface-variant opacity-70 mt-0.5 font-medium group-hover/link:opacity-100 transition-opacity">
                        Architect your future.
                      </div>
                    </div>
                  </Link>

                  <Link 
                    to="/diaries" 
                    className="flex items-start gap-4 p-4 rounded-2xl transition-all hover:bg-primary/10 group/link active:scale-[0.98] border border-transparent hover:border-primary/20 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span className="material-symbols-outlined text-primary/60 group-hover/link:text-primary group-hover/link:scale-110 transition-all duration-300">
                      auto_stories
                    </span>
                    <div>
                      <div className="text-sm font-bold text-on-surface group-hover/link:text-primary transition-colors">
                        Student Diaries
                      </div>
                      <div className="text-[10px] text-on-surface-variant opacity-70 mt-0.5 font-medium group-hover/link:opacity-100 transition-opacity">
                        Real stories. Raw journeys.
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Direct Links */}
            <div className="relative group/nav">
              <Link 
                to="/blog" 
                className={`px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-primary relative after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-primary after:transition-transform after:duration-300 ${
                  location.pathname.startsWith('/blog') 
                    ? 'text-primary after:scale-x-100' 
                    : 'text-on-surface-variant after:scale-x-0 hover:after:scale-x-100'
                }`}
              >
                Blog
              </Link>
            </div>

            <div className="relative group/nav">
              <Link 
                to="/contact" 
                className={`px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-primary relative after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-primary after:transition-transform after:duration-300 ${
                  location.pathname === '/contact' 
                    ? 'text-primary after:scale-x-100' 
                    : 'text-on-surface-variant after:scale-x-0 hover:after:scale-x-100'
                }`}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Action Button & Hamburger */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => openModal('Join the Cynbit Network', 'general')}
              className="hidden md:block bg-primary text-on-primary px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-primary-container hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
            >
              Join Us
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="xl:hidden w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface active:scale-90 hover:bg-surface-container-high transition-all duration-200"
            >
              <span className="material-symbols-outlined">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 xl:hidden pt-20 bg-surface/95 backdrop-blur-xl overflow-y-auto animate-fadeIn">
          <div className="px-6 py-8 space-y-6 max-w-lg mx-auto">
            {/* Company Section */}
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-primary mb-3">
                Company
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link to="/story" className="p-3 bg-surface-container rounded-2xl text-xs font-bold text-on-surface hover:text-primary transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-primary">history_edu</span>
                  Our Story
                </Link>
                <Link to="/team" className="p-3 bg-surface-container rounded-2xl text-xs font-bold text-on-surface hover:text-primary transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-primary">groups</span>
                  Our Team
                </Link>
                <Link to="/careers" className="p-3 bg-surface-container rounded-2xl text-xs font-bold text-on-surface hover:text-primary transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-primary">work</span>
                  Careers
                </Link>
                <Link to="/impact" className="p-3 bg-surface-container rounded-2xl text-xs font-bold text-on-surface hover:text-primary transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-primary">public</span>
                  Social Impact
                </Link>
              </div>
            </div>

            {/* Expertise Section */}
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-primary mb-3">
                Expertise & Solutions
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Link to="/services" className="p-3 bg-surface-container rounded-2xl text-xs font-bold text-on-surface hover:text-primary transition-colors flex items-center gap-3">
                  <span className="material-symbols-outlined text-sm text-primary">terminal</span>
                  <div>
                    <div>Services Hub</div>
                    <div className="text-[10px] text-on-surface-variant font-normal">AI Agents, Full-Stack, Cloud Architecture</div>
                  </div>
                </Link>
                <Link to="/products" className="p-3 bg-surface-container rounded-2xl text-xs font-bold text-on-surface hover:text-primary transition-colors flex items-center gap-3">
                  <span className="material-symbols-outlined text-sm text-primary">inventory_2</span>
                  <div>
                    <div>Product Suite</div>
                    <div className="text-[10px] text-on-surface-variant font-normal">Studio, TenantEase, Revio</div>
                  </div>
                </Link>
                <Link to="/case-studies" className="p-3 bg-surface-container rounded-2xl text-xs font-bold text-on-surface hover:text-primary transition-colors flex items-center gap-3">
                  <span className="material-symbols-outlined text-sm text-primary">auto_graph</span>
                  <div>
                    <div>Case Studies</div>
                    <div className="text-[10px] text-on-surface-variant font-normal">Healthcare, ERP, AI Triage & Payments</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* BitElevate Section */}
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-primary mb-3">
                BitElevate Academy
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Link to="/bitelevate" className="p-3 bg-surface-container rounded-2xl text-xs font-bold text-on-surface hover:text-primary transition-colors flex items-center gap-3">
                  <span className="material-symbols-outlined text-sm text-primary">school</span>
                  <div>
                    <div>The Ecosystem</div>
                    <div className="text-[10px] text-on-surface-variant font-normal">Project-based, mentor-evaluated engineering</div>
                  </div>
                </Link>
                <Link to="/bitelevate/paths" className="p-3 bg-surface-container rounded-2xl text-xs font-bold text-on-surface hover:text-primary transition-colors flex items-center gap-3">
                  <span className="material-symbols-outlined text-sm text-primary">route</span>
                  <div>
                    <div>16+ Learning Paths</div>
                    <div className="text-[10px] text-on-surface-variant font-normal">AI, Full-Stack, Cloud, DevOps, IoT</div>
                  </div>
                </Link>
                <Link to="/diaries" className="p-3 bg-surface-container rounded-2xl text-xs font-bold text-on-surface hover:text-primary transition-colors flex items-center gap-3">
                  <span className="material-symbols-outlined text-sm text-primary">auto_stories</span>
                  <div>
                    <div>Student Diaries</div>
                    <div className="text-[10px] text-on-surface-variant font-normal">Real stories from our students</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Direct Pages */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link to="/blog" className="py-3 px-4 text-center rounded-2xl bg-surface-container-high text-xs font-black uppercase tracking-wider text-on-surface hover:text-primary">
                Blog
              </Link>
              <Link to="/contact" className="py-3 px-4 text-center rounded-2xl bg-surface-container-high text-xs font-black uppercase tracking-wider text-on-surface hover:text-primary">
                Contact
              </Link>
            </div>

            {/* CTA in mobile menu */}
            <div className="pt-4 border-t border-outline-variant/10">
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  openModal('Join Cynbit', 'general');
                }}
                className="w-full bg-primary text-on-primary py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2"
              >
                Join Us
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Contact quick links */}
            <div className="pt-2 text-center text-xs text-on-surface-variant space-y-1">
              <p>📍 32/115 Pratap Nagar, Jaipur, Rajasthan</p>
              <p>✉️ opportunities@cynbit.in</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

