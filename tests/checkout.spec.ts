import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";
import { InventoryPage } from "./pages/InventoryPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { Users, Products, ProductNames, CheckoutInfo } from "../test-data/users";

test.describe("Checkout", () => {
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.open();
    await loginPage.login(Users.standard.username, Users.standard.password);
    await inventoryPage.addToCart(Products.backpack);
    await inventoryPage.goToCart();
    await new CartPage(page).goToCheckout();
  });

  test("complete checkout flow shows success message", async () => {
    await test.step("enter shipping info", async () => {
      await checkoutPage.fillInfo(
        CheckoutInfo.firstName,
        CheckoutInfo.lastName,
        CheckoutInfo.postalCode
      );
      await checkoutPage.continueButton.click();
    });

    await test.step("overview page shows selected product", async () => {
      await expect(checkoutPage.summaryItems).toHaveCount(1);
      await expect(checkoutPage.summaryItemNames).toContainText(ProductNames.backpack);
    });

    await test.step("finish order", async () => {
      await checkoutPage.finishButton.click();
    });

    await test.step("success message is visible", async () => {
      await expect(checkoutPage.completeHeader).toContainText("Thank you for your order!");
    });
  });
});
