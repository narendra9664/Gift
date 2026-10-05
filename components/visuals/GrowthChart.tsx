"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { EASE_OUT } from "@/components/ui/Reveal";
import { caseStudy } from "@/lib/content";

const W = 280;
const H = 230;

/** Line chart of the case study's monthly leads, drawn on scroll. */
export function GrowthChart() {
  const { label, value, months, points } = caseStudy.chart;
  const max = Math.max(...points) * 1.1;
  const xy = points.map((p, i) => [(i / (points.length - 1)) * W, H - (p / max) * H] as const);
  // Smooth the line with simple cubic curves between points.
  const line = xy
    .map(([x, y], i) => {
      if (i === 0) return `M${x} ${y}`;
      const [px, py] = xy[i - 1];
      const cx = (px + x) / 2;
      return `C${cx} ${py} ${cx} ${y} ${x} ${y}`;
    })
    .join(" ");
  const area = `${line} L${W} ${H} L0 ${H}Z`;
  const [lastX, lastY] = xy[xy.length - 1];

  return (
    <div className="absolute inset-0 flex flex-col bg-linear-to-b from-[#EAF4FF] to-white p-4" aria-hidden>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-semibold tracking-wide text-ink/45 uppercase">{label}</p>
          <p className="display mt-1 text-4xl text-ink">{value}</p>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-[#DCFCE7] px-2 py-1 text-[11px] font-semibold text-[#15803D]">
          <TrendingUp className="size-3.5" /> {caseStudy.growth}
        </span>
      </div>

      <svg viewBox={`-6 -10 ${W + 12} ${H + 16}`} className="mt-auto w-full overflow-visible">
        <defs>
          <linearGradient id="growth-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--color-brand)" stopOpacity="0.28" />
            <stop offset="1" stopColor="var(--color-brand)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} stroke="#111111" strokeOpacity="0.07" />
        ))}
        <motion.path
          d={area}
          fill="url(#growth-fill)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.9 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="3.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: EASE_OUT, delay: 0.3 }}
        />
        <motion.circle
          cx={lastX}
          cy={lastY}
          r="6"
          fill="white"
          stroke="var(--color-brand)"
          strokeWidth="3.5"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 15, delay: 1.7 }}
        />
      </svg>
      <div className="mt-2 flex justify-between text-[10px] font-medium text-ink/45">
        {months.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  );
}
