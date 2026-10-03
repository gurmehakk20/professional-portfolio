"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CtaLink } from "@/content/types";

/** True when `href` is the page being viewed (or a page inside it, e.g. /work/arka-dental). */
export function isCurrentPath(pathname: string, href: string): boolean {
  if (href.includes("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Desktop navigation links with the current page highlighted. */
export function NavLinks({ items }: { items: CtaLink[] }) {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-0.5 lg:gap-1">
      {items.map((item) => {
        const current = isCurrentPath(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={current ? "page" : undefined}
              className="relative inline-flex h-11 items-center rounded-full px-3 lg:h-10 text-[0.9375rem] font-medium text-body transition-colors duration-200 hover:bg-ink/[0.045] hover:text-ink lg:px-3.5 aria-[current=page]:text-ink aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-3.5 aria-[current=page]:after:bottom-1 aria-[current=page]:after:h-0.5 aria-[current=page]:after:rounded-full aria-[current=page]:after:bg-linear-to-r aria-[current=page]:after:from-accent aria-[current=page]:after:to-accent-bright"
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
