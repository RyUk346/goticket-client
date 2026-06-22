"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createBooking } from "@/lib/actions";
import { formatCurrency, isDeparted } from "@/lib/utils";
import SeatMap from "./SeatMap";
import { FiX, FiLoader, FiCalendar } from "react-icons/fi";

export default function BookingModal({ ticket }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(false);

  const isBus = ticket.transportType === "Bus";
  const departed = isDeparted(ticket.departureDate);
  const soldOut = Number(ticket.quantity) <= 0;
  const disabled = departed || soldOut;

  const quantity = isBus ? seats.length : Number(qty || 0);
  const total = Number(ticket.price) * quantity;
  const invalid = isBus ? seats.length < 1 : qty < 1 || qty > ticket.quantity;

  const toggleSeat = (n) =>
    setSeats((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]));

  const submit = async (e) => {
    e.preventDefault();
    if (invalid) {
      return toast.error(
        isBus ? "Please select at least one seat" : `Quantity must be between 1 and ${ticket.quantity}`
      );
    }
    setLoading(true);
    const res = await createBooking({ ticketId: ticket._id, quantity });
    setLoading(false);
    if (!res.ok) return toast.error(res.data?.message || "Booking failed");
    toast.success("Booking requested! It is now pending vendor approval.");
    setOpen(false);
    router.push("/dashboard/user/bookings");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        disabled={disabled}
        className="btn-primary w-full text-base"
      >
        {departed ? "Departed" : soldOut ? "Sold out" : "Book Now"}
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] grid place-items-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative max-h-[88vh] w-full max-w-md overflow-y-auto scrollbar-thin rounded-2xl border border-ink-200 bg-white p-6 shadow-card dark:border-white/10 dark:bg-ink-900">
            <button onClick={() => setOpen(false)} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-xl border border-ink-200 dark:border-white/10" aria-label="Close">
              <FiX />
            </button>
            <h3 className="text-xl">Book ticket</h3>
            <p className="mt-1 line-clamp-1 text-sm text-ink-500 dark:text-ink-300">{ticket.title}</p>

            <div className="mt-4 flex items-center gap-2 rounded-xl bg-ink-50 px-3 py-2 text-sm text-ink-600 dark:bg-white/5 dark:text-ink-300">
              <FiCalendar className="h-4 w-4 text-brand-500" />
              {new Date(ticket.departureDate).toLocaleString()}
            </div>

            <form onSubmit={submit} className="mt-5 space-y-4">
              {isBus ? (
                <div>
                  <label className="label">Select your seats &middot; {ticket.quantity} available</label>
                  <div className="rounded-xl border border-ink-200 p-3 dark:border-white/10">
                    <SeatMap available={ticket.quantity} selected={seats} onToggle={toggleSeat} />
                  </div>
                  {seats.length > 0 && (
                    <p className="mt-2 text-xs text-ink-500 dark:text-ink-300">
                      Seats:{" "}
                      <span className="font-semibold text-brand-600 dark:text-brand-300">
                        {[...seats].sort((a, b) => a - b).join(", ")}
                      </span>
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <label className="label">Quantity (max {ticket.quantity})</label>
                  <input
                    type="number"
                    min={1}
                    max={ticket.quantity}
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    className="input"
                  />
                </div>
              )}

              <div className="flex items-center justify-between rounded-xl border border-ink-200 px-4 py-3 dark:border-white/10">
                <span className="text-sm text-ink-500 dark:text-ink-300">
                  {formatCurrency(ticket.price)} &times; {quantity}
                </span>
                <span className="font-display text-xl font-bold">{formatCurrency(total)}</span>
              </div>

              <button type="submit" disabled={loading || invalid} className="btn-primary w-full">
                {loading ? <><FiLoader className="animate-spin" /> Submitting&hellip;</> : "Confirm booking"}
              </button>
              <p className="text-center text-xs text-ink-400">
                Booking is saved as <span className="font-semibold">Pending</span> until the vendor accepts it.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}