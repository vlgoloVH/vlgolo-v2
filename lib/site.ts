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

/** Descriptions for these come from the dictionary, keyed by slug. */
export const CASES = [
  {
    slug: "smartcrowd",
    title: "SmartCrowd",
    year: "2025–2026",
    cover: "/works/SmartCrowd_preview.jpg",
    tags: ["Fintech", "Proptech"],
  },
  {
    slug: "notary-hub",
    title: "Notary HUB",
    year: "2018–2019",
    cover: "/works/NotaryHUB_preview.jpg",
    tags: ["LegalTech", "SaaS"],
  },
  {
    slug: "space-needle",
    title: "Space Needle",
    year: "2024–2025",
    cover: "/works/SpaceNeedle_preview.jpg",
    tags: ["B2C", "Enterprise"],
  },
  {
    slug: "dan-mon-fairwind",
    title: "Dan-Mon Fairwind",
    year: "2022–2023",
    cover: "/works/DanMon_preview.jpg",
    tags: ["Enterprise", "CRM"],
  },
] as const;

export type CaseSlug = (typeof CASES)[number]["slug"];

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
