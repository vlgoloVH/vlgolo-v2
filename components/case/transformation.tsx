import type { Dictionary } from "@/lib/dictionaries";
import type { CaseStudy } from "@/lib/cases/types";
import { SectionTitle } from "@/components/case/title";
import { Words } from "@/components/about/words";
import { CaseChapter } from "@/components/case/chapters";

/** Product Transformation: the section's name, the line from the current site
 *  that frames it, an index of the chapters to jump to, then the chapters in
 *  their original order, each staged its own way (see ChapterLayout). */
export function CaseTransformation({
  labels,
  overview,
  chapters,
}: {
  labels: Dictionary["caseStudy"]["transformation"];
  overview: CaseStudy["overview"];
  chapters: CaseStudy["chapters"];
}) {
  const [first, ...rest] = labels.label.split(" ");
  return (
    <section id="transformation" className="relative">
      <header className="relative px-6 pb-[4vh] pt-[16vh] md:px-[var(--frame-pad)] md:pt-[22vh]">
        <SectionTitle index={5}>{`${first}\n${rest.join(" ")}`}</SectionTitle>
        <div className="mt-12 grid gap-12 md:mt-[8vh] md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-[5vw]">
          <p className="max-w-[18em] text-[clamp(28px,3.2vw,58px)] font-bold leading-[1.05] tracking-[-0.035em] text-ink">
            <Words text={overview.tagline} />
          </p>
          <ol className="self-end border-t border-white/12">
            {chapters.map((chapter, i) => (
              <li key={chapter.name} className="border-b border-white/12">
                <a
                  href={`#chapter-${i + 1}`}
                  className="group flex items-baseline gap-5 py-4 text-[16px] text-ink/65 transition-colors duration-300 can-hover:text-ink md:text-[18px]"
                >
                  <span className="font-mono text-[11px] tracking-[0.2em] text-ink/40">{String(i + 1).padStart(2, "0")}</span>
                  <span className="transition-transform duration-500 ease-[var(--ease-soft)] group-can-hover:translate-x-2">
                    {chapter.name}
                  </span>
                  <span aria-hidden="true" className="ml-auto text-ink/35 transition-transform duration-500 group-can-hover:translate-y-0.5">
                    ↓
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </header>
      {chapters.map((chapter, i) => (
        <CaseChapter key={chapter.name} chapter={chapter} number={i + 1} label={labels.chapter} />
      ))}
    </section>
  );
}
