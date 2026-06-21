import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function CtaBand() {
  return (
    <section className="container-px py-16">
      <div className="relative overflow-hidden rounded-3xl bg-ink-950 p-10 sm:p-14">
        <div className="absolute inset-0 opacity-70" style={{ backgroundImage: "radial-gradient(30rem 30rem at 15% 20%, rgba(245,158,11,0.25), transparent 60%), radial-gradient(28rem 28rem at 85% 90%, rgba(56,89,138,0.35), transparent 60%)" }} />
        <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Sell tickets on GoTicket</h2>
            <p className="mt-3 text-ink-300">List your bus, train, launch or flight inventory and reach thousands of travellers. Become a vendor today.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/register" className="btn-primary">Get started <FiArrowRight /></Link>
            <Link href="/tickets" className="btn-outline border-white/20 text-white hover:text-brand-300">Browse tickets</Link>
          </div>
        </div>
      </div>
    </section>
  );
}