export default function PageHeading({ title, subtitle, action }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-ink-500 dark:text-ink-300">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}
