"use client";

import { useEffect } from "react";

/** How long one slide takes, and the curve it travels on. */
const DURATION = 720;
const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** How much wheel movement counts as "go to the next slide". */
const THRESHOLD = 60;
/** Silence this long means the visitor has actually let go. A trackpad's
 *  momentum keeps firing well under this for seconds after the fingers lift, so
 *  silence alone cannot be the only way a gesture ends — see PUSH below. */
const BURST_GAP = 200;
/** Momentum only ever decays. So a delta that jumps back up, by this much over
 *  the quietest the tail has got and above the floor, is not the tail any more:
 *  it is fingers back on the trackpad. Two in a row are required, because event
 *  coalescing can hand back one artificially large sample mid-tail. */
const PUSH_RATIO = 3;
const PUSH_FLOOR = 14;
const PUSH_STREAK = 2;
/** Quiet time after a slide lands, on top of the animation itself. */
const COOLDOWN = 180;

/** Section-to-section scrolling for anything that sends wheel events: mouse
 *  wheel, trackpad, and an iPad trackpad alike.
 *
 *  Native CSS snap alone cannot do this. A mouse wheel notch is about 100px,
 *  a section is a whole screen, so the resting point after a notch is still
 *  inside the current section and the browser correctly snaps straight back to
 *  it: the page does not move at all, however long you spin the wheel. That is
 *  the "wheel does nothing" bug. So the gesture is read here and answered with
 *  one eased slide, and the browser's own snapping is switched off for the
 *  duration so the two never pull at the same time.
 *
 *  Touch is left alone entirely: a finger swipe scrolls natively and the CSS
 *  `proximity` snap settles it onto a section, which is exactly right and does
 *  not fight the gesture.
 *
 *  While the Works section fills the screen, the same wheel gesture pans its
 *  horizontal case track instead — plainly, as far as the gesture goes, with
 *  nothing pulling the cases into place — and only moves on to the next section
 *  once the track has run out of room. */
export function SlideScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;

    /** `scroll-behavior: smooth` animates every scroll the page makes,
     *  including the one below, so the browser's animation and this one pull at
     *  the same position and the page crawls or stalls outright. This module
     *  owns section scrolling, so it owns that too. */
    const behaviour = root.style.scrollBehavior;
    root.style.setProperty("scroll-behavior", "auto", "important");

    let raf = 0;
    let animating = false;
    let accumulated = 0;
    let lastEvent = 0;
    /** True while the gesture that is currently running arrived during a slide
     *  or its cooldown. It stays true for that whole gesture, however long its
     *  momentum tail keeps feeding events — which is the point: a tail is not a
     *  new instruction, so it must not be able to trigger a second slide just
     *  because the cooldown happened to expire while it was still running. */
    let tail = false;
    /** The quietest the current tail has got, and how many samples in a row have
     *  come back above it. Both reset whenever a tail starts. */
    let tailFloor = Infinity;
    let pushes = 0;
    /** Nothing is accepted until this moment: the animation plus a little quiet
     *  after it. A deadline rather than a flag, because a flag waiting to be
     *  cleared can get stuck behind a long momentum tail and then the next
     *  gesture does nothing at all. */
    let blockUntil = 0;

    const sections = () =>
      [...document.querySelectorAll<HTMLElement>(".section-slide")].sort(
        (a, b) => a.offsetTop - b.offsetTop,
      );

    /** Whichever section currently fills the viewport, read fresh off real
     *  geometry on every event rather than tracked as state. */
    const activeTrack = (): HTMLElement | null => {
      const mid = window.innerHeight / 2;
      for (const section of sections()) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= mid && rect.bottom >= mid) {
          return section.querySelector<HTMLElement>("[data-h-track]");
        }
      }
      return null;
    };

    /** One eased move down to a section. */
    const glide = (to: number) => {
      const from = window.scrollY;
      const distance = to - from;
      if (!distance) return;

      // The browser's own snapping would fight the animation, so it is off for
      // the duration and back on the moment we land.
      animating = true;
      root.style.setProperty("scroll-snap-type", "none", "important");
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

      const now = performance.now();

      // A real pause, and only a real pause, ends a gesture.
      if (now - lastEvent > BURST_GAP) {
        accumulated = 0;
        tail = false;
      }
      lastEvent = now;

      // Anything arriving during a slide or its cooldown is that slide's own
      // momentum, so the rest of it is marked as tail here and stays marked
      // until the input actually goes quiet. Without this the tail simply waits
      // out the cooldown and then fires a second slide on its own — which is
      // what a trackpad does, because its momentum keeps events coming for
      // seconds with no gap long enough to look like a pause.
      if (animating || now < blockUntil) {
        if (!tail) {
          tail = true;
          tailFloor = Infinity;
          pushes = 0;
        }
        accumulated = 0;
        event.preventDefault();
        return;
      }

      if (tail) {
        const size = Math.abs(event.deltaY);
        if (size > Math.max(tailFloor * PUSH_RATIO, PUSH_FLOOR)) {
          pushes += 1;
        } else {
          pushes = 0;
          tailFloor = Math.min(tailFloor, size);
        }

        if (pushes < PUSH_STREAK) {
          accumulated = 0;
          event.preventDefault();
          return;
        }

        // Fingers are back on the trackpad: this is a new gesture, and it starts
        // here rather than waiting for the old one's momentum to finish dying.
        tail = false;
        pushes = 0;
        tailFloor = Infinity;
        accumulated = 0;
      }

      // The horizontal track gets first refusal, and unlike the sections it
      // scrolls plainly: the wheel moves the cases as far as the gesture moved,
      // with nothing pulling them into place afterwards. Only once the track is
      // out of room does the gesture become a section move.
      const track = activeTrack();
      if (track) {
        const max = track.scrollWidth - track.clientWidth;
        const hasRoom =
          event.deltaY > 0 ? track.scrollLeft < max - 1 : track.scrollLeft > 0;
        if (hasRoom) {
          event.preventDefault();
          accumulated = 0;
          track.scrollLeft = Math.min(
            Math.max(track.scrollLeft + event.deltaY, 0),
            max,
          );
          return;
        }
      }

      accumulated += event.deltaY;
      if (Math.abs(accumulated) < THRESHOLD) {
        event.preventDefault();
        return;
      }

      const forward = accumulated > 0;

      const tops = sections().map((el) => el.offsetTop);
      const y = window.scrollY;
      const current = tops.reduce(
        (best, top, i) => (Math.abs(top - y) < Math.abs(tops[best] - y) ? i : best),
        0,
      );
      const next = current + (forward ? 1 : -1);
      accumulated = 0;

      // At either end, let the page scroll itself: rubber-banding at the top
      // and bottom is the browser's business, not ours.
      if (next < 0 || next >= tops.length) return;

      event.preventDefault();
      blockUntil = now + DURATION + COOLDOWN;
      glide(tops[next]);
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", onWheel);
      root.style.removeProperty("scroll-snap-type");
      root.style.scrollBehavior = behaviour;
    };
  }, []);

  return null;
}
