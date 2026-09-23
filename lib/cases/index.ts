import type { CaseSlug } from "@/lib/site";
import { CASES } from "@/lib/site";
import type { CaseStudy } from "@/lib/cases/types";
import { smartcrowd } from "@/lib/cases/smartcrowd";
import { spaceNeedle } from "@/lib/cases/space-needle";
import { danMonFairwind } from "@/lib/cases/dan-mon-fairwind";
import { fozzyGroup } from "@/lib/cases/fozzy-group";
import { bitterbrains } from "@/lib/cases/bitterbrains";

const STUDIES: Record<CaseSlug, CaseStudy> = {
  smartcrowd,
  "space-needle": spaceNeedle,
  "dan-mon-fairwind": danMonFairwind,
  "fozzy-group": fozzyGroup,
  bitterbrains,
};

export function getCase(slug: string) {
  const index = CASES.findIndex((item) => item.slug === slug);
  if (index < 0) return null;
  const card = CASES[index];
  // In a ring, as on the current site: the first case's previous is the last.
  const previous = CASES[(index - 1 + CASES.length) % CASES.length];
  const next = CASES[(index + 1) % CASES.length];
  return { card, study: STUDIES[card.slug], previous, next };
}

export const CASE_SLUGS = CASES.map((item) => item.slug);
