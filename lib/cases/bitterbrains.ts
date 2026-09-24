import type { CaseStudy } from "@/lib/cases/types";

const dir = "/cases/bitterbrains";

export const bitterbrains: CaseStudy = {
  slug: "bitterbrains",
  hero: {
    statement: "From a small Vue.js education startup to a global developer education company. I was there for all of it.",
    meta: ["EdTech · Developer Education","2018–2023","Product Designer","Web"],
  },
  context: {
    invite:
      "I joined the team when the company was still VueSchool, a small but ambitious group of developers and educators building the best place to learn Vue.js on the internet. I was the first and only designer on the team, brought in to bring structure and craft to a product that had been built entirely by developers.",
    situation:
      "As the company grew, so did the scope of what needed to be designed. New products were launched, conferences were created, certifications were introduced, and business services were added, each requiring its own design thinking, visual language, and product experience.",
    outcome:
      "Over six years I helped grow VueSchool into BitterBrains, a developer education company with 15 products, 4 global conferences, official certifications trusted by 350+ companies, and a community of over 2 million developers across 156 countries.",
    motif: "growth",
    labels: ["Vue School"],
  },
  role: {
    title: "Product Designer",
    summary:
      "I joined as a UX/UI Designer and grew into a Product Designer over five years, becoming the person responsible for the design of every product, conference, and brand touchpoint the company produced.",
    summaryExtra:
      "I worked across every function: product, marketing, engineering, and content. From designing platform UIs and course experiences to creating conference brands, social media assets, and physical event materials, if it needed to look good and work well, it came through me.",
    owned: [
      "Platform UX & UI",
      "Design Systems",
      "Brand & Visual Identity",
      "Conference Experience Design",
      "Certification Product Design",
      "Marketing & Campaign Design",
      "Cross-Product Consistency",
    ],
    withWhom: [
      "Engineering",
      "Marketing",
      "Content & Education",
      "1 Designer",
      "Video Designers",
      "External Partners",
    ],
    howIWorked: [
      "End-to-end product design",
      "Brand & visual identity",
      "Cross-functional collaboration",
      "Marketing design",
      "Conference experience design",
      "Iterative delivery",
    ],
  },
  overview: {
    tagline: "One team. Six years. Fifteen products.",
    images: [
      { src: `${dir}/wide-1.webp`, alt: "BitterBrains products" },
      { src: `${dir}/wide-2.webp`, alt: "Vue School platform" },
      { src: `${dir}/wide-3.webp`, alt: "Certificates.dev" },
      { src: `${dir}/wide-4.webp`, alt: "BitterBrains conferences" },
      { src: `${dir}/wide-5.webp`, alt: "BitterBrains business services" },
    ],
  },
  chapters: [
    {
      name: "Educational Platform",
      title: "Building the foundation everyone else stood on",
      description:
        "Vue School was the foundation everything else was built on. I designed and continuously evolved the platform experience, from course pages and lesson players to onboarding flows, subscription management, and the overall product UI, as the library grew to 1,500+ lessons serving developers in 156 countries.",
      visual: `${dir}/chapter-1.webp`,
      points: [
        "Full platform UI design across multiple product iterations",
        "Course discovery, lesson player, and learning progress experiences",
        "Subscription and plan management flows",
        "Onboarding experiences for new developers",
        "Mastering Nuxt, the only official Nuxt.js course platform",
        "Mastering Pinia, built in partnership with the creator of Pinia",
      ],
    },
    {
      name: "Certifications",
      title: "Turning skills into credentials the industry trusts",
      description:
        "BitterBrains became the only official certification partner for Vue.js and Nuxt. I designed the full product experience for Certificates.dev, the platform that lets developers earn industry-recognized credentials trusted by over 350 companies worldwide.",
      visual: `${dir}/chapter-2.webp`,
      points: [
        "Certificates.dev: full product UI for certification exams and credential management",
        "Vue.js and Nuxt official certifications trusted by 350+ companies",
        "Angular and React certification products added to the platform",
        "Certification landing pages and marketing experiences",
        "Career-focused product flows from purchase to credential delivery",
        "Vue Bundle: bundled product offering with dynamic pricing UI",
      ],
    },
    {
      name: "Global Conferences",
      title: "Taking the community off the platform and into rooms",
      description:
        "BitterBrains runs four global developer conferences: Frontend Nation, Vue.js Nation, Nuxt Nation, and Vue.js Forge. I designed everything, including the conference websites, speaker and schedule UIs, live event experiences, social media campaigns, and physical materials for in-person events. What started as an online-only education product became something over 115,000 developers now travel and log in to be part of.",
      visual: `${dir}/chapter-3.webp`,
      points: [
        "Frontend Nation: conference website, branding, and event UI",
        "Vue.js Nation: annual online conference design across multiple editions",
        "Nuxt Nation: dedicated Nuxt community conference experience",
        "Vue.js Forge: live coding event brand and digital experience",
        "Social media campaigns and visual content for all four conferences",
        "Physical event materials: badges, signage, printed collateral",
      ],
    },
    {
      name: "Business Services & Scale",
      title: "Moving from teaching developers to hiring them",
      description:
        "As BitterBrains matured, it launched business-facing products, including InstantDev, LevelUp, and developer hiring services, moving the company from pure B2C education into B2B territory. I designed these products from scratch, translating six years of consumer-facing product thinking into services built for companies rather than individual learners.",
      visual: `${dir}/chapter-4.webp`,
      points: [
        "InstantDev: product design for developer services platform",
        "LevelUp: business service product UI and experience",
        "Developer hiring service flows and landing experiences",
        "Consistent brand application across B2B and B2C products",
        "Marketing design supporting product launches and growth campaigns",
        "Design contributions to 48x revenue increase since 2017",
      ],
    },
    {
      name: "AIDD & What’s Next",
      title: "Designing for how developers will work, not just how they learn today",
      description:
        "As AI began reshaping how developers write and ship code, BitterBrains launched AIDD, an AI-Driven Development learning path designed to help developers build faster and smarter using AI tools. I designed the full product experience from scratch, positioning it as the company’s first product built for what comes after traditional courses, and a signal of where the platform is headed next.",
      visual: `${dir}/chapter-5.webp`,
      points: [
        "AIDD: AI-Driven Development hands-on learning path product",
        "Multi-module course experience with progressive skill building",
        "Designed to help developers operate like a team 20x their size",
        "Product UI, onboarding flow, and marketing landing page",
        "Positioned as BitterBrains’ entry into the AI education space",
      ],
    },
  ],
  impact: {
    items: [
      { value: "15", label: "Products designed", body: "From Vue School and certifications to conferences and business services, every product touched by design." },
      { value: "2M+", label: "Developers reached", body: "Across 156 countries through educational products, certifications, and global conferences." },
      { value: "4", label: "Conferences branded", body: "Frontend Nation, Vue.js Nation, Nuxt Nation, and Vue.js Forge, online and in-person." },
      { value: "5", label: "Years of growth", body: "From a small startup with a handful of people to a team of 50+ with global reach." },
    ],
  },
  reflection: [
    "Being the first designer at a growing company means you don’t just design products. You build the design culture, the visual language, and the standard that everything after you is measured against.",
    "Designing for developers taught me that the people who notice every detail the most are also the most appreciative when you get it right. Technical audiences reward craft.",
    "When you work across 15 products over six years, consistency becomes your most important design skill. Not visual consistency, but conceptual consistency. The same thinking, applied everywhere.",
  ],
};
