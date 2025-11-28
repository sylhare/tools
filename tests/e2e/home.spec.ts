import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Tools/);
  });

  test('displays available tools heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Available Tools' })).toBeVisible();
  });

  test('has navigation links', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Tools' }).first()).toBeVisible();
  });

  test('can navigate to about page', async ({ page }) => {
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page.getByText('About This Project')).toBeVisible();
  });

  test('can navigate to tools page', async ({ page }) => {
    await page.getByRole('link', { name: 'Tools' }).nth(1).click();
    await expect(page.getByText('Available Tools')).toBeVisible();
  });

  test('displays tool cards', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Temperature Converter/i })).toBeVisible();
    await expect(page.getByText('Convert temperatures between Celsius and Fahrenheit')).toBeVisible();
  });

  test('tool cards have action buttons', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Open Tool →' })).toBeVisible();
  });
});

