import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { 
  ArrowRight, 
  Sparkles, 
  Search, 
  Code2, 
  Brain, 
  Cloud, 
  ShieldCheck, 
  Cpu, 
  Compass, 
  BarChart3, 
  CheckCircle2,
  Workflow
} from 'lucide-react';

export default function BitElevatePaths() {
  const { openModal } = useModal();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');

  const domains = ['All', 'Development', 'AI & Data', 'Cloud & Infra', 'Marketing & Product'];

  const paths = [
    {
      id: 'fullstack',
      title: 'Full stack web development',
      domain: 'Development',
      badge: 'High Demand',
      description: 'Master end-to-end web engineering. Build reactive client applications with Next.js and TypeScript, resilient REST/GraphQL APIs, and scale databases with PostgreSQL and Prisma.',
      stack: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind'],
      capstone: 'Enterprise Kanban & Sprint SaaS with Live WebSockets'
    },
    {
      id: 'ai-agents',
      title: 'Artificial Intelligence (AI)',
      domain: 'AI & Data',
      badge: 'Next-Gen',
      description: 'Build goal-driven autonomous agents, multi-step prompt reasoning loops, retrieval augmented generation (RAG) engines, and fine-tune open-source models using vLLM.',
      stack: ['Python', 'LangChain', 'LlamaIndex', 'Pinecone', 'vLLM', 'OpenAI/Gemini API'],
      capstone: 'Autonomous Business Operations Triage Agent'
    },
    {
      id: 'ml',
      title: 'Machine learning (ML)',
      domain: 'AI & Data',
      badge: 'Core Research',
      description: 'Dive deep into supervised and unsupervised learning, mathematical gradient descent, neural network architectures in PyTorch, and production model serving.',
      stack: ['PyTorch', 'Scikit-Learn', 'NumPy', 'Pandas', 'FastAPI', 'MLflow'],
      capstone: 'Predictive Medical Diagnostic Risk Engine'
    },
    {
      id: 'data-science',
      title: 'Data science',
      domain: 'AI & Data',
      badge: 'Analytical',
      description: 'Transform chaotic data into predictive intelligence. Master hypothesis testing, exploratory data analysis, feature engineering, and statistical inference.',
      stack: ['Python', 'Pandas', 'Seaborn', 'SciPy', 'Jupyter', 'PostgreSQL'],
      capstone: 'Customer Churn & Behavioral Clustering Pipeline'
    },
    {
      id: 'data-analytics',
      title: 'Data analytics',
      domain: 'AI & Data',
      badge: 'Enterprise',
      description: 'Bridge technical metrics with executive decision-making. Master complex SQL queries, window functions, and interactive dashboard architecture.',
      stack: ['Advanced SQL', 'Power BI', 'Tableau', 'Excel Modeling', 'ClickHouse'],
      capstone: 'B2B Revenue & Retention Operational Intelligence Dashboard'
    },
    {
      id: 'devops',
      title: 'DevOps & Site Reliability',
      domain: 'Cloud & Infra',
      badge: 'Infrastructure',
      description: 'Automate deployment pipelines. Build containerized environments with Docker, manage Kubernetes pods, orchestrate GitHub Actions, and enforce GitOps workflows.',
      stack: ['Docker', 'Kubernetes', 'GitHub Actions', 'Linux Bash', 'Helm', 'ArgoCD'],
      capstone: 'Zero-Downtime Microservices CI/CD Pipeline'
    },
    {
      id: 'cloud-computing',
      title: 'Cloud computing',
      domain: 'Cloud & Infra',
      badge: 'Enterprise',
      description: 'Architect multi-tenant cloud ecosystems on AWS and GCP. Deploy VPC networks, IAM security policies, serverless Lambdas, and automated Terraform scripts.',
      stack: ['AWS', 'Google Cloud', 'Terraform', 'Serverless', 'S3', 'CloudFront'],
      capstone: 'Multi-Region High Availability Cloud Architecture'
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity & Defense',
      domain: 'Cloud & Infra',
      badge: 'Mission-Critical',
      description: 'Protect digital perimeters. Master OWASP Top 10 vulnerabilities, penetration testing workflows, zero-trust network models, and cryptographically secure APIs.',
      stack: ['Wireshark', 'Burp Suite', 'Metasploit', 'OWASP ZAP', 'Linux Security', 'JWT/TLS'],
      capstone: 'Penetration Audit & Hardened Zero-Trust Gateway'
    },
    {
      id: 'backend-distributed',
      title: 'Backend & Distributed Systems',
      domain: 'Development',
      badge: 'High Performance',
      description: 'Engineer high-throughput systems capable of processing millions of concurrent transactions. Master Go, concurrency primitives, Kafka streams, and Redis cache clusters.',
      stack: ['Go (Golang)', 'Rust', 'Redis', 'Apache Kafka', 'gRPC', 'PostgreSQL'],
      capstone: 'High-Concurrency Cross-Border Payment Settlement Broker'
    },
    {
      id: 'ui-ux',
      title: 'UI/UX design & Systems',
      domain: 'Product & Design',
      badge: 'Human-Centric',
      description: 'Architect intuitive digital ergonomics. Create scalable component design systems in Figma, conduct user research, interactive wireframing, and usability audits.',
      stack: ['Figma', 'Design Tokens', 'User Journey Mapping', 'Prototyping', 'Design Systems'],
      capstone: 'Complete Multi-Platform SaaS Design System & Interactive Prototype'
    },
    {
      id: 'digital-marketing',
      title: 'Digital marketing & Funnels',
      domain: 'Marketing & Product',
      badge: 'Growth Engine',
      description: 'Master mathematical growth marketing. Plan, execute, and analyze Meta Ads and Google Ads campaigns with custom conversion tracking and funnel optimization.',
      stack: ['Google Ads', 'Meta Business Suite', 'Google Analytics 4', 'Conversion API', 'Zapier'],
      capstone: 'Full-Funnel Paid Acquisition & CAC Reduction Blueprint'
    },
    {
      id: 'technical-seo',
      title: 'Technical SEO & Programmatic Growth',
      domain: 'Marketing & Product',
      badge: 'Organic Scale',
      description: 'Dominate organic search. Build programmatic SEO architectures, optimize Core Web Vitals, implement dynamic JSON-LD schema graphs, and outrank legacy competitors.',
      stack: ['Programmatic SEO', 'Schema.org', 'Ahrefs/Semrush', 'Search Console', 'Lighthouse'],
      capstone: '10,000-Page Programmatic SEO Directory with Sub-1s LCP'
    },
    {
      id: 'blockchain',
      title: 'Blockchain development',
      domain: 'Development',
      badge: 'Web3',
      description: 'Write smart contracts on EVM. Master Solidity, gas optimization, smart contract security audits, Hardhat testing suites, and Web3 frontend integration.',
      stack: ['Solidity', 'Hardhat', 'Ethers.js', 'Ethereum', 'OpenZeppelin', 'IPFS'],
      capstone: 'Decentralized Escrow & Digital Credential Verification Protocol'
    },
    {
      id: 'iot',
      title: 'Internet of Things (IoT)',
      domain: 'Cloud & Infra',
      badge: 'Hardware & Edge',
      description: 'Connect physical hardware to the cloud. Program microcontrollers, configure MQTT brokers, process real-time sensor streams, and design low-power edge telemetry.',
      stack: ['ESP32', 'Raspberry Pi', 'C++', 'MQTT', 'Node.js', 'InfluxDB'],
      capstone: 'Smart Remote Environmental & Power Monitoring Telemetry Hub'
    },
    {
      id: 'qa-testing',
      title: 'QA & Software Testing Automation',
      domain: 'Development',
      badge: 'Quality First',
      description: 'Eliminate regression bugs before they hit production. Build automated end-to-end test suites with Playwright and Cypress, write API tests in Postman, and integrate with CI.',
      stack: ['Playwright', 'Cypress', 'Jest', 'Postman', 'GitHub Actions', 'SonarQube'],
      capstone: 'End-to-End Automated Testing Matrix for SaaS Applications'
    },
    {
      id: 'social-media',
      title: 'Social media management & Brand',
      domain: 'Marketing & Product',
      badge: 'Brand Authority',
      description: 'Build organic developer and brand authority across LinkedIn, Twitter/X, and Instagram. Master content hooks, aesthetic carousel curation, and community distribution.',
      stack: ['Brand Architecture', 'Figma', 'Buffer/Hootsuite', 'Viral Hooks', 'Analytics'],
      capstone: '0 to 10k Organic Tech Community Growth Campaign'
    }
  ];

  const filteredPaths = paths.filter((p) => {
    const matchesDomain = selectedDomain === 'All' || p.domain === selectedDomain;
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.stack.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesDomain && matchesSearch;
  });

  return (
    <div className="bg-surface text-left overflow-hidden">
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-16 px-4 md:px-8 lg:px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">route</span>
            BitElevate Core Dimensions
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-black text-on-surface tracking-tight leading-tight">
            Architect your own future.
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant font-medium leading-relaxed">
            We’ve demolished the rigid curriculum. At BitElevate, your path is an evolving ecosystem tailored to your unique professional DNA across 16+ high-demand dimensions.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-4">
            <div className="p-4 bg-surface-container rounded-2xl border border-outline-variant/15 flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-xl mt-0.5">route</span>
              <div>
                <strong className="text-sm text-on-surface">Non-Linear Mastery:</strong>
                <p className="text-xs text-on-surface-variant mt-0.5">Jump between modules as your project demands. We focus on verified outcome, not arbitrary sequence.</p>
              </div>
            </div>
            <div className="p-4 bg-surface-container rounded-2xl border border-outline-variant/15 flex items-start gap-3">
              <span className="material-symbols-outlined text-secondary text-xl mt-0.5">bolt</span>
              <div>
                <strong className="text-sm text-on-surface">AI-Driven Customization:</strong>
                <p className="text-xs text-on-surface-variant mt-0.5">Our platform adapts to your pace, evaluating pull requests and highlighting precise concepts to strengthen.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-8 px-4 md:px-8 lg:px-12 bg-surface-container-low border-y border-outline-variant/10 sticky top-[73px] z-20 backdrop-blur-md bg-surface/90">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Domain tabs */}
          <div className="flex flex-wrap gap-2">
            {domains.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDomain(d)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedDomain === d
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-white border border-outline-variant/25 text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search skills, tools, or tracks..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-full bg-white border border-outline-variant/30 text-on-surface focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
      </section>

      {/* 16+ Paths Grid */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto space-y-8">
          <div className="text-xs font-black uppercase tracking-wider text-on-surface-variant/70">
            Showing {filteredPaths.length} of {paths.length} Available Dimensions
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPaths.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-3xl p-8 border border-outline-variant/15 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {p.domain}
                    </span>
                    <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">
                      {p.badge}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold font-headline text-on-surface group-hover:text-primary transition-colors">
                    {p.title}
                  </h3>

                  <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                    {p.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                      Tech Ecosystem:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {p.stack.map((item, idx) => (
                        <span key={idx} className="text-[10px] font-mono font-bold bg-surface-container px-2.5 py-0.5 rounded-lg text-on-surface-variant">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-surface-container/60 border border-outline-variant/10 space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-secondary">
                      Production Capstone Project:
                    </div>
                    <div className="text-xs font-bold text-on-surface">
                      {p.capstone}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-outline-variant/10 flex items-center justify-between">
                  <span className="text-xs font-bold text-primary font-headline">60-Day Track</span>
                  <button
                    onClick={() => openModal(`Enroll in ${p.title} - BitElevate`, 'bitelevate')}
                    className="bg-primary text-on-primary px-5 py-2.5 rounded-full font-black text-xs uppercase tracking-wider hover:bg-primary-container transition-all flex items-center gap-1.5"
                  >
                    Select Track <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 md:px-8 bg-surface text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-headline font-black text-on-surface tracking-tight">
            Can't decide on a single track?
          </h2>
          <p className="text-on-surface-variant text-base font-medium">
            Speak with our engineering advisors to design an individualized cross-domain learning roadmap.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button 
              onClick={() => openModal('Speak with Engineering Advisor', 'bitelevate')}
              className="bg-primary text-on-primary px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest shadow-lg hover:bg-primary-container transition-all flex items-center gap-2"
            >
              Speak to an advisor <ArrowRight className="w-4 h-4" />
            </button>
            <Link 
              to="/diaries" 
              className="px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest bg-white border border-outline-variant/30 text-on-surface hover:bg-surface-container transition-all"
            >
              Read Student Diaries
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

