import { requireRole } from "@/lib/guard";
import { getAdminTickets } from "@/lib/api/server";
import PageHeading from "@/components/dashboard/PageHeading";
import ManageTicketsTable from "@/components/dashboard/ManageTicketsTable";

export const dynamic = "force-dynamic";

export default async function ManageTicketsPage() {
  await requireRole("admin");
  const tickets = (await getAdminTickets()) || [];
  const list = Array.isArray(tickets) ? tickets : [];
  const pending = list.filter((t) => t.status === "pending");
  const others = list.filter((t) => t.status !== "pending");

  return (
    <>
      <PageHeading title="Manage Tickets" subtitle="Approve or reject vendor ticket submissions." />
      <ManageTicketsTable tickets={[...pending, ...others]} />
    </>
  );
}
