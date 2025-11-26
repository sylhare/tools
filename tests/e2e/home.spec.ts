import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Tools/);
  });

  test('displays welcome message', async ({ page }) => {
    await expect(page.getByText('Welcome to Tools')).toBeVisible();
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
});

