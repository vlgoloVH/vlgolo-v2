import { STATUS } from "@/lib/site";

/** Mirrors the social rail on the left edge: the same vertical axis, reading
 *  bottom to top so the line leads the eye up into the headline. */
export function StatusRail() {
  return (
    <div className="enter-chrome fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex lg:left-10">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-[status-pulse_2.8s_ease-out_infinite] rounded-full bg-white" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
      </span>

      <span
        className="text-[11px] uppercase tracking-[0.3em] text-ink/55"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        {STATUS}
      </span>
    </div>
  );
}
