import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTicketById } from "@/lib/api/public";
import { formatCurrency, formatDate, isDeparted } from "@/lib/utils";
import Countdown from "@/components/Countdown";
import BookingModal from "@/components/BookingModal";
import { FiMapPin, FiArrowRight, FiArrowLeft, FiCalendar, FiUsers, FiTag, FiCheckCircle } from "react-icons/fi";

export const dynamic = "force-dynamic";

export default async function TicketDetailsPage({ params }) {
  const { id } = await params;
  const ticket = await getTicketById(id);
  if (!ticket || !ticket._id) notFound();

  const departed = isDeparted(ticket.departureDate);
  const soldOut = Number(ticket.quantity) <= 0;

  return (
    <div className="container-px py-10">
      <Link href="/tickets" className="link-muted mb-6 inline-flex items-center gap-2 text-sm">
        <FiArrowLeft /> Back to all tickets
      </Link>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-ink-200 dark:border-white/10">
            <Image src={ticket.image} alt={ticket.title} fill sizes="(max-width:1024px) 100vw, 60vw" className="object-cover" />
            <span className="badge absolute left-4 top-4 bg-ink-950/70 text-white backdrop-blur">{ticket.transportType}</span>
          </div>

          <h1 className="mt-6 text-2xl sm:text-3xl">{ticket.title}</h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-ink-600 dark:text-ink-300">
            <span className="inline-flex items-center gap-1.5"><FiMapPin className="text-brand-500" /> {ticket.from}</span>
            <FiArrowRight className="text-ink-400" />
            <span className="inline-flex items-center gap-1.5"><FiMapPin className="text-brand-500" /> {ticket.to}</span>
          </div>

          {ticket.description && (
            <p className="mt-5 leading-relaxed text-ink-600 dark:text-ink-300">{ticket.description}</p>
          )}

          {Array.isArray(ticket.perks) && ticket.perks.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg">What&apos;s included</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {ticket.perks.map((p) => (
                  <span key={p} className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 px-3 py-1 text-sm text-ink-700 dark:border-white/10 dark:text-ink-200">
                    <FiCheckCircle className="text-brand-500" /> {p}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          <div className="card sticky top-24 p-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-ink-500 dark:text-ink-300">Price per seat</p>
                <p className="font-display text-3xl font-bold text-brand-600 dark:text-brand-300">{formatCurrency(ticket.price)}</p>
              </div>
              <span className={departed ? "badge-rejected" : soldOut ? "badge-pending" : "badge-approved"}>
                {departed ? "Departed" : soldOut ? "Sold out" : "Available"}
              </span>
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-ink-500 dark:text-ink-300"><FiCalendar className="text-brand-500" /> Departure</span>
                <span className="font-medium">{formatDate(ticket.departureDate)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-ink-500 dark:text-ink-300"><FiUsers className="text-brand-500" /> Seats left</span>
                <span className="font-medium">{ticket.quantity}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-ink-500 dark:text-ink-300"><FiTag className="text-brand-500" /> Operator</span>
                <span className="font-medium">{ticket.vendorName || "GoTicket"}</span>
              </div>
            </div>

            {!departed && !soldOut && (
              <div className="mt-5 rounded-xl bg-ink-50 p-3 dark:bg-white/5">
                <p className="mb-2 text-center text-xs text-ink-500 dark:text-ink-300">Departs in</p>
                <Countdown date={ticket.departureDate} />
              </div>
            )}

            <div className="mt-5">
              <BookingModal ticket={ticket} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}