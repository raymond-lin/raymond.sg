import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Keep tests offline and deterministic: block third-party requests (analytics, remote images).
  await page.route((url) => !url.toString().startsWith('http://localhost'), (route) => route.abort());
  await page.goto('/');
});

test('home page renders the key sections', async ({ page }) => {
  await expect(page).toHaveTitle(/Raymond Lin/);
  await expect(page.locator('h1')).toContainText('I deliver enterprise systems across APAC');
  for (const id of ['about', 'enterprise', 'projects', 'tools', 'contact']) await expect(page.locator(`#${id}`)).toBeAttached();
  await expect(page.locator('article.work-card')).toHaveCount(6);
});

test('no horizontal scrolling', async ({ page }) => {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test('every link has a real destination', async ({ page }) => {
  const hrefs = await page.locator('a[href]').evaluateAll((as) => as.map((a) => a.getAttribute('href') ?? ''));
  for (const href of hrefs) {
    expect(href, `bad href: "${href}"`).not.toBe('#');
    expect(href).toMatch(/^(https?:\/\/|mailto:|\/|#[a-z])/);
  }
  for (const href of hrefs.filter((h) => h.startsWith('/#') || h.startsWith('#'))) {
    const id = href.split('#')[1];
    await expect(page.locator(`[id="${id}"]`), `missing anchor #${id}`).toBeAttached();
  }
});

test('content rules: no em or en dashes in visible text', async ({ page }) => {
  for (const path of ['/', '/privacy/']) {
    await page.goto(path);
    expect(await page.locator('body').innerText(), path).not.toMatch(/[—–]/);
  }
});

test('privacy page is linked from the footer and renders', async ({ page }) => {
  await page.locator('footer a[href="/privacy/"]').click();
  await expect(page.locator('h1')).toContainText('What happens to your data');
  await expect(page.locator('body')).toContainText('14 months');
});

test('mobile menu opens, links to a section and closes', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'the menu button only shows on small screens');
  const btn = page.locator('#menu-toggle');
  await btn.click();
  await expect(btn).toHaveAttribute('aria-expanded', 'true');
  await page.locator('#mobile-menu a[href="/#enterprise"]').click();
  await expect(page.locator('#mobile-menu')).toBeHidden();
  await expect(btn).toHaveAttribute('aria-expanded', 'false');
  await expect(page).toHaveURL(/#enterprise$/);
});

test('theme toggle switches and is remembered', async ({ page }) => {
  const isDark = () => page.evaluate(() => document.documentElement.classList.contains('dark'));
  const before = await isDark();
  await page.locator('#theme-toggle').click();
  expect(await isDark()).toBe(!before);
  await page.reload();
  expect(await isDark()).toBe(!before);
});

test('logo scrolls to top without leaving a hash in the URL', async ({ page }) => {
  await page.goto('/#contact');
  await page.waitForFunction(() => window.scrollY > 0);
  await page.locator('#home-link').click();
  await page.waitForFunction(() => window.scrollY === 0);
  expect(new URL(page.url()).hash).toBe('');
});
