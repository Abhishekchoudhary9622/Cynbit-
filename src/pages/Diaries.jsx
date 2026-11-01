import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { ArrowRight, BookOpen, Quote, Clock, Sparkles } from 'lucide-react';

export default function Diaries() {
  const { openModal } = useModal();
  const [selectedDiary, setSelectedDiary] = useState(null);

  const stories = [
    {
      id: 'survival-to-learning',
      author: 'Anonymous Final Year Student',
      university: 'Engineering College, Rajasthan',
      title: 'Attendance became more about survival than learning.',
      readTime: '6 Min Read',
      tag: 'Raw Journey',
      excerpt: 'In my third year, my daily energy went into running between lecture halls to maintain 75% attendance. The curriculum hadn’t changed in 12 years. We were writing Java 6 code on paper notebooks with ballpoint pens while the world was debating distributed AI agents.',
      fullStory: `In my third year, my daily energy went into running between lecture halls to maintain 75% attendance. The curriculum hadn’t changed in 12 years. We were writing Java 6 code on paper notebooks with ballpoint pens while the world was debating distributed AI agents and microservice architectures.

The breaking point came during our college placement drive. Company after company asked: "Show us what you've actually built. Where is your GitHub?" Most of my batch had identical todo apps copied from YouTube tutorials.

When I started BitElevate, there were no lectures to passively consume. On day 2, I was handed a broken CI/CD pipeline and told to submit a Pull Request to fix the database connection pool. It was terrifying and exhilarating. By Day 45, I had 38 merged pull requests, learned how to write integration tests, and understood why architecture matters.

Last month, I received an off-campus offer from a Bengaluru startup. In the final round, the CTO didn't ask a single leetcode puzzle—he opened my BitElevate repository and spent 40 minutes discussing how I structured my Redis caching layer. That is when I knew my time had finally counted.`
    },
    {
      id: 'breaking-tier-3-stereotype',
      author: 'Priya K.',
      university: 'Tier-3 Engineering Graduate, Jaipur',
      title: 'I had my entire life planned around tier-3 stereotypes.',
      readTime: '8 Min Read',
      tag: 'Overcoming Imposter Syndrome',
      excerpt: 'When you are from a non-IIT/NIT college in Rajasthan, everyone silently prepares you for service company mass recruitments. No one tells you that you can build enterprise-grade distributed systems from your hostel room.',
      fullStory: `When you are from a non-IIT/NIT college in Rajasthan, everyone silently prepares you for service company mass recruitments. The expectation is that you will memorize basic syntax, sign a 2-year bond, and accept whatever is handed to you.

BitElevate was the first place that treated me like an engineer rather than a student who needed hand-holding. When my pull request was reviewed by an architect who pointed out a race condition in my WebSocket handler, I spent 6 hours reading documentation to rewrite it properly.

That rigor transformed how I view myself. When interviewers look at my code today, they don't see what college I attended—they see a developer who knows how to write resilient software.`
    },
    {
      id: 'escaping-tutorial-purgatory',
      author: 'Harsh Vardhan',
      university: 'Computer Science, Batch of 2025',
      title: 'From endless YouTube playlists to shipping 45 PRs in 60 days.',
      readTime: '5 Min Read',
      tag: 'Tutorial Hell to Production',
      excerpt: 'I had 14 Udemy certificates and zero ability to build something from a blank editor. Every time I tried to start a project on my own, I would get stuck on environment variables or routing and give up.',
      fullStory: `I had 14 Udemy certificates and zero ability to build something from a blank editor. Every time I tried to start a project on my own, I would get stuck on environment variables or routing and give up. Tutorial purgatory is real—you feel productive because a green checkmark appears after each 10-minute video, but you retain almost nothing.

BitElevate stripped away the training wheels. You get an issue tracker, a repository with failing tests, and architectural guidelines. You have to figure out how to debug error stack traces.

The mentor reviews were brutal in the best possible way. "Why is this database query inside a loop?" "Where is the error boundary?" Those reviews taught me more in 2 months than 3 years of college.`
    },
    {
      id: 'terminal-clicked',
      author: 'Devendra Singh',
      university: 'Information Technology, JECRC Foundation',
      title: 'When the terminal finally clicked.',
      readTime: '7 Min Read',
      tag: 'Cloud & DevOps Shift',
      excerpt: 'In college, Cloud Computing was taught using PowerPoint slides with pictures of server racks. We never typed a single Docker command or provisioned a virtual private cloud.',
      fullStory: `In college, Cloud Computing was taught using PowerPoint slides with pictures of server racks. We had to draw cloud network diagrams on exam sheets for 8 marks. We never typed a single Docker command, never configured a reverse proxy, and never touched an actual AWS dashboard.

Through BitElevate's Cloud & DevOps track, I set up my first Kubernetes pod within the first week. Seeing automated health checks restart a crashing container in real-time was like magic.

Today, I work as a Cloud Associate. When my team encounters container memory leaks or pod scheduling issues, I don't panic because I already resolved those exact errors during my BitElevate sprints.`
    }
  ];

  return (
    <div className="bg-surface text-left overflow-hidden">
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-20 px-4 md:px-8 lg:px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">auto_stories</span>
            Student Diaries
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-black text-on-surface tracking-tight leading-tight">
            Student Diaries: <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Unheard Stories
            </span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant font-medium leading-relaxed">
            Raw, unfiltered reflections from the next generation of software architects. Documenting the psychological and technical shift from theoretical learning to professional execution.
          </p>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-surface-container-low border-y border-outline-variant/10">
        <div className="max-w-screen-2xl mx-auto space-y-12">
          <div className="grid md:grid-cols-2 gap-8">
            {stories.map((story) => (
              <div 
                key={story.id}
                className="bg-white rounded-3xl p-8 md:p-10 border border-outline-variant/15 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-on-surface-variant font-semibold">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider">
                      {story.tag}
                    </span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-primary" /> {story.readTime}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold font-headline text-on-surface hover:text-primary transition-colors">
                    "{story.title}"
                  </h3>

                  <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                    {story.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-outline-variant/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-on-surface font-headline">{story.author}</div>
                    <div className="text-[11px] text-on-surface-variant/70">{story.university}</div>
                  </div>
                  <button
                    onClick={() => setSelectedDiary(story)}
                    className="text-xs font-black uppercase tracking-wider text-primary hover:text-primary-container flex items-center gap-1 group"
                  >
                    Read Entry
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reader Modal */}
      {selectedDiary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-outline-variant/20 max-h-[85vh] flex flex-col overflow-hidden">
            <div className="p-6 md:p-8 border-b border-outline-variant/15 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-primary bg-primary/10 px-3 py-0.5 rounded-full">
                  {selectedDiary.tag}
                </span>
                <h3 className="text-xl md:text-2xl font-bold font-headline text-on-surface mt-2">
                  "{selectedDiary.title}"
                </h3>
                <div className="text-xs text-on-surface-variant mt-1">
                  By {selectedDiary.author} • {selectedDiary.university}
                </div>
              </div>
              <button 
                onClick={() => setSelectedDiary(null)}
                className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors flex-shrink-0"
              >
                ✕
              </button>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto space-y-4 text-sm md:text-base text-on-surface-variant leading-relaxed font-medium whitespace-pre-line">
              {selectedDiary.fullStory}
            </div>

            <div className="p-6 border-t border-outline-variant/15 bg-surface-container-low flex items-center justify-between">
              <span className="text-xs text-on-surface-variant font-semibold">
                Inspired to start your own engineering journey?
              </span>
              <button
                onClick={() => {
                  setSelectedDiary(null);
                  openModal('Enroll in BitElevate', 'bitelevate');
                }}
                className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-wider hover:bg-primary-container transition-all"
              >
                Join BitElevate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-20 px-4 md:px-8 bg-surface text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-headline font-black text-on-surface tracking-tight">
            Ready to write your story?
          </h2>
          <p className="text-on-surface-variant text-base font-medium">
            Join the BitElevate movement and build the technical rigor required for global impact.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button 
              onClick={() => openModal('Enroll in BitElevate 60-Day Track', 'bitelevate')}
              className="bg-primary text-on-primary px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest shadow-lg hover:bg-primary-container transition-all flex items-center gap-2"
            >
              Join BitElevate <ArrowRight className="w-4 h-4" />
            </button>
            <Link 
              to="/bitelevate/paths" 
              className="px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest bg-white border border-outline-variant/30 text-on-surface hover:bg-surface-container transition-all"
            >
              View Learning Paths
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

