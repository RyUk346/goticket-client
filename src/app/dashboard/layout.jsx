import { getDashboardUser } from "@/lib/guard";
import DashboardShell from "@/components/dashboard/DashboardShell";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }) {
  const { session, role } = await getDashboardUser();
  const user = {
    name: session.user.name,
    email: session.user.email,
    image: session.user.image || null,
    role,
  };
  return <DashboardShell user={user}>{children}</DashboardShell>;
}
