"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { Photo } from "@/components/ui/Photo";
import { EASE_OUT, Reveal } from "@/components/ui/Reveal";
import { approach, EXPERT_SESSION_LABEL, EXPERT_SESSION_URL } from "@/lib/content";

/* Staggered left offsets, echoing the zig-zag list in the design. */
const offsets = ["lg:ml-28", "lg:ml-0", "lg:ml-0", "lg:ml-36"];

export function Approach() {
  const [active, setActive] = useState(1);

  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-start gap-14 px-5 md:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <ol className="flex flex-col gap-4">
          {approach.steps.map((step, i) => {
            const isActive = i === active;
            return (
              <motion.li key={step.title} layout transition={{ duration: 0.5, ease: EASE_OUT }} className={offsets[i]}>
                <Reveal delay={i * 0.08}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    aria-expanded={isActive}
                    className={`flex w-full max-w-md overflow-hidden rounded-xl bg-white text-left shadow-[0_10px_30px_-18px_rgba(17,17,17,0.35)] transition-shadow hover:shadow-[0_18px_40px_-18px_rgba(0,80,200,0.45)] focus-visible:outline-2 focus-visible:outline-brand ${
                      isActive ? "min-h-56" : "min-h-24"
                    }`}
                  >
                    <motion.div
                      layout
                      className={`relative shrink-0 overflow-hidden bg-brand ${isActive ? "w-40 sm:w-44" : "w-32 sm:w-40"}`}
                    >
                      <Photo shot={step.shot} sizes="180px" />
                    </motion.div>
                    <div className="flex flex-col justify-center p-4 sm:p-5">
                      <h3 className="font-display text-2xl leading-none tracking-tight sm:text-[1.7rem]">
                        <span className="mr-2">0{i + 1}</span>
                        {step.title}
                      </h3>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.p
                            key="body"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4, ease: EASE_OUT }}
                            className="overflow-hidden text-sm leading-snug text-ink/65"
                          >
                            <span className="block pt-3">{step.body}</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                </Reveal>
              </motion.li>
            );
          })}
        </ol>

        <Reveal className="lg:sticky lg:top-32 lg:pt-24">
          <h2 className="display text-[clamp(3rem,6vw,5.25rem)]">
            {approach.title[0]}
            <br />
            {approach.title[1]}
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink/65">{approach.body}</p>
          <CtaButton href={EXPERT_SESSION_URL} variant="blue" className="mt-7">
            {EXPERT_SESSION_LABEL}
          </CtaButton>
        </Reveal>
      </div>
    </section>
  );
}
