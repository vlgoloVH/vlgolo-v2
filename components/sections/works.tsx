import { WORKS } from "@/lib/site";
import { RevealSection } from "@/components/layout/reveal-section";

/** One section-slide holding a horizontal track of full-screen cases —
 *  SlideScroll (components/layout) feeds a vertical wheel/swipe into the
 *  track's scrollLeft while this section is active, so each case slides in
 *  from the side and the one before it slides out, the way andrewreff.com's
 *  selected-works section reads. Every case fills edge to edge between the
 *  frame lines, never past them into the rail or social-icon strips. */
export function Works() {
  return (
    <RevealSection
      id="works"
      className="section-slide relative z-20 overflow-hidden bg-surface"
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

      {/* Native overflow-x is the source of truth for horizontal position: on
          mobile it is a plain touch-swipe carousel, and on desktop SlideScroll
          feeds the wheel into this same scrollLeft instead of reinventing it.
          No snapping of its own: unlike the sections, the cases scroll freely,
          so a gesture leaves them wherever it leaves them. */}
      <div
        data-h-track
        className="hide-scrollbar reveal [--reveal-i:2] absolute inset-y-0 left-[var(--frame-line)] right-[var(--frame-line)] flex overflow-x-auto overscroll-x-none"
      >
        {WORKS.cases.map((item, index) => (
          <article
            key={item.slug}
            className="relative h-full w-full shrink-0 bg-white/5"
          >
            {/* Placeholder stand-in for the case's cover image. */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <span className="select-none font-mono text-[28vw] font-semibold leading-none text-white/[0.06] md:text-[13vw]">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-6 bg-gradient-to-t from-black/70 via-black/10 to-transparent p-6 md:p-10">
              <div>
                <h3 className="text-xl font-semibold uppercase text-ink md:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted md:text-base">
                  {item.description}
                </p>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-muted">
                  {item.year}
                </span>
                <ul className="flex flex-wrap justify-end gap-2">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </RevealSection>
  );
}
