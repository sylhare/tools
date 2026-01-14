import { test, expect } from '@playwright/test';

test.describe('Time Converter', () => {
  test('happy path: convert between time units', async ({ page }) => {
    await page.goto('/time-converter');

    await expect(page.getByRole('heading', { name: 'Time Converter' })).toBeVisible();

    const hoursInput = page.getByPlaceholder('Enter hr');
    const minutesInput = page.getByPlaceholder('Enter min');
    const secondsInput = page.getByPlaceholder('Enter s');

    await hoursInput.fill('1');
    await expect(minutesInput).toHaveValue(/^60\.00/);
    await expect(secondsInput).toHaveValue('3600.00');

    await minutesInput.fill('90');
    await expect(hoursInput).toHaveValue(/^1\.50/);
    await expect(secondsInput).toHaveValue(/^5400\.00/);
  });

  test('clear all button resets all fields', async ({ page }) => {
    await page.goto('/time-converter');

    const hoursInput = page.getByPlaceholder('Enter hr');
    const minutesInput = page.getByPlaceholder('Enter min');
    const secondsInput = page.getByPlaceholder('Enter s');
    const daysInput = page.getByPlaceholder('Enter days');

    await hoursInput.fill('24');
    await expect(minutesInput).not.toHaveValue('');
    await expect(secondsInput).not.toHaveValue('');
    await expect(daysInput).not.toHaveValue('');

    await page.getByRole('button', { name: 'Clear All' }).click();

    await expect(hoursInput).toHaveValue('');
    await expect(minutesInput).toHaveValue('');
    await expect(secondsInput).toHaveValue('');
    await expect(daysInput).toHaveValue('');
  });
});
