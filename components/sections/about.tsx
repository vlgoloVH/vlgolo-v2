import type { Dictionary } from "@/lib/dictionaries";
import { localizePath, type Locale } from "@/lib/i18n";
import { ABOUT } from "@/lib/site";
import { AboutVideo } from "@/components/sections/about-video";
import { RevealSection } from "@/components/layout/reveal-section";
import { GlassButton } from "@/components/ui/glass-button";

/** Rides up over the pinned hero: its own background is opaque, which is what
 *  makes the two sections read as stacked slides. Everything inside arrives in
 *  sequence once the section is on screen — see `.reveal` in globals.css. */
export function About({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <RevealSection
      id="about"
      className="section-slide relative z-10 flex items-center overflow-hidden bg-surface"
    >
      {/* The hero's rules carry on through the section. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
        <span className="reveal-line absolute inset-y-0 left-[var(--frame-line)] w-px bg-white/12" />
        <span className="reveal-line absolute inset-y-0 right-[var(--frame-line)] w-px bg-white/12" />
      </div>

      {/* Section name in the left margin, centred in the strip outside the rule
          exactly as the social icons are on the right. */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-1/2 hidden w-[var(--frame-line)] -translate-y-1/2 justify-center md:flex"
      >
        <span className="reveal [--reveal-i:4] text-[14px] uppercase tracking-[0.36em] text-ink/60 [text-orientation:upright] [writing-mode:vertical-rl]">
          {dict.about.rail}
        </span>
      </div>

      {/* The copy starts further in than the rule, at the proportion of the
          layout: 22% of the width, which is 317px on a 1440 screen. */}
      <div className="relative z-10 w-full px-6 pb-[72vh] pt-28 md:px-0 md:py-0 md:pl-[clamp(var(--frame-pad),22vw,470px)]">
        <div className="mx-auto max-w-[34rem] text-center md:mx-0 md:text-left">
          <p className="reveal [--reveal-i:1] flex items-center justify-center gap-3 text-eyebrow font-medium uppercase text-ink md:justify-start">
            <span
              aria-hidden="true"
              className="hand-wave inline-block origin-[70%_80%] tracking-normal [animation:hand-wave_4.5s_var(--ease-soft)_infinite]"
            >
              👋
            </span>
            {dict.about.eyebrow}
          </p>

          <div className="reveal [--reveal-i:2] mt-10 space-y-5 text-[17px] leading-[1.75] text-muted md:text-[18px]">
            {dict.about.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {/* On a phone the button stands on the portrait instead, see below. */}
          <div className="hidden md:block">
            <GlassButton
              href={localizePath(lang, ABOUT.href)}
              label={dict.about.cta}
              videoSelector={null}
              className="reveal [--reveal-i:3] mt-14"
            />
          </div>
        </div>
      </div>

      {/* Standing on the floor of the section, at the clip's own 9:16 ratio so
          the graded fade meets the section edge to edge. It resolves rather than
          slides: something this large sliding in reads as heavy. */}
      <div className="pointer-events-none absolute bottom-0 right-1/2 aspect-[9/16] h-[66vh] translate-x-1/2 md:right-[15%] md:h-[min(96vh,62vw)] md:translate-x-0">
        <div className="reveal-soft h-full w-full">
          <AboutVideo />
        </div>
      </div>

      {/* Phone only: the button centred over the lower part of the portrait,
          bending it the way the hero button bends the hero video. Measured in
          vh like the portrait, so it keeps its place on the figure at any
          screen height and stays clear of Safari's bottom bar. */}
      <div className="absolute inset-x-0 bottom-[24vh] z-20 flex justify-center md:hidden">
        <GlassButton
          href={localizePath(lang, ABOUT.href)}
          label={dict.about.cta}
          videoSelector="[data-portrait-canvas]"
          className="reveal [--reveal-i:3]"
        />
      </div>
    </RevealSection>
  );
}
