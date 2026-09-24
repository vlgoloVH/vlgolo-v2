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
  /** The full-screen images between My Role and the transformation, and the
   *  line that opens the transformation. */
  overview: {
    tagline: string;
    images: { src: string; alt: string }[];
  };
  chapters: Chapter[];
  impact: {
    items: { value: string; label: string; body: string }[];
  };
  reflection: string[];
}
