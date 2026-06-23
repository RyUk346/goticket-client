import { requireRole } from "@/lib/guard";
import { getUserBookings, getUserPayments } from "@/lib/api/server";
import { formatCurrency } from "@/lib/utils";
import PageHeading from "@/components/dashboard/PageHeading";
import ProfileView from "@/components/dashboard/ProfileView";

export const dynamic = "force-dynamic";

export default async function UserProfilePage() {
  const { session, dbUser, email } = await requireRole("user");
  const user = { ...session.user, ...(dbUser || {}) };
  const [bookings, payments] = await Promise.all([getUserBookings(email), getUserPayments(email)]);
  const list = Array.isArray(bookings) ? bookings : [];
  const pays = Array.isArray(payments) ? payments : [];
  const spent = pays.reduce((sum, p) => sum + Number(p.amount || 0), 0);

  const stats = [
    { label: "Total bookings", value: list.length },
    { label: "Pending", value: list.filter((b) => b.status === "pending").length },
    { label: "Paid", value: list.filter((b) => b.status === "paid").length },
    { label: "Total spent", value: formatCurrency(spent) },
  ];

  return (
    <>
      <PageHeading title="My Profile" subtitle="Your GoTicket account at a glance." />
      <ProfileView user={user} stats={stats} />
    </>
  );
}
