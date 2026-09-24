/** A section's name, set large, the word rising out of a mask as the heading
 *  comes up the screen. Every section of a case opens with one, so the page
 *  reads as named chapters. */
export function SectionTitle({ children, className = "" }: { children: string; className?: string }) {
  const lines = children.split("\n");
  return (
    <div data-p className={`cs-title ${className}`}>
      <h2
        aria-label={lines.join(" ")}
        className="font-bold uppercase leading-[0.86] tracking-[-0.045em] text-ink text-[clamp(34px,9.6vw,56px)] md:text-[clamp(48px,6.1vw,120px)]"
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
