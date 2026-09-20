export const SITE = {
  name: "Vlad Holoborodko",
  /** Rendered in the header as a wordmark. */
  wordmark: "Vlad.Holoborodko.",
  role: "Product Designer",
  email: "vlgolo1996@gmail.com",
  url: "https://vlgolo.com",
  description:
    "Product Designer since 2015. I take ideas from a rough problem statement to a shipped product: research, UX, UI and the business case behind every screen.",
} as const;

export const NAV_LINKS = [
  { label: "Works", href: "/#works" },
  { label: "About", href: "/about" },
  { label: "Contacts", href: "/#contacts" },
] as const;

export const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "ua", label: "UA" },
] as const;

/** Availability flag, shown next to the wordmark in the header. */
export const STATUS = "Available";

export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/vlgolo/" },
  { label: "Dribbble", href: "https://dribbble.com/vlgolo" },
  { label: "Instagram", href: "https://www.instagram.com/vlgolo/" },
] as const;

export const HERO = {
  eyebrow: "Senior Product Designer · Est. 2015",
  headline: ["Designing products", "that drive growth"],
  cta: { label: "Download resume", href: "/resume.pdf" },
  video: {
    mp4: "/hero/hero.mp4",
    webm: "/hero/hero.webm",
    poster: "/hero/hero-poster.jpg",
  },
} as const;

export const WORKS = {
  /** Set vertically in the left margin, the same as ABOUT.rail. */
  rail: "Works",
  cases: [
    {
      slug: "smartcrowd",
      title: "SmartCrowd",
      year: "2025–2026",
      description:
        "A UAE real estate investment platform where people can invest in property and manage their portfolio in one place.",
      cover: "/works/SmartCrowd_preview.jpg",
      tags: ["Fintech", "Proptech"],
    },
    {
      slug: "notary-hub",
      title: "Notary HUB",
      year: "2018–2019",
      description:
        "A US platform for Remote Online Notarization, letting notaries, companies, and clients sign and handle legal documents fully online.",
      cover: "/works/NotaryHUB_preview.jpg",
      tags: ["LegalTech", "SaaS"],
    },
    {
      slug: "space-needle",
      title: "Space Needle",
      year: "2024–2025",
      description:
        "The ticketing and digital experience for Space Needle, one of Seattle's most iconic landmarks, visited by millions each year.",
      cover: "/works/SpaceNeedle_preview.jpg",
      tags: ["B2C", "Enterprise"],
    },
    {
      slug: "dan-mon-fairwind",
      title: "Dan-Mon Fairwind",
      year: "2022–2023",
      description:
        "A global marine supplier that sources and delivers technical spare parts for ship equipment anywhere in the world.",
      cover: "/works/DanMon_preview.jpg",
      tags: ["Enterprise", "CRM"],
    },
  ],
} as const;

export const ABOUT = {
  /** Set vertically in the left margin, the way the hero rules frame the page. */
  rail: "About",
  eyebrow: "Hey there, I'm Vlad!",
  body: "I'm a Product Designer with 10+ years of experience building digital products across diverse industries and markets. I help teams transform complex ideas into intuitive experiences that create meaningful value for users and measurable results for businesses…",
  cta: { label: "Learn more", href: "/about" },
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
