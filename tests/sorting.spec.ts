import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";
import { InventoryPage } from "./pages/InventoryPage";
import { Users } from "../test-data/users";

test.describe("Product sorting", () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.open();
    await loginPage.login(Users.standard.username, Users.standard.password);
  });

  test("user can select Price (low to high)", async () => {
    await inventoryPage.sortBy("lohi");
    await expect(inventoryPage.sortDropdown).toHaveValue("lohi");
  });

  test("prices are displayed in ascending order after sorting low to high", async () => {
    await inventoryPage.sortBy("lohi");

    const priceTexts = await inventoryPage.itemPrices.allTextContents();
    const prices = priceTexts.map((p) => parseFloat(p.replace("$", "")));

    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i], `price at [${i}] ($${prices[i]}) exceeds price at [${i + 1}] ($${prices[i + 1]})`).toBeLessThanOrEqual(prices[i + 1]);
    }
  });
});
