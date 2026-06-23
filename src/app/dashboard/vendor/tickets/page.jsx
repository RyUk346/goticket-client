import Link from "next/link";
import { requireRole } from "@/lib/guard";
import { getVendorTickets } from "@/lib/api/server";
import PageHeading from "@/components/dashboard/PageHeading";
import MyTicketCard from "@/components/dashboard/MyTicketCard";
import { FiPlusSquare, FiTag } from "react-icons/fi";

export const dynamic = "force-dynamic";

export default async function VendorTicketsPage() {
  const { email, name } = await requireRole("vendor");
  const tickets = (await getVendorTickets(email)) || [];
  const list = Array.isArray(tickets) ? tickets : [];

  return (
    <>
      <PageHeading
        title="My Added Tickets"
        subtitle="Manage your listed trips."
        action={<Link href="/dashboard/vendor/add" className="btn-primary"><FiPlusSquare /> Add ticket</Link>}
      />
      {list.length === 0 ? (
        <div className="card flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-ink-100 text-ink-400 dark:bg-white/5">
            <FiTag className="h-6 w-6" />
          </div>
          <h3 className="text-lg">No tickets yet</h3>
          <p className="max-w-md text-sm text-ink-500 dark:text-ink-300">Create your first ticket to start selling.</p>
          <Link href="/dashboard/vendor/add" className="btn-primary btn-sm mt-2">Add ticket</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {list.map((t) => <MyTicketCard key={t._id} ticket={t} vendorName={name} vendorEmail={email} />)}
        </div>
      )}
    </>
  );
}
