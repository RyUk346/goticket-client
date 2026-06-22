import { notFound } from "next/navigation";
import { requireRole } from "@/lib/guard";
import { getVendorTickets } from "@/lib/api/server";
import TicketForm from "@/components/dashboard/TicketForm";

export const dynamic = "force-dynamic";

export default async function EditTicketPage({ params }) {
  const { id } = await params;
  const { email } = await requireRole("vendor");
  const tickets = await getVendorTickets(email);
  const list = Array.isArray(tickets) ? tickets : [];
  const ticket = list.find((t) => t._id === id);
  if (!ticket) notFound();

  return (
    <div>
      <h1 className="text-2xl">Edit ticket</h1>
      <p className="mt-1 text-ink-500 dark:text-ink-300">Editing resubmits the ticket for admin review.</p>
      <div className="card mt-6 p-6">
        <TicketForm ticket={ticket} />
      </div>
    </div>
  );
}