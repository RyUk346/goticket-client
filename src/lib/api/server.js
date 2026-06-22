import "server-only";
import { getServerToken } from "@/lib/getToken";

const BASE = process.env.NEXT_PUBLIC_SERVER_URL;

async function authedGet(path) {
  const token = await getServerToken();
  if (!token) return null;
  try {
    const res = await fetch(`${BASE}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

const enc = (v) => encodeURIComponent(v);

export const getUserByEmail = (email) => authedGet(`/api/users/${enc(email)}`);
export const getAllUsers = () => authedGet(`/api/users`);
export const getUserBookings = (email) => authedGet(`/api/bookings/user/${enc(email)}`);
export const getUserPayments = (email) => authedGet(`/api/payments/user/${enc(email)}`);
export const getVendorTickets = (email) => authedGet(`/api/tickets/vendor/${enc(email)}`);
export const getVendorBookings = (email) => authedGet(`/api/bookings/vendor/${enc(email)}`);
export const getVendorRevenue = (email) => authedGet(`/api/vendor/revenue/${enc(email)}`);
export const getAdminTickets = () => authedGet(`/api/admin/tickets`);