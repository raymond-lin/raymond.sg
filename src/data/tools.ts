// Tools & platforms. Rule of thumb: only list what you'd happily discuss for ten minutes in an interview.
export interface ToolRow { label: string; items: string[]; mono?: boolean }

export const tools: ToolRow[] = [
  { label: 'Business systems', items: ['Salesforce CRM', 'Salesforce Service Cloud', 'Salesforce Marketing Cloud', 'Jira Service Management', 'Business Central', 'SAP Marketing Cloud', 'Coupa', 'DocuSign'] },
  { label: 'Commerce, CMS & payments', items: ['SAP Commerce Cloud', 'Shopline', 'Magento', 'Adobe Experience Manager', 'Drupal', 'WordPress', 'Stripe', 'PayPal', 'WorldPay'] },
  { label: 'AI, automation & BI', items: ['Microsoft 365 Copilot', 'Copilot agents', 'Claude Code', 'LLM integration', 'Power Automate', 'Power Apps', 'Power BI'] },
  { label: 'Languages', items: ['TypeScript', 'JavaScript', 'SQL', 'PHP', 'Python', 'C#', 'Java', 'VB.NET', 'PowerShell'], mono: true },
  { label: 'Frontend', items: ['React', 'Next.js', 'Astro', 'CSS / Tailwind', 'Vite', 'Browser extensions (WXT)', 'MDX', 'HTML'] },
  { label: 'Backend & data', items: ['Node.js', 'AWS Lambda', 'API Gateway', 'Supabase (Postgres)', 'DynamoDB', 'REST APIs', 'Event-driven design', 'Google Maps API', 'MySQL', 'MSSQL', 'ASP.NET'] },
  { label: 'Cloud & delivery', items: ['Git', 'AWS (serverless)', 'Google Cloud', 'Azure', 'Cloudflare', 'Vercel', 'Docker', 'GitHub Actions', 'GitLab CI/CD', 'SonarQube (SAST)', 'Vitest', 'Playwright'] },
  { label: 'Analytics & SEO', items: ['GA4', 'Google Tag Manager', 'Microsoft Clarity', 'Google Search Console', 'Bing Webmaster Tools', 'SEO'] },
  { label: 'Security & compliance', items: ['DNS', 'SSL/TLS', 'WAF', 'OWASP Top 10', 'IAM', 'PCI DSS', 'PDPA', 'GDPR'] },
];
