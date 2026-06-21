import Link from "next/link";
import TicketCard from "@/components/TicketCard";
import SectionHeading from "@/components/SectionHeading";
import EmptyState from "@/components/EmptyState";
import { FiArrowRight } from "react-icons/fi";

export default function TicketsSection({ kicker, title, subtitle, tickets = [], variant = "home", viewAll }) {
  return (
    <section className="container-px py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading kicker={kicker} title={title} subtitle={subtitle} />
        {viewAll && <Link href="/tickets" className="btn-outline btn-sm">View all <FiArrowRight /></Link>}
      </div>
      {tickets.length === 0 ? (
        <div className="mt-10"><EmptyState title="No tickets to show yet" message="Approved tickets will appear here as vendors add them." /></div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tickets.map((t) => <TicketCard key={t._id} ticket={t} variant={variant} />)}
        </div>
      )}
    </section>
  );
}