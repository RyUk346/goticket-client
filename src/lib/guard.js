import "server-only";
import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/getToken";
import { getUserByEmail } from "@/lib/api/server";
import { ROLE_HOME } from "@/lib/constants";

export async function getDashboardUser() {
  const session = await getServerSession();
  if (!session?.user?.email) redirect("/login?redirect=/dashboard");
  const dbUser = await getUserByEmail(session.user.email);
  const role = dbUser?.role || session.user.role || "user";
  return {
    session,
    dbUser,
    role,
    email: session.user.email,
    name: session.user.name,
  };
}

export async function requireRole(allowed) {
  const ctx = await getDashboardUser();
  const list = Array.isArray(allowed) ? allowed : [allowed];
  if (!list.includes(ctx.role)) redirect(ROLE_HOME[ctx.role] || "/dashboard");
  return ctx;
}