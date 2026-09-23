/** Section label, "04  CHALLENGE", the same as on the About page. */
export function Label({ index, children, className = "" }: { index: number; children: React.ReactNode; className?: string }) {
  return (
    <p className={`ab-label ${className}`}>
      <span>{String(index).padStart(2, "0")}</span>
      {children}
    </p>
  );
}
