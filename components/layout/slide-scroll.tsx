"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import Snap from "lenis/snap";

/** How much accumulated wheel movement, or how far a swipe travels, counts
 *  as "go to the next slide". */
const THRESHOLD = 50;
/** A pause at least this long, with no wheel events at all, means a gesture
 *  has genuinely stopped — both before a slide triggers (start accumulating
 *  fresh instead of adding to whatever came before) and after one (safe to
 *  arm the next one). A real gap, not a guess from how small the deltas
 *  look: a decaying trackpad tail can still be a real, unbroken stream of
 *  events well under this apart, which is exactly what a magnitude-based
 *  guess got wrong in the hand-rolled version this file replaces. */
const WHEEL_GAP = 420;
/** A burst has this long, from its first event, to cross THRESHOLD — a
 *  genuine flick gets there in well under this. Without a cap, a long,
 *  slowly-decaying tail can still cross THRESHOLD purely by dribbling in
 *  enough tiny deltas over enough time, even with no single gap ever
 *  reaching WHEEL_GAP — length of time standing in for the pause that
 *  never quite arrives. */
const BURST_WINDOW = 260;
/** How long one slide's glide takes (seconds, Lenis's own unit). */
const SLIDE_DURATION = 0.8;
/** Backstop only, in case a wheel stream somehow never produces a real
 *  WHEEL_GAP pause after a slide triggers — somewhat generous, since being
 *  wrong in the "still locked" direction just delays the next slide by a
 *  moment, where being wrong the other way re-fires one immediately on
 *  leftover momentum. In practice WHEEL_GAP is what clears the lock almost
 *  every time; this rarely matters. */
const LOCK_BACKSTOP = 2500;

/** Every gesture moves exactly one section, immediately, the way a deck of
 *  slides does — not a continuous scroll that later corrects itself onto a
 *  section boundary, which is what lenis/snap's own automatic mode does
 *  (it always waits for input to fully stop before deciding). Snap is kept
 *  around anyway for two things it does well: tracking each section's
 *  position and index, and running the actual glide through Lenis's tested
 *  tween — `snap.stop()` below just turns off its automatic triggering, so
 *  `next()`/`previous()` only ever fire when this file calls them.
 *
 *  Touch is one clean start-to-end gesture already — no accumulation to
 *  reset mid-swipe — so it measures total distance on touchend rather than
 *  running through the wheel's threshold-and-gap accounting. */
export function SlideScroll() {
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!desktop.matches || reduced.matches) return;

    // Lenis is only ever driven programmatically here (via snap.goTo, below),
    // never by its own input handling — `prevent: () => true` keeps it from
    // touching wheel/touch events at all. Without this, Lenis's own wheel
    // listener still sees every event this file's own listener doesn't stop,
    // and calls `animate.stop()` on each one — which was cutting off a slide
    // that this file had just started, mid-glide, before its `onComplete`
    // could ever fire, leaving `locked` stuck true forever.
    const lenis = new Lenis({ prevent: () => true });

    const sections = [...document.querySelectorAll<HTMLElement>(".section-slide")].sort(
      (a, b) => a.offsetTop - b.offsetTop,
    );

    /** True from the moment a slide is triggered until whichever comes
     *  first, once it's actually finished animating: a real WHEEL_GAP pause
     *  with no wheel events at all (checked in onWheel, so it can clear the
     *  moment a wheel gesture's momentum genuinely stops), or the
     *  LOCK_BACKSTOP deadline — the only signal touch gets, since a single
     *  touchend leaves no ongoing stream to watch for a gap in.
     *
     *  Gap-checking only starts once `settled` — set from onSnapComplete,
     *  a real "this slide's own animation is done" signal from Lenis —
     *  because measuring "idle" against events still arriving *during* that
     *  animation is unreliable: `goToIndex` and `snap.goTo` below take some
     *  real synchronous time to run, which delays the browser from even
     *  starting to process the next queued wheel event, and that delay reads
     *  identically to genuine silence. Before `settled`, nothing about
     *  event timing is trustworthy, so nothing here tries to read it. */
    let locked = false;
    let settled = false;
    let lockDeadline = 0;

    const snap = new Snap(lenis, {
      type: "mandatory",
      duration: SLIDE_DURATION,
      onSnapComplete: () => {
        settled = true;
        lockDeadline = performance.now() + LOCK_BACKSTOP;
        window.setTimeout(() => {
          locked = false;
        }, LOCK_BACKSTOP);
      },
    });
    snap.stop();
    const removeSnapElements = snap.addElements(sections, { align: "start" });

    /** Which section actually fills the screen right now, read straight off
     *  real scroll position rather than trusting Snap's own `currentSnapIndex`
     *  bookkeeping — that only ever moves through this file's own `goTo`
     *  calls, so anything else that can move the page (a same-page `#works`
     *  link, browser scroll restoration) would leave it stale and pointed at
     *  the wrong section. */
    const nearestSectionIndex = (): number =>
      sections.reduce(
        (best, section, i) =>
          Math.abs(section.offsetTop - window.scrollY) <
          Math.abs(sections[best].offsetTop - window.scrollY)
            ? i
            : best,
        0,
      );
    snap.currentSnapIndex = nearestSectionIndex();

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const goToIndex = (index: number) => {
      const clamped = Math.max(0, Math.min(index, sections.length - 1));
      if (clamped === nearestSectionIndex()) return;
      locked = true;
      settled = false;
      snap.goTo(clamped);
    };

    /** A section can carry one horizontal case track (see Works). Wheel
     *  input over whichever section currently fills the viewport pans that
     *  track sideways instead of the page — read fresh off geometry on
     *  every event rather than tracked as state. Once the track runs out of
     *  room, the event falls through to the normal section-to-section
     *  handling below exactly like any other wheel input. */
    const activeTrack = (): HTMLElement | null => {
      const mid = window.innerHeight / 2;
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= mid && rect.bottom >= mid) {
          return section.querySelector<HTMLElement>("[data-h-track]");
        }
      }
      return null;
    };

    let accumulated = 0;
    let lastEvent = 0;
    let burstStart = 0;

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return; // pinch zoom

      const now = performance.now();
      const idle = now - lastEvent;
      lastEvent = now;

      if (locked) {
        event.preventDefault();
        // A real pause this long, once the slide has actually finished
        // animating, means whatever gesture triggered it has genuinely
        // stopped, momentum tail and all — safe to arm the next one
        // immediately rather than waiting out LOCK_BACKSTOP, which exists
        // only for the rare stream that somehow never produces that pause.
        if (!settled || (idle < WHEEL_GAP && now < lockDeadline)) return;
        locked = false;
        accumulated = 0;
      }

      const track = activeTrack();
      if (track) {
        const max = track.scrollWidth - track.clientWidth;
        const forward = event.deltaY > 0;
        const hasRoom = forward ? track.scrollLeft < max - 1 : track.scrollLeft > 0;
        if (hasRoom) {
          event.preventDefault();
          track.scrollLeft = Math.min(Math.max(track.scrollLeft + event.deltaY, 0), max);
          accumulated = 0;
          return;
        }
      }

      event.preventDefault();
      if (idle > WHEEL_GAP || now - burstStart > BURST_WINDOW) {
        accumulated = 0;
        burstStart = now;
      }

      accumulated += event.deltaY;
      if (Math.abs(accumulated) < THRESHOLD) return;

      const direction = accumulated > 0 ? 1 : -1;
      accumulated = 0;
      goToIndex(nearestSectionIndex() + direction);
    };
    window.addEventListener("wheel", onWheel, { passive: false });

    /** A touch gesture is one clean start-to-end move: just where it started
     *  and where it ended, same as the wheel path but without the burst
     *  accounting a continuous stream of wheel events needs. */
    let touchStartY = 0;
    let touchLastY = 0;
    let tracking = false;

    const onTouchStart = (event: TouchEvent) => {
      tracking = event.touches.length === 1 && !locked;
      if (tracking) touchStartY = touchLastY = event.touches[0].clientY;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!tracking || event.touches.length !== 1) return;
      event.preventDefault();

      const y = event.touches[0].clientY;
      const dy = touchLastY - y;
      touchLastY = y;

      const track = activeTrack();
      if (!track) return;
      const max = track.scrollWidth - track.clientWidth;
      track.scrollLeft = Math.min(Math.max(track.scrollLeft + dy, 0), max);
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (!tracking) return;
      tracking = false;

      const dy = touchStartY - event.changedTouches[0].clientY;
      if (Math.abs(dy) < THRESHOLD) return;

      const track = activeTrack();
      if (track) {
        const max = track.scrollWidth - track.clientWidth;
        if (dy > 0 && track.scrollLeft < max - 1) return;
        if (dy < 0 && track.scrollLeft > 0) return;
      }

      goToIndex(nearestSectionIndex() + (dy > 0 ? 1 : -1));
    };

    const onTouchCancel = () => {
      tracking = false;
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchCancel, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchCancel);
      cancelAnimationFrame(raf);
      removeSnapElements();
      snap.destroy();
      lenis.destroy();
    };
  }, []);

  return null;
}
