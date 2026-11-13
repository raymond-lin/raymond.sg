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

// Mobile menu: toggle, and close on link click, Escape or a click outside.
const menuBtn = document.getElementById('menu-toggle');
const menu = document.getElementById('mobile-menu');
const setMenu = (open: boolean) => {
  if (!menuBtn || !menu) return;
  menu.hidden = !open;
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menuBtn.querySelector('.menu-open')?.classList.toggle('hidden', open);
  menuBtn.querySelector('.menu-close')?.classList.toggle('hidden', !open);
};
menuBtn?.addEventListener('click', () => setMenu(menu?.hidden === true));
menu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu && !menu.hidden) { setMenu(false); menuBtn?.focus(); }
});
document.addEventListener('click', (e) => {
  if (menu && !menu.hidden && !(e.target as Element).closest('header')) setMenu(false);
});

// Analytics events for project links and email clicks (no-op when GA4 is off).
document.querySelectorAll<HTMLElement>('[data-track]').forEach((el) => {
  el.addEventListener('click', () => {
    track(el.dataset.track ?? 'click', { project: el.dataset.project ?? '', link_url: el.getAttribute('href') ?? '' });
  });
});

export {};
