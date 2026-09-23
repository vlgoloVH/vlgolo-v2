import type { CaseStudy } from "@/lib/cases/types";

const dir = "/cases/dan-mon-fairwind";

export const danMonFairwind: CaseStudy = {
  slug: "dan-mon-fairwind",
  hero: {
    statement: "Designing the enterprise CRM that runs the full sales-to-supply lifecycle.",
    meta: ["Maritime · Spare Parts", "2022–2023", "Product Designer", "Web"],
  },
  summary: {
    lead: "One CRM for the entire sales lifecycle.",
    product:
      "An internal CRM for a global supplier that sources and delivers technical spare parts for ship equipment anywhere in the world.",
    problem:
      "Enquiries, quotes, purchase orders and customers lived in spreadsheets, email and disconnected tools. Context and margin leaked at every handoff.",
    role: "End-to-end design: product discovery, workflow mapping, information architecture and every module’s interface.",
    result: "One connected system and a single source of truth for every deal, from first enquiry to delivered order.",
  },
  context: {
    headline: ["Every deal lived", "in a different place."],
    invite:
      "Dan-Mon Fairwind runs a global marine spare-parts business on a web of spreadsheets, email, and disconnected tools. They brought me in to design a single internal CRM their whole team could run the business on, from first enquiry to delivered order.",
    situation:
      "Every enquiry, quote, purchase order, and customer lived in a different place. Sales chased quotes over email, procurement re-keyed the same data, and no one had a clear view of a deal from start to finish. As volume grew, context and margin leaked at every handoff.",
    outcome:
      "A unified enterprise CRM covering the complete lifecycle, including opportunities, quotations, procurement, order fulfilment, and customer relationships, giving the team one connected system and a single source of truth for every deal.",
    motif: "pipeline",
    labels: ["Enquiry", "Quote", "Order", "Delivery"],
  },
  role: {
    statement: "The workflow came first. The screens came after.",
    body: [
      "I owned end-to-end design of the internal CRM, the system the entire company uses to manage the sales-to-supply lifecycle. From product discovery and workflow mapping to information architecture and interface design across every module, I shaped how the team turns enquiries into quotes, purchase orders, and delivered parts.",
      "I worked upstream from the screens, mapping the real, messy workflow first across sales, procurement, and operations, then designing each module to mirror how the business actually runs. I built a shared pattern library so complex, data-heavy tools stayed consistent, and validated every flow with the people who use it daily.",
    ],
    scope: [
      "Product Discovery",
      "Workflow Mapping",
      "Information Architecture",
      "Interface Design",
      "Platform Design System",
      "Prototyping & Validation",
    ],
    team: ["Founders / Operations Lead", "Sales Team", "Procurement Team", "Engineering"],
  },
  challenge: {
    headline: "The business ran on spreadsheets and email.",
    tensions: [
      "Every enquiry, quote, purchase order and customer lived in a different place.",
      "Sales chased quotes over email.",
      "Procurement re-keyed the same data.",
      "No one had a clear view of a deal from start to finish.",
    ],
  },
  chapters: [
    {
      name: "Opportunities & Pipeline",
      title: "One view of every deal in play",
      description:
        "Enquiries used to live in inboxes with no shared status. We designed a pipeline that gives sales one view of every opportunity, from first enquiry to won or lost, with the context needed to move each deal forward.",
      visual: `${dir}/chapter-1.webp`,
      layout: "flow",
      points: [
        "Capture every enquiry in one place, not scattered across inboxes",
        "Track each opportunity through clear pipeline stages",
        "Full context on each deal, including customer, parts, and history, at a glance",
      ],
    },
    {
      name: "Quotations",
      title: "From enquiry to quote in one flow",
      description:
        "Building a quote meant sourcing prices, then re-keying everything into a document. We designed a quotation module that turns an opportunity into a professional quote without leaving the system.",
      visual: `${dir}/chapter-2.webp`,
      layout: "sticky",
      points: [
        "Generate quotes directly from an opportunity",
        "Pull parts, pricing, and supplier data into one place",
        "Track quote status, from sent to accepted to revised, end to end",
      ],
    },
    {
      name: "Procurement & Fulfilment",
      title: "From won deal to delivered order",
      description:
        "Once a quote was accepted, procurement re-entered the same data to order from suppliers, then tracked delivery separately. We connected the whole flow so an accepted quote moves straight into supplier orders and on to the customer.",
      visual: `${dir}/chapter-3.webp`,
      layout: "backdrop",
      points: [
        "Convert accepted quotes into supplier purchase orders",
        "Source and compare across multiple suppliers",
        "Track fulfilment from supplier to customer delivery",
        "Every order connected back to its original deal",
      ],
    },
    {
      name: "Customers & Accounts",
      title: "The full history behind every relationship",
      description:
        "Customer information was spread across people and files. We built account management so every relationship carries its full history, including enquiries, quotes, and orders, in one place.",
      visual: `${dir}/chapter-4.webp`,
      layout: "reveal",
      points: [
        "A single record for every customer and account",
        "Full history of enquiries, quotes, and orders per account",
        "The context to serve repeat customers faster",
      ],
    },
  ],
  moments: [
    { src: `${dir}/wide-1.webp`, alt: "Dan-Mon Fairwind CRM", after: -1, effect: "tilt" },
    { src: `${dir}/wide-2.webp`, alt: "Dan-Mon Fairwind pipeline", after: 0, effect: "mask" },
    { src: `${dir}/wide-3.webp`, alt: "Dan-Mon Fairwind procurement", after: 2, effect: "drift" },
    { src: `${dir}/wide-4.webp`, alt: "Dan-Mon Fairwind accounts", after: 3, effect: "enter" },
  ],
  system: {
    variant: "lifecycle",
    label: "Connected modules",
    title: "Four modules. One source of truth.",
    description:
      "Each module mirrors how the business actually runs, and every order stays connected back to its original deal. A shared pattern library kept complex, data-heavy tools consistent, so the whole system reads as one product.",
    modules: ["Opportunities", "Quotations", "Procurement & Fulfilment", "Customers & Accounts"],
    core: "One CRM",
  },
  impact: {
    items: [
      { value: "4", label: "Connected modules", body: "Opportunities, quotations, procurement & fulfilment, and accounts, all in one system." },
      { value: "1", label: "Source of truth", body: "A single CRM replaces scattered spreadsheets, email, and disconnected tools." },
      { value: "100%", label: "Lifecycle coverage", body: "The full sales-to-supply journey designed, from enquiry to delivered order." },
      { value: "Global", label: "Operational reach", body: "Supports sourcing, fulfilment, and delivery to customers worldwide." },
    ],
    summary:
      "By designing the CRM around how the business truly runs, the team gained one connected view of every deal, along with the speed, clarity, and control to scale a complex global operation.",
  },
  reflection: [
    "For internal tools, clarity and speed beat visual polish. Every extra click and re-keyed field costs the team real time and margin.",
    "Mapping the real, messy workflow across sales, procurement, and ops mattered more than any single screen. The system had to mirror how the business actually runs.",
    "A consistent pattern library made complex, data-heavy modules feel like one coherent product the whole team could learn quickly.",
  ],
};
