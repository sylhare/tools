import { test, expect } from '@playwright/test';

test.describe('Hex to RGB Converter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays hex to rgb converter card on home page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Hex to RGB Converter/i })).toBeVisible();
    await expect(page.getByText('Convert colors between Hexadecimal and RGB formats with live preview.')).toBeVisible();
  });

  test('navigates to hex to rgb converter from home page', async ({ page }) => {
    const buttons = page.getByRole('button', { name: 'Open Tool →' });
    await buttons.nth(1).click();
    await page.waitForURL(/\/hex-rgb-converter$/);
    await expect(page.getByRole('heading', { name: 'Hex to RGB Converter' })).toBeVisible();
  });

  test('converts hex to rgb without # prefix', async ({ page }) => {
    await page.goto('/hex-rgb-converter');

    const hexInput = page.getByPlaceholder('Enter hex value (e.g., FF5733 or #FF5733)');
    const rgbInputs = page.getByPlaceholder('0-255');

    await hexInput.fill('FF0000');
    await expect(rgbInputs.nth(0)).toHaveValue('255');
    await expect(rgbInputs.nth(1)).toHaveValue('0');
    await expect(rgbInputs.nth(2)).toHaveValue('0');

    await hexInput.fill('00FF00');
    await expect(rgbInputs.nth(0)).toHaveValue('0');
    await expect(rgbInputs.nth(1)).toHaveValue('255');
    await expect(rgbInputs.nth(2)).toHaveValue('0');

    await hexInput.fill('0000FF');
    await expect(rgbInputs.nth(0)).toHaveValue('0');
    await expect(rgbInputs.nth(1)).toHaveValue('0');
    await expect(rgbInputs.nth(2)).toHaveValue('255');
  });

  test('converts hex to rgb with # prefix', async ({ page }) => {
    await page.goto('/hex-rgb-converter');

    const hexInput = page.getByPlaceholder('Enter hex value (e.g., FF5733 or #FF5733)');
    const rgbInputs = page.getByPlaceholder('0-255');

    await hexInput.fill('#FF0000');
    await expect(rgbInputs.nth(0)).toHaveValue('255');
    await expect(rgbInputs.nth(1)).toHaveValue('0');
    await expect(rgbInputs.nth(2)).toHaveValue('0');
  });

  test('converts shorthand hex to rgb', async ({ page }) => {
    await page.goto('/hex-rgb-converter');

    const hexInput = page.getByPlaceholder('Enter hex value (e.g., FF5733 or #FF5733)');
    const rgbInputs = page.getByPlaceholder('0-255');

    await hexInput.fill('F00');
    await expect(rgbInputs.nth(0)).toHaveValue('255');
    await expect(rgbInputs.nth(1)).toHaveValue('0');
    await expect(rgbInputs.nth(2)).toHaveValue('0');

    await hexInput.fill('#FFF');
    await expect(rgbInputs.nth(0)).toHaveValue('255');
    await expect(rgbInputs.nth(1)).toHaveValue('255');
    await expect(rgbInputs.nth(2)).toHaveValue('255');
  });

  test('converts rgb to hex', async ({ page }) => {
    await page.goto('/hex-rgb-converter');

    const hexInput = page.getByPlaceholder('Enter hex value (e.g., FF5733 or #FF5733)');
    const rgbInputs = page.getByPlaceholder('0-255');

    await rgbInputs.nth(0).fill('255');
    await rgbInputs.nth(1).fill('0');
    await rgbInputs.nth(2).fill('0');

    const hexValue = await hexInput.inputValue();
    expect(hexValue.toLowerCase()).toBe('ff0000');

    await rgbInputs.nth(0).fill('0');
    await rgbInputs.nth(1).fill('255');
    await rgbInputs.nth(2).fill('0');

    const hexValue2 = await hexInput.inputValue();
    expect(hexValue2.toLowerCase()).toBe('00ff00');
  });

  test('displays hex value with # prefix', async ({ page }) => {
    await page.goto('/hex-rgb-converter');

    const hexInput = page.getByPlaceholder('Enter hex value (e.g., FF5733 or #FF5733)');

    await hexInput.fill('FF5733');
    await expect(page.getByText('#FF5733')).toBeVisible();

    const displayText = await page.getByText(/^#[0-9A-Fa-f]+$/).textContent();
    const hashCount = (displayText?.match(/#/g) || []).length;
    expect(hashCount).toBe(1);
  });

  test('displays rgb value in rgb() format', async ({ page }) => {
    await page.goto('/hex-rgb-converter');

    const rgbInputs = page.getByPlaceholder('0-255');

    await rgbInputs.nth(0).fill('128');
    await rgbInputs.nth(1).fill('64');
    await rgbInputs.nth(2).fill('192');

    await expect(page.getByText('rgb(128, 64, 192)')).toBeVisible();
  });

  test('shows copy buttons when values are present', async ({ page }) => {
    await page.goto('/hex-rgb-converter');

    const hexInput = page.getByPlaceholder('Enter hex value (e.g., FF5733 or #FF5733)');

    await hexInput.fill('FF0000');

    const copyButtons = page.getByRole('button', { name: 'Copy' });
    await expect(copyButtons.first()).toBeVisible();
    await expect(copyButtons.last()).toBeVisible();
  });

  test('copy buttons copy correct values to clipboard', async ({ page, context }) => {
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

  test('clears rgb when hex is cleared', async ({ page }) => {
    await page.goto('/hex-rgb-converter');

    const hexInput = page.getByPlaceholder('Enter hex value (e.g., FF5733 or #FF5733)');
    const rgbInputs = page.getByPlaceholder('0-255');

    await hexInput.fill('FF0000');
    await expect(rgbInputs.nth(0)).toHaveValue('255');

    await hexInput.fill('');
    await expect(rgbInputs.nth(0)).toHaveValue('');
    await expect(rgbInputs.nth(1)).toHaveValue('');
    await expect(rgbInputs.nth(2)).toHaveValue('');
  });

  test('updates hex in real-time when rgb values change', async ({ page }) => {
    await page.goto('/hex-rgb-converter');

    const hexInput = page.getByPlaceholder('Enter hex value (e.g., FF5733 or #FF5733)');
    const rgbInputs = page.getByPlaceholder('0-255');

    await rgbInputs.nth(0).fill('128');
    let hexValue = await hexInput.inputValue();
    expect(hexValue.toLowerCase()).toBe('800000');

    await rgbInputs.nth(1).fill('128');
    hexValue = await hexInput.inputValue();
    expect(hexValue.toLowerCase()).toBe('808000');

    await rgbInputs.nth(2).fill('128');
    hexValue = await hexInput.inputValue();
    expect(hexValue.toLowerCase()).toBe('808080');
  });

  test('updates rgb in real-time when hex changes', async ({ page }) => {
    await page.goto('/hex-rgb-converter');

    const hexInput = page.getByPlaceholder('Enter hex value (e.g., FF5733 or #FF5733)');
    const rgbInputs = page.getByPlaceholder('0-255');

    await hexInput.fill('8');

    await hexInput.fill('80');

    await hexInput.fill('808');
    await expect(rgbInputs.nth(0)).toHaveValue('136');
    await expect(rgbInputs.nth(1)).toHaveValue('0');
    await expect(rgbInputs.nth(2)).toHaveValue('136');
  });

  test('displays color preview', async ({ page }) => {
    await page.goto('/hex-rgb-converter');

    await expect(page.getByText('Color Preview')).toBeVisible();

    const hexInput = page.getByPlaceholder('Enter hex value (e.g., FF5733 or #FF5733)');
    await hexInput.fill('FF0000');

    const rgbInputs = page.getByPlaceholder('0-255');
    await expect(rgbInputs.nth(0)).toHaveValue('255');

    const preview = page.getByTestId('color-preview');
    const bgColor = await preview.evaluate(el => window.getComputedStyle(el).backgroundColor);
    expect(bgColor).toMatch(/^rgba?\(255,\s*0,\s*0(?:,\s*1)?\)$/);
  });

  test('displays quick examples section', async ({ page }) => {
    await page.goto('/hex-rgb-converter');

    await expect(page.getByText('Quick Examples')).toBeVisible();
    await expect(page.getByText('• Red: #FF0000 = rgb(255, 0, 0)')).toBeVisible();
    await expect(page.getByText('• Green: #00FF00 = rgb(0, 255, 0)')).toBeVisible();
    await expect(page.getByText('• Blue: #0000FF = rgb(0, 0, 255)')).toBeVisible();
    await expect(page.getByText('• White: #FFFFFF = rgb(255, 255, 255)')).toBeVisible();
    await expect(page.getByText('• Black: #000000 = rgb(0, 0, 0)')).toBeVisible();
  });

  test('allows switching between hex and rgb inputs seamlessly', async ({ page }) => {
    await page.goto('/hex-rgb-converter');

    const hexInput = page.getByPlaceholder('Enter hex value (e.g., FF5733 or #FF5733)');
    const rgbInputs = page.getByPlaceholder('0-255');

    await hexInput.fill('FF0000');
    await expect(rgbInputs.nth(0)).toHaveValue('255');

    await rgbInputs.nth(1).fill('128');
    const hexValue = await hexInput.inputValue();
    expect(hexValue.toLowerCase()).toBe('ff8000');

    await hexInput.fill('00FF00');
    await expect(rgbInputs.nth(0)).toHaveValue('0');
    await expect(rgbInputs.nth(1)).toHaveValue('255');
    await expect(rgbInputs.nth(2)).toHaveValue('0');
  });

  test('displays conversion arrows between inputs', async ({ page }) => {
    await page.goto('/hex-rgb-converter');

    await expect(page.getByText('⇄')).toBeVisible();
  });

  test('handles case insensitive hex input', async ({ page }) => {
    await page.goto('/hex-rgb-converter');

    const hexInput = page.getByPlaceholder('Enter hex value (e.g., FF5733 or #FF5733)');
    const rgbInputs = page.getByPlaceholder('0-255');

    await hexInput.fill('ff0000');
    await expect(rgbInputs.nth(0)).toHaveValue('255');
    await expect(rgbInputs.nth(1)).toHaveValue('0');
    await expect(rgbInputs.nth(2)).toHaveValue('0');

    await hexInput.fill('FfAaBb');
    await expect(rgbInputs.nth(0)).toHaveValue('255');
    await expect(rgbInputs.nth(1)).toHaveValue('170');
    await expect(rgbInputs.nth(2)).toHaveValue('187');
  });
});

