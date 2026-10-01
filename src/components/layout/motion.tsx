"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * The scripted half of the motion layer (the rest is CSS in globals.css).
 * Renders nothing.
 *
 * Reveals: blocks marked `data-reveal` that are still below the fold when
 * the page loads are hidden, then fade up as they scroll into view; anything
 * already on screen is left alone. One IntersectionObserver per page, and
 * each block is unobserved once shown. Skipped entirely with reduced motion.
 *
 * Smooth scrolling: switched on once the page has loaded, so in-page links
 * glide but opening a link like /#faq still jumps straight to the section.
 *
 * Header: in browsers without CSS scroll-driven animations, marks the page
 * while it's scrolled to the very top so the header can stay transparent there.
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          element.dataset.revealState = "revealed";
          observer.unobserve(element);
        }
      },
      // Start once the top of a block is a little way into the window.
      { rootMargin: "0px 0px -10% 0px" },
    );

    const fold = window.innerHeight * 0.92;
    for (const element of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
      const state = element.dataset.revealState;
      if (state === "revealed" || state === "skipped") continue;
      if (element.getBoundingClientRect().top < fold) {
        // Already in view (or scrolled past): never hide what someone can see.
        element.dataset.revealState = state === "pending" ? "revealed" : "skipped";
      } else {
        element.dataset.revealState = "pending";
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    const enable = () => {
      frame = requestAnimationFrame(() => root.setAttribute("data-smooth-scroll", ""));
    };
    if (document.readyState === "complete") enable();
    else window.addEventListener("load", enable, { once: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", enable);
      root.removeAttribute("data-smooth-scroll");
    };
  }, []);

  useEffect(() => {
    if (CSS.supports("animation-timeline: scroll()")) return;

    const root = document.documentElement;
    let atTop: boolean | undefined;
    const update = () => {
      const next = window.scrollY < 8;
      if (next === atTop) return;
      atTop = next;
      root.toggleAttribute("data-at-top", next);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      root.removeAttribute("data-at-top");
    };
  }, []);

  return null;
}
