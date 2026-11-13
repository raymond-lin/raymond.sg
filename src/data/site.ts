export const site = {
  name: 'Raymond Lin',
  role: 'Solutions Architect · Full-stack Engineer',
  url: 'https://raymond.sg',
  email: 'hello@raymond.sg',
  title: 'Raymond Lin, Solutions Architect & Full-stack Engineer',
  description:
    'Raymond Lin, Singapore. Business systems across Asia-Pacific markets, plus web apps, browser extensions and Windows tools he builds and runs himself.',
  ogDescription: 'I deliver enterprise systems across APAC, and build and run software of my own.',
};

/** Round a count down to a figure that stays true as it grows: 836,024 -> "800,000+". */
export function floorLabel(n: number): string {
  const step = n >= 100_000 ? 100_000 : n >= 10_000 ? 10_000 : n >= 1_000 ? 1_000 : 1;
  return `${(Math.floor(n / step) * step).toLocaleString('en-US')}+`;
}

/** "2026-11-13" -> "13 Nov 2026" */
export function shortDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}
