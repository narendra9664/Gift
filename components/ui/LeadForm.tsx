"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CircleCheck, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { EASE_OUT } from "@/components/ui/Reveal";

type LeadFormProps = {
  /** Must match a form declared in public/__forms.html. */
  formName: "trial" | "leak-report";
  submitLabel: string;
  successMessage: string;
  /** Extra values sent with the submission, e.g. calculator results. */
  extra?: Record<string, string>;
  tone?: "blue" | "white";
};

type Status = "idle" | "sending" | "done" | "error";

const inputBase =
  "h-12 w-full rounded-md border px-4 text-base outline-none transition-colors focus:ring-2 sm:text-sm";

/** Two-field lead form (name + WhatsApp) that submits to Netlify Forms. */
export function LeadForm({ formName, submitLabel, successMessage, extra, tone = "blue" }: LeadFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [firstName, setFirstName] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = new URLSearchParams();
    for (const [key, value] of data) body.append(key, String(value));
    for (const [key, value] of Object.entries(extra ?? {})) body.set(key, value);

    setStatus("sending");
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(`Form submission failed: ${res.status}`);
      setFirstName(String(data.get("name") ?? "").trim().split(" ")[0]);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const onBlue = tone === "blue";
  const input = `${inputBase} ${
    onBlue
      ? "border-white/30 bg-white/10 text-white placeholder:text-white/60 focus:border-white focus:ring-white/40"
      : "border-ink/15 bg-white text-ink placeholder:text-ink/40 focus:border-brand focus:ring-brand/25"
  }`;

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "done" ? (
        <motion.div
          key="done"
          role="status"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className={`flex items-start gap-3 rounded-xl p-4 ${onBlue ? "bg-white text-ink" : "bg-brand text-white"}`}
        >
          <CircleCheck className={`mt-0.5 size-5 shrink-0 ${onBlue ? "text-brand" : "text-white"}`} aria-hidden />
          <p className="text-sm leading-relaxed">
            <strong className="block text-base">You’re in{firstName ? `, ${firstName}` : ""}.</strong>
            {successMessage}
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          name={formName}
          onSubmit={onSubmit}
          exit={{ opacity: 0, y: -8 }}
          className="flex flex-col gap-3"
        >
          <input type="hidden" name="form-name" value={formName} />
          {/* Honeypot: hidden from people, filled in by bots, rejected by Netlify. */}
          <p className="hidden">
            <label>
              Don’t fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="sr-only">Your name</span>
              <input name="name" required autoComplete="name" placeholder="Your name" className={input} />
            </label>
            <label className="block">
              <span className="sr-only">WhatsApp number</span>
              <input
                name="whatsapp"
                type="tel"
                inputMode="tel"
                required
                autoComplete="tel"
                placeholder="WhatsApp number"
                pattern="\+?[0-9 \(\)\-]{10,16}"
                title="Enter a WhatsApp number with at least 10 digits"
                className={input}
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className={`group flex h-12 items-center justify-center gap-2 rounded-md px-6 text-sm font-semibold transition-all duration-300 ease-out-expo hover:scale-[1.02] active:scale-[0.98] disabled:cursor-wait disabled:opacity-80 sm:self-start ${
              onBlue ? "bg-white text-ink hover:bg-ink hover:text-white" : "bg-brand text-white hover:bg-ink"
            }`}
          >
            {status === "sending" ? (
              <LoaderCircle className="size-4 animate-spin" aria-hidden />
            ) : (
              <>
                {submitLabel}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </>
            )}
          </button>

          {status === "error" && (
            <p role="alert" className={`text-sm ${onBlue ? "text-white" : "text-red-600"}`}>
              Something went wrong. Please try again.
            </p>
          )}
        </motion.form>
      )}
    </AnimatePresence>
  );
}
