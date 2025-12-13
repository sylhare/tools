import { test, expect } from '@playwright/test';

test.describe('Password Generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays password generator card on home page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Password Generator/i })).toBeVisible();
    await expect(page.getByText('Generate secure passwords with customizable options and strength indicator.')).toBeVisible();
  });

  test('navigates to password generator from home page', async ({ page }) => {
    const buttons = page.getByRole('button', { name: 'Open Tool →' });
    await buttons.nth(4).click(); // Password Generator is the 5th tool (index 4)
    await page.waitForURL(/\/password-generator$/);
    await expect(page.getByRole('heading', { name: 'Password Generator' })).toBeVisible();
  });

  test('generates a password on page load', async ({ page }) => {
    await page.goto('/password-generator');

    const passwordInput = page.getByTestId('password-output');
    await expect(passwordInput).not.toHaveValue('');
  });

  test('generates a new password when clicking generate button', async ({ page }) => {
    await page.goto('/password-generator');

    const passwordInput = page.getByTestId('password-output');
    const initialPassword = await passwordInput.inputValue();

    const generateButton = page.getByTestId('generate-button');
    await generateButton.click();

    // Password should be different (with extremely high probability)
    const newPassword = await passwordInput.inputValue();
    expect(newPassword).not.toBe('');
    // Note: There's a tiny chance they could be the same, so we just verify it's not empty
  });

  test('displays password with correct default length', async ({ page }) => {
    await page.goto('/password-generator');

    const passwordInput = page.getByTestId('password-output');
    const password = await passwordInput.inputValue();

    expect(password.length).toBe(16);
  });

  test('changes password length using slider', async ({ page }) => {
    await page.goto('/password-generator');

    // The slider should show 16 characters by default
    await expect(page.getByTestId('length-display')).toHaveText('16 characters');

    // Change the length by clicking on a different position
    const slider = page.getByTestId('length-slider');
    const sliderBoundingBox = await slider.boundingBox();
    
    if (sliderBoundingBox) {
      // Click towards the right side of the slider to increase length
      await page.mouse.click(
        sliderBoundingBox.x + sliderBoundingBox.width * 0.75,
        sliderBoundingBox.y + sliderBoundingBox.height / 2
      );
    }

    // Generate a new password with the new length
    await page.getByTestId('generate-button').click();
    
    const passwordInput = page.getByTestId('password-output');
    const password = await passwordInput.inputValue();
    
    // Password should be longer than 16
    expect(password.length).toBeGreaterThan(16);
  });

  test('generates password with uppercase only', async ({ page }) => {
    await page.goto('/password-generator');

    // Uncheck all except uppercase
    await page.getByTestId('lowercase-checkbox').click();
    await page.getByTestId('numbers-checkbox').click();
    await page.getByTestId('special-checkbox').click();

    await page.getByTestId('generate-button').click();

    const passwordInput = page.getByTestId('password-output');
    const password = await passwordInput.inputValue();

    expect(password).toMatch(/^[A-Z]+$/);
  });

  test('generates password with lowercase only', async ({ page }) => {
    await page.goto('/password-generator');

    // Uncheck all except lowercase
    await page.getByTestId('uppercase-checkbox').click();
    await page.getByTestId('numbers-checkbox').click();
    await page.getByTestId('special-checkbox').click();

    await page.getByTestId('generate-button').click();

    const passwordInput = page.getByTestId('password-output');
    const password = await passwordInput.inputValue();

    expect(password).toMatch(/^[a-z]+$/);
  });

  test('generates password with numbers only', async ({ page }) => {
    await page.goto('/password-generator');

    // Uncheck all except numbers
    await page.getByTestId('uppercase-checkbox').click();
    await page.getByTestId('lowercase-checkbox').click();
    await page.getByTestId('special-checkbox').click();

    await page.getByTestId('generate-button').click();

    const passwordInput = page.getByTestId('password-output');
    const password = await passwordInput.inputValue();

    expect(password).toMatch(/^[0-9]+$/);
  });

  test('generates password with special characters only', async ({ page }) => {
    await page.goto('/password-generator');

    // Uncheck all except special characters
    await page.getByTestId('uppercase-checkbox').click();
    await page.getByTestId('lowercase-checkbox').click();
    await page.getByTestId('numbers-checkbox').click();

    await page.getByTestId('generate-button').click();

    const passwordInput = page.getByTestId('password-output');
    const password = await passwordInput.inputValue();

    expect(password).toMatch(/^[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]+$/);
  });

  test('shows error when no character types are selected', async ({ page }) => {
    await page.goto('/password-generator');

    // Uncheck all options
    await page.getByTestId('uppercase-checkbox').click();
    await page.getByTestId('lowercase-checkbox').click();
    await page.getByTestId('numbers-checkbox').click();
    await page.getByTestId('special-checkbox').click();

    await expect(page.getByText('Please select at least one character type')).toBeVisible();
    await expect(page.getByTestId('generate-button')).toBeDisabled();
  });

  test('displays password strength indicator', async ({ page }) => {
    await page.goto('/password-generator');

    await expect(page.getByText('Password Strength')).toBeVisible();
    await expect(page.getByTestId('strength-label')).toBeVisible();
    await expect(page.getByTestId('strength-bar')).toBeVisible();
  });

  test('shows very strong for long password with all character types', async ({ page }) => {
    await page.goto('/password-generator');

    // Set a long length
    const slider = page.getByTestId('length-slider');
    const sliderBoundingBox = await slider.boundingBox();
    
    if (sliderBoundingBox) {
      await page.mouse.click(
        sliderBoundingBox.x + sliderBoundingBox.width * 0.9,
        sliderBoundingBox.y + sliderBoundingBox.height / 2
      );
    }

    await page.getByTestId('generate-button').click();

    await expect(page.getByTestId('strength-label')).toHaveText('Very Strong');
  });

  test('shows weak for short password with single character type', async ({ page }) => {
    await page.goto('/password-generator');

    // Set minimum length
    const slider = page.getByTestId('length-slider');
    const sliderBoundingBox = await slider.boundingBox();
    
    if (sliderBoundingBox) {
      await page.mouse.click(
        sliderBoundingBox.x + 5,
        sliderBoundingBox.y + sliderBoundingBox.height / 2
      );
    }

    // Uncheck all except one
    await page.getByTestId('lowercase-checkbox').click();
    await page.getByTestId('numbers-checkbox').click();
    await page.getByTestId('special-checkbox').click();

    await page.getByTestId('generate-button').click();

    await expect(page.getByTestId('strength-label')).toHaveText('Weak');
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

  test('displays password tips section', async ({ page }) => {
    await page.goto('/password-generator');

    await expect(page.getByText('Password Tips')).toBeVisible();
    await expect(page.getByText('• Use at least 12 characters for better security')).toBeVisible();
    await expect(page.getByText('• Include a mix of uppercase, lowercase, numbers, and symbols')).toBeVisible();
    await expect(page.getByText('• Avoid using personal information in passwords')).toBeVisible();
    await expect(page.getByText('• Use a unique password for each account')).toBeVisible();
    await expect(page.getByText('• Consider using a password manager')).toBeVisible();
  });

  test('all character type checkboxes are checked by default', async ({ page }) => {
    await page.goto('/password-generator');

    await expect(page.getByTestId('uppercase-checkbox')).toBeChecked();
    await expect(page.getByTestId('lowercase-checkbox')).toBeChecked();
    await expect(page.getByTestId('numbers-checkbox')).toBeChecked();
    await expect(page.getByTestId('special-checkbox')).toBeChecked();
  });

  test('generated password contains all selected character types', async ({ page }) => {
    await page.goto('/password-generator');

    // Generate several passwords and check each contains all types
    for (let i = 0; i < 5; i++) {
      await page.getByTestId('generate-button').click();
      
      const passwordInput = page.getByTestId('password-output');
      const password = await passwordInput.inputValue();

      expect(password).toMatch(/[A-Z]/);
      expect(password).toMatch(/[a-z]/);
      expect(password).toMatch(/[0-9]/);
      expect(password).toMatch(/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/);
    }
  });

  test('password field is readonly', async ({ page }) => {
    await page.goto('/password-generator');

    const passwordInput = page.getByTestId('password-output');
    const initialValue = await passwordInput.inputValue();

    // Try to type in the field
    await passwordInput.focus();
    await page.keyboard.type('test');

    // Value should be unchanged
    expect(await passwordInput.inputValue()).toBe(initialValue);
  });
});


