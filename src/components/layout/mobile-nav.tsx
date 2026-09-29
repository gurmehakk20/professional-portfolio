"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type SVGProps } from "react";
import { buttonStyles } from "@/components/ui/button-styles";
import type { CtaLink } from "@/content/types";
import { Wordmark } from "./logo";
import { isCurrentPath } from "./nav-links";

type MobileNavProps = {
  name: string;
  items: CtaLink[];
  cta: CtaLink;
  whatsappHref: string;
  emailHref: string;
};

/**
 * Full-screen menu for small screens, built on the native <dialog> element:
 * focus is kept inside while open, Escape closes it, and focus returns to
 * the menu button afterwards.
 */
export function MobileNav({ name, items, cta, whatsappHref, emailHref }: MobileNavProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  // The header lives in the root layout and never remounts, so close the
  // menu whenever the page changes (including browser back/forward).
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // Keep the native dialog in sync with state.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Close if the window grows into the desktop layout while the menu is open.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 48rem)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
        className="-mr-2 inline-flex size-11 items-center justify-center rounded-lg text-ink transition-colors duration-200 hover:bg-ink/5 md:hidden"
      >
        <MenuIcon />
        <span className="sr-only">Open menu</span>
      </button>

      <dialog
        id="mobile-menu"
        ref={dialogRef}
        aria-label="Menu"
        onClose={close}
        className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-canvas p-0 text-body backdrop:bg-transparent open:flex open:flex-col motion-safe:open:animate-menu-in"
      >
        <div className="flex h-(--header-height) shrink-0 items-center justify-between border-b border-line px-5 sm:px-8">
          <Link href="/" onNavigate={close} aria-label={`${name} — home`} className="rounded-sm">
            <Wordmark name={name} />
          </Link>
          <button
            type="button"
            onClick={close}
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-lg text-ink transition-colors duration-200 hover:bg-ink/5"
          >
            <CloseIcon />
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        <nav aria-label="Main" className="flex-1 overflow-y-auto px-5 py-2 sm:px-8">
          <ul>
            {items.map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  onNavigate={close}
                  aria-current={isCurrentPath(pathname, item.href) ? "page" : undefined}
                  className="flex items-center justify-between gap-4 py-4 font-display text-[1.375rem] font-semibold tracking-[-0.01em] text-ink aria-[current=page]:text-accent-strong"
                >
                  {item.label}
                  <ArrowIcon className="shrink-0 text-muted" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shrink-0 border-t border-line px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-8">
          <Link
            href={cta.href}
            onNavigate={close}
            className={buttonStyles({ size: "lg", className: "w-full" })}
          >
            {cta.label}
          </Link>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className={buttonStyles({ variant: "secondary", className: "w-full" })}
            >
              <WhatsAppIcon />
              WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a
              href={emailHref}
              onClick={close}
              className={buttonStyles({ variant: "secondary", className: "w-full" })}
            >
              <MailIcon />
              Email
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}

/* Small inline icons — kept local so the full icon registry isn't shipped to the browser. */

function SvgIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={20}
      height={20}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

function MenuIcon() {
  return (
    <SvgIcon width={22} height={22}>
      <path d="M4 8h16" />
      <path d="M4 16h16" />
    </SvgIcon>
  );
}

function CloseIcon() {
  return (
    <SvgIcon width={22} height={22}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </SvgIcon>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <SvgIcon className={className}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </SvgIcon>
  );
}

function MailIcon() {
  return (
    <SvgIcon width={18} height={18}>
      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
      <rect x="2" y="4" width="20" height="16" rx="2" />
    </SvgIcon>
  );
}

function WhatsAppIcon() {
  return (
    <SvgIcon width={18} height={18} fill="currentColor" stroke="none">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </SvgIcon>
  );
}
