import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { localizePath, type Locale } from "@/lib/i18n";
import { ABOUT_PAGE } from "@/lib/site";
import { ScrollDriver } from "@/components/about/scroll-driver";
import { AboutRail } from "@/components/about/rail";
import { AboutHero } from "@/components/about/hero";
import { AboutStory } from "@/components/about/story";
import { AboutPhilosophy } from "@/components/about/philosophy";
import { AboutExperience } from "@/components/about/experience";
import { AboutProcess } from "@/components/about/process";
import { AboutCapabilities } from "@/components/about/capabilities";
import { AboutPersonal } from "@/components/about/personal";
import { AboutCta } from "@/components/about/cta";

type Params = Promise<{ lang: string }>;

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

/** About is a long editorial scroll, not a stack of slides like Home: natural
 *  scrolling, with the motion carried by parallax, pinned sequences and
 *  reveals. ScrollDriver feeds scroll progress to CSS; each section owns its
 *  own choreography. The frame lines run the full height of the page. */
export default async function AboutPage({ params }: { params: Params }) {
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);
  const copy = dict.aboutPage;

  return (
    <div className="about-page relative bg-surface">
      <ScrollDriver />
      <AboutRail ids={ABOUT_PAGE.sections} names={copy.nav} label={copy.title} />

      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[5] hidden md:block">
        <span className="absolute inset-y-0 left-[var(--frame-line)] w-px bg-white/12" />
        <span className="absolute inset-y-0 right-[var(--frame-line)] w-px bg-white/12" />
      </div>
      {/* Keeps the header readable over whatever scrolls beneath it. */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[45] h-28 bg-gradient-to-b from-black/70 to-transparent" />

      <AboutHero copy={copy.hero} />
      <AboutStory copy={copy.story} />
      <AboutPhilosophy copy={copy.philosophy} />
      <AboutExperience copy={copy.experience} />
      <AboutProcess copy={copy.process} />
      <AboutCapabilities copy={copy.capabilities} />
      <AboutPersonal copy={copy.personal} />
      <AboutCta copy={copy.cta} contact={dict.contact} meta={dict.meta} top={dict.contacts.top} />
    </div>
  );
}
