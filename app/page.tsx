import { ScrollState } from "@/components/layout/scroll-state";
import { SlideScroll } from "@/components/layout/slide-scroll";
import { ViewportHeight } from "@/components/layout/viewport-height";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";

/** The home page is a stack of full-height slides: each section is one screen,
 *  the hero's content lags behind the scroll, and the section after it is opaque
 *  so it reads as sliding over the top. */
export default function HomePage() {
  return (
    <>
      <ViewportHeight />
      <ScrollState />
      <SlideScroll />
      <Hero />
      <About />
    </>
  );
}
