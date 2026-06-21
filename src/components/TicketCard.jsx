import Link from "next/link";
import Image from "next/image";
import { FaBusSimple, FaTrainSubway, FaShip, FaPlane } from "react-icons/fa6";
import { FiArrowRight, FiMapPin, FiCalendar } from "react-icons/fi";
import { formatCurrency, formatDate } from "@/lib/utils";

const ICONS = { Bus: FaBusSimple, Train: FaTrainSubway, Launch: FaShip, Plane: FaPlane };

export default function TicketCard({ ticket, variant = "home" }) {
  const Icon = ICONS[ticket.transportType] || FaBusSimple;
  const detailed = variant === "all";
  const soldOut = Number(ticket.quantity) <= 0;

  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <div className="relative h-44 w-full overflow-hidden">
        <Image src={ticket.image} alt={ticket.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink-950/70 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
          <Icon className="h-3.5 w-3.5 text-brand-400" /> {ticket.transportType}
        </span>
        {soldOut && <span className="absolute right-3 top-3 rounded-full bg-rose-500 px-2.5 py-1 text-xs font-semibold text-white">Sold out</span>}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 text-lg font-semibold">{ticket.title}</h3>
        {detailed && (
          <div className="mt-2 flex items-center gap-2 text-sm text-ink-500 dark:text-ink-300">
            <FiMapPin className="h-4 w-4 text-brand-500" />
            <span className="font-medium text-ink-700 dark:text-ink-100">{ticket.from}</span>
            <FiArrowRight className="h-3.5 w-3.5" />
            <span className="font-medium text-ink-700 dark:text-ink-100">{ticket.to}</span>
          </div>
        )}
        {detailed && (
          <div className="mt-1.5 flex items-center gap-2 text-sm text-ink-500 dark:text-ink-300">
            <FiCalendar className="h-4 w-4 text-brand-500" /> {formatDate(ticket.departureDate)}
          </div>
        )}
        {ticket.perks?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {ticket.perks.slice(0, 3).map((p) => (
              <span key={p} className="rounded-md bg-ink-100 px-2 py-0.5 text-xs text-ink-600 dark:bg-white/5 dark:text-ink-300">{p}</span>
            ))}
            {ticket.perks.length > 3 && <span className="rounded-md bg-ink-100 px-2 py-0.5 text-xs text-ink-500 dark:bg-white/5">+{ticket.perks.length - 3}</span>}
          </div>
        )}
        <div className="mt-4 flex items-end justify-between border-t border-ink-100 pt-4 dark:border-white/5">
          <div>
            <p className="font-display text-2xl font-bold text-ink-900 dark:text-white">{formatCurrency(ticket.price)}</p>
            <p className="text-xs text-ink-400">per seat · {ticket.quantity} left</p>
          </div>
        </div>
        <Link href={`/tickets/${ticket._id}`} className="btn-primary mt-4 w-full">See details <FiArrowRight /></Link>
      </div>
    </article>
  );
}