import "server-only";
import { headers } from "next/headers";
import { auth } from "./auth";

export async function getServerSession() {
  try {
    return await auth.api.getSession({ headers: await headers() });
  } catch {
    return null;
  }
}

export async function getServerToken() {
  try {
    const res = await auth.api.getToken({ headers: await headers() });
    return res?.token || null;
  } catch {
    return null;
  }
}