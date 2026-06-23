"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { advertiseTicket } from "@/lib/actions";
import { formatCurrency } from "@/lib/utils";
import { FiRadio, FiLoader } from "react-icons/fi";

const MAX = 6;

export default function AdvertiseTable({ tickets = [] }) {
  const router = useRouter();
  const [busy, setBusy] = useState(null);
  const advertisedCount = tickets.filter((t) => t.isAdvertised).length;

  if (!tickets.length) {
    return (
      <div className="card flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-ink-100 text-ink-400 dark:bg-white/5">
          <FiRadio className="h-6 w-6" />
        </div>
        <h3 className="text-lg">No approved tickets</h3>
        <p className="max-w-md text-sm text-ink-500 dark:text-ink-300">Approve vendor tickets first — then you can advertise them on the homepage.</p>
      </div>
    );
  }

  const toggle = async (t) => {
    if (!t.isAdvertised && advertisedCount >= MAX) {
      return toast.error(`You can advertise at most ${MAX} tickets`);
    }
    setBusy(t._id);
    const res = await advertiseTicket(t._id);
    setBusy(null);
    if (!res.ok) return toast.error(res.data?.message || "Failed");
    toast.success(t.isAdvertised ? "Removed from advertisements" : "Now advertised");
    router.refresh();
  };

  return (
    <div className="space-y-4">
      <div className="card flex items-center justify-between p-4">
        <p className="text-sm text-ink-500 dark:text-ink-300">Advertised on homepage</p>
        <span className="font-display text-lg font-bold">
          <span className={advertisedCount >= MAX ? "text-rose-500" : "text-brand-500"}>{advertisedCount}</span>
          <span className="text-ink-400"> / {MAX}</span>
        </span>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink-200 bg-ink-50 text-xs uppercase tracking-wider text-ink-500 dark:border-white/10 dark:bg-white/5 dark:text-ink-300">
              <tr>
                <th className="px-5 py-3">Ticket</th>
                <th className="px-5 py-3">Route</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3 text-right">Advertise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100 dark:divide-white/5">
              {tickets.map((t) => {
                const disabled = busy || (!t.isAdvertised && advertisedCount >= MAX);
                return (
                  <tr key={t._id} className="hover:bg-ink-50/60 dark:hover:bg-white/5">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <Image src={t.image} alt={t.title} width={56} height={40} className="h-10 w-14 rounded-md object-cover" />
                        <span className="line-clamp-1 font-medium">{t.title}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">{t.from} → {t.to}</td>
                    <td className="px-5 py-3 font-semibold">{formatCurrency(t.price)}</td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end">
                        <button
                          onClick={() => toggle(t)}
                          disabled={disabled}
                          role="switch"
                          aria-checked={t.isAdvertised}
                          title={!t.isAdvertised && advertisedCount >= MAX ? "Limit of 6 reached" : ""}
                          className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${t.isAdvertised ? "bg-brand-500" : "bg-ink-300 dark:bg-ink-700"} ${disabled ? "opacity-50" : ""}`}
                        >
                          {busy === t._id ? (
                            <FiLoader className="absolute left-1/2 -translate-x-1/2 animate-spin text-white" />
                          ) : (
                            <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${t.isAdvertised ? "translate-x-6" : "translate-x-1"}`} />
                          )}
                        </button>
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
