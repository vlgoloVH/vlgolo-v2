"use client";

import { useEffect } from "react";

/** How long one slide takes, and the curve it travels on. */
const DURATION = 720;
const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** How much wheel movement counts as "go to the next slide". */
const THRESHOLD = 60;
/** A pause this long starts a fresh burst, so a trackpad's momentum tail lands
 *  in bursts of its own and never adds up to a move. */
const BURST_GAP = 120;
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
 *  horizontal case track instead, and only moves on to the next section once
 *  the track has run out of room. */
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

    /** One eased move, either the page down to a section or the case track
     *  sideways to the next case. Both are the same gesture to the visitor, so
     *  they are the same animation here. */
    const glide = (to: number, track?: HTMLElement) => {
      const from = track ? track.scrollLeft : window.scrollY;
      const distance = to - from;
      if (!distance) return;

      // The browser's own snapping would fight the animation, so it is off for
      // the duration and back on the moment we land.
      animating = true;
      root.style.setProperty("scroll-snap-type", "none", "important");
      const start = performance.now();

      const step = () => {
        const t = Math.min((performance.now() - start) / DURATION, 1);
        const at = Math.round(from + distance * ease(t));
        if (track) {
          track.scrollLeft = at;
        } else {
          window.scrollTo(0, at);
        }
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
      if (now - lastEvent > BURST_GAP) accumulated = 0;
      lastEvent = now;

      if (animating || now < blockUntil) {
        event.preventDefault();
        accumulated = 0;
        return;
      }

      accumulated += event.deltaY;
      if (Math.abs(accumulated) < THRESHOLD) {
        event.preventDefault();
        return;
      }

      const forward = accumulated > 0;

      // The horizontal track gets first refusal: while it still has room, the
      // gesture moves the cases along rather than leaving the section. One
      // gesture, one case, same as one gesture, one section.
      const track = activeTrack();
      if (track) {
        const step = track.clientWidth || 1;
        const max = track.scrollWidth - track.clientWidth;
        const hasRoom = forward ? track.scrollLeft < max - 1 : track.scrollLeft > 0;
        if (hasRoom) {
          const index = Math.round(track.scrollLeft / step) + (forward ? 1 : -1);
          const target = Math.min(Math.max(index * step, 0), max);
          accumulated = 0;
          event.preventDefault();
          blockUntil = now + DURATION + COOLDOWN;
          glide(target, track);
          return;
        }
      }

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
