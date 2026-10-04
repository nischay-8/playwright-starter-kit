import { test, expect } from '@playwright/test';
import { BookingClient } from '../../api/bookingClient';
import { newBooking } from '../../test-data/bookings';
import { config } from '../../playwright.config';

test.describe('Booking', () => {
  test('lists bookings', { tag: ['@smoke'] }, async ({ request }) => {
    const client = new BookingClient(request);
    const response = await client.listBookings();
    expect(response.status()).toBe(200);
    const bookings = await response.json();
    expect(Array.isArray(bookings)).toBe(true);
    expect(bookings.length).toBeGreaterThan(0);
    expect(bookings[0]).toHaveProperty('bookingid');
  });

  test('creates, reads, updates and deletes a booking', async ({ request }) => {
    const client = new BookingClient(request);
    const token = await client.getToken(config.api.username, config.api.password);
    const booking = newBooking();

    // Create
    const created = await client.createBooking(booking);
    expect(created.status()).toBe(200);
    const { bookingid, booking: createdBooking } = await created.json();
    expect(createdBooking).toEqual(booking);

    // Read
    const read = await client.getBooking(bookingid);
    expect(read.status()).toBe(200);
    expect(await read.json()).toEqual(booking);

    // Update
    const updatedBooking = { ...booking, totalprice: 200 };
    const updated = await client.updateBooking(bookingid, updatedBooking, token);
    expect(updated.status()).toBe(200);
    expect((await updated.json()).totalprice).toBe(200);

    // Delete
    const deleted = await client.deleteBooking(bookingid, token);
    expect(deleted.status()).toBe(201);
    const gone = await client.getBooking(bookingid);
    expect(gone.status()).toBe(404);
  });

  test('a missing booking returns 404', async ({ request }) => {
    const client = new BookingClient(request);
    const response = await client.getBooking(999999999);
    expect(response.status()).toBe(404);
  });
});
