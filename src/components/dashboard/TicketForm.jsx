"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { uploadImage } from "@/lib/imgbb";
import { createTicket, updateTicket } from "@/lib/actions";
import { TRANSPORT_TYPES, PERK_OPTIONS } from "@/lib/constants";
import { FiUploadCloud, FiLoader, FiImage } from "react-icons/fi";

function toLocalInput(value) {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d)) return "";
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 16);
}

export default function TicketForm({ mode = "add", vendorName, vendorEmail, ticket, onDone }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: ticket
      ? {
          title: ticket.title,
          from: ticket.from,
          to: ticket.to,
          transportType: ticket.transportType,
          price: ticket.price,
          quantity: ticket.quantity,
          departureDate: toLocalInput(ticket.departureDate),
          description: ticket.description,
          perks: ticket.perks || [],
        }
      : { transportType: "Bus", perks: [] },
  });

  const [imageUrl, setImageUrl] = useState(ticket?.image || "");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setImageUrl(url);
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err?.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (values) => {
    if (!imageUrl) return toast.error("Please upload a ticket image");
    const perks = Array.isArray(values.perks) ? values.perks : values.perks ? [values.perks] : [];
    const payload = {
      title: values.title,
      from: values.from,
      to: values.to,
      transportType: values.transportType,
      price: Number(values.price),
      quantity: Number(values.quantity),
      departureDate: new Date(values.departureDate).toISOString(),
      perks,
      description: values.description || "",
      image: imageUrl,
      vendorName,
    };

    setSubmitting(true);
    const res = mode === "add" ? await createTicket(payload) : await updateTicket(ticket._id, payload);
    setSubmitting(false);

    if (!res.ok) return toast.error(res.data?.message || "Something went wrong");
    toast.success(mode === "add" ? "Ticket added — pending approval" : "Ticket updated — pending re-approval");
    if (onDone) onDone();
    else router.push("/dashboard/vendor/tickets");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="label">Ticket title</label>
        <input className="input" placeholder="Dhaka → Cox's Bazar Deluxe Coach" {...register("title", { required: "Title is required" })} />
        {errors.title && <p className="mt-1 text-xs text-rose-500">{errors.title.message}</p>}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="label">From (location)</label>
          <input className="input" placeholder="Dhaka" {...register("from", { required: "Required" })} />
          {errors.from && <p className="mt-1 text-xs text-rose-500">{errors.from.message}</p>}
        </div>
        <div>
          <label className="label">To (location)</label>
          <input className="input" placeholder="Cox's Bazar" {...register("to", { required: "Required" })} />
          {errors.to && <p className="mt-1 text-xs text-rose-500">{errors.to.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="label">Transport type</label>
          <select className="input" {...register("transportType", { required: true })}>
            {TRANSPORT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Price (per unit)</label>
          <input type="number" min="0" step="0.01" className="input" placeholder="1400" {...register("price", { required: "Required", min: { value: 0, message: "Must be ≥ 0" } })} />
          {errors.price && <p className="mt-1 text-xs text-rose-500">{errors.price.message}</p>}
        </div>
        <div>
          <label className="label">Ticket quantity</label>
          <input type="number" min="0" className="input" placeholder="40" {...register("quantity", { required: "Required", min: { value: 0, message: "Must be ≥ 0" } })} />
          {errors.quantity && <p className="mt-1 text-xs text-rose-500">{errors.quantity.message}</p>}
        </div>
      </div>

      <div>
        <label className="label">Departure date &amp; time</label>
        <input type="datetime-local" className="input" {...register("departureDate", { required: "Required" })} />
        {errors.departureDate && <p className="mt-1 text-xs text-rose-500">{errors.departureDate.message}</p>}
      </div>

      <div>
        <label className="label">Perks</label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {PERK_OPTIONS.map((perk) => (
            <label key={perk} className="flex cursor-pointer items-center gap-2 rounded-lg border border-ink-200 px-3 py-2 text-sm transition hover:border-brand-400 dark:border-white/10">
              <input type="checkbox" value={perk} {...register("perks")} className="accent-brand-500" />
              {perk}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="label">Ticket image</label>
        <div className="flex items-center gap-4">
          <label className="btn-outline cursor-pointer">
            {uploading ? <FiLoader className="animate-spin" /> : <FiUploadCloud />} {uploading ? "Uploading…" : "Upload image"}
            <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
          </label>
          {imageUrl ? (
            <Image src={imageUrl} alt="preview" width={96} height={64} className="h-16 w-24 rounded-lg object-cover" />
          ) : (
            <span className="flex h-16 w-24 items-center justify-center rounded-lg border border-dashed border-ink-300 text-ink-400 dark:border-white/10">
              <FiImage />
            </span>
          )}
        </div>
      </div>

      <div>
        <label className="label">Description</label>
        <textarea rows={3} className="input resize-none" placeholder="Comfortable AC coach with reclining seats…" {...register("description")} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Vendor name</label>
          <input className="input opacity-70" value={vendorName || ""} readOnly />
        </div>
        <div>
          <label className="label">Vendor email</label>
          <input className="input opacity-70" value={vendorEmail || ""} readOnly />
        </div>
      </div>

      <button type="submit" disabled={submitting || uploading} className="btn-primary w-full sm:w-auto">
        {submitting ? <><FiLoader className="animate-spin" /> Saving…</> : mode === "add" ? "Add Ticket" : "Update Ticket"}
      </button>
    </form>
  );
}
