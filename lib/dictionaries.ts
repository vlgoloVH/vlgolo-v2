import type { Locale } from "@/lib/i18n";
import type { CaseSlug } from "@/lib/site";

/** Every word on the site, per language. English is the reference shape: the
 *  Ukrainian dictionary has to match it key for key, so a missing string is a
 *  type error rather than a blank on the page. */
const en = {
  meta: {
    name: "Vlad Holoborodko",
    role: "Product Designer",
    description:
      "Product Designer since 2015. I take ideas from a rough problem statement to a shipped product: research, UX, UI and the business case behind every screen.",
  },
  ui: {
    mainNav: "Main",
    language: "Language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  nav: {
    works: "Works",
    about: "About",
    contacts: "Contacts",
  },
  status: "Available",
  resume: "Resume",
  hero: {
    eyebrow: "Senior Product Designer",
    headline: ["Making complex", "products feel simple"],
    sub: "From discovery to scalable systems — designing products for people and business.",
    cta: "View selected work",
  },
  contact: {
    title: "Let's talk",
    lead: "Tell me a little about your product or role, and I'll get back to you within a day.",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send",
    sending: "Sending…",
    sent: "Thanks! Your message is on its way, I'll reply soon.",
    error: "Something went wrong. Try again, or write to me directly:",
    close: "Close",
  },
  about: {
    /** Set vertically in the left margin, the way the hero rules frame the page. */
    rail: "About",
    eyebrow: "Hey there, I'm Vlad!",
    /** One entry per paragraph. */
    body: [
      "I’m a Product Designer with 10+ years of experience solving complex product problems. I turn complicated workflows, business requirements and user needs into products that feel clear and simple.",
      "I’ve worked across fintech, SaaS, enterprise and consumer products, helping teams turn early ideas into scalable, shipped experiences. My work sits at the intersection of users, business and technology. I focus on understanding the problem, finding the right direction, simplifying complexity and building systems that can grow with the product.",
    ],
    cta: "More about me",
  },
  /** Labels on the case study pages. The case copy itself is in lib/cases. */
  caseStudy: {
    /** The left rail's names for the sections, in page order. */
    nav: ["Intro", "Context", "Role", "Overview", "Transformation", "Impact", "Reflection"],
    context: {
      label: "Context",
      /** The three parts, as on the current site. */
      stages: ["The invite", "What followed", "The outcome"],
    },
    role: {
      label: "My role",
      owned: "What I owned",
      withWhom: "With whom",
      howIWorked: "How I worked",
    },
    overview: { label: "Overview" },
    transformation: { label: "Product transformation" },
    impact: { label: "Impact" },
    reflection: { label: "Reflection" },
    next: { label: "Next case", view: "View case ↗" },
    contact: {
      headline: "Have a product problem worth solving?",
      body: "Tell me what you’re working on.",
    },
  },
  /** The About page (app/[lang]/about), in the order of the current site. */
  aboutPage: {
    title: "About",
    description:
      "Product designer with 10+ years of experience across fintech, proptech, SaaS and enterprise platforms.",
    /** The left rail's names for the sections, in page order. */
    nav: ["Intro", "My story", "At a glance", "Experience", "How I work", "Stack", "Photos"],
    hero: {
      status: "Available for new projects",
      /** Placeholder until the final wording is in. Two lines, like a case. */
      headline: ["Hi, I’m", "Vlad."],
      statement: "A product designer who started with a sketchbook and grew into leading complex, multi-platform products.",
      meta: ["Based in Europe", "Lead Product Designer", "10+ years · Web / Mobile"],
      cover: "Vlad at work, laptop open in a shared office",
    },
    story: {
      label: "My story",
      lead: "I came to product design through art. Composition and craft came first; product, systems and business thinking grew out of them, one project at a time.",
      /** The path, oldest first: each stage with a few lines on what it
       *  added. */
      path: [
        {
          name: "Art school",
          note: "Where it started: years of drawing, painting and composition. I learned to look closely, to notice light, proportion and rhythm, and to keep reworking something until it holds together.",
        },
        {
          name: "Graphic Design",
          note: "A Bachelor’s degree in Graphic Design turned taste into method. Visual communication, typography and grids, and the idea that design is a way to solve a problem, not to decorate it.",
        },
        {
          name: "Freelance",
          note: "Real clients while still at university. Briefs, deadlines and feedback taught me ownership, and that the work only counts once it ships and does its job for the business.",
        },
        {
          name: "Digital products",
          note: "From single screens to whole flows across web and mobile. Interfaces stopped being pictures and became journeys, states and edge cases that real people move through.",
        },
        {
          name: "Product design",
          note: "Research, strategy and design systems joined the craft. I started with the problem and the metrics, then shaped the solution with product and engineering around them.",
        },
        {
          name: "Lead",
          note: "Today I own the design direction of complex, multi-platform products: framing problems, aligning stakeholders, building systems that scale and helping other designers grow.",
        },
      ],
    },
    glance: {
      label: "At a glance",
      /** The numbers from the current site's About page. */
      items: [
        { value: "10+", label: "Years of experience", body: "A proven track record of designing and launching digital products across multiple industries." },
        { value: "40+", label: "Projects launched", body: "Delivered web and mobile products from concept to launch in startups and enterprise teams." },
        { value: "15+", label: "Industries shaped", body: "From investment platforms and retail systems to SaaS products, education platforms and enterprise solutions." },
        { value: "Lead", label: "Product Designer", body: "Driving product strategy, UX direction and execution." },
      ],
    },
    experience: {
      label: "Experience",
      range: "2015 → Now",
      /** The label over the evolution rail. */
      growth: "How the work grew",
      chapters: [
        {
          years: "2016–2018",
          company: "Wandr",
          stage: "UI/UX",
          role: ["UX/UI Designer", "Remote"],
          note: "Designed UI and UX solutions for multiple client projects across web and mobile platforms, creating user flows, wireframes, prototypes, and high-fidelity interfaces.",
          tags: ["UX Design", "User Flows", "Information Architecture", "Wireframing", "Prototyping", "Web & Mobile"],
        },
        {
          years: "2018–2023",
          company: "BitterBrains",
          stage: "Product Design",
          role: ["Product Designer", "Remote"],
          note: "Designed end-to-end user experiences for educational and SaaS products, from research and wireframes to polished interfaces, design systems, and developer handoff.",
          tags: ["EdTech", "SaaS", "User Research", "Design Systems", "Developer Handoff", "End-to-End Design"],
        },
        {
          years: "2023–2025",
          company: "SPD Tech",
          stage: "Complex Systems",
          role: ["Lead Product Designer", "Part-time"],
          note: "Led end-to-end product design for complex digital products, shaping user experiences, influencing product decisions, and driving successful product launches across multiple platforms.",
          tags: ["Product Design", "Complex Workflows", "Cross-platform", "Design Leadership", "Product Strategy", "Digital Products"],
        },
        {
          years: "2024–2025",
          company: "Fozzy Group",
          stage: "Product Thinking",
          role: ["Product Designer", "Part-time"],
          note: "Designed scalable enterprise solutions for one of Ukraine’s largest retail groups, simplifying complex processes, improving user productivity, and enhancing operational efficiency.",
          tags: ["Enterprise Products", "Retail Operations", "Workflow Optimization", "Process Simplification", "Data-heavy Interfaces", "Scalable Systems"],
        },
        {
          years: "2025–2026",
          company: "SmartCrowd",
          stage: "Lead",
          role: ["Lead Product Designer", "Remote"],
          note: "Led product design for a regulated real estate investment platform, shaping core investment experiences across web and mobile products while driving product innovation and business growth.",
          tags: ["Product Leadership", "Fintech", "Investment Platform", "Cross-platform", "Product Innovation", "Business Growth"],
        },
      ],
    },
    process: {
      label: "How I work",
      /** Four steps, each a short name on the left and a card on the right. */
      steps: [
        {
          title: "Understand first",
          body: "Before any screen, I get to the real problem: who it hurts, what the business needs and what we already know. Good design starts with the right question.",
        },
        {
          title: "Make it smaller",
          body: "Big problems hide simple decisions. I break the work into pieces we can reason about, test and ship, so progress is visible early.",
        },
        {
          title: "Decide together",
          body: "Product, engineering and stakeholders come in early. When opinions collide, research and data settle it, not the loudest voice in the room.",
        },
        {
          title: "Ship and learn",
          body: "Launch is the start, not the finish. I measure what shipped, learn from real use and keep improving the product and the system behind it.",
        },
      ],
    },
    stack: {
      label: "Product design stack",
      groups: [
        {
          title: "Design",
          items: ["Figma", "FigJam", "Framer", "Mobbin", "Protopie", "Principle", "Adobe Creative Suite"],
        },
        {
          title: "Design Systems",
          items: ["Storybook", "Design Tokens", "Variables", "Component Libraries", "Documentation", "Accessibility"],
        },
        {
          title: "Research",
          items: ["User Interviews", "Maze", "Usability Testing", "Surveys", "Competitive Analysis", "Journey Mapping"],
        },
        { title: "Analytics", items: ["PostHog", "SQL", "A/B Testing"] },
        {
          title: "Collaboration",
          items: ["Jira", "Notion", "Confluence", "Slack", "Workshop Facilitation", "Stakeholder Management"],
        },
        { title: "AI", items: ["ChatGPT", "Claude", "Figma Make", "Generative AI Tools"] },
      ],
    },
    photos: {
      label: "Photos",
      images: [
        "Portrait, sitting, smiling",
        "On the slopes, snowboard in hand",
        "At the Louvre pyramid in Paris",
        "Sitting under the arches in Valencia",
        "Looking over the bay in Kotor",
      ],
    },
  },
  contacts: {
    /** Set vertically in the left margin, the same as about.rail. */
    rail: "Contact",
    headline: ["Let’s talk about", "your product"],
    body: "If you have a product, team or challenge in mind, I’d be happy to hear about it.",
    email: "Email me",
    resume: "Download resume",
    /** The footer link back to the hero. */
    top: "Back to top",
    /** Alt text for the background picture. */
    scene: "The same desk at night, the chair pushed back and the screen left on.",
  },
  testimonials: {
    /** Set vertically in the left margin, the same as about.rail. */
    rail: "Words",
    /** Read out to screen readers ahead of the list. */
    label: "Testimonials",
    /** Opens the whole recommendation behind the excerpt. */
    full: "Read full quote",
    close: "Close",
    /** The recommendations from the current site. `full` is the whole text,
     *  word for word; `quote` is the excerpt shown on the page, made of the
     *  author's own sentences (… marks a cut), chosen to keep what they value
     *  most. `company` is left empty where it is not known. */
    items: [
      {
        quote:
          "Vlad has this quiet superpower: no matter how complex or undefined a design problem is, he finds his way through it. His eye for detail and his instinct for what users actually need are things you can’t teach.",
        full:
          "Vlad has helped us enormously over five years, across a wide range of projects — and honestly, working with him has been one of the most consistent bright spots of that time. Vlad has this quiet superpower: no matter how complex or undefined a design problem is, he finds his way through it. I’ve seen him take on projects that felt almost impossible to scope and come back with solutions that were not only technically sound but genuinely beautiful to use. His eye for detail and his instinct for what users actually need are things you can’t teach. Vlad would be a tremendous asset to any product team lucky enough to work with him.",
        name: "Olesia Borshchova",
        role: "Senior PM & PO",
        company: "",
      },
      {
        quote:
          "Vlad is one of those rare professionals you hire because of his expertise… He brings strategic thinking, sets the direction, proposes better solutions, and helps the team make smarter decisions.",
        full:
          "One of the most important qualities of a great UI/UX designer is the ability to create a real “wow” effect. While good design is often subjective, consistently exceeding the expectations of users and the team is what sets exceptional designers apart. I had the pleasure of working with Vlad for more than six years, and throughout that time he continued to impress me with his creativity and design skills. Even after years of working together, he always found new ways to surprise us with thoughtful and innovative solutions. He also taught me a lot about UX, and I’m truly grateful for everything I learned from him. Vlad is one of those rare professionals you hire because of his expertise — not simply to follow directions. He brings strategic thinking, sets the direction, proposes better solutions, and helps the team make smarter decisions, rather than waiting to be told what to do. I’ve worked with many designers throughout my career, but Vlad is, without a doubt, the best UI/UX designer I’ve had the opportunity to work with. His expertise, professionalism, and ability to create outstanding user experiences make him an exceptional designer and a valuable addition to any team.",
        name: "Igor Dmitriev",
        role: "Founder",
        company: "Softa",
      },
      {
        quote:
          "He has the ability to put himself in the users’ shoes, asking the right questions and consistently looking for ways to improve the user journey. Any team would be lucky to have him.",
        full:
          "I had the pleasure of working closely with Vlad, and I highly recommend him as a Sr. Product Designer. He has the ability to put himself in the users’ shoes, asking the right questions and consistently looking for ways to improve the user journey. He has a good combination of technical understanding, and attention to detail allows him to create effective solutions for the user journeys. He is also proactive in bringing new ideas to the table, works efficiently across multiple priorities, and delivers high-quality work at a fast pace. Any team would be lucky to have him, and I’m confident he will continue to make a strong impact wherever he goes.",
        name: "Ligia Gutierrez",
        role: "Product Manager",
        company: "",
      },
      {
        quote:
          "What sets Vlad apart is his range. Beyond strong design skills, he’s a genuinely talented illustrator, and that creative depth elevated so many of our projects.",
        full:
          "I had the pleasure of managing Vlad since 2019 at BitterBrains, where he’s been part of the team since the very beginning. As our web designer, Vlad consistently delivered great work. Always on time with deadlines, always ready to support the team. What sets Vlad apart is his range. Beyond strong design skills, he’s a genuinely talented illustrator, and that creative depth elevated so many of our projects. He’s also just an incredibly reliable colleague, the kind of person who gets things done well without you having to worry about it. Vlad would be a fantastic addition to any team looking for a designer who combines strong craft, creativity, and real dependability. I’m grateful to have worked with him, and I highly recommend him.",
        name: "Maria Panagiotidou",
        role: "Director of Operations",
        company: "BitterBrains",
      },
      {
        quote:
          "Vlad played a key role in shaping our design foundations… His attention to detail and systems-thinking helped bring consistency across experiences while making it easier for the team to build quickly and at scale.",
        full:
          "Vlad played a key role in shaping our design foundations, most notably through his work on the refreshed SmartCrowd app and web experience, along with the creation of scalable design systems for our core brand and white-label products. His attention to detail and systems-thinking helped bring consistency across experiences while making it easier for the team to build quickly and at scale. He’s highly proactive, reliable, quick to iterate, and always eager to learn and improve. Vlad consistently delivered high-quality work while maintaining speed, making him a valuable partner on any product team.",
        name: "Maleeha Murad",
        role: "Product Manager",
        company: "SmartCrowd",
      },
    ],
  },
  works: {
    /** Set vertically in the left margin, the same as about.rail. */
    rail: "Works",
    /** Written inside the circle that replaces the cursor over a case. */
    explore: "View case ↗",
    /** Where the progress bar under the cases reads out. */
    progress: "Case",
    cases: {
      smartcrowd:
        "Led a full product transformation across mobile, web and partner platforms, unifying fragmented user journeys and building a scalable design system from scratch.",
      "space-needle":
        "Designed a unified ticketing ecosystem across web, self-service kiosks and on-site tools, connecting purchase flows, accessibility and operations into one consistent experience.",
      "dan-mon-fairwind":
        "Designed an enterprise CRM that brought the full marine-parts sales cycle into one workflow, from opportunities and quotations to procurement, orders and delivery.",
      "fozzy-group":
        "Simplified complex retail back-office workflows for product catalog and commerce operations, creating clearer internal tools and a scalable design system for everyday work.",
      bitterbrains:
        "Designed and evolved a developer education ecosystem across learning platforms, certifications, conferences and B2B services, maintaining consistency as it scaled to 15 products.",
    } satisfies Record<CaseSlug, string>,
  },
};

type Widen<T> = T extends string
  ? string
  : T extends readonly string[]
    ? readonly string[]
    : { [K in keyof T]: Widen<T[K]> };

export type Dictionary = Widen<typeof en>;

const uk: Dictionary = {
  meta: {
    name: "Влад Голобородько",
    role: "Продуктовий дизайнер",
    description:
      "Продуктовий дизайнер з 2015 року. Веду ідею від сирої постановки задачі до запущеного продукту: дослідження, UX, UI і бізнес-логіка за кожним екраном.",
  },
  ui: {
    mainNav: "Головне меню",
    language: "Мова",
    openMenu: "Відкрити меню",
    closeMenu: "Закрити меню",
  },
  nav: {
    works: "Проєкти",
    about: "Про мене",
    contacts: "Контакти",
  },
  status: "Відкритий до роботи",
  resume: "Резюме",
  hero: {
    eyebrow: "Senior Product Designer",
    headline: ["Роблю складні", "продукти простими"],
    sub: "Від дослідження до масштабованих систем: проєктую продукти для людей і бізнесу.",
    cta: "Дивитися роботи",
  },
  contact: {
    title: "Давай поговоримо",
    lead: "Розкажи трохи про свій продукт або вакансію, і я відповім протягом дня.",
    name: "Ім'я",
    email: "Email",
    message: "Повідомлення",
    send: "Надіслати",
    sending: "Надсилаю…",
    sent: "Дякую! Повідомлення надіслано, скоро відповім.",
    error: "Щось пішло не так. Спробуй ще раз або напиши мені напряму:",
    close: "Закрити",
  },
  about: {
    rail: "Про мене",
    eyebrow: "Привіт, я Влад!",
    body: [
      "Я продуктовий дизайнер з досвідом понад 10 років у розв’язанні складних продуктових задач. Перетворюю заплутані процеси, бізнес-вимоги й потреби користувачів на продукти, які сприймаються зрозумілими і простими.",
      "Працював із фінтехом, SaaS, enterprise і споживчими продуктами, допомагаючи командам перетворювати ранні ідеї на масштабовані запущені продукти. Моя робота лежить на перетині користувачів, бізнесу й технологій. Я зосереджуюсь на тому, щоб зрозуміти проблему, знайти правильний напрямок, спростити складне і побудувати системи, які ростуть разом із продуктом.",
    ],
    cta: "Більше про мене",
  },
  caseStudy: {
    nav: ["Вступ", "Контекст", "Роль", "Огляд", "Трансформація", "Результат", "Висновки"],
    context: {
      label: "Контекст",
      stages: ["Запрошення", "Що було далі", "Результат"],
    },
    role: {
      label: "Моя роль",
      owned: "За що я відповідав",
      withWhom: "З ким",
      howIWorked: "Як я працював",
    },
    overview: { label: "Огляд" },
    transformation: { label: "Трансформація продукту" },
    impact: { label: "Результат" },
    reflection: { label: "Висновки" },
    next: { label: "Наступний кейс", view: "Дивитися кейс ↗" },
    contact: {
      headline: "Є продуктова задача, яку варто розв’язати?",
      body: "Розкажи, над чим працюєш.",
    },
  },
  aboutPage: {
    title: "Про мене",
    description:
      "Продуктовий дизайнер з досвідом понад 10 років у Fintech, Proptech, SaaS та enterprise-платформах.",
    nav: ["Вступ", "Моя історія", "Коротко", "Досвід", "Як я працюю", "Стек", "Фото"],
    hero: {
      status: "Відкритий до нових проєктів",
      headline: ["Привіт,", "я Влад."],
      statement: "Продуктовий дизайнер, який почав зі скетчбука і виріс до лідерства у складних мультиплатформних продуктах.",
      meta: ["Живу в Європі", "Lead Product Designer", "10+ років · Web / Mobile"],
      cover: "Влад за роботою, з ноутбуком у спільному офісі",
    },
    story: {
      label: "Моя історія",
      lead: "Я прийшов у продуктовий дизайн через мистецтво. Спершу були композиція і ремесло, а продуктове, системне й бізнесове мислення виросли з них, проєкт за проєктом.",
      path: [
        {
          name: "Художня школа",
          note: "Звідси все почалося: роки малюнку, живопису й композиції. Я навчився уважно дивитися, помічати світло, пропорції й ритм і переробляти роботу, поки вона не складеться.",
        },
        {
          name: "Graphic Design",
          note: "Бакалавр з графічного дизайну перетворив смак на метод. Візуальна комунікація, типографіка й сітки, і розуміння, що дизайн розв’язує задачу, а не прикрашає її.",
        },
        {
          name: "Фриланс",
          note: "Справжні клієнти ще під час навчання. Брифи, дедлайни й фідбек навчили відповідальності і того, що робота рахується лише тоді, коли запущена і працює на бізнес.",
        },
        {
          name: "Digital-продукти",
          note: "Від окремих екранів до цілих сценаріїв у вебі й мобільних. Інтерфейси перестали бути картинками і стали шляхами, станами й крайніми випадками, якими ходять живі люди.",
        },
        {
          name: "Product Design",
          note: "До ремесла додались дослідження, стратегія і дизайн-системи. Я почав з проблеми й метрик, а рішення формував разом з продактами й інженерами навколо них.",
        },
        {
          name: "Lead",
          note: "Сьогодні я веду дизайн-напрям складних мультиплатформних продуктів: формулюю проблеми, узгоджую стейкхолдерів, будую системи, що масштабуються, і допомагаю рости іншим дизайнерам.",
        },
      ],
    },
    glance: {
      label: "Коротко",
      items: [
        { value: "10+", label: "Років досвіду", body: "Підтверджений досвід проєктування і запуску цифрових продуктів у багатьох галузях." },
        { value: "40+", label: "Запущених проєктів", body: "Веб- і мобільні продукти від концепції до запуску, у стартапах і enterprise-командах." },
        { value: "15+", label: "Галузей", body: "Від інвестиційних платформ і ритейл-систем до SaaS, освітніх платформ і enterprise-рішень." },
        { value: "Lead", label: "Product Designer", body: "Продуктова стратегія, UX-напрям і втілення." },
      ],
    },
    experience: {
      label: "Досвід",
      range: "2015 → Сьогодні",
      growth: "Як росла робота",
      chapters: [
        {
          years: "2016–2018",
          company: "Wandr",
          stage: "UI/UX",
          role: ["UX/UI Designer", "Remote"],
          note: "Проєктував UI та UX для клієнтських проєктів у вебі й мобільних: user flows, вайрфрейми, прототипи та фінальні інтерфейси.",
          tags: ["UX Design", "User Flows", "Information Architecture", "Wireframing", "Prototyping", "Web & Mobile"],
        },
        {
          years: "2018–2023",
          company: "BitterBrains",
          stage: "Product Design",
          role: ["Product Designer", "Remote"],
          note: "Проєктував повний користувацький досвід для освітніх і SaaS-продуктів: від досліджень і вайрфреймів до готових інтерфейсів, дизайн-систем і передачі в розробку.",
          tags: ["EdTech", "SaaS", "User Research", "Design Systems", "Developer Handoff", "End-to-End Design"],
        },
        {
          years: "2023–2025",
          company: "SPD Tech",
          stage: "Complex Systems",
          role: ["Lead Product Designer", "Part-time"],
          note: "Вів продуктовий дизайн складних цифрових продуктів від початку до кінця: формував досвід користувачів, впливав на продуктові рішення й доводив запуски до успіху на кількох платформах.",
          tags: ["Product Design", "Complex Workflows", "Cross-platform", "Design Leadership", "Product Strategy", "Digital Products"],
        },
        {
          years: "2024–2025",
          company: "Fozzy Group",
          stage: "Product Thinking",
          role: ["Product Designer", "Part-time"],
          note: "Проєктував масштабовані enterprise-рішення для однієї з найбільших ритейл-груп України: спрощував складні процеси, підвищував продуктивність користувачів і операційну ефективність.",
          tags: ["Enterprise Products", "Retail Operations", "Workflow Optimization", "Process Simplification", "Data-heavy Interfaces", "Scalable Systems"],
        },
        {
          years: "2025–2026",
          company: "SmartCrowd",
          stage: "Lead",
          role: ["Lead Product Designer", "Remote"],
          note: "Вів продуктовий дизайн регульованої платформи інвестицій у нерухомість: формував ключовий інвестиційний досвід у веб- і мобільних продуктах, рухаючи інновації та зростання бізнесу.",
          tags: ["Product Leadership", "Fintech", "Investment Platform", "Cross-platform", "Product Innovation", "Business Growth"],
        },
      ],
    },
    process: {
      label: "Як я працюю",
      steps: [
        {
          title: "Спершу зрозуміти",
          body: "Ще до першого екрана я добираюся до справжньої проблеми: кому вона болить, що потрібно бізнесу і що ми вже знаємо. Хороший дизайн починається з правильного питання.",
        },
        {
          title: "Зменшити задачу",
          body: "За великими проблемами ховаються прості рішення. Я розбиваю роботу на частини, які можна обговорити, перевірити й запустити, щоб прогрес було видно одразу.",
        },
        {
          title: "Вирішувати разом",
          body: "Продакт, інженери й стейкхолдери долучаються рано. Коли думки розходяться, вирішують дослідження й дані, а не найгучніший голос у кімнаті.",
        },
        {
          title: "Запускати і вчитися",
          body: "Запуск це початок, а не фініш. Я вимірюю результат, вчуся на реальному використанні й далі покращую продукт і систему за ним.",
        },
      ],
    },
    stack: {
      label: "Стек продуктового дизайну",
      groups: [
        {
          title: "Design",
          items: ["Figma", "FigJam", "Framer", "Mobbin", "Protopie", "Principle", "Adobe Creative Suite"],
        },
        {
          title: "Design Systems",
          items: ["Storybook", "Design Tokens", "Variables", "Component Libraries", "Documentation", "Accessibility"],
        },
        {
          title: "Research",
          items: ["User Interviews", "Maze", "Usability Testing", "Surveys", "Competitive Analysis", "Journey Mapping"],
        },
        { title: "Analytics", items: ["PostHog", "SQL", "A/B Testing"] },
        {
          title: "Collaboration",
          items: ["Jira", "Notion", "Confluence", "Slack", "Workshop Facilitation", "Stakeholder Management"],
        },
        { title: "AI", items: ["ChatGPT", "Claude", "Figma Make", "Generative AI Tools"] },
      ],
    },
    photos: {
      label: "Фото",
      images: [
        "Портрет, сидить і усміхається",
        "На схилі, зі сноубордом",
        "Біля піраміди Лувру в Парижі",
        "Під арками у Валенсії",
        "З видом на затоку в Которі",
      ],
    },
  },
  contacts: {
    rail: "Контакти",
    headline: ["Поговорімо про", "твій продукт"],
    body: "Якщо в тебе є продукт, команда чи задача, буду радий про це почути.",
    email: "Написати мені",
    resume: "Завантажити резюме",
    top: "Нагору",
    scene: "Той самий стіл уночі, крісло відсунуте, екран увімкнений.",
  },
  testimonials: {
    rail: "Відгуки",
    label: "Відгуки",
    full: "Читати повністю",
    close: "Закрити",
    /** The recommendations stay in the words their authors wrote them in. */
    items: en.testimonials.items,
  },
  works: {
    rail: "Проєкти",
    explore: "Дивитися кейс ↗",
    progress: "Кейс",
    cases: {
      smartcrowd:
        "Очолив повну трансформацію продукту на мобільних, веб- і партнерських платформах: об’єднав розрізнені шляхи користувачів і з нуля побудував масштабовану дизайн-систему.",
      "space-needle":
        "Спроєктував єдину екосистему продажу квитків для вебу, кіосків самообслуговування та інструментів на місці, поєднавши покупку, доступність і операційну роботу в один цілісний досвід.",
      "dan-mon-fairwind":
        "Спроєктував корпоративну CRM, яка звела весь цикл продажу суднових запчастин в один робочий процес: від можливостей і комерційних пропозицій до закупівель, замовлень і доставки.",
      "fozzy-group":
        "Спростив складні бек-офісні процеси ритейлу для каталогу товарів і комерційних операцій, створивши зрозуміліші внутрішні інструменти й масштабовану дизайн-систему для щоденної роботи.",
      bitterbrains:
        "Проєктував і розвивав освітню екосистему для розробників: навчальні платформи, сертифікації, конференції та B2B-сервіси, зберігаючи цілісність, поки вона зросла до 15 продуктів.",
    },
  },
};

const DICTIONARIES: Record<Locale, Dictionary> = { en, uk };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}
