import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * A note for you, the site owner, shown only while developing (`npm run dev`)
 * — never on the live site. Used to point out settings that still need filling in.
 */
export function DevNotice({ className, children }: { className?: string; children: ReactNode }) {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <p
      role="note"
      className={cn(
        "rounded-xl border border-dashed border-accent/50 bg-accent-soft px-4 py-3 text-sm text-accent-strong",
        className,
      )}
    >
      <strong className="font-semibold">Only visible in development: </strong>
      {children}
    </p>
  );
}
