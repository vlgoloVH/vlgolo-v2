"use client";

import { useEffect } from "react";

/** How long one slide takes, and the curve it travels on. */
const DURATION = 780;
const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** How much wheel movement counts as "go to the next slide". */
const THRESHOLD = 60;
/** A pause this long starts a fresh burst. A trackpad's momentum tail thins out
 *  into sparse little deltas, so each one lands in its own burst and never adds
 *  up to a move of its own. */
const BURST_GAP = 120;
/** Quiet time after a slide lands, on top of the animation itself. */
const COOLDOWN = 200;

/** Every scroll gesture moves exactly one section, eased, whatever the input.
 *  Native snapping lands in a single frame, which a trackpad hides under its
 *  own momentum but a mouse wheel does not: it reads as a cut. Both go through
 *  the same animation here, so they feel the same. */
export function SlideScroll() {
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!desktop.matches || reduced.matches) return;

    const root = document.documentElement;
    let raf = 0;
    let animating = false;
    let accumulated = 0;
    let lastEvent = 0;
    /** Nothing is accepted until this moment: the animation plus a little quiet
     *  after it. Deliberately a deadline rather than a flag — a flag that waits
     *  to be cleared can get stuck behind a long momentum tail, and then the
     *  next gesture does nothing at all. */
    let blockUntil = 0;

    const tops = () =>
      [...document.querySelectorAll<HTMLElement>(".section-slide")]
        .map((el) => el.offsetTop)
        .sort((a, b) => a - b);

    const glide = (to: number) => {
      const from = window.scrollY;
      const distance = to - from;
      if (!distance) return;

      // The browser's own snapping would fight the animation, so it is off for
      // the duration and back on the moment we land.
      animating = true;
      root.style.scrollSnapType = "none";
      const start = performance.now();

      const step = () => {
        const t = Math.min((performance.now() - start) / DURATION, 1);
        window.scrollTo(0, Math.round(from + distance * ease(t)));
        if (t < 1) {
          raf = requestAnimationFrame(step);
        } else {
          raf = 0;
          animating = false;
          root.style.removeProperty("scroll-snap-type");
        }
      };

      raf = requestAnimationFrame(step);
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return; // pinch zoom
      event.preventDefault();

      const now = performance.now();
      if (now - lastEvent > BURST_GAP) accumulated = 0;
      lastEvent = now;

      if (animating || now < blockUntil) {
        accumulated = 0;
        return;
      }

      accumulated += event.deltaY;
      if (Math.abs(accumulated) < THRESHOLD) return;

      const positions = tops();
      const y = window.scrollY;
      const current = positions.reduce(
        (best, top, i) =>
          Math.abs(top - y) < Math.abs(positions[best] - y) ? i : best,
        0,
      );
      const next = current + (accumulated > 0 ? 1 : -1);
      accumulated = 0;
      if (next < 0 || next >= positions.length) return;
      blockUntil = now + DURATION + COOLDOWN;
      glide(positions[next]);
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", onWheel);
      root.style.removeProperty("scroll-snap-type");
    };
  }, []);

  return null;
}
