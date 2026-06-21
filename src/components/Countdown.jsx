"use client";
import { useEffect, useState } from "react";

function diff(target) {
  const ms = new Date(target).getTime() - Date.now();
  if (ms <= 0) return null;
  return {
    d: Math.floor(ms / 86400000),
    h: Math.floor((ms % 86400000) / 3600000),
    m: Math.floor((ms % 3600000) / 60000),
    s: Math.floor((ms % 60000) / 1000),
  };
}

export default function Countdown({ target, compact = false }) {
  const [t, setT] = useState(() => diff(target));
  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!t) return <span className="badge bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300">Departed</span>;

  if (compact) {
    return (
      <span className="font-mono text-sm font-semibold text-brand-600 dark:text-brand-300">
        {t.d}d {String(t.h).padStart(2, "0")}:{String(t.m).padStart(2, "0")}:{String(t.s).padStart(2, "0")}
      </span>
    );
  }

  const Unit = ({ v, l }) => (
    <div className="flex flex-col items-center rounded-xl border border-ink-200 bg-white/60 px-3 py-2 dark:border-white/10 dark:bg-white/5">
      <span className="font-display text-xl font-bold tabular-nums text-ink-900 dark:text-white">{String(v).padStart(2, "0")}</span>
      <span className="text-[10px] uppercase tracking-wider text-ink-400">{l}</span>
    </div>
  );
  return (
    <div className="flex gap-2">
      <Unit v={t.d} l="days" /><Unit v={t.h} l="hrs" /><Unit v={t.m} l="min" /><Unit v={t.s} l="sec" />
    </div>
  );
}