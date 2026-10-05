"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/ui/CountUp";
import { CtaButton } from "@/components/ui/CtaButton";
import { EASE_OUT } from "@/components/ui/Reveal";
import { Laurel } from "@/components/ui/shapes";
import { HeroDashboard } from "@/components/visuals/HeroDashboard";
import { hero, PRICE_NOTE, TRIAL_LABEL, TRIAL_URL } from "@/lib/content";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-linear-to-b from-brand to-brand-deep text-white"
    >
      {/* Soft glow behind the product mock-up. */}
      <div
        aria-hidden
        className="absolute top-1/4 right-[-10%] -z-10 size-[42rem] rounded-full bg-[radial-gradient(circle,rgba(140,203,255,0.55),transparent_65%)]"
      />

      <div className="mx-auto max-w-7xl px-5 pt-28 md:px-8 lg:pt-36">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          <div>
            <h1 className="display text-[clamp(3.25rem,6.6vw,6rem)] leading-[0.86]">
              {hero.titleLines.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.04em]">
                  <motion.span
                    className="block"
                    initial={{ y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease: EASE_OUT, delay: 0.15 + i * 0.12 }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.5 }}
              className="mt-6 max-w-md"
            >
              <p className="text-base leading-relaxed text-white/90 md:text-[1.05rem]">{hero.body}</p>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                <CtaButton href={TRIAL_URL}>{TRIAL_LABEL}</CtaButton>
                <a
                  href={hero.secondary.href}
                  className="py-3 text-sm font-semibold underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
                >
                  {hero.secondary.label}
                </a>
              </div>
              <p className="mt-3 text-xs text-white/75">{PRICE_NOTE}</p>
            </motion.div>
          </div>

          <div className="px-2 sm:px-8 lg:px-0">
            <HeroDashboard />
          </div>
        </div>

        <motion.dl
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.75 }}
          className="relative z-10 mt-24 grid grid-cols-2 gap-y-8 pb-10 lg:grid-cols-4"
        >
          <div className="flex flex-col items-start">
            <dt className="order-2 mt-1 text-[10px] font-semibold tracking-[0.25em] uppercase">
              {hero.badge.label}
            </dt>
            <dd className="relative order-1 flex size-20 items-center justify-center">
              <Laurel className="absolute inset-0 text-white/90" />
              <span className="display text-4xl italic">{hero.badge.value}</span>
            </dd>
          </div>
          {hero.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col justify-end border-l border-white/30 pl-4 md:pl-5">
              <dt className="order-2 mt-2 text-[10px] font-semibold tracking-[0.25em] text-white/90 uppercase">
                {stat.label}
              </dt>
              <dd className="display order-1 text-5xl italic md:text-6xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
