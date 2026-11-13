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

// Copy email button.
const copyBtn = document.getElementById('copy-email');
copyBtn?.addEventListener('click', async () => {
  const email = copyBtn.dataset.email ?? '';
  const done = () => {
    copyBtn.textContent = 'Copied';
    const status = document.getElementById('copy-status');
    if (status) status.textContent = 'Email address copied';
    setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
    track('contact', { method: 'email_copy' });
  };
  try {
    await navigator.clipboard.writeText(email);
    done();
  } catch {
    const t = document.createElement('textarea');
    t.value = email; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
    document.body.appendChild(t); t.select();
    try { document.execCommand('copy'); done(); } catch { /* give up quietly */ }
    t.remove();
  }
});

// Analytics events for project links and email clicks (no-op when GA4 is off).
document.querySelectorAll<HTMLElement>('[data-track]').forEach((el) => {
  el.addEventListener('click', () => {
    track(el.dataset.track ?? 'click', { project: el.dataset.project ?? '', link_url: el.getAttribute('href') ?? '' });
  });
});

export {};
