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

    /** Only the hero reads these, so past the hero there is nothing left to
     *  update. Setting a custom property on <html> invalidates style for the
     *  whole document, and doing that on every frame of every scroll is exactly
     *  the sort of cost that shows up as stutter on a tablet. */
    let idle = false;

    const write = () => {
      raf = 0;
      const y = window.scrollY;
      const vh = Math.max(window.visualViewport?.height ?? window.innerHeight, 1);
      const past = y > vh * 1.2;
      if (past && idle) return;
      idle = past;

      root.style.setProperty("--scroll-y", `${y}px`);
      root.style.setProperty("--hero-progress", String(Math.min(1, y / vh)));
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
