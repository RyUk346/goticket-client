"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { approveTicket, rejectTicket, advertiseTicket } from "@/lib/actions";
import { formatCurrency, statusBadgeClass } from "@/lib/utils";
import { FiCheck, FiX, FiLoader, FiStar } from "react-icons/fi";

const MAX_ADS = 6;

export default function ManageTicketsTable({ tickets = [] }) {
  const router = useRouter();
  const [busy, setBusy] = useState(null);
  const adCount = tickets.filter((t) => t.isAdvertised).length;

  const run = async (key, fn, okMsg) => {
    setBusy(key);
    const res = await fn();
    setBusy(null);
    if (!res.ok) return toast.error(res.data?.message || "Action failed");
    toast.success(okMsg);
    router.refresh();
  };

  if (!tickets.length) {
    return <div className="card p-10 text-center text-ink-500 dark:text-ink-300">No tickets to manage yet.</div>;
  }

  return (
    <div className="space-y-4">
      <div className="card flex items-center justify-between p-4">
        <p className="text-sm text-ink-500 dark:text-ink-300">Advertised on homepage</p>
        <span className="font-display text-lg font-bold">
          <span className={adCount >= MAX_ADS ? "text-rose-500" : "text-brand-500"}>{adCount}</span>
          <span className="text-ink-400"> / {MAX_ADS}</span>
        </span>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink-200 bg-ink-50 text-xs uppercase tracking-wider text-ink-500 dark:border-white/10 dark:bg-white/5 dark:text-ink-300">
              <tr>
                <th className="px-5 py-3">Ticket</th>
                <th className="px-5 py-3">Vendor</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100 dark:divide-white/5">
              {tickets.map((t) => {
                const adDisabled = !t.isAdvertised && adCount >= MAX_ADS;
                return (
                  <tr key={t._id} className="hover:bg-ink-50/60 dark:hover:bg-white/5">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <Image src={t.image} alt={t.title} width={56} height={40} className="h-10 w-14 rounded-md object-cover" />
                        <div>
                          <p className="line-clamp-1 font-medium">{t.title}</p>
                          <p className="text-xs text-ink-400">{t.from} → {t.to}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-xs text-ink-500 dark:text-ink-300">{t.vendorEmail}</td>
                    <td className="px-5 py-3 font-semibold">{formatCurrency(t.price)}</td>
                    <td className="px-5 py-3">
                      <span className={statusBadgeClass(t.status)}>{t.status}</span>
                      {t.isAdvertised && <span className="badge ml-1 bg-brand-500/15 text-brand-600 dark:text-brand-300">Ad</span>}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex flex-wrap justify-end gap-2">
                        {t.status === "pending" && (
                          <>
                            <button onClick={() => run(t._id + "a", () => approveTicket(t._id), "Ticket approved")} disabled={!!busy} className="btn-primary btn-sm">
                              {busy === t._id + "a" ? <FiLoader className="animate-spin" /> : <FiCheck />} Approve
                            </button>
                            <button onClick={() => run(t._id + "r", () => rejectTicket(t._id), "Ticket rejected")} disabled={!!busy} className="btn-danger btn-sm">
                              {busy === t._id + "r" ? <FiLoader className="animate-spin" /> : <FiX />} Reject
                            </button>
                          </>
                        )}
                        {t.status === "approved" && (
                          <button
                            onClick={() => run(t._id + "ad", () => advertiseTicket(t._id), t.isAdvertised ? "Removed from ads" : "Now advertised")}
                            disabled={!!busy || adDisabled}
                            title={adDisabled ? "Limit of 6 reached" : ""}
                            className={t.isAdvertised ? "btn-outline btn-sm" : "btn-primary btn-sm"}
                          >
                            {busy === t._id + "ad" ? <FiLoader className="animate-spin" /> : <FiStar />} {t.isAdvertised ? "Unadvertise" : "Advertise"}
                          </button>
                        )}
                        {t.status === "rejected" && (
                          <button onClick={() => run(t._id + "a", () => approveTicket(t._id), "Ticket approved")} disabled={!!busy} className="btn-primary btn-sm">
                            {busy === t._id + "a" ? <FiLoader className="animate-spin" /> : <FiCheck />} Approve
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
