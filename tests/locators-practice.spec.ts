import { test, expect } from '@playwright/test';

test.describe('Example', () => {
  test('has title', async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    page.getByRole("link", { name: "Practice Test Automation", exact: true });
    page.getByRole("link", { name: "Home" });
    page.getByRole("link", { name: "Blog" });
    page.getByText("Test login", {exact: true});
    page.getByText('student').nth(1);
    page.getByText('Password123').first();
    page.getByText("Username", {exact: true});
    page.getByRole("textbox", { name : 'Username' } );
    page.getByText("Password", {exact: true});
    page.getByRole("textbox", { name : 'Password' } );
    page.getByRole("button", { name : 'Submit' } );
  });
});