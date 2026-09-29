import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./container";

type SectionProps = {
  id?: string;
  /** id of the section's heading, announced as the region's name by screen readers. */
  labelledBy?: string;
  /** "subtle" uses the slightly darker alternate background. */
  tone?: "default" | "subtle";
  /** Wrap children in the standard <Container>. Default: true. */
  contained?: boolean;
  className?: string;
  children: ReactNode;
};

/** A full-width page section with consistent vertical spacing. */
export function Section({
  id,
  labelledBy,
  tone = "default",
  contained = true,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("py-16 md:py-20 lg:py-24", tone === "subtle" && "bg-subtle", className)}
    >
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}
