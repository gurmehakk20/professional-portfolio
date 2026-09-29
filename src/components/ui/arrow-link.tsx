import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { isExternalHref } from "@/lib/links";
import { Icon } from "./icon";

type ArrowLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

/** Text link with a trailing arrow: "→" for pages on this site, "↗" for other sites. */
export function ArrowLink({ href, className, children }: ArrowLinkProps) {
  const external = isExternalHref(href);
  const opensNewTab = /^(https?:)?\/\//.test(href);
  const classes = cn(
    "group inline-flex items-center gap-1.5 font-semibold text-ink underline-offset-4",
    "transition-colors duration-200 hover:text-accent-strong hover:underline",
    className,
  );
  const arrow = (
    <Icon
      name={external ? "arrow-up-right" : "arrow-right"}
      size={16}
      className={cn(
        "shrink-0 transition-transform duration-200 ease-out-soft",
        external
          ? "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          : "group-hover:translate-x-0.5",
      )}
    />
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        {...(opensNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
        {arrow}
        {opensNewTab ? <span className="sr-only"> (opens in a new tab)</span> : null}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      {arrow}
    </Link>
  );
}
