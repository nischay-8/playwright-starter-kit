import { Page, expect } from '@playwright/test';

// Page object for the cart and the 3 checkout steps.
export class CheckoutPage {
  constructor(private page: Page) {}

  private checkoutButton() { return this.page.locator('#checkout'); }
  private firstNameInput() { return this.page.locator('#first-name'); }
  private lastNameInput() { return this.page.locator('#last-name'); }
  private postalCodeInput() { return this.page.locator('#postal-code'); }
  private continueButton() { return this.page.locator('#continue'); }
  private finishButton() { return this.page.locator('#finish'); }
  private completeHeader() { return this.page.locator('.complete-header'); }
  private cartItems() { return this.page.locator('.cart_item'); }

  async expectCartItems(count: number) {
    await expect(this.cartItems()).toHaveCount(count);
  }

  async startCheckout() {
    await this.checkoutButton().click();
  }

  async fillCustomerDetails(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput().fill(firstName);
    await this.lastNameInput().fill(lastName);
    await this.postalCodeInput().fill(postalCode);
    await this.continueButton().click();
  }

  async finish() {
    await this.finishButton().click();
  }

  async expectOrderComplete() {
    await expect(this.completeHeader()).toHaveText('Thank you for your order!');
  }
}
