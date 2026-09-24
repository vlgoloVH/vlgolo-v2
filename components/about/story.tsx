import type { Dictionary } from "@/lib/dictionaries";
import { SectionTitle } from "@/components/case/title";
import { Words } from "@/components/about/words";

/** About me, laid out like a case's My role: the title on the left, the
 *  story on the right. The opening paragraph is set large and lights up word
 *  by word as it is read; the rest follows in the quieter body size. */
export function AboutStory({ copy }: { copy: Dictionary["aboutPage"]["story"] }) {
  const [lead, ...rest] = copy.body;

  return (
    <section id="about-me" className="relative px-6 py-[14vh] md:px-[var(--case-pad)] md:py-[18vh]">
      <div className="grid gap-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-[6vw]">
        <SectionTitle>{copy.label}</SectionTitle>
        <div className="md:pt-[0.4em]">
          <p className="text-[20px] font-medium leading-[1.5] tracking-[-0.01em] text-ink md:text-[clamp(20px,1.6vw,26px)]">
            <Words text={lead} />
          </p>
          {rest.map((paragraph) => (
            <p
              key={paragraph}
              data-p
              className="ab-para mt-6 text-[16px] leading-[1.7] text-ink/60 md:text-[clamp(16px,1.15vw,18px)]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
