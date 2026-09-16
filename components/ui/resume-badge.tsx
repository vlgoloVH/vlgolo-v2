const LABEL = "Download resume • Download resume • Download resume • ";

export function ResumeBadge() {
  return (
    <a
      href="/resume.pdf"
      download
      aria-label="Download resume"
      className="group relative flex h-36 w-36 shrink-0 items-center justify-center md:h-52 md:w-52"
    >
      <svg
        viewBox="0 0 200 200"
        aria-hidden="true"
        className="motion-spin absolute inset-0 h-full w-full animate-[spin-slow_26s_linear_infinite] text-muted transition-colors duration-500 group-hover:text-accent-soft"
      >
        <defs>
          <path
            id="resume-badge-path"
            d="M 100,100 m -84,0 a 84,84 0 1,1 168,0 a 84,84 0 1,1 -168,0"
            fill="none"
          />
        </defs>
        <text
          fill="currentColor"
          className="font-mono text-[11px] uppercase tracking-[0.22em]"
        >
          <textPath href="#resume-badge-path">{LABEL}</textPath>
        </text>
      </svg>

      <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-line bg-surface/60 text-ink backdrop-blur-md transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-bg md:h-16 md:w-16">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-y-0.5"
        >
          <path d="M12 3v12" />
          <path d="m7 11 5 5 5-5" />
          <path d="M5 21h14" />
        </svg>
      </span>
    </a>
  );
}
