"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import Snap from "lenis/snap";

/** One wheel/trackpad/touch input smooths into a single scroll position via
 *  Lenis, and lenis/snap eases that position to the nearest full-screen
 *  section once it settles — both are Lenis's own official pieces, built by
 *  the library's authors for exactly this "deck of full-screen slides"
 *  layout, so nothing here is guessing where one gesture ends and the next
 *  begins from wheel-event timing. That guesswork is what the previous,
 *  hand-rolled version of this file did, and it kept producing new bugs:
 *  real trackpad momentum can keep firing sub-120ms events for well over a
 *  second, which is indistinguishable, on timing alone, from a second
 *  deliberate gesture arriving that soon after landing. Lenis's own
 *  velocity, computed from the actual eased scroll curve rather than raw
 *  event deltas, doesn't have that ambiguity — snapping only fires once
 *  that velocity has genuinely settled.
 *
 *  Touch stays native: `syncTouch` is left off, so iOS/iPadOS's own
 *  momentum scrolling drives it untouched, and Lenis still reads its
 *  velocity from the resulting native scroll events, so lenis/snap catches
 *  a touch gesture's rest the same way it does a wheel gesture's. */
export function SlideScroll() {
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!desktop.matches || reduced.matches) return;

    const lenis = new Lenis({ syncTouch: false });

    const snap = new Snap(lenis, { type: "mandatory" });
    const removeSnapElements = snap.addElements(
      [...document.querySelectorAll<HTMLElement>(".section-slide")],
      { align: "start" },
    );

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    /** A section can carry one horizontal case track (see Works). Wheel
     *  input over whichever section currently fills the viewport pans that
     *  track sideways instead of the page — read fresh off geometry on
     *  every event rather than tracked as state, and given first refusal
     *  ahead of Lenis (capture phase fires before Lenis's own bubble-phase
     *  listener on window, whatever order the two were registered in) so a
     *  pan is never also read as page-scroll input. Once the track runs out
     *  of room, the event is left untouched and falls through to Lenis,
     *  which carries the page on to the next section exactly like normal
     *  wheel input. */
    const activeTrack = (): HTMLElement | null => {
      const mid = window.innerHeight / 2;
      for (const section of document.querySelectorAll<HTMLElement>(".section-slide")) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= mid && rect.bottom >= mid) {
          return section.querySelector<HTMLElement>("[data-h-track]");
        }
      }
      return null;
    };

    const onWheel = (event: WheelEvent) => {
      const track = activeTrack();
      if (!track) return;

      const max = track.scrollWidth - track.clientWidth;
      const forward = event.deltaY > 0;
      if (forward && track.scrollLeft >= max - 1) return;
      if (!forward && track.scrollLeft <= 0) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      track.scrollLeft = Math.min(Math.max(track.scrollLeft + event.deltaY, 0), max);
    };
    window.addEventListener("wheel", onWheel, { capture: true, passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
      cancelAnimationFrame(raf);
      removeSnapElements();
      snap.destroy();
      lenis.destroy();
    };
  }, []);

  return null;
}
