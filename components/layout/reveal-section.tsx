"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

/** A section that announces itself once it is actually on screen: it sets
 *  `data-shown`, and the stylesheet takes it from there (see `.reveal` in
 *  globals.css). It fires once — replaying the entrance every time the visitor
 *  scrolls back up would read as flicker, not as craft. */
export function RevealSection({ id, className, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setShown(true);
      },
      // Almost half the section in view: with snapping that means it has
      // arrived, not that it is peeking over the edge.
      { threshold: 0.45 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id={id} className={className} data-shown={shown ? "true" : undefined}>
      {children}
    </section>
  );
}
