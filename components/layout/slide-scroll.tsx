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
/** A delta this small means a flick's momentum has faded to nothing, whether
 *  or not the events themselves ever stop long enough to hit BURST_GAP —
 *  some trackpads (iPad's included) keep feeding tiny deltas with no real
 *  gap for well over a second. This is what actually ends a consumed burst;
 *  a fixed timer can't, since how long momentum takes to fade varies with
 *  how hard the flick was — too short and the tail's last, still-sizeable
 *  deltas re-accumulate into an unwanted second advance, too long and a
 *  genuine next gesture finds the lock still held. */
const MOMENTUM_FADE = 3;
/** Backstop for the rare case where neither a pause nor a faded delta ever
 *  arrives — bounds how long a consumed burst can hold the lock at all, so
 *  it can never get stuck open-ended. */
const MOMENTUM_TAIL = 2000;

/** Every scroll gesture moves exactly one section, eased, whatever the input.
 *  This is the only thing that moves the page between sections — there's no
 *  native `scroll-snap-type` in globals.css backing it up, deliberately: on
 *  iOS a touch gesture's own momentum fights mandatory snap, landing short of
 *  the next section and only catching up once that momentum fully decays.
 *  With no native snap left to fight, that can't happen; wheel, trackpad, and
 *  touch all just go through this same animation instead.
 *
 *  Touch has one rule Safari imposes: native scrolling has to be blocked from
 *  the very first touchmove of a gesture, not once a few pixels in confirm
 *  it's a scroll. Wait even one event and Safari has already committed the
 *  gesture to its own scroller; preventDefault after that does nothing. So
 *  touchmove here calls it unconditionally — this page has nothing horizontal
 *  for a gesture to be "sideways" for. */
export function SlideScroll() {
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!desktop.matches || reduced.matches) return;

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

    /** Index of whichever position sits closest to y. */
    const nearestIndex = (positions: number[], y: number) =>
      positions.reduce(
        (best, top, i) =>
          Math.abs(top - y) < Math.abs(positions[best] - y) ? i : best,
        0,
      );

    /** The section a gesture would currently land on or leave from — same
     *  "nearest" logic as the vertical advance, just resolved to its element. */
    const activeSection = (): HTMLElement | undefined => {
      const sections = [...document.querySelectorAll<HTMLElement>(".section-slide")].sort(
        (a, b) => a.offsetTop - b.offsetTop,
      );
      return sections[nearestIndex(sections.map((el) => el.offsetTop), window.scrollY)];
    };

    /** A section can carry one horizontal case track (see Works). Its own
     *  scrollLeft is the single source of truth for how far through it the
     *  visitor is — nothing here duplicates that as separate state. */
    const activeTrack = () =>
      activeSection()?.querySelector<HTMLElement>("[data-h-track]") ?? null;

    /** Feeds a vertical gesture's delta into the track's horizontal scroll
     *  instead, as long as the gesture's direction still has room to run
     *  there. Returns false once the track is exhausted in that direction, so
     *  the caller falls through to the normal section-to-section advance. */
    const tryHorizontal = (track: HTMLElement, dy: number) => {
      const max = track.scrollWidth - track.clientWidth;
      if (dy > 0 && track.scrollLeft >= max - 1) return false;
      if (dy < 0 && track.scrollLeft <= 0) return false;
      track.scrollLeft = Math.min(Math.max(track.scrollLeft + dy, 0), max);
      return true;
    };

    /** iPad's Safari can still be folding its toolbar in or out as a glide
     *  lands, and a `.section-slide`'s `svh` height does not always keep pace
     *  with that — the page can settle a few pixels short of where the
     *  section it just glided to actually starts. One frame after the glide
     *  ends, this re-measures from scratch and corrects the drift instantly,
     *  no second animation. */
    const settle = () => {
      requestAnimationFrame(() => {
        const positions = tops();
        const y = window.scrollY;
        const target = positions[nearestIndex(positions, y)];
        if (target !== undefined && target !== y) window.scrollTo(0, target);
      });
    };

    const glide = (to: number) => {
      const from = window.scrollY;
      const distance = to - from;
      if (!distance) return;

      animating = true;
      const start = performance.now();

      const step = () => {
        const t = Math.min((performance.now() - start) / DURATION, 1);
        window.scrollTo(0, Math.round(from + distance * ease(t)));
        if (t < 1) {
          raf = requestAnimationFrame(step);
        } else {
          raf = 0;
          animating = false;
          settle();
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
      const current = nearestIndex(positions, y);
      const next = current + direction;
      if (next < 0 || next >= positions.length) return;
      blockUntil = now + DURATION + COOLDOWN;
      glide(positions[next]);
    };

    let accumulated = 0;
    let lastEvent = 0;
    /** Once a burst has advanced a section, the rest of its momentum tail is
     *  spent — a flick moves exactly one section, however long the trackpad
     *  keeps feeding events after `blockUntil` expires. Cleared as soon as
     *  the tail's own deltas fade out (see MOMENTUM_FADE), or by a genuine
     *  pause, or — failing both — once `consumedUntil` runs out. */
    let burstConsumed = false;
    let consumedUntil = 0;

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return; // pinch zoom
      event.preventDefault();

      const now = performance.now();
      if (now - lastEvent > BURST_GAP) {
        accumulated = 0;
        burstConsumed = false;
      }
      lastEvent = now;

      if (burstConsumed) {
        if (Math.abs(event.deltaY) > MOMENTUM_FADE && now < consumedUntil) return;
        accumulated = 0;
        burstConsumed = false;
      }

      if (animating || now < blockUntil) {
        accumulated = 0;
        return;
      }

      const track = activeTrack();
      if (track && tryHorizontal(track, event.deltaY)) {
        accumulated = 0;
        return;
      }

      accumulated += event.deltaY;
      if (Math.abs(accumulated) < THRESHOLD) return;

      const direction = accumulated > 0 ? 1 : -1;
      accumulated = 0;
      burstConsumed = true;
      consumedUntil = now + DURATION + COOLDOWN + MOMENTUM_TAIL;
      advance(direction, now);
    };

    /** A touch gesture is one clean start-to-end move, so it needs none of the
     *  wheel's burst accounting — just where it started and where it ended. */
    let touchStartY = 0;
    /** Updated every touchmove, so a track can be panned by the frame's own
     *  delta instead of the gesture's total distance. */
    let touchLastY = 0;
    /** Guards against a stray touchmove/touchend with no matching start, e.g.
     *  a second finger joining mid-gesture. */
    let tracking = false;

    const onTouchStart = (event: TouchEvent) => {
      tracking = event.touches.length === 1 && !animating;
      if (tracking) touchStartY = touchLastY = event.touches[0].clientY;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!tracking || event.touches.length !== 1) return;
      // Must run on every touchmove from the first one — see the note above.
      event.preventDefault();

      const y = event.touches[0].clientY;
      const dy = touchLastY - y;
      touchLastY = y;

      const track = activeTrack();
      if (track) tryHorizontal(track, dy);
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (!tracking) return;
      tracking = false;

      const dy = touchStartY - event.changedTouches[0].clientY;
      if (Math.abs(dy) < THRESHOLD) return;

      // touchmove already panned any track along the way; only carry the
      // gesture on to the next section once that track has run out of room
      // in the swiped direction.
      const track = activeTrack();
      if (track) {
        const max = track.scrollWidth - track.clientWidth;
        if (dy > 0 && track.scrollLeft < max - 1) return;
        if (dy < 0 && track.scrollLeft > 0) return;
      }

      advance(dy > 0 ? 1 : -1, performance.now());
    };

    const onTouchCancel = () => {
      tracking = false;
    };

    /** The same drift `settle()` corrects after a glide can also show up
     *  mid-rest: iPad's toolbar folding away from a gesture on another tab, an
     *  external keyboard dismissing, anything that resizes the visible area
     *  without a scroll of its own. Only outside a gesture or its own glide —
     *  `tracking`/`animating` both mean the page is already mid-move and
     *  about to correct itself anyway. */
    const onViewportResize = () => {
      if (animating || tracking) return;
      const positions = tops();
      const y = window.scrollY;
      const target = positions[nearestIndex(positions, y)];
      if (target !== undefined && target !== y) window.scrollTo(0, target);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchCancel, { passive: true });
    window.visualViewport?.addEventListener("resize", onViewportResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchCancel);
      window.visualViewport?.removeEventListener("resize", onViewportResize);
    };
  }, []);

  return null;
}
