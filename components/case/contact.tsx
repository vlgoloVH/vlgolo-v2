import Image from "next/image";
import type { Dictionary } from "@/lib/dictionaries";
import { SITE } from "@/lib/site";
import { RevealSection } from "@/components/layout/reveal-section";
import { ContactDialog } from "@/components/ui/contact-dialog";
import { GlassButton } from "@/components/ui/glass-button";

/** The end of a case, and the home page's closing shot, under the next
 *  case: the same desk after work, dimmed like the hero video, the question
 *  centred over it with the address above and the same two glass pills as on
 *  the home page. The copy rises in one line at a time; the site footer runs
 *  along the bottom. */
export function CaseContact({
  labels,
  dict,
}: {
  labels: Dictionary["caseStudy"]["contact"];
  dict: Dictionary;
}) {
  const copy = dict.contacts;
  return (
    <RevealSection id="contact" className="relative flex min-h-[70svh] flex-col overflow-hidden bg-bg">
      <Image
        id="case-contact-scene"
        src="/contact/workspace.jpg"
        alt={copy.scene}
        fill
        sizes="100vw"
        className="object-cover object-[72%_50%] opacity-[var(--video-dim)] md:object-right"
      />
      {/* Shade along the right edge, so the social icons stay readable. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[calc(var(--frame-line)*3)] bg-[linear-gradient(270deg,rgba(0,0,0,0.88),rgba(0,0,0,0.65)_33%,transparent)] md:block"
      />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-24 pt-14 text-center md:px-[var(--case-pad)]">
        <p className="reveal [--reveal-i:1] select-text text-[17px] font-medium tracking-[0.04em] text-ink/85 md:text-[22px]">
          {SITE.email}
        </p>
        <h2 className="reveal [--reveal-i:2] mt-5 max-w-[16em] text-balance text-[clamp(34px,4.4vw,76px)] font-bold leading-[1.19] tracking-[-0.002em] text-ink md:mt-6">{labels.headline}</h2>
        <p className="reveal [--reveal-i:4] mt-5 max-w-[28rem] text-balance text-[17px] leading-relaxed text-ink/75 md:mt-6 md:text-[20px]">
          {labels.body}
        </p>
        <div className="reveal [--reveal-i:6] mt-8 grid gap-4 sm:grid-cols-2 md:mt-10">
          <ContactDialog label={copy.email} copy={dict.contact} glassSource="#case-contact-scene" className="w-full" />
          <GlassButton href={SITE.resume} label={copy.resume} download videoSelector="#case-contact-scene" className="w-full" />
        </div>
      </div>

      {/* The site footer, as on the home page. */}
      <footer className="reveal [--reveal-i:8] absolute bottom-0 left-0 right-0 z-10 md:left-[var(--frame-line)] md:right-[var(--frame-line)]">
        <div className="flex items-center justify-between gap-4 border-t border-white/12 px-6 py-5 text-[11px] uppercase tracking-[0.2em] text-ink/45 md:px-[calc(var(--case-pad)-var(--frame-line))] md:py-7 md:text-[12px]">
          <p>
            © {new Date().getFullYear()} {dict.meta.name}
            <span className="hidden md:inline"> · {dict.meta.role}</span>
          </p>
          <a href="#intro" className="shrink-0 transition-colors duration-300 can-hover:text-ink">
            {copy.top} ↑
          </a>
        </div>
      </footer>
    </RevealSection>
  );
}
