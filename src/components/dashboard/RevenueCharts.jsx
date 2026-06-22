"use client";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { formatCurrency } from "@/lib/utils";

const STATUS_COLORS = {
  pending: "#f59e0b",
  accepted: "#0ea5e9",
  paid: "#10b981",
  rejected: "#f43f5e",
};

const tooltipStyle = {
  background: "#121a28",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 12,
  color: "#fff",
};

export default function RevenueCharts({ perTicket = [], byStatus = [] }) {
  const bars = perTicket.map((t) => {
    const n = t.title || t.ticketTitle || "Ticket";
    return {
      name: n.length > 18 ? n.slice(0, 18) + "…" : n,
      revenue: Number(t.revenue ?? t.total ?? 0),
      sold: Number(t.sold ?? t.count ?? 0),
    };
  });

  const pie = byStatus.map((s) => ({
    name: s.status || s._id || "unknown",
    value: Number(s.count ?? s.total ?? 0),
  }));

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="card p-5">
        <h3 className="text-base">Revenue by ticket</h3>
        {bars.length === 0 ? (
          <p className="mt-6 text-sm text-ink-500 dark:text-ink-300">No sales data yet.</p>
        ) : (
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bars} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#8290a9" }} interval={0} angle={-15} textAnchor="end" height={50} />
                <YAxis tick={{ fontSize: 11, fill: "#8290a9" }} />
                <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={tooltipStyle} />
                <Bar dataKey="revenue" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="card p-5">
        <h3 className="text-base">Bookings by status</h3>
        {pie.length === 0 ? (
          <p className="mt-6 text-sm text-ink-500 dark:text-ink-300">No bookings yet.</p>
        ) : (
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                  {pie.map((entry) => (
                    <Cell key={entry.name} fill={STATUS_COLORS[entry.name] || "#62718d"} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}