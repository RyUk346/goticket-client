import Link from "next/link";
import { FaBusSimple } from "react-icons/fa6";
import { cn } from "@/lib/utils";

export default function Logo({ className, compact = false }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2", className)}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500 text-ink-950 shadow-glow transition-transform group-hover:scale-105">
        <FaBusSimple className="h-[18px] w-[18px]" />
      </span>
      {!compact && (
        <span className="font-display text-xl font-extrabold tracking-tight text-ink-900 dark:text-white">
          Go<span className="text-brand-500">Ticket</span>
        </span>
      )}
    </Link>
  );
}