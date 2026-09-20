"use client";

import { useEffect } from "react";

/** `100svh` is meant to be a fixed reference no matter what the browser chrome
 *  is doing, but iPad Safari does not reliably hold to that — the tab bar's
 *  own collapsed/expanded state can leak into the computed value, so a
 *  `.section-slide` ends up a different height than what's actually on
 *  screen, and a strip of the neighbouring section shows.
 *
 *  `visualViewport.height` is always the truth regardless of chrome state, so
 *  publishing it as `--app-vh` and having `.section-slide` key off that
 *  instead sidesteps the CSS unit's correctness entirely. Unconditional, not
 *  gated behind reduced motion: this is layout, not an animation. */
export function ViewportHeight() {
  useEffect(() => {
    const root = document.documentElement;
    const viewport = window.visualViewport;

    /** Every change is taken — the tab bar collapsing is exactly the case this
     *  has to follow — but never *while* the page is moving: re-laying out
     *  full-screen sections mid-gesture is felt as the whole page stuttering,
     *  and it moves the target a running glide is heading for. So the new
     *  height waits for the scroll to settle. */
    const SETTLE = 220;
    let current = 0;
    let idle = 0;

    const measure = () => Math.round(viewport?.height ?? window.innerHeight);

    /** The sections have just changed height, so whatever the scroll position
     *  was is now a few pixels off a section top — which is the strip this
     *  whole file exists to prevent. Re-seat it, instantly and only at rest. */
    const reseat = () => {
      const tops = [...document.querySelectorAll<HTMLElement>(".section-slide")]
        .map((el) => el.offsetTop)
        .sort((a, b) => a - b);
      if (!tops.length) return;

      const y = window.scrollY;
      const nearest = tops.reduce((best, top) =>
        Math.abs(top - y) < Math.abs(best - y) ? top : best,
      );
      const drift = Math.abs(nearest - y);
      // Only a nudge: if the visitor is parked between sections on purpose,
      // leave them there.
      if (drift > 1 && drift < current * 0.5) window.scrollTo(0, nearest);
    };

    const apply = () => {
      const height = measure();
      if (height === current) return;
      current = height;
      root.style.setProperty("--app-vh", `${height}px`);
      reseat();
    };

    /** Restart the quiet timer. Whatever the height is once the page has been
     *  still for SETTLE is the one that gets written. */
    const schedule = () => {
      window.clearTimeout(idle);
      idle = window.setTimeout(apply, SETTLE);
    };

    // The first measurement is not waiting for anything.
    current = measure();
    root.style.setProperty("--app-vh", `${current}px`);

    window.addEventListener("resize", schedule);
    window.addEventListener("orientationchange", schedule);
    window.addEventListener("scroll", schedule, { passive: true });
    viewport?.addEventListener("resize", schedule);
    viewport?.addEventListener("scroll", schedule);

    return () => {
      window.clearTimeout(idle);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("orientationchange", schedule);
      window.removeEventListener("scroll", schedule);
      viewport?.removeEventListener("resize", schedule);
      viewport?.removeEventListener("scroll", schedule);
      root.style.removeProperty("--app-vh");
    };
  }, []);

  return null;
}
