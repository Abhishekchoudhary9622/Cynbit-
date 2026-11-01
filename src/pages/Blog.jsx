import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { ArrowRight, Clock, BookOpen, Send, Sparkles, Check } from 'lucide-react';

export default function Blog() {
  const { openModal } = useModal();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeTag, setActiveTag] = useState('All');

  const tags = ['All', 'AI Automation', 'Engineering', 'Marketing', 'Operations'];

  const articles = [
    {
      slug: 'ai-agents-business-operations',
      title: 'How Autonomous AI Agents are Transforming Business Operations in 2026',
      tag: 'AI Automation',
      readTime: '14 Min Read',
      date: 'October 2026',
      excerpt: 'Moving past basic prompt scripts into multi-agent systems that autonomously plan, utilize tools, query distributed databases, and execute end-to-end workflows.',
      featured: true
    },
    {
      slug: 'best-business-automation-tools-2026',
      title: 'Best Business Automation Tools in 2026',
      tag: 'Operations',
      readTime: '12 Min Read',
      date: 'September 2026',
      excerpt: 'Efficiency isn\'t just about working harder; it\'s about using the right leverage. Discover the essential business automation stack for scaling operations.',
      featured: true
    },
    {
      slug: 'ai-revolutionizing-digital-marketing',
      title: 'How AI is Revolutionizing Digital Marketing in 2026',
      tag: 'Marketing',
      readTime: '15 Min Read',
      date: 'August 2026',
      excerpt: 'Marketing has moved from mass-broadcasting to mathematical precision. Discover how AI is transforming programmatic SEO, dynamic content synthesis, and ad ROAS.',
      featured: false
    },
    {
      slug: 'top-web-development-trends-2026',
      title: 'Top Web Development Trends in 2026',
      tag: 'Engineering',
      readTime: '11 Min Read',
      date: 'July 2026',
      excerpt: 'From React Server Components and edge runtimes to local AI browser inference and View Transitions, explore what modern frontend architects are building.',
      featured: false
    },
    {
      slug: 'future-ai-customer-support-systems',
      title: 'Future of AI-Powered Customer Support Systems',
      tag: 'AI Automation',
      readTime: '10 Min Read',
      date: 'June 2026',
      excerpt: 'How bidirectional voice agents and contextual knowledge graphs are eliminating frustrating customer support ticket queues once and for all.',
      featured: false
    },
    {
      slug: 'crm-automation-strategies-2026',
      title: 'Best CRM Automation Strategies for Modern Companies in 2026',
      tag: 'Operations',
      readTime: '8 Min Read',
      date: 'May 2026',
      excerpt: 'Stop manually updating sales leads. Learn how event-driven webhook pipelines keep your CRM perfectly synced with customer actions.',
      featured: false
    }
  ];

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

  const filteredArticles = activeTag === 'All'
    ? articles
    : articles.filter(a => a.tag === activeTag);

  return (
    <div className="bg-surface text-left overflow-hidden">
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-20 px-4 md:px-8 lg:px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">edit_note</span>
            Technical Insights & Research
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-black text-on-surface tracking-tight leading-tight">
            Architecting knowledge.
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant font-medium leading-relaxed">
            Technical research, architectural deep-dives, and strategic analyses from our engineering lab in Jaipur, India.
          </p>
        </div>
      </section>

      {/* Featured Insight Hero Card */}
      <section className="py-12 px-4 md:px-8 lg:px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto">
          <div className="rounded-[2.5rem] bg-gradient-to-br from-primary to-primary-container p-8 md:p-14 text-white shadow-2xl relative overflow-hidden">
            <div className="max-w-3xl space-y-6 relative z-10">
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-white/80">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md">Featured Insight</span>
                <span>• 14 Min Read</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-headline font-black tracking-tight leading-tight">
                How Autonomous AI Agents are Transforming Business Operations in 2026
              </h2>
              <p className="text-white/85 text-base md:text-lg leading-relaxed font-medium">
                Moving past basic prompt scripts into multi-agent systems that autonomously plan, utilize tools, query distributed databases, and execute end-to-end workflows without human latency.
              </p>
              <div className="pt-2">
                <Link
                  to="/blog/ai-agents-business-operations"
                  className="bg-white text-primary px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest inline-flex items-center gap-2 shadow-lg hover:bg-surface-container transition-all"
                >
                  Read Complete Architecture Breakdown
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Feed */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-surface-container-low border-y border-outline-variant/10">
        <div className="max-w-screen-2xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-2">
              <div className="text-xs font-black uppercase tracking-widest text-primary">Lab Archives</div>
              <h3 className="text-3xl md:text-4xl font-headline font-black text-on-surface">
                More from the lab
              </h3>
            </div>

            {/* Filter tags */}
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTag(t)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    activeTag === t
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-white border border-outline-variant/30 text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <div
                key={article.slug}
                className="bg-white rounded-3xl p-8 border border-outline-variant/15 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-on-surface-variant font-semibold">
                    <span className="text-[10px] font-black uppercase tracking-wider text-primary bg-primary/10 px-3 py-0.5 rounded-full">
                      {article.tag}
                    </span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-primary" /> {article.readTime}
                    </span>
                  </div>

                  <h4 className="text-xl md:text-2xl font-bold font-headline text-on-surface hover:text-primary transition-colors">
                    <Link to={`/blog/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h4>

                  <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-outline-variant/10 flex items-center justify-between">
                  <span className="text-[11px] text-on-surface-variant/70 font-semibold">
                    {article.date}
                  </span>
                  <Link
                    to={`/blog/${article.slug}`}
                    className="text-xs font-black uppercase tracking-wider text-primary hover:text-primary-container flex items-center gap-1 group"
                  >
                    Read Story
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-surface text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
            Weekly Briefing
          </div>
          <h2 className="text-3xl md:text-5xl font-headline font-black text-on-surface tracking-tight">
            Join 25,000+ Architects of the Future.
          </h2>
          <p className="text-on-surface-variant text-base font-medium">
            Zero spam. Just one editorial email per week containing our most impactful research, tech trends, and community updates.
          </p>

          <div className="pt-4 max-w-md mx-auto">
            {subscribed ? (
              <div className="p-4 bg-primary/10 text-primary rounded-2xl text-xs font-bold flex items-center justify-center gap-2">
                <Check className="w-4 h-4" /> Thank you for subscribing! Check your inbox soon.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-grow px-5 py-3.5 rounded-full bg-surface-container border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  type="submit"
                  className="bg-primary text-on-primary px-7 py-3.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-primary-container transition-all flex items-center gap-2 flex-shrink-0"
                >
                  Subscribe
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

