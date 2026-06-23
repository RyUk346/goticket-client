"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { setUserRole, setUserFraud } from "@/lib/actions";
import { initials } from "@/lib/utils";
import { FiShield, FiBriefcase, FiAlertTriangle, FiLoader } from "react-icons/fi";

const ROLE_BADGE = { admin: "badge-approved", vendor: "badge-accepted", user: "badge-pending" };

export default function ManageUsersTable({ users = [], currentEmail }) {
  const router = useRouter();
  const [busy, setBusy] = useState(null);

  const run = async (key, fn, okMsg) => {
    setBusy(key);
    const res = await fn();
    setBusy(null);
    if (!res.ok) return toast.error(res.data?.message || "Failed");
    toast.success(okMsg);
    router.refresh();
  };

  if (!users.length) {
    return <div className="card p-10 text-center text-ink-500 dark:text-ink-300">No users found.</div>;
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink-200 bg-ink-50 text-xs uppercase tracking-wider text-ink-500 dark:border-white/10 dark:bg-white/5 dark:text-ink-300">
            <tr>
              <th className="px-5 py-3">User</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100 dark:divide-white/5">
            {users.map((u) => {
              const self = u.email === currentEmail;
              return (
                <tr key={u._id} className="hover:bg-ink-50/60 dark:hover:bg-white/5">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {u.image ? (
                        <Image src={u.image} alt={u.name} width={36} height={36} className="h-9 w-9 rounded-lg object-cover" />
                      ) : (
                        <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-500 text-xs font-bold text-ink-950">{initials(u.name) || "U"}</span>
                      )}
                      <span className="font-medium">{u.name || "—"}{self && <span className="ml-1 text-xs text-ink-400">(you)</span>}</span>
                      {u.fraud && <span className="badge-rejected">fraud</span>}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-xs text-ink-500 dark:text-ink-300">{u.email}</td>
                  <td className="px-5 py-3"><span className={ROLE_BADGE[u.role] || "badge-pending"}>{u.role}</span></td>
                  <td className="px-5 py-3">
                    <div className="flex flex-wrap justify-end gap-2">
                      <button onClick={() => run(u._id + "ad", () => setUserRole(u._id, "admin"), "Role updated to admin")} disabled={!!busy || self || u.role === "admin"} className="btn-outline btn-sm">
                        {busy === u._id + "ad" ? <FiLoader className="animate-spin" /> : <FiShield />} Make Admin
                      </button>
                      <button onClick={() => run(u._id + "ve", () => setUserRole(u._id, "vendor"), "Role updated to vendor")} disabled={!!busy || self || u.role === "vendor"} className="btn-outline btn-sm">
                        {busy === u._id + "ve" ? <FiLoader className="animate-spin" /> : <FiBriefcase />} Make Vendor
                      </button>
                      {u.role === "vendor" && (
                        <button onClick={() => run(u._id + "fr", () => setUserFraud(u._id, !u.fraud), u.fraud ? "Fraud flag removed" : "Marked as fraud")} disabled={!!busy || self} className={u.fraud ? "btn-outline btn-sm" : "btn-danger btn-sm"}>
                          {busy === u._id + "fr" ? <FiLoader className="animate-spin" /> : <FiAlertTriangle />} {u.fraud ? "Unflag" : "Mark Fraud"}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
