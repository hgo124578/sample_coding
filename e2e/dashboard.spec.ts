import { test, expect } from '@playwright/test';

test.describe('Dashboard page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page title is ダッシュボード', async ({ page }) => {
    await expect(page).toHaveTitle('ダッシュボード');
  });

  test('h1 shows ダッシュボード', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('ダッシュボード');
  });

  test('shows 4 metric cards', async ({ page }) => {
    await expect(page.locator('.rounded-2xl')).toHaveCount(4);
  });

  test('shows all metric labels', async ({ page }) => {
    await expect(page.getByText('総売上')).toBeVisible();
    await expect(page.getByText('ユーザー数')).toBeVisible();
    await expect(page.getByText('完了タスク')).toBeVisible();
    await expect(page.getByText('新規注文')).toBeVisible();
  });

  test('positive changes have green color class', async ({ page }) => {
    await expect(page.locator('.text-green-600')).toHaveCount(3);
  });

  test('negative changes have red color class', async ({ page }) => {
    await expect(page.locator('.text-red-500')).toHaveCount(1);
  });
});
