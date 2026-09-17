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
        <span className="text-[14px] uppercase tracking-[0.36em] text-ink/60 [text-orientation:upright] [writing-mode:vertical-rl]">
          {ABOUT.rail}
        </span>
      </div>

      {/* The copy starts further in than the rule, at the proportion of the
          layout: 18.3% of the width, which is 264px on a 1440 screen. */}
      <div className="relative z-10 w-full px-6 pb-[58vh] pt-28 md:px-0 md:py-0 md:pl-[clamp(var(--frame-pad),18.3vw,400px)]">
        <div className="max-w-[30rem]">
          <p className="flex items-center gap-3 text-eyebrow font-medium uppercase text-ink">
            <span aria-hidden="true" className="tracking-normal">
              👋
            </span>
            {ABOUT.eyebrow}
          </p>

          <p className="mt-10 text-[17px] leading-[1.95] text-muted md:text-[19px]">
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

      {/* Standing on the floor of the section. The box carries the clip's own
          9:16 ratio, so the feathered mask lines up with the picture instead of
          with letterbox bars. */}
      <div className="pointer-events-none absolute bottom-0 right-1/2 aspect-[9/16] h-[42vh] translate-x-1/2 md:right-[13%] md:h-[min(86vh,54vw)] md:translate-x-0">
        <AboutVideo />
      </div>
    </section>
  );
}
