import { expect } from '@playwright/test';
import { test, pages, checkA11y } from './helpers';

for (const { path, name, selector } of pages) {
  test.describe(`${name} page`, () => {

    test('loads without error state', async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('#errorH2')).not.toBeVisible();
      await expect(page.locator('#errorMessage')).not.toBeVisible();
    });

    test('spinner resolves and content appears', async ({ page }) => {
      await page.goto(path);
      // Spinner should disappear
      await expect(page.locator('#spinner')).not.toBeVisible({ timeout: 10_000 });
      // Content should appear
      await expect(page.locator(selector)).toBeVisible();
    });

    test('has a page title', async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(/.+/);
    });

    test(`passes axe accessibility scan — ${name}`, async ({ page, axe }) => {
      await page.goto(path);
      await page.locator(selector).waitFor();
      await checkA11y(axe);
    });

  });
}