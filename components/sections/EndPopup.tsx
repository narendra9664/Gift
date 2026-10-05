"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { LEAD_CAPTURED_KEY, LeadForm } from "@/components/ui/LeadForm";
import { EASE_OUT } from "@/components/ui/Reveal";
import { Clouds, StickerBadge } from "@/components/ui/shapes";
import { popup } from "@/lib/content";

const DISMISSED_KEY = "kraya:popup-dismissed";

function storage(kind: "local" | "session") {
  try {
    return kind === "local" ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

function read(kind: "local" | "session", key: string) {
  try {
    return storage(kind)?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

function write(kind: "local" | "session", key: string) {
  try {
    storage(kind)?.setItem(key, "1");
  } catch {
    // Storage blocked: the pop-up may show again next visit, which is fine.
  }
}

function IndustryChips() {
  return (
    <fieldset>
      <legend className="text-xs font-medium text-ink/60">{popup.industriesLabel}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {popup.industries.map((industry) => (
          <label key={industry} className="cursor-pointer">
            <input type="radio" name="industry" value={industry} className="peer sr-only" />
            <span className="block rounded-full border border-ink/15 px-3.5 py-2 text-xs font-medium transition-colors peer-checked:border-brand peer-checked:bg-brand peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-brand/40 hover:border-brand">
              {industry}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/**
 * Lead-capture pop-up shown once when the visitor reaches the end of the page.
 * It stays away after it's closed (for the session) or after any form is sent.
 */
export function EndPopup() {
  const sentinel = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const reachedEnd = useInView(sentinel);
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!reachedEnd || read("local", LEAD_CAPTURED_KEY) || read("session", DISMISSED_KEY)) return;
    const timer = setTimeout(() => {
      returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setOpen(true);
    }, 600);
    return () => clearTimeout(timer);
  }, [reachedEnd]);

  const close = useCallback(() => {
    write("session", DISMISSED_KEY);
    setOpen(false);
    returnFocus.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    panel.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  /* Keep Tab inside the dialog while it's open. */
  const trapFocus = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !panel.current) return;
    const focusable = panel.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([type="hidden"]):not([tabindex="-1"]), [href]',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) {
      e.preventDefault();
      last?.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first?.focus();
    }
  };

  return (
    <>
      <div ref={sentinel} aria-hidden className="h-px" />
      <AnimatePresence>
        {open && (
          <motion.div
            key="end-popup"
            className="fixed inset-0 z-[60] flex items-end justify-center p-3 sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-ink/55 backdrop-blur-sm" onClick={close} aria-hidden />

            <motion.div
              ref={panel}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              tabIndex={-1}
              onKeyDown={trapFocus}
              initial={{ y: 60, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className="relative max-h-[calc(100svh-1.5rem)] w-full max-w-md overflow-y-auto rounded-3xl bg-white text-ink shadow-2xl outline-none"
            >
              <div className="relative overflow-hidden bg-linear-to-br from-brand-light via-brand to-brand-deep px-6 pt-8 pb-16 text-white">
                <motion.div
                  className="absolute right-5 bottom-3 z-10"
                  initial={{ scale: 0, rotate: -40 }}
                  animate={{ scale: 1, rotate: 12 }}
                  transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.3 }}
                  aria-hidden
                >
                  <StickerBadge label={popup.badge} color="#FFD700" size={64} />
                </motion.div>
                <p className="text-xs font-semibold tracking-[0.2em] text-white/85 uppercase">{popup.kicker}</p>
                <h2 id={titleId} className="display mt-3 text-[clamp(2.25rem,9vw,2.75rem)]">
                  {popup.title.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h2>
                <Clouds seed={5} base="#ffffff" className="absolute -bottom-px left-0 h-16 w-full" />
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-white" />
              </div>

              <div className="px-6 pt-1 pb-6">
                <p className="text-sm leading-relaxed text-ink/70">{popup.body}</p>
                <div className="mt-5">
                  <LeadForm
                    formName="end-popup"
                    tone="white"
                    submitLabel={popup.submit}
                    successMessage={popup.success}
                    extraFields={<IndustryChips />}
                  />
                </div>
                <p className="mt-4 text-[11px] text-ink/45">{popup.privacy}</p>
              </div>

              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-white"
              >
                <X className="size-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
