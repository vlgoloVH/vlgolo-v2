import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { LOCALES, localizePath, type Locale } from "@/lib/i18n";
import { CASE_SLUGS, getCase } from "@/lib/cases";
import type { CASES } from "@/lib/site";
import { ScrollDriver } from "@/components/about/scroll-driver";
import { AboutRail } from "@/components/about/rail";
import { ExploreCursor } from "@/components/ui/explore-cursor";
import { CaseHero } from "@/components/case/hero";
import { CaseContext } from "@/components/case/context";
import { CaseRole } from "@/components/case/role";
import { CaseStack } from "@/components/case/stack";
import { CaseTransformation } from "@/components/case/transformation";
import { CaseImpact } from "@/components/case/impact";
import { CaseReflection } from "@/components/case/reflection";
import { CasePager, type PagerCase } from "@/components/case/pager";
import { CaseContact } from "@/components/case/contact";

type Params = Promise<{ lang: string; slug: string }>;

/** Section ids the rail follows, in page order. */
const SECTIONS = ["intro", "context", "role", "overview", "transformation", "impact", "reflection"];

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

/** A case study, in the order of the case studies on the current site:
 *  hero, context, my role, the overview images, the product transformation
 *  chapter by chapter, impact, reflection, then the previous and next case, a
 *  short way to get in touch and the footer. Every case runs this same page;
 *  each keeps its own look through its colour, its Context drawing and the
 *  way each chapter is staged, all set in its data (lib/cases). */
export default async function CasePage({ params }: { params: Params }) {
  const { lang, slug } = await params;
  const found = getCase(slug);
  if (!found) notFound();
  const { card, study, previous, next } = found;
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const labels = dict.caseStudy;

  const pagerCase = (item: (typeof CASES)[number]): PagerCase => ({
    href: localizePath(locale, item.href),
    title: item.title,
    lines: item.lines,
    cover: item.cover,
    tint: rgb(item.tint),
  });

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
      <CaseContext labels={labels.context} context={study.context} />
      <CaseRole labels={labels.role} role={study.role} />
      <CaseStack overview={study.overview} label={labels.overview.label} />
      <CaseTransformation labels={labels.transformation} overview={study.overview} chapters={study.chapters} />
      <CaseImpact labels={labels.impact} impact={study.impact} />
      <CaseReflection labels={labels.reflection} insights={study.reflection} />
      <CasePager
        labels={labels.pager}
        previous={previous.slug === card.slug ? null : pagerCase(previous)}
        next={next.slug === card.slug ? null : pagerCase(next)}
      />
      <CaseContact labels={labels.contact} form={dict.contact} />

      {/* The home page's footer. */}
      <footer className="relative md:mx-[var(--frame-line)]">
        <div className="flex items-center justify-between gap-4 border-t border-white/12 px-6 py-5 text-[11px] uppercase tracking-[0.2em] text-ink/45 md:px-[clamp(32px,5vw,104px)] md:py-7 md:text-[12px]">
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
