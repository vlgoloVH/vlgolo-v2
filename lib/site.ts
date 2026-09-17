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

export const ABOUT = {
  /** Set vertically in the left margin, the way the hero rules frame the page. */
  rail: "About",
  eyebrow: "Hey there, I'm Vlad!",
  body: "I'm a Product Designer with 10+ years of experience building digital products across diverse industries and markets. I help teams transform complex ideas into intuitive experiences that create meaningful value for users and measurable results for businesses…",
  cta: { label: "Read more", href: "/about" },
  video: {
    mp4: "/about/portrait.mp4",
    webm: "/about/portrait.webm",
    poster: "/about/portrait-poster.jpg",
  },
} as const;
