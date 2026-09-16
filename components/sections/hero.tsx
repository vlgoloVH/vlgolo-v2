import { HERO } from "@/lib/site";
import { HeroBackground } from "@/components/sections/hero-background";
import { ResumeBadge } from "@/components/ui/resume-badge";

export function Hero() {
  return (
    <section className="relative flex min-h-dvh flex-col overflow-hidden">
      <HeroBackground />

      {/* Keeps the headline readable while the fluid moves underneath it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(125%_90%_at_12%_40%,rgba(5,7,10,0.88)_0%,rgba(5,7,10,0.45)_42%,rgba(5,7,10,0.08)_100%)]"
      />

      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-content flex-1 flex-col justify-center px-6 pb-16 pt-32 md:justify-end md:px-10 md:pb-20 md:pt-36">
        <div className="flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted md:flex-row md:items-center md:justify-between md:text-xs">
          <span className="enter" style={{ animationDelay: "0.1s" }}>
            — {HERO.eyebrow}
          </span>
          <span className="enter flex items-center gap-2" style={{ animationDelay: "0.18s" }}>
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-[status-pulse_2.6s_ease-out_infinite] rounded-full bg-accent" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {HERO.status}
          </span>
        </div>

        <div className="mt-8 grid items-end gap-10 md:mt-12 md:grid-cols-[1fr_auto] md:gap-14">
          <div>
            <h1 className="font-display text-display-xl uppercase text-ink">
              {HERO.headline.map((line, index) => (
                <span key={index} className="headline-line">
                  <span style={{ animationDelay: `${0.24 + index * 0.09}s` }}>
                    {line.map((part) => (
                      <span
                        key={part.text}
                        className={"accent" in part && part.accent ? "text-accent" : undefined}
                      >
                        {part.text}
                      </span>
                    ))}
                  </span>
                </span>
              ))}
            </h1>

            <p
              className="enter mt-7 max-w-2xl text-lede text-muted md:mt-9"
              style={{ animationDelay: "0.68s" }}
            >
              {HERO.lede.before}
              <span className="text-ink">{HERO.lede.accent}</span>
              {HERO.lede.after}
            </p>
          </div>

          <div
            className="enter pointer-events-auto justify-self-start md:justify-self-end"
            style={{ animationDelay: "0.76s" }}
          >
            <ResumeBadge />
          </div>
        </div>
      </div>

      <div
        className="enter-soft pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        style={{ animationDelay: "1.2s" }}
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
          Scroll
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <span className="absolute inset-x-0 h-full animate-[scroll-cue_2.4s_ease-in-out_infinite] bg-accent" />
        </span>
      </div>
    </section>
  );
}
