import Hero from "@/components/home/Hero";
import TicketsSection from "@/components/home/TicketsSection";
import PopularRoutes from "@/components/home/PopularRoutes";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CtaBand from "@/components/home/CtaBand";
import { getAdvertisedTickets, getLatestTickets } from "@/app/api/public";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [advertised, latest] = await Promise.all([getAdvertisedTickets(), getLatestTickets()]);
  return (
    <>
      <Hero />
      <TicketsSection kicker="Featured" title="Advertised tickets" subtitle="Hand-picked journeys spotlighted by our team." tickets={advertised} variant="home" viewAll />
      <PopularRoutes />
      <TicketsSection kicker="Fresh" title="Latest tickets" subtitle="The newest routes added by our verified vendors." tickets={latest} variant="all" viewAll />
      <WhyChooseUs />
      <CtaBand />
    </>
  );
}