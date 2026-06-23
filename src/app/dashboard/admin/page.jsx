import { requireRole } from "@/lib/guard";
import { getAdminTickets, getAllUsers } from "@/lib/api/server";
import PageHeading from "@/components/dashboard/PageHeading";
import ProfileView from "@/components/dashboard/ProfileView";

export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
  const { session, dbUser } = await requireRole("admin");
  const user = { ...session.user, ...(dbUser || {}) };
  const [tickets, users] = await Promise.all([getAdminTickets(), getAllUsers()]);
  const tList = Array.isArray(tickets) ? tickets : [];
  const uList = Array.isArray(users) ? users : [];

  const stats = [
    { label: "Pending approvals", value: tList.filter((t) => t.status === "pending").length },
    { label: "Advertised", value: `${tList.filter((t) => t.isAdvertised).length} / 6` },
    { label: "Vendors", value: uList.filter((u) => u.role === "vendor").length },
    { label: "Flagged users", value: uList.filter((u) => u.fraud).length },
  ];

  return (
    <>
      <PageHeading title="Admin Profile" subtitle="Platform overview and your admin account." />
      <ProfileView user={user} stats={stats} />
    </>
  );
}
