"use client";
import { useEffect, useMemo, useState } from "react";
import { getTickets } from "@/app/api/public";
import { TRANSPORT_TYPES } from "@/lib/constants";
import TicketCard from "@/components/TicketCard";
import Pagination from "@/components/Pagination";
import Spinner from "@/components/Spinner";
import EmptyState from "@/components/EmptyState";
import SectionHeading from "@/components/SectionHeading";
import { FiSearch, FiFilter, FiX } from "react-icons/fi";

const LIMIT = 9;

export default function AllTicketsClient({ initialSearch = "" }) {
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [search, setSearch] = useState(initialSearch);
  const [transportType, setTransportType] = useState("all");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ data: [], total: 0, totalPage: 1, page: 1 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => { setSearch(searchInput); setPage(1); }, 400);
    return () => clearTimeout(id);
  }, [searchInput]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getTickets({ search, transportType, sort, page, limit: LIMIT }).then((res) => {
      if (active) { setData(res); setLoading(false); }
    });
    return () => { active = false; };
  }, [search, transportType, sort, page]);

  const hasFilters = useMemo(() => search || transportType !== "all" || sort, [search, transportType, sort]);

  const reset = () => {
    setSearchInput(""); setSearch(""); setTransportType("all"); setSort(""); setPage(1);
  };

  return (
    <div className="container-px py-12">
      <SectionHeading kicker="Browse" title="All tickets" subtitle="Search by city, filter by transport, and sort by price to find your perfect trip." />

      <div className="card mt-8 flex flex-col gap-3 p-4 lg:flex-row lg:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-ink-200 px-3 dark:border-white/10">
          <FiSearch className="h-5 w-5 text-brand-500" />
          <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search From → To (e.g. Dhaka, Sylhet)…" className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-ink-400" />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-xl border border-ink-200 px-3 dark:border-white/10">
            <FiFilter className="h-4 w-4 text-ink-400" />
            <select value={transportType} onChange={(e) => { setTransportType(e.target.value); setPage(1); }} className="bg-transparent py-2.5 text-sm outline-none">
              <option value="all">All transport</option>
              {TRANSPORT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <select value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }} className="rounded-xl border border-ink-200 bg-transparent px-3 py-2.5 text-sm outline-none dark:border-white/10">
            <option value="">Sort: Default</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
          {hasFilters && <button onClick={reset} className="btn-ghost btn-sm" title="Clear filters"><FiX /> Clear</button>}
        </div>
      </div>

      {loading ? (
        <Spinner label="Finding tickets…" />
      ) : data.data.length === 0 ? (
        <div className="mt-10">
          <EmptyState title="No tickets found" message="Try a different city, transport type, or clear your filters." action={hasFilters ? <button onClick={reset} className="btn-outline btn-sm mt-2">Clear filters</button> : null} />
        </div>
      ) : (
        <>
          <p className="mt-6 text-sm text-ink-500 dark:text-ink-300">Showing <span className="font-semibold text-ink-800 dark:text-white">{data.data.length}</span> of {data.total} tickets</p>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.data.map((t) => <TicketCard key={t._id} ticket={t} variant="all" />)}
          </div>
          <Pagination page={data.page} totalPage={data.totalPage} onChange={setPage} />
        </>
      )}
    </div>
  );
}