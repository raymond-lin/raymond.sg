declare global { interface Window { gtag?: (...args: unknown[]) => void } }

const track = (name: string, params: Record<string, string> = {}) => window.gtag?.('event', name, params);

// Theme toggle (initial theme is applied inline in <head> to avoid a flash).
const root = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');
const syncLabel = () =>
  themeBtn?.setAttribute('aria-label', root.classList.contains('dark') ? 'Switch to light theme' : 'Switch to dark theme');
syncLabel();
themeBtn?.addEventListener('click', () => {
  const dark = root.classList.toggle('dark');
  try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch { /* storage unavailable */ }
  syncLabel();
});

// Logo: on the home page, scroll to the top and clear any #section from the URL
// instead of reloading. On other pages it is a normal link home.
document.getElementById('home-link')?.addEventListener('click', (e) => {
  if (location.pathname !== '/') return;
  e.preventDefault();
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  if (location.hash) history.replaceState(null, '', '/');
});

// Analytics events for project links and email clicks (no-op when GA4 is off).
document.querySelectorAll<HTMLElement>('[data-track]').forEach((el) => {
  el.addEventListener('click', () => {
    track(el.dataset.track ?? 'click', { project: el.dataset.project ?? '', link_url: el.getAttribute('href') ?? '' });
  });
});

export {};
