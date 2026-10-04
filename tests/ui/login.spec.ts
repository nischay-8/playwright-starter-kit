import { test } from '../../fixtures/test';
import { config } from '../../playwright.config';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('a valid user can log in', { tag: ['@smoke'] }, async ({ loginPage, inventoryPage }) => {
    await loginPage.login(config.ui.username, config.ui.password);
    await inventoryPage.expectLoaded();
  });

  test('a wrong password shows an error', async ({ loginPage }) => {
    await loginPage.login(config.ui.username, 'wrong-password');
    await loginPage.expectError('Username and password do not match');
  });

  test('a locked out user shows an error', async ({ loginPage }) => {
    await loginPage.login('locked_out_user', config.ui.password);
    await loginPage.expectError('Sorry, this user has been locked out');
  });
});
