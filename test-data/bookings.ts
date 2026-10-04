import { Booking } from '../api/bookingClient';

// Builds a booking with a unique last name so that test runs do not collide.
export function newBooking(overrides: Partial<Booking> = {}): Booking {
  return {
    firstname: 'Test',
    lastname: `User-${Date.now()}`,
    totalprice: 150,
    depositpaid: true,
    bookingdates: { checkin: '2026-11-01', checkout: '2026-11-05' },
    additionalneeds: 'Breakfast',
    ...overrides,
  };
}
