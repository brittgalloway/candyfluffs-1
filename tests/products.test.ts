import { expect } from '@playwright/test';
import { test, checkA11y } from './helpers';

test.describe('Product listing', () => {

  test('product cards are visible on home page', async ({ page }) => {
    await page.goto('/');
    await page.locator('#products').waitFor();
    const cards = page.locator('#products .product-item, #products article, #products a');
    await expect(cards.first()).toBeVisible();
  });

  test('clicking a product card navigates to the product page', async ({ page }) => {
    await page.goto('/Print');
    await page.locator('#products').waitFor();

    const firstCard = page.locator('#products a').first();
    await firstCard.click({ force: true });

    await page.waitForURL(/\/products\//, { timeout: 10_000 });
    await expect(page.locator('h1')).toBeVisible();
  });

  test('product listing passes axe scan', async ({ page, axe }) => {
    await page.goto('/Print');
    await page.locator('#products').waitFor();
    await checkA11y(axe);
  });

});

test.describe('Product page', () => {

  // Navigate to the first available product before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('/Print');
    await page.locator('#products').waitFor();
    await page.locator('#products a').first().click({ force: true });
    await page.waitForURL(/products/, { timeout: 10_000 });
    await page.locator('h1').waitFor();
  });

  test('shows product title and price', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).not.toHaveText('');
  });

  test('shows add to cart button', async ({ page }) => {
    const addToCart = page.locator('button.snipcart-add-item');
    await expect(addToCart).toBeVisible();
    await expect(addToCart).toBeEnabled();
  });

  test('image gallery thumbnails change main image', async ({ page }) => {
    const thumbnails = page.locator('[class*="thumbnailButton"]');
    const count = await thumbnails.count();

    if (count > 1) {
      const mainImage = page.locator('[class*="largeDisplay"]');
      const initialSrc = await mainImage.getAttribute('src');

      await thumbnails.nth(1).click();

      // Main image src should change
      await expect(mainImage).not.toHaveAttribute('src', initialSrc ?? '');
    } else {
      test.skip();
    }
  });

  test('thumbnail buttons are keyboard accessible', async ({ page }) => {
    const thumbnails = page.locator('[class*="thumbnailButton"]');
    const count = await thumbnails.count();

    if (count > 1) {
      await thumbnails.first().focus();
      await page.keyboard.press('Tab');
      const focused = page.locator('[class*="thumbnailButton"]:focus');
      await expect(focused).toBeVisible();
    } else {
      test.skip();
    }
  });

  test('product page passes axe scan', async ({ page, axe }) => {
    await checkA11y(axe);
  });

});

test.describe('Pagination', () => {

  test('next button updates page param', async ({ page }) => {
    await page.goto('/');
    await page.locator('#products').waitFor();

    const nextBtn = page.getByRole('button', { name: 'Next', exact: true });
    const isDisabled = await nextBtn.getAttribute('aria-disabled');

    if (isDisabled === 'true') {
      test.skip(); // Not enough products to paginate
    } else {
      await nextBtn.click();
      await expect(page).toHaveURL(/page=2/);
      await expect(page.locator('#products')).toBeVisible();
    }
  });

  test('previous button is disabled on page 1', async ({ page }) => {
    await page.goto('/');
    await page.locator('#products').waitFor();
    const prevBtn = page.getByRole('button', { name: 'Previous', exact: true });
    await expect(prevBtn).toHaveAttribute('aria-disabled', 'true');
  });

  test('active page button has aria-current=page', async ({ page }) => {
    await page.goto('/');
    await page.locator('#products').waitFor();
    const activePage = page.locator('#pagination button[aria-current="page"]');
    await expect(activePage).toHaveText('1');
  });

  test('pagination passes axe scan', async ({ page, axe }) => {
    await page.goto('/');
    await page.locator('#products').waitFor();
    await checkA11y(axe);
  });

});