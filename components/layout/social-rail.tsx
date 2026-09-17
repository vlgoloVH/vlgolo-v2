import { SOCIAL_LINKS } from "@/lib/site";

/** Inline so the site carries no icon dependency. */
const ICONS: Record<string, React.ReactNode> = {
  LinkedIn: (
    <>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" />
      <path d="M3 9h4v12H3zM10 9h3.8v1.7a4.2 4.2 0 0 1 3.7-2c2.7 0 4.5 1.8 4.5 5.3V21h-4v-6c0-1.6-.6-2.6-2-2.6-1.2 0-1.9.8-2.2 1.6-.1.3-.1.7-.1 1.1V21h-3.7z" />
    </>
  ),
  Dribbble: (
    <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="9.2" />
      <path d="M3.4 9.4c5.4.5 10.3-1 13.3-4.3" />
      <path d="M2.9 14.6c4.5-1.6 10.6-1 14.2 3.4" />
      <path d="M8.6 3.2c3.6 3.8 6 9.3 6.4 17.4" />
    </g>
  ),
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.2" />
    </>
  ),
};

export function SocialRail() {
  return (
    <div className="enter-chrome fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex lg:right-7">
      {SOCIAL_LINKS.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={link.label}
          className="glass flex h-11 w-11 items-center justify-center rounded-full text-ink/80 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15 hover:text-ink"
        >
          <svg
            viewBox="0 0 24 24"
            width="17"
            height="17"
            fill="currentColor"
            aria-hidden="true"
          >
            {ICONS[link.label]}
          </svg>
        </a>
      ))}
    </div>
  );
}
