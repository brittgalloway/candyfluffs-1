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
      await page.getByRole('link', { name: label }).click();
      await expect(page).toHaveURL(new RegExp(path));
    });
  }

  test('logo links back to home', async ({ page }) => {
    await page.goto('/Print');
    await page.locator('header .logo').click();
    await expect(page).toHaveURL('/');
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
    await expect(nav).not.toBeVisible();

    // Open
    await page.locator('.mobile-menu img').click();
    await expect(nav).toBeVisible();

    // Close by clicking again
    await page.locator('.mobile-menu img').click();
    await expect(nav).not.toBeVisible();
  });

  test('clicking a nav link closes the menu and navigates', async ({ page }) => {
    await page.goto('/');
    await page.locator('.mobile-menu img').click();
    await expect(page.locator('#navToggle')).toBeVisible();

    await page.getByRole('link', { name: 'Prints' }).click();
    await expect(page).toHaveURL('/Print');
    await expect(page.locator('#navToggle')).not.toBeVisible();
  });

  test('Account button is reachable and styled as nav item', async ({ page }) => {
    await page.goto('/');
    await page.locator('.mobile-menu img').click();
    const accountBtn = page.getByRole('button', { name: 'Account' });
    await expect(accountBtn).toBeVisible();
    await expect(accountBtn).toBeEnabled();
  });

  test('mobile nav passes axe scan', async ({ page, axe }) => {
    await page.goto('/');
    await page.locator('.mobile-menu img').click();
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
    await expect(page.getByRole('button', { name: /Category:/i })).toBeVisible();
  });

  test('"All" link clears filter and returns to unfiltered products', async ({ page }) => {
    await page.goto('/Print');
    await page.locator('#products').waitFor();
    await page.getByRole('button', { name: /Categories/i }).click();
    await page.locator('#category li a').first().click();

    // Open dropdown again and click All
    await page.getByRole('button', { name: /Category:/i }).click();
    await page.getByRole('link', { name: 'All' }).click();
    await expect(page).toHaveURL('/Print');
  });
});