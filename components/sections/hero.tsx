import { HERO } from "@/lib/site";
import { HeroVideo } from "@/components/sections/hero-video";

export function Hero() {
  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-bg">
      <HeroVideo />

      {/* No vignette layer here: the footage carries its own falloff to black,
          which is also why letterboxing the full frame is invisible. */}

      {/* Vertical rules that drop in from the top edge, on the content column. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mx-auto w-full max-w-content"
      >
        <div className="relative h-full">
          <span className="enter-line absolute inset-y-0 left-0 w-px bg-white/12" />
          <span className="enter-line absolute inset-y-0 right-0 w-px bg-white/12" />
        </div>
      </div>

      {/* Spacing is in vw for the same reason the type is: the 1440 proportions
          should survive at any desktop width. */}
      <div className="relative z-10 mx-auto flex w-full max-w-content flex-col items-center px-6 text-center md:px-0">
        <p className="enter-eyebrow text-eyebrow font-medium uppercase text-ink">
          {HERO.eyebrow}
        </p>

        <h1 className="enter-headline mt-[1.55vw] text-display text-ink">
          {HERO.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <a
          href={HERO.cta.href}
          download
          className="glass enter-cta mt-[4.6vw] inline-flex items-center justify-center rounded-full px-[1.58vw] py-[1.29vw] text-cta font-medium uppercase text-ink transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-white/10"
        >
          {HERO.cta.label}
        </a>
      </div>
    </section>
  );
}
