"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE_OUT, Reveal } from "@/components/ui/Reveal";
import { Clouds } from "@/components/ui/shapes";
import { system } from "@/lib/content";

const STEP_MS = 4000;
const ordinals = ["1st", "2nd", "3rd", "4th"];

export function SystemSteps() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const card = useRef<HTMLDivElement>(null);
  const inView = useInView(card, { margin: "0px 0px -20% 0px" });
  const reduce = useReducedMotion();
  const autoplay = inView && !paused && !reduce;

  useEffect(() => {
    if (!autoplay) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % system.steps.length), STEP_MS);
    return () => clearTimeout(id);
  }, [autoplay, active]);

  const step = system.steps[active];

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-linear-to-b from-brand to-brand-light pt-24 text-white md:pt-28">
      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[1.15fr_1fr]">
        <Reveal>
          <h2 className="display text-[clamp(2.75rem,5.6vw,5rem)]">
            {system.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/90">{system.body}</p>
        </Reveal>

        <Reveal delay={0.15} className="lg:justify-self-end">
          <div
            ref={card}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="w-full max-w-md rounded-t-xl bg-sun px-6 pt-6 pb-24 text-ink [mask-image:linear-gradient(to_bottom,black_80%,transparent)] shadow-[0_30px_60px_-25px_rgba(0,30,90,0.5)] sm:w-[26rem] md:pb-36"
          >
            <div className="min-h-44" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: EASE_OUT }}
                >
                  <p className="display text-6xl italic">0{active + 1}</p>
                  <hr className="my-5 border-ink/15" />
                  <h3 className="font-display text-3xl leading-none tracking-tight">{step.title}</h3>
                  <p className="mt-2 text-sm leading-snug text-ink/70">{step.body}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <ol className="mt-6">
              {system.steps.map((s, i) => (
                <li key={s.title} className="border-t border-ink/15">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className={`relative grid w-full grid-cols-[4rem_1fr] py-3 text-left text-xs transition-colors focus-visible:outline-2 focus-visible:outline-ink ${
                      i === active ? "font-semibold text-ink" : "text-ink/60 hover:text-ink"
                    }`}
                  >
                    <span>{ordinals[i]}</span>
                    <span>{s.title}</span>
                    {i === active && (
                      <motion.span
                        key={`${active}-${autoplay}`}
                        aria-hidden
                        className="absolute -top-px left-0 h-0.5 bg-ink"
                        initial={{ width: autoplay ? "0%" : "100%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: autoplay ? STEP_MS / 1000 : 0, ease: "linear" }}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>

      <Clouds seed={7} className="relative z-20 -mt-24 h-36 w-full md:-mt-40 md:h-72" />
    </section>
  );
}
