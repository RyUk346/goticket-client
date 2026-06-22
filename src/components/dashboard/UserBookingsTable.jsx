"use client";
import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { deleteBooking } from "@/lib/actions";
import { formatCurrency, formatDate, statusBadgeClass } from "@/lib/utils";
import { FiTrash2, FiCreditCard } from "react-icons/fi";

export default function UserBookingsTable({ bookings }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [busyId, setBusyId] = useState(null);

  const cancel = (id) => {
    if (!confirm("Cancel this pending booking?")) return;
    setBusyId(id);
    startTransition(async () => {
      const res = await deleteBooking(id);
      setBusyId(null);
      if (!res.ok) return toast.error(res.data?.message || "Could not cancel");
      toast.success("Booking cancelled");
      router.refresh();
    });
  };

  if (!bookings.length) {
    return <p className="text-ink-500 dark:text-ink-300">You have no bookings yet.</p>;
  }

  return (
    <div className="overflow-x-auto scrollbar-thin">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-ink-200 text-left text-ink-500 dark:border-white/10 dark:text-ink-300">
            <th className="py-3 pr-4 font-medium">Trip</th>
            <th className="py-3 pr-4 font-medium">Departure</th>
            <th className="py-3 pr-4 font-medium">Qty</th>
            <th className="py-3 pr-4 font-medium">Total</th>
            <th className="py-3 pr-4 font-medium">Status</th>
            <th className="py-3 pr-4 text-right font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => {
            const total = b.totalPrice ?? Number(b.price || b.unitPrice || 0) * Number(b.quantity || 0);
            const isBusy = busyId === b._id && pending;
            return (
              <tr key={b._id} className="border-b border-ink-100 dark:border-white/5">
                <td className="py-3 pr-4">
                  <p className="font-medium text-ink-900 dark:text-white">{b.ticketTitle || b.title}</p>
                  <p className="text-xs text-ink-500 dark:text-ink-300">{b.from} → {b.to}</p>
                </td>
                <td className="py-3 pr-4 text-ink-600 dark:text-ink-300">{formatDate(b.departureDate)}</td>
                <td className="py-3 pr-4">{b.quantity}</td>
                <td className="py-3 pr-4 font-semibold">{formatCurrency(total)}</td>
                <td className="py-3 pr-4"><span className={statusBadgeClass(b.status)}>{b.status}</span></td>
                <td className="py-3 pr-4">
                  <div className="flex justify-end gap-2">
                    {b.status === "accepted" && (
                      <Link href={`/dashboard/user/payment/${b._id}`} className="btn-primary btn-sm">
                        <FiCreditCard className="h-4 w-4" /> Pay now
                      </Link>
                    )}
                    {b.status === "pending" && (
                      <button onClick={() => cancel(b._id)} disabled={isBusy} className="btn-danger btn-sm">
                        <FiTrash2 className="h-4 w-4" /> {isBusy ? "..." : "Cancel"}
                      </button>
                    )}
                    {b.status === "paid" && <span className="text-xs text-emerald-600 dark:text-emerald-400">Confirmed</span>}
                    {b.status === "rejected" && <span className="text-xs text-rose-500">Declined by vendor</span>}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}