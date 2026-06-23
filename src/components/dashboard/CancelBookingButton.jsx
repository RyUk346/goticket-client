"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { deleteBooking } from "@/lib/actions";
import { FiX, FiLoader } from "react-icons/fi";

export default function CancelBookingButton({ bookingId }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const cancel = async () => {
    setLoading(true);
    const res = await deleteBooking(bookingId);
    setLoading(false);
    if (!res.ok) return toast.error(res.data?.message || "Could not cancel");
    toast.success("Booking cancelled");
    router.refresh();
  };
  return (
    <button onClick={cancel} disabled={loading} className="btn-outline btn-sm w-full">
      {loading ? <FiLoader className="animate-spin" /> : <FiX />} Cancel
    </button>
  );
}
