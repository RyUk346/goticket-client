import { redirect } from "next/navigation";
import { getDashboardUser } from "@/lib/guard";
import { ROLE_HOME } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function DashboardIndex() {
  const { role } = await getDashboardUser();
  redirect(ROLE_HOME[role] || "/dashboard/user");
}