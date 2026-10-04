import { Page, expect } from '@playwright/test';

// Page object for the product list that shows after login.
export class InventoryPage {
  constructor(private page: Page) {}

  private items() { return this.page.locator('.inventory_item'); }
  private cartBadge() { return this.page.locator('.shopping_cart_badge'); }
  private cartLink() { return this.page.locator('.shopping_cart_link'); }
  private addToCartButton(productSlug: string) {
    return this.page.locator(`[data-test="add-to-cart-${productSlug}"]`);
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.items().first()).toBeVisible();
  }

  async itemCount() {
    return this.items().count();
  }

  async addToCart(productSlug: string) {
    await this.addToCartButton(productSlug).click();
  }

  async expectCartCount(count: number) {
    await expect(this.cartBadge()).toHaveText(String(count));
  }

  async openCart() {
    await this.cartLink().click();
  }
}
