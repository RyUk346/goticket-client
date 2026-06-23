import { requireRole } from "@/lib/guard";
import { getVendorTickets, getVendorRevenue } from "@/lib/api/server";
import { formatCurrency } from "@/lib/utils";
import PageHeading from "@/components/dashboard/PageHeading";
import ProfileView from "@/components/dashboard/ProfileView";

export const dynamic = "force-dynamic";

export default async function VendorProfilePage() {
  const { session, dbUser, email } = await requireRole("vendor");
  const user = { ...session.user, ...(dbUser || {}) };
  const [tickets, revenue] = await Promise.all([getVendorTickets(email), getVendorRevenue(email)]);
  const tList = Array.isArray(tickets) ? tickets : [];

  const stats = [
    { label: "Total tickets", value: tList.length },
    { label: "Approved", value: tList.filter((t) => t.status === "approved").length },
    { label: "Pending review", value: tList.filter((t) => t.status === "pending").length },
    { label: "Revenue", value: formatCurrency(revenue?.totalRevenue || 0) },
  ];

  return (
    <>
      <PageHeading title="Vendor Profile" subtitle="Your account and sales at a glance." />
      <ProfileView user={user} stats={stats} />
    </>
  );
}
