import { test, expect } from '@playwright/test';

test.describe('Password Generator', () => {
  test('happy path: generate password, toggle options, regenerate', async ({ page }) => {
    await page.goto('/password-generator');

    await expect(page.getByRole('heading', { name: 'Password Generator' })).toBeVisible();

    const passwordInput = page.getByTestId('password-output');
    await expect(passwordInput).not.toHaveValue('');
    const initialPassword = await passwordInput.inputValue();
    expect(initialPassword.length).toBe(16);

    await page.getByTestId('lowercase-checkbox').click();
    await page.getByTestId('numbers-checkbox').click();
    await page.getByTestId('special-checkbox').click();

    await page.getByTestId('generate-button').click();

    const uppercaseOnlyPassword = await passwordInput.inputValue();
    expect(uppercaseOnlyPassword).toMatch(/^[A-Z]+$/);

    await page.getByTestId('lowercase-checkbox').click();
    await page.getByTestId('generate-button').click();

    const mixedPassword = await passwordInput.inputValue();
    expect(mixedPassword).toMatch(/[A-Za-z]/);
  });

  test('copy button copies password to clipboard', async ({ page, context, browserName }) => {
    test.skip(browserName !== 'chromium', 'Clipboard permissions are only supported in Chromium');
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/password-generator');

    const passwordInput = page.getByTestId('password-output');
    const password = await passwordInput.inputValue();

    await page.getByTestId('copy-button').click();

    const clipboardContent = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardContent).toBe(password);
  });
});
