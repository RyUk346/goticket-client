"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { acceptBooking, rejectBooking } from "@/lib/actions";
import { formatCurrency, formatDate, statusBadgeClass } from "@/lib/utils";
import { FiCheck, FiX } from "react-icons/fi";

export default function RequestedBookingsTable({ bookings }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [busyId, setBusyId] = useState(null);

  const act = (id, type) => {
    setBusyId(id);
    startTransition(async () => {
      const res = type === "accept" ? await acceptBooking(id) : await rejectBooking(id);
      setBusyId(null);
      if (!res.ok) return toast.error(res.data?.message || "Action failed");
      toast.success(type === "accept" ? "Booking accepted" : "Booking rejected");
      router.refresh();
    });
  };

  if (!bookings.length) {
    return <p className="text-ink-500 dark:text-ink-300">No booking requests yet.</p>;
  }

  return (
    <div className="overflow-x-auto scrollbar-thin">
      <table className="w-full min-w-[720px] text-sm">
        <thead>
          <tr className="border-b border-ink-200 text-left text-ink-500 dark:border-white/10 dark:text-ink-300">
            <th className="py-3 pr-4 font-medium">Customer</th>
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
                  <p className="font-medium text-ink-900 dark:text-white">{b.userName || "Customer"}</p>
                  <p className="text-xs text-ink-500 dark:text-ink-300">{b.userEmail}</p>
                </td>
                <td className="py-3 pr-4">
                  <p className="text-ink-900 dark:text-white">{b.ticketTitle || b.title}</p>
                  <p className="text-xs text-ink-500 dark:text-ink-300">{b.from} → {b.to}</p>
                </td>
                <td className="py-3 pr-4 text-ink-600 dark:text-ink-300">{formatDate(b.departureDate)}</td>
                <td className="py-3 pr-4">{b.quantity}</td>
                <td className="py-3 pr-4 font-semibold">{formatCurrency(total)}</td>
                <td className="py-3 pr-4"><span className={statusBadgeClass(b.status)}>{b.status}</span></td>
                <td className="py-3 pr-4">
                  <div className="flex justify-end gap-2">
                    {b.status === "pending" ? (
                      <>
                        <button onClick={() => act(b._id, "accept")} disabled={isBusy} className="btn-primary btn-sm">
                          <FiCheck className="h-4 w-4" /> Accept
                        </button>
                        <button onClick={() => act(b._id, "reject")} disabled={isBusy} className="btn-danger btn-sm">
                          <FiX className="h-4 w-4" /> Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-ink-400">No action</span>
                    )}
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