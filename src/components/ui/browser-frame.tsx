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
        "overflow-hidden rounded-xl border border-line bg-surface shadow-frame ring-1 ring-ink/[0.03]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="flex h-8 items-center gap-3 border-b border-line bg-[#fbfcfd] px-3 sm:h-9 sm:px-4"
      >
        <div className="flex shrink-0 gap-1.5">
          <span className="size-2.5 rounded-full bg-[#e9edf2] ring-1 ring-ink/10 ring-inset" />
          <span className="size-2.5 rounded-full bg-[#e9edf2] ring-1 ring-ink/10 ring-inset" />
          <span className="size-2.5 rounded-full bg-[#e9edf2] ring-1 ring-ink/10 ring-inset" />
        </div>
        <div className="mx-auto flex h-5 max-w-[60%] min-w-0 flex-1 items-center justify-center gap-1.5 rounded-md border border-line bg-surface px-3 text-[0.6875rem] text-muted">
          {url ? (
            <>
              {/* A small lock, as in a real address bar. */}
              <svg viewBox="0 0 12 12" className="size-2.5 shrink-0 text-cyan-strong" fill="currentColor">
                <path d="M3.5 5V3.75a2.5 2.5 0 0 1 5 0V5h.25c.41 0 .75.34.75.75v4.5c0 .41-.34.75-.75.75h-5.5a.75.75 0 0 1-.75-.75v-4.5c0-.41.34-.75.75-.75h.25Zm1-1.25V5h3V3.75a1.5 1.5 0 0 0-3 0Z" />
              </svg>
              <span className="truncate">{url}</span>
            </>
          ) : null}
        </div>
        {/* Balances the dots so the address bar stays centred. */}
        <div className="w-[2.625rem] shrink-0" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
