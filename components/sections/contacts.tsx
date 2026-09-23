import Image from "next/image";
import type { Dictionary } from "@/lib/dictionaries";
import { SITE, SOCIAL_LINKS } from "@/lib/site";
import { RevealSection } from "@/components/layout/reveal-section";
import { ContactDialog } from "@/components/ui/contact-dialog";
import { GlassButton } from "@/components/ui/glass-button";

const LINKEDIN = SOCIAL_LINKS.find((link) => link.label === "LinkedIn")!.href;

/** The last slide, and the hero's closing shot: the same desk after work, the
 *  chair pushed back, the screen still on. The picture fills the frame with the
 *  desk on the right, and the dark room on the left carries the words. The
 *  entrance is the calmest on the page: the copy rises in, one line at a time,
 *  and the picture simply stays still. */
export function Contacts({ dict }: { dict: Dictionary }) {
  const copy = dict.contacts;

  return (
    <RevealSection
      id="contacts"
      className="section-slide relative z-40 overflow-hidden bg-bg"
    >
      <Image
        src="/contact/workspace.jpg"
        alt={copy.scene}
        fill
        sizes="100vw"
        className="object-cover object-[72%_50%] md:object-right"
      />

      {/* Only enough shade on the left to lift the type off the room. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.55),rgba(0,0,0,0.3)_40%,transparent_62%)] max-md:bg-[linear-gradient(180deg,rgba(0,0,0,0.55),rgba(0,0,0,0.25)_55%,rgba(0,0,0,0.5))]"
      />

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
          {copy.rail}
        </span>
      </div>

      <div className="relative z-10 flex h-full flex-col justify-center px-6 pb-24 pt-28 md:px-[var(--frame-pad)] md:pb-0 md:pt-0">
        <h2 className="reveal [--reveal-i:2] text-[clamp(40px,5vw,76px)] font-bold leading-[1.04] tracking-[-0.025em] text-ink">
          {copy.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        <p className="reveal [--reveal-i:4] mt-6 max-w-[26rem] text-[17px] leading-relaxed text-ink/75 md:mt-8 md:text-[20px]">
          {copy.body}
        </p>

        <div className="reveal [--reveal-i:6] mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center md:mt-14">
          <ContactDialog label={copy.email} copy={dict.contact} />
          <GlassButton href={LINKEDIN} label={copy.linkedin} newTab videoSelector={null} />
        </div>

        <a
          href={`mailto:${SITE.email}`}
          className="reveal [--reveal-i:7] mt-6 self-start text-[14px] tracking-[0.02em] text-ink/50 transition-colors duration-300 can-hover:text-ink"
        >
          {SITE.email}
        </a>
      </div>

      <p className="reveal [--reveal-i:8] absolute bottom-8 left-6 right-6 text-[11px] uppercase tracking-[0.24em] text-ink/40 md:bottom-10 md:left-[var(--frame-pad)] md:text-[12px]">
        {copy.availability}
      </p>
    </RevealSection>
  );
}
