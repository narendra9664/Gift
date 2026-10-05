"use client";

import { motion } from "framer-motion";
import { EASE_OUT, Reveal } from "@/components/ui/Reveal";
import { GrowthChart } from "@/components/visuals/GrowthChart";
import { caseStudy } from "@/lib/content";

/* Cards peeking out above and below the main case-study card. */
const backCards = [
  { color: "bg-sun", offset: -120, scale: 0.76, z: 0 },
  { color: "bg-[#F9B8D0]", offset: -60, scale: 0.88, z: 10 },
  { color: "bg-[#F9B8D0]", offset: 60, scale: 0.88, z: 10 },
  { color: "bg-sun", offset: 120, scale: 0.76, z: 0 },
];

/* Placeholder "report" lines so the peeking edges read as more case studies. */
function SkeletonLines() {
  return (
    <div className="flex h-full flex-col justify-between p-4">
      {[0, 1].map((i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="size-5 rounded-full bg-white/70" />
          <span className="h-2 w-24 rounded-full bg-white/70" />
          <span className="ml-auto h-2 w-10 rounded-full bg-white/50" />
        </div>
      ))}
    </div>
  );
}

function GrowthRing() {
  const r = 30;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative size-20">
      <svg viewBox="0 0 72 72" className="size-full -rotate-90" aria-hidden>
        <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
        <motion.circle
          cx="36"
          cy="36"
          r={r}
          fill="none"
          stroke="var(--color-sun)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c * 0.12 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: EASE_OUT, delay: 0.3 }}
        />
      </svg>
      <span className="display absolute inset-0 flex items-center justify-center text-2xl italic">
        {caseStudy.growth}
      </span>
    </div>
  );
}

export function CaseStudy() {
  return (
    <section className="overflow-hidden bg-linear-to-b from-brand-light to-brand py-24 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <h2 className="display text-center text-[clamp(2.75rem,6vw,5rem)]">
            Real problem,
            <br />
            real solutions
          </h2>
          <p className="mt-4 text-center text-sm text-white/85">
            How growing teams use Kraya to stop losing leads.
          </p>
        </Reveal>

        <div className="mt-14 grid items-center gap-16 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
          {/* Left: case summary */}
          <Reveal className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
            <h3 className="max-w-xs font-display text-4xl leading-none tracking-tight">{caseStudy.title}</h3>
            <p className="mt-3 text-xs text-white/85">{caseStudy.services.join(", ")}</p>
            <div className="mt-8 lg:ml-40">
              <GrowthRing />
            </div>
          </Reveal>

          {/* Center: stacked cards */}
          <div className="relative order-1 mx-auto my-16 w-[min(78vw,320px)] lg:order-2">
            {backCards.map((card, i) => (
              <motion.div
                key={i}
                aria-hidden
                className={`absolute inset-0 overflow-hidden rounded-xl border-2 border-white ${card.color}`}
                style={{ zIndex: card.z, scale: card.scale }}
                initial={{ y: 0 }}
                whileInView={{ y: card.offset }}
                viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                transition={{ duration: 1, ease: EASE_OUT, delay: 0.2 }}
              >
                <SkeletonLines />
              </motion.div>
            ))}

            <motion.figure
              className="relative z-20 rounded-xl bg-white p-1.5 text-ink shadow-[0_30px_60px_-20px_rgba(0,30,90,0.55)]"
              whileHover={{ y: -6, rotate: -1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                <GrowthChart />
              </div>
              <figcaption className="flex justify-between px-2.5 pt-2.5 pb-1.5 text-sm font-semibold">
                {caseStudy.stats.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </figcaption>
            </motion.figure>
          </div>

          {/* Right: service tags */}
          <ul className="order-3 flex flex-col items-center gap-3 lg:items-start">
            {caseStudy.tags.map((tag, i) => (
              <motion.li
                key={tag.label}
                className={i === 1 ? "lg:-ml-8" : i === 2 ? "lg:ml-10" : "lg:ml-8"}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.3 + i * 0.12 }}
              >
                <motion.span
                  className="flex items-center gap-2.5 rounded-full bg-white py-1.5 pr-5 pl-1.5 text-xs font-semibold text-ink shadow-lg"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                >
                  <span className={`flex size-7 items-center justify-center rounded-full text-white ${tag.tile}`}>
                    <tag.icon className="size-3.5" aria-hidden />
                  </span>
                  {tag.label}
                </motion.span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
