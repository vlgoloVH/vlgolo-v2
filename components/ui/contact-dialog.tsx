"use client";

import { useRef, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import { SITE } from "@/lib/site";
import { GlassButton } from "@/components/ui/glass-button";

type Status = "idle" | "sending" | "sent" | "error";

interface Props {
  label: string;
  copy: Dictionary["contact"];
  className?: string;
}

/** The hero's glass pill, opening a contact form in a native <dialog>: the
 *  browser handles focus, Escape and the layer above the page, so none of that
 *  is reinvented here. The form posts to Formspree and stays in place, so the
 *  visitor never leaves the site. */
export function ContactDialog({ label, copy, className = "" }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const open = () => {
    if (status !== "sending") setStatus("idle");
    dialogRef.current?.showModal();
  };

  const close = () => dialogRef.current?.close();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");

    try {
      const response = await fetch(SITE.formspree, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const field =
    "mt-2 w-full border-b border-white/20 bg-transparent pb-3 text-[16px] text-ink outline-none transition-colors duration-300 placeholder:text-white/30 focus:border-white/70";
  const fieldLabel = "text-[13px] uppercase tracking-[0.2em] text-ink/55";

  return (
    <>
      <GlassButton label={label} onClick={open} className={className} />

      <dialog
        ref={dialogRef}
        aria-labelledby="contact-title"
        className="contact-dialog"
        // A click that lands on the dialog itself, not its panel, is the backdrop.
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="relative w-full rounded-[28px] border border-white/10 bg-surface p-7 text-left md:p-12">
          <button
            type="button"
            onClick={close}
            aria-label={copy.close}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full text-ink/60 transition-colors duration-300 can-hover:bg-white/5 can-hover:text-ink md:right-7 md:top-7"
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

          <h2 id="contact-title" className="pr-10 text-[28px] font-bold text-ink md:text-[36px]">
            {copy.title}
          </h2>
          <p className="mt-3 max-w-[30rem] text-[16px] leading-relaxed text-muted">
            {copy.lead}
          </p>

          {status === "sent" ? (
            <p role="status" className="mt-10 text-[18px] leading-relaxed text-ink">
              {copy.sent}
            </p>
          ) : (
            <form onSubmit={onSubmit} className="mt-10 flex flex-col gap-8">
              <div className="grid gap-8 md:grid-cols-2">
                <label className="block">
                  <span className={fieldLabel}>{copy.name}</span>
                  <input name="name" required autoComplete="name" className={field} />
                </label>
                <label className="block">
                  <span className={fieldLabel}>{copy.email}</span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={field}
                  />
                </label>
              </div>

              <label className="block">
                <span className={fieldLabel}>{copy.message}</span>
                <textarea name="message" required rows={4} className={`${field} resize-none`} />
              </label>

              {status === "error" && (
                <p role="alert" className="text-[15px] leading-relaxed text-ink/80">
                  {copy.error}{" "}
                  <a href={`mailto:${SITE.email}`} className="underline underline-offset-4">
                    {SITE.email}
                  </a>
                </p>
              )}

              <GlassButton
                type="submit"
                label={status === "sending" ? copy.sending : copy.send}
                disabled={status === "sending"}
                videoSelector={null}
                className="self-start"
              />
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
