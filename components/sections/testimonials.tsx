import type { Dictionary } from "@/lib/dictionaries";
import { RevealSection } from "@/components/layout/reveal-section";
import { TestimonialsStage } from "@/components/sections/testimonials-stage";

/** A full-screen slide of four quotes, typography first: one large and active,
 *  three small and dimmed around it. Choosing one (hover, click, tap or swipe)
 *  moves it into the main position and sends the old one to its place — see
 *  TestimonialsStage. It rides up over Works the same way About rides over the
 *  hero: an opaque surface, one step higher in the stack. */
export function Testimonials({ dict }: { dict: Dictionary }) {
  return (
    <RevealSection
      id="testimonials"
      className="section-slide relative z-30 overflow-hidden bg-surface"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="reveal-line absolute inset-y-0 left-[var(--frame-line)] w-px bg-white/12" />
        <span className="reveal-line absolute inset-y-0 right-[var(--frame-line)] w-px bg-white/12" />
      </div>

      {/* Section name in the left margin, exactly where the About rail sits. */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-1/2 hidden w-[var(--frame-line)] -translate-y-1/2 justify-center md:flex"
      >
        <span className="reveal [--reveal-i:1] text-[14px] uppercase tracking-[0.36em] text-ink/60 [text-orientation:upright] [writing-mode:vertical-rl]">
          {dict.testimonials.rail}
        </span>
      </div>

      <TestimonialsStage label={dict.testimonials.label} items={dict.testimonials.items} />
    </RevealSection>
  );
}
