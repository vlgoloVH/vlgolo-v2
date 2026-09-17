import { ABOUT } from "@/lib/site";
import { AboutVideo } from "@/components/sections/about-video";
import { GlassButton } from "@/components/ui/glass-button";

/** Rides up over the pinned hero: its own background is opaque, which is what
 *  makes the two sections read as stacked slides. */
export function About() {
  return (
    <section
      id="about"
      className="section-slide relative z-10 flex items-center overflow-hidden bg-surface"
    >
      {/* The hero's rules carry on through the section. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute inset-y-0 left-[var(--frame-line)] w-px bg-white/12" />
        <span className="absolute inset-y-0 right-[var(--frame-line)] w-px bg-white/12" />
      </div>

      {/* Section name in the left margin, centred in the strip outside the rule
          exactly as the social icons are on the right. */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-1/2 hidden w-[var(--frame-line)] -translate-y-1/2 justify-center md:flex"
      >
        <span className="lag-deep text-[14px] uppercase tracking-[0.36em] text-ink/60 [text-orientation:upright] [writing-mode:vertical-rl]">
          {ABOUT.rail}
        </span>
      </div>

      {/* The copy starts further in than the rule, at the proportion of the
          layout: 18.3% of the width, which is 264px on a 1440 screen. */}
      <div className="relative z-10 w-full px-6 pb-[58vh] pt-28 md:px-0 md:py-0 md:pl-[clamp(var(--frame-pad),22vw,470px)]">
        <div className="lag-soft max-w-[34rem]">
          <p className="flex items-center gap-3 text-eyebrow font-medium uppercase text-ink">
            <span
              aria-hidden="true"
              className="hand-wave inline-block origin-[70%_80%] tracking-normal [animation:hand-wave_4.5s_var(--ease-soft)_infinite]"
            >
              👋
            </span>
            {ABOUT.eyebrow}
          </p>

          <p className="mt-10 text-[19px] leading-[1.85] text-muted md:text-[22px]">
            {ABOUT.body}
          </p>

          <GlassButton
            href={ABOUT.cta.href}
            label={ABOUT.cta.label}
            videoSelector="video[data-portrait]"
            className="mt-14"
          />
        </div>
      </div>

      {/* Standing on the floor of the section, at the clip's own 9:16 ratio so
          the graded fade meets the section edge to edge. The inner wrapper
          carries the lag, so it never fights the centring transform. */}
      <div className="pointer-events-none absolute bottom-0 right-1/2 aspect-[9/16] h-[42vh] translate-x-1/2 md:right-[15%] md:h-[min(96vh,62vw)] md:translate-x-0">
        <div className="lag-deep h-full w-full">
          <AboutVideo />
        </div>
      </div>
    </section>
  );
}
