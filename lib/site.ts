/** Everything that is the same in every language: addresses, files, names.
 *  The words themselves live in lib/dictionaries.ts. */
export const SITE = {
  /** Rendered in the header as a wordmark. */
  wordmark: "Vlad.Holoborodko.",
  email: "vlgolo1996@gmail.com",
  url: "https://vlgolo.com",
  resume: "/resume.pdf",
  /** Where the contact form posts. */
  formspree: "https://formspree.io/f/mvznjbod",
} as const;

/** Labels for these come from the dictionary, under the same keys. */
export const NAV_LINKS = [
  { key: "works", href: "/#works" },
  { key: "about", href: "/about" },
  { key: "contacts", href: "/#contacts" },
] as const;

export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/vlgolo/" },
  { label: "Dribbble", href: "https://dribbble.com/vlgolo" },
  { label: "Instagram", href: "https://www.instagram.com/vlgolo/" },
] as const;

export const HERO = {
  video: {
    mp4: "/hero/hero.mp4",
    webm: "/hero/hero.webm",
    poster: "/hero/hero-poster.jpg",
  },
} as const;

/** The Works track, in order. A case with `placeholder` has no content yet and
 *  shows a stand-in; the rest take their description from the dictionary,
 *  keyed by slug. `tint` colours the section while that case is on screen. */
export const CASES = [
  {
    slug: "smartcrowd",
    title: "Smart Crowd",
    href: "/cases/smartcrowd",
    cover: "/works/SmartCrowd_preview.jpg",
    tags: ["Fintech", "Proptech", "Product Design"],
    tint: "#1d4ed8",
  },
  { slug: "case-2", placeholder: true, tint: "#7c3aed" },
  { slug: "case-3", placeholder: true, tint: "#0d9488" },
  { slug: "case-4", placeholder: true, tint: "#d97706" },
  { slug: "case-5", placeholder: true, tint: "#e11d48" },
] as const;

export type Case = (typeof CASES)[number];
export type CaseSlug = Exclude<Case, { placeholder: true }>["slug"];

export const ABOUT = {
  href: "/about",
  video: {
    /** One H.264 file with the picture on the left and its matte on the right.
     *  The shader reads both halves and turns the matte into alpha, so the
     *  figure is cut out in every browser, Safari included — VP9's own alpha
     *  channel would have left Safari with a black box. */
    packed: "/about/portrait-packed.mp4",
    /** Shown until the canvas is drawing, and instead of it without WebGL. */
    poster: "/about/portrait-alpha-poster.png",
  },
} as const;
