/** A case study's content. The facts, wording, numbers and their order come
 *  from the case studies on the current site (vlgolo.com); the page
 *  (app/[lang]/cases/[slug]) arranges them, the same way for every case. What
 *  makes each case look like itself is set here too: its colour comes from
 *  CASES in lib/site.ts, and the motif picks the Context drawing. */

/** The drawing in Context that goes from fragments to structure. */
export type Motif = "network" | "journey" | "pipeline" | "catalog" | "growth";

export interface Chapter {
  /** Short name, e.g. "Product Architecture". */
  name: string;
  title: string;
  description: string;
  points: string[];
  visual: string;
}

export interface CaseStudy {
  slug: string;
  hero: {
    statement: string;
    meta: string[];
  };
  context: {
    invite: string;
    situation: string;
    outcome: string;
    motif: Motif;
    /** Names that appear on the drawing once it has come into order. */
    labels: string[];
  };
  role: {
    /** The role on the project, e.g. "Lead Product Designer". */
    title: string;
    summary: string;
    summaryExtra?: string;
    owned: string[];
    withWhom: string[];
    howIWorked: string[];
  };
  /** The full-screen images between My Role and the transformation. */
  overview: {
    images: { src: string; alt: string }[];
  };
  chapters: Chapter[];
  impact: {
    items: { value: string; label: string; body: string }[];
    /** The line that sums the work up. */
    summary: string;
  };
  reflection: string[];
}

/** A case's words in another language, in the order of its English data
 *  (lib/cases/uk). The pictures, the colour and the drawing come from the
 *  English case, and so do the technical terms that stay in English: the
 *  details under the statement (industry, years, role, platforms) and the
 *  names on the drawing. */
export interface CaseCopy {
  hero: Pick<CaseStudy["hero"], "statement">;
  context: Pick<CaseStudy["context"], "invite" | "situation" | "outcome">;
  role: CaseStudy["role"];
  /** The overview images' descriptions, in order. */
  overview: string[];
  chapters: Pick<Chapter, "name" | "title" | "description" | "points">[];
  impact: CaseStudy["impact"];
  reflection: string[];
}
