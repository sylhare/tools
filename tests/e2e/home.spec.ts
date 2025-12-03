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
  });

  test('displays tool cards', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Temperature Converter/i })).toBeVisible();
    await expect(page.getByText('Convert temperatures between Celsius and Fahrenheit')).toBeVisible();
  });

  test('tool cards have action buttons', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Open Tool →' }).first()).toBeVisible();
  });
});

