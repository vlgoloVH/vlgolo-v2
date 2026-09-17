"use client";

import { useEffect } from "react";

/** Publishes scroll state to CSS, so the motion lives in the stylesheet instead
 *  of in inline styles:
 *    --scroll-y       how far the page has scrolled, in px
 *    --hero-progress  0 at the top, 1 once the hero is a full screen behind
 *  One rAF per scroll burst, and nothing at all when the visitor asks for
 *  reduced motion. */
export function ScrollState() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    let raf = 0;

    const write = () => {
      raf = 0;
      const y = window.scrollY;
      root.style.setProperty("--scroll-y", `${y}px`);
      root.style.setProperty(
        "--hero-progress",
        String(Math.min(1, y / Math.max(window.innerHeight, 1))),
      );
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(write);
    };

    write();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      root.style.removeProperty("--scroll-y");
      root.style.removeProperty("--hero-progress");
    };
  }, []);

  return null;
}
