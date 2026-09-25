import Image from "next/image";
import type { Dictionary } from "@/lib/dictionaries";
import { ABOUT_PAGE } from "@/lib/site";

/** Each column's parallax speed, so the three drift apart a little as the
 *  grid passes: the middle one runs ahead, the outer ones lag. */
const SPEEDS = [60, -70, 110];

/** The photo grid from the current site: one tall portrait on the left, two
 *  pairs beside it. Each photo opens from the top edge down as it comes up
 *  while the picture inside settles from a slight zoom. Under the pointer
 *  one photo comes forward and the others step back. On a phone the grid is
 *  two columns and drifts only gently. */
export function AboutPhotos({ copy }: { copy: Dictionary["aboutPage"]["photos"] }) {
  const [tall, ...rest] = ABOUT_PAGE.photos;
  const columns = [[0], [1, 2], [3, 4]];
  const photo = (i: number) => (i === 0 ? tall : rest[i - 1]);

  return (
    <section
      id="photos"
      aria-label={copy.label}
      data-p
      className="relative overflow-hidden px-6 py-[var(--section-y)] md:px-[var(--case-pad)]"
    >
      <div className="ab-photos grid grid-cols-2 gap-3 md:h-[82svh] md:grid-cols-3 md:gap-[1.2vw]">
        {columns.map((column, c) => (
          <div
            key={c}
            className={`ab-par flex flex-col gap-3 md:gap-[1.2vw] ${c === 0 ? "col-span-2 md:col-span-1" : ""}`}
            style={{ "--speed": SPEEDS[c] } as React.CSSProperties}
          >
            {column.map((i) => (
              <div
                key={i}
                className={`ab-photo ab-reveal-img relative overflow-hidden rounded-[6px] ${
                  i === 0 ? "aspect-[4/5] md:aspect-auto md:h-full" : "aspect-[4/3] md:aspect-auto md:flex-1"
                }`}
                style={{ "--at": 0.02 + c * 0.05 } as React.CSSProperties}
              >
                <Image
                  src={photo(i)}
                  alt={copy.images[i]}
                  fill
                  sizes={i === 0 ? "(min-width: 768px) 30vw, 90vw" : "(min-width: 768px) 30vw, 45vw"}
                  className="ab-img object-cover"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
