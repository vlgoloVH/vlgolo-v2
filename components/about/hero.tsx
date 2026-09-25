import Image from "next/image";
import type { Dictionary } from "@/lib/dictionaries";
import { ABOUT_PAGE, SITE } from "@/lib/site";
import { Track } from "@/components/case/track";

/** The opening shot, built like a case hero: the headline masks in line by
 *  line with the resume ring beside it, and the wide photo starts tipped back
 *  and cropped by the bottom of the screen. As the page scrolls the photo
 *  rights itself, settles into frame and scales down while the words run
 *  ahead and fade. On a phone, like a case hero, everything is centred. */
export function AboutHero({ copy }: { copy: Dictionary["aboutPage"]["hero"] }) {
  const { cover } = ABOUT_PAGE;

  return (
    <Track id="intro" className="cs-hero relative md:h-[190vh]">
      <div className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden py-24 md:sticky md:top-0 md:h-[100svh] md:justify-start md:py-0">
        <div aria-hidden="true" className="cs-hero-bg absolute inset-0" />
        <div aria-hidden="true" className="ab-grain pointer-events-none absolute inset-0" />

        <div className="cs-hero-copy relative z-10 px-6 text-center md:px-[var(--case-pad)] md:pt-[15svh] md:text-left">
          <p className="ab-load ab-rise [--d:0.4s] flex items-center justify-center gap-3 font-mono text-[12px] uppercase tracking-[0.2em] text-ink/70 md:justify-start md:text-[13px]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-[status-pulse_2.8s_ease-out_infinite] rounded-full bg-[#4ade80]" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ade80]" />
            </span>
            {copy.status}
          </p>
          <h1
            aria-label={copy.headline.join(" ")}
            className="mt-6 text-[clamp(44px,5.6vw,108px)] font-bold uppercase leading-[0.86] tracking-[-0.045em] text-ink md:mt-8"
          >
            {copy.headline.map((line, i) => (
              <span key={line} aria-hidden="true" className="block overflow-hidden pb-[0.04em]">
                <span className="ab-load ab-mask block" style={{ "--d": `${0.55 + i * 0.14}s` } as React.CSSProperties}>
                  {line}
                </span>
              </span>
            ))}
          </h1>

          {/* The resume: a ring of words turning round a glass button. */}
          <a
            href={SITE.resume}
            download
            aria-label={copy.resume}
            className="ab-load ab-rise [--d:1.2s] group mt-10 hidden h-44 w-44 items-center justify-center md:absolute md:right-[var(--case-pad)] md:top-[15svh] md:mt-0 md:flex"
          >
            <svg aria-hidden="true" viewBox="0 0 200 200" className="ab-ring absolute inset-0 h-full w-full text-ink/60">
              <defs>
                <path id="ab-ring-path" d="M 100,100 m -84,0 a 84,84 0 1,1 168,0 a 84,84 0 1,1 -168,0" fill="none" />
              </defs>
              <text fill="currentColor" className="font-mono text-[12.5px] uppercase tracking-[0.25em]">
                {/* Twice round, spaced to close the circle exactly. */}
                <textPath href="#ab-ring-path" textLength={526} lengthAdjust="spacing">
                  {`${copy.resume} • ${copy.resume} • `}
                </textPath>
              </text>
            </svg>
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 text-ink backdrop-blur-md transition-colors duration-500 ease-[var(--ease-soft)] group-can-hover:bg-white group-can-hover:text-black">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4v12M6 11l6 6 6-6M5 20h14" />
              </svg>
            </span>
          </a>
        </div>

        <div className="cs-hero-visual relative z-0 mt-14 flex items-start justify-center px-6 md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:h-[68svh] md:px-[var(--case-pad)]">
          <div className="ab-load ab-rise-soft [--d:0.2s] w-full">
            <div className="cs-hero-mock overflow-hidden rounded-[clamp(12px,1.4vw,24px)] shadow-[0_60px_120px_-40px_rgba(0,0,0,0.8)]">
              <Image
                src={cover.src}
                alt={copy.cover}
                width={cover.width}
                height={cover.height}
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
