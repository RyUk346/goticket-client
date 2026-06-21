import { cn } from "@/app/lib/utils";

export default function Spinner({ fullscreen = false, label, className }) {
  const ring = (
    <div className="flex flex-col items-center gap-3">
      <div className={cn("h-10 w-10 animate-spin rounded-full border-4 border-ink-300/40 border-t-brand-500", className)} />
      {label ? <p className="text-sm text-ink-500 dark:text-ink-300">{label}</p> : null}
    </div>
  );
  if (fullscreen) return <div className="grid min-h-[60vh] w-full place-items-center">{ring}</div>;
  return <div className="grid w-full place-items-center py-12">{ring}</div>;
}