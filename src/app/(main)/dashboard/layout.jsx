import { getDashboardUser } from "@/lib/guard";
import Sidebar from "@/components/dashboard/Sidebar";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }) {
  const { role, session } = await getDashboardUser();

  return (
    <div className="container-px py-8">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <div className="card h-fit p-4 lg:sticky lg:top-24">
          <Sidebar role={role} name={session.user.name} email={session.user.email} />
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}