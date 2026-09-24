import type { CaseStudy } from "@/lib/cases/types";

const dir = "/cases/fozzy-group";

export const fozzyGroup: CaseStudy = {
  slug: "fozzy-group",
  hero: {
    statement: "Designing the back-office behind Silpo, the flagship supermarket chain of one of Ukraine’s largest retailers.",
    meta: ["Retail · Enterprise","2025","Senior Product Designer","Desktop / Web"],
  },
  context: {
    invite:
      "Fozzy Group is one of Ukraine’s largest retailers, and Silpo is its flagship supermarket chain with hundreds of stores across the country. I joined as a Senior Product Designer on the team designing Silpo’s internal back-office, the system the business runs its retail operations on.",
    situation:
      "The back-office is far bigger than any single flow. It’s a large, complex system covering the product catalog, day-to-day commerce operations, and everything in between, and it had grown dense over years of added features. Teams worked around clunky flows and inconsistent screens, which slowed down everyday operations across a huge, data-heavy product.",
    outcome:
      "Working alongside other designers, I improved existing tools and designed new ones across the catalog and commerce sides of the back-office, and contributed to a large design system that brought consistency and speed to the teams building on top of it.",
    motif: "catalog",
    labels: ["Catalog","Commerce"],
  },
  role: {
    title: "Senior Product Designer",
    summary:
      "I joined Silpo’s back-office team as a Senior Product Designer, the operational system behind one of Ukraine’s largest supermarket chains. My focus was improving existing tools and designing new ones across two core areas: the product catalog and day-to-day commerce operations.",
    summaryExtra:
      "On the catalog side, I worked on products, categories, modifier groups, product characteristics, and characteristic sets. On the commerce side, I worked on offers, the order flow, merchant management, branch-level services, and access levels. Alongside this feature work, I contributed to a large design system, working closely with other designers across the team.",
    owned: [
      "Product Catalog",
      "Modifier Groups & Characteristics",
      "Offers & Order Flow",
      "Merchant & Branch Management",
      "Access Levels",
      "Design System",
    ],
    withWhom: [
      "Product Management",
      "Engineering",
      "Other Designers",
      "Operations Teams",
    ],
    howIWorked: [
      "Feature-by-feature delivery",
      "Design system contribution",
      "Cross-functional collaboration",
      "Close design collaboration",
      "Iterative improvement",
    ],
  },
  overview: {
    tagline: "Improving the system Silpo runs on, and the design system behind it.",
    images: [
      { src: `${dir}/wide-1.webp`, alt: "Silpo back-office" },
      { src: `${dir}/wide-2.webp`, alt: "Silpo product catalog" },
      { src: `${dir}/wide-3.webp`, alt: "Silpo commerce operations" },
      { src: `${dir}/wide-4.webp`, alt: "Silpo design system" },
    ],
  },
  chapters: [
    {
      name: "Product Catalog",
      title: "Building the foundation the whole catalog runs on",
      description:
        "Every product in Silpo’s catalog needs a consistent structure behind it. I improved existing tools and designed new ones for managing products, categories, modifier groups, product characteristics, and characteristic sets, giving merchandising teams a clear, connected way to manage what gets sold across hundreds of stores.",
      visual: `${dir}/chapter-1.webp`,
      points: [
        "Products and categories: structure and management flows",
        "Modifier groups for configuring product variations",
        "Product characteristics and characteristic sets",
        "Improved existing catalog tools and designed new ones from scratch",
      ],
    },
    {
      name: "Commerce Operations",
      title: "Running the business behind the storefront",
      description:
        "Beyond the catalog, I designed the tools that keep the business running day to day: offers, the order flow, merchant management, branch-level services, and access levels that control who can act on what. Each one had its own operational logic to work through.",
      visual: `${dir}/chapter-2.webp`,
      points: [
        "Offers: creation and management flows",
        "Order flow, from creation through fulfillment",
        "Merchant management across the platform",
        "Branch-level services and access levels",
      ],
    },
    {
      name: "Design System",
      title: "One system behind a sprawling product",
      description:
        "Alongside the feature work, I contributed to a large design system: the shared components, patterns, and rules that keep this many tools, and this many teams, moving in the same direction.",
      visual: `${dir}/chapter-3.webp`,
      points: [
        "Contributed to a large-scale design system",
        "Shared components and patterns across the back-office",
        "Helped bring consistency across a huge, sprawling product",
      ],
    },
  ],
  impact: {
    items: [
      { value: "300+", label: "Silpo stores", body: "The retail network the back-office keeps running day to day." },
      { value: "2nd", label: "Retailer in Ukraine", body: "Fozzy Group, Silpo’s parent, is the country’s second-largest retail company." },
      { value: "1", label: "Design system", body: "A large, shared system unifying the whole back-office product." },
      { value: "3", label: "Focus areas", body: "Product catalog, commerce operations, and the design system that ties them together." },
    ],
  },
  reflection: [
    "On a product this large, you can’t redesign everything at once. Real progress comes feature by feature, one clear flow at a time.",
    "A design system isn’t just components. On a product this size, it’s what keeps a whole team of designers moving in the same direction.",
    "Back-office tools rarely get the spotlight, but they’re where a retailer this big actually runs. Getting them right matters.",
  ],
};
