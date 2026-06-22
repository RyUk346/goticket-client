"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { deleteTicket } from "@/lib/actions";
import { formatCurrency, formatDate, statusBadgeClass } from "@/lib/utils";
import { FiEdit2, FiTrash2, FiMapPin, FiArrowRight, FiUsers } from "react-icons/fi";

export default function MyTicketCard({ ticket }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [busy, setBusy] = useState(false);

  const remove = () => {
    if (!confirm("Delete this ticket? This cannot be undone.")) return;
    setBusy(true);
    startTransition(async () => {
      const res = await deleteTicket(ticket._id);
      setBusy(false);
      if (!res.ok) return toast.error(res.data?.message || "Could not delete");
      toast.success("Ticket deleted");
      router.refresh();
    });
  };

  return (
    <div className="card overflow-hidden">
      <div className="relative aspect-[16/9]">
        <Image src={ticket.image} alt={ticket.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
        <span className={`absolute left-3 top-3 ${statusBadgeClass(ticket.status)}`}>{ticket.status}</span>
        {ticket.isAdvertised && (
          <span className="badge absolute right-3 top-3 bg-brand-500 text-ink-950">Advertised</span>
        )}
      </div>

      <div className="p-4">
        <h3 className="line-clamp-1 text-base">{ticket.title}</h3>
        <div className="mt-2 flex items-center gap-2 text-sm text-ink-500 dark:text-ink-300">
          <FiMapPin className="text-brand-500" /> {ticket.from}
          <FiArrowRight className="text-ink-400" /> {ticket.to}
        </div>

        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="font-display font-bold text-brand-600 dark:text-brand-300">{formatCurrency(ticket.price)}</span>
          <span className="inline-flex items-center gap-1 text-ink-500 dark:text-ink-300"><FiUsers className="h-4 w-4" /> {ticket.quantity}</span>
        </div>

        <p className="mt-2 text-xs text-ink-400">Departs {formatDate(ticket.departureDate)}</p>

        <div className="mt-4 flex gap-2">
          <Link href={`/dashboard/vendor/tickets/${ticket._id}/edit`} className="btn-outline btn-sm flex-1">
            <FiEdit2 className="h-4 w-4" /> Edit
          </Link>
          <button onClick={remove} disabled={busy && pending} className="btn-danger btn-sm flex-1">
            <FiTrash2 className="h-4 w-4" /> {busy ? "..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}