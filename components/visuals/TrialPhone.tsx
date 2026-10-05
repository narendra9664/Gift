"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { EASE_OUT } from "@/components/ui/Reveal";

const checklist = [
  { label: "Connect your WhatsApp number", done: true },
  { label: "Add your qualifying questions", done: true },
  { label: "Turn on AI replies", done: false },
];

/** Phone showing the welcome message a new trial account receives. */
export function TrialPhone() {
  return (
    <PhoneFrame title="Kraya" subtitle="Your AI sales assistant" initials="K" className="w-full">
      <div className="flex flex-col gap-2.5 px-3 pt-4 pb-6" aria-hidden>
        <div className="max-w-[88%] rounded-lg rounded-tl-none bg-white px-3 py-2 text-[12.5px] leading-snug text-ink shadow-sm">
          Welcome to Kraya 🎉 Your 14-day free trial is live.
        </div>

        <div className="rounded-xl bg-white p-3 text-ink shadow-sm">
          <p className="text-[10px] font-semibold tracking-wide text-ink/45 uppercase">Your setup checklist</p>
          <ul className="mt-2 flex flex-col gap-2">
            {checklist.map((item, i) => (
              <li key={item.label} className="flex items-center gap-2 text-[12px]">
                <motion.span
                  className={`flex size-5 shrink-0 items-center justify-center rounded-full ${
                    item.done ? "bg-[#16A34A] text-white" : "border-2 border-ink/20"
                  }`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 320, damping: 16, delay: 0.3 + i * 0.25 }}
                >
                  {item.done && <Check className="size-3" />}
                </motion.span>
                <span className={item.done ? "text-ink/55 line-through decoration-ink/30" : "font-semibold"}>
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-white p-3 text-ink shadow-sm">
          <div className="flex justify-between text-[11px]">
            <span className="font-semibold">Trial</span>
            <span className="text-ink/50">Day 1 of 14</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-ink/8">
            <motion.div
              className="h-full rounded-full bg-brand"
              initial={{ width: 0 }}
              whileInView={{ width: `${100 / 14}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE_OUT, delay: 0.9 }}
            />
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
