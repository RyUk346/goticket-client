import { notFound, redirect } from "next/navigation";
import { getDashboardUser } from "@/lib/guard";
import { getUserBookings } from "@/lib/api/server";
import { stripe } from "@/lib/stripe";
import CheckoutForm from "@/components/dashboard/CheckoutForm";
import { formatCurrency, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function PaymentPage({ params }) {
  const { id } = await params;
  const { email } = await getDashboardUser();
  const bookings = await getUserBookings(email);
  const list = Array.isArray(bookings) ? bookings : [];
  const booking = list.find((b) => b._id === id);

  if (!booking) notFound();
  if (booking.status !== "accepted") redirect("/dashboard/user/bookings");

  const total = booking.totalPrice ?? Number(booking.price || booking.unitPrice || 0) * Number(booking.quantity || 0);
  const currency = process.env.STRIPE_CURRENCY || "usd";

  const intent = await stripe.paymentIntents.create({
    amount: Math.round(total * 100),
    currency,
    metadata: { bookingId: booking._id, userEmail: email },
    automatic_payment_methods: { enabled: true },
  });

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="text-2xl">Complete payment</h1>
      <p className="mt-1 text-ink-500 dark:text-ink-300">Secure checkout powered by Stripe.</p>

      <div className="card mt-6 p-5">
        <div className="flex items-center justify-between border-b border-ink-100 pb-4 dark:border-white/5">
          <div>
            <p className="font-medium text-ink-900 dark:text-white">{booking.ticketTitle || booking.title}</p>
            <p className="text-xs text-ink-500 dark:text-ink-300">{booking.from} → {booking.to} · {formatDate(booking.departureDate)}</p>
          </div>
          <span className="font-display text-xl font-bold">{formatCurrency(total)}</span>
        </div>

        <CheckoutForm
          clientSecret={intent.client_secret}
          booking={{ _id: booking._id, amount: total }}
        />
      </div>
    </div>
  );
}