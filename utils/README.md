# utils/

This folder is empty on purpose. It holds **shared helper code** that is not a page object and not an API client. This starter kit does not need it yet. The folder is here so that you know where to put helpers when your project grows.

## What goes here

- Small, reusable functions without a browser page: date formatting, random data, retry and wait helpers.
- Code that talks to a system other than the app under test: for example a token client for an auth server, or a database query helper.
- Code that reads `config/` and `.env` and gives typed values to the tests.
- An `index.ts` that re-exports the helpers, so that tests import from one place.

## What does not go here

- Page actions and locators (use `pages/`).
- Calls to the endpoints of the app under test (use `api/`).
- Fixed test data (use `test-data/`).
- Test files (use `tests/`).

## Examples

| File             | What it does                                             |
|------------------|----------------------------------------------------------|
| `helpers.ts`     | Pure functions, for example `formatDate()`, `randomEmail()` |
| `credentials.ts` | Reads credentials from the environment and gives them typed |
| `auth.ts`        | Gets an access token from an auth server (for example Keycloak) |
| `index.ts`       | `export * from './helpers';` so tests can `import { randomEmail } from '../utils'` |

A small helper:

```ts
// utils/helpers.ts
export function randomEmail(prefix = 'user'): string {
  return `${prefix}-${Date.now()}@example.com`;
}
```

## Rule of thumb

If two or more tests need the same code, and it is not about one page or one endpoint, it belongs here.
