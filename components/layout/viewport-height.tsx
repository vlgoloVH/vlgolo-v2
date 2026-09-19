"use client";

import { useEffect } from "react";

/** `100svh` is meant to be a fixed reference no matter what the browser chrome
 *  is doing, but iPad Safari does not reliably hold to that — the address
 *  bar's own collapsed/expanded state can leak into the computed value, so a
 *  `.section-slide` ends up a different height than what's actually on
 *  screen. SlideScroll measures its glide targets off that height, so the
 *  mismatch shows up as landing short of the next section with a strip of
 *  the previous one still visible.
 *
 *  `visualViewport.height` is always the truth regardless of chrome state, so
 *  publishing it as `--app-vh` and having `.section-slide` key off that
 *  instead sidesteps the CSS unit's correctness entirely. Unconditional, not
 *  gated behind reduced motion: this is layout, not an animation. */
export function ViewportHeight() {
  useEffect(() => {
    const root = document.documentElement;
    const viewport = window.visualViewport;

    const write = () => {
      const height = viewport?.height ?? window.innerHeight;
      root.style.setProperty("--app-vh", `${Math.round(height)}px`);
    };

    write();
    window.addEventListener("resize", write);
    viewport?.addEventListener("resize", write);

    return () => {
      window.removeEventListener("resize", write);
      viewport?.removeEventListener("resize", write);
      root.style.removeProperty("--app-vh");
    };
  }, []);

  return null;
}
