import { test, expect } from '@playwright/test';

test.describe('Weight Converter', () => {
  test('happy path: convert between weight units', async ({ page }) => {
    await page.goto('/weight-converter');

    await expect(page.getByRole('heading', { name: 'Weight Converter' })).toBeVisible();

    const kgInput = page.getByPlaceholder('Enter kg');
    const gInput = page.getByPlaceholder('Enter g');
    const lbInput = page.getByPlaceholder('Enter lb');

    await kgInput.fill('1');
    await expect(gInput).toHaveValue(/^1000/);
    await expect(lbInput).toHaveValue(/^2\.2/);

    await gInput.fill('453.592');
    await expect(lbInput).toHaveValue(/^1\.0/);
  });

  test('clear all button resets all fields', async ({ page }) => {
    await page.goto('/weight-converter');

    const kgInput = page.getByPlaceholder('Enter kg');
    const gInput = page.getByPlaceholder('Enter g');
    const ozInput = page.getByPlaceholder('Enter oz');
    const lbInput = page.getByPlaceholder('Enter lb');

    await kgInput.fill('2');
    await expect(gInput).not.toHaveValue('');
    await expect(ozInput).not.toHaveValue('');
    await expect(lbInput).not.toHaveValue('');

    await page.getByRole('button', { name: 'Clear All' }).click();

    await expect(kgInput).toHaveValue('');
    await expect(gInput).toHaveValue('');
    await expect(ozInput).toHaveValue('');
    await expect(lbInput).toHaveValue('');
  });
});
