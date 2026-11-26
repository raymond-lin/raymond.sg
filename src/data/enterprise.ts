// Enterprise work: things delivered for organisations. No employer names, no dates, no counts of
// users, countries or markets, no cost figures, nothing about managing people or projects.
// The site is aimed at hands-on roles (full-stack, configuring IT solutions end to end), so lead
// with what Raymond set up, configured or fixed. Working with vendors is fine to mention.
// `role` is what Raymond actually did (credit vendors and partners for their part),
// `tools` is a short line of what was used. The full tool list lives in src/data/tools.ts.
// Four cards fill the two-column grid; add a fifth only with a sixth, or the grid ends on a lone card.
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
      'Users, agents and vendors raise issues, change and service requests in Jira Service Management. Salesforce and Business Central changes then go through GitLab, with approval-gated CI/CD and basic security scans, each linked to its request.',
    role: 'Set up Jira Service Management end to end and GitLab with its Jira link, and set the pipeline standards the vendor follows',
    tools: 'Jira Service Management · GitLab CI/CD · SAST/DAST',
  },
  {
    category: 'Security',
    title: 'Finding and fixing vulnerabilities',
    summary:
      'Regular application and platform scans of Salesforce and every website my team looks after, backed by WAF rules and SSL certificates. Vulnerabilities and security incidents are followed from triage through to the fix.',
    role: 'Ran the scans and handled vulnerability incidents, working with vendors and teams until each one was fixed',
    tools: 'Security scans · WAF · SSL/TLS',
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
    category: 'CRM',
    title: 'Taking Salesforce live, then improving it',
    summary:
      'Salesforce Service Cloud and Marketing Cloud taken through go-live with the business teams and the implementation partner, then improved with fixes and enhancements.',
    role: 'Joined the project to help take it live, then handled bug fixes, enhancements and change requests',
    tools: 'Service Cloud · Marketing Cloud',
  },
];
