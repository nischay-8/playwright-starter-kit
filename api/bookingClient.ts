import { APIRequestContext, APIResponse } from '@playwright/test';

export type BookingDates = { checkin: string; checkout: string };

export type Booking = {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds?: string;
};

// A thin client for the Restful Booker API.
// Each method maps to one endpoint and returns the raw response.
// The tests decide what to assert.
export class BookingClient {
  constructor(private request: APIRequestContext) {}

  async getToken(username: string, password: string): Promise<string> {
    const response = await this.request.post('/auth', { data: { username, password } });
    const body = await response.json();
    if (!body.token) {
      throw new Error(`Auth failed with status ${response.status()}: ${JSON.stringify(body)}`);
    }
    return body.token;
  }

  async listBookings(): Promise<APIResponse> {
    return this.request.get('/booking');
  }

  async getBooking(id: number): Promise<APIResponse> {
    return this.request.get(`/booking/${id}`);
  }

  async createBooking(booking: Booking): Promise<APIResponse> {
    return this.request.post('/booking', { data: booking });
  }

  async updateBooking(id: number, booking: Booking, token: string): Promise<APIResponse> {
    return this.request.put(`/booking/${id}`, {
      data: booking,
      headers: { Cookie: `token=${token}` },
    });
  }

  async deleteBooking(id: number, token: string): Promise<APIResponse> {
    return this.request.delete(`/booking/${id}`, {
      headers: { Cookie: `token=${token}` },
    });
  }
}
