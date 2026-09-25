import Image from "next/image";
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

  return (
    <section id="overview" aria-label={label} className="relative">
      <Track
        fit
        className="cs-stack relative hidden md:block"
        style={{ height: `calc(var(--pin-h, 100svh) + ${steps * PER * 100}vh)`, "--steps": steps } as React.CSSProperties}
      >
        {/* The stage is the card and the section's spacing above and below
            it, held in the middle of the screen while the deck plays. */}
        <div data-pin className="sticky top-[var(--pin-top,0px)] h-[calc(var(--w)/2+var(--section-y)*2)] overflow-hidden">
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
        </div>
      </Track>

      {/* Phone: the same deck, stacked by the page itself. */}
      <div className="relative flex flex-col gap-6 px-6 py-[var(--section-y)] md:hidden">
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
