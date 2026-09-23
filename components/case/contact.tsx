import type { Dictionary } from "@/lib/dictionaries";
import { SOCIAL_LINKS } from "@/lib/site";
import { ContactDialog } from "@/components/ui/contact-dialog";
import { GlassButton } from "@/components/ui/glass-button";

/** A short way to get in touch at the end of a case: one question, one line,
 *  the same two glass pills as elsewhere. Deliberately smaller than the
 *  contact scene on the home page. */
export function CaseContact({
  labels,
  form,
}: {
  labels: Dictionary["caseStudy"]["contact"];
  form: Dictionary["contact"];
}) {
  const linkedin = SOCIAL_LINKS.find((link) => link.label === "LinkedIn")!;
  return (
    <section
      id="contact"
      className="relative flex min-h-[48svh] flex-col items-center justify-center border-t border-white/12 px-6 py-[12vh] text-center md:px-[var(--frame-pad)]"
    >
      <div data-p className="cs-contact flex flex-col items-center">
        <h2 className="max-w-[16em] text-balance text-[clamp(32px,4.2vw,78px)] font-bold leading-[1] tracking-[-0.04em] text-ink">
          {labels.headline}
        </h2>
        <p className="mt-5 text-[17px] text-ink/65 md:text-[19px]">{labels.body}</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <ContactDialog label={labels.email} copy={form} className="w-full" />
          <GlassButton href={linkedin.href} label={labels.linkedin} newTab videoSelector={null} className="w-full" />
        </div>
      </div>
    </section>
  );
}
