/**
 * Cynbit SmartConnect Lead & Project Handoff Service
 * Prepares structured project briefs and connects them with Cynbit's inquiry workflow.
 */

export class LeadService {
  /**
   * Synthesize a structured project blueprint from conversational context
   */
  generateLeadSummary({ conversationHistory, requirements = {} }) {
    const historyText = (conversationHistory || [])
      .map(m => `${m.role === 'user' ? 'Client' : 'Assistant'}: ${m.content}`)
      .join('\n');

    const industry = requirements.industry || 'Technology / General';
    const problem = requirements.problem || 'Operational Optimization';
    const mainGoal = requirements.goal || 'Custom Architecture & AI Automation';
    const suggestedOffering = requirements.offering || 'Autonomous AI Agents & Custom Software Development';
    const details = requirements.details || [];

    const formattedMessage = [
      `[SmartConnect AI Project Blueprint]`,
      `• Industry Domain: ${industry}`,
      `• Core Business Problem: ${problem}`,
      `• Primary Objective: ${mainGoal}`,
      `• Recommended Cynbit Offering: ${suggestedOffering}`,
      details.length > 0 ? `• Key Specifications:\n  - ${details.join('\n  - ')}` : '',
      `• Handoff Source: SmartConnect AI Interactive Assistant`
    ].filter(Boolean).join('\n\n');

    return {
      summary: {
        industry,
        problem,
        mainGoal,
        suggestedOffering,
        details
      },
      prefillData: {
        industry: this.mapToContactIndustry(industry),
        service: this.mapToContactService(suggestedOffering),
        message: formattedMessage
      },
      ctaPrompt: "Would you like to discuss your requirements with the Cynbit team? We can pre-fill your blueprint into our inquiry form for review."
    };
  }

  mapToContactIndustry(ind) {
    const lower = (ind || '').toLowerCase();
    if (lower.includes('health')) return 'Healthcare & HealthTech';
    if (lower.includes('fintech') || lower.includes('bank') || lower.includes('pay')) return 'Fintech & Banking';
    if (lower.includes('edtech') || lower.includes('school') || lower.includes('college')) return 'EdTech & Academia';
    if (lower.includes('logistics') || lower.includes('supply')) return 'Logistics & Supply Chain';
    if (lower.includes('retail') || lower.includes('ecommerce') || lower.includes('shop')) return 'Retail & Headless eCommerce';
    return 'SaaS & Enterprise Tech';
  }

  mapToContactService(service) {
    const lower = (service || '').toLowerCase();
    if (lower.includes('agent') || lower.includes('ai')) return 'Autonomous AI Agents';
    if (lower.includes('cloud') || lower.includes('devops') || lower.includes('migrat')) return 'Cloud Architecture & Migration';
    if (lower.includes('seo') || lower.includes('marketing')) return 'Technical SEO & Performance Ads';
    if (lower.includes('tenantease') || lower.includes('studio') || lower.includes('revio')) return 'Proprietary SaaS Licensing';
    if (lower.includes('bitelevate')) return 'BitElevate University Partnership';
    return 'Full-Stack Custom Development';
  }
}

export const leadService = new LeadService();

