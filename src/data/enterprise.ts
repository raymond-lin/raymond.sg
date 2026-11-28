// Enterprise work, one card per area of expertise. No employer names, no dates, no counts of users,
// countries or markets, no cost figures, nothing about managing people.
// Lead with what Raymond set up, configured, moved or fixed; working with vendors is fine to mention.
// `role` is what Raymond actually did (credit vendors and partners for their part),
// `tools` is a short line of what was used. The full tool list lives in src/data/tools.ts.
// Four cards fill the two-column grid; add a fifth only with a sixth, or the grid ends on a lone card.
// Order: strongest first for solution delivery.
export interface EnterpriseItem {
  category: string;
  title: string;
  summary: string;
  role: string;
  tools: string;
}

export const enterprise: EnterpriseItem[] = [
  {
    category: 'Business systems',
    title: 'Moving, launching and running business platforms',
    summary:
      'A direct-to-consumer store moved from SAP Commerce Cloud to Shopline, with its UI/UX and integrations redesigned. Salesforce Service Cloud and Marketing Cloud taken live, and brand sites run on AEM, Sitecore, Drupal, WordPress and Experience Cloud.',
    role: 'Led the store migration with the vendor, supported the Salesforce go-live and its change requests, and looked after the CMS sites',
    tools: 'Shopline · SAP Commerce Cloud · Salesforce · AEM · Sitecore',
  },
  {
    category: 'ITSM · DevOps',
    title: 'From request to release',
    summary:
      'Users, agents and vendors raise issues, change and service requests in Jira Service Management. Salesforce and Business Central changes then go through GitLab, with approval-gated CI/CD and basic security scans, each linked to its request.',
    role: 'Set up Jira Service Management end to end and GitLab with its Jira link, and set the pipeline standards the vendor follows',
    tools: 'Jira Service Management · GitLab CI/CD · SAST/DAST',
  },
  {
    category: 'Security · Infrastructure',
    title: 'Finding and fixing vulnerabilities',
    summary:
      'Regular application and platform scans of Salesforce and the websites my team looks after, backed by WAF rules, SSL certificates and domain and DNS management, in line with PDPA.',
    role: 'Ran the scans, handled vulnerability incidents with vendors and teams until each was fixed, and looked after DNS, SSL and WAF',
    tools: 'Security scans · WAF · SSL/TLS · DNS',
  },
  {
    category: 'Analytics',
    title: 'One way to measure every site',
    summary:
      'GA4, Google Tag Manager and Microsoft Clarity set up the same way on every regional site, so traffic and conversions are measured alike.',
    role: 'Defined the tracking standard and implemented it across the sites',
    tools: 'GA4 · GTM · Clarity · Search Console',
  },
];
