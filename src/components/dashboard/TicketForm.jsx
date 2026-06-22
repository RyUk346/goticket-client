"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createTicket, updateTicket } from "@/lib/actions";
import { TRANSPORT_TYPES, PERK_OPTIONS } from "@/lib/constants";
import { FiLoader } from "react-icons/fi";

function toLocalInput(value) {
  if (!value) return "";
  const d = new Date(value);
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

export default function TicketForm({ ticket }) {
  const router = useRouter();
  const isEdit = Boolean(ticket?._id);
  const [perks, setPerks] = useState(ticket?.perks || []);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: ticket?.title || "",
      from: ticket?.from || "",
      to: ticket?.to || "",
      transportType: ticket?.transportType || TRANSPORT_TYPES[0],
      price: ticket?.price || "",
      quantity: ticket?.quantity || "",
      departureDate: toLocalInput(ticket?.departureDate),
      image: ticket?.image || "",
      description: ticket?.description || "",
    },
  });

  const togglePerk = (p) =>
    setPerks((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));

  const onSubmit = async (data) => {
    setLoading(true);
    const payload = {
      ...data,
      price: Number(data.price),
      quantity: Number(data.quantity),
      departureDate: new Date(data.departureDate).toISOString(),
      perks,
    };
    const res = isEdit ? await updateTicket(ticket._id, payload) : await createTicket(payload);
    setLoading(false);
    if (!res.ok) return toast.error(res.data?.message || "Could not save ticket");
    toast.success(isEdit ? "Ticket updated and sent for review" : "Ticket submitted for review");
    router.push("/dashboard/vendor/tickets");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="label">Title</label>
        <input className="input" placeholder="Dhaka → Cox's Bazar Deluxe Coach" {...register("title", { required: "Title is required" })} />
        {errors.title && <p className="mt-1 text-xs text-rose-500">{errors.title.message}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">From</label>
          <input className="input" {...register("from", { required: "Required" })} />
          {errors.from && <p className="mt-1 text-xs text-rose-500">{errors.from.message}</p>}
        </div>
        <div>
          <label className="label">To</label>
          <input className="input" {...register("to", { required: "Required" })} />
          {errors.to && <p className="mt-1 text-xs text-rose-500">{errors.to.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="label">Transport</label>
          <select className="input" {...register("transportType")}>
            {TRANSPORT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Price (৳)</label>
          <input type="number" min="0" className="input" {...register("price", { required: "Required", min: { value: 1, message: "Must be > 0" } })} />
          {errors.price && <p className="mt-1 text-xs text-rose-500">{errors.price.message}</p>}
        </div>
        <div>
          <label className="label">Seats / Qty</label>
          <input type="number" min="1" className="input" {...register("quantity", { required: "Required", min: { value: 1, message: "Min 1" } })} />
          {errors.quantity && <p className="mt-1 text-xs text-rose-500">{errors.quantity.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Departure date & time</label>
          <input type="datetime-local" className="input" {...register("departureDate", { required: "Required" })} />
          {errors.departureDate && <p className="mt-1 text-xs text-rose-500">{errors.departureDate.message}</p>}
        </div>
        <div>
          <label className="label">Image URL</label>
          <input className="input" placeholder="https://..." {...register("image", { required: "Required" })} />
          {errors.image && <p className="mt-1 text-xs text-rose-500">{errors.image.message}</p>}
        </div>
      </div>

      <div>
        <label className="label">Description</label>
        <textarea rows={4} className="input" {...register("description")} />
      </div>

      <div>
        <label className="label">Perks</label>
        <div className="flex flex-wrap gap-2">
          {PERK_OPTIONS.map((p) => {
            const active = perks.includes(p);
            return (
              <button
                type="button"
                key={p}
                onClick={() => togglePerk(p)}
                className={
                  active
                    ? "rounded-full bg-brand-500 px-3 py-1.5 text-xs font-semibold text-ink-950"
                    : "rounded-full border border-ink-300 px-3 py-1.5 text-xs text-ink-600 transition hover:border-brand-400 dark:border-white/15 dark:text-ink-200"
                }
              >
                {p}
              </button>
            );
          })}
        </div>
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto">
        {loading ? <><FiLoader className="animate-spin" /> Saving&hellip;</> : isEdit ? "Update ticket" : "Submit ticket"}
      </button>
    </form>
  );
}