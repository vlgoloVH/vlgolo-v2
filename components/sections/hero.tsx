import { HERO, SINCE, STATUS } from "@/lib/site";
import { HeroVideo } from "@/components/sections/hero-video";
import { CvButton } from "@/components/ui/cv-button";

export function Hero() {
  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-bg">
      <HeroVideo />

      {/* No vignette layer here: the footage carries its own falloff to black,
          which is also why letterboxing the full frame is invisible. */}

      {/* The two rules, pinned --frame-line in from the viewport edges. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="enter-line absolute inset-y-0 left-[var(--frame-line)] w-px bg-white/12" />
        <span className="enter-line absolute inset-y-0 right-[var(--frame-line)] w-px bg-white/12" />
      </div>

      <div className="relative z-10 flex w-full flex-col items-center px-6 text-center md:px-[var(--frame-pad)]">
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

      {/* Bottom line of the frame: availability on the left, since on the right. */}
      <div className="enter-chrome absolute inset-x-0 bottom-6 z-10 flex items-center justify-between px-6 text-[13px] uppercase tracking-[0.15em] text-ink/85 md:bottom-12 md:px-[var(--frame-pad)]">
        <span className="flex items-center gap-2.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-[status-pulse_2.8s_ease-out_infinite] rounded-full bg-[#4ade80]" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
          </span>
          {STATUS}
        </span>

        <span>{SINCE}</span>
      </div>
    </section>
  );
}
