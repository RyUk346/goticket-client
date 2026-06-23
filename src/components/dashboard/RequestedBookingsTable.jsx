"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { acceptBooking, rejectBooking } from "@/lib/actions";
import { formatCurrency, statusBadgeClass } from "@/lib/utils";
import { FiInbox, FiCheck, FiX, FiLoader } from "react-icons/fi";

export default function RequestedBookingsTable({ bookings = [] }) {
  const router = useRouter();
  const [busy, setBusy] = useState(null);

  if (!bookings.length) {
    return (
      <div className="card flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-ink-100 text-ink-400 dark:bg-white/5">
          <FiInbox className="h-6 w-6" />
        </div>
        <h3 className="text-lg">No booking requests yet</h3>
        <p className="max-w-md text-sm text-ink-500 dark:text-ink-300">When travellers book your tickets, requests show up here.</p>
      </div>
    );
  }

  const act = async (id, kind) => {
    setBusy(id + kind);
    const res = kind === "accept" ? await acceptBooking(id) : await rejectBooking(id);
    setBusy(null);
    if (!res.ok) return toast.error(res.data?.message || "Action failed");
    toast.success(kind === "accept" ? "Booking accepted" : "Booking rejected");
    router.refresh();
  };

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink-200 bg-ink-50 text-xs uppercase tracking-wider text-ink-500 dark:border-white/10 dark:bg-white/5 dark:text-ink-300">
            <tr>
              <th className="px-5 py-3">User</th>
              <th className="px-5 py-3">Ticket</th>
              <th className="px-5 py-3">Qty</th>
              <th className="px-5 py-3">Total</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100 dark:divide-white/5">
            {bookings.map((b) => (
              <tr key={b._id} className="hover:bg-ink-50/60 dark:hover:bg-white/5">
                <td className="px-5 py-3">
                  <p className="font-medium">{b.userName || "—"}</p>
                  <p className="text-xs text-ink-400">{b.userEmail}</p>
                </td>
                <td className="px-5 py-3 font-medium">{b.ticketTitle}</td>
                <td className="px-5 py-3">{b.quantity}</td>
                <td className="px-5 py-3 font-semibold">{formatCurrency(b.totalPrice)}</td>
                <td className="px-5 py-3"><span className={statusBadgeClass(b.status)}>{b.status}</span></td>
                <td className="px-5 py-3">
                  {b.status === "pending" ? (
                    <div className="flex justify-end gap-2">
                      <button onClick={() => act(b._id, "accept")} disabled={busy} className="btn-primary btn-sm">
                        {busy === b._id + "accept" ? <FiLoader className="animate-spin" /> : <FiCheck />} Accept
                      </button>
                      <button onClick={() => act(b._id, "reject")} disabled={busy} className="btn-danger btn-sm">
                        {busy === b._id + "reject" ? <FiLoader className="animate-spin" /> : <FiX />} Reject
                      </button>
                    </div>
                  ) : (
                    <span className="block text-right text-xs text-ink-400">No action</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
