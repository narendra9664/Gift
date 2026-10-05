"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";
import { EASE_OUT, Reveal } from "@/components/ui/Reveal";
import { problem } from "@/lib/content";

export function Problem() {
  const words = [
    ...problem.statement.dark.split(" ").map((w) => ({ w, light: false })),
    ...problem.statement.light.split(" ").map((w) => ({ w, light: true })),
  ];

  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <h2 className="display mx-auto max-w-5xl text-center text-[clamp(2.75rem,6.4vw,5.5rem)] leading-[0.92]">
          {words.map(({ w, light }, i) => (
            <Fragment key={i}>
              <motion.span
                className={`inline-block ${light ? "text-stone" : "text-ink"}`}
                initial={{ opacity: 0, y: "0.4em" }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={{ duration: 0.7, ease: EASE_OUT, delay: i * 0.045 }}
              >
                {w}
              </motion.span>{" "}
            </Fragment>
          ))}
        </h2>

        <motion.div
          aria-hidden
          className="mx-auto mt-10 h-20 w-px origin-top bg-ink"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.3 }}
        />
        <p className="mt-6 text-center text-sm font-medium">{problem.kicker}</p>

        <ul className="mt-12 grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {problem.symptoms.map((s, i) => (
            <li key={s.title}>
              <Reveal
                delay={i * 0.08}
                className="group h-full border-l border-ink/15 px-5 py-1 transition-colors hover:border-brand"
              >
                <span
                  className={`flex size-8 items-center justify-center rounded-md text-white transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${s.tile}`}
                >
                  <s.icon className="size-4" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-3xl leading-none tracking-tight">{s.title}</h3>
                <p className="mt-2 max-w-[17rem] text-sm leading-snug text-ink/65">{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-16 max-w-2xl text-center text-lg leading-snug font-semibold text-balance md:text-xl">
            {problem.feeling}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
