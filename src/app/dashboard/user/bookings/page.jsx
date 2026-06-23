import Link from "next/link";
import { getDashboardUser } from "@/lib/guard";
import { getUserBookings } from "@/lib/api/server";
import PageHeading from "@/components/dashboard/PageHeading";
import BookedTicketCard from "@/components/dashboard/BookedTicketCard";
import { FiBookmark } from "react-icons/fi";

export const dynamic = "force-dynamic";

export default async function UserBookingsPage() {
  const { email } = await getDashboardUser();
  const bookings = (await getUserBookings(email)) || [];
  const list = Array.isArray(bookings) ? bookings : [];

  return (
    <>
      <PageHeading title="My Booked Tickets" subtitle="Track status, pay accepted bookings, and download paid tickets." />
      {list.length === 0 ? (
        <div className="card flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-ink-100 text-ink-400 dark:bg-white/5">
            <FiBookmark className="h-6 w-6" />
          </div>
          <h3 className="text-lg">No bookings yet</h3>
          <p className="max-w-md text-sm text-ink-500 dark:text-ink-300">Browse tickets and book your first journey.</p>
          <Link href="/tickets" className="btn-primary btn-sm mt-2">Browse tickets</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {list.map((b) => <BookedTicketCard key={b._id} booking={b} />)}
        </div>
      )}
    </>
  );
}
