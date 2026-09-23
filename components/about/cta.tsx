import type { Dictionary } from "@/lib/dictionaries";
import { SITE } from "@/lib/site";
import { ContactDialog } from "@/components/ui/contact-dialog";
import { GlassButton } from "@/components/ui/glass-button";

/** 08 · The close. Plain on purpose after all the motion above: the headline,
 *  the resume with a faint light running round its outline, and the way to
 *  get in touch. Then the site footer. */
export function AboutCta({
  copy,
  contact,
  meta,
  top,
}: {
  copy: Dictionary["aboutPage"]["cta"];
  contact: Dictionary["contact"];
  meta: Dictionary["meta"];
  top: string;
}) {
  return (
    <>
      <section data-p className="relative px-6 pb-[16vh] pt-[18vh] text-center md:px-[var(--frame-pad)] md:pb-[20vh] md:pt-[24vh]">
        <h2 className="ab-cta-title mx-auto max-w-[14em] text-[clamp(40px,5.8vw,112px)] font-bold leading-[1.02] tracking-[-0.035em] text-ink">
          {copy.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        <div className="mt-14 flex justify-center md:mt-16">
          <span className="ab-orbit relative inline-flex">
            {/* A short light travels round a hairline just outside the
                button (see .ab-orbit). */}
            <GlassButton href={SITE.resume} label={copy.resume} download videoSelector={null} />
          </span>
        </div>

        <p className="mx-auto mt-14 max-w-[26rem] text-[17px] leading-relaxed text-ink/60 md:text-[19px]">
          {copy.body}
        </p>
        <ContactDialog label={copy.contact} copy={contact} className="mt-8" />
      </section>

      <footer className="relative border-t border-white/12 md:mx-[var(--frame-line)]">
        <div className="flex items-center justify-between gap-4 px-6 py-5 text-[11px] uppercase tracking-[0.2em] text-ink/45 md:px-[clamp(32px,5vw,104px)] md:py-7 md:text-[12px]">
          <p>
            © {new Date().getFullYear()} {meta.name}
            <span className="hidden md:inline"> · {meta.role}</span>
          </p>
          <a href="#intro" className="shrink-0 transition-colors duration-300 can-hover:text-ink">
            {top} ↑
          </a>
        </div>
      </footer>
    </>
  );
}
