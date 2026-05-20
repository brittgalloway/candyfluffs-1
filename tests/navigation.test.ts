import { expect } from '@playwright/test';
import { test, checkA11y } from './helpers';

test.describe('Desktop navigation', () => {
  const navLinks = [
    { label: 'Books',    path: '/Book' },
    { label: 'Prints',   path: '/Print' },
    { label: 'Scrolls',  path: '/Scroll' },
    { label: 'Charms',   path: '/Charm' },
    { label: 'Buttons',  path: '/Button' },
    { label: 'Stickers', path: '/Sticker' },
    { label: 'Nechual',  path: '/2heroes' },
  ];

  test.use({ viewport: { width: 1280, height: 800 } });

  for (const { label, path } of navLinks) {
    test(`clicking ${label} navigates to ${path}`, async ({ page }) => {
      await page.goto('/');
      const link = page.getByRole('link', { name: label }).first();
      await link.waitFor();
      await link.click({ force: true });
      await page.waitForURL(new RegExp(path), { timeout: 10_000 });
    });
  }

  test('logo links back to home', async ({ page }) => {
    await page.goto('/Print');
    await page.locator('header .logo').click({ force: true });
    await page.waitForURL('/', { timeout: 10_000 });
  });

  test('nav passes axe scan', async ({ page, axe }) => {
    await page.goto('/');
    await checkA11y(axe);
  });
});

test.describe('Mobile navigation', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('hamburger opens and closes the nav', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('#navToggle');

    // Closed by default — no open class
    await expect(nav).not.toHaveClass(/open/);

    // Open
    await page.locator('.hamburger-btn').click({ force: true });
    await expect(nav).toHaveClass(/open/);

    // Close by clicking again
    await page.locator('.hamburger-btn').click({ force: true });
    await expect(nav).not.toHaveClass(/open/);
  });

  test('clicking a nav link closes the menu and navigates', async ({ page }) => {
    await page.goto('/');
    await page.locator('.hamburger-btn').click({ force: true });
    await expect(page.locator('#navToggle')).toHaveClass(/open/);

    await page.getByRole('link', { name: 'Prints' }).first().click({ force: true });
    await page.waitForURL('/Print', { timeout: 10_000 });
    await expect(page.locator('#navToggle')).not.toHaveClass(/open/);
  });

  test('Account button is reachable and styled as nav item', async ({ page }) => {
    await page.goto('/');
    await page.locator('.hamburger-btn').click({ force: true });
    const accountBtn = page.getByRole('button', { name: 'Account' });
    await expect(accountBtn).toBeVisible();
    await expect(accountBtn).toBeEnabled();
  });

  test('mobile nav passes axe scan', async ({ page, axe }) => {
    await page.goto('/');
    await page.locator('.hamburger-btn').click({ force: true });
    await checkA11y(axe);
  });
});

test.describe('Fandom dropdown filter', () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test('opens on button click', async ({ page }) => {
    await page.goto('/Print');
    await page.locator('#products').waitFor();
    const trigger = page.getByRole('button', { name: /Categories/i });
    await trigger.click();
    await expect(page.locator('#category')).toBeVisible();
  });

  test('closes on Escape', async ({ page }) => {
    await page.goto('/Print');
    await page.locator('#products').waitFor();
    await page.getByRole('button', { name: /Categories/i }).click();
    await expect(page.locator('#category')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#category')).not.toBeVisible();
  });

  test('selecting a fandom filters products and updates URL', async ({ page }) => {
    await page.goto('/Print');
    await page.locator('#products').waitFor();
    await page.getByRole('button', { name: /Categories/i }).click();

    // Click first fandom option
    const firstOption = page.locator('#category li a').first();
    const fandomText = await firstOption.innerText();
    await firstOption.click();

    // URL should update to include the fandom
    await expect(page).toHaveURL(new RegExp(`/Print/${fandomText.replaceAll(' ', '-')}`));
    await expect(page.locator('#products')).toBeVisible();
  });

  test('dropdown stays visible after filtering', async ({ page }) => {
    await page.goto('/Print');
    await page.locator('#products').waitFor();
    await page.getByRole('button', { name: /Categories/i }).click();
    const firstOption = page.locator('#category li a').first();
    await firstOption.click();

    // Dropdown trigger should still be on the page
    // Dropdown trigger should still be on the page — label is now the fandom name or 'Categories'
    await expect(page.locator('#category-menu button')).toBeVisible();
  });

  test('"All" link clears filter and returns to unfiltered products', async ({ page }) => {
    await page.goto('/Print');
    await page.locator('#products').waitFor();

    // Select a fandom
    await page.getByRole('button', { name: /Categories/i }).click();
    await expect(page.locator('#category')).toBeVisible();
    await page.locator('#category li a').first().click();
    await page.locator('#products').waitFor();

    // Open dropdown again and click All
    await page.locator('#category-menu button').click();
    await expect(page.locator('#category')).toBeVisible({ timeout: 5_000 });
    // 'All' is the first link when a filter is active
    const allLink = page.locator('#category li:first-child a');
    await allLink.waitFor({ timeout: 5_000 });
    await allLink.click({ force: true });
    await page.waitForURL('/Print', { timeout: 10_000 });
  });
});