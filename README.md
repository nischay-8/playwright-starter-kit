# Playwright Starter Kit

# Business Context

- **Why:** This repository helps you get started with [Playwright](https://playwright.dev). The tests are simple on purpose. Each test shows one idea, so that you can read it, run it, and copy the pattern into your own project.
- **What:** 12 tests in TypeScript against 2 public demo applications:
  - **UI tests** on [Sauce Demo](https://www.saucedemo.com), a small web shop. Login, product list, cart.
  - **API tests** on [Restful Booker](https://restful-booker.herokuapp.com), a hotel booking API. Auth token, list, create, read, update, delete.
  - **End-to-end (e2e) test** that logs in once, saves the browser state, and then buys a product.

This is not a full test framework. It is a starting point.

# Where to Find & How to Use

You need [Node.js](https://nodejs.org) 20 or later and git.

```sh
git clone https://github.com/nischay-8/playwright-starter-kit.git
cd playwright-starter-kit
npm ci                                      # installs the exact versions from package-lock.json
npx playwright install --with-deps chromium  # installs the browser
npm test                                     # runs all 12 tests
```

That is all. The tests use the public demo applications, so you do not need an account or a `.env` file.

## More ways to run the tests

| Command             | What it does                                           |
|---------------------|--------------------------------------------------------|
| `npm test`          | Runs all tests: ui, api, setup and e2e                 |
| `npm run test:ui`   | Runs only the UI tests                                 |
| `npm run test:api`  | Runs only the API tests                                |
| `npm run test:e2e`  | Runs the login setup, then the e2e test                |
| `npm run test:smoke`| Runs only tests with the `@smoke` tag                  |
| `npm run test:headed` | Runs the UI tests in a visible browser               |
| `npm run test:debug`| Runs the UI tests with the Playwright Inspector        |
| `npm run report`    | Opens the HTML report of the last run                  |
| `npm run typecheck` | Checks the TypeScript types without running tests      |

Run one file: `npx playwright test tests/ui/login.spec.ts`

# Architecture

```
playwright-starter-kit/
├── playwright.config.ts   # 4 projects: ui, api, setup, e2e. Reads .env.
├── fixtures/test.ts       # Custom fixtures that give each test its page objects
├── pages/                 # Page objects (POM) for the Sauce Demo shop
│   ├── loginPage.ts
│   ├── inventoryPage.ts
│   └── checkoutPage.ts
├── api/bookingClient.ts   # One method per Restful Booker endpoint
├── test-data/             # Test data builders and constants
├── config/                # Empty on purpose: per-environment settings (see config/README.md)
├── utils/                 # Empty on purpose: shared helpers (see utils/README.md)
├── tests/
│   ├── ui/                # 5 tests: login and inventory
│   ├── api/               # 5 tests: auth and booking
│   └── e2e/               # auth.setup.ts + 1 checkout test
├── .env.example           # Default URLs and demo credentials
└── .github/workflows/     # CI: runs the tests on every push and pull request
```

## Core concepts

- **Projects.** `playwright.config.ts` defines 4 projects. The `ui` and `api` projects point to different folders and different base URLs. The `e2e` project depends on `setup`, so the login runs first.
- **Page Object Model (POM).** This project uses the POM pattern for UI tests. Each page of the web shop has one class in `pages/`. The class holds the locators and the actions of that page. Tests do not use selectors directly. If the page changes, you change one class and not every test. `fixtures/test.ts` gives the page objects to the tests.
- **Page objects.** One class per page in `pages/`. Locators are private methods. Actions and checks are public async methods. A test reads like a list of user steps.
- **Fixtures.** `fixtures/test.ts` extends the Playwright `test` with `loginPage`, `inventoryPage` and `checkoutPage`. A test asks for them in its arguments:
  ```ts
  test('a valid user can log in', async ({ loginPage, inventoryPage }) => { ... });
  ```
- **API client.** `api/bookingClient.ts` wraps the Playwright `request` fixture. Each method calls one endpoint and returns the response. The test does the asserts.
- **Saved login state.** `tests/e2e/auth.setup.ts` logs in once and writes cookies and local storage to `.auth/user.json`. The `e2e` project loads that file, so its tests start logged in.
- **Tags.** Important tests have the `@smoke` tag. `npm run test:smoke` runs only those.
- **Test data.** `test-data/bookings.ts` builds a booking with a unique last name, so that parallel runs do not collide.

## Dependencies

- `@playwright/test` — the test runner and the browser automation library.
- `dotenv` — loads `.env`.
- `typescript` and `@types/node` — type checking.

# Development

## Setup

```sh
npm ci
npx playwright install --with-deps chromium
```

To change a URL or a credential, copy `.env.example` to `.env` and edit it. The defaults work without this step.

## Build and Run

There is no build step. See [How to Use](#where-to-find--how-to-use) for the test commands.

## Lint and Format

```sh
npm run typecheck
```

## Tests and Code Analysis

```sh
npm test
npm run report
```

Reports: `playwright-report/index.html` (HTML) and `test-results/results.xml` (JUnit). On a failure, Playwright saves a screenshot. On the first retry, it also saves a trace.

## Branching Strategy and Deployment

- Trunk-based. Open a pull request to `main`.
- CI: [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml) runs `npm ci`, the type check and all tests on every push and pull request. The HTML report is an artifact of the run.

# Useful Information

- The demo applications are public. They can be slow or offline for a short time. Run the tests again if that happens.
- Restful Booker resets its data every 10 minutes. The API tests create their own data, so this does not affect them.
- To add a page: create a class in `pages/`, add it to `fixtures/test.ts`, and use it in a test.
- To add a browser: add a project in `playwright.config.ts` with `devices['Desktop Firefox']` or `devices['Desktop Safari']`, then run `npx playwright install`.

# Last Review

Last checked by Nischay Papneja on 2026-10-04.
