export const SITE = {
  name: "Vlad Holoborodko",
  role: "Product Designer",
  email: "vlgolo1996@gmail.com",
  url: "https://vlgolo.com",
  description:
    "Product Designer since 2015. I take ideas from a rough problem statement to a shipped product: research, UX, UI and the business case behind every screen.",
} as const;

export const NAV_LINKS = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
] as const;

export const HERO = {
  eyebrow: "Senior Product Designer · Est. 2015",
  status: "Available for new projects",
  /** Each array item is one rendered line of the headline. */
  headline: [
    [{ text: "Designing" }],
    [{ text: "products", accent: true }],
    [{ text: "that drive" }],
    [{ text: "growth", accent: true }, { text: ".", accent: true }],
  ],
  lede: {
    before: "I design calm, considered products for teams solving ",
    accent: "genuinely complex",
    after: " problems.",
  },
} as const;
