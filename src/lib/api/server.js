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

async function authedSend(path, method, body) {
  const token = await getServerToken();
  if (!token) return { ok: false, data: { message: "Not authenticated" } };
  try {
    const res = await fetch(`${BASE}${path}`, {
      method,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, data };
  } catch {
    return { ok: false, data: { message: "Network error" } };
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
export const recordPayment = (payload) => authedSend("/api/payments", "POST", payload);
