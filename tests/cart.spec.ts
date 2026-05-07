import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";
import { InventoryPage } from "./pages/InventoryPage";
import { CartPage } from "./pages/CartPage";
import { Users, Products, ProductNames } from "../test-data/users";

test.describe("Cart", () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.open();
    await loginPage.login(Users.standard.username, Users.standard.password);
  });

  test("cart badge not visible when no items added", async () => {
    await expect(inventoryPage.cartBadge).not.toBeVisible();
  });

  test("add one product shows badge count of 1", async () => {
    await inventoryPage.addToCart(Products.backpack);
    await expect(inventoryPage.cartBadge).toHaveText("1");
  });

  test("add two products shows badge count of 2", async () => {
    await inventoryPage.addToCart(Products.backpack);
    await inventoryPage.addToCart(Products.bikeLight);
    await expect(inventoryPage.cartBadge).toHaveText("2");
  });

  test("cart shows added item", async ({ page }) => {
    await inventoryPage.addToCart(Products.backpack);
    await inventoryPage.goToCart();

    const cartPage = new CartPage(page);
    await expect(cartPage.items).toHaveCount(1);
  });

  test("cart page shows name of added product", async ({ page }) => {
    await inventoryPage.addToCart(Products.backpack);
    await inventoryPage.goToCart();

    const cartPage = new CartPage(page);
    await expect(cartPage.itemNames).toContainText(ProductNames.backpack);
  });

  test("remove one product updates cart to 1 item", async ({ page }) => {
    await inventoryPage.addToCart(Products.backpack);
    await inventoryPage.addToCart(Products.bikeLight);
    await inventoryPage.goToCart();

    const cartPage = new CartPage(page);
    await cartPage.removeItem(Products.bikeLight);

    await expect(cartPage.cartBadge).toHaveText("1");
    await expect(cartPage.items).toHaveCount(1);
  });

  test("remove all products hides cart badge", async ({ page }) => {
    await inventoryPage.addToCart(Products.backpack);
    await inventoryPage.goToCart();

    const cartPage = new CartPage(page);
    await cartPage.removeItem(Products.backpack);

    await expect(cartPage.cartBadge).not.toBeVisible();
    await expect(cartPage.items).toHaveCount(0);
  });
});
