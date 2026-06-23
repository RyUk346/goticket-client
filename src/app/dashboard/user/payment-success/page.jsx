import Link from "next/link";
import { redirect } from "next/navigation";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "@/lib/getToken";
import { getUserBookings, recordPayment } from "@/lib/api/server";
import { formatCurrency } from "@/lib/utils";
import PdfTicketButton from "@/components/dashboard/PdfTicketButton";

export const dynamic = "force-dynamic";
export const metadata = { title: "Payment" };

export default async function PaymentSuccessPage({ searchParams }) {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");

  const sp = await searchParams;
  const sessionId = typeof sp?.session_id === "string" ? sp.session_id : null;
  if (!sessionId) redirect("/dashboard/user/bookings");

  let ok = false;
  let booking = null;
  let message = "We couldn’t verify this payment.";

  try {
    const cs = await stripe.checkout.sessions.retrieve(sessionId);
    if (cs.payment_status === "paid") {
      const pi = cs.payment_intent;
      const transactionId = typeof pi === "string" ? pi : pi?.id || cs.id;
      const bookingId = cs.metadata?.bookingId;
      const amount = (cs.amount_total || 0) / 100;

      const fin = await recordPayment({ bookingId, transactionId, amount });
      ok = fin.ok || fin.data?.duplicate;
      message = fin.data?.message || "";

      const bookings = (await getUserBookings(session.user.email)) || [];
      booking = bookings.find((b) => b._id === bookingId) || null;
      if (booking) booking.transactionId = transactionId;
    } else {
      message = "Payment was not completed.";
    }
  } catch {
    message = "Could not verify payment with Stripe.";
  }

  return (
    <div className="mx-auto max-w-lg py-10">
      <div className="card p-8 text-center">
        {ok ? (
          <>
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-emerald-500/15 text-emerald-500">
              <FiCheckCircle className="h-9 w-9" />
            </div>
            <h1 className="mt-5 text-2xl">Payment successful</h1>
            <p className="mt-2 text-ink-500 dark:text-ink-300">
              Your booking is confirmed{booking ? ` — ${booking.ticketTitle}` : ""}.
            </p>
            {booking && (
              <div className="mt-5 rounded-xl border border-ink-200 p-4 text-left text-sm dark:border-white/10">
                <Row k="Route" v={`${booking.from} → ${booking.to}`} />
                <Row k="Quantity" v={booking.quantity} />
                <Row k="Amount paid" v={formatCurrency(booking.totalPrice)} />
                <Row k="Transaction" v={booking.transactionId} mono />
              </div>
            )}
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              {booking && <PdfTicketButton booking={booking} />}
              <Link href="/dashboard/user/bookings" className="btn-primary btn-sm w-full">Back to my bookings</Link>
            </div>
          </>
        ) : (
          <>
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-rose-500/15 text-rose-500">
              <FiXCircle className="h-9 w-9" />
            </div>
            <h1 className="mt-5 text-2xl">Payment not confirmed</h1>
            <p className="mt-2 text-ink-500 dark:text-ink-300">{message}</p>
            <Link href="/dashboard/user/bookings" className="btn-primary btn-sm mt-6 inline-flex">Back to my bookings</Link>
          </>
        )}
      </div>
    </div>
  );
}

function Row({ k, v, mono }) {
  return (
    <div className="flex items-center justify-between border-b border-ink-100 py-2 last:border-0 dark:border-white/5">
      <span className="text-ink-400">{k}</span>
      <span className={mono ? "font-mono text-xs" : "font-medium"}>{v}</span>
    </div>
  );
}
