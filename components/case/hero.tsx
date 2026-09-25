import Image from "next/image";
import type { CaseStudy } from "@/lib/cases/types";
import { Track } from "@/components/case/track";

/** The opening shot. The mockup starts tipped back and cropped by the
 *  bottom of the screen; as the page scrolls it rights itself, settles into
 *  frame and scales down, while the title runs ahead and the details fade, and
 *  the room takes on the case's colour. It reads as the product opening the
 *  story rather than a picture under a heading. */
export function CaseHero({
  title,
  lines,
  cover,
  study,
}: {
  title: string;
  lines: readonly string[];
  cover: string;
  study: CaseStudy;
}) {
  return (
    <Track id="intro" className="cs-hero relative md:h-[190vh]">
      <div className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden py-24 md:sticky md:top-0 md:h-[100svh] md:justify-start md:py-0">
        <div aria-hidden="true" className="cs-hero-bg absolute inset-0" />
        <div aria-hidden="true" className="ab-grain pointer-events-none absolute inset-0" />

        <div className="cs-hero-copy relative z-10 px-6 text-center md:px-[var(--case-pad)] md:pt-[15svh] md:text-left">
          <h1 aria-label={title} className="text-[clamp(56px,8.4vw,160px)] font-bold uppercase leading-[0.84] tracking-[-0.045em] text-ink">
            {lines.map((line, i) => (
              <span key={line} aria-hidden="true" className="block overflow-hidden pb-[0.04em]">
                <span className="ab-load ab-mask block" style={{ "--d": `${0.55 + i * 0.14}s` } as React.CSSProperties}>
                  {line}
                </span>
              </span>
            ))}
          </h1>
          {/* The statement with the details under it, so a longer statement
              (the Ukrainian ones) pushes the details down instead of running
              into them. */}
          <div className="mt-6 md:absolute md:right-[var(--case-pad)] md:top-[15svh] md:mt-0 md:w-[25rem]">
            <p className="ab-load ab-rise [--d:1.1s] mx-auto max-w-[26rem] text-[18px] leading-[1.5] text-ink/80 md:mx-0 md:text-[21px]">
              {study.hero.statement}
            </p>
            <ul className="cs-hero-meta ab-load ab-rise [--d:1.35s] mt-6 flex flex-wrap justify-center gap-x-8 gap-y-2 font-mono text-[12px] uppercase tracking-[0.16em] text-ink/85 md:mt-8 md:flex-col md:justify-start md:gap-y-2.5 md:text-[14px]">
              {study.hero.meta.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="cs-hero-visual relative z-0 mt-8 flex items-start justify-center px-6 md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:h-[78svh] md:px-[var(--case-pad)]">
          <div className="ab-load ab-rise-soft [--d:0.2s] w-full">
            <div className="cs-hero-mock overflow-hidden rounded-[clamp(12px,1.4vw,24px)] shadow-[0_60px_120px_-40px_rgba(0,0,0,0.8)]">
              <Image
                src={cover}
                alt={title}
                width={2560}
                height={1280}
                priority
                sizes="(min-width: 768px) 80vw, 100vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </Track>
  );
}
