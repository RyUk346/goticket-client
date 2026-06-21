"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { FiSearch, FiMapPin } from "react-icons/fi";

const SLIDES = [
  { img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80", tag: "Flights", title: "Fly anywhere, effortlessly", sub: "Compare and book flights to 200+ destinations with instant confirmation." },
  { img: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1600&q=80", tag: "Trains", title: "Ride the rails in comfort", sub: "Scenic train journeys with reserved seating and on-board perks." },
  { img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=80", tag: "Buses", title: "Every road, one platform", sub: "AC coaches and sleepers across the country, booked in seconds." },
  { img: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?auto=format&fit=crop&w=1600&q=80", tag: "Launches", title: "Sail the rivers with ease", sub: "Comfortable launch cabins for your riverine getaways." },
];

export default function Hero() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const search = (e) => {
    e.preventDefault();
    router.push(`/tickets${q ? `?search=${encodeURIComponent(q)}` : ""}`);
  };
  return (
    <section className="relative">
      <Swiper modules={[Autoplay, Pagination, EffectFade]} effect="fade" autoplay={{ delay: 4500, disableOnInteraction: false }} pagination={{ clickable: true }} loop className="h-[88vh] max-h-[760px] min-h-[560px] w-full">
        {SLIDES.map((s, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-full w-full">
              <Image src={s.img} alt={s.title} fill priority={i === 0} sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-ink-950/70 to-ink-950/30" />
              <div className="absolute inset-0 flex items-center">
                <div className="container-px">
                  <div className="max-w-2xl animate-fade-up">
                    <span className="section-kicker">{s.tag}</span>
                    <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-white sm:text-6xl">{s.title}</h1>
                    <p className="mt-4 max-w-lg text-lg text-ink-200">{s.sub}</p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="container-px relative z-10 -mt-12">
        <form onSubmit={search} className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-ink-200 px-3 dark:border-white/10">
            <FiMapPin className="h-5 w-5 text-brand-500" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by city — e.g. Dhaka, Chittagong, Sylhet…" className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-ink-400" />
          </div>
          <button type="submit" className="btn-primary sm:w-auto"><FiSearch /> Search tickets</button>
        </form>
      </div>
    </section>
  );
}