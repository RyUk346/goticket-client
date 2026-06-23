import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getServerSession, getServerToken } from "@/lib/getToken";

export async function POST(req) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  let body = {};
  try {
    body = await req.json();
  } catch {}
  const { bookingId } = body;
  if (!bookingId) return NextResponse.json({ message: "Missing bookingId" }, { status: 400 });

  const token = await getServerToken();
  const base = process.env.NEXT_PUBLIC_SERVER_URL;
  const r = await fetch(`${base}/api/bookings/user/${session.user.email}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const bookings = r.ok ? await r.json() : [];
  const booking = bookings.find((b) => b._id === bookingId);

  if (!booking) return NextResponse.json({ message: "Booking not found" }, { status: 404 });
  if (booking.status !== "accepted")
    return NextResponse.json({ message: "Only accepted bookings can be paid" }, { status: 400 });
  if (new Date(booking.departureDate).getTime() <= Date.now())
    return NextResponse.json({ message: "Departure has passed — payment closed" }, { status: 400 });

  const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const checkout = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "bdt",
            product_data: {
              name: booking.ticketTitle,
              description: `${booking.from} → ${booking.to} · ${booking.quantity} seat(s)`,
            },
            unit_amount: Math.round(Number(booking.totalPrice) * 100),
          },
          quantity: 1,
        },
      ],
      customer_email: booking.userEmail,
      metadata: { bookingId: booking._id, userEmail: booking.userEmail },
      success_url: `${origin}/dashboard/user/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard/user/bookings`,
    });
    return NextResponse.json({ url: checkout.url });
  } catch (e) {
    return NextResponse.json({ message: e.message || "Stripe error" }, { status: 500 });
  }
}
