import { HERO } from "@/lib/site";
import { HeroVideo } from "@/components/sections/hero-video";
import { CvButton } from "@/components/ui/cv-button";

export function Hero() {
  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-bg">
      <HeroVideo />

      {/* No vignette layer here: the footage carries its own falloff to black,
          which is also why letterboxing the full frame is invisible. */}

      {/* Vertical rules on the content column: same max width and padding as
          the block below, so they always land on the content edges. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mx-auto w-full max-w-content px-6 md:px-14"
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

        <CvButton
          href={HERO.cta.href}
          label={HERO.cta.label}
          className="enter-cta mt-10 md:mt-12"
        />
      </div>
    </section>
  );
}
