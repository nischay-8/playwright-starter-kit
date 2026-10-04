import { test as setup } from '../../fixtures/test';
import { config, STORAGE_STATE } from '../../playwright.config';

// Runs once before the e2e project. Logs in and saves cookies and local storage
// to .auth/user.json. The e2e tests load that file and start logged in.
setup('log in and save the browser state', async ({ page, loginPage, inventoryPage }) => {
  await loginPage.goto();
  await loginPage.login(config.ui.username, config.ui.password);
  await inventoryPage.expectLoaded();
  await page.context().storageState({ path: STORAGE_STATE });
});
