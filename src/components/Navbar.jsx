"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className={cn("sticky top-0 z-50 w-full transition-all duration-300", scrolled ? "border-b border-ink-200/70 bg-white/85 backdrop-blur-lg dark:border-white/10 dark:bg-ink-950/80" : "bg-transparent")}>
      <nav className="container-px flex h-16 items-center justify-between gap-4">
        <Logo />
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={cn("rounded-lg px-3 py-2 text-sm font-medium transition-colors", isActive(l.href) ? "text-brand-600 dark:text-brand-300" : "text-ink-600 hover:text-brand-600 dark:text-ink-200 dark:hover:text-brand-300")}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden items-center gap-2 sm:flex">
            <Link href="/login" className="btn-ghost btn-sm">Login</Link>
            <Link href="/register" className="btn-primary btn-sm">Register</Link>
          </div>
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
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-ink-100 pt-3 dark:border-white/5">
            <Link href="/login" className="btn-outline btn-sm">Login</Link>
            <Link href="/register" className="btn-primary btn-sm">Register</Link>
          </div>
        </div>
      )}
    </header>
  );
}