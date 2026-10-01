import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TagProps = {
  /** "neutral" for labels, "accent" for highlights, "placeholder" to flag example content. */
  tone?: "neutral" | "accent" | "placeholder";
  className?: string;
  children: ReactNode;
};

/** Small pill label for categories, technologies and tags. */
export function Tag({ tone = "neutral", className, children }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs leading-5 font-medium",
        tone === "neutral" && "border border-line bg-surface text-muted",
        tone === "accent" && "border border-accent/15 bg-accent-soft text-accent-strong",
        tone === "placeholder" && "border border-dashed border-field bg-surface text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
