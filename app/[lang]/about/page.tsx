import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { localizePath, type Locale } from "@/lib/i18n";
import { ABOUT_PAGE } from "@/lib/site";
import { ScrollDriver } from "@/components/about/scroll-driver";
import { AboutRail } from "@/components/about/rail";
import { AboutHero } from "@/components/about/hero";
import { AboutStory } from "@/components/about/story";
import { AboutStats } from "@/components/about/stats";
import { AboutExperience } from "@/components/about/experience";
import { AboutProcess } from "@/components/about/process";
import { AboutStack } from "@/components/about/stack";
import { AboutPhotos } from "@/components/about/photos";
import { CaseContact } from "@/components/case/contact";

type Params = Promise<{ lang: string }>;

/** The About page's own colour, standing in for a case's tint: a cool grey,
 *  so the room lights up without leaving black and white. */
const TINT = "150 152 160";

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const { aboutPage } = getDictionary(lang);
  return {
    title: aboutPage.title,
    description: aboutPage.description,
    alternates: {
      canonical: localizePath(lang, "/about"),
      languages: { en: "/about", uk: "/uk/about", "x-default": "/about" },
    },
  };
}

/** About, in the order of the About page on the current site: intro with the
 *  wide photo, about me, the numbers, experience, how I work, the stack, the
 *  photo grid and the way to get in touch. It runs on the case pages' column
 *  (--case-pad) with their titles and motion: ScrollDriver feeds scroll
 *  progress to CSS, Track pins the intro, and each section owns its own
 *  choreography. The frame lines run the full height of the page. */
export default async function AboutPage({ params }: { params: Params }) {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  const copy = dict.aboutPage;

  return (
    <div className="about-page relative bg-surface" style={{ "--tint": TINT } as React.CSSProperties}>
      <ScrollDriver />
      <AboutRail ids={ABOUT_PAGE.sections} names={copy.nav} label={copy.title} numbered={false} />

      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[5] hidden md:block">
        <span className="absolute inset-y-0 left-[var(--frame-line)] w-px bg-white/12" />
        <span className="absolute inset-y-0 right-[var(--frame-line)] w-px bg-white/12" />
      </div>
      {/* Keeps the header readable over whatever scrolls beneath it. */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[45] h-28 bg-gradient-to-b from-black/70 to-transparent" />

      <AboutHero copy={copy.hero} />
      <AboutStory copy={copy.story} />
      <AboutStats stats={copy.stats} label={copy.nav[2]} />
      <AboutExperience copy={copy.experience} />
      <AboutProcess copy={copy.process} />
      <AboutStack copy={copy.stack} />
      <AboutPhotos copy={copy.photos} />
      <CaseContact labels={dict.caseStudy.contact} dict={dict} />
    </div>
  );
}
