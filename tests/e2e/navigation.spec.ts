import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('navigates through all pages', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Available Tools' })).toBeVisible();

    await page.getByRole('button', { name: 'Open Tool →' }).first().click();
    await expect(page).toHaveURL(/\/temperature-converter$/);
    await expect(page.getByRole('heading', { name: 'Temperature Converter' })).toBeVisible();

    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page.getByRole('heading', { name: 'Available Tools' })).toBeVisible();
  });

  test('handles 404 page', async ({ page }) => {
    await page.goto('/');
    await page.goto('/non-existent-page');
    await expect(page.getByText('Page Not Found')).toBeVisible();

    await page.getByRole('link', { name: 'Go Home' }).click();
    await expect(page.getByRole('heading', { name: 'Available Tools' })).toBeVisible();
  });
});

