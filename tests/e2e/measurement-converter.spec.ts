import { test, expect } from '@playwright/test';

test.describe('Measurement Converter', () => {
  test('happy path: convert between metric and imperial units', async ({ page }) => {
    await page.goto('/measurement-converter');

    await expect(page.getByRole('heading', { name: 'Length Converter' })).toBeVisible();

    const inchInput = page.getByPlaceholder('Enter in');
    const cmInput = page.getByPlaceholder('Enter cm');
    const mInput = page.getByPlaceholder('Enter m', { exact: true });

    await inchInput.fill('1');
    await expect(cmInput).toHaveValue('2.54');

    await cmInput.fill('100');
    await expect(mInput).toHaveValue('1.00');
    await expect(inchInput).toHaveValue(/^39\.3/);
  });

  test('clear all button resets all fields', async ({ page }) => {
    await page.goto('/measurement-converter');

    const inchInput = page.getByPlaceholder('Enter in');
    const cmInput = page.getByPlaceholder('Enter cm');
    const mInput = page.getByPlaceholder('Enter m', { exact: true });
    const ftInput = page.getByPlaceholder('Enter ft');

    await cmInput.fill('100');
    await expect(inchInput).not.toHaveValue('');
    await expect(mInput).not.toHaveValue('');
    await expect(ftInput).not.toHaveValue('');

    await page.getByRole('button', { name: 'Clear All' }).click();

    await expect(cmInput).toHaveValue('');
    await expect(inchInput).toHaveValue('');
    await expect(mInput).toHaveValue('');
    await expect(ftInput).toHaveValue('');
  });
});
