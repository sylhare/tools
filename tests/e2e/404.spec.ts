import { test, expect } from '@playwright/test';

test.describe('404 and SPA redirect', () => {
  test('unknown route renders NotFound page', async ({ page }) => {
    await page.goto('/this-does-not-exist');

    await expect(page.getByRole('heading', { name: '404' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Page Not Found' })).toBeVisible();
  });

  test('Go Home button navigates back to home', async ({ page }) => {
    await page.goto('/this-does-not-exist');

    await page.getByRole('link', { name: 'Go Home' }).click();

    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Tools', exact: true })).toBeVisible();
  });

  test('sessionStorage redirect restores the intended route', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => sessionStorage.setItem('spa_redirect', '/hex-rgb-converter'));

    await page.goto('/');

    await expect(page).toHaveURL('/hex-rgb-converter');
    await expect(page.getByRole('heading', { name: 'Hex to RGB Converter' })).toBeVisible();
  });

  test('sessionStorage is cleared after redirect so it does not persist', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => sessionStorage.setItem('spa_redirect', '/hex-rgb-converter'));
    await page.goto('/');

    const value = await page.evaluate(() => sessionStorage.getItem('spa_redirect'));
    expect(value).toBeNull();
  });
});
