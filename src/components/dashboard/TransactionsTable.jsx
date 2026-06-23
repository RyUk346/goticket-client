import { formatCurrency, formatDate } from "@/lib/utils";
import { FiCreditCard } from "react-icons/fi";

export default function TransactionsTable({ payments = [] }) {
  if (!payments.length) {
    return (
      <div className="card flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-ink-100 text-ink-400 dark:bg-white/5">
          <FiCreditCard className="h-6 w-6" />
        </div>
        <h3 className="text-lg">No transactions yet</h3>
        <p className="max-w-md text-sm text-ink-500 dark:text-ink-300">Your payments will appear here once you pay for a booking.</p>
      </div>
    );
  }
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink-200 bg-ink-50 text-xs uppercase tracking-wider text-ink-500 dark:border-white/10 dark:bg-white/5 dark:text-ink-300">
            <tr>
              <th className="px-5 py-3">Transaction ID</th>
              <th className="px-5 py-3">Ticket</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Payment date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100 dark:divide-white/5">
            {payments.map((p) => (
              <tr key={p._id} className="hover:bg-ink-50/60 dark:hover:bg-white/5">
                <td className="px-5 py-3 font-mono text-xs text-ink-500 dark:text-ink-300">{p.transactionId}</td>
                <td className="px-5 py-3 font-medium">{p.ticketTitle || "Trip"}</td>
                <td className="px-5 py-3 font-semibold text-emerald-600 dark:text-emerald-400">{formatCurrency(p.amount)}</td>
                <td className="px-5 py-3 text-ink-500 dark:text-ink-300">{formatDate(p.paymentDate || p.createdAt || p.paidAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
