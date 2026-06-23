import { requireRole } from "@/lib/guard";
import { getVendorBookings } from "@/lib/api/server";
import PageHeading from "@/components/dashboard/PageHeading";
import RequestedBookingsTable from "@/components/dashboard/RequestedBookingsTable";

export const dynamic = "force-dynamic";

export default async function VendorBookingsPage() {
  const { email } = await requireRole("vendor");
  const bookings = (await getVendorBookings(email)) || [];
  const list = Array.isArray(bookings) ? bookings : [];
  const pendingCount = list.filter((b) => b.status === "pending").length;

  return (
    <>
      <PageHeading
        title="Requested Bookings"
        subtitle={pendingCount > 0 ? `${pendingCount} request${pendingCount > 1 ? "s" : ""} awaiting your response.` : "Review and respond to customer bookings."}
      />
      <RequestedBookingsTable bookings={list} />
    </>
  );
}
