import SectionHeading from "@/components/SectionHeading";
import { FiTarget, FiHeart, FiTrendingUp } from "react-icons/fi";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="container-px py-16">
      <SectionHeading
        kicker="Our story"
        title="Travel, made simple"
        subtitle="GoTicket brings buses, trains, launches and flights into one clean, trustworthy booking experience."
      />

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {[
          { icon: FiTarget, title: "Our mission", text: "Make booking any journey fast, fair and transparent for everyone." },
          { icon: FiHeart, title: "Our values", text: "Trust first — verified vendors, secure payments, and honest pricing." },
          { icon: FiTrendingUp, title: "Our promise", text: "A platform that keeps getting better, journey after journey." },
        ].map((c) => (
          <div key={c.title} className="card p-6">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-500/15 text-brand-500">
              <c.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg">{c.title}</h3>
            <p className="mt-2 text-sm text-ink-500 dark:text-ink-300">{c.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
        {[["50K+", "Happy travellers"], ["1.2K+", "Routes"], ["300+", "Verified vendors"], ["99.9%", "Uptime"]].map(([n, l]) => (
          <div key={l} className="card p-6 text-center">
            <p className="font-display text-3xl font-bold text-brand-500">{n}</p>
            <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
