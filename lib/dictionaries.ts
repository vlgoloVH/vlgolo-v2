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
    nav: ["Intro", "Context", "Role", "Challenge", "Solution", "System", "Impact"],
    quick: {
      label: "Project in 30 seconds",
      product: "The product",
      problem: "The problem",
      role: "My role",
      result: "The result",
    },
    context: {
      label: "Context",
      stages: ["The invite", "What I found", "What happened next"],
    },
    role: { label: "My role", scope: "Scope", team: "Worked with" },
    challenge: { label: "The challenge" },
    chapter: "Chapter",
    impact: { label: "Impact" },
    reflection: { label: "Reflection", heading: "What this project taught me" },
    next: { label: "Next case", view: "View case ↗" },
  },
  /** The About page (app/[lang]/about). */
  aboutPage: {
    title: "About",
    description:
      "Product Designer with 10+ years of experience turning complex workflows, business rules and product constraints into clear, scalable experiences.",
    /** The left rail's names for the sections, in page order. */
    nav: ["Intro", "Story", "Thinking", "Experience", "Process", "Capabilities", "Personal"],
    hero: {
      eyebrow: "About · Product Designer since 2015",
      headline: ["I work where", "products get complex."],
      body: "I’m a Product Designer with 10+ years of experience turning complex workflows, business rules and product constraints into clear, scalable experiences.",
      /** The oversized word behind the portrait. */
      backdrop: "Holoborodko",
      scroll: "Scroll",
      portrait: "Vlad Holoborodko, black and white portrait",
    },
    story: {
      label: "Story",
      headline: ["From craft", "to systems."],
      body: "I started with visual design. Over time, I became more interested in why products work, how systems behave and how design decisions affect people and business.",
      /** The path, one step at a time; the last is where it has led. */
      path: [
        "Art",
        "Graphic design",
        "Digital design",
        "Product design",
        "Complex SaaS, enterprise, fintech",
        "Lead-level product ownership",
      ],
      fragments: ["2015", "10+ years", "Product design"],
      images: ["At work, laptop open in a shared office", "Portrait, sitting, smiling"],
    },
    philosophy: {
      label: "Thinking",
      statement:
        "Good product design is not about making screens look simpler. It’s about making the product itself simpler.",
      principles: [
        { title: "Understand the system", body: "Users, business, constraints and data." },
        {
          title: "Reduce complexity",
          body: "Find what matters, remove friction and create clear structure.",
        },
        {
          title: "Build for scale",
          body: "Create decisions, patterns and systems that survive beyond one screen.",
        },
      ],
    },
    experience: {
      label: "Experience",
      range: "2015 → 2026",
      years: "10+ years",
      chapters: [
        {
          years: "2025–2026",
          role: "Lead Product Designer",
          company: "SmartCrowd",
          note: "Lead-level ownership: a full product transformation across mobile, web and partner platforms, and a design system built from scratch.",
        },
        {
          years: "2023–2025",
          role: "Lead Product Designer · Product Designer",
          company: "SPD Tech · Fozzy Group",
          note: "Complexity at enterprise scale: retail back-office workflows for one of Ukraine’s largest retailers, and lead-level work on multi-platform products.",
        },
        {
          years: "2018–2023",
          role: "Product Designer",
          company: "BitterBrains",
          note: "Growing with a company from early stage to 50+ people as its main designer, across 15 products and 4 conferences, from research to design systems.",
        },
        {
          years: "2015–2018",
          role: "UX/UI Designer",
          company: "Wandr · Freelance",
          note: "Where it started: freelance work while still at university, then UX and UI for client products on web and mobile.",
        },
      ],
    },
    process: {
      label: "Process",
      heading: "How I work",
      statements: [
        "Understand before designing.",
        "Make the problem smaller.",
        "Bring people into the process early.",
        "Use evidence when opinions collide.",
        "Ship, learn, improve.",
      ],
    },
    capabilities: {
      label: "Capabilities",
      groups: [
        {
          title: "Product thinking",
          items: ["Discovery", "Research", "Product strategy", "Analytics", "Validation"],
        },
        {
          title: "Experience design",
          items: [
            "Information architecture",
            "UX",
            "Interaction design",
            "Prototyping",
            "Complex workflows",
          ],
        },
        {
          title: "Systems & scale",
          items: [
            "Design systems",
            "Tokens",
            "Multi-platform products",
            "Collaboration",
            "Design leadership",
          ],
        },
      ],
      toolsLabel: "Tools",
    },
    personal: {
      label: "Personal",
      headline: "Before product design, there was design.",
      body: "Art school, then a degree in graphic design, then years of freelance visual work. Composition, type and detail still shape how I design products today.",
      images: [
        "On the slopes, snowboard in hand",
        "At the Louvre pyramid in Paris",
        "Sitting under the arches in Valencia",
        "Looking over the bay in Kotor",
      ],
    },
    cta: {
      headline: ["Still curious?", "Here’s the formal version."],
      resume: "Download resume",
      body: "Or let’s talk about a product, a role or a complex problem.",
      contact: "Contact me",
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
    nav: ["Вступ", "Контекст", "Роль", "Виклик", "Рішення", "Система", "Результат"],
    quick: {
      label: "Проєкт за 30 секунд",
      product: "Продукт",
      problem: "Проблема",
      role: "Моя роль",
      result: "Результат",
    },
    context: {
      label: "Контекст",
      stages: ["Запрошення", "Що я знайшов", "Що було далі"],
    },
    role: { label: "Моя роль", scope: "Зона відповідальності", team: "Працював з" },
    challenge: { label: "Виклик" },
    chapter: "Розділ",
    impact: { label: "Результат" },
    reflection: { label: "Висновки", heading: "Чого мене навчив цей проєкт" },
    next: { label: "Наступний кейс", view: "Дивитися кейс ↗" },
  },
  aboutPage: {
    title: "Про мене",
    description:
      "Продуктовий дизайнер з досвідом понад 10 років: перетворюю складні процеси, бізнес-правила й обмеження продукту на зрозумілий масштабований досвід.",
    nav: ["Вступ", "Історія", "Мислення", "Досвід", "Процес", "Навички", "Особисте"],
    hero: {
      eyebrow: "Про мене · Продуктовий дизайнер з 2015",
      headline: ["Я працюю там,", "де продукт стає складним."],
      body: "Я продуктовий дизайнер з досвідом понад 10 років: перетворюю складні процеси, бізнес-правила й обмеження продукту на зрозумілий масштабований досвід.",
      backdrop: "Holoborodko",
      scroll: "Гортай",
      portrait: "Влад Голобородько, чорно-білий портрет",
    },
    story: {
      label: "Історія",
      headline: ["Від ремесла", "до систем."],
      body: "Я починав із візуального дизайну. З часом мене все більше цікавило, чому продукти працюють, як поводяться системи і як дизайн-рішення впливають на людей і бізнес.",
      path: [
        "Мистецтво",
        "Графічний дизайн",
        "Цифровий дизайн",
        "Продуктовий дизайн",
        "Складні SaaS, enterprise, фінтех",
        "Відповідальність за продукт на рівні lead",
      ],
      fragments: ["2015", "10+ років", "Product design"],
      images: ["За роботою, з ноутбуком у спільному офісі", "Портрет, сидить і усміхається"],
    },
    philosophy: {
      label: "Мислення",
      statement:
        "Хороший продуктовий дизайн не про те, щоб екрани виглядали простіше. Він про те, щоб простішим став сам продукт.",
      principles: [
        { title: "Зрозуміти систему", body: "Користувачі, бізнес, обмеження й дані." },
        {
          title: "Зменшити складність",
          body: "Знайти головне, прибрати тертя й створити ясну структуру.",
        },
        {
          title: "Будувати на масштаб",
          body: "Рішення, патерни й системи, які живуть довше за один екран.",
        },
      ],
    },
    experience: {
      label: "Досвід",
      range: "2015 → 2026",
      years: "10+ років",
      chapters: [
        {
          years: "2025–2026",
          role: "Lead Product Designer",
          company: "SmartCrowd",
          note: "Відповідальність на рівні lead: повна трансформація продукту на мобільних, веб- і партнерських платформах та дизайн-система з нуля.",
        },
        {
          years: "2023–2025",
          role: "Lead Product Designer · Product Designer",
          company: "SPD Tech · Fozzy Group",
          note: "Складність корпоративного масштабу: бек-офісні процеси одного з найбільших ритейлерів України та lead-робота над мультиплатформними продуктами.",
        },
        {
          years: "2018–2023",
          role: "Product Designer",
          company: "BitterBrains",
          note: "Ріс разом із компанією від раннього етапу до 50+ людей як її головний дизайнер: 15 продуктів і 4 конференції, від досліджень до дизайн-систем.",
        },
        {
          years: "2015–2018",
          role: "UX/UI Designer",
          company: "Wandr · Фриланс",
          note: "З чого все почалося: фриланс ще під час навчання в університеті, потім UX і UI для клієнтських продуктів у вебі та мобільних.",
        },
      ],
    },
    process: {
      label: "Процес",
      heading: "Як я працюю",
      statements: [
        "Зрозуміти, перш ніж проєктувати.",
        "Зробити проблему меншою.",
        "Залучати людей у процес рано.",
        "Спиратися на факти, коли думки розходяться.",
        "Запускати, вчитися, покращувати.",
      ],
    },
    capabilities: {
      label: "Навички",
      groups: [
        {
          title: "Продуктове мислення",
          items: ["Discovery", "Дослідження", "Продуктова стратегія", "Аналітика", "Валідація"],
        },
        {
          title: "Дизайн досвіду",
          items: [
            "Інформаційна архітектура",
            "UX",
            "Interaction design",
            "Прототипування",
            "Складні процеси",
          ],
        },
        {
          title: "Системи й масштаб",
          items: [
            "Дизайн-системи",
            "Токени",
            "Мультиплатформні продукти",
            "Співпраця",
            "Лідерство в дизайні",
          ],
        },
      ],
      toolsLabel: "Інструменти",
    },
    personal: {
      label: "Особисте",
      headline: "До продуктового дизайну був просто дизайн.",
      body: "Художня школа, потім диплом графічного дизайнера, потім роки візуальної роботи на фрилансі. Композиція, типографіка й деталі досі визначають, як я проєктую продукти.",
      images: [
        "На схилі, зі сноубордом",
        "Біля піраміди Лувру в Парижі",
        "Під арками у Валенсії",
        "З видом на затоку в Которі",
      ],
    },
    cta: {
      headline: ["Досі цікаво?", "Ось офіційна версія."],
      resume: "Завантажити резюме",
      body: "Або поговорімо про продукт, роль чи складну задачу.",
      contact: "Написати мені",
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
