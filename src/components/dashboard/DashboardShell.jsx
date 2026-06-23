"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { cn, initials } from "@/lib/utils";
import {
  FiUser, FiShoppingBag, FiCreditCard, FiPlusSquare, FiTag, FiInbox,
  FiBarChart2, FiCheckSquare, FiUsers, FiRadio, FiMenu, FiX, FiLogOut, FiExternalLink, FiHome,
} from "react-icons/fi";

const NAV = {
  user: [
    { label: "Profile", href: "/dashboard/user", icon: FiUser },
    { label: "My Bookings", href: "/dashboard/user/bookings", icon: FiShoppingBag },
    { label: "Payment History", href: "/dashboard/user/payments", icon: FiCreditCard },
  ],
  vendor: [
    { label: "Profile", href: "/dashboard/vendor", icon: FiUser },
    { label: "Add Ticket", href: "/dashboard/vendor/add", icon: FiPlusSquare },
    { label: "My Tickets", href: "/dashboard/vendor/tickets", icon: FiTag },
    { label: "Booking Requests", href: "/dashboard/vendor/bookings", icon: FiInbox },
    { label: "Revenue", href: "/dashboard/vendor/revenue", icon: FiBarChart2 },
  ],
  admin: [
    { label: "Profile", href: "/dashboard/admin", icon: FiUser },
    { label: "Manage Tickets", href: "/dashboard/admin/tickets", icon: FiCheckSquare },
    { label: "Manage Users", href: "/dashboard/admin/users", icon: FiUsers },
    { label: "Advertise Tickets", href: "/dashboard/admin/advertise", icon: FiRadio },
  ],
};

const ROLE_LABEL = { user: "Traveller", vendor: "Vendor", admin: "Administrator" };

export default function DashboardShell({ user, children }) {
  const role = user.role || "user";
  const links = NAV[role] || NAV.user;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  const SidebarInner = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center px-6">
        <Logo />
      </div>
      <div className="px-4">
        <div className="rounded-xl bg-brand-500/10 px-3 py-1 text-center text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-300">
          {ROLE_LABEL[role]} Panel
        </div>
      </div>
      <nav className="mt-4 flex-1 space-y-1 overflow-y-auto px-4 pb-4">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-brand-500 text-ink-950 shadow-glow" : "text-ink-600 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-white/5"
              )}
            >
              <l.icon className="h-[18px] w-[18px]" /> {l.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-ink-200 p-4 dark:border-white/10">
        <Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-600 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-white/5">
          <FiHome className="h-[18px] w-[18px]" /> Back to site
        </Link>
        <button onClick={logout} className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10">
          <FiLogOut className="h-[18px] w-[18px]" /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-ink-50/50 dark:bg-ink-950">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-ink-200 bg-white lg:block dark:border-white/10 dark:bg-ink-900/60 dark:backdrop-blur">
        {SidebarInner}
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 border-r border-ink-200 bg-white dark:border-white/10 dark:bg-ink-900">
            <button onClick={() => setOpen(false)} className="absolute right-3 top-4 grid h-9 w-9 place-items-center rounded-xl border border-ink-200 dark:border-white/10">
              <FiX />
            </button>
            {SidebarInner}
          </aside>
        </div>
      )}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-ink-200 bg-white/85 px-4 backdrop-blur-lg sm:px-6 dark:border-white/10 dark:bg-ink-950/80">
          <button onClick={() => setOpen(true)} className="grid h-9 w-9 place-items-center rounded-xl border border-ink-200 lg:hidden dark:border-white/10" aria-label="Open menu">
            <FiMenu />
          </button>
          <div className="hidden text-sm text-ink-500 sm:block dark:text-ink-300">
            Welcome back, <span className="font-semibold text-ink-800 dark:text-white">{user.name}</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/" className="btn-ghost btn-sm hidden sm:inline-flex"><FiExternalLink /> Visit site</Link>
            <ThemeToggle />
            <div className="flex items-center gap-2 rounded-xl border border-ink-200 py-1 pl-1 pr-3 dark:border-white/10">
              {user.image ? (
                <Image src={user.image} alt={user.name} width={32} height={32} className="h-8 w-8 rounded-lg object-cover" />
              ) : (
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500 text-xs font-bold text-ink-950">{initials(user.name) || "U"}</span>
              )}
              <span className="hidden text-sm font-medium sm:inline">{user.name?.split(" ")[0]}</span>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
