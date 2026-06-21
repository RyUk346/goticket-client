const BASE = process.env.NEXT_PUBLIC_SERVER_URL;

function qs(params = {}) {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") sp.set(k, v);
  });
  return sp.toString();
}

export async function getTickets(params = {}) {
  try {
    const res = await fetch(`${BASE}/api/tickets?${qs(params)}`, { cache: "no-store" });
    if (!res.ok) throw new Error("bad");
    return await res.json();
  } catch {
    return { data: [], total: 0, page: 1, totalPage: 1 };
  }
}

export async function getAdvertisedTickets() {
  try {
    const res = await fetch(`${BASE}/api/tickets/advertised`, { cache: "no-store" });
    return res.ok ? await res.json() : [];
  } catch {
    return [];
  }
}

export async function getLatestTickets() {
  try {
    const res = await fetch(`${BASE}/api/tickets/latest`, { cache: "no-store" });
    return res.ok ? await res.json() : [];
  } catch {
    return [];
  }
}

export async function getTicketById(id) {
  try {
    const res = await fetch(`${BASE}/api/tickets/${id}`, { cache: "no-store" });
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}