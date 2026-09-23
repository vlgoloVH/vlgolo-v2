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
  works: {
    /** Set vertically in the left margin, the same as about.rail. */
    rail: "Works",
    cases: {
      smartcrowd:
        "A UAE real estate investment platform where people can invest in property and manage their portfolio in one place.",
      "notary-hub":
        "A US platform for Remote Online Notarization, letting notaries, companies, and clients sign and handle legal documents fully online.",
      "space-needle":
        "The ticketing and digital experience for Space Needle, one of Seattle's most iconic landmarks, visited by millions each year.",
      "dan-mon-fairwind":
        "A global marine supplier that sources and delivers technical spare parts for ship equipment anywhere in the world.",
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
  works: {
    rail: "Проєкти",
    cases: {
      smartcrowd:
        "Платформа для інвестицій у нерухомість в ОАЕ, де можна вкладати в житло й керувати своїм портфелем в одному місці.",
      "notary-hub":
        "Американська платформа для дистанційного нотаріального засвідчення: нотаріуси, компанії та клієнти підписують і оформлюють юридичні документи повністю онлайн.",
      "space-needle":
        "Продаж квитків і цифровий досвід для Space Needle, однієї з найвідоміших пам'яток Сіетла, яку щороку відвідують мільйони людей.",
      "dan-mon-fairwind":
        "Глобальний постачальник для морської галузі, який знаходить і доставляє технічні запчастини для суднового обладнання будь-куди у світі.",
    },
  },
};

const DICTIONARIES: Record<Locale, Dictionary> = { en, uk };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}
