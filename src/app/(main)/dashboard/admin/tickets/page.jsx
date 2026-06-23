import { requireRole } from "@/lib/guard";
import { getAdminTickets } from "@/lib/api/server";
import PageHeading from "@/components/dashboard/PageHeading";
import ManageTicketsTable from "@/components/dashboard/ManageTicketsTable";

export const dynamic = "force-dynamic";

export default async function AdminTicketsPage() {
  await requireRole("admin");
  const tickets = (await getAdminTickets()) || [];
  const list = Array.isArray(tickets) ? tickets : [];
  const pending = list.filter((t) => t.status === "pending");
  const others = list.filter((t) => t.status !== "pending");

  return (
    <>
      <PageHeading title="Manage Tickets" subtitle="Approve, reject, and advertise vendor tickets (max 6 on the homepage)." />
      <ManageTicketsTable tickets={[...pending, ...others]} />
    </>
  );
}
