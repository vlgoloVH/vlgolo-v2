/** A section's name, set large: the index in small type, then the word itself
 *  rising out of a mask as the heading comes up the screen. Every section of a
 *  case opens with one, so the page reads as named chapters. */
export function SectionTitle({
  index,
  children,
  className = "",
  size = "l",
}: {
  index: number;
  children: string;
  className?: string;
  /** l: the section openers; m: where the title shares the screen with a
   *  larger subject (Impact). */
  size?: "l" | "m";
}) {
  const lines = children.split("\n");
  return (
    <div data-p className={`cs-title ${className}`}>
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink/50">
        {String(index).padStart(2, "0")}
      </p>
      <h2
        aria-label={lines.join(" ")}
        className={`mt-3 font-bold uppercase leading-[0.86] tracking-[-0.045em] text-ink ${
          size === "l" ? "text-[clamp(34px,9.6vw,64px)] md:text-[clamp(52px,8.4vw,164px)]" : "text-[clamp(34px,9.6vw,64px)] md:text-[clamp(40px,5vw,96px)]"
        }`}
      >
        {lines.map((line, i) => (
          <span key={line} aria-hidden="true" className="block overflow-hidden pb-[0.05em]">
            <span className="cs-title-line block" style={{ "--i": i } as React.CSSProperties}>
              {line}
            </span>
          </span>
        ))}
      </h2>
    </div>
  );
}
