import { test, expect } from '@playwright/test';

test.describe('Badminton Manager', () => {
  test('happy path: displays iframe with external badminton app', async ({ page }) => {
    await page.goto('/badminton-manager');

    await expect(page.getByRole('heading', { name: 'Badminton Manager' })).toBeVisible();
    await expect(page.getByText('Manage your badminton games, players, and tournaments')).toBeVisible();

    const iframe = page.getByTestId('badminton-iframe');
    await expect(iframe).toBeVisible();
    await expect(iframe).toHaveAttribute('src', 'https://sylhare.github.io/Badminton/');
    await expect(iframe).toHaveAttribute('title', 'Badminton Manager');
  });
});
