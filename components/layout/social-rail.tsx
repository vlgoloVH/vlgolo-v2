import { SOCIAL_LINKS } from "@/lib/site";

/** Plain monoline marks, no container and no glass: the CV button is the only
 *  glass surface in the hero. The rail is as wide as the margin outside the
 *  right-hand rule, so the icons land dead centre in that strip. */
const ICONS: Record<string, React.ReactNode> = {
  LinkedIn: (
    <>
      <path d="M5 8.2v9.6M5 4.6v0.2" />
      <path d="M10 17.8V8.2M10 12.4c0-2.3 1.4-3.6 3.3-3.6 1.9 0 3.2 1.2 3.2 3.9v5.3" />
    </>
  ),
  Dribbble: (
    <>
      <circle cx="11" cy="11" r="8" />
      <path d="M4 8.4c4.6.4 8.7-1 11.4-3.8" />
      <path d="M3.6 13.6c3.9-1.4 9-.8 12.1 3" />
      <path d="M8.4 3.6c3 3.3 5.1 8 5.5 15" />
    </>
  ),
  Instagram: (
    <>
      <rect x="3" y="3" width="16" height="16" rx="4.5" />
      <circle cx="11" cy="11" r="3.6" />
      <path d="M15.6 6.4v0.2" />
    </>
  ),
};

export function SocialRail() {
  return (
    <div className="enter-chrome fixed right-0 top-1/2 z-40 hidden w-[var(--frame-line)] -translate-y-1/2 flex-col items-center gap-7 md:flex">
      {SOCIAL_LINKS.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={link.label}
          className="text-ink/55 transition-colors duration-300 pointer-fine:hover:text-ink"
        >
          <svg
            viewBox="0 0 22 22"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {ICONS[link.label]}
          </svg>
        </a>
      ))}
    </div>
  );
}
