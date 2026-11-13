// Tools & platforms. Rule of thumb: only list what you'd happily discuss for ten minutes in an interview.
export interface ToolRow { label: string; items: string[]; mono?: boolean }

export const tools: ToolRow[] = [
  { label: 'Enterprise platforms', items: ['Salesforce CRM', 'Salesforce Service Cloud', 'Salesforce Marketing Cloud', 'Jira Service Management', 'Business Central', 'SAP Marketing Cloud', 'DocuSign'] },
  { label: 'Commerce & CMS', items: ['SAP Commerce Cloud', 'Shopline', 'Magento', 'Adobe Experience Manager', 'Drupal', 'WordPress'] },
  { label: 'Payments', items: ['Stripe', 'PayPal', 'WorldPay', 'PCI-aligned integrations'] },
  { label: 'AI', items: ['Microsoft 365 Copilot', 'Copilot agents', 'Claude Code', 'Multi-LLM integration'] },
  { label: 'Power Platform & BI', items: ['Power Automate', 'Power Apps', 'Power BI'] },
  { label: 'Languages', items: ['TypeScript', 'JavaScript (Node.js)', 'PHP', 'Python', 'VB.NET'], mono: true },
  { label: 'Frontend', items: ['React', 'Next.js', 'Astro', 'Vite', 'MDX', 'WXT', 'HTML', 'CSS / Tailwind'] },
  { label: 'Backend & data', items: ['Supabase (Postgres + RLS)', 'DynamoDB', 'MySQL', 'MSSQL', 'REST & event-driven APIs'] },
  { label: 'Cloud & delivery', items: ['AWS (serverless)', 'Google Cloud', 'Azure', 'Cloudflare Workers', 'Vercel', 'Docker', 'GitHub Actions', 'GitLab CI/CD', 'SonarQube (SAST)', 'Vitest', 'Playwright'] },
  { label: 'Analytics & SEO', items: ['GA4', 'Google Tag Manager', 'Microsoft Clarity', 'Google Search Console', 'Bing Webmaster Tools', 'SEO'] },
  { label: 'Security & compliance', items: ['DNS', 'SSL/TLS', 'WAF', 'PDPA', 'GDPR'] },
];
