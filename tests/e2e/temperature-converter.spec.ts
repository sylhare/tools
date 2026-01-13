import { test, expect } from '@playwright/test';

test.describe('Temperature Converter', () => {
  test('happy path: convert celsius to fahrenheit and back', async ({ page }) => {
    await page.goto('/temperature-converter');

    await expect(page.getByRole('heading', { name: 'Temperature Converter' })).toBeVisible();

    const celsiusInput = page.getByPlaceholder('Enter temperature in Celsius');
    const fahrenheitInput = page.getByPlaceholder('Enter temperature in Fahrenheit');

    await celsiusInput.fill('0');
    await expect(fahrenheitInput).toHaveValue('32.00');

    await celsiusInput.fill('100');
    await expect(fahrenheitInput).toHaveValue('212.00');

    await fahrenheitInput.fill('98.6');
    const celsiusValue = await celsiusInput.inputValue();
    expect(parseFloat(celsiusValue)).toBeCloseTo(37, 0);

    await celsiusInput.fill('');
    await expect(fahrenheitInput).toHaveValue('');
  });
});
