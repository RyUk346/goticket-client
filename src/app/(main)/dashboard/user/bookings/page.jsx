import { getDashboardUser } from "@/lib/guard";
import { getUserBookings } from "@/lib/api/server";
import UserBookingsTable from "@/components/dashboard/UserBookingsTable";

export const dynamic = "force-dynamic";

export default async function UserBookingsPage() {
  const { email } = await getDashboardUser();
  const bookings = await getUserBookings(email);

  return (
    <div>
      <h1 className="text-2xl">My Bookings</h1>
      <p className="mt-1 text-ink-500 dark:text-ink-300">Track, pay for, or cancel your trip bookings.</p>
      <div className="card mt-6 p-5">
        <UserBookingsTable bookings={Array.isArray(bookings) ? bookings : []} />
      </div>
    </div>
  );
}