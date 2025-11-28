import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('navigates through all pages', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Available Tools' })).toBeVisible();

    await page.getByRole('link', { name: 'About' }).click();
    await expect(page.getByText('About This Project')).toBeVisible();

    await page.getByRole('link', { name: 'Tools' }).nth(1).click();
    await expect(page.getByText('Available Tools')).toBeVisible();

    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page.getByRole('heading', { name: 'Available Tools' })).toBeVisible();
  });

  test('handles 404 page', async ({ page }) => {
    await page.goto('/');
    await page.goto('/tools/non-existent-page');
    await expect(page.getByText('Page Not Found')).toBeVisible();

    await page.getByRole('link', { name: 'Go Home' }).click();
    await expect(page.getByRole('heading', { name: 'Available Tools' })).toBeVisible();
  });
});

