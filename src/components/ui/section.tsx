import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./container";

type SectionProps = {
  id?: string;
  /** id of the section's heading, announced as the region's name by screen readers. */
  labelledBy?: string;
  /** "subtle" uses the slightly darker alternate background. */
  tone?: "default" | "subtle";
  /** Drop the top padding when the section above has the same background, so the gap isn't doubled. */
  flushTop?: boolean;
  className?: string;
  children: ReactNode;
};

/** A full-width page section with consistent vertical spacing. */
export function Section({
  id,
  labelledBy,
  tone = "default",
  flushTop = false,
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
        flushTop ? "pb-16 md:pb-20 lg:pb-24" : "py-16 md:py-20 lg:py-24",
        tone === "subtle" && "bg-subtle",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
