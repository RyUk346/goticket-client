"use client";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from "recharts";

const STATUS_COLORS = {
  pending: "#f59e0b",
  accepted: "#0ea5e9",
  paid: "#10b981",
  rejected: "#f43f5e",
};

export default function RevenueCharts({ perTicket = [], byStatus = [] }) {
  const barData = perTicket.length
    ? perTicket.map((t) => ({ name: t.name?.length > 14 ? t.name.slice(0, 14) + "…" : t.name, Revenue: t.revenue, Sold: t.sold }))
    : [];
  const pieData = byStatus.filter((s) => s.status);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="card p-5 lg:col-span-2">
        <h3 className="text-lg">Revenue by ticket</h3>
        <p className="mb-4 text-sm text-ink-500 dark:text-ink-300">Total sales value per ticket (paid bookings).</p>
        <div className="h-72 w-full">
          {barData.length ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#8290a9" }} />
                <YAxis tick={{ fontSize: 12, fill: "#8290a9" }} />
                <Tooltip contentStyle={{ background: "#1c2638", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff" }} />
                <Bar dataKey="Revenue" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Sold" fill="#38598a" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="grid h-full place-items-center text-sm text-ink-400">No sales data yet</div>
          )}
        </div>
      </div>

      <div className="card p-5">
        <h3 className="text-lg">Bookings by status</h3>
        <p className="mb-4 text-sm text-ink-500 dark:text-ink-300">Distribution of all booking requests.</p>
        <div className="h-72 w-full">
          {pieData.length ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={3}>
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={STATUS_COLORS[entry.status] || "#94a3b8"} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "#1c2638", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff" }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="grid h-full place-items-center text-sm text-ink-400">No bookings yet</div>
          )}
        </div>
      </div>
    </div>
  );
}
