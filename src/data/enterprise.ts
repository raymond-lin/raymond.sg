// Enterprise work: things delivered for organisations, one card each. No employer names, no dates.
// Keep every line factual: `role` is what Raymond actually did (credit vendors for their part),
// `tools` is a short line of what was used. The full tool list lives in src/data/tools.ts.
// Order: strongest and most recent first; supporting roles last.
export interface EnterpriseItem {
  category: string;
  title: string;
  summary: string;
  role: string;
  tools: string;
}

export const enterprise: EnterpriseItem[] = [
  {
    category: 'DevOps',
    title: 'Source control and CI/CD for business systems',
    summary:
      'Salesforce and Business Central code in GitLab, with approval-gated CI/CD, basic security scans and every change linked to Jira Service Management.',
    role: 'Set up GitLab and the Jira link, and set the pipeline standards the vendor follows',
    tools: 'GitLab · CI/CD · SAST/DAST',
  },
  {
    category: 'E-commerce',
    title: 'Moving an online store to a new platform',
    summary:
      'A direct-to-consumer store moved from SAP Commerce Cloud to Shopline, with its UI/UX and integrations redesigned.',
    role: 'Led the migration from SAP Commerce Cloud to Shopline, working with the vendor',
    tools: 'SAP Commerce Cloud → Shopline',
  },
  {
    category: 'ITSM',
    title: 'A service desk for business systems',
    summary:
      'Jira Service Management for users to report system issues and raise change and service requests, and for agents to work them.',
    role: 'Set up end to end',
    tools: 'Jira Service Management',
  },
  {
    category: 'Security',
    title: 'Keeping regional sites secure',
    summary: 'Regular application and platform security scans across regional sites, backed by WAF rules and SSL certificates.',
    role: 'Ran the scans and worked with vendors and teams to fix what they found',
    tools: 'Security scans · WAF · SSL/TLS',
  },
  {
    category: 'Analytics',
    title: 'One way to measure every market',
    summary: 'The same tracking setup on every regional site, so every market measures traffic and conversions the same way.',
    role: 'Defined the standard and rolled it out',
    tools: 'GA4 · GTM · Search Console · Clarity',
  },
  {
    category: 'CRM',
    title: 'Taking Salesforce live',
    summary: 'A Salesforce rollout taken through go-live with the business teams and the implementation partner.',
    role: 'Supported the project through go-live',
    tools: 'Salesforce',
  },
];
