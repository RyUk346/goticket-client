import { requireRole } from "@/lib/guard";
import { getVendorRevenue } from "@/lib/api/server";
import { formatCurrency } from "@/lib/utils";
import PageHeading from "@/components/dashboard/PageHeading";
import StatCard from "@/components/dashboard/StatCard";
import RevenueCharts from "@/components/dashboard/RevenueCharts";
import { FiTrendingUp, FiList, FiUsers } from "react-icons/fi";

export const dynamic = "force-dynamic";

export default async function VendorRevenuePage() {
  const { email } = await requireRole("vendor");
  const revenue = (await getVendorRevenue(email)) || {};

  return (
    <>
      <PageHeading title="Revenue Overview" subtitle="Your sales performance at a glance." />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total revenue" value={formatCurrency(revenue.totalRevenue || 0)} icon={FiTrendingUp} tone="brand" />
        <StatCard label="Tickets listed" value={revenue.totalAdded || 0} icon={FiList} tone="sky" />
        <StatCard label="Seats sold" value={revenue.totalSold || 0} icon={FiUsers} tone="emerald" />
      </div>
      <div className="mt-6">
        <RevenueCharts perTicket={revenue.perTicket || []} byStatus={revenue.byStatus || []} />
      </div>
    </>
  );
}
