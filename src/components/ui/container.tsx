import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Centres content and applies the site's side padding and max width. */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-site px-5 sm:px-8", className)}>{children}</div>;
}
