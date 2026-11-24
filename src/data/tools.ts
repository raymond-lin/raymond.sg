// Tools & platforms. Rule of thumb: only list what you'd happily discuss for ten minutes in an interview.
export interface ToolRow { label: string; items: string[]; mono?: boolean }

export const tools: ToolRow[] = [
  { label: 'Business systems', items: ['Salesforce CRM', 'Salesforce Service Cloud', 'Salesforce Marketing Cloud', 'Jira Service Management', 'Business Central', 'SAP Marketing Cloud', 'Coupa', 'DocuSign'] },
  { label: 'Commerce, CMS & payments', items: ['SAP Commerce Cloud', 'Shopline', 'Magento', 'Adobe Experience Manager', 'Drupal', 'WordPress', 'Stripe', 'PayPal', 'WorldPay'] },
  { label: 'AI, automation & BI', items: ['Microsoft 365 Copilot', 'Copilot agents', 'Claude Code', 'LLM integration', 'Power Automate', 'Power Apps', 'Power BI'] },
  { label: 'Languages', items: ['TypeScript', 'JavaScript (Node.js)', 'Java', 'C#', 'PHP', 'Python', 'VB.NET', 'SQL', 'PowerShell'], mono: true },
  { label: 'Frontend', items: ['React', 'Next.js', 'Astro', 'Vite', 'MDX', 'Browser extensions (WXT, Manifest V3)', 'HTML', 'CSS / Tailwind'] },
  { label: 'Backend & data', items: ['ASP.NET', 'AWS Lambda', 'API Gateway', 'Supabase (Postgres + RLS)', 'DynamoDB', 'MySQL', 'MSSQL', 'REST & event-driven APIs', 'Google Maps API'] },
  { label: 'Cloud & delivery', items: ['Git', 'AWS (serverless)', 'Google Cloud', 'Azure', 'Cloudflare (Workers, DNS)', 'Vercel', 'Docker', 'GitHub Actions', 'GitLab CI/CD', 'SonarQube (SAST)', 'Vitest', 'Playwright'] },
  { label: 'Analytics & SEO', items: ['GA4', 'Google Tag Manager', 'Microsoft Clarity', 'Google Search Console', 'Bing Webmaster Tools', 'SEO'] },
  { label: 'Security & compliance', items: ['DNS', 'SSL/TLS', 'WAF', 'OWASP Top 10', 'IAM and access management', 'PCI DSS (payment reviews)', 'PDPA', 'GDPR'] },
];
