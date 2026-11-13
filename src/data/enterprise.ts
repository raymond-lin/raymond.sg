// Enterprise work: platforms delivered for organisations. No employer names, no dates.
// Keep every line factual: role is what Raymond actually did, stat only if the number is real.
export interface EnterpriseItem {
  category: string;
  title: string;
  summary: string;
  role: string;
  platforms: string;
  scope?: string;
  stat?: { value: string; label: string };
}

export const enterprise: EnterpriseItem[] = [
  {
    category: 'CRM & ERP',
    title: 'Release pipelines for Salesforce and Business Central',
    summary: 'Every Salesforce and Business Central change traced from its Jira ticket to its GitLab CI/CD deployment.',
    role: 'Supported the Salesforce go-live, set up CI/CD and Jira integration',
    platforms: 'Salesforce · Business Central · GitLab · Jira',
  },
  {
    category: 'E-commerce',
    title: 'A regional D2C store, replatformed',
    summary: 'A direct-to-consumer store moved from SAP Commerce Cloud to Shopline, with its integrations redesigned.',
    role: 'Set up SAP Commerce with the vendor, then led the migration',
    platforms: 'SAP Commerce Cloud → Shopline',
    scope: 'SG · MY · TH · TW · HK',
  },
  {
    category: 'ITSM',
    title: 'A service desk on Jira',
    summary: 'Jira Service Management as the service desk, from the first request types and workflows to go-live.',
    role: 'Designed and set up end to end',
    platforms: 'Jira Service Management',
  },
  {
    category: 'Analytics',
    title: 'One way to measure every market',
    summary: 'One GA4, Tag Manager and Clarity setup across regional sites, so markets compare like for like.',
    role: 'Defined the standard and rolled it out',
    platforms: 'GA4 · GTM · Clarity',
    scope: 'Regional sites',
  },
  {
    category: 'Security',
    title: 'Keeping regional sites up and safe',
    summary: 'DNS, SSL and WAF across regional sites, plus API and payment gateway reviews against PCI principles and PDPA.',
    role: 'Owned operations and reviews',
    platforms: 'DNS · SSL/TLS · WAF',
    scope: 'Regional sites',
  },
  {
    category: 'Web & booking',
    title: 'Brand sites with online booking',
    summary: 'Brand websites on Magento and Drupal with online booking and WorldPay payments, plus a ticketing system in PHP.',
    role: 'Ran the sites, built the ticketing system',
    platforms: 'Magento · Drupal · WorldPay · PHP',
  },
];
