"use client";

import { useEffect } from "react";

/**
 * Next.js scrolls to links like "/#about" but leaves keyboard focus on the
 * link itself. This moves focus to the target section as well, so keyboard
 * and screen-reader users carry on from the section they chose. It covers
 * every in-page link on the site (header, mobile menu, footer, buttons).
 * Renders nothing.
 */
export function HashLinkFocus() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(link instanceof HTMLAnchorElement) || link.target === "_blank") return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || !url.hash) return;
      const id = decodeURIComponent(url.hash.slice(1));

      // Wait for the destination page to render (it may be slow on a poor
      // connection) and for the mobile menu to close — closing a <dialog>
      // returns focus to the menu button.
      const giveUpAt = performance.now() + 10_000;
      const moveFocus = () => {
        const onPage = window.location.pathname === url.pathname;
        const target = onPage ? document.getElementById(id) : null;
        if (target && !document.querySelector("dialog[open]")) {
          if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
        } else if (performance.now() < giveUpAt) {
          requestAnimationFrame(moveFocus);
        }
      };
      requestAnimationFrame(moveFocus);
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
