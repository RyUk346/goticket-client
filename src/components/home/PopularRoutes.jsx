import Link from "next/link";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import { FiArrowRight } from "react-icons/fi";

const ROUTES = [
  { from: "Dhaka", to: "Cox's Bazar", img: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?auto=format&fit=crop&w=800&q=80", price: "from ৳1400" },
  { from: "Dhaka", to: "Sylhet", img: "https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=800&q=80", price: "from ৳900" },
  { from: "Chittagong", to: "Dhaka", img: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80", price: "from ৳1100" },
  { from: "Dhaka", to: "Rajshahi", img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80", price: "from ৳800" },
];

export default function PopularRoutes() {
  return (
    <section className="container-px py-16">
      <SectionHeading center kicker="Trending" title="Popular routes" subtitle="The journeys travellers are loving right now." />
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ROUTES.map((r) => (
          <Link key={`${r.from}-${r.to}`} href={`/tickets?search=${encodeURIComponent(r.to)}`} className="card card-hover group relative overflow-hidden">
            <div className="relative h-52">
              <Image src={r.img} alt={`${r.from} to ${r.to}`} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-xs text-brand-300">{r.price}</p>
                <p className="mt-1 flex items-center gap-2 font-display text-lg font-bold">{r.from} <FiArrowRight className="h-4 w-4 text-brand-400" /> {r.to}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}