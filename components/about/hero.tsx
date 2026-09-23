import Image from "next/image";
import type { Dictionary } from "@/lib/dictionaries";
import { ABOUT_PAGE } from "@/lib/site";

/** 01 · Intro. Three depths moving at three speeds as the page leaves: the
 *  oversized name drifts slowest, the portrait a little faster and settles
 *  back in scale, the words fastest. On load it plays like the opening of a
 *  shot: the light and the portrait first, then the eyebrow, the headline
 *  line by line from behind a mask, then the paragraph (see `.ab-load`). */
export function AboutHero({ copy }: { copy: Dictionary["aboutPage"]["hero"] }) {
  const { portrait } = ABOUT_PAGE;

  return (
    <section
      id="intro"
      data-section
      data-p
      className="ab-hero relative flex h-[100svh] min-h-[640px] items-end overflow-hidden bg-bg"
    >
      {/* Light behind the figure, and the room's faint grain. */}
      <div aria-hidden="true" className="ab-load ab-glow pointer-events-none absolute inset-0 [--d:0s]" />

      <div aria-hidden="true" className="ab-drift [--speed:0.45] pointer-events-none absolute inset-x-0 bottom-[6vh] flex justify-center">
        <span className="ab-load ab-backdrop [--d:0.3s] select-none whitespace-nowrap font-bold uppercase leading-none">
          {copy.backdrop}
        </span>
      </div>

      <div className="ab-drift ab-hero-portrait [--speed:0.24] pointer-events-none absolute inset-x-0 top-[8svh] flex h-[50svh] justify-center md:inset-x-auto md:bottom-0 md:top-auto md:right-[max(24px,calc(var(--frame-line)+2vw))] md:h-[90svh]">
        <div className="ab-load ab-rise-soft h-full [--d:0.15s]">
          <Image
            src={portrait.src}
            alt={copy.portrait}
            width={portrait.width}
            height={portrait.height}
            priority
            sizes="(min-width: 768px) 30vw, 60vw"
            className="h-full w-auto"
          />
        </div>
      </div>

      <div aria-hidden="true" className="ab-grain pointer-events-none absolute inset-0" />
      {/* Hands the black of the intro over to the page surface below. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[22vh] bg-gradient-to-b from-transparent to-surface" />

      <div className="ab-drift ab-hero-copy [--speed:-0.12] relative z-10 w-full px-6 pb-[14svh] md:px-[var(--frame-pad)] md:pb-[16svh]">
        <p className="ab-load ab-rise [--d:0.9s] text-eyebrow font-medium uppercase text-ink/70">
          {copy.eyebrow}
        </p>
        <h1 className="mt-6 max-w-[12em] text-[clamp(44px,6.3vw,120px)] font-bold leading-[1.02] tracking-[-0.03em] text-ink md:mt-8">
          {copy.headline.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <span className="ab-load ab-mask block" style={{ "--d": `${1.15 + i * 0.16}s` } as React.CSSProperties}>
                {line}
              </span>
            </span>
          ))}
        </h1>
        <p className="ab-load ab-rise [--d:1.75s] mt-8 max-w-[30rem] text-[17px] leading-relaxed text-ink/70 md:mt-10 md:text-[20px]">
          {copy.body}
        </p>
      </div>

      <div aria-hidden="true" className="ab-load ab-rise [--d:2.3s] absolute bottom-8 right-6 z-10 hidden items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-ink/45 md:right-[var(--frame-pad)] md:flex">
        {copy.scroll}
        <span className="relative h-10 w-px overflow-hidden bg-white/15">
          <span className="ab-scroll-line absolute inset-x-0 top-0 h-1/2 bg-white/70" />
        </span>
      </div>
    </section>
  );
}
