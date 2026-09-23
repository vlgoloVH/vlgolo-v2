/** Text that lights up word by word as it moves up the screen. Each word
 *  carries its place (--i of --n) and the stylesheet sets its opacity from the
 *  line's own scroll progress (it is a `[data-p]`, see `.ab-words`), so there
 *  is no script per word. Screen readers get the sentence whole. */
export function Words({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span data-p className={`ab-words ${className}`} style={{ "--n": words.length } as React.CSSProperties}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={i} style={{ "--i": i } as React.CSSProperties}>
            {word}{" "}
          </span>
        ))}
      </span>
    </span>
  );
}
