"use client";

import { useEffect } from "react";

/** How long one slide takes, and the curve it travels on. */
const DURATION = 780;
const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** How much wheel movement, or how far a swipe travels, counts as "go to the
 *  next slide". */
const THRESHOLD = 60;
/** A pause this long starts a fresh burst. A trackpad's momentum tail thins out
 *  into sparse little deltas, so each one lands in its own burst and never adds
 *  up to a move of its own. Wheel-only: a touch gesture is already one clean
 *  start-to-end move, nothing to burst-detect. */
const BURST_GAP = 120;
/** Quiet time after a slide lands, on top of the animation itself. */
const COOLDOWN = 200;

/** Every scroll gesture moves exactly one section, eased, whatever the input.
 *  Native snapping lands in a single frame, which a trackpad hides under its
 *  own momentum but a mouse wheel does not: it reads as a cut. A touch swipe
 *  has the same problem from the other side — its momentum is what fights
 *  mandatory scroll-snap on iPad, landing just short of the next section and
 *  only catching up once that momentum fully decays. Wheel, trackpad, and
 *  touch all go through the same animation here instead, so none of them
 *  touch the browser's own scrolling mid-gesture.
 *
 *  Touch has one extra rule Safari imposes: native scrolling has to be
 *  blocked from the very first touchmove of a gesture, not once a few pixels
 *  in confirm it's a scroll. Wait even one event and Safari has already
 *  committed the gesture to its own scroller; preventDefault after that does
 *  nothing. So touchmove here calls it unconditionally — this page has
 *  nothing horizontal for a gesture to be "sideways" for. */
export function SlideScroll() {
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!desktop.matches || reduced.matches) return;

    const root = document.documentElement;
    let raf = 0;
    let animating = false;
    let blockUntil = 0;
    /** Nothing is accepted until this moment: the animation plus a little quiet
     *  after it. Deliberately a deadline rather than a flag — a flag that waits
     *  to be cleared can get stuck behind a long momentum tail, and then the
     *  next gesture does nothing at all. */

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

    /** Shared by wheel and touch: given a direction, glide to the next section
     *  from wherever the page currently sits, unless one is already landing or
     *  the last one only just did. */
    const advance = (direction: 1 | -1, now: number) => {
      if (animating || now < blockUntil) return;
      const positions = tops();
      const y = window.scrollY;
      const current = positions.reduce(
        (best, top, i) =>
          Math.abs(top - y) < Math.abs(positions[best] - y) ? i : best,
        0,
      );
      const next = current + direction;
      if (next < 0 || next >= positions.length) return;
      blockUntil = now + DURATION + COOLDOWN;
      glide(positions[next]);
    };

    let accumulated = 0;
    let lastEvent = 0;

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

      const direction = accumulated > 0 ? 1 : -1;
      accumulated = 0;
      advance(direction, now);
    };

    /** A touch gesture is one clean start-to-end move, so it needs none of the
     *  wheel's burst accounting — just where it started and where it ended. */
    let touchStartY = 0;
    /** Guards against a stray touchmove/touchend with no matching start, e.g.
     *  a second finger joining mid-gesture. */
    let tracking = false;

    const onTouchStart = (event: TouchEvent) => {
      tracking = event.touches.length === 1 && !animating;
      if (tracking) touchStartY = event.touches[0].clientY;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!tracking || event.touches.length !== 1) return;
      // Must run on every touchmove from the first one — see the note above.
      event.preventDefault();
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (!tracking) return;
      tracking = false;

      const dy = touchStartY - event.changedTouches[0].clientY;
      if (Math.abs(dy) < THRESHOLD) return;
      advance(dy > 0 ? 1 : -1, performance.now());
    };

    const onTouchCancel = () => {
      tracking = false;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchCancel, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchCancel);
      root.style.removeProperty("scroll-snap-type");
    };
  }, []);

  return null;
}
