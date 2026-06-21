import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount) {
  const n = Number(amount || 0);
  return "৳" + new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);
}

export function formatDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d)) return "—";
  return d.toLocaleString("en-US", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export function formatDay(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d)) return "—";
  return d.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

export function isDeparted(value) {
  if (!value) return false;
  return new Date(value).getTime() <= Date.now();
}

export function statusBadgeClass(status) {
  switch (status) {
    case "approved": return "badge-approved";
    case "accepted": return "badge-accepted";
    case "rejected": return "badge-rejected";
    case "paid": return "badge-paid";
    default: return "badge-pending";
  }
}

export function initials(name = "") {
  return name.split(" ").filter(Boolean).slice(0, 2).map((n) => n[0]?.toUpperCase()).join("");
}