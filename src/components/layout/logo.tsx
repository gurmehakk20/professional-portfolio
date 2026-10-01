import { cn } from "@/lib/cn";

/** The MEHAK wordmark: a small cobalt-gradient mark and the name. Wrap it in a link where needed. */
export function Wordmark({ name, className }: { name: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-display text-[1.0625rem] leading-none font-bold tracking-[0.2em] text-ink uppercase",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="size-2.5 rounded-[3px] bg-linear-135 from-accent to-accent-bright shadow-[0_0_0_3px_rgb(28_78_156/0.12)]"
      />
      {name}
    </span>
  );
}
