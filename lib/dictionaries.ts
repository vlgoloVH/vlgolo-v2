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
  hero: {
    eyebrow: "Senior Product Designer · Est. 2015",
    headline: ["Designing products", "that drive growth"],
    cta: "Download resume",
  },
  about: {
    /** Set vertically in the left margin, the way the hero rules frame the page. */
    rail: "About",
    eyebrow: "Hey there, I'm Vlad!",
    body: "I'm a Product Designer with 10+ years of experience building digital products across diverse industries and markets. I help teams transform complex ideas into intuitive experiences that create meaningful value for users and measurable results for businesses…",
    cta: "Learn more",
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
  hero: {
    eyebrow: "Senior Product Designer · з 2015 року",
    headline: ["Проєктую продукти,", "що дають зростання"],
    cta: "Завантажити резюме",
  },
  about: {
    rail: "Про мене",
    eyebrow: "Привіт, я Влад!",
    body: "Я продуктовий дизайнер з досвідом понад 10 років: створюю цифрові продукти в різних індустріях і на різних ринках. Допомагаю командам перетворювати складні ідеї на зрозумілий досвід, що дає справжню цінність користувачам і вимірюваний результат бізнесу…",
    cta: "Детальніше",
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
