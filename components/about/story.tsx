import Image from "next/image";
import type { Dictionary } from "@/lib/dictionaries";
import { ABOUT_PAGE } from "@/lib/site";
import { Words } from "@/components/about/words";

/** 02 · Story. A layered spread rather than a timeline: the wide photo sits
 *  behind the headline and drifts slowly, the portrait sits in front of it
 *  and moves faster, and oversized fragments slide sideways underneath. The
 *  paragraph lights up word by word, then the path from art to product
 *  ownership lights up step by step. */
export function AboutStory({ copy }: { copy: Dictionary["aboutPage"]["story"] }) {
  const [desk, portrait] = ABOUT_PAGE.story;
  const [year, years, craft] = copy.fragments;

  return (
    <section id="story" data-section className="relative py-[16vh] md:py-[20vh]">
      <div data-p className="relative px-6 md:px-[var(--frame-pad)]">
        <p className="ab-label">
          <span>02</span>
          {copy.label}
        </p>

        {/* Fragments: under everything, sliding the opposite way to each other. */}
        <span aria-hidden="true" className="ab-slide ab-fragment [--dir:-1] absolute left-[4%] top-[6%]">
          {year}
        </span>
        <span aria-hidden="true" className="ab-slide ab-fragment [--dir:1] absolute bottom-[26%] right-[2%] hidden md:block">
          {years}
        </span>

        <div className="relative mt-14 md:mt-20 md:min-h-[128vh]">
          {/* Behind the headline. */}
          <div className="ab-par [--speed:90] relative z-0 md:absolute md:right-0 md:top-[4vh] md:w-[60%]">
            <div className="ab-reveal-img overflow-hidden">
              <Image
                src={desk.src}
                alt={copy.images[0]}
                width={desk.width}
                height={desk.height}
                sizes="(min-width: 768px) 55vw, 90vw"
                className="ab-img h-auto w-full"
              />
            </div>
          </div>

          <h2 className="ab-par [--speed:-40] relative z-10 mt-10 text-[clamp(52px,8.4vw,160px)] font-bold leading-[0.95] tracking-[-0.035em] text-ink md:absolute md:left-0 md:top-[30vh] md:mt-0">
            {copy.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          {/* In front of the headline, and quicker than it. */}
          <div className="ab-par [--speed:-190] relative z-20 mt-10 w-[62%] md:absolute md:left-[26%] md:top-[56vh] md:mt-0 md:w-[22%]">
            <div className="ab-reveal-img overflow-hidden [--at:0.14]">
              <Image
                src={portrait.src}
                alt={copy.images[1]}
                width={portrait.width}
                height={portrait.height}
                sizes="(min-width: 768px) 22vw, 60vw"
                className="ab-img h-auto w-full"
              />
            </div>
          </div>

          <p className="relative z-10 mt-12 max-w-[26rem] text-[20px] leading-[1.6] text-ink md:absolute md:bottom-[6vh] md:right-[4%] md:mt-0 md:text-[24px]">
            <Words text={copy.body} />
          </p>
        </div>
      </div>

      {/* The path. Each step brightens in turn as the row comes up. */}
      <div data-p className="relative mt-[12vh] px-6 md:px-[var(--frame-pad)]">
        <span aria-hidden="true" className="ab-slide ab-fragment ab-fragment--sm [--dir:1] absolute -top-[6vh] left-[20%]">
          {craft}
        </span>
        <ol className="ab-path relative flex flex-col gap-3 md:flex-row md:flex-wrap md:items-baseline md:gap-x-4 md:gap-y-3">
          {copy.path.map((step, i) => (
            <li
              key={step}
              style={{ "--i": i, "--n": copy.path.length } as React.CSSProperties}
              className="flex items-baseline gap-4 text-[clamp(22px,2.4vw,40px)] font-medium tracking-[-0.02em]"
            >
              {i > 0 && (
                <span aria-hidden="true" className="hidden font-light text-ink/40 md:inline">
                  →
                </span>
              )}
              <span className="font-mono text-[11px] tracking-[0.2em] text-ink/50 md:hidden">
                {String(i + 1).padStart(2, "0")}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
