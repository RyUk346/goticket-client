import { cn } from "@/lib/utils";

export default function SectionHeading({ kicker, title, subtitle, center, className }) {
  return (
    <div className={cn(center && "mx-auto text-center", "max-w-3xl", className)}>
      {kicker ? <span className="section-kicker">{kicker}</span> : null}
      <h2 className="section-title mt-4">{title}</h2>
      {subtitle ? <p className={cn("section-sub", center && "mx-auto")}>{subtitle}</p> : null}
    </div>
  );
}