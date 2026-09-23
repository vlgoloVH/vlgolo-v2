import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { getDictionary } from "@/lib/dictionaries";
import { LOCALES, localizePath, type Locale } from "@/lib/i18n";
import { CASE_SLUGS, getCase } from "@/lib/cases";
import { ScrollDriver } from "@/components/about/scroll-driver";
import { AboutRail } from "@/components/about/rail";
import { ExploreCursor } from "@/components/ui/explore-cursor";
import { CaseHero } from "@/components/case/hero";
import { CaseQuick } from "@/components/case/quick";
import { CaseContext } from "@/components/case/context";
import { CaseRole } from "@/components/case/role";
import { CaseChallenge } from "@/components/case/challenge";
import { CaseChapter } from "@/components/case/chapters";
import { CaseMoment } from "@/components/case/moment";
import { CaseSystem } from "@/components/case/system";
import { CaseImpact } from "@/components/case/impact";
import { CaseReflection } from "@/components/case/reflection";
import { CaseNext } from "@/components/case/next";

type Params = Promise<{ lang: string; slug: string }>;

/** Section ids the rail follows, in page order. */
const SECTIONS = ["intro", "context", "role", "challenge", "solution", "system", "impact"];

const rgb = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
};

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => CASE_SLUGS.map((slug) => ({ lang, slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params;
  const found = getCase(slug);
  if (!found) return {};
  const path = `/cases/${slug}`;
  return {
    title: found.card.title,
    description: found.study.hero.statement,
    alternates: {
      canonical: localizePath(lang as Locale, path),
      languages: { en: path, uk: `/uk${path}`, "x-default": path },
    },
  };
}

/** A case study as a documentary: every case runs the same story (intro,
 *  context, role, challenge, the chapters of the solution with visual pauses
 *  between them, the system behind it, impact, reflection, next case), and
 *  each keeps its own look through its colour, its drawings and the way each
 *  chapter is staged, all set in its data (lib/cases). */
export default async function CasePage({ params }: { params: Params }) {
  const { lang, slug } = await params;
  const found = getCase(slug);
  if (!found) notFound();
  const { card, study, next } = found;
  const dict = getDictionary(lang as Locale);
  const labels = dict.caseStudy;

  const momentsAfter = (index: number) => study.moments.filter((m) => m.after === index);

  return (
    <div className="case-page relative bg-surface" style={{ "--tint": rgb(card.tint) } as React.CSSProperties}>
      <ScrollDriver />
      <AboutRail ids={SECTIONS} names={labels.nav} label={card.title} />
      <ExploreCursor />

      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[5] hidden md:block">
        <span className="absolute inset-y-0 left-[var(--frame-line)] w-px bg-white/12" />
        <span className="absolute inset-y-0 right-[var(--frame-line)] w-px bg-white/12" />
      </div>
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[45] h-28 bg-gradient-to-b from-black/70 to-transparent" />

      <CaseHero title={card.title} lines={card.lines} cover={`/cases/${slug}/hero.webp`} study={study} />
      <CaseQuick labels={labels.quick} summary={study.summary} />
      <CaseContext labels={labels.context} context={study.context} />
      <CaseRole labels={labels.role} role={study.role} />
      <CaseChallenge labels={labels.challenge} challenge={study.challenge} />

      <section id="solution" className="relative">
        {momentsAfter(-1).map((m) => (
          <CaseMoment key={m.src} moment={m} />
        ))}
        {study.chapters.map((chapter, i) => (
          <Fragment key={chapter.name}>
            <CaseChapter chapter={chapter} number={i + 1} label={labels.chapter} />
            {momentsAfter(i).map((m) => (
              <CaseMoment key={m.src} moment={m} />
            ))}
          </Fragment>
        ))}
      </section>

      <CaseSystem system={study.system} />
      <CaseImpact labels={labels.impact} impact={study.impact} />
      <CaseReflection labels={labels.reflection} insights={study.reflection} />
      <CaseNext
        labels={labels.next}
        href={localizePath(lang as Locale, next.href)}
        title={next.title}
        lines={next.lines}
        cover={next.cover}
        tint={rgb(next.tint)}
      />

      <footer className="relative border-t border-white/12 md:mx-[var(--frame-line)]">
        <div className="flex items-center justify-between gap-4 px-6 py-5 text-[11px] uppercase tracking-[0.2em] text-ink/45 md:px-[clamp(32px,5vw,104px)] md:py-7 md:text-[12px]">
          <p>
            © {new Date().getFullYear()} {dict.meta.name}
            <span className="hidden md:inline"> · {dict.meta.role}</span>
          </p>
          <a href="#intro" className="shrink-0 transition-colors duration-300 can-hover:text-ink">
            {dict.contacts.top} ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
