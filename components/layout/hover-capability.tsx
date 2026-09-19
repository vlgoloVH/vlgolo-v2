"use client";

import { useEffect } from "react";

/** iPadOS Safari reports `(hover: hover)` and `(pointer: fine)` as false even
 *  with a trackpad or mouse connected, so neither media feature can gate
 *  hover styles there — which is the one place this needs to work, since a
 *  tap's own `:hover` triggering is the unreliable part everywhere else. A
 *  real pointer's events still carry their own type regardless of what the
 *  media query says, so this watches those directly and publishes
 *  `data-hover-capable` on <html> for the CSS to key off instead (see
 *  `can-hover`/`group-can-hover` in globals.css). It flips live: someone
 *  using a trackpad half the time and a finger the other half gets the right
 *  answer for whichever one they just used. */
export function HoverCapability() {
  useEffect(() => {
    const root = document.documentElement;

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      root.dataset.hoverCapable = "true";
    };

    const onTouchStart = () => {
      root.dataset.hoverCapable = "false";
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("touchstart", onTouchStart, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchstart", onTouchStart);
      delete root.dataset.hoverCapable;
    };
  }, []);

  return null;
}
