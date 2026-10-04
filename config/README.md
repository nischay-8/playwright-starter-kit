# config/

This folder is empty on purpose. It holds **static settings per environment**. This starter kit does not need it, because it has only one environment (the public demo apps). The folder is here so that you know where to put settings when your project grows.

## What goes here

- One file per environment: `config_local.json`, `config_qa.json`, `config_prod.json`.
- Values that are different for each environment: base URLs, auth realms, client IDs.
- Values that are **not secret**.

## What does not go here

- Passwords, API keys, tokens or client secrets. Use `.env` or the CI secret store.
- Test data (use `test-data/`).
- Code with logic (use `utils/`).

## Example

`config/config_qa.json`:

```json
{
  "api": {
    "baseURL": "https://api-qa.example.com",
    "authUrl": "https://login-qa.example.com",
    "authClientId": "my-app-qa-test"
  },
  "ui": {
    "baseURL": "https://app-qa.example.com"
  }
}
```

Load the file with an environment variable, for example `TEST_ENV=qa`. A helper in `utils/` can do this:

```ts
import config from '../config/config_' + process.env.TEST_ENV + '.json';
```

Then run: `TEST_ENV=qa npx playwright test`

## Config in this kit today

`playwright.config.ts` reads the URLs and demo credentials from `.env` (see `.env.example`). This is enough for one environment. Move to this folder when you have two or more.
