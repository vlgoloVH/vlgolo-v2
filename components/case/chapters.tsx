"use client";

import Image from "next/image";
import type { Chapter } from "@/lib/cases/types";
import { Track } from "@/components/case/track";

interface Props {
  chapter: Chapter;
  /** 1-based position on the page. */
  number: number;
  label: string;
}

function Heading({ chapter, number, label, className = "" }: Props & { className?: string }) {
  return (
    <div className={className}>
      <p className="flex items-baseline gap-4 font-mono text-[11px] uppercase tracking-[0.24em] text-ink/50">
        <span className="cs-accent">{String(number).padStart(2, "0")}</span>
        <span aria-hidden="true" className="h-px w-8 translate-y-[-0.3em] bg-white/30" />
        <span className="text-ink/80">{chapter.name}</span>
        <span className="sr-only">{label}</span>
      </p>
      <h3 className="mt-6 max-w-[14em] text-[clamp(34px,4vw,76px)] font-bold leading-[1] tracking-[-0.035em] text-ink">
        {chapter.title}
      </h3>
      <p className="mt-6 max-w-[34rem] text-[17px] leading-[1.7] text-ink/70 md:mt-8 md:text-[19px]">
        {chapter.description}
      </p>
    </div>
  );
}

function Visual({ chapter, sizes, className = "" }: { chapter: Chapter; sizes: string; className?: string }) {
  return (
    <Image
      src={chapter.visual}
      alt={chapter.title}
      width={1200}
      height={1440}
      sizes={sizes}
      className={`h-auto w-full ${className}`}
    />
  );
}

/** Pinned screen, points lit one by one beside it as each passes the middle
 *  of the screen. */
function StickyChapter(props: Props) {
  const { chapter } = props;
  return (
    <div className="grid gap-12 px-6 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] md:gap-[6vw] md:px-[var(--frame-pad)]">
      <div className="md:sticky md:top-[12svh] md:h-[76svh]">
        <div data-p className="cs-sticky-visual h-full overflow-hidden rounded-[clamp(12px,1.2vw,20px)]">
          <Visual chapter={chapter} sizes="(min-width: 768px) 45vw, 90vw" className="md:h-full md:object-cover" />
        </div>
      </div>
      <div className="md:py-[18vh]">
        <Heading {...props} />
        <ol className="mt-12 md:mt-[14vh]">
          {chapter.points.map((point, i) => (
            <li
              key={point}
              data-p
              className="cs-point flex gap-5 border-t border-white/10 py-7 text-[18px] leading-[1.5] text-ink md:min-h-[22vh] md:items-center md:py-0 md:text-[24px]"
            >
              <span className="font-mono text-[11px] tracking-[0.2em] text-ink/40">{String(i + 1).padStart(2, "0")}</span>
              {point}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/** A long strip of screens sliding sideways while the section is pinned; the
 *  captions ride underneath at a slower pace. */
function StripChapter(props: Props) {
  const { chapter } = props;
  const strip = chapter.strip!;
  const ratio = strip.width / strip.height;
  return (
    <>
      <Heading {...props} className="px-6 md:px-[var(--frame-pad)]" />
      <Track className="cs-strip relative mt-[8vh] md:h-[320vh]" style={{ "--ratio": ratio } as React.CSSProperties}>
        <div className="relative overflow-hidden py-[6vh] md:sticky md:top-0 md:flex md:h-[100svh] md:flex-col md:justify-center md:py-0">
          <div className="cs-strip-rail">
            <Image
              src={strip.src}
              alt={chapter.title}
              width={strip.width}
              height={strip.height}
              sizes="400vw"
              className="h-full w-auto max-w-none"
            />
          </div>
          <ol className="cs-strip-points mt-10 flex gap-10 px-6 md:px-[var(--frame-pad)]">
            {chapter.points.map((point, i) => (
              <li key={point} className="w-[min(78vw,340px)] shrink-0 text-[16px] leading-[1.55] text-ink/75">
                <span className="mb-3 block font-mono text-[11px] tracking-[0.2em] text-ink/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {point}
              </li>
            ))}
          </ol>
        </div>
      </Track>
    </>
  );
}

/** The points as the steps of one flow: a line draws down through them and
 *  each step lights as the line reaches it. */
function FlowChapter(props: Props) {
  const { chapter } = props;
  const n = chapter.points.length;
  return (
    <div className="grid gap-14 px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-[6vw] md:px-[var(--frame-pad)]">
      <div>
        <Heading {...props} />
        <div data-p className="mt-12 md:mt-16">
          <div className="ab-par [--speed:-70] overflow-hidden rounded-[clamp(12px,1.2vw,20px)]">
            <div className="ab-reveal-img">
              <Visual chapter={chapter} sizes="(min-width: 768px) 40vw, 90vw" className="ab-img" />
            </div>
          </div>
        </div>
      </div>
      <ol data-p className="cs-flow relative self-center" style={{ "--n": n } as React.CSSProperties}>
        <span aria-hidden="true" className="absolute bottom-6 left-[11px] top-6 w-px bg-white/12">
          <span className="cs-flow-line absolute inset-0 origin-top bg-white/70" />
        </span>
        {chapter.points.map((point, i) => (
          <li
            key={point}
            className="cs-flow-step relative flex gap-7 py-6 text-[18px] leading-[1.5] text-ink md:py-8 md:text-[23px]"
            style={{ "--i": i } as React.CSSProperties}
          >
            <span aria-hidden="true" className="cs-flow-dot relative mt-[0.3em] h-[23px] w-[23px] shrink-0 rounded-full border border-white/40" />
            {point}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** A large screen drifting slowly behind the words. */
function BackdropChapter(props: Props) {
  const { chapter } = props;
  return (
    <div data-p className="relative md:min-h-[150vh]">
      <div className="ab-par [--speed:260] relative px-6 md:absolute md:right-[var(--frame-pad)] md:top-0 md:w-[54%] md:px-0">
        <div className="cs-backdrop-img overflow-hidden rounded-[clamp(12px,1.2vw,20px)]">
          <Visual chapter={chapter} sizes="(min-width: 768px) 58vw, 90vw" />
        </div>
      </div>
      <div className="relative z-10 px-6 pt-12 md:px-[var(--frame-pad)] md:pt-[34vh]">
        <div className="cs-backdrop-copy md:max-w-[46%] md:py-10 md:pr-10">
          <Heading {...props} />
          <ul className="mt-10 grid gap-x-10 gap-y-5 text-[16px] leading-[1.55] text-ink/75 md:mt-12 md:text-[17px]">
            {chapter.points.map((point) => (
              <li key={point} className="flex gap-4">
                <span aria-hidden="true" className="mt-[0.65em] h-px w-4 shrink-0 bg-white/40" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/** The screen opens out from a narrow vertical slit, then the points follow
 *  in three columns. */
function RevealChapter(props: Props) {
  const { chapter } = props;
  return (
    <div className="px-6 md:px-[var(--frame-pad)]">
      <Heading {...props} />
      <div data-p className="mt-14 flex justify-center md:mt-20">
        <div className="cs-slit w-full overflow-hidden rounded-[clamp(12px,1.2vw,20px)] md:w-[62%]">
          <Visual chapter={chapter} sizes="(min-width: 768px) 60vw, 90vw" className="cs-slit-img" />
        </div>
      </div>
      <ol className="mt-14 grid gap-x-10 gap-y-8 md:mt-20 md:grid-cols-3">
        {chapter.points.map((point, i) => (
          <li key={point} className="border-t border-white/12 pt-5 text-[16px] leading-[1.55] text-ink/75 md:text-[17px]">
            <span className="mb-3 block font-mono text-[11px] tracking-[0.2em] text-ink/40">
              {String(i + 1).padStart(2, "0")}
            </span>
            {point}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** The room takes on the case's colour and the screen comes forward while
 *  the points change one at a time in large type, like a product being
 *  walked through on stage. */
function FocusChapter(props: Props) {
  const { chapter } = props;
  const n = chapter.points.length;
  return (
    <Track steps={n} className="cs-focus relative md:h-[calc(var(--n)*62vh+100vh)]" style={{ "--n": n } as React.CSSProperties}>
      {(active) => (
        <div className="relative md:sticky md:top-0 md:h-[100svh] md:overflow-hidden">
          <div aria-hidden="true" className="cs-focus-bg absolute inset-0 hidden md:block" />
          <div className="relative grid h-full gap-12 px-6 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:items-center md:gap-[5vw] md:px-[var(--frame-pad)]">
            <div className="flex flex-col">
              <Heading {...props} />
              {/* Desktop: one point at a time, with its place in the list. */}
              <div className="mt-[6svh] hidden md:block">
                <div className="flex gap-1.5">
                  {chapter.points.map((point, i) => (
                    <span key={point} className="h-[2px] flex-1 overflow-hidden bg-white/15">
                      <span className={`block h-full origin-left bg-white transition-transform duration-700 ease-[var(--ease-soft)] ${i <= active ? "scale-x-100" : "scale-x-0"}`} />
                    </span>
                  ))}
                </div>
                <div className="mt-6 grid">
                  {chapter.points.map((point, i) => (
                    <p
                      key={point}
                      className={`cs-beat col-start-1 row-start-1 text-[clamp(22px,2vw,34px)] font-medium leading-[1.25] tracking-[-0.02em] text-ink ${i === active ? "is-on" : ""}`}
                    >
                      {point}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="cs-focus-visual w-full">
              <div className="overflow-hidden rounded-[clamp(12px,1.2vw,20px)] shadow-[0_50px_100px_-40px_rgba(0,0,0,0.9)] md:ml-auto md:aspect-[5/6] md:w-[min(calc(78svh*5/6),100%)]">
                <Visual chapter={chapter} sizes="(min-width: 768px) 45vw, 90vw" className="md:h-full md:object-cover" />
              </div>
            </div>
            {/* Phone: the points as a list. */}
            <ol className="flex flex-col md:hidden">
              {chapter.points.map((point, i) => (
                <li key={point} className="flex gap-5 border-t border-white/10 py-5 text-[17px] leading-[1.5] text-ink">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-ink/40">{String(i + 1).padStart(2, "0")}</span>
                  {point}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </Track>
  );
}

export function CaseChapter(props: Props) {
  const Layout = {
    sticky: StickyChapter,
    strip: StripChapter,
    flow: FlowChapter,
    backdrop: BackdropChapter,
    reveal: RevealChapter,
    focus: FocusChapter,
  }[props.chapter.layout];
  // A pinned stage brings its own air; the others get it around them.
  const pad = props.chapter.layout === "focus" ? "py-[14vh] md:py-0" : "py-[14vh] md:py-[18vh]";
  return (
    <article id={`chapter-${props.number}`} className={`relative ${pad}`}>
      <Layout {...props} />
    </article>
  );
}
