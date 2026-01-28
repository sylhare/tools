import { test, expect } from '@playwright/test';
import { tools } from '../../src/config/tools';

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

test.describe('Open Tool buttons', () => {
  for (let i = 0; i < tools.length; i++) {
    const tool = tools[i];
    test(`opens ${tool.title}`, async ({ page }) => {
      await page.goto('/');
      await page.getByRole('button', { name: 'Open Tool →' }).nth(i).click();
      await expect(page).toHaveURL(new RegExp(`${tool.link}$`));
      await expect(page.getByRole('heading', { name: tool.title })).toBeVisible();
    });
  }
});

test.describe('Navigate back to Home', () => {
  for (const tool of tools) {
    test(`from ${tool.link}`, async ({ page }) => {
      await page.goto(tool.link);
      await page.getByRole('link', { name: 'Home' }).click();
      await expect(page).toHaveURL('/');
      await expect(page.getByRole('heading', { name: 'Available Tools' })).toBeVisible();
    });
  }
});