import Image from "next/image";
import { initials, formatDay } from "@/lib/utils";

const ROLE_BADGE = { admin: "badge-approved", vendor: "badge-accepted", user: "badge-pending" };

export default function ProfileView({ user, stats }) {
  return (
    <div className="space-y-6">
      <div className="card overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-ink-900 to-ink-800 dark:from-ink-800 dark:to-ink-900" />
        <div className="px-6 pb-6">
          <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end">
            {user.image ? (
              <Image src={user.image} alt={user.name} width={96} height={96} className="h-24 w-24 rounded-2xl border-4 border-white object-cover dark:border-ink-900" />
            ) : (
              <span className="grid h-24 w-24 place-items-center rounded-2xl border-4 border-white bg-brand-500 text-2xl font-bold text-ink-950 dark:border-ink-900">
                {initials(user.name) || "U"}
              </span>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl">{user.name}</h2>
                <span className={ROLE_BADGE[user.role] || "badge-pending"}>{user.role}</span>
                {user.fraud ? <span className="badge-rejected">flagged</span> : null}
              </div>
              <p className="text-sm text-ink-500 dark:text-ink-300">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      {stats?.length ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="card p-5 text-center">
              <p className="font-display text-2xl font-bold text-brand-500">{s.value}</p>
              <p className="mt-1 text-xs text-ink-500 dark:text-ink-300">{s.label}</p>
            </div>
          ))}
        </div>
      ) : null}

      <div className="card p-6">
        <h3 className="text-lg">Account information</h3>
        <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Row label="Full name" value={user.name} />
          <Row label="Email address" value={user.email} />
          <Row label="Role" value={user.role} />
          <Row label="Member since" value={user.createdAt ? formatDay(user.createdAt) : "—"} />
        </dl>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="rounded-xl border border-ink-200 px-4 py-3 dark:border-white/10">
      <dt className="text-xs uppercase tracking-wider text-ink-400">{label}</dt>
      <dd className="mt-1 font-medium capitalize">{value}</dd>
    </div>
  );
}
