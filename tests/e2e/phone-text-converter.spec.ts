import { test, expect } from '@playwright/test';

test.describe('Phone Text Converter', () => {
  test('happy path: convert text to phone sequences and back', async ({ page }) => {
    await page.goto('/phone-text-converter');

    await expect(page.getByRole('heading', { name: 'Phone Keypad Converter' })).toBeVisible();

    const textInput = page.getByPlaceholder('Enter text (e.g., HELLO)');
    const phoneInput = page.getByPlaceholder('Enter sequences (e.g., 44 33 555 555 666)');

    await textInput.fill('HELLO');
    await expect(phoneInput).toHaveValue('44 33 555 555 666');

    await textInput.fill('');
    await phoneInput.fill('44 33 555 555 666');
    await expect(textInput).toHaveValue('HELLO');
  });

  test('shows breakdown output when text is typed', async ({ page }) => {
    await page.goto('/phone-text-converter');

    const textInput = page.getByPlaceholder('Enter text (e.g., HELLO)');

    await textInput.fill('HI');

    await expect(page.getByText('Breakdown')).toBeVisible();
    await expect(page.getByText('44', { exact: true })).toBeVisible();
    await expect(page.getByText('444', { exact: true })).toBeVisible();
  });

  test('both inputs and breakdown clear when text is cleared', async ({ page }) => {
    await page.goto('/phone-text-converter');

    const textInput = page.getByPlaceholder('Enter text (e.g., HELLO)');
    const phoneInput = page.getByPlaceholder('Enter sequences (e.g., 44 33 555 555 666)');

    await textInput.fill('HELLO');
    await expect(page.getByText('Breakdown')).toBeVisible();

    await textInput.fill('');
    await expect(phoneInput).toHaveValue('');
    await expect(page.getByText('Breakdown')).not.toBeVisible();
  });

  test('handles space conversion via 0', async ({ page }) => {
    await page.goto('/phone-text-converter');

    const textInput = page.getByPlaceholder('Enter text (e.g., HELLO)');
    const phoneInput = page.getByPlaceholder('Enter sequences (e.g., 44 33 555 555 666)');

    await textInput.fill('A B');
    await expect(phoneInput).toHaveValue('2 0 22');

    await textInput.fill('');
    await phoneInput.fill('2 0 22');
    await expect(textInput).toHaveValue('A B');
  });

  test('tool is directly reachable at its URL', async ({ page }) => {
    await page.goto('/phone-text-converter');

    await expect(page).toHaveURL(/phone-text-converter/);
    await expect(page.getByRole('heading', { name: 'Phone Keypad Converter' })).toBeVisible();
  });
});
