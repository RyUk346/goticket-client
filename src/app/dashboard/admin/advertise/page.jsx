import { requireRole } from "@/lib/guard";
import { getAdminTickets } from "@/lib/api/server";
import PageHeading from "@/components/dashboard/PageHeading";
import AdvertiseTable from "@/components/dashboard/AdvertiseTable";

export const dynamic = "force-dynamic";

export default async function AdvertisePage() {
  await requireRole("admin");
  const all = (await getAdminTickets()) || [];
  const approved = (Array.isArray(all) ? all : []).filter((t) => t.status === "approved");

  return (
    <>
      <PageHeading title="Advertise Tickets" subtitle="Feature up to 6 approved tickets on the homepage." />
      <AdvertiseTable tickets={approved} />
    </>
  );
}
