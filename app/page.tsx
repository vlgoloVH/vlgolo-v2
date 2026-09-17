import { ScrollState } from "@/components/layout/scroll-state";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";

/** The home page is a stack of full-height slides. The hero is pinned and every
 *  section after it rides over the top. */
export default function HomePage() {
  return (
    <>
      <ScrollState />
      <Hero />
      <About />
    </>
  );
}
