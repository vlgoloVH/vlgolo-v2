import type { CaseStudy } from "@/lib/cases/types";

const dir = "/cases/smartcrowd";

export const smartcrowd: CaseStudy = {
  slug: "smartcrowd",
  hero: {
    statement: "Transforming a fragmented investment platform into one scalable ecosystem.",
    meta: ["Fintech / Proptech","2025–2026","Lead Product Designer","Web / iOS / Android"],
  },
  context: {
    invite:
      "SmartCrowd invited me to conduct a full audit of their existing platform, looking closely at the UX, the product structure, and where mobile and web could be improved.",
    situation:
      "The platform had grown organically over time, resulting in fragmented user journeys, inconsistent patterns, and a product experience that no longer matched the company’s ambitions or its users’ expectations.",
    outcome:
      "After presenting the audit findings, I joined SmartCrowd as Lead Product Designer. What started as an audit turned into a full platform transformation, covering mobile, web, partner platforms, and the design system.",
    motif: "network",
    labels: ["Explore","Invest","Portfolio","Wallet","Account"],
  },
  role: {
    title: "Lead Product Designer",
    summary:
      "As Lead Product Designer, I owned the full design direction of SmartCrowd, starting with the initial product audit that identified core UX gaps and continuing through the complete redesign of the mobile app, web platform, and partner products. I set the strategic design direction, shaped information architecture, and made sure every platform felt unified and intentional.",
    summaryExtra:
      "Beyond execution, I built the design system from scratch, creating a scalable token-based foundation with light and dark themes that served both SmartCrowd and its partner brands. I worked closely with Product, Engineering, Compliance, and Marketing, and mentored another designer on the team throughout the project.",
    owned: [
      "Product Strategy",
      "Information Architecture",
      "Mobile · iOS & Android",
      "Web Platform",
      "Design System",
      "Partner Platforms",
      "User Research",
    ],
    withWhom: [
      "Product Management",
      "Engineering",
      "Compliance",
      "Marketing",
      "QA",
      "1 Designer",
    ],
    howIWorked: [
      "End-to-end execution",
      "Hands-on design leadership",
      "Cross-functional collaboration",
      "Research-driven decisions",
      "Iterative delivery",
      "Design mentorship",
    ],
  },
  overview: {
    tagline: "Not a redesign. A full platform transformation.",
    images: [
      { src: `${dir}/wide-1.webp`, alt: "SmartCrowd mobile screens" },
      { src: `${dir}/wide-2.webp`, alt: "SmartCrowd investment flows" },
      { src: `${dir}/wide-3.webp`, alt: "SmartCrowd portfolio and wallet" },
      { src: `${dir}/wide-4.webp`, alt: "SmartCrowd across platforms" },
    ],
  },
  chapters: [
    {
      name: "Product Architecture",
      title: "Rethinking the platform structure",
      description:
        "The existing app had no clear structural logic. Navigation was fragmented, sections overlapped, and the information architecture didn’t reflect how investors actually think. We mapped the entire product and rebuilt it from the ground up.",
      visual: `${dir}/chapter-1.webp`,
      points: [
        "Conducted a full audit of the existing product structure and navigation",
        "Simplified from a fragmented multi-level system to a clear 5-tab architecture",
        "Consolidated overlapping sections and removed redundant entry points",
        "Rebuilt the information hierarchy around the investor mental model",
        "Defined clear product zones: Explore, Invest, Portfolio, Wallet, Account",
      ],
    },
    {
      name: "Experience Redesign",
      title: "Reimagining the investment experience",
      description:
        "Rather than patching individual screens, we redesigned the entire investment experience as one connected product. Every flow, from discovering a property to tracking returns, was rethought to reduce friction, build confidence, and work consistently across mobile and web.",
      visual: `${dir}/chapter-2.webp`,
      points: [
        "Full redesign of the mobile app across iOS and Android",
        "Web platform redesigned with consistent logic and patterns",
        "Property discovery, investment flows, portfolio, wallet, and KYC, all rethought",
        "New features introduced: Auto Reinvest, improved Wallet, enhanced onboarding",
        "Existing features reimagined, not just restyled",
        "Interaction patterns and component behavior defined with engineering",
      ],
    },
    {
      name: "Design System & Foundations",
      title: "Building a scalable design foundation",
      description:
        "To support the redesign and all future work, I built a comprehensive design system from scratch. It wasn’t just a component library, but a shared language between design and engineering that works across all platforms and brands.",
      visual: `${dir}/chapter-3.webp`,
      points: [
        "100+ components covering all major UI patterns across mobile and web",
        "Semantic design tokens for color, spacing, typography, and elevation",
        "Full light mode and dark mode support",
        "Documented component states, variants, and responsive behavior",
        "Developer handoff process that reduced back-and-forth significantly",
        "Token architecture built to support partner brand adaptation",
      ],
    },
    {
      name: "Partner Platform Ecosystem",
      title: "Scaling beyond a single product",
      description:
        "SmartCrowd’s platform logic powered partner products that required different branding and adapted feature sets. The design system’s token architecture made this possible without rebuilding from scratch, giving the team one foundation that could support multiple branded experiences.",
      visual: `${dir}/chapter-4.webp`,
      points: [
        "Adapted the core platform for multiple partner products",
        "Token-based theming enables full brand adaptation: colors, typography, components",
        "UX consistency maintained across all brand variants",
        "Partner onboarding accelerated through reusable foundations",
        "Each partner product feels native to its brand while sharing the same logic",
      ],
    },
  ],
  impact: {
    items: [
      { value: "3", label: "Platforms redesigned", body: "iOS, Android, and Web, all rebuilt from the ground up with consistent logic." },
      { value: "2+", label: "Partner platforms", body: "Adapted and shipped with full brand customization via token-based theming." },
      { value: "100+", label: "Design system components", body: "Covering all major UI patterns across mobile and web with light and dark modes." },
      { value: "2", label: "Theme modes", body: "Full light and dark mode support across the entire product ecosystem." },
    ],
  },
  reflection: [
    "Real product leadership means holding the full picture at once: user needs, business goals, technical constraints, and compliance.",
    "The most valuable thing I built wasn’t a screen. It was a foundation the entire team could keep building on.",
    "Designing for regulated financial products taught me that clarity and compliance aren’t opposites. Good UX makes both possible.",
  ],
};
