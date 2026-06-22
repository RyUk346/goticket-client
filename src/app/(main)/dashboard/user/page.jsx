import { getDashboardUser } from "@/lib/guard";
import { getUserBookings, getUserPayments } from "@/lib/api/server";
import { formatCurrency } from "@/lib/utils";
import { FiShoppingBag, FiClock, FiCheckCircle, FiCreditCard } from "react-icons/fi";

export const dynamic = "force-dynamic";

export default async function UserOverview() {
  const { email, name } = await getDashboardUser();
  const [bookings, payments] = await Promise.all([
    getUserBookings(email),
    getUserPayments(email),
  ]);
  const list = Array.isArray(bookings) ? bookings : [];
  const pays = Array.isArray(payments) ? payments : [];

  const pending = list.filter((b) => b.status === "pending").length;
  const paid = list.filter((b) => b.status === "paid").length;
  const spent = pays.reduce((sum, p) => sum + Number(p.amount || 0), 0);

  const stats = [
    { label: "Total bookings", value: list.length, icon: FiShoppingBag },
    { label: "Pending", value: pending, icon: FiClock },
    { label: "Paid", value: paid, icon: FiCheckCircle },
    { label: "Total spent", value: formatCurrency(spent), icon: FiCreditCard },
  ];

  return (
    <div>
      <h1 className="text-2xl">Welcome back, {name?.split(" ")[0] || "traveller"}</h1>
      <p className="mt-1 text-ink-500 dark:text-ink-300">Here is a snapshot of your trips.</p>

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
    </div>
  );
}