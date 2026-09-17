"use client";

import { useEffect } from "react";

/** How long one slide takes, and the curve it travels on. */
const DURATION = 780;
const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** A mouse wheel notch is a single large jump, so the browser lands on the next
 *  snap point instantly and it feels like a cut. A trackpad sends a stream of
 *  small deltas with momentum and already feels right, so it is left alone.
 *  The two are told apart by the first event of the gesture: a notch opens with
 *  a big delta, a swipe opens with a few pixels. */
const WHEEL_NOTCH = 40;
/** A gap this long means the next event starts a new gesture. */
const GESTURE_GAP = 140;

/** Takes over the mouse wheel on desktop: one notch moves exactly one section,
 *  eased, instead of snapping there in a single frame. */
export function SlideScroll() {
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!desktop.matches || reduced.matches) return;

    const root = document.documentElement;
    let raf = 0;
    let animating = false;

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

    let lastEvent = 0;
    let gestureIsWheel = false;

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return; // pinch zoom

      const now = performance.now();
      if (now - lastEvent > GESTURE_GAP) {
        gestureIsWheel = Math.abs(event.deltaY) >= WHEEL_NOTCH;
      }
      lastEvent = now;

      if (!gestureIsWheel) return; // trackpad: the browser does it better
      event.preventDefault();
      if (animating) return;

      const positions = tops();
      const y = window.scrollY;
      const current = positions.reduce(
        (best, top, i) =>
          Math.abs(top - y) < Math.abs(positions[best] - y) ? i : best,
        0,
      );
      const next = current + (event.deltaY > 0 ? 1 : -1);
      if (next < 0 || next >= positions.length) return;
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
