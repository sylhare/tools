import { test, expect } from '@playwright/test';

test.describe('Volume Converter', () => {
  test('happy path: convert between volume units', async ({ page }) => {
    await page.goto('/volume-converter');

    await expect(page.getByRole('heading', { name: 'Volume Converter' })).toBeVisible();

    const cupInput = page.getByPlaceholder('Enter cups');
    const mlInput = page.getByPlaceholder('Enter mL');
    const tbspInput = page.getByPlaceholder('Enter tbsp');

    await cupInput.fill('1');
    await expect(mlInput).toHaveValue(/^236\.[0-9]/);
    await expect(tbspInput).toHaveValue(/^16\.0/);

    await mlInput.fill('1000');
    await expect(cupInput).toHaveValue(/^4\.2/);
  });

  test('clear all button resets all fields', async ({ page }) => {
    await page.goto('/volume-converter');

    const cupInput = page.getByPlaceholder('Enter cups');
    const mlInput = page.getByPlaceholder('Enter mL');
    const tbspInput = page.getByPlaceholder('Enter tbsp');
    const flozInput = page.getByPlaceholder('Enter fl oz');

    await cupInput.fill('2');
    await expect(mlInput).not.toHaveValue('');
    await expect(tbspInput).not.toHaveValue('');
    await expect(flozInput).not.toHaveValue('');

    await page.getByRole('button', { name: 'Clear All' }).click();

    await expect(cupInput).toHaveValue('');
    await expect(mlInput).toHaveValue('');
    await expect(tbspInput).toHaveValue('');
    await expect(flozInput).toHaveValue('');
  });
});
