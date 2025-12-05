import { test, expect } from '@playwright/test';

test.describe('Volume Converter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/volume-converter');
  });

  test.describe('Page Load', () => {
    test('should load the volume converter page', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Volume Converter' })).toBeVisible();
      await expect(page.getByText('Convert volumes between metric and imperial units')).toBeVisible();
    });

    test('should display all input fields', async ({ page }) => {
      await expect(page.getByPlaceholder('Enter mL')).toBeVisible();
      await expect(page.getByPlaceholder('Enter L')).toBeVisible();
      await expect(page.getByPlaceholder('Enter tsp')).toBeVisible();
      await expect(page.getByPlaceholder('Enter tbsp')).toBeVisible();
      await expect(page.getByPlaceholder('Enter fl oz')).toBeVisible();
      await expect(page.getByPlaceholder('Enter cups')).toBeVisible();
    });

    test('should display quick reference card', async ({ page }) => {
      await expect(page.getByText('Quick Reference')).toBeVisible();
      await expect(page.getByText('1 cup = 236.6 mL')).toBeVisible();
    });

    test('should display cooking tips card', async ({ page }) => {
      await expect(page.getByText('Cooking Tips')).toBeVisible();
      await expect(page.getByText(/For water and similar liquids/)).toBeVisible();
    });

    test('should display clear all button', async ({ page }) => {
      await expect(page.getByRole('button', { name: 'Clear All' })).toBeVisible();
    });
  });

  test.describe('mL to Cups Conversion', () => {
    test('should convert 236.6 mL to approximately 1 cup', async ({ page }) => {
      const mlInput = page.getByPlaceholder('Enter mL');
      const cupInput = page.getByPlaceholder('Enter cups');

      await mlInput.fill('236.6');

      await expect(cupInput).toHaveValue(/^1\.0/);
    });

    test('should convert 1000 mL to liters', async ({ page }) => {
      const mlInput = page.getByPlaceholder('Enter mL');
      const literInput = page.getByPlaceholder('Enter L');

      await mlInput.fill('1000');

      await expect(literInput).toHaveValue('1.0');
    });

    test('should clear other fields when mL is cleared', async ({ page }) => {
      const mlInput = page.getByPlaceholder('Enter mL');
      const cupInput = page.getByPlaceholder('Enter cups');

      await mlInput.fill('500');
      await expect(cupInput).not.toHaveValue('');

      await mlInput.clear();
      await expect(cupInput).toHaveValue('');
    });
  });

  test.describe('Cups to Other Units Conversion', () => {
    test('should convert 1 cup to mL', async ({ page }) => {
      const cupInput = page.getByPlaceholder('Enter cups');
      const mlInput = page.getByPlaceholder('Enter mL');

      await cupInput.fill('1');

      await expect(mlInput).toHaveValue(/^236\.[0-9]/);
    });

    test('should convert 1 cup to fluid ounces', async ({ page }) => {
      const cupInput = page.getByPlaceholder('Enter cups');
      const flozInput = page.getByPlaceholder('Enter fl oz');

      await cupInput.fill('1');

      await expect(flozInput).toHaveValue(/^8\.0/);
    });

    test('should convert 1 cup to tablespoons', async ({ page }) => {
      const cupInput = page.getByPlaceholder('Enter cups');
      const tbspInput = page.getByPlaceholder('Enter tbsp');

      await cupInput.fill('1');

      await expect(tbspInput).toHaveValue(/^16\.0/);
    });
  });

  test.describe('Tablespoon and Teaspoon Conversions', () => {
    test('should convert 3 teaspoons to 1 tablespoon', async ({ page }) => {
      const tspInput = page.getByPlaceholder('Enter tsp');
      const tbspInput = page.getByPlaceholder('Enter tbsp');

      await tspInput.fill('3');

      await expect(tbspInput).toHaveValue(/^1\.0/);
    });

    test('should convert 16 tablespoons to 1 cup', async ({ page }) => {
      const tbspInput = page.getByPlaceholder('Enter tbsp');
      const cupInput = page.getByPlaceholder('Enter cups');

      await tbspInput.fill('16');

      await expect(cupInput).toHaveValue(/^1\.0/);
    });

    test('should convert tablespoons to mL', async ({ page }) => {
      const tbspInput = page.getByPlaceholder('Enter tbsp');
      const mlInput = page.getByPlaceholder('Enter mL');

      await tbspInput.fill('1');

      await expect(mlInput).toHaveValue(/^14\.[0-9]/);
    });
  });

  test.describe('Multiple Field Updates', () => {
    test('should update all fields when changing between different units', async ({ page }) => {
      const mlInput = page.getByPlaceholder('Enter mL');
      const cupInput = page.getByPlaceholder('Enter cups');
      const flozInput = page.getByPlaceholder('Enter fl oz');

      await mlInput.fill('500');
      await expect(cupInput).not.toHaveValue('');
      await expect(flozInput).not.toHaveValue('');

      await cupInput.fill('2');
      await expect(mlInput).toHaveValue(/^473\.[0-9]/);
      await expect(flozInput).toHaveValue(/^16\.0/);

      await flozInput.fill('10');
      await expect(mlInput).toHaveValue(/^295\.[0-9]/);
      await expect(cupInput).toHaveValue(/^1\.[0-9]/);
    });

    test('should maintain synchronization across rapid changes', async ({ page }) => {
      const cupInput = page.getByPlaceholder('Enter cups');
      const mlInput = page.getByPlaceholder('Enter mL');

      await cupInput.fill('1');
      await cupInput.fill('2');
      await cupInput.fill('3');

      await expect(mlInput).toHaveValue(/^709\.[0-9]/);
    });
  });

  test.describe('Edge Cases', () => {
    test('should handle zero values', async ({ page }) => {
      const mlInput = page.getByPlaceholder('Enter mL');
      const cupInput = page.getByPlaceholder('Enter cups');

      await mlInput.fill('0');

      await expect(cupInput).toHaveValue('0.0');
    });

    test('should handle very large numbers', async ({ page }) => {
      const mlInput = page.getByPlaceholder('Enter mL');
      const literInput = page.getByPlaceholder('Enter L');

      await mlInput.fill('1000000');

      await expect(literInput).toHaveValue('1000.0');
    });

    test('should handle very small decimal values', async ({ page }) => {
      const mlInput = page.getByPlaceholder('Enter mL');
      const cupInput = page.getByPlaceholder('Enter cups');

      await mlInput.fill('0.1');

      await expect(cupInput).not.toHaveValue('');
    });

    test('should handle decimal input values', async ({ page }) => {
      const cupInput = page.getByPlaceholder('Enter cups');
      const mlInput = page.getByPlaceholder('Enter mL');

      await cupInput.fill('1.5');

      await expect(mlInput).toHaveValue(/^354\.[0-9]/);
    });
  });

  test.describe('Clear All Functionality', () => {
    test('should clear all fields when Clear All button is clicked', async ({ page }) => {
      const mlInput = page.getByPlaceholder('Enter mL');
      const cupInput = page.getByPlaceholder('Enter cups');
      const flozInput = page.getByPlaceholder('Enter fl oz');
      const clearButton = page.getByRole('button', { name: 'Clear All' });

      await mlInput.fill('500');
      await expect(cupInput).not.toHaveValue('');
      await expect(flozInput).not.toHaveValue('');

      await clearButton.click();

      await expect(mlInput).toHaveValue('');
      await expect(cupInput).toHaveValue('');
      await expect(flozInput).toHaveValue('');
    });

    test('should allow new conversions after clearing', async ({ page }) => {
      const cupInput = page.getByPlaceholder('Enter cups');
      const mlInput = page.getByPlaceholder('Enter mL');
      const clearButton = page.getByRole('button', { name: 'Clear All' });

      await cupInput.fill('2');
      await clearButton.click();

      await cupInput.fill('1');
      await expect(mlInput).toHaveValue(/^236\.[0-9]/);
    });
  });

  test.describe('Precision and Formatting', () => {
    test('should display values with 1 decimal place', async ({ page }) => {
      const cupInput = page.getByPlaceholder('Enter cups');
      const mlInput = page.getByPlaceholder('Enter mL');

      await cupInput.fill('1');

      const mlValue = await mlInput.inputValue();
      expect(mlValue).toMatch(/^\d+\.\d$/);
    });

    test('should handle rounding correctly', async ({ page }) => {
      const literInput = page.getByPlaceholder('Enter L');
      const cupInput = page.getByPlaceholder('Enter cups');

      await literInput.fill('1');

      await expect(cupInput).toHaveValue(/^4\.2/);
    });
  });

  test.describe('Known Reference Values', () => {
    test('should verify 1 liter equals 1000 mL', async ({ page }) => {
      const literInput = page.getByPlaceholder('Enter L');
      const mlInput = page.getByPlaceholder('Enter mL');

      await literInput.fill('1');

      await expect(mlInput).toHaveValue('1000.0');
    });

    test('should verify 8 fl oz equals 1 cup', async ({ page }) => {
      const flozInput = page.getByPlaceholder('Enter fl oz');
      const cupInput = page.getByPlaceholder('Enter cups');

      await flozInput.fill('8');

      await expect(cupInput).toHaveValue(/^1\.0/);
    });

    test('should verify 3 teaspoons equals 1 tablespoon', async ({ page }) => {
      const tspInput = page.getByPlaceholder('Enter tsp');
      const tbspInput = page.getByPlaceholder('Enter tbsp');

      await tspInput.fill('3');

      await expect(tbspInput).toHaveValue(/^1\.0/);
    });
  });
});

