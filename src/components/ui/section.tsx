import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./container";

export type SectionTone = "default" | "subtle" | "dark";

type SectionProps = {
  id?: string;
  /** id of the section's heading, announced as the region's name by screen readers. */
  labelledBy?: string;
  /** "subtle" is the light blue-grey alternate background; "dark" is the night-blue band. */
  tone?: SectionTone;
  /** Drop the top padding when the section above has the same background, so the gap isn't doubled. */
  flushTop?: boolean;
  /** Decorative layers (grid, glows) drawn behind the content. */
  decor?: ReactNode;
  className?: string;
  children: ReactNode;
};

/** A full-width page section with consistent vertical spacing. */
export function Section({
  id,
  labelledBy,
  tone = "default",
  flushTop = false,
  decor,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      // Sections with an id can receive focus from in-page links (see HashLinkFocus).
      tabIndex={id ? -1 : undefined}
      className={cn(
        "outline-none",
        flushTop ? "pb-16 md:pb-24 lg:pb-28" : "py-16 md:py-24 lg:py-28",
        tone === "subtle" && "bg-subtle",
        tone === "dark" && "theme-dark",
        decor ? "relative isolate overflow-hidden" : null,
        className,
      )}
    >
      {decor}
      <Container>{children}</Container>
    </section>
  );
}
