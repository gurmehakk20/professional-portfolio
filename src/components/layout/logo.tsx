import { cn } from "@/lib/cn";

/** The MEHAK wordmark. Wrap it in a link where needed. */
export function Wordmark({ name, className }: { name: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-display text-[1.0625rem] leading-none font-bold tracking-[0.2em] text-ink uppercase",
        className,
      )}
    >
      <span aria-hidden="true" className="size-2 rounded-[2px] bg-accent" />
      {name}
    </span>
  );
}
