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

/** The address the site is actually served from, for canonical links, share
 *  previews, robots.txt and the sitemap. On Vercel this is the project's
 *  production domain (vlgolo-v2.vercel.app today, vlgolo.com once the domain
 *  moves over); anywhere else it falls back to SITE.url. */
export const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : SITE.url;

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

/** The Works track, in order. Descriptions come from the dictionary, keyed
 *  by slug. `lines` is the name as set on the slide, always on two lines.
 *  `tint` colours the section while that case is on screen, picked from the
 *  case's own cover. */
export const CASES = [
  {
    slug: "smartcrowd",
    title: "SmartCrowd",
    lines: ["Smart", "Crowd"],
    href: "/cases/smartcrowd",
    cover: "/works/SmartCrowd_preview.jpg",
    tags: ["Fintech", "Proptech", "Product Design"],
    tint: "#1d4ed8",
  },
  {
    slug: "space-needle",
    title: "Space Needle",
    lines: ["Space", "Needle"],
    href: "/cases/space-needle",
    cover: "/works/SpaceNeedle_preview.jpg",
    tags: ["B2C", "B2B", "Enterprise"],
    tint: "#f97316",
  },
  {
    slug: "dan-mon-fairwind",
    title: "Dan-Mon Fairwind",
    lines: ["Dan-Mon", "Fairwind"],
    href: "/cases/dan-mon-fairwind",
    cover: "/works/DanMon_preview.jpg",
    tags: ["Enterprise", "CRM", "B2B"],
    tint: "#0891b2",
  },
  {
    slug: "fozzy-group",
    title: "Fozzy Group",
    lines: ["Fozzy", "Group"],
    href: "/cases/fozzy-group",
    cover: "/works/FozzyGroup_preview.jpg",
    tags: ["Retail", "Back-Office", "Design System"],
    tint: "#7c3aed",
  },
  {
    slug: "bitterbrains",
    title: "BitterBrains",
    lines: ["Bitter", "Brains"],
    href: "/cases/bitterbrains",
    cover: "/works/BitterBrail_preview.jpg",
    tags: ["EdTech", "SaaS", "Community"],
    tint: "#ca8a04",
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

/** Files and fixed values for the About page. Its words live in the
 *  dictionary under `aboutPage`. Section ids are what the left rail and any
 *  in-page link point at, in page order. */
export const ABOUT_PAGE = {
  sections: ["intro", "story", "glance", "experience", "process", "stack", "photos"],
  /** The wide photo the intro opens on. */
  cover: { src: "/about-page/story-desk.webp", width: 2400, height: 1050 },
  /** The photo grid: the first is the tall one on the left. */
  photos: [
    "/about-page/story-portrait.webp",
    "/about-page/personal-snow.webp",
    "/about-page/personal-louvre.webp",
    "/about-page/personal-valencia.webp",
    "/about-page/personal-kotor.webp",
  ],
} as const;
