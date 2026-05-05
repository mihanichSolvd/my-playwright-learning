import { test, expect } from "@playwright/test";

test.describe("Login functionality", () => {

  test.beforeEach(async ({ page }) => {
     await page.goto('https://practicetestautomation.com/practice-test-login/');
  });

  test("successful login with valid credentials", async ({ page }) => {
    await page.getByLabel("Username").fill("student");
    await page.getByLabel("Password").fill("Password123");
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page).toHaveURL(/.*logged-in-successfully/);
    await expect(page.getByRole("heading", { name: /Logged In Successfully/ })).toBeVisible();
  });

  test("Failure login with invalid credentials", async ({ page }) => {
    await page.getByLabel("Username").fill("student");
    await page.getByLabel("Password").fill("wrongPass");
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.locator('#error')).toHaveText("Your password is invalid!");
  });

    test("Failure login with empty credentials", async ({ page }) => {
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.locator('#error')).toHaveText("Your username is invalid!");
  });
});
