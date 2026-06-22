import { requireRole } from "@/lib/guard";
import TicketForm from "@/components/dashboard/TicketForm";

export const dynamic = "force-dynamic";

export default async function AddTicketPage() {
  const { dbUser } = await requireRole("vendor");

  if (dbUser?.fraud) {
    return (
      <div>
        <h1 className="text-2xl">Add ticket</h1>
        <div className="card mt-6 border-rose-300 p-6 text-sm text-rose-700 dark:border-rose-500/30 dark:text-rose-300">
          Your account is flagged as fraudulent, so you cannot post new tickets.
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl">Add ticket</h1>
      <p className="mt-1 text-ink-500 dark:text-ink-300">New tickets are reviewed by an admin before going live.</p>
      <div className="card mt-6 p-6">
        <TicketForm />
      </div>
    </div>
  );
}