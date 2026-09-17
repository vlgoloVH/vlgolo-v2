import { HERO } from "@/lib/site";
import { HeroVideo } from "@/components/sections/hero-video";

export function Hero() {
  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-bg">
      <HeroVideo />

      {/* Three stacked gradients so the footage has no visible edges:
          a centre-weighted vignette plus a wash on each axis. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_78%_70%_at_50%_45%,transparent_0%,transparent_32%,rgba(0,0,0,0.45)_62%,rgba(0,0,0,0.88)_86%,#000_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#000_0%,rgba(0,0,0,0.35)_14%,transparent_30%,transparent_70%,rgba(0,0,0,0.35)_86%,#000_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#000_0%,rgba(0,0,0,0.4)_12%,transparent_32%,transparent_62%,rgba(0,0,0,0.45)_88%,#000_100%)]"
      />

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
        <p className="enter-eyebrow text-[11px] font-medium uppercase tracking-[0.3em] text-ink/85 md:text-[13px] md:tracking-[0.34em]">
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
          className="glass enter-cta group mt-10 inline-flex items-center gap-3 rounded-full px-8 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15 md:mt-12 md:text-xs"
        >
          {HERO.cta.label}
        </a>
      </div>
    </section>
  );
}
