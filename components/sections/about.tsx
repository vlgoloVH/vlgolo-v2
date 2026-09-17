import { ABOUT } from "@/lib/site";
import { AboutVideo } from "@/components/sections/about-video";

/** Rides up over the pinned hero: its own background is opaque, which is what
 *  makes the two sections read as stacked slides. */
export function About() {
  return (
    <section
      id="about"
      className="relative z-10 flex min-h-dvh items-center overflow-hidden bg-surface"
    >
      {/* The hero's rules carry on through the section. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute inset-y-0 left-[var(--frame-line)] w-px bg-white/12" />
        <span className="absolute inset-y-0 right-[var(--frame-line)] w-px bg-white/12" />
      </div>

      {/* Section name in the left margin, mirroring the social rail. */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-1/2 hidden w-[var(--frame-line)] -translate-y-1/2 text-center text-[13px] uppercase tracking-[0.34em] text-ink/45 [text-orientation:upright] [writing-mode:vertical-rl] md:block"
      >
        {ABOUT.rail}
      </span>

      <div className="grid w-full items-center gap-12 px-6 py-24 md:grid-cols-2 md:gap-8 md:px-[var(--frame-pad)] md:py-0">
        <div className="max-w-[34rem] md:pr-8">
          <p className="flex items-center gap-3 text-eyebrow font-medium uppercase text-ink">
            <span aria-hidden="true" className="tracking-normal">
              👋
            </span>
            {ABOUT.eyebrow}
          </p>

          <p className="mt-10 text-[17px] leading-[1.95] text-muted md:text-[19px]">
            {ABOUT.body}
          </p>

          <a href={ABOUT.cta.href} className="glass-pill mt-14">
            <span>{ABOUT.cta.label}</span>
          </a>
        </div>

        {/* Bottom-aligned so the portrait sits on the section floor, as in the
            layout, and never crops at the top on shorter screens. */}
        <div className="relative h-[60vh] self-end md:h-dvh">
          <AboutVideo />
        </div>
      </div>
    </section>
  );
}
