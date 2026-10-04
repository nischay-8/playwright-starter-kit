import { test, expect } from '@playwright/test';
import { BookingClient } from '../../api/bookingClient';
import { config } from '../../playwright.config';

test.describe('Auth', () => {
  test('valid credentials return a token', { tag: ['@smoke'] }, async ({ request }) => {
    const client = new BookingClient(request);
    const token = await client.getToken(config.api.username, config.api.password);
    expect(token).toMatch(/^[a-z0-9]+$/i);
  });

  test('wrong credentials return no token', async ({ request }) => {
    const response = await request.post('/auth', {
      data: { username: 'nobody', password: 'wrong' },
    });
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ reason: 'Bad credentials' });
  });
});
