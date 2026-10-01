import type { ReactNode } from "react";
import type { SectionIntro } from "@/content/types";
import { cn } from "@/lib/cn";

type SectionHeaderProps = SectionIntro & {
  /** id for the heading, so a <Section labelledBy> can reference it. */
  id?: string;
  /** Use "h1" at the top of inner pages. Default: "h2". */
  as?: "h1" | "h2";
  /** Small section number shown before the eyebrow, e.g. "01". */
  number?: string;
  /** Use "dark" inside dark sections. */
  tone?: "light" | "dark";
  align?: "start" | "center";
  /** Optional element shown beside the heading on larger screens, e.g. a "View all" link. */
  action?: ReactNode;
  className?: string;
};

/**
 * Numbered eyebrow + title + description, used at the top of sections and pages.
 * Section headers fade up as they scroll into view; page titles (h1) don't.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  id,
  as: Heading = "h2",
  number,
  tone = "light",
  align = "start",
  action,
  className,
}: SectionHeaderProps) {
  const centered = align === "center";
  const dark = tone === "dark";

  return (
    <div
      data-reveal={Heading === "h1" ? undefined : true}
      className={cn(
        "flex flex-col gap-6",
        centered
          ? "items-center text-center"
          : "md:flex-row md:items-end md:justify-between md:gap-12",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "mx-auto")}>
        {eyebrow || number ? (
          <div
            className={cn(
              "flex items-center gap-3 text-eyebrow font-semibold uppercase",
              centered && "justify-center",
            )}
          >
            {number ? (
              <span
                aria-hidden="true"
                className={cn(
                  "inline-flex h-6 min-w-8 items-center justify-center rounded-full px-2 text-[0.6875rem] tracking-[0.04em] tabular-nums",
                  dark
                    ? "border border-white/15 bg-white/5 text-accent-on-dark"
                    : "border border-accent/15 bg-accent-soft text-accent-strong",
                )}
              >
                {number}
              </span>
            ) : null}
            {number && eyebrow ? (
              <span
                aria-hidden="true"
                className={cn("h-px w-8", dark ? "bg-white/20" : "bg-line-strong")}
              />
            ) : null}
            {eyebrow ? (
              <p className={dark ? "text-accent-on-dark" : "text-accent"}>{eyebrow}</p>
            ) : null}
          </div>
        ) : null}
        <Heading
          id={id}
          className={cn(
            "font-semibold",
            Heading === "h1" ? "text-h1" : "text-h2",
            (eyebrow || number) && "mt-5",
          )}
        >
          {title}
        </Heading>
        {description ? (
          <p
            className={cn(
              "mt-5 max-w-xl text-lead",
              dark ? "text-on-dark-muted" : "text-muted",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
