import { test, expect } from '@playwright/test';

test.describe('Badminton Manager', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays badminton manager card on home page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Badminton Manager/i })).toBeVisible();
    await expect(page.getByText('Manage your badminton games, players, and tournaments.')).toBeVisible();
  });

  test('navigates to badminton manager from home page', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Tool →' }).last().click();
    await expect(page).toHaveURL(/\/badminton-manager$/);
    await expect(page.getByRole('heading', { name: 'Badminton Manager' })).toBeVisible();
  });

  test('displays the iframe with correct src', async ({ page }) => {
    await page.goto('/badminton-manager');

    const iframe = page.getByTestId('badminton-iframe');
    await expect(iframe).toBeVisible();
    await expect(iframe).toHaveAttribute('src', 'https://sylhare.github.io/Badminton/');
  });

  test('displays the description text', async ({ page }) => {
    await page.goto('/badminton-manager');

    await expect(page.getByText('Manage your badminton games, players, and tournaments')).toBeVisible();
  });

  test('displays the about section', async ({ page }) => {
    await page.goto('/badminton-manager');

    await expect(page.getByText('About')).toBeVisible();
    await expect(page.getByText('• Organize badminton matches and tournaments')).toBeVisible();
    await expect(page.getByText('• Track player statistics and rankings')).toBeVisible();
    await expect(page.getByText('• Generate match schedules automatically')).toBeVisible();
    await expect(page.getByText('• Manage team compositions and rotations')).toBeVisible();
  });

  test('iframe has correct title for accessibility', async ({ page }) => {
    await page.goto('/badminton-manager');

    const iframe = page.getByTestId('badminton-iframe');
    await expect(iframe).toHaveAttribute('title', 'Badminton Manager');
  });

  test('can navigate back to home from badminton manager', async ({ page }) => {
    await page.goto('/badminton-manager');

    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Available Tools' })).toBeVisible();
  });
});

