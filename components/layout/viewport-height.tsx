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

    /** Safari's address bar collapsing and expanding changes visualViewport by
     *  a few dozen pixels *while a scroll is running*. Writing that straight
     *  through re-lays out every full-screen section mid-gesture, which is felt
     *  as the whole page stuttering. Only a real change — a rotation, a window
     *  resize, a split view — moves it. */
    const SIGNIFICANT = 90;
    let current = 0;

    const write = () => {
      const height = Math.round(viewport?.height ?? window.innerHeight);
      if (Math.abs(height - current) < SIGNIFICANT) return;
      current = height;
      root.style.setProperty("--app-vh", `${height}px`);
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
