import Link from "next/link";
import { requireRole } from "@/lib/guard";
import { getVendorTickets } from "@/lib/api/server";
import MyTicketCard from "@/components/dashboard/MyTicketCard";
import { FiPlusSquare } from "react-icons/fi";

export const dynamic = "force-dynamic";

export default async function VendorTicketsPage() {
  const { email } = await requireRole("vendor");
  const tickets = await getVendorTickets(email);
  const list = Array.isArray(tickets) ? tickets : [];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl">My Tickets</h1>
          <p className="mt-1 text-ink-500 dark:text-ink-300">Manage your listed trips.</p>
        </div>
        <Link href="/dashboard/vendor/add" className="btn-primary"><FiPlusSquare /> Add ticket</Link>
      </div>

      {list.length === 0 ? (
        <div className="card mt-6 p-10 text-center">
          <p className="font-display text-lg font-semibold">No tickets yet</p>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">Create your first ticket to start selling.</p>
          <Link href="/dashboard/vendor/add" className="btn-primary mt-4 inline-flex"><FiPlusSquare /> Add ticket</Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((t) => <MyTicketCard key={t._id} ticket={t} />)}
        </div>
      )}
    </div>
  );
}