import type { ReactNode } from "react";
import type { SectionIntro } from "@/content/types";
import { cn } from "@/lib/cn";

type SectionHeaderProps = SectionIntro & {
  /** id for the heading, so a <Section labelledBy> can reference it. */
  id?: string;
  /** Use "h1" at the top of inner pages. Default: "h2". */
  as?: "h1" | "h2";
  align?: "start" | "center";
  /** Optional element shown beside the heading on larger screens, e.g. a "View all" link. */
  action?: ReactNode;
  className?: string;
};

/** Eyebrow + title + description block used at the top of sections and pages. */
export function SectionHeader({
  eyebrow,
  title,
  description,
  id,
  as: Heading = "h2",
  align = "start",
  action,
  className,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        centered
          ? "items-center text-center"
          : "md:flex-row md:items-end md:justify-between md:gap-12",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "mx-auto")}>
        {eyebrow ? (
          <p className="text-eyebrow font-semibold text-accent uppercase">{eyebrow}</p>
        ) : null}
        <Heading
          id={id}
          className={cn(
            "font-semibold",
            Heading === "h1" ? "text-h1" : "text-h2",
            eyebrow && "mt-3",
          )}
        >
          {title}
        </Heading>
        {description ? <p className="mt-4 text-lead text-muted">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
