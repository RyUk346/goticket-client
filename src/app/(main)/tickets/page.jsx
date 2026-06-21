import AllTicketsClient from "@/components/AllTicketsClient";

export const metadata = { title: "All Tickets" };

export default async function TicketsPage({ searchParams }) {
  const sp = await searchParams;
  const initialSearch = typeof sp?.search === "string" ? sp.search : "";
  return <AllTicketsClient initialSearch={initialSearch} />;
}