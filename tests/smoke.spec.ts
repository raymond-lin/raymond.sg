import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Keep tests offline and deterministic: block third-party requests (analytics, remote images).
  await page.route((url) => !url.toString().startsWith('http://localhost'), (route) => route.abort());
  await page.goto('/');
});

test('home page renders the key sections', async ({ page }) => {
  await expect(page).toHaveTitle(/Raymond Lin/);
  await expect(page.locator('h1')).toContainText('I architect and deliver complex systems');
  for (const id of ['about', 'work', 'tools', 'contact']) await expect(page.locator(`#${id}`)).toBeAttached();
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
  const text = await page.locator('body').innerText();
  expect(text).not.toMatch(/[—–]/);
});

test('theme toggle switches and is remembered', async ({ page }) => {
  const isDark = () => page.evaluate(() => document.documentElement.classList.contains('dark'));
  const before = await isDark();
  await page.locator('#theme-toggle').click();
  expect(await isDark()).toBe(!before);
  await page.reload();
  expect(await isDark()).toBe(!before);
});

test('copy email button confirms', async ({ page, context, browserName }) => {
  test.skip(browserName !== 'chromium', 'clipboard permission is Chromium-only in Playwright');
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.locator('#copy-email').click();
  await expect(page.locator('#copy-email')).toHaveText('Copied');
});
