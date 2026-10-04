import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

// Load .env if it exists. .env.example has the default values.
dotenv.config({ quiet: true });

export const config = {
  ui: {
    baseURL: process.env.UI_BASE_URL ?? 'https://www.saucedemo.com',
    username: process.env.UI_USERNAME ?? 'standard_user',
    password: process.env.UI_PASSWORD ?? 'secret_sauce',
  },
  api: {
    baseURL: process.env.API_BASE_URL ?? 'https://restful-booker.herokuapp.com',
    username: process.env.API_USERNAME ?? 'admin',
    password: process.env.API_PASSWORD ?? 'password123',
  },
};

// The logged-in browser state that the "setup" project saves and the "e2e" project reuses.
export const STORAGE_STATE = '.auth/user.json';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: process.env.CI ? 'never' : 'on-failure' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
  ],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    // UI tests: each test starts on the login page.
    {
      name: 'ui',
      testDir: './tests/ui',
      use: { ...devices['Desktop Chrome'], baseURL: config.ui.baseURL },
    },
    // API tests: no browser. "request" is the only fixture these tests need.
    {
      name: 'api',
      testDir: './tests/api',
      use: { baseURL: config.api.baseURL },
    },
    // Setup: log in once and save the browser state to a file.
    {
      name: 'setup',
      testDir: './tests/e2e',
      testMatch: /.*\.setup\.ts/,
      use: { ...devices['Desktop Chrome'], baseURL: config.ui.baseURL },
    },
    // E2E tests: start already logged in, by loading the saved state.
    {
      name: 'e2e',
      testDir: './tests/e2e',
      testIgnore: /.*\.setup\.ts/,
      dependencies: ['setup'],
      use: { ...devices['Desktop Chrome'], baseURL: config.ui.baseURL, storageState: STORAGE_STATE },
    },
  ],
});
