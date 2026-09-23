import Image from "next/image";
import type { Moment } from "@/lib/cases/types";

/** A visual pause between the chapters: one image, almost the whole screen,
 *  no words but a quiet caption. Each pause arrives differently (see
 *  `.cs-moment--*`): through a widening circle, tipping upright, drifting
 *  slower than the page, or sliding in from the side. */
export function CaseMoment({ moment }: { moment: Moment }) {
  return (
    <figure data-p className={`cs-moment cs-moment--${moment.effect} relative flex min-h-[100svh] items-center justify-center overflow-hidden py-[8vh]`}>
      <div className="cs-moment-frame w-full px-6 md:w-auto md:px-0">
        <div className="cs-moment-img relative overflow-hidden rounded-[clamp(10px,1.2vw,22px)]">
          <Image
            src={moment.src}
            alt={moment.alt}
            width={2200}
            height={1100}
            sizes="(min-width: 768px) 86vw, 100vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </figure>
  );
}
