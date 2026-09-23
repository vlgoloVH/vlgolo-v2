"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/scroll-progress";

/** A number that counts up once, calmly, when it comes into view. Only the
 *  digits count; anything around them ("+", "%") stays put, and a value with
 *  no number in it ("Global") is shown as it is. The final text is rendered
 *  from the start, so nothing shifts and screen readers get the real value. */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match || prefersReducedMotion()) return;
    const [, pre, digits, post] = match;
    const target = Number(digits);
    if (target < 2) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / 1400, 1);
          const e = 1 - Math.pow(1 - t, 4);
          setShown(`${pre}${Math.round(target * e)}${post}`);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        setShown(`${pre}0${post}`);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // The value never changes for a mounted counter, so this runs once.
  }, []);

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      <span className="sr-only">{value}</span>
      {/* Holds the width of the final value while the count runs. */}
      <span aria-hidden="true" className="invisible">{value}</span>
      <span aria-hidden="true" className="absolute inset-0">{shown}</span>
    </span>
  );
}
