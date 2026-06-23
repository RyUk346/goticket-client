import { requireRole } from "@/lib/guard";
import { getAllUsers } from "@/lib/api/server";
import PageHeading from "@/components/dashboard/PageHeading";
import ManageUsersTable from "@/components/dashboard/ManageUsersTable";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const { email } = await requireRole("admin");
  const users = (await getAllUsers()) || [];
  const list = Array.isArray(users) ? users : [];

  return (
    <>
      <PageHeading title="Manage Users" subtitle="Promote users to vendor or admin, and flag fraudulent vendors." />
      <ManageUsersTable users={list} currentEmail={email} />
    </>
  );
}
