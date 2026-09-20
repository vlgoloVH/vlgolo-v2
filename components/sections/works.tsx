import Image from "next/image";
import { WORKS } from "@/lib/site";
import { RevealSection } from "@/components/layout/reveal-section";

/** Slides over About the same way About slides over the hero. The cases sit
 *  in one horizontal track — SlideScroll (components/layout) is what turns a
 *  normal down-scroll into that track panning sideways once this section is
 *  the one in view, so a wheel or swipe here reads as "the cases scroll
 *  past" instead of "the page moves on". */
export function Works() {
  return (
    <RevealSection
      id="works"
      className="section-slide relative z-20 flex items-center overflow-hidden bg-surface"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="reveal-line absolute inset-y-0 left-[var(--frame-line)] w-px bg-white/12" />
        <span className="reveal-line absolute inset-y-0 right-[var(--frame-line)] w-px bg-white/12" />
      </div>

      {/* Section name in the left margin, exactly where ABOUT.rail sits. */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-1/2 hidden w-[var(--frame-line)] -translate-y-1/2 justify-center md:flex"
      >
        <span className="reveal [--reveal-i:1] text-[14px] uppercase tracking-[0.36em] text-ink/60 [text-orientation:upright] [writing-mode:vertical-rl]">
          {WORKS.rail}
        </span>
      </div>

      <div className="relative z-10 flex w-full flex-col gap-10 py-28 md:gap-14 md:py-0">
        <div className="flex items-baseline justify-between px-6 md:pl-[clamp(var(--frame-pad),22vw,470px)] md:pr-[var(--frame-pad)]">
          <p className="reveal [--reveal-i:2] text-eyebrow font-medium uppercase text-ink">
            {WORKS.eyebrow}
          </p>
          <span className="reveal [--reveal-i:2] hidden font-mono text-xs uppercase tracking-widest text-muted md:block">
            {WORKS.count}
          </span>
        </div>

        {/* Native overflow-x is the source of truth for horizontal position
            everywhere: on mobile it is a plain touch-swipe carousel, and on
            desktop SlideScroll drives this same scrollLeft instead of
            reinventing it, so nothing here has to know which one is driving. */}
        <div
          data-h-track
          className="hide-scrollbar flex snap-x snap-proximity gap-6 overflow-x-auto overscroll-x-contain px-6 md:snap-none md:gap-10 md:px-0 md:pl-[clamp(var(--frame-pad),22vw,470px)] md:pr-[var(--frame-pad)]"
        >
          {WORKS.cases.map((item, index) => (
            <article
              key={item.slug}
              className="reveal group w-[78vw] shrink-0 snap-start sm:w-[52vw] md:w-[32vw] md:snap-align-none lg:w-[28vw]"
              style={{ "--reveal-i": 3 + index } as React.CSSProperties}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-white/5">
                <Image
                  src={item.cover}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 28vw, (min-width: 768px) 32vw, (min-width: 640px) 52vw, 78vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-soft)] can-hover:group-hover:scale-105"
                />
              </div>

              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h3 className="text-lg font-semibold uppercase text-ink md:text-xl">
                  {item.title}
                </h3>
                <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-muted">
                  {item.year}
                </span>
              </div>

              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.description}
              </p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
