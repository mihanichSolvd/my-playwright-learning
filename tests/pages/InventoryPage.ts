import { type Locator, type Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly inventoryList: Locator;
  readonly inventoryItems: Locator;
  readonly title: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortDropdown: Locator;
  readonly itemPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryList = page.locator('[data-test="inventory-list"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.title = page.locator('[data-test="title"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
  }

  addToCart(itemKey: string): Promise<void> {
    return this.page.locator(`[data-test="add-to-cart-${itemKey}"]`).click();
  }

  goToCart(): Promise<void> {
    return this.cartLink.click();
  }

  async sortBy(value: string): Promise<void> {
    await this.sortDropdown.selectOption(value);
  }
}
