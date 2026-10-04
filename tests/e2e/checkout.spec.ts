import { test } from '../../fixtures/test';
import { PRODUCTS, CUSTOMER } from '../../test-data/products';

// This test starts logged in. See auth.setup.ts and the "e2e" project in playwright.config.ts.
test('a logged-in user can buy a product', { tag: ['@smoke'] }, async ({ inventoryPage, checkoutPage }) => {
  await inventoryPage.goto();
  await inventoryPage.expectLoaded();

  await inventoryPage.addToCart(PRODUCTS.backpack);
  await inventoryPage.expectCartCount(1);
  await inventoryPage.openCart();
  await checkoutPage.expectCartItems(1);

  await checkoutPage.startCheckout();
  await checkoutPage.fillCustomerDetails(CUSTOMER.firstName, CUSTOMER.lastName, CUSTOMER.postalCode);
  await checkoutPage.finish();
  await checkoutPage.expectOrderComplete();
});
