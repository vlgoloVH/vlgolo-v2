"use client";

import { useEffect, useState } from "react";
import LiquidEther from "@/components/backgrounds/liquid-ether";

/** The fluid simulation is GPU work, so it only runs where it is worth it:
 *  a pointer that can actually stir it, and no reduced-motion preference. */
const QUERY = "(min-width: 768px) and (pointer: fine)";

export function HeroBackground() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const canRun = window.matchMedia(QUERY);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => setEnabled(canRun.matches && !reduced.matches);

    sync();
    canRun.addEventListener("change", sync);
    reduced.addEventListener("change", sync);

    return () => {
      canRun.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="enter-soft absolute inset-0" aria-hidden="true">
      <LiquidEther
        colors={["#10b981", "#10b981", "#10b981"]}
        mouseForce={16}
        cursorSize={90}
        resolution={0.5}
        dt={0.014}
        BFECC
        autoDemo
        autoSpeed={0.28}
        autoIntensity={1.4}
        autoResumeDelay={2400}
        takeoverDuration={0.3}
      />
    </div>
  );
}
