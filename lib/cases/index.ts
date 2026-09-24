import type { CaseSlug } from "@/lib/site";
import { CASES } from "@/lib/site";
import type { Locale } from "@/lib/i18n";
import type { CaseCopy, CaseStudy } from "@/lib/cases/types";
import { smartcrowd } from "@/lib/cases/smartcrowd";
import { spaceNeedle } from "@/lib/cases/space-needle";
import { danMonFairwind } from "@/lib/cases/dan-mon-fairwind";
import { fozzyGroup } from "@/lib/cases/fozzy-group";
import { bitterbrains } from "@/lib/cases/bitterbrains";
import * as uk from "@/lib/cases/uk";

const STUDIES: Record<CaseSlug, CaseStudy> = {
  smartcrowd,
  "space-needle": spaceNeedle,
  "dan-mon-fairwind": danMonFairwind,
  "fozzy-group": fozzyGroup,
  bitterbrains,
};

const UK: Record<CaseSlug, CaseCopy> = {
  smartcrowd: uk.smartcrowd,
  "space-needle": uk.spaceNeedle,
  "dan-mon-fairwind": uk.danMonFairwind,
  "fozzy-group": uk.fozzyGroup,
  bitterbrains: uk.bitterbrains,
};

/** The English case with its words swapped for the translation. */
function localize(en: CaseStudy, copy: CaseCopy): CaseStudy {
  return {
    ...en,
    hero: copy.hero,
    context: { ...en.context, ...copy.context },
    role: copy.role,
    overview: { images: en.overview.images.map((image, i) => ({ ...image, alt: copy.overview[i] })) },
    chapters: en.chapters.map((chapter, i) => ({ ...chapter, ...copy.chapters[i] })),
    impact: copy.impact,
    reflection: copy.reflection,
  };
}

export function getCase(slug: string, locale: Locale) {
  const index = CASES.findIndex((item) => item.slug === slug);
  if (index < 0) return null;
  const card = CASES[index];
  const en = STUDIES[card.slug];
  const study = locale === "uk" ? localize(en, UK[card.slug]) : en;
  // In a ring, as on the current site: the last case leads back to the first.
  const next = CASES[(index + 1) % CASES.length];
  return { card, study, next };
}

export const CASE_SLUGS = CASES.map((item) => item.slug);
