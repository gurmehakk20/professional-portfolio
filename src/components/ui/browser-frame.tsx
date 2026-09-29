import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BrowserFrameProps = {
  /** Text shown in the address bar, e.g. "arkadental.com". Omit for a plain bar. */
  url?: string;
  className?: string;
  children: ReactNode;
};

/**
 * A flat, minimal browser window used to present website screenshots.
 * The toolbar is decorative and hidden from assistive technology.
 */
export function BrowserFrame({ url, className, children }: BrowserFrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-line bg-surface shadow-frame",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="flex h-8 items-center gap-3 border-b border-line bg-canvas px-3 sm:h-9 sm:px-4"
      >
        <div className="flex shrink-0 gap-1.5">
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
        </div>
        {url ? (
          <div className="mx-auto h-5 max-w-[60%] min-w-0 flex-1 truncate rounded-md border border-line bg-surface px-3 text-center text-[0.6875rem] leading-[1.125rem] text-muted">
            {url}
          </div>
        ) : null}
        {/* Balances the dots so the address bar stays centred. */}
        <div className="w-[2.625rem] shrink-0" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
