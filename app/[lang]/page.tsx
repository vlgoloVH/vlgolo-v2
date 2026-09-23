import { ScrollState } from "@/components/layout/scroll-state";
import { SlideScroll } from "@/components/layout/slide-scroll";
import { ViewportHeight } from "@/components/layout/viewport-height";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Works } from "@/components/sections/works";
import { Testimonials } from "@/components/sections/testimonials";
import { Contacts } from "@/components/sections/contacts";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

/** The home page is a stack of full-height slides: each section is one screen,
 *  the hero's content lags behind the scroll, and the section after it is opaque
 *  so it reads as sliding over the top. */
export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  // The layout has already rejected anything that is not a locale.
  const lang = (await params).lang as Locale;
  const dict = getDictionary(lang);

  return (
    <>
      <ViewportHeight />
      <ScrollState />
      <SlideScroll />
      <Hero dict={dict} />
      <About lang={lang} dict={dict} />
      <Works lang={lang} dict={dict} />
      <Testimonials dict={dict} />
      <Contacts dict={dict} />
    </>
  );
}
