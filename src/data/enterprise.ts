// Enterprise work: things delivered for organisations. No employer names, no dates.
// Keep every line factual: `role` is what Raymond actually did (credit vendors for their part),
// `tools` is a short line of what was used. The full tool list lives in src/data/tools.ts.
// Related work shares a card (the service desk and the GitLab pipeline it feeds; security and
// tracking on the same regional sites). Four cards fill the two-column grid; add a fifth only
// with a sixth, or the grid ends on a lone card.
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
    category: 'ITSM · DevOps',
    title: 'From request to release for business systems',
    summary:
      'Users report issues and raise change and service requests in Jira Service Management. Salesforce and Business Central changes then go through GitLab, with approval-gated CI/CD and basic security scans, each linked to its request.',
    role: 'Set up the service desk end to end and GitLab with its Jira link, and set the pipeline standards the vendor follows',
    tools: 'Jira Service Management · GitLab CI/CD · SAST/DAST',
  },
  {
    category: 'E-commerce',
    title: 'Moving an online store to a new platform',
    summary:
      'A direct-to-consumer store moved from SAP Commerce Cloud to Shopline, with its UI/UX and integrations redesigned.',
    role: 'Led the migration, working with the vendor',
    tools: 'SAP Commerce Cloud → Shopline',
  },
  {
    category: 'Security · Analytics',
    title: 'Securing and measuring regional sites',
    summary:
      'Regular application and platform security scans, backed by WAF rules and SSL certificates, and one tracking setup so every market measures traffic and conversions the same way.',
    role: 'Ran the scans and worked with vendors and teams to fix what they found; defined the tracking standard and rolled it out',
    tools: 'Security scans · WAF · SSL/TLS · GA4 · GTM',
  },
  {
    category: 'CRM',
    title: 'Taking Salesforce live, then improving it',
    summary: 'A Salesforce rollout taken through go-live with the business teams and the implementation partner, then supported with fixes and enhancements.',
    role: 'Supported go-live, then handled bug fixes, enhancements and change requests',
    tools: 'Salesforce',
  },
];
