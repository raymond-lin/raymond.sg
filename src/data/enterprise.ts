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
    summary:
      'Supported the Salesforce project through go-live, and connected both Salesforce and Business Central to GitLab CI/CD and Jira, so each change can be traced from its ticket through to deployment.',
    role: 'Supported go-live, set up CI/CD and Jira integration',
    platforms: 'Salesforce · Business Central · GitLab · Jira',
  },
  {
    category: 'E-commerce',
    title: 'A regional D2C store, replatformed',
    summary:
      'A direct-to-consumer store serving several Asia-Pacific markets. I set it up on SAP Commerce Cloud with the implementation vendor, then later led the evaluation and migration to Shopline and redesigned how it connects to the systems around it.',
    role: 'Set up with the vendor, then led the migration',
    platforms: 'SAP Commerce Cloud → Shopline',
    scope: 'SG · MY · TH · TW · HK',
  },
  {
    category: 'ITSM',
    title: 'A service desk on Jira',
    summary: 'Set up Jira Service Management as the service desk, from the first request types and workflows through to go-live.',
    role: 'Designed and set up end to end',
    platforms: 'Jira Service Management',
  },
  {
    category: 'Analytics',
    title: 'One way to measure every market',
    summary:
      'Standardised how GA4, Google Tag Manager and Microsoft Clarity are set up across regional sites, so results from different markets can be compared like for like.',
    role: 'Defined the standard and rolled it out',
    platforms: 'GA4 · GTM · Clarity',
    scope: 'Regional sites',
  },
  {
    category: 'Security',
    title: 'Keeping regional sites up and safe',
    summary:
      'Domains, DNS, the SSL certificate lifecycle and WAF rules across regional sites, plus reviews of API integrations and payment gateways against PCI principles and PDPA.',
    role: 'Owned operations and reviews',
    platforms: 'DNS · SSL/TLS · WAF',
    scope: 'Regional sites',
  },
  {
    category: 'Web & booking',
    title: 'Brand sites with online booking',
    summary: 'Ran brand websites on Magento and Drupal with online booking and WorldPay payments, and built a web-based ticketing system in PHP.',
    role: 'Ran the sites, built the ticketing system',
    platforms: 'Magento · Drupal · WorldPay · PHP',
  },
];
