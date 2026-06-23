"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { approveTicket, rejectTicket } from "@/lib/actions";
import { formatCurrency, statusBadgeClass } from "@/lib/utils";
import { FiCheckSquare, FiCheck, FiX, FiLoader } from "react-icons/fi";

export default function ManageTicketsTable({ tickets = [] }) {
  const router = useRouter();
  const [busy, setBusy] = useState(null);

  if (!tickets.length) {
    return (
      <div className="card flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-ink-100 text-ink-400 dark:bg-white/5">
          <FiCheckSquare className="h-6 w-6" />
        </div>
        <h3 className="text-lg">No tickets to manage</h3>
        <p className="max-w-md text-sm text-ink-500 dark:text-ink-300">Vendor submissions will appear here for approval.</p>
      </div>
    );
  }

  const act = async (id, kind) => {
    setBusy(id + kind);
    const res = kind === "approve" ? await approveTicket(id) : await rejectTicket(id);
    setBusy(null);
    if (!res.ok) return toast.error(res.data?.message || "Action failed");
    toast.success(kind === "approve" ? "Ticket approved" : "Ticket rejected");
    router.refresh();
  };

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink-200 bg-ink-50 text-xs uppercase tracking-wider text-ink-500 dark:border-white/10 dark:bg-white/5 dark:text-ink-300">
            <tr>
              <th className="px-5 py-3">Ticket</th>
              <th className="px-5 py-3">Vendor</th>
              <th className="px-5 py-3">Route</th>
              <th className="px-5 py-3">Price</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100 dark:divide-white/5">
            {tickets.map((t) => (
              <tr key={t._id} className="hover:bg-ink-50/60 dark:hover:bg-white/5">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <Image src={t.image} alt={t.title} width={56} height={40} className="h-10 w-14 rounded-md object-cover" />
                    <div>
                      <p className="line-clamp-1 font-medium">{t.title}</p>
                      <p className="text-xs text-ink-400">{t.transportType}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-xs text-ink-500 dark:text-ink-300">{t.vendorEmail}</td>
                <td className="px-5 py-3">{t.from} → {t.to}</td>
                <td className="px-5 py-3 font-semibold">{formatCurrency(t.price)}</td>
                <td className="px-5 py-3"><span className={statusBadgeClass(t.status)}>{t.status}</span></td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => act(t._id, "approve")} disabled={busy || t.status === "approved"} className="btn-primary btn-sm">
                      {busy === t._id + "approve" ? <FiLoader className="animate-spin" /> : <FiCheck />} Approve
                    </button>
                    <button onClick={() => act(t._id, "reject")} disabled={busy || t.status === "rejected"} className="btn-danger btn-sm">
                      {busy === t._id + "reject" ? <FiLoader className="animate-spin" /> : <FiX />} Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
