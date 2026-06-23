"use client";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const onSubmit = () => {
    toast.success("Thanks! We’ll get back to you shortly.");
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Name</label>
          <input className="input" placeholder="Your name" {...register("name", { required: "Required" })} />
          {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name.message}</p>}
        </div>
        <div>
          <label className="label">Email</label>
          <input type="email" className="input" placeholder="you@example.com" {...register("email", { required: "Required" })} />
          {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>}
        </div>
      </div>
      <div>
        <label className="label">Message</label>
        <textarea rows={5} className="input resize-none" placeholder="How can we help?" {...register("message", { required: "Required" })} />
        {errors.message && <p className="mt-1 text-xs text-rose-500">{errors.message.message}</p>}
      </div>
      <button type="submit" className="btn-primary">Send message</button>
    </form>
  );
}
