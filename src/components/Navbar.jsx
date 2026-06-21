"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { NAV_LINKS } from "@/lib/constants";
import { initials, cn } from "@/lib/utils";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { FiMenu, FiX, FiChevronDown, FiGrid, FiUser, FiLogOut } from "react-icons/fi";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ddRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); setMenu(false); }, [pathname]);

  useEffect(() => {
    const onClick = (e) => { if (ddRef.current && !ddRef.current.contains(e.target)) setMenu(false); };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleLogout = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className={cn("sticky top-0 z-50 w-full transition-all duration-300", scrolled ? "border-b border-ink-200/70 bg-white/85 backdrop-blur-lg dark:border-white/10 dark:bg-ink-950/80" : "bg-transparent")}>
      <nav className="container-px flex h-16 items-center justify-between gap-4">
        <Logo />
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={cn("rounded-lg px-3 py-2 text-sm font-medium transition-colors", isActive(l.href) ? "text-brand-600 dark:text-brand-300" : "text-ink-600 hover:text-brand-600 dark:text-ink-200 dark:hover:text-brand-300")}>{l.label}</Link>
          ))}
          {user && (
            <Link href="/dashboard" className={cn("rounded-lg px-3 py-2 text-sm font-medium transition-colors", isActive("/dashboard") ? "text-brand-600 dark:text-brand-300" : "text-ink-600 hover:text-brand-600 dark:text-ink-200 dark:hover:text-brand-300")}>Dashboard</Link>
          )}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {!isPending && !user && (
            <div className="hidden items-center gap-2 sm:flex">
              <Link href="/login" className="btn-ghost btn-sm">Login</Link>
              <Link href="/register" className="btn-primary btn-sm">Register</Link>
            </div>
          )}
          {user && (
            <div className="relative hidden sm:block" ref={ddRef}>
              <button onClick={() => setMenu((m) => !m)} className="flex items-center gap-2 rounded-xl border border-ink-200 py-1 pl-1 pr-2 transition hover:border-brand-400 dark:border-ink-700">
                <Avatar user={user} />
                <span className="max-w-[7rem] truncate text-sm font-medium">{user.name}</span>
                <FiChevronDown className={cn("h-4 w-4 transition", menu && "rotate-180")} />
              </button>
              {menu && (
                <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-xl border border-ink-200 bg-white p-1.5 shadow-card dark:border-white/10 dark:bg-ink-900">
                  <div className="px-3 py-2">
                    <p className="truncate text-sm font-semibold">{user.name}</p>
                    <p className="truncate text-xs text-ink-400">{user.email}</p>
                  </div>
                  <div className="my-1 h-px bg-ink-100 dark:bg-white/5" />
                  <DropItem href="/dashboard" icon={FiGrid}>Dashboard</DropItem>
                  <DropItem href="/dashboard" icon={FiUser}>My Profile</DropItem>
                  <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10">
                    <FiLogOut className="h-4 w-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
          <button onClick={() => setOpen((o) => !o)} className="grid h-9 w-9 place-items-center rounded-xl border border-ink-200 lg:hidden dark:border-ink-700" aria-label="Menu">
            {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="border-t border-ink-200 bg-white px-4 py-4 lg:hidden dark:border-white/10 dark:bg-ink-950">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-ink-100 dark:hover:bg-white/5">{l.label}</Link>
            ))}
            {user && <Link href="/dashboard" className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-ink-100 dark:hover:bg-white/5">Dashboard</Link>}
          </div>
          <div className="mt-3 border-t border-ink-100 pt-3 dark:border-white/5">
            {user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><Avatar user={user} /><span className="text-sm font-medium">{user.name}</span></div>
                <button onClick={handleLogout} className="btn-danger btn-sm">Logout</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link href="/login" className="btn-outline btn-sm">Login</Link>
                <Link href="/register" className="btn-primary btn-sm">Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function Avatar({ user }) {
  if (user.image) return <Image src={user.image} alt={user.name} width={32} height={32} className="h-8 w-8 rounded-lg object-cover" />;
  return <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500 text-xs font-bold text-ink-950">{initials(user.name) || "U"}</span>;
}

function DropItem({ href, icon: Icon, children }) {
  return (
    <Link href={href} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-ink-100 dark:hover:bg-white/5">
      <Icon className="h-4 w-4 text-ink-400" /> {children}
    </Link>
  );
}