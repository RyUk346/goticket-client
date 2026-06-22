"use client";

export default function SeatMap({ available = 0, selected = [], onToggle }) {
  const seats = Array.from({ length: available }, (_, i) => i + 1);
  if (available <= 0) {
    return <p className="text-center text-sm text-ink-500 dark:text-ink-300">No seats available</p>;
  }
  return (
    <div>
      <div className="mb-3 flex items-center justify-center gap-4 text-xs text-ink-500 dark:text-ink-300">
        <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded border border-ink-300 dark:border-white/20" /> Available</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-brand-500" /> Selected</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {seats.map((n) => {
          const active = selected.includes(n);
          return (
            <button
              key={n}
              type="button"
              onClick={() => onToggle(n)}
              className={
                active
                  ? "rounded-lg bg-brand-500 py-2 text-sm font-semibold text-ink-950"
                  : "rounded-lg border border-ink-300 py-2 text-sm text-ink-600 transition hover:border-brand-400 hover:text-brand-600 dark:border-white/15 dark:text-ink-200 dark:hover:border-brand-400"
              }
            >
              {n}
            </button>
          );
        })}
      </div>
    </div>
  );
}