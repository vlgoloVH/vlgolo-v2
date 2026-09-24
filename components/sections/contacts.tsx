import Image from "next/image";
import type { Dictionary } from "@/lib/dictionaries";
import { SITE } from "@/lib/site";
import { RevealSection } from "@/components/layout/reveal-section";
import { ContactDialog } from "@/components/ui/contact-dialog";
import { GlassButton } from "@/components/ui/glass-button";

/** The last slide, and the hero's closing shot: the same desk after work, the
 *  chair pushed back, the screen still on, dimmed like the hero video. The
 *  entrance is the calmest on the page: the copy rises in, one line at a time,
 *  and the picture simply stays still. The site footer sits along its bottom. */
export function Contacts({ dict }: { dict: Dictionary }) {
  const copy = dict.contacts;

  return (
    <RevealSection
      id="contacts"
      // z-35: over Testimonials (30), still under the social rail (40).
      className="section-slide relative z-[35] overflow-hidden bg-bg"
    >
      <Image
        id="contact-scene"
        src="/contact/workspace.jpg"
        alt={copy.scene}
        fill
        sizes="100vw"
        // Dimmed over black exactly as far as the hero video (--video-dim).
        className="object-cover object-[72%_50%] opacity-[var(--video-dim)] md:object-right"
      />

      {/* Shade along the right edge only, so the social icons in that strip
          stay readable over the lit city in the window. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[calc(var(--frame-line)*3)] bg-[linear-gradient(270deg,rgba(0,0,0,0.88),rgba(0,0,0,0.65)_33%,transparent)] md:block"
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
        <span className="reveal-line absolute inset-y-0 left-[var(--frame-line)] w-px bg-white/12" />
        <span className="reveal-line absolute inset-y-0 right-[var(--frame-line)] w-px bg-white/12" />
      </div>

      {/* Section name in the left margin, exactly where the About rail sits. */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-1/2 hidden w-[var(--frame-line)] -translate-y-1/2 justify-center md:flex"
      >
        <span className="reveal [--reveal-i:1] text-[14px] uppercase tracking-[0.36em] text-ink/60 [text-orientation:upright] [writing-mode:vertical-rl]">
          {copy.rail}
        </span>
      </div>

      {/* Centred on the screen like the hero, with the hero's headline type,
          so the page closes on the shape it opened with. */}
      {/* A phone's slide is a min-height, not a height, so there the block
          takes the full screen itself to be centred in it. */}
      <div className="relative z-10 flex h-full min-h-[var(--app-vh,100svh)] flex-col items-center justify-center px-6 pb-28 pt-24 md:min-h-0 text-center md:px-[var(--frame-pad)] md:pb-24 md:pt-24">
        {/* The address as plain text, where the hero has its eyebrow: to read
            or copy, not to click. The button below is the way to write. */}
        <p className="reveal [--reveal-i:2] select-text text-[18px] font-medium tracking-[0.04em] text-ink/85 md:text-[22px]">
          {SITE.email}
        </p>

        <h2 className="reveal [--reveal-i:3] mt-6 text-display text-ink md:mt-8">
          {copy.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        <p className="reveal [--reveal-i:5] mt-6 max-w-[28rem] text-balance text-[20px] leading-relaxed text-ink/75 md:mt-7">
          {copy.body}
        </p>

        {/* A grid of equal columns, so both pills are as wide as the wider one;
            stacked on a phone, still one width. */}
        <div className="reveal [--reveal-i:7] mt-10 grid gap-4 sm:grid-cols-2 md:mt-12">
          <ContactDialog label={copy.email} copy={dict.contact} glassSource="#contact-scene" className="w-full" />
          <GlassButton
            href={SITE.resume}
            label={copy.resume}
            download
            videoSelector="#contact-scene"
            className="w-full"
          />
        </div>
      </div>

      {/* The site footer, as on the current site: copyright on the left, back to
          top on the right, on a hairline between the frame lines. */}
      <footer className="reveal [--reveal-i:9] absolute bottom-0 left-0 right-0 z-10 md:left-[var(--frame-line)] md:right-[var(--frame-line)]">
        <div className="flex items-center justify-between gap-4 border-t border-white/12 px-6 py-5 text-[11px] uppercase tracking-[0.2em] text-ink/45 md:px-[clamp(32px,5vw,104px)] md:py-7 md:text-[12px]">
          <p>
            © {new Date().getFullYear()} {dict.meta.name}
            <span className="hidden md:inline"> · {dict.meta.role}</span>
          </p>
          <a
            href="#top"
            className="shrink-0 transition-colors duration-300 can-hover:text-ink"
          >
            {copy.top} ↑
          </a>
        </div>
      </footer>
    </RevealSection>
  );
}
