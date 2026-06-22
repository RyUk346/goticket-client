"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { createPayment } from "@/lib/actions";
import { formatCurrency } from "@/lib/utils";
import { FiLock, FiLoader } from "react-icons/fi";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function Inner({ booking }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setLoading(false);
      return toast.error(error.message || "Payment failed");
    }

    if (paymentIntent?.status === "succeeded") {
      const res = await createPayment({
        bookingId: booking._id,
        amount: booking.amount,
        transactionId: paymentIntent.id,
      });
      setLoading(false);
      if (!res.ok) return toast.error(res.data?.message || "Could not record payment");
      toast.success("Payment successful!");
      router.push("/dashboard/user/bookings");
    } else {
      setLoading(false);
      toast.error("Payment not completed");
    }
  };

  return (
    <form onSubmit={submit} className="mt-5 space-y-5">
      <PaymentElement />
      <button type="submit" disabled={!stripe || loading} className="btn-primary w-full">
        {loading ? <><FiLoader className="animate-spin" /> Processing&hellip;</> : <><FiLock /> Pay {formatCurrency(booking.amount)}</>}
      </button>
    </form>
  );
}

export default function CheckoutForm({ clientSecret, booking }) {
  if (!clientSecret) {
    return <p className="mt-5 text-sm text-rose-500">Unable to initialise payment.</p>;
  }
  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "night" } }}>
      <Inner booking={booking} />
    </Elements>
  );
}