"use client";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCalendar, FiCreditCard } from "react-icons/fi";
import Countdown from "@/components/Countdown";
import CancelBookingButton from "./CancelBookingButton";
import PdfTicketButton from "./PdfTicketButton";
import { formatCurrency, formatDate, isDeparted, statusBadgeClass } from "@/lib/utils";

export default function BookedTicketCard({ booking }) {
  const departed = isDeparted(booking.departureDate);
  const showCountdown = booking.status !== "rejected";

  return (
    <article className="card flex h-full flex-col overflow-hidden">
      <div className="relative h-40">
        <Image src={booking.image} alt={booking.ticketTitle} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        <span className={`absolute left-3 top-3 ${statusBadgeClass(booking.status)}`}>{booking.status}</span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 text-lg font-semibold">{booking.ticketTitle}</h3>

        <div className="mt-2 flex items-center gap-2 text-sm text-ink-600 dark:text-ink-300">
          <span className="font-medium">{booking.from}</span>
          <FiArrowRight className="h-3.5 w-3.5 text-brand-500" />
          <span className="font-medium">{booking.to}</span>
        </div>

        <div className="mt-1.5 flex items-center gap-2 text-sm text-ink-500 dark:text-ink-300">
          <FiCalendar className="h-4 w-4 text-brand-500" /> {formatDate(booking.departureDate)}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-ink-50 px-3 py-2 dark:bg-white/5">
            <p className="text-xs text-ink-400">Quantity</p>
            <p className="font-semibold">{booking.quantity}</p>
          </div>
          <div className="rounded-lg bg-ink-50 px-3 py-2 dark:bg-white/5">
            <p className="text-xs text-ink-400">Total</p>
            <p className="font-semibold">{formatCurrency(booking.totalPrice)}</p>
          </div>
        </div>

        {showCountdown && (
          <div className="mt-3 rounded-lg border border-ink-200 px-3 py-2 dark:border-white/10">
            <p className="mb-1 text-xs uppercase tracking-wider text-ink-400">{departed ? "Status" : "Departs in"}</p>
            <Countdown target={booking.departureDate} compact />
          </div>
        )}

        <div className="mt-auto pt-4">
          {booking.status === "pending" && <CancelBookingButton bookingId={booking._id} />}

          {booking.status === "accepted" && !departed && (
            <Link href={`/dashboard/user/payment/${booking._id}`} className="btn-primary btn-sm w-full">
              <FiCreditCard /> Pay now
            </Link>
          )}
          {booking.status === "accepted" && departed && (
            <p className="rounded-lg bg-rose-50 px-3 py-2 text-center text-xs font-medium text-rose-600 dark:bg-rose-500/10 dark:text-rose-300">
              Payment closed — departure passed
            </p>
          )}

          {booking.status === "paid" && <PdfTicketButton booking={booking} />}

          {booking.status === "rejected" && (
            <p className="rounded-lg bg-rose-50 px-3 py-2 text-center text-xs font-medium text-rose-600 dark:bg-rose-500/10 dark:text-rose-300">
              Rejected by vendor
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
