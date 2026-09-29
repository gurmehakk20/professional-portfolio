"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { buttonStyles } from "@/components/ui/button-styles";
import { MailIcon, SvgIcon, WhatsAppIcon } from "@/components/ui/inline-icons";
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
                  className="flex items-center justify-between gap-4 py-4 font-display text-[1.375rem] font-semibold tracking-[-0.01em] text-ink aria-[current=page]:text-accent-strong aria-[current=page]:underline aria-[current=page]:decoration-accent aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8"
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
              className={buttonStyles({ variant: "secondary", className: "w-full max-xs:px-3" })}
            >
              <WhatsAppIcon />
              WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a
              href={emailHref}
              onClick={close}
              className={buttonStyles({ variant: "secondary", className: "w-full max-xs:px-3" })}
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

/* Menu-only icons. The shared ones (mail, WhatsApp) come from inline-icons. */

function MenuIcon() {
  return (
    <SvgIcon size={22}>
      <path d="M4 8h16" />
      <path d="M4 16h16" />
    </SvgIcon>
  );
}

function CloseIcon() {
  return (
    <SvgIcon size={22}>
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
