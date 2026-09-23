"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";
import type { CaseStudy } from "@/lib/cases/types";
import { Track } from "@/components/case/track";

/** Scroll the track needs per image, in screen heights, and the rest after
 *  the last one lands. */
const PER = 0.9;
const HOLD = 0.45;

/** The full-screen images, dealt like a deck. The section pins; each next
 *  image slides up from below and lands on the one before, which settles back
 *  a little (smaller, darker, a touch higher, so its edge still shows) until
 *  the last one is down and the page lets go. On a phone the cards simply
 *  stick and stack as they pass. */
export function CaseStack({ overview, label }: { overview: CaseStudy["overview"]; label: string }) {
  const { images } = overview;
  const n = images.length;
  const steps = n - 1 + HOLD;
  const counter = useRef<HTMLSpanElement>(null);
  const onProgress = useCallback(
    (p: number) => {
      if (counter.current) {
        const i = Math.min(Math.round(p * steps), n - 1);
        counter.current.textContent = String(i + 1).padStart(2, "0");
      }
    },
    [n, steps],
  );

  return (
    <section id="overview" aria-label={label} className="relative">
      <Track
        onProgress={onProgress}
        className="cs-stack relative hidden md:block"
        style={{ height: `${(steps * PER + 1) * 100}vh`, "--steps": steps } as React.CSSProperties}
      >
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          {images.map((image, i) => (
            <div
              key={image.src}
              className="cs-card absolute left-1/2 top-1/2"
              style={{ "--i": i, "--dir": i % 2 ? -1 : 1, zIndex: i + 1 } as React.CSSProperties}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[6px] shadow-[0_-30px_80px_-20px_rgba(0,0,0,0.7)]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={2200}
                  height={1100}
                  sizes="90vw"
                  className="h-full w-full object-cover"
                />
                <span aria-hidden="true" className="cs-card-shade absolute inset-0 bg-black" />
              </div>
            </div>
          ))}
          <p className="absolute bottom-[3svh] left-[var(--frame-pad)] z-[20] font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">
            <span ref={counter}>01</span> / {String(n).padStart(2, "0")}
          </p>
        </div>
      </Track>

      {/* Phone: the same deck, stacked by the page itself. */}
      <div className="relative flex flex-col gap-6 px-4 pb-[10vh] md:hidden">
        {images.map((image, i) => (
          <div
            key={image.src}
            className="sticky overflow-hidden rounded-[6px] shadow-[0_-20px_50px_-16px_rgba(0,0,0,0.8)]"
            style={{ top: `calc(18svh + ${i * 10}px)` }}
          >
            <Image src={image.src} alt={image.alt} width={2200} height={1100} sizes="92vw" className="h-auto w-full" />
          </div>
        ))}
      </div>
    </section>
  );
}
