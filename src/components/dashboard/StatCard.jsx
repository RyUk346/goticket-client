import { cn } from "@/lib/utils";

export default function StatCard({ label, value, icon: Icon, tone = "brand", hint }) {
  const tones = {
    brand: "bg-brand-500/15 text-brand-500",
    sky: "bg-sky-500/15 text-sky-500",
    emerald: "bg-emerald-500/15 text-emerald-500",
    rose: "bg-rose-500/15 text-rose-500",
    violet: "bg-violet-500/15 text-violet-500",
  };
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink-500 dark:text-ink-300">{label}</p>
        {Icon ? (
          <span className={cn("grid h-10 w-10 place-items-center rounded-xl", tones[tone])}>
            <Icon className="h-5 w-5" />
          </span>
        ) : null}
      </div>
      <p className="mt-3 font-display text-3xl font-bold">{value}</p>
      {hint ? <p className="mt-1 text-xs text-ink-400">{hint}</p> : null}
    </div>
  );
}
