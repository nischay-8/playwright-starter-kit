import { Page, expect } from '@playwright/test';

// Page object for the Sauce Demo login page.
// Locators are private getters. Actions are public async methods.
export class LoginPage {
  constructor(private page: Page) {}

  private usernameInput() { return this.page.locator('#user-name'); }
  private passwordInput() { return this.page.locator('#password'); }
  private loginButton() { return this.page.locator('#login-button'); }
  private errorMessage() { return this.page.locator('[data-test="error"]'); }

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.usernameInput().fill(username);
    await this.passwordInput().fill(password);
    await this.loginButton().click();
  }

  async expectError(text: string) {
    await expect(this.errorMessage()).toContainText(text);
  }
}
