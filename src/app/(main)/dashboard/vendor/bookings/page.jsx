import { requireRole } from "@/lib/guard";
import { getVendorBookings } from "@/lib/api/server";
import RequestedBookingsTable from "@/components/dashboard/RequestedBookingsTable";

export const dynamic = "force-dynamic";

export default async function VendorBookingsPage() {
  const { email } = await requireRole("vendor");
  const bookings = await getVendorBookings(email);
  const list = Array.isArray(bookings) ? bookings : [];
  const pendingCount = list.filter((b) => b.status === "pending").length;

  return (
    <div>
      <h1 className="text-2xl">Booking Requests</h1>
      <p className="mt-1 text-ink-500 dark:text-ink-300">
        {pendingCount > 0
          ? `${pendingCount} request${pendingCount > 1 ? "s" : ""} awaiting your response.`
          : "Review and respond to customer bookings."}
      </p>
      <div className="card mt-6 p-5">
        <RequestedBookingsTable bookings={list} />
      </div>
    </div>
  );
}