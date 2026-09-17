import { HERO } from "@/lib/site";
import { HeroVideo } from "@/components/sections/hero-video";
import { CvButton } from "@/components/ui/cv-button";

export function Hero() {
  return (
    <section className="sticky top-0 flex h-dvh items-center justify-center overflow-hidden bg-bg">
      <HeroVideo />

      {/* No vignette layer here: the footage carries its own falloff to black,
          which is also why letterboxing the full frame is invisible. */}

      {/* The two rules, pinned --frame-line in from the viewport edges. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="enter-line absolute inset-y-0 left-[var(--frame-line)] w-px bg-white/12" />
        <span className="enter-line absolute inset-y-0 right-[var(--frame-line)] w-px bg-white/12" />
      </div>

      {/* The content drifts up at a fraction of the scroll speed, so the next
          section clearly overtakes it as it slides over. */}
      <div className="hero-parallax relative z-10 flex w-full flex-col items-center px-6 text-center md:px-[var(--frame-pad)]">
        <p className="enter-eyebrow text-eyebrow font-medium uppercase text-ink/85">
          {HERO.eyebrow}
        </p>

        <h1 className="enter-headline mt-6 max-w-[16em] text-display text-ink md:mt-8">
          {HERO.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <CvButton
          href={HERO.cta.href}
          label={HERO.cta.label}
          className="enter-cta mt-20 md:mt-24"
        />
      </div>

      {/* Scroll hint: just the chevron, drifting down on a slow beat. It is the
          first thing to go once the visitor starts scrolling. */}
      <div
        aria-hidden="true"
        className="hero-fade pointer-events-none absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="scroll-hint enter-chrome hidden flex-col items-center md:flex">
          <svg
            width="15"
            height="9"
            viewBox="0 0 15 9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-ink [animation:scroll-nudge_2.6s_var(--ease-soft)_infinite]"
          >
            <path d="M1 1.5 7.5 7.5 14 1.5" />
          </svg>
        </div>
      </div>
    </section>
  );
}
