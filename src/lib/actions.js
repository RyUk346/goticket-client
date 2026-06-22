"use server";
import { revalidatePath } from "next/cache";
import { getServerToken } from "@/lib/getToken";

const BASE = process.env.NEXT_PUBLIC_SERVER_URL;

async function authedFetch(path, method, body) {
  const token = await getServerToken();
  if (!token) return { ok: false, data: { message: "Not authenticated" } };
  try {
    const res = await fetch(`${BASE}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, data };
  } catch {
    return { ok: false, data: { message: "Network error" } };
  }
}

export async function createTicket(payload) {
  const res = await authedFetch(`/api/tickets`, "POST", payload);
  if (res.ok) {
    revalidatePath("/dashboard/vendor/tickets");
    revalidatePath("/tickets");
  }
  return res;
}

export async function updateTicket(id, payload) {
  const res = await authedFetch(`/api/tickets/${id}`, "PATCH", payload);
  if (res.ok) revalidatePath("/dashboard/vendor/tickets");
  return res;
}

export async function deleteTicket(id) {
  const res = await authedFetch(`/api/tickets/${id}`, "DELETE");
  if (res.ok) revalidatePath("/dashboard/vendor/tickets");
  return res;
}

export async function createBooking(payload) {
  const res = await authedFetch(`/api/bookings`, "POST", payload);
  if (res.ok) revalidatePath("/dashboard/user/bookings");
  return res;
}

export async function acceptBooking(id) {
  const res = await authedFetch(`/api/bookings/accept/${id}`, "PATCH");
  if (res.ok) revalidatePath("/dashboard/vendor/bookings");
  return res;
}

export async function rejectBooking(id) {
  const res = await authedFetch(`/api/bookings/reject/${id}`, "PATCH");
  if (res.ok) revalidatePath("/dashboard/vendor/bookings");
  return res;
}

export async function deleteBooking(id) {
  const res = await authedFetch(`/api/bookings/${id}`, "DELETE");
  if (res.ok) revalidatePath("/dashboard/user/bookings");
  return res;
}

export async function createPayment(payload) {
  const res = await authedFetch(`/api/payments`, "POST", payload);
  if (res.ok) {
    revalidatePath("/dashboard/user/bookings");
    revalidatePath("/dashboard/user/payments");
  }
  return res;
}

export async function approveTicket(id) {
  const res = await authedFetch(`/api/tickets/approve/${id}`, "PATCH");
  if (res.ok) revalidatePath("/dashboard/admin/tickets");
  return res;
}

export async function rejectTicket(id) {
  const res = await authedFetch(`/api/tickets/reject/${id}`, "PATCH");
  if (res.ok) revalidatePath("/dashboard/admin/tickets");
  return res;
}

export async function advertiseTicket(id) {
  const res = await authedFetch(`/api/tickets/advertise/${id}`, "PATCH");
  if (res.ok) {
    revalidatePath("/dashboard/admin/tickets");
    revalidatePath("/");
  }
  return res;
}

export async function setUserRole(id, role) {
  const res = await authedFetch(`/api/users/role/${id}`, "PATCH", { role });
  if (res.ok) revalidatePath("/dashboard/admin/users");
  return res;
}

export async function setUserFraud(id, fraud = true) {
  const res = await authedFetch(`/api/users/fraud/${id}`, "PATCH", { fraud });
  if (res.ok) revalidatePath("/dashboard/admin/users");
  return res;
}