"use client";

import { useEffect } from "react";

/** How fast the smoothed copy of the scroll position catches up, per frame at
 *  60fps. Lower drags longer. */
const CATCH_UP = 0.085;
/** How far the content is allowed to hang back, in px. */
const MAX_LAG = 190;

/** Publishes scroll state to CSS, so the motion lives in the stylesheet instead
 *  of in inline styles:
 *    --scroll-y       how far the page has scrolled, in px
 *    --hero-progress  0 at the top, 1 once the hero is a full screen behind
 *    --lag-y          how far the page has run ahead of a smoothed copy of its
 *                     own scroll position — the amount the content hangs back
 *                     during a scroll and glides off when it stops
 *  The smoothing loop only runs while there is a difference left to settle, and
 *  none of this runs at all when the visitor asks for reduced motion. */
export function ScrollState() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    let smooth = window.scrollY;
    let raf = 0;
    let last = performance.now();

    const frame = () => {
      const now = performance.now();
      // Normalised to 60fps, so the feel does not change with refresh rate.
      const step = Math.min((now - last) / 16.667, 4);
      last = now;

      const y = window.scrollY;
      smooth += (y - smooth) * Math.min(CATCH_UP * step, 1);

      const lag = Math.max(-MAX_LAG, Math.min(MAX_LAG, y - smooth));
      root.style.setProperty("--scroll-y", `${y}px`);
      root.style.setProperty("--lag-y", `${lag}px`);
      root.style.setProperty(
        "--hero-progress",
        String(Math.min(1, y / Math.max(window.innerHeight, 1))),
      );

      // Keep going while anything is still settling, then stop the loop.
      if (Math.abs(y - smooth) > 0.2) {
        raf = requestAnimationFrame(frame);
      } else {
        smooth = y;
        root.style.setProperty("--lag-y", "0px");
        raf = 0;
      }
    };

    const onScroll = () => {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    frame();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      root.style.removeProperty("--scroll-y");
      root.style.removeProperty("--lag-y");
      root.style.removeProperty("--hero-progress");
    };
  }, []);

  return null;
}
