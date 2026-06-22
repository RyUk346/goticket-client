import Link from "next/link";
import { requireRole } from "@/lib/guard";
import { getVendorTickets, getVendorBookings, getVendorRevenue } from "@/lib/api/server";
import { formatCurrency } from "@/lib/utils";
import { FiList, FiCheckCircle, FiClock, FiDollarSign, FiPlusSquare } from "react-icons/fi";

export const dynamic = "force-dynamic";

export default async function VendorOverview() {
  const { email, name, dbUser } = await requireRole("vendor");
  const [tickets, bookings, revenue] = await Promise.all([
    getVendorTickets(email),
    getVendorBookings(email),
    getVendorRevenue(email),
  ]);
  const tList = Array.isArray(tickets) ? tickets : [];
  const bList = Array.isArray(bookings) ? bookings : [];

  const approved = tList.filter((t) => t.status === "approved").length;
  const pending = tList.filter((t) => t.status === "pending").length;

  const stats = [
    { label: "Total tickets", value: tList.length, icon: FiList },
    { label: "Approved", value: approved, icon: FiCheckCircle },
    { label: "Pending review", value: pending, icon: FiClock },
    { label: "Revenue", value: formatCurrency(revenue?.totalRevenue || 0), icon: FiDollarSign },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl">Vendor dashboard</h1>
          <p className="mt-1 text-ink-500 dark:text-ink-300">Welcome, {name?.split(" ")[0] || "vendor"}.</p>
        </div>
        <Link href="/dashboard/vendor/add" className="btn-primary"><FiPlusSquare /> Add ticket</Link>
      </div>

      {dbUser?.fraud && (
        <div className="mt-5 rounded-xl border border-rose-300 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
          Your account has been flagged as fraudulent. Your tickets are hidden and you cannot post new ones.
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="card p-5">
          <p className="text-sm text-ink-500 dark:text-ink-300">Pending booking requests</p>
          <p className="mt-2 font-display text-2xl font-bold">{bList.filter((b) => b.status === "pending").length}</p>
          <Link href="/dashboard/vendor/bookings" className="link-muted mt-2 inline-block text-sm">Review requests →</Link>
        </div>
        <div className="card p-5">
          <p className="text-sm text-ink-500 dark:text-ink-300">Seats sold</p>
          <p className="mt-2 font-display text-2xl font-bold">{revenue?.totalSold || 0}</p>
          <Link href="/dashboard/vendor/revenue" className="link-muted mt-2 inline-block text-sm">View revenue →</Link>
        </div>
      </div>
    </div>
  );
}