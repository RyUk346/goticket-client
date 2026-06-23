import { getDashboardUser } from "@/lib/guard";
import { getUserPayments } from "@/lib/api/server";
import PageHeading from "@/components/dashboard/PageHeading";
import TransactionsTable from "@/components/dashboard/TransactionsTable";

export const dynamic = "force-dynamic";

export default async function UserPaymentsPage() {
  const { email } = await getDashboardUser();
  const payments = (await getUserPayments(email)) || [];

  return (
    <>
      <PageHeading title="Payment History" subtitle="All your payments in one place." />
      <TransactionsTable payments={Array.isArray(payments) ? payments : []} />
    </>
  );
}
