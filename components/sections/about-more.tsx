"use client";

import { useRef } from "react";

/** Phone only: the About copy is cut to its opening lines so the section fits
 *  one screen, and this opens the whole text in the same dialog the
 *  testimonials use for a full quote, with the same quiet link to open it. */
export function AboutMore({
  label,
  closeLabel,
  title,
  body,
}: {
  label: string;
  closeLabel: string;
  title: string;
  body: readonly string[];
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="mx-auto mt-5 block text-[11px] font-normal uppercase leading-none tracking-[0.2em] text-ink/45"
      >
        {label}
      </button>

      <dialog
        ref={dialogRef}
        aria-label={title}
        className="contact-dialog"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
      >
        <div className="relative w-full rounded-[28px] border border-white/10 bg-surface p-7 text-left">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label={closeLabel}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full text-ink/60"
          >
            <svg
              viewBox="0 0 16 16"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M3 3l10 10M13 3 3 13" />
            </svg>
          </button>

          <p className="pr-10 text-eyebrow font-medium uppercase text-ink">{title}</p>
          <div className="mt-6 space-y-5 text-[17px] leading-[1.7] text-ink/80">
            {body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
}
