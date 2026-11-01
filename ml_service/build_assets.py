from pathlib import Path
import json, csv, textwrap

ROOT = Path(__file__).resolve().parent
DATA = ROOT / 'data'
DATA.mkdir(exist_ok=True)

# Structured, source-linked extraction of public Cynbit website pages inspected on 2026-11-01.
# Case-study problem/solution/outcome wording is transcribed from the public pages; product/service/blog
# entries are concise structured extracts, not complete page archives.
docs = []
def add(id, title, kind, url, text, category=None, metadata=None):
    docs.append({
        'id': id, 'title': title, 'type': kind, 'category': category,
        'url': url, 'text': text.strip(), 'metadata': metadata or {},
        'source_status': 'public_page_extracted_2026-11-01'
    })

base='https://www.cynbit.in'
add('home','Cynbit Technologies – Company overview','company',base,
    'Cynbit Technologies is a software and AI automation company based in Jaipur, Rajasthan. Public website describes autonomous AI agents, custom software development, scalable business platforms, custom IT infrastructure, proprietary SaaS products, AI-first thinking, end-to-end development, cloud infrastructure and digital marketing. The company also describes a social impact partnership with Manav Seva Trust for computer and IT teaching in rural areas and government schools.',
    'company', {'location':'Jaipur, Rajasthan'})
add('services-ai','AI automation and autonomous agents','service',base+'/services',
    'Cynbit describes autonomous AI agents and cognitive automation, smart assistants that manage leads and coordination, LLM automation for manual data entry and document handling, AI voice agents, and integration of AI stacks into existing SaaS platforms.',
    'AI Automation', {'keywords':['autonomous agents','LLM automation','AI voice agents','workflow automation']})
add('services-software','Full-stack and backend software development','service',base+'/services',
    'Cynbit describes scalable web and mobile platforms, full-stack development, secure backend systems, cloud solutions and legacy system modernization. Publicly listed frameworks include React, Next.js, NestJS, FastAPI, Django and Tailwind; languages include TypeScript, Python, Go, Rust, Java and C++.',
    'Software Development', {'keywords':['web application','mobile app','backend','SaaS','legacy migration']})
add('services-cloud','Cloud infrastructure and migration','service',base+'/services',
    'Cynbit describes cloud infrastructure and deployment across AWS and Azure, secure cloud foundations, cloud migration and modernization of monolithic systems into distributed systems. The services page lists cloud and operations technologies including Docker, Kubernetes, Terraform and CI/CD.',
    'Cloud Infrastructure', {'keywords':['AWS','Azure','Docker','Kubernetes','Terraform','migration']})
add('services-marketing','Digital marketing, SEO and CRM automation','service',base+'/services',
    'Cynbit describes performance advertising, technical SEO, CRM automation and funnel optimization. The public service page mentions Google and Meta Ads, technical SEO, automated lead nurturing and conversion-focused landing pages.',
    'Digital Marketing & SEO', {'keywords':['SEO','Google Ads','Meta Ads','CRM','lead generation','funnels']})
add('product-studio','Cynbit Studio','product',base+'/products#cynbit-studio',
    'Cynbit Studio is described as an AI-powered career growth and learning platform for students and developers. Public features include placement assessment, adaptive learning paths, AI coding missions, AI code evaluation, AI mentor support, mock interviews, resume tools, job matching analysis, skill tracking and certificates.',
    'EdTech & Career Learning', {'product':'Cynbit Studio'})
add('product-tenantease','TenantEase','product',base+'/products#tenantease',
    'TenantEase is described as a smart property and tenant management platform. Public features include property and unit tracking, tenant profiles, rent and payment tracking, automated reminders, payment history, occupancy and revenue dashboards.',
    'Property Management', {'product':'TenantEase'})
add('product-revio','Revio','product',base+'/products#revio',
    'Revio is described as an AI reputation and sentiment management platform. Public features include cross-platform review sync, AI-assisted review responses, sentiment intelligence, crisis detection, multi-location management and role-based access for admins, managers and advisors.',
    'Reputation Management', {'product':'Revio'})

cases = [
('case-wizhealth','WizHealth','AI Diagnostic Triage: Enhancing Medical Efficiency.','Healthcare','Clinicians were overwhelmed with a high volume of symptoms, making it difficult to prioritize urgent cases effectively.','Built an AI model that categorizes symptoms based on severity and urgency, integrating directly with existing patient records.','Improved triage efficiency by 25% and reduced turnaround time for urgent patient consultations.','AI / Machine Learning, healthcare workflow, patient records','wizhealth-ai-diagnostic'),
('case-pragya','Pragya Healths','IoT Remote Patient Monitoring for Rural Health.','Healthcare','Chronic patients in remote areas lacked consistent monitoring, leading to avoidable emergency situations.','Developed a mobile app that syncs vitals from wearable devices to a central clinician dashboard with automated alerts.','Achieved a 40% reduction in emergency room visits for patients enrolled in the monitoring program.','IoT, mobile app, wearable integration, dashboards, alerts','pragya-healths-remote-monitoring'),
('case-wild-basil','Wild Basil','Blockchain-Lite Transparency for Sustainable Food.','Food / Supply Chain','Customers were increasingly demanding proof of sourcing for organic labels, which was difficult to provide manually.','Built a QR-based tracking system that allows customers to scan a meal and see the entire journey from farm to table.','Strengthened brand trust and drove a 20% increase in premium subscription orders.','Supply-chain traceability, QR codes, tracking','wild-basil-supply-chain'),
('case-sofiasa','Sofiasa','Modernizing Legacy ERP for the Digital Era.','Enterprise Software','An outdated UI/UX made the platform difficult to navigate, resulting in slow employee onboarding and high error rates.','Re-engineered the frontend using React and a custom design system focused on efficiency and cognitive load reduction.','Reduced employee onboarding time by 60% and increased daily active users by 30%.','ERP modernization, React, frontend engineering, UX','sofiasa-erp-modernization'),
('case-econtentprep','EContentPrep','AI-Driven Adaptive Learning Pathways for EdTech.','Education / EdTech','Static curriculum paths lead to disengagement and lower completion rates among diverse learner groups.','Created an adaptive engine that analyzes performance data to dynamically adjust lesson difficulty and format.','Increased course completion rates by 45% and significantly improved student satisfaction scores.','AI, adaptive learning, performance analytics, EdTech','econtentprep-adaptive-learning'),
('case-cloudy-tales','Cloudy Tales','Real-time Collaborative Engine for Digital Storytellers.','Software / Collaboration','Users experienced significant lag and document conflicts when multiple writers attempted to edit simultaneously.','Refactored the communication layer using optimized WebSockets and Conflict-free Replicated Data Types (CRDTs).','Delivered a zero-latency collaborative environment supporting 50k+ active writers globally.','WebSockets, CRDTs, real-time collaboration, backend','cloudy-tales-collaboration'),
('case-urban-wardrobe','Urban Wardrobe','AR Virtual Try-On: Redefining the Fashion Experience.','Retail / Fashion','High return rates due to sizing and fit issues were eroding profit margins for the online boutique.','Developed a mobile-optimized AR fitting room that utilizes camera data to provide accurate size recommendations and visual overlays.','Saw a 22% reduction in return rates and a 15% increase in average order value (AOV).','AR, e-commerce, mobile UX, recommendations','urban-wardrobe-ar-integration'),
('case-evento','Evento','Scaling Real-time Ticketing for Major Entertainment.','Events / Ticketing','Legacy servers frequently crashed during high-demand ticket drops, leading to lost revenue and customer frustration.','Implemented a serverless architecture with elastic scaling and a prioritized queuing system using AWS Lambda and SQS.','Successfully managed 100k+ concurrent users with zero downtime during the Summer Beats tour.','AWS Lambda, SQS, serverless, scalability, ticketing','evento-ticketing-scalability'),
('case-marketing-addict','Marketing Addict','AI-Powered Campaign Optimization for Global Marketing.','Marketing','Manually managing cross-channel campaigns was inefficient and led to fragmented data silos, making it difficult to measure true ROI.','Integrated an AI-driven analytics engine that unified data from Meta, Google, and TikTok, providing real-time spend recommendations.','Achieved a 35% improvement in client ROI and reduced manual reporting time by 50%.','AI analytics, marketing, predictive recommendations, dashboards','marketing-addict-ai-optimization'),
('case-globalpay','GlobalPay','Revolutionizing cross-border payments for the next billion users.','Fintech','Existing systems struggled with high latency and complex regulatory compliance across multiple jurisdictions.','Built a microservices-based ledger system using Node.js and PostgreSQL, deployed on an auto-scaling Kubernetes cluster with real-time fraud detection.','Successfully handled 2.4M+ active daily users with sub-200ms transaction latency and stated compliance across 15 countries.','Fintech, Node.js, PostgreSQL, Kubernetes, fraud detection','fintech-payments-evolution'),
('case-elitevogue','EliteVogue','Next-Gen Headless Commerce for Global Fashion.','Retail / E-commerce','Legacy monolithic commerce platform was too slow for modern mobile users and difficult to scale globally.','Architected a headless commerce solution using Next.js for the frontend and a decoupled GraphQL API for backend services.','Reduced load speed to 0.8s on average and saw a 38% increase in conversion rate within the first quarter.','Next.js, GraphQL, headless commerce, performance','fashion-headless-commerce'),
('case-careplus','CarePlus','Migrating critical health data to the cloud with zero downtime.','Healthcare / Cloud','Managing large volumes of sensitive data while ensuring 24/7 availability for emergency medical services.','Implemented a phased migration strategy using AWS Snowball and real-time database replication, with a focus on zero-trust security architecture.','Completed migration 3 months ahead of schedule with zero data loss and a stated 100% security audit pass rate.','Cloud migration, AWS, replication, security','healthcare-cloud-migration'),
('case-trendmart','TrendMart','Hyper-local SEO strategy yields record organic growth for retail chain.','Retail / Marketing','Low visibility in local search results despite having a strong physical presence.','Developed a custom location-based landing page engine and implemented an automated technical SEO audit system.','Achieved a 140% increase in organic traffic and a 60% boost in store visits directly from search results.','Technical SEO, local SEO, automation, retail','retail-seo-growth'),
]
for id,client,title,industry,challenge,solution,outcome,tech,slug in cases:
    add(id, f'{client}: {title}', 'case_study', f'{base}/case-studies/{slug}',
        f'Client/project: {client}. Industry: {industry}. Challenge: {challenge} Solution: {solution} Published outcome: {outcome} Technologies and capabilities: {tech}.',
        industry, {'client_label':client,'challenge':challenge,'solution':solution,'outcome_as_published':outcome,'technologies':tech.split(', ')})

blogs = [
('blog-ai-support','Future of AI-Powered Customer Support Systems','AI Chatbots','February 26, 2026','https://www.cynbit.in/blog/future-ai-customer-support','Cynbit discusses embedded and proactive AI support, predictive friction analysis, multimodal support, sentiment-aware interaction, human handoff and RAG-grounded support knowledge. The article emphasizes privacy-first handling for sensitive inputs.'),
('blog-ai-agents','How AI Agents Are Transforming Business Operations in 2026','AI Agents','October 13, 2025','https://www.cynbit.in/blog/ai-agents-business-operations','Cynbit describes AI agents as LLM-powered systems that can reason, use tools, observe outcomes and maintain memory. Examples include sales outreach, procurement and DevOps. The article emphasizes human-in-the-loop controls, sandboxing, observability and avoiding agent loops.'),
('blog-small-business','How Small Businesses Can Automate Operations Using AI','Business Automation','January 3, 2026','https://www.cynbit.in/blog/small-business-ai-automation','Cynbit discusses identifying repetitive tasks, lead response, follow-ups, document extraction, invoicing, meeting intelligence, content repurposing and SEO automation. It recommends starting with a process audit and expanding in stages.'),
('blog-lead-gen','How Companies Are Using AI for Lead Generation in 2026','Marketing','May 1, 2025','https://www.cynbit.in/blog/ai-lead-generation','Cynbit discusses signal-based prospect research, lookalike modelling using case studies, personalized outreach, interactive lead-capture tools, first-party data and human-assisted qualification. Use privacy-conscious first-party visitor data.'),
('blog-ai-trends','Best AI Automation Trends for Businesses in 2026','AI Automation','December 15, 2024','https://www.cynbit.in/blog/ai-automation-trends-2026','Cynbit discusses autonomous agents, personalized customer experiences, predictive analytics, document extraction and low-code AI platforms. It warns against automating broken processes, ignoring data quality and neglecting monitoring.'),
('blog-crm','Best CRM Automation Strategies for Modern Companies in 2026','IT Strategy','January 30, 2026','https://www.cynbit.in/blog/best-crm-automation-strategies','Cynbit describes AI-assisted CRM data capture, lead scoring and routing, relationship mapping, churn prevention, personalized follow-ups and integrations. It warns about over-automation, dirty data and lack of human oversight.'),
('blog-dashboard','Why Every Startup Needs a Custom Dashboard in 2026','SaaS Development','February 8, 2025','https://www.cynbit.in/blog/why-startups-need-custom-dashboards','Cynbit explains custom operational dashboards, data integration, anomaly detection, drill-down analytics and operational metrics. Technologies discussed include Next.js, D3.js, Go or Node.js, TimescaleDB and ClickHouse.'),
('blog-ai-software','AI vs Traditional Software Development in 2026','Software Development','April 4, 2025','https://www.cynbit.in/blog/ai-vs-traditional-software','Cynbit discusses AI-native software lifecycles, model-first design, AI-assisted QA and predictive maintenance, while emphasizing human engineering oversight, security and verification.'),
('blog-privacy','Data Privacy as a Competitive Advantage','Marketing / Privacy','August 28, 2024','https://www.cynbit.in/blog/data-privacy-advantage','Cynbit frames ethical data collection and privacy as foundations of customer trust. This content supports privacy-aware data collection and transparent handling in SmartConnect AI.'),
]
for id,title,tag,date,url,summary in blogs:
    add(id,title,'blog',url,summary,tag,{'published_date':date,'topic':tag})

add('contact','Contact and enquiry information','contact',base+'/contact',
    'Cynbit contact page provides an enquiry form with required full name, email address and message fields, plus optional company and industry. It publishes opportunities@cynbit.in and support@cynbit.in, phone numbers +91 89479 62667 and +91 78912 09777, and an address in Pratap Nagar, Jaipur, Rajasthan. Users can ask to discuss a project by email or phone.',
    'contact', {'emails':['opportunities@cynbit.in','support@cynbit.in'],'phone_numbers':['+91 89479 62667','+91 78912 09777'],'city':'Jaipur, Rajasthan'})

with (DATA/'cynbit_public_content.json').open('w',encoding='utf-8') as f:
    json.dump({'source':'https://www.cynbit.in/','sitemap_url':'https://www.cynbit.in/sitemap.xml','crawl_date':'2026-11-01','sitemap_url_count':82,'note':'This is a structured extraction/summary of selected publicly accessible pages inspected for this prototype, not a complete archive of all 82 URLs. The scraper script can refresh public pages while respecting robots.txt.','documents':docs},f,ensure_ascii=False,indent=2)

# Curated synthetic training examples. These are not real visitor prompts or customer data.
examples = {
'AI Automation':[
'We need an AI chatbot to answer customer questions on our website.',
'Automate repetitive support tickets and route complex queries to staff.',
'Build autonomous AI agents for our sales and operations teams.',
'We want an LLM workflow to extract information from invoices and documents.',
'Connect an AI voice assistant to our appointment booking process.',
'Automate lead follow ups and customer communication using AI.',
'Use machine learning to classify incoming support requests by urgency.',
'We need an intelligent assistant that can search our company knowledge base.',
'Our employees copy data between tools and we want to automate this workflow.',
'Create an AI agent that can research information and prepare reports.',
'Build a document processing system that reads forms and extracts fields.',
'We need generative AI integrated into our existing SaaS product.',
'Help us automate customer onboarding with an intelligent assistant.',
'We want to reduce manual data entry using NLP and AI.',
'Create a conversational assistant with human escalation.',
'We need an AI workflow that categorizes and responds to incoming emails.',
],
'Software Development':[
'Build a custom web application for our business.',
'We need a scalable SaaS platform with user accounts and dashboards.',
'Develop a mobile app connected to our existing backend.',
'Our old ERP interface is difficult to use and needs modernization.',
'Create a real time collaboration application for multiple users.',
'We need a GraphQL API and a modern Next.js frontend.',
'Develop a ticket booking platform that can handle many users.',
'Build a custom backend system and integrate third party APIs.',
'We want to migrate our monolithic application to a modern architecture.',
'Create an e commerce website with a headless commerce architecture.',
'We need a secure web portal for customers and employees.',
'Develop a dashboard application to manage our operations.',
'Build a mobile optimized application with camera based AR features.',
'We need software development support for a new digital product.',
'Our application needs better performance and scalable backend services.',
'Create a platform with real time updates and WebSocket communication.',
],
'Cloud Infrastructure':[
'Migrate our application and database to AWS.',
'We need a secure cloud infrastructure on Azure.',
'Our servers crash when traffic suddenly increases.',
'Deploy our containers using Kubernetes and Docker.',
'We need autoscaling infrastructure for our SaaS application.',
'Migrate legacy systems to a cloud environment with minimal downtime.',
'Create a disaster recovery and backup strategy for our cloud services.',
'Our API needs better availability and infrastructure monitoring.',
'Set up CI CD pipelines and infrastructure as code with Terraform.',
'We need a zero trust cloud architecture for sensitive information.',
'Build a serverless architecture for event driven workloads.',
'Improve database replication and cloud reliability.',
'We need to modernize our monolithic infrastructure.',
'Plan a phased cloud migration for our enterprise applications.',
'Our platform needs resilient hosting across multiple environments.',
'Help us optimize cloud deployment and operations.',
],
'Digital Marketing & SEO':[
'Improve our website ranking on Google search.',
'We need technical SEO and site audit automation.',
'Run Google and Meta advertising campaigns for lead generation.',
'Build a marketing funnel and improve landing page conversions.',
'We want to automate CRM follow ups for new leads.',
'Increase local search visibility for our retail locations.',
'Analyze campaign performance and optimize advertising spend.',
'We need content and keyword strategy for organic growth.',
'Help us improve our digital marketing and online presence.',
'Create location based landing pages for our stores.',
'Our marketing data is fragmented across platforms and needs reporting.',
'We need automated lead nurturing and campaign management.',
'Improve our paid advertising return on investment.',
'We want SEO monitoring and technical recommendations.',
'Build a marketing analytics dashboard for multiple ad channels.',
'Help us improve organic traffic and search performance.',
],
'Property Management':[
'We need software to manage rental properties and tenants.',
'Track rent collection and automatically remind tenants about dues.',
'Manage building units and check which rooms are vacant.',
'Create digital tenant profiles with contact and ID records.',
'We want a property management dashboard for rental income.',
'Our property business uses notebooks to track rent payments.',
'Build a system for landlords to manage multiple buildings.',
'We need automated rent reminders and payment history.',
'Track occupancy and revenue across our rental properties.',
'Create an application for property owners and tenants.',
'We need to manage leases, tenants and unit availability.',
'Centralize property records and rental payment information.',
'Build a digital platform for residential property management.',
'Help us replace manual tenant tracking with software.',
'We want to monitor rent collection across multiple locations.',
'Create a tenant management portal with notifications.',
],
'EdTech & Career Learning':[
'Build an adaptive learning platform for students.',
'We need an AI coding mentor for programming learners.',
'Create coding assessments and evaluate code quality automatically.',
'Build a platform for mock technical interviews and resume preparation.',
'We want personalized learning paths based on student performance.',
'Create an online coding practice platform with progress tracking.',
'We need a student skill assessment and certificate system.',
'Develop an AI mentor that gives hints for programming challenges.',
'Build an education platform that adjusts lesson difficulty.',
'Help students prepare for placements with coding missions.',
'We need a dashboard to track student learning progress.',
'Create an employability platform for developers.',
'We want AI feedback on code quality rather than only test results.',
'Build a job matching and resume tool for students.',
'Develop a personalized computer science learning application.',
'Create a platform combining learning, assessments and career preparation.',
],
'Reputation Management':[
'Monitor customer reviews from multiple platforms.',
'We need AI to draft responses to Google reviews.',
'Analyze customer feedback and detect negative sentiment.',
'Manage online reputation for all our business branches.',
'We want to sync reviews across social and review platforms.',
'Alert our team when negative reviews appear online.',
'Create a dashboard to monitor brand sentiment by location.',
'Automate customer review replies while allowing human approval.',
'We need a reputation management platform for a multi location brand.',
'Track ratings and review trends for our stores.',
'Identify potential reputation crises from customer feedback.',
'Centralize review monitoring and response management.',
'We need sentiment analysis for online customer comments.',
'Help our team respond consistently to customer reviews.',
'Build a tool to monitor brand reputation across review sites.',
'Manage review workflows for admins, managers and branch advisors.',
]
}
with (DATA/'intent_training.csv').open('w',newline='',encoding='utf-8') as f:
    w=csv.writer(f); w.writerow(['text','label','data_origin'])
    for label,rows in examples.items():
        for x in rows: w.writerow([x,label,'curated_synthetic_example_not_customer_data'])

# Catalogue documents for human-readable service recommendation display.
with (DATA/'README_DATA.md').open('w',encoding='utf-8') as f:
    f.write(textwrap.dedent('''\
    # Dataset notes

    `cynbit_public_content.json` contains structured content extracted from publicly accessible Cynbit pages inspected on 2026-11-01. It includes the service page, products, contact information, 13 case studies and selected blog pages. It is a useful prototype corpus, not a full 82-page archive. The public sitemap advertised 82 URLs.

    `intent_training.csv` contains curated synthetic example queries labelled against Cynbit's public capability categories. These are not real customer prompts, enquiries, CRM records or production labels. They are used only to demonstrate a baseline intent classifier.

    Case-study outcomes and other claims are transcribed as they appear on the public pages. They have not been independently audited. Keep the source URL attached when showing them and do not convert them into guarantees.

    To refresh the corpus, run `python src/scrape_cynbit.py --max-pages 82 --output data/live_scrape.json`. The scraper observes `robots.txt`, honours the advertised crawl delay, and skips disallowed paths. Review any refreshed content before using it in a production assistant.
    '''))

print(f'Wrote {len(docs)} public content documents and {sum(map(len,examples.values()))} synthetic training examples.')
