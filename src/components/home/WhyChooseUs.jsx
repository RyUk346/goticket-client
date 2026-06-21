import SectionHeading from "@/components/SectionHeading";
import { FiShield, FiZap, FiHeadphones, FiTag } from "react-icons/fi";

const FEATURES = [
  { icon: FiShield, title: "Secure by design", text: "BetterAuth sessions and Stripe-protected payments keep every booking safe." },
  { icon: FiZap, title: "Instant booking", text: "Reserve seats in seconds with real-time availability and live countdowns." },
  { icon: FiTag, title: "Best fares", text: "Compare verified vendors and pick the price that fits your trip." },
  { icon: FiHeadphones, title: "Always supported", text: "A friendly team and a clear dashboard for managing every journey." },
];

export default function WhyChooseUs() {
  return (
    <section className="border-y border-ink-200 bg-ink-50/60 py-16 dark:border-white/10 dark:bg-white/[0.02]">
      <div className="container-px">
        <SectionHeading center kicker="Why GoTicket" title="Built for the way you travel" subtitle="Everything you need to discover, book and manage tickets — beautifully." />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="card card-hover p-6">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-500/15 text-brand-500"><f.icon className="h-6 w-6" /></div>
              <h3 className="mt-4 text-lg">{f.title}</h3>
              <p className="mt-2 text-sm text-ink-500 dark:text-ink-300">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}