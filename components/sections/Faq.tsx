"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useId, useState } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { LeadForm } from "@/components/ui/LeadForm";
import { EASE_OUT, Reveal } from "@/components/ui/Reveal";
import { Clouds } from "@/components/ui/shapes";
import { TrialPhone } from "@/components/visuals/TrialPhone";
import {
  CALLBACK_PROMISE,
  faqs,
  PRICE_NOTE,
  trial,
  TRIAL_LABEL,
  TRIAL_URL,
} from "@/lib/content";

function FaqItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  const id = useId();
  return (
    <li
      className={`overflow-hidden rounded-xl border-2 transition-colors duration-300 ${
        open ? "border-brand bg-white" : "border-transparent bg-white hover:border-brand/30"
      }`}
    >
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={id}
          className={`flex w-full items-start justify-between gap-6 px-5 py-4 text-left text-sm font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-brand md:text-[0.95rem] ${
            open ? "bg-brand text-white" : "text-ink"
          }`}
        >
          {q}
          <span
            className={`flex size-6 shrink-0 items-center justify-center rounded-md transition-colors ${
              open ? "bg-white text-brand" : "text-brand"
            }`}
          >
            {open ? <Minus className="size-4" aria-hidden /> : <Plus className="size-4" aria-hidden />}
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          >
            <p className="px-5 py-4 text-sm leading-relaxed text-ink/70">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function TrialCta() {
  return (
    <div id="start-trial" className="relative mt-40 scroll-mt-40 md:mt-36">
      <div className="relative min-h-[34rem] rounded-3xl md:min-h-[22rem]">
        {/* Background + clouds are clipped to the card; the phone breaks out of the top. */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl bg-linear-to-br from-brand-light via-brand to-brand-deep" />

        <motion.div
          className="absolute -top-24 left-1/2 z-10 w-60 -translate-x-1/2 -rotate-6 md:left-[12%] md:w-68 md:translate-x-0"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <TrialPhone />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 z-20 hidden overflow-hidden rounded-3xl md:block">
          <Clouds
            seed={3}
            base="#ffffff"
            className="absolute bottom-0 left-0 h-44 w-[56%] [mask-image:linear-gradient(to_right,black_60%,transparent)]"
          />
        </div>

        <div className="relative z-30 flex min-h-[34rem] flex-col justify-end p-6 pt-72 text-white sm:p-8 sm:pt-72 md:ml-[48%] md:min-h-[24rem] md:justify-center md:p-12">
          <Reveal>
            <h2 className="display text-[clamp(2.75rem,5vw,4.5rem)]">
              {trial.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/90">{trial.body}</p>
            <div className="mt-6">
              <LeadForm formName="trial" submitLabel={trial.submit} successMessage={CALLBACK_PROMISE} />
            </div>
            <p className="mt-4 text-xs text-white/75">{PRICE_NOTE}</p>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr]">
          <Reveal>
            <h2 className="display text-[clamp(2.75rem,5.6vw,5rem)]">
              Frequently
              <br />
              asked questions
            </h2>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink/65">
              Didn’t find your answer here? Talk to our team and we’ll walk you through it.
            </p>
            <CtaButton href={TRIAL_URL} variant="blue" className="mt-7">
              {TRIAL_LABEL}
            </CtaButton>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="flex flex-col gap-3">
              {faqs.map((f, i) => (
                <FaqItem key={f.q} q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
              ))}
            </ul>
          </Reveal>
        </div>

        <TrialCta />
      </div>
    </section>
  );
}
