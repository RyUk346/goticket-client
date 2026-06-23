import { requireRole } from "@/lib/guard";
import PageHeading from "@/components/dashboard/PageHeading";
import TicketForm from "@/components/dashboard/TicketForm";

export const dynamic = "force-dynamic";

export default async function AddTicketPage() {
  const { name, email, dbUser } = await requireRole("vendor");

  if (dbUser?.fraud) {
    return (
      <>
        <PageHeading title="Add Ticket" subtitle="New tickets are reviewed by an admin before going live." />
        <div className="card border-rose-300 p-6 text-sm text-rose-700 dark:border-rose-500/30 dark:text-rose-300">
          Your account is flagged as fraudulent, so you cannot post new tickets.
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeading title="Add Ticket" subtitle="New tickets are reviewed by an admin before going live." />
      <div className="card p-6">
        <TicketForm mode="add" vendorName={name} vendorEmail={email} />
      </div>
    </>
  );
}
