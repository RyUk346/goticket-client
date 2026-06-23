import Link from "next/link";
import { requireRole } from "@/lib/guard";
import { getAdminTickets, getAllUsers } from "@/lib/api/server";
import PageHeading from "@/components/dashboard/PageHeading";
import StatCard from "@/components/dashboard/StatCard";
import { FiClock, FiRadio, FiUsers, FiAlertTriangle } from "react-icons/fi";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  await requireRole("admin");
  const [tickets, users] = await Promise.all([getAdminTickets(), getAllUsers()]);
  const tList = Array.isArray(tickets) ? tickets : [];
  const uList = Array.isArray(users) ? users : [];

  const pending = tList.filter((t) => t.status === "pending").length;
  const advertised = tList.filter((t) => t.isAdvertised).length;
  const vendors = uList.filter((u) => u.role === "vendor").length;
  const frauds = uList.filter((u) => u.fraud).length;

  return (
    <>
      <PageHeading title="Admin Dashboard" subtitle="Platform overview and moderation." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Pending approvals" value={pending} icon={FiClock} tone="brand" />
        <StatCard label="Advertised" value={`${advertised} / 6`} icon={FiRadio} tone="sky" />
        <StatCard label="Vendors" value={vendors} icon={FiUsers} tone="emerald" />
        <StatCard label="Flagged users" value={frauds} icon={FiAlertTriangle} tone="rose" />
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/dashboard/admin/tickets" className="btn-primary">Manage tickets</Link>
        <Link href="/dashboard/admin/users" className="btn-outline">Manage users</Link>
      </div>
    </>
  );
}
