import { cn } from "@/lib/cn";

/*
 * Decorative background layers: a fine grid, small dots and soft colour
 * glows. They're hidden from assistive technology, ignore the pointer, and
 * sit behind content (the parent needs `relative isolate`, which <Section
 * decor={…}> adds for you). Glows are radial gradients, not blur filters,
 * so they cost almost nothing to draw.
 */

type DecorProps = { className?: string };

/** Fine grid lines that fade out towards the edges. */
export function GridPattern({ className }: DecorProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10 bg-grid fade-edges", className)}
    />
  );
}

/** A small patch of dots. Position and size it with `className`. */
export function DotPattern({ className }: DecorProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute -z-10 bg-dots fade-edges", className)}
    />
  );
}

/** A soft blue or teal glow. Position and size it with `className` (e.g. `-top-40 right-0 w-[32rem]`). */
export function Glow({ color = "blue", className }: DecorProps & { color?: "blue" | "cyan" }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -z-10 aspect-square rounded-full",
        color === "blue"
          ? "bg-[radial-gradient(closest-side,rgb(49_105_196/0.16),transparent)]"
          : "bg-[radial-gradient(closest-side,rgb(47_139_166/0.12),transparent)]",
        className,
      )}
    />
  );
}
