"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { deleteTicket } from "@/lib/actions";
import { formatCurrency, formatDate, statusBadgeClass } from "@/lib/utils";
import TicketForm from "./TicketForm";
import { FiEdit2, FiTrash2, FiX, FiArrowRight, FiCalendar, FiLoader } from "react-icons/fi";

export default function MyTicketCard({ ticket, vendorName, vendorEmail }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const locked = ticket.status === "rejected";

  const doDelete = async () => {
    setDeleting(true);
    const res = await deleteTicket(ticket._id);
    setDeleting(false);
    if (!res.ok) return toast.error(res.data?.message || "Delete failed");
    toast.success("Ticket deleted");
    setConfirm(false);
    router.refresh();
  };

  return (
    <>
      <article className="card flex h-full flex-col overflow-hidden">
        <div className="relative h-40">
          <Image src={ticket.image} alt={ticket.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
          <span className={`absolute left-3 top-3 ${statusBadgeClass(ticket.status)}`}>{ticket.status}</span>
          {ticket.isAdvertised && <span className="badge absolute right-3 top-3 bg-brand-500 text-ink-950">Advertised</span>}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="line-clamp-1 text-lg font-semibold">{ticket.title}</h3>
          <div className="mt-2 flex items-center gap-2 text-sm text-ink-600 dark:text-ink-300">
            <span className="font-medium">{ticket.from}</span>
            <FiArrowRight className="h-3.5 w-3.5 text-brand-500" />
            <span className="font-medium">{ticket.to}</span>
            <span className="ml-auto rounded-md bg-ink-100 px-2 py-0.5 text-xs dark:bg-white/5">{ticket.transportType}</span>
          </div>
          <div className="mt-1.5 flex items-center gap-2 text-sm text-ink-500 dark:text-ink-300">
            <FiCalendar className="h-4 w-4 text-brand-500" /> {formatDate(ticket.departureDate)}
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-ink-100 pt-3 dark:border-white/5">
            <span className="font-display text-xl font-bold">{formatCurrency(ticket.price)}</span>
            <span className="text-xs text-ink-400">{ticket.quantity} seats</span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button onClick={() => setEditing(true)} disabled={locked} className="btn-outline btn-sm">
              <FiEdit2 /> Update
            </button>
            <button onClick={() => setConfirm(true)} disabled={locked} className="btn-danger btn-sm">
              <FiTrash2 /> Delete
            </button>
          </div>
          {locked && <p className="mt-2 text-center text-xs text-rose-500">Rejected tickets can’t be edited or deleted.</p>}
        </div>
      </article>

      {editing && (
        <div className="fixed inset-0 z-[60] grid place-items-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setEditing(false)} />
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto scrollbar-thin rounded-2xl border border-ink-200 bg-white p-6 shadow-card dark:border-white/10 dark:bg-ink-900">
            <button onClick={() => setEditing(false)} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-xl border border-ink-200 dark:border-white/10"><FiX /></button>
            <h3 className="mb-4 text-xl">Update ticket</h3>
            <TicketForm mode="update" ticket={ticket} vendorName={vendorName} vendorEmail={vendorEmail} onDone={() => setEditing(false)} />
          </div>
        </div>
      )}

      {confirm && (
        <div className="fixed inset-0 z-[60] grid place-items-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setConfirm(false)} />
          <div className="relative w-full max-w-sm rounded-2xl border border-ink-200 bg-white p-6 text-center shadow-card dark:border-white/10 dark:bg-ink-900">
            <h3 className="text-lg">Delete this ticket?</h3>
            <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">This action can’t be undone.</p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <button onClick={() => setConfirm(false)} className="btn-outline btn-sm">Cancel</button>
              <button onClick={doDelete} disabled={deleting} className="btn-danger btn-sm">
                {deleting ? <FiLoader className="animate-spin" /> : <FiTrash2 />} Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
