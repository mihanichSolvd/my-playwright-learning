import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";
import { InventoryPage } from "./pages/InventoryPage";
import { Users } from "../test-data/users";

test.describe("Inventory", () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.open();
    await loginPage.login(Users.standard.username, Users.standard.password);
  });

  test("inventory page is visible after login", async () => {
    await expect(inventoryPage.inventoryList).toBeVisible();
    await expect(inventoryPage.title).toBeVisible();
  });

  test("inventory shows 6 products", async () => {
    await expect(inventoryPage.inventoryItems).toHaveCount(6);
  });

  test("each product has name, price, and add-to-cart button", async () => {
    const count = await inventoryPage.inventoryItems.count();
    for (let i = 0; i < count; i++) {
      const item = inventoryPage.inventoryItems.nth(i);
      await expect(item.locator('[data-test="inventory-item-name"]'), `product ${i}: name missing`).toBeVisible();
      await expect(item.locator('[data-test="inventory-item-price"]'), `product ${i}: price missing`).toBeVisible();
      await expect(item.locator("button"), `product ${i}: add-to-cart button missing`).toBeVisible();
    }
  });
});
