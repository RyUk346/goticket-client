"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiGrid, FiShoppingBag, FiCreditCard, FiPlusSquare, FiList,
  FiInbox, FiBarChart2, FiCheckSquare, FiUsers, FiArrowLeft,
} from "react-icons/fi";

const NAV = {
  user: [
    { href: "/dashboard/user", label: "Overview", icon: FiGrid },
    { href: "/dashboard/user/bookings", label: "My Bookings", icon: FiShoppingBag },
    { href: "/dashboard/user/payments", label: "Payment History", icon: FiCreditCard },
  ],
  vendor: [
    { href: "/dashboard/vendor", label: "Overview", icon: FiGrid },
    { href: "/dashboard/vendor/add", label: "Add Ticket", icon: FiPlusSquare },
    { href: "/dashboard/vendor/tickets", label: "My Tickets", icon: FiList },
    { href: "/dashboard/vendor/bookings", label: "Booking Requests", icon: FiInbox },
    { href: "/dashboard/vendor/revenue", label: "Revenue", icon: FiBarChart2 },
  ],
  admin: [
    { href: "/dashboard/admin", label: "Overview", icon: FiGrid },
    { href: "/dashboard/admin/tickets", label: "Manage Tickets", icon: FiCheckSquare },
    { href: "/dashboard/admin/users", label: "Manage Users", icon: FiUsers },
  ],
};

export default function Sidebar({ role = "user", name, email }) {
  const pathname = usePathname();
  const links = NAV[role] || NAV.user;

  return (
    <aside className="flex h-full flex-col">
      <div className="px-2 pb-4">
        <p className="text-xs uppercase tracking-wider text-ink-400">{role} panel</p>
        <p className="mt-1 truncate font-display font-semibold text-ink-900 dark:text-white">{name || email}</p>
      </div>

      <nav className="flex-1 space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={
                active
                  ? "flex items-center gap-3 rounded-xl bg-brand-500/15 px-3 py-2.5 text-sm font-semibold text-brand-700 dark:text-brand-300"
                  : "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-600 transition hover:bg-ink-100 dark:text-ink-300 dark:hover:bg-white/5"
              }
            >
              <Icon className="h-[18px] w-[18px]" />
              {label}
            </Link>
          );
        })}
      </nav>

      <Link href="/" className="mt-4 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-500 transition hover:bg-ink-100 dark:text-ink-400 dark:hover:bg-white/5">
        <FiArrowLeft className="h-[18px] w-[18px]" /> Back to site
      </Link>
    </aside>
  );
}