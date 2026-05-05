import { test, expect } from '@playwright/test';

test.describe('Example', () => {
  test('page has titles', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    await expect(page.getByRole('link', { name: 'Practice Test Automation', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Blog' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Test login' })).toBeVisible();
    await expect(page.getByText('student').nth(1)).toBeVisible();
    await expect(page.getByText('Password123').first()).toBeVisible();
    await expect(page.getByText('Username', { exact: true })).toBeVisible();
    await expect(page.getByText('Password', { exact: true })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
  });
});