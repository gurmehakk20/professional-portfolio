"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type LivePreviewProps = {
  /** The live site to show. */
  src: string;
  /** e.g. "Live preview of Arka Dental website". */
  title: string;
};

/** The live site is laid out at this desktop size, then scaled to fit the frame. */
const VIEWPORT = { width: 1440, height: 900 };

/** Only on desktop-sized screens with a mouse, without reduced motion or data saving. */
const CAN_LOAD =
  "(min-width: 64rem) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

/**
 * Shows a project's live website over its screenshot, as a progressive
 * enhancement. Nothing loads until the preview is a quarter in view, and
 * never on phones, with reduced motion or with data saving on — the
 * screenshot underneath stays in place for all of those (and keeps the
 * layout fixed, so nothing shifts).
 *
 * The page is laid out at desktop size and scaled down to fit, so it looks
 * like the real site rather than a squeezed tablet layout. It's a picture,
 * not a second scrolling page: it can't be clicked, scrolled or focused
 * (`inert`), it's hidden from screen readers (the screenshot's alt text
 * describes it), and it's sandboxed so it can't open pop-ups or navigate
 * this page. It fades in only after the site has loaded and settled.
 */
export function LivePreview({ src, title }: LivePreviewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "loading" | "loaded" | "shown">("idle");
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element || !window.matchMedia(CAN_LOAD).matches) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    if (connection?.saveData) return;

    const resize = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / VIEWPORT.width);
    });
    resize.observe(element);

    const intersection = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setState((current) => (current === "idle" ? "loading" : current));
        intersection.disconnect();
      },
      { threshold: 0.25 },
    );
    intersection.observe(element);

    return () => {
      resize.disconnect();
      intersection.disconnect();
    };
  }, []);

  // Give the site a moment after loading for its fonts and opening animations.
  useEffect(() => {
    if (state !== "loaded") return;
    const timer = setTimeout(() => setState("shown"), 900);
    return () => clearTimeout(timer);
  }, [state]);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0">
      {state !== "idle" && scale > 0 ? (
        <iframe
          src={src}
          title={title}
          inert
          tabIndex={-1}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => setState("loaded")}
          className={cn(
            "absolute top-0 left-0 origin-top-left border-0 bg-surface transition-opacity duration-700 ease-out-soft",
            state === "shown" ? "opacity-100" : "opacity-0",
          )}
          style={{
            width: VIEWPORT.width,
            height: VIEWPORT.height,
            transform: `scale(${scale})`,
          }}
        />
      ) : null}
    </div>
  );
}
