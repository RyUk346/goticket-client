"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiCreditCard, FiLoader } from "react-icons/fi";

export default function PayNowButton({ bookingId, disabled }) {
  const [loading, setLoading] = useState(false);
  const pay = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        toast.error(data.message || "Could not start payment");
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      toast.error("Payment error");
      setLoading(false);
    }
  };
  return (
    <button onClick={pay} disabled={loading || disabled} className="btn-primary btn-sm w-full">
      {loading ? <><FiLoader className="animate-spin" /> Redirecting…</> : <><FiCreditCard /> Pay Now</>}
    </button>
  );
}
