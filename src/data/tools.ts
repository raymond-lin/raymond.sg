// Tools & platforms. Rule of thumb: only list what you'd happily discuss for ten minutes in an interview.
// Leave out chips another chip already implies (Git next to GitHub Actions and GitLab CI/CD, HTML next to
// React, SEO under "Analytics & SEO") and details of one project (Vite, MDX, Google Maps API), which
// belong on that project's card. Prefer a specific name over a broad label when adding something new.
export interface ToolRow { label: string; items: string[]; mono?: boolean }

export const tools: ToolRow[] = [
  { label: 'Business systems', items: ['Salesforce CRM', 'Salesforce Service Cloud', 'Salesforce Marketing Cloud', 'Jira Service Management', 'Business Central', 'SAP Marketing Cloud', 'Coupa', 'DocuSign'] },
  { label: 'Commerce, CMS & payments', items: ['SAP Commerce Cloud', 'Shopline', 'Magento', 'Adobe Experience Manager', 'Drupal', 'WordPress', 'Stripe', 'PayPal', 'WorldPay'] },
  { label: 'AI, automation & BI', items: ['Microsoft 365 Copilot', 'Copilot agents', 'Claude Code', 'LLM integration', 'Power Automate', 'Power Apps', 'Power BI'] },
  { label: 'Languages', items: ['TypeScript', 'JavaScript', 'SQL', 'PHP', 'Python', 'C#', 'Java', 'VB.NET', 'PowerShell'], mono: true },
  { label: 'Frontend', items: ['React', 'Next.js', 'Astro', 'CSS / Tailwind', 'Browser extensions (WXT)'] },
  { label: 'Backend & data', items: ['Node.js', 'AWS Lambda', 'API Gateway', 'Supabase (Postgres)', 'DynamoDB', 'REST APIs', 'Event-driven design', 'MySQL', 'MSSQL', 'ASP.NET'] },
  { label: 'Cloud & delivery', items: ['AWS (serverless)', 'Google Cloud', 'Azure', 'Cloudflare', 'Vercel', 'Docker', 'GitHub Actions', 'GitLab CI/CD', 'SonarQube (SAST)', 'Vitest', 'Playwright'] },
  { label: 'Analytics & SEO', items: ['GA4', 'Google Tag Manager', 'Microsoft Clarity', 'Google Search Console'] },
  { label: 'Security & compliance', items: ['DNS', 'SSL/TLS', 'WAF', 'OWASP Top 10', 'IAM', 'PCI DSS', 'PDPA', 'GDPR'] },
];
