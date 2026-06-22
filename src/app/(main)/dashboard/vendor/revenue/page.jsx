import { requireRole } from "@/lib/guard";
import { getVendorRevenue } from "@/lib/api/server";
import { formatCurrency } from "@/lib/utils";
import RevenueCharts from "@/components/dashboard/RevenueCharts";
import { FiTrendingUp, FiList, FiUsers } from "react-icons/fi";

export const dynamic = "force-dynamic";

export default async function VendorRevenuePage() {
  const { email } = await requireRole("vendor");
  const revenue = (await getVendorRevenue(email)) || {};

  const stats = [
    { label: "Total revenue", value: formatCurrency(revenue.totalRevenue || 0), icon: FiTrendingUp },
    { label: "Tickets listed", value: revenue.totalAdded || 0, icon: FiList },
    { label: "Seats sold", value: revenue.totalSold || 0, icon: FiUsers },
  ];

  return (
    <div>
      <h1 className="text-2xl">Revenue</h1>
      <p className="mt-1 text-ink-500 dark:text-ink-300">Your sales performance at a glance.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="card p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-ink-500 dark:text-ink-300">{label}</span>
              <Icon className="h-5 w-5 text-brand-500" />
            </div>
            <p className="mt-2 font-display text-2xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <RevenueCharts perTicket={revenue.perTicket || []} byStatus={revenue.byStatus || []} />
      </div>
    </div>
  );
}