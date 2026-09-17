import { HERO } from "@/lib/site";
import { HeroVideo } from "@/components/sections/hero-video";

export function Hero() {
  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-bg">
      <HeroVideo />

      {/* No vignette layer here: the footage carries its own falloff to black,
          which is also why letterboxing the full frame is invisible. */}

      {/* Vertical rules that drop in from the top edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mx-auto w-full max-w-[1200px] px-6 md:px-0"
      >
        <div className="relative h-full">
          <span className="enter-line absolute inset-y-0 left-0 w-px bg-white/12" />
          <span className="enter-line absolute inset-y-0 right-0 w-px bg-white/12" />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-content flex-col items-center px-6 text-center md:px-14">
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

        <a
          href={HERO.cta.href}
          download
          className="glass glass-live enter-cta mt-10 inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15 md:mt-12 md:text-xs"
        >
          <span aria-hidden="true" className="glass-bloom" />
          {HERO.cta.label}
        </a>
      </div>
    </section>
  );
}
