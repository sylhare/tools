import { test, expect } from '@playwright/test';

test.describe('Temperature Converter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays temperature converter card on home page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Temperature Converter/i })).toBeVisible();
    await expect(page.getByText('Convert temperatures between Celsius and Fahrenheit')).toBeVisible();
  });

  test('navigates to temperature converter from home page', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Tool →' }).click();
    await expect(page).toHaveURL(/\/temperature-converter$/);
    await expect(page.getByRole('heading', { name: 'Temperature Converter' })).toBeVisible();
  });

  test('converts Celsius to Fahrenheit', async ({ page }) => {
    await page.goto('/tools/temperature-converter');
    
    const celsiusInput = page.getByPlaceholder('Enter temperature in Celsius');
    const fahrenheitInput = page.getByPlaceholder('Enter temperature in Fahrenheit');
    
    await celsiusInput.fill('0');
    await expect(fahrenheitInput).toHaveValue('32.00');
    
    await celsiusInput.fill('100');
    await expect(fahrenheitInput).toHaveValue('212.00');
    
    await celsiusInput.fill('20');
    await expect(fahrenheitInput).toHaveValue('68.00');
  });

  test('converts Fahrenheit to Celsius', async ({ page }) => {
    await page.goto('/tools/temperature-converter');
    
    const celsiusInput = page.getByPlaceholder('Enter temperature in Celsius');
    const fahrenheitInput = page.getByPlaceholder('Enter temperature in Fahrenheit');
    
    await fahrenheitInput.fill('32');
    await expect(celsiusInput).toHaveValue('0.00');
    
    await fahrenheitInput.fill('212');
    await expect(celsiusInput).toHaveValue('100.00');
    
    await fahrenheitInput.fill('98.6');
    const celsiusValue = await celsiusInput.inputValue();
    expect(parseFloat(celsiusValue)).toBeCloseTo(37, 0);
  });

  test('handles negative temperatures', async ({ page }) => {
    await page.goto('/tools/temperature-converter');
    
    const celsiusInput = page.getByPlaceholder('Enter temperature in Celsius');
    const fahrenheitInput = page.getByPlaceholder('Enter temperature in Fahrenheit');
    
    await celsiusInput.fill('-40');
    await expect(fahrenheitInput).toHaveValue('-40.00');
    
    await celsiusInput.fill('-10');
    const fahrenheitValue = await fahrenheitInput.inputValue();
    expect(parseFloat(fahrenheitValue)).toBeCloseTo(14, 0);
  });

  test('handles decimal input', async ({ page }) => {
    await page.goto('/tools/temperature-converter');
    
    const celsiusInput = page.getByPlaceholder('Enter temperature in Celsius');
    const fahrenheitInput = page.getByPlaceholder('Enter temperature in Fahrenheit');
    
    await celsiusInput.fill('36.5');
    const fahrenheitValue = await fahrenheitInput.inputValue();
    expect(parseFloat(fahrenheitValue)).toBeCloseTo(97.7, 0);
  });

  test('clears both inputs when one is cleared', async ({ page }) => {
    await page.goto('/tools/temperature-converter');
    
    const celsiusInput = page.getByPlaceholder('Enter temperature in Celsius');
    const fahrenheitInput = page.getByPlaceholder('Enter temperature in Fahrenheit');
    
    await celsiusInput.fill('25');
    await expect(fahrenheitInput).not.toHaveValue('');
    
    await celsiusInput.fill('');
    await expect(fahrenheitInput).toHaveValue('');
  });

  test('displays quick reference information', async ({ page }) => {
    await page.goto('/tools/temperature-converter');
    
    await expect(page.getByText('Quick Reference')).toBeVisible();
    await expect(page.getByText('• Water freezes at 0°C (32°F)')).toBeVisible();
    await expect(page.getByText('• Room temperature is about 20°C (68°F)')).toBeVisible();
    await expect(page.getByText('• Body temperature is 37°C (98.6°F)')).toBeVisible();
    await expect(page.getByText('• Water boils at 100°C (212°F)')).toBeVisible();
  });

  test('allows switching between inputs seamlessly', async ({ page }) => {
    await page.goto('/tools/temperature-converter');
    
    const celsiusInput = page.getByPlaceholder('Enter temperature in Celsius');
    const fahrenheitInput = page.getByPlaceholder('Enter temperature in Fahrenheit');
    
    await celsiusInput.fill('25');
    await expect(fahrenheitInput).toHaveValue('77.00');
    
    await fahrenheitInput.fill('100');
    const celsiusValue = await celsiusInput.inputValue();
    expect(parseFloat(celsiusValue)).toBeCloseTo(37.78, 1);
    
    await celsiusInput.fill('0');
    await expect(fahrenheitInput).toHaveValue('32.00');
  });

  test('displays conversion arrows between inputs', async ({ page }) => {
    await page.goto('/tools/temperature-converter');
    
    await expect(page.getByText('⇄')).toBeVisible();
  });
});

