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
        "A UAE real estate investment platform where people can invest in property and manage their portfolio in one place.",
    } satisfies Record<CaseSlug, string>,
    placeholder: {
      title: "Coming soon",
      description: "This case study is on its way.",
    },
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
    items: [
      {
        quote:
          "У Влада є тиха суперсила: хоч якою складною чи розмитою була б дизайн-задача, він знаходить у ній шлях. Його око на деталі й чуття того, що насправді потрібно користувачам, неможливо навчити.",
        full:
          "Влад дуже допоміг нам за п’ять років у найрізноманітніших проєктах, і, чесно кажучи, робота з ним була однією з найстабільніших світлих сторін цього часу. У Влада є тиха суперсила: хоч якою складною чи розмитою була б дизайн-задача, він знаходить у ній шлях. Я бачила, як він брався за проєкти, які здавалося майже неможливо окреслити, і повертався з рішеннями, що були не лише технічно продуманими, а й по-справжньому приємними у використанні. Його око на деталі й чуття того, що насправді потрібно користувачам, неможливо навчити. Влад стане величезним надбанням для будь-якої продуктової команди, якій пощастить із ним працювати.",
        name: "Olesia Borshchova",
        role: "Senior PM & PO",
        company: "",
      },
      {
        quote:
          "Влад з тих рідкісних професіоналів, яких наймають заради експертизи… Він приносить стратегічне мислення, задає напрям, пропонує кращі рішення й допомагає команді ухвалювати розумніші рішення.",
        full:
          "Одна з найважливіших якостей сильного UI/UX дизайнера: уміння створювати справжній «вау»-ефект. Хороший дизайн часто суб’єктивний, але саме здатність постійно перевершувати очікування користувачів і команди вирізняє виняткових дизайнерів. Я мав задоволення працювати з Владом понад шість років, і весь цей час він продовжував вражати мене своєю креативністю та дизайнерськими навичками. Навіть після років спільної роботи він завжди знаходив нові способи здивувати нас продуманими й інноваційними рішеннями. Він також багато чого навчив мене в UX, і я щиро вдячний за все, чого від нього навчився. Влад з тих рідкісних професіоналів, яких наймають заради експертизи, а не просто щоб виконувати вказівки. Він приносить стратегічне мислення, задає напрям, пропонує кращі рішення й допомагає команді ухвалювати розумніші рішення, а не чекає, поки йому скажуть, що робити. За свою кар’єру я працював із багатьма дизайнерами, але Влад, без жодних сумнівів, найкращий UI/UX дизайнер, з яким мені випадало працювати. Його експертиза, професіоналізм і вміння створювати видатний користувацький досвід роблять його винятковим дизайнером і цінним поповненням для будь-якої команди.",
        name: "Igor Dmitriev",
        role: "Засновник",
        company: "Softa",
      },
      {
        quote:
          "Він уміє поставити себе на місце користувачів, ставить правильні питання й постійно шукає, як покращити шлях користувача. Будь-якій команді пощастить мати його.",
        full:
          "Я мала задоволення тісно працювати з Владом і щиро рекомендую його як Senior Product Designer. Він уміє поставити себе на місце користувачів, ставить правильні питання й постійно шукає, як покращити шлях користувача. Поєднання технічного розуміння та уваги до деталей дає йому змогу створювати ефективні рішення для користувацьких сценаріїв. Він також проактивно пропонує нові ідеї, ефективно працює з кількома пріоритетами одночасно й швидко видає якісний результат. Будь-якій команді пощастить мати його, і я впевнена, що він і далі матиме сильний вплив, де б не працював.",
        name: "Ligia Gutierrez",
        role: "Product Manager",
        company: "",
      },
      {
        quote:
          "Що вирізняє Влада, то це його діапазон. Окрім сильних дизайнерських навичок, він по-справжньому талановитий ілюстратор, і ця творча глибина підняла безліч наших проєктів.",
        full:
          "Я мала задоволення керувати Владом із 2019 року в BitterBrains, де він був у команді з самого початку. Як наш вебдизайнер, Влад незмінно робив чудову роботу. Завжди вчасно, завжди готовий підтримати команду. Що вирізняє Влада, то це його діапазон. Окрім сильних дизайнерських навичок, він по-справжньому талановитий ілюстратор, і ця творча глибина підняла безліч наших проєктів. А ще він просто неймовірно надійний колега, людина, яка робить усе добре, і тобі не треба про це хвилюватися. Влад стане чудовим поповненням для будь-якої команди, якій потрібен дизайнер, що поєднує сильну майстерність, креативність і справжню надійність. Я вдячна, що працювала з ним, і щиро його рекомендую.",
        name: "Maria Panagiotidou",
        role: "Director of Operations",
        company: "BitterBrains",
      },
      {
        quote:
          "Влад зіграв ключову роль у формуванні нашої дизайн-основи… Його увага до деталей і системне мислення допомогли досягти узгодженості між продуктами й водночас дали команді змогу будувати швидко та масштабно.",
        full:
          "Влад зіграв ключову роль у формуванні нашої дизайн-основи, насамперед завдяки роботі над оновленим застосунком і вебдосвідом SmartCrowd, а також створенню масштабованих дизайн-систем для нашого основного бренду та white-label продуктів. Його увага до деталей і системне мислення допомогли досягти узгодженості між продуктами й водночас дали команді змогу будувати швидко та масштабно. Він дуже проактивний, надійний, швидко ітерує й завжди прагне вчитися та вдосконалюватися. Влад незмінно видавав якісну роботу, зберігаючи швидкість, і це робить його цінним партнером для будь-якої продуктової команди.",
        name: "Maleeha Murad",
        role: "Product Manager",
        company: "SmartCrowd",
      },
    ],
  },
  works: {
    rail: "Проєкти",
    explore: "Дивитися кейс ↗",
    progress: "Кейс",
    cases: {
      smartcrowd:
        "Платформа для інвестицій у нерухомість в ОАЕ, де можна вкладати в житло й керувати своїм портфелем в одному місці.",
    },
    placeholder: {
      title: "Скоро",
      description: "Цей кейс уже в роботі.",
    },
  },
};

const DICTIONARIES: Record<Locale, Dictionary> = { en, uk };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}
