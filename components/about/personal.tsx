import Image from "next/image";
import type { Dictionary } from "@/lib/dictionaries";
import { ABOUT_PAGE } from "@/lib/site";

/** Where each photo sits in the collage, its tilt and its parallax speed. A
 *  scrapbook, not a grid: different sizes, slight turns, one running off the
 *  right edge, each layer moving at its own pace. */
const LAYOUT = [
  { box: "md:left-[2%] md:top-[4%] md:w-[26%]", aspect: "aspect-[4/5]", tilt: -2.2, speed: 60, z: 1 },
  { box: "md:right-[-6vw] md:top-[0%] md:w-[42%]", aspect: "aspect-[16/10]", tilt: 1.6, speed: -80, z: 2 },
  { box: "md:left-[24%] md:top-[46%] md:w-[36%]", aspect: "aspect-[3/2]", tilt: 1.1, speed: -150, z: 3 },
  { box: "md:right-[10%] md:top-[54%] md:w-[22%]", aspect: "aspect-square", tilt: -2.8, speed: 40, z: 2 },
];

/** 07 · Personal. A breather after the professional sections: a short line
 *  about where the craft comes from, and a loose collage of photos that shifts
 *  in depth as it passes. Hovering a photo lifts it to the top. */
export function AboutPersonal({ copy }: { copy: Dictionary["aboutPage"]["personal"] }) {
  return (
    <section id="personal" data-section data-p className="relative overflow-hidden py-[16vh] md:py-[20vh]">
      <div className="px-6 md:px-[var(--frame-pad)]">
        <p className="ab-label">
          <span>07</span>
          {copy.label}
        </p>
        <h2 className="mt-10 max-w-[11em] text-[clamp(40px,5.6vw,104px)] font-bold leading-[1] tracking-[-0.035em] text-ink md:mt-14">
          {copy.headline}
        </h2>
        <p className="mt-8 max-w-[30rem] text-[18px] leading-relaxed text-ink/70 md:text-[21px]">
          {copy.body}
        </p>
      </div>

      <div className="relative mt-16 grid grid-cols-2 gap-4 px-6 md:mt-[8vh] md:block md:h-[110vh] md:px-[var(--frame-pad)]">
        {ABOUT_PAGE.personal.map((photo, i) => {
          const spot = LAYOUT[i];
          return (
            <div
              key={photo}
              className={`ab-par ab-collage relative md:absolute ${spot.box} ${i % 2 ? "mt-10 md:mt-0" : ""}`}
              style={
                { "--speed": spot.speed, "--tilt": `${spot.tilt}deg`, zIndex: spot.z } as React.CSSProperties
              }
            >
              <div className={`ab-collage-card relative ${spot.aspect}`}>
                <Image
                  src={photo}
                  alt={copy.images[i]}
                  fill
                  sizes="(min-width: 768px) 42vw, 45vw"
                  className="object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
