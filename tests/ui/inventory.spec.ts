import { test, expect } from '../../fixtures/test';
import { config } from '../../playwright.config';
import { PRODUCTS } from '../../test-data/products';

test.describe('Inventory', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(config.ui.username, config.ui.password);
    await inventoryPage.expectLoaded();
  });

  test('shows 6 products', async ({ inventoryPage }) => {
    expect(await inventoryPage.itemCount()).toBe(6);
  });

  test('adding 2 products updates the cart badge', { tag: ['@smoke'] }, async ({ inventoryPage }) => {
    await inventoryPage.addToCart(PRODUCTS.backpack);
    await inventoryPage.addToCart(PRODUCTS.bikeLight);
    await inventoryPage.expectCartCount(2);
  });
});
