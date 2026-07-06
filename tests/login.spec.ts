import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";
import { Users } from "../test-data/users";

test.describe("Login", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test("standard user can log in", async ({ page }) => {
    await loginPage.login(Users.standard.username, Users.standard.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test("locked user sees error message", async () => {
    await loginPage.login(Users.locked.username, Users.locked.password);
    await expect(loginPage.errorMessage).toContainText("Sorry, this user has been locked out.");
  });

  test("wrong password shows error message", async () => {
    await loginPage.login(Users.wrongPassword.username, Users.wrongPassword.password);
    await expect(loginPage.errorMessage).toContainText("Username and password do not match any user in this service");
  });

  test("empty username shows validation error", async () => {
    await loginPage.login("", Users.standard.password);
    await expect(loginPage.errorMessage).toContainText("Username is required");
  });
});
