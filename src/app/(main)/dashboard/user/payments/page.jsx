import { getDashboardUser } from "@/lib/guard";
import { getUserPayments } from "@/lib/api/server";
import { formatCurrency, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function UserPaymentsPage() {
  const { email } = await getDashboardUser();
  const payments = await getUserPayments(email);
  const list = Array.isArray(payments) ? payments : [];

  return (
    <div>
      <h1 className="text-2xl">Payment History</h1>
      <p className="mt-1 text-ink-500 dark:text-ink-300">All your completed payments.</p>

      <div className="card mt-6 p-5">
        {list.length === 0 ? (
          <p className="text-ink-500 dark:text-ink-300">No payments yet.</p>
        ) : (
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-ink-200 text-left text-ink-500 dark:border-white/10 dark:text-ink-300">
                  <th className="py-3 pr-4 font-medium">Trip</th>
                  <th className="py-3 pr-4 font-medium">Transaction ID</th>
                  <th className="py-3 pr-4 font-medium">Date</th>
                  <th className="py-3 pr-4 text-right font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {list.map((p) => (
                  <tr key={p._id} className="border-b border-ink-100 dark:border-white/5">
                    <td className="py-3 pr-4 font-medium text-ink-900 dark:text-white">{p.ticketTitle || p.title || "Trip"}</td>
                    <td className="py-3 pr-4 font-mono text-xs text-ink-500 dark:text-ink-300">{p.transactionId}</td>
                    <td className="py-3 pr-4 text-ink-600 dark:text-ink-300">{formatDate(p.createdAt || p.paidAt)}</td>
                    <td className="py-3 pr-4 text-right font-semibold">{formatCurrency(p.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}