import { test, expect } from '@playwright/test';

test.describe('Measurement Converter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/measurement-converter');
  });

  test.describe('Page Load', () => {
    test('should load the measurement converter page', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Length Converter' })).toBeVisible();
      await expect(page.getByText('Convert lengths between metric and imperial units')).toBeVisible();
    });

    test('should display metric system section', async ({ page }) => {
      await expect(page.getByText('Metric System')).toBeVisible();
    });

    test('should display imperial system section', async ({ page }) => {
      await expect(page.getByText('Imperial System')).toBeVisible();
    });

    test('should display all metric input fields', async ({ page }) => {
      await expect(page.getByPlaceholder('Enter mm')).toBeVisible();
      await expect(page.getByPlaceholder('Enter cm')).toBeVisible();
      await expect(page.getByPlaceholder('Enter m')).toBeVisible();
      await expect(page.getByPlaceholder('Enter km')).toBeVisible();
    });

    test('should display all imperial input fields', async ({ page }) => {
      await expect(page.getByPlaceholder('Enter in')).toBeVisible();
      await expect(page.getByPlaceholder('Enter ft')).toBeVisible();
      await expect(page.getByPlaceholder('Enter yd')).toBeVisible();
      await expect(page.getByPlaceholder('Enter mi')).toBeVisible();
    });

    test('should display quick reference card', async ({ page }) => {
      await expect(page.getByText('Quick Reference')).toBeVisible();
      await expect(page.getByText('1 inch = 2.54 cm')).toBeVisible();
    });

    test('should display size reference card', async ({ page }) => {
      await expect(page.getByText('Size Reference')).toBeVisible();
      await expect(page.getByText(/Credit card/)).toBeVisible();
    });

    test('should display clear all button', async ({ page }) => {
      await expect(page.getByRole('button', { name: 'Clear All' })).toBeVisible();
    });
  });

  test.describe('Inch to Centimeter Conversion', () => {
    test('should convert 1 inch to 2.54 cm', async ({ page }) => {
      const inchInput = page.getByPlaceholder('Enter in');
      const cmInput = page.getByPlaceholder('Enter cm');

      await inchInput.fill('1');
      
      await expect(cmInput).toHaveValue('2.54');
    });

    test('should convert 10 inches to cm', async ({ page }) => {
      const inchInput = page.getByPlaceholder('Enter in');
      const cmInput = page.getByPlaceholder('Enter cm');

      await inchInput.fill('10');
      
      await expect(cmInput).toHaveValue('25.40');
    });

    test('should clear other fields when inches is cleared', async ({ page }) => {
      const inchInput = page.getByPlaceholder('Enter in');
      const cmInput = page.getByPlaceholder('Enter cm');

      await inchInput.fill('5');
      await expect(cmInput).not.toHaveValue('');

      await inchInput.clear();
      await expect(cmInput).toHaveValue('');
    });
  });

  test.describe('Meter to Feet Conversion', () => {
    test('should convert 1 meter to feet', async ({ page }) => {
      const meterInput = page.getByPlaceholder('Enter m');
      const feetInput = page.getByPlaceholder('Enter ft');

      await meterInput.fill('1');
      
      await expect(feetInput).toHaveValue(/^3\.28/);
    });

    test('should convert 10 meters to feet', async ({ page }) => {
      const meterInput = page.getByPlaceholder('Enter m');
      const feetInput = page.getByPlaceholder('Enter ft');

      await meterInput.fill('10');
      
      await expect(feetInput).toHaveValue(/^32\.8/);
    });

    test('should convert meters to inches', async ({ page }) => {
      const meterInput = page.getByPlaceholder('Enter m');
      const inchInput = page.getByPlaceholder('Enter in');

      await meterInput.fill('1');
      
      await expect(inchInput).toHaveValue(/^39\.3/);
    });
  });

  test.describe('Kilometer to Mile Conversion', () => {
    test('should convert 1 km to miles', async ({ page }) => {
      const kmInput = page.getByPlaceholder('Enter km');
      const miInput = page.getByPlaceholder('Enter mi');

      await kmInput.fill('1');
      
      await expect(miInput).toHaveValue(/^0\.62/);
    });

    test('should convert 10 km to miles', async ({ page }) => {
      const kmInput = page.getByPlaceholder('Enter km');
      const miInput = page.getByPlaceholder('Enter mi');

      await kmInput.fill('10');
      
      await expect(miInput).toHaveValue(/^6\.2/);
    });

    test('should convert miles to km', async ({ page }) => {
      const miInput = page.getByPlaceholder('Enter mi');
      const kmInput = page.getByPlaceholder('Enter km');

      await miInput.fill('1');
      
      await expect(kmInput).toHaveValue(/^1\.60/);
    });
  });

  test.describe('Metric Unit Conversions', () => {
    test('should convert 1000 mm to 100 cm', async ({ page }) => {
      const mmInput = page.getByPlaceholder('Enter mm');
      const cmInput = page.getByPlaceholder('Enter cm');

      await mmInput.fill('1000');
      
      await expect(cmInput).toHaveValue('100.00');
    });

    test('should convert 100 cm to 1 m', async ({ page }) => {
      const cmInput = page.getByPlaceholder('Enter cm');
      const mInput = page.getByPlaceholder('Enter m');

      await cmInput.fill('100');
      
      await expect(mInput).toHaveValue('1.00');
    });

    test('should convert 1000 m to 1 km', async ({ page }) => {
      const mInput = page.getByPlaceholder('Enter m');
      const kmInput = page.getByPlaceholder('Enter km');

      await mInput.fill('1000');
      
      await expect(kmInput).toHaveValue('1.00');
    });

    test('should handle decimal metric values', async ({ page }) => {
      const cmInput = page.getByPlaceholder('Enter cm');
      const mmInput = page.getByPlaceholder('Enter mm');

      await cmInput.fill('2.5');
      
      await expect(mmInput).toHaveValue('25.00');
    });
  });

  test.describe('Imperial Unit Conversions', () => {
    test('should convert 12 inches to 1 foot', async ({ page }) => {
      const inchInput = page.getByPlaceholder('Enter in');
      const footInput = page.getByPlaceholder('Enter ft');

      await inchInput.fill('12');
      
      await expect(footInput).toHaveValue(/^1\.00/);
    });

    test('should convert 3 feet to 1 yard', async ({ page }) => {
      const footInput = page.getByPlaceholder('Enter ft');
      const yardInput = page.getByPlaceholder('Enter yd');

      await footInput.fill('3');
      
      await expect(yardInput).toHaveValue(/^1\.00/);
    });

    test('should convert yards to inches', async ({ page }) => {
      const yardInput = page.getByPlaceholder('Enter yd');
      const inchInput = page.getByPlaceholder('Enter in');

      await yardInput.fill('1');
      
      await expect(inchInput).toHaveValue(/^36\.00/);
    });

    test('should handle decimal imperial values', async ({ page }) => {
      const footInput = page.getByPlaceholder('Enter ft');
      const inchInput = page.getByPlaceholder('Enter in');

      await footInput.fill('2.5');
      
      await expect(inchInput).toHaveValue(/^30\.00/);
    });
  });

  test.describe('Cross-System Conversions', () => {
    test('should convert between metric and imperial systems', async ({ page }) => {
      const cmInput = page.getByPlaceholder('Enter cm');
      const inchInput = page.getByPlaceholder('Enter in');
      const mmInput = page.getByPlaceholder('Enter mm');

      await cmInput.fill('10');
      
      await expect(inchInput).toHaveValue(/^3\.9/);
      await expect(mmInput).toHaveValue('100.00');
    });

    test('should update all units when switching systems', async ({ page }) => {
      const inchInput = page.getByPlaceholder('Enter in');
      const cmInput = page.getByPlaceholder('Enter cm');
      const mmInput = page.getByPlaceholder('Enter mm');
      const mInput = page.getByPlaceholder('Enter m');

      await inchInput.fill('1');
      await expect(cmInput).toHaveValue('2.54');
      
      await cmInput.fill('5');
      await expect(inchInput).toHaveValue(/^1\.9/);
      await expect(mmInput).toHaveValue('50.00');
      await expect(mInput).toHaveValue('0.05');
    });
  });

  test.describe('Edge Cases', () => {
    test('should handle zero values', async ({ page }) => {
      const cmInput = page.getByPlaceholder('Enter cm');
      const inchInput = page.getByPlaceholder('Enter in');

      await cmInput.fill('0');
      
      await expect(inchInput).toHaveValue('0.00');
    });

    test('should handle very large numbers', async ({ page }) => {
      const mInput = page.getByPlaceholder('Enter m');
      const kmInput = page.getByPlaceholder('Enter km');

      await mInput.fill('1000000');
      
      await expect(kmInput).toHaveValue('1000.00');
    });

    test('should handle very small decimal values', async ({ page }) => {
      const mInput = page.getByPlaceholder('Enter m');
      const cmInput = page.getByPlaceholder('Enter cm');

      await mInput.fill('0.01');
      
      await expect(cmInput).toHaveValue('1.00');
    });

    test('should handle negative values', async ({ page }) => {
      const cmInput = page.getByPlaceholder('Enter cm');
      const inchInput = page.getByPlaceholder('Enter in');

      await cmInput.fill('-10');
      
      await expect(inchInput).toHaveValue(/^-/);
    });
  });

  test.describe('Clear All Functionality', () => {
    test('should clear all fields when Clear All button is clicked', async ({ page }) => {
      const cmInput = page.getByPlaceholder('Enter cm');
      const inchInput = page.getByPlaceholder('Enter in');
      const mInput = page.getByPlaceholder('Enter m');
      const clearButton = page.getByRole('button', { name: 'Clear All' });

      await cmInput.fill('100');
      await expect(inchInput).not.toHaveValue('');
      await expect(mInput).not.toHaveValue('');

      await clearButton.click();

      await expect(cmInput).toHaveValue('');
      await expect(inchInput).toHaveValue('');
      await expect(mInput).toHaveValue('');
    });

    test('should allow new conversions after clearing', async ({ page }) => {
      const inchInput = page.getByPlaceholder('Enter in');
      const cmInput = page.getByPlaceholder('Enter cm');
      const clearButton = page.getByRole('button', { name: 'Clear All' });

      await inchInput.fill('10');
      await clearButton.click();
      
      await inchInput.fill('1');
      await expect(cmInput).toHaveValue('2.54');
    });
  });

  test.describe('Precision and Formatting', () => {
    test('should display values with 2 decimal places', async ({ page }) => {
      const inchInput = page.getByPlaceholder('Enter in');
      const cmInput = page.getByPlaceholder('Enter cm');

      await inchInput.fill('1');
      
      const cmValue = await cmInput.inputValue();
      expect(cmValue).toMatch(/^\d+\.\d{2}$/);
    });

    test('should handle rounding correctly', async ({ page }) => {
      const kmInput = page.getByPlaceholder('Enter km');
      const miInput = page.getByPlaceholder('Enter mi');

      await kmInput.fill('1.6');
      
      await expect(miInput).toHaveValue(/^\d+\.\d{2}$/);
    });
  });

  test.describe('Known Reference Values', () => {
    test('should verify 1 foot equals 12 inches', async ({ page }) => {
      const footInput = page.getByPlaceholder('Enter ft');
      const inchInput = page.getByPlaceholder('Enter in');

      await footInput.fill('1');
      
      await expect(inchInput).toHaveValue(/^12\.00/);
    });

    test('should verify 1 yard equals 3 feet', async ({ page }) => {
      const yardInput = page.getByPlaceholder('Enter yd');
      const footInput = page.getByPlaceholder('Enter ft');

      await yardInput.fill('1');
      
      await expect(footInput).toHaveValue(/^3\.00/);
    });

    test('should verify 1 meter equals 100 cm', async ({ page }) => {
      const mInput = page.getByPlaceholder('Enter m');
      const cmInput = page.getByPlaceholder('Enter cm');

      await mInput.fill('1');
      
      await expect(cmInput).toHaveValue('100.00');
    });

    test('should verify 1 km equals 1000 meters', async ({ page }) => {
      const kmInput = page.getByPlaceholder('Enter km');
      const mInput = page.getByPlaceholder('Enter m');

      await kmInput.fill('1');
      
      await expect(mInput).toHaveValue('1000.00');
    });
  });
});



