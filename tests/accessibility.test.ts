import { expect } from '@playwright/test';
import { test, pages, checkA11y } from './helpers';

test.describe('Keyboard navigation', () => {

  test.describe('desktop', () => {
    test.use({ viewport: { width: 1280, height: 800 } });

    test('can tab through desktop header controls', async ({ page }) => {
      await page.goto('/');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => document.activeElement?.tagName);
      expect(['BUTTON', 'A']).toContain(focused);
    });
  });

  test.describe('mobile', () => {
    test.use({ viewport: { width: 375, height: 812 } });

    test('hamburger button is focusable on mobile', async ({ page }) => {
      await page.goto('/');
      const hamburger = page.locator('.hamburger-btn');
      await hamburger.focus();
      await expect(hamburger).toBeFocused();
    });
  });

  test('dropdown can be operated by keyboard', async ({ page }) => {
    await page.goto('/Print');
    await page.locator('#products').waitFor();

    const trigger = page.getByRole('button', { name: /Categories/i });
    await trigger.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#category')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.locator('#category')).not.toBeVisible();
  });

  test('pagination buttons are keyboard reachable', async ({ page }) => {
    await page.goto('/');
    await page.locator('#pagination').waitFor();

    const prevBtn = page.getByRole('button', { name: 'Previous', exact: true });
    await prevBtn.focus();
    await expect(prevBtn).toBeFocused();

    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement?.textContent);
    expect(focused).toBeTruthy();
  });

});

test.describe('ARIA correctness', () => {

  test('slider dots have unique aria-labels', async ({ page }) => {
    await page.goto('/');
    const dots = page.locator('.embla__dot');
    const count = await dots.count();

    const labels: Set<string> = new Set();
    for (let i = 0; i < count; i++) {
      const label = await dots.nth(i).getAttribute('aria-label');
      expect(label).toBeTruthy();
      labels.add(label ?? '');
    }
    expect(labels.size).toBe(count);
  });

  test('active slider dot has aria-current=true', async ({ page }) => {
    await page.goto('/');
    const activeDot = page.locator('.embla__dot[aria-current="true"]');
    await expect(activeDot).toHaveCount(1);
  });

  test('banner carousel has aria-label', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('section[aria-label="Banner carousel"]')).toBeVisible();
  });

  test('pagination nav has aria-label', async ({ page }) => {
    await page.goto('/');
    await page.locator('#pagination').waitFor();
    await expect(page.locator('nav[aria-label="Pagination"]')).toBeVisible();
  });

  test('category menu has aria-label', async ({ page }) => {
    await page.goto('/Print');
    await page.locator('#products').waitFor();
    await expect(page.locator('nav[aria-label="Filter by subject category"]')).toBeVisible();
  });

  test('thumbnail buttons have aria-pressed on product page', async ({ page }) => {
    await page.goto('/Print');
    await page.locator('#products').waitFor();
    await page.locator('#products a').first().click();
    await page.locator('h1').waitFor();

    const thumbnails = page.locator('[class*="thumbnailButton"]');
    const count = await thumbnails.count();

    if (count > 1) {
      await expect(thumbnails.first()).toHaveAttribute('aria-pressed', 'true');
      await expect(thumbnails.nth(1)).toHaveAttribute('aria-pressed', 'false');
    } else {
      test.skip();
    }
  });

});

test.describe('Axe full-page scans', () => {

  for (const { path, name, selector } of pages) {
    test(`${name} — no critical or serious violations`, async ({ page, axe }) => {
      await page.goto(path);
      await page.locator(selector).waitFor({ timeout: 10_000 });
      await checkA11y(axe);
    });
  }

  test('product page — no critical or serious violations', async ({ page, axe }) => {
    await page.goto('/Print');
    await page.locator('#products').waitFor();
    await page.locator('#products a').first().click();
    await page.locator('h1').waitFor();
    await checkA11y(axe);
  });

  test.describe('mobile', () => {
    test.use({ viewport: { width: 375, height: 812 } });

    test('home — no critical or serious violations', async ({ page, axe }) => {
      await page.goto('/');
      await page.locator('#products').waitFor();
      await checkA11y(axe);
    });

    test('nav open — no critical or serious violations', async ({ page, axe }) => {
      await page.goto('/');
      await page.evaluate(() => {
        const img = document.querySelector('.hamburger-btn') as HTMLElement;
        img?.click();
      });
      await expect(page.locator('#navToggle')).toHaveClass(/open/, { timeout: 5_000 });
      await checkA11y(axe);
    });
  });

});