import { type Locator, type Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly items: Locator;
  readonly itemNames: Locator;
  readonly cartBadge: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.items = page.locator('[data-test="inventory-item"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  removeItem(itemKey: string): Promise<void> {
    return this.page.locator(`[data-test="remove-${itemKey}"]`).click();
  }

  goToCheckout(): Promise<void> {
    return this.checkoutButton.click();
  }
}
