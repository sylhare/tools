import { test, expect } from '@playwright/test';

test.describe('Hex to RGB Converter', () => {
  test('happy path: convert hex to rgb and back', async ({ page }) => {
    await page.goto('/hex-rgb-converter');

    await expect(page.getByRole('heading', { name: 'Hex to RGB Converter' })).toBeVisible();

    const hexInput = page.getByPlaceholder('Enter hex value (e.g., FF5733 or #FF5733)');
    const rgbInputs = page.getByPlaceholder('0-255');

    await hexInput.fill('FF5733');
    await expect(rgbInputs.nth(0)).toHaveValue('255');
    await expect(rgbInputs.nth(1)).toHaveValue('87');
    await expect(rgbInputs.nth(2)).toHaveValue('51');

    const preview = page.getByTestId('color-preview');
    await expect(preview).toBeVisible();

    await rgbInputs.nth(1).fill('128');
    const updatedHex = await hexInput.inputValue();
    expect(updatedHex.toLowerCase()).toBe('ff8033');

    await hexInput.fill('00FF00');
    await expect(rgbInputs.nth(0)).toHaveValue('0');
    await expect(rgbInputs.nth(1)).toHaveValue('255');
    await expect(rgbInputs.nth(2)).toHaveValue('0');
  });

  test('copy buttons copy correct values to clipboard', async ({ page, context, browserName }) => {
    test.skip(browserName !== 'chromium', 'Clipboard permissions are only supported in Chromium');
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/hex-rgb-converter');

    const hexInput = page.getByPlaceholder('Enter hex value (e.g., FF5733 or #FF5733)');
    await hexInput.fill('FF5733');

    const copyButtons = page.getByRole('button', { name: 'Copy' });
    await copyButtons.first().click();

    const hexClipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(hexClipboard).toBe('#FF5733');

    await copyButtons.last().click();

    const rgbClipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(rgbClipboard).toBe('rgb(255, 87, 51)');
  });
});
