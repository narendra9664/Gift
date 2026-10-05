"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Check, CheckCheck, Flame, RotateCcw, SendHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { EASE_OUT, Reveal } from "@/components/ui/Reveal";
import { demo, TRIAL_LABEL, TRIAL_URL, type ChatLine } from "@/lib/content";

const script: ChatLine[] = demo.chat;

function TypingDots() {
  return (
    <motion.div
      key="typing"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="ml-auto flex w-14 items-center justify-center gap-1 rounded-lg rounded-tr-none bg-[#D9FDD3] py-3 shadow-sm"
      aria-hidden
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="size-1.5 rounded-full bg-ink/45"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12 }}
        />
      ))}
    </motion.div>
  );
}

function Bubble({ line }: { line: ChatLine }) {
  if (line.from === "system") {
    return (
      <div className="mx-auto flex items-center gap-1.5 rounded-full bg-sun px-3 py-1.5 text-[11px] font-semibold text-ink shadow-sm">
        <Flame className="size-3.5 text-[#E8590C]" aria-hidden />
        {line.text}
      </div>
    );
  }
  const fromBusiness = line.from === "bot";
  return (
    <div
      className={`max-w-[82%] rounded-lg px-3 pt-2 pb-1.5 text-[13px] leading-snug text-ink shadow-sm ${
        fromBusiness ? "ml-auto rounded-tr-none bg-[#D9FDD3]" : "rounded-tl-none bg-white"
      }`}
    >
      {line.text}
      <span className="mt-0.5 flex items-center justify-end gap-1 text-[10px] text-ink/45">
        {line.time}
        {fromBusiness && <CheckCheck className="size-3.5 text-[#53BDEB]" aria-hidden />}
      </span>
    </div>
  );
}

/** Phone mock-up that plays an example WhatsApp conversation handled by Kraya. */
function Phone() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -25% 0px" });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!inView || reduce || shown >= script.length) return;
    const fromBusiness = script[shown].from === "bot";
    const pause = shown === 0 ? 250 : 500;
    const t1 = setTimeout(() => setTyping(fromBusiness), pause);
    const t2 = setTimeout(
      () => {
        setTyping(false);
        setShown((n) => n + 1);
      },
      pause + (fromBusiness ? 950 : 350),
    );
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [inView, reduce, shown]);

  const visible = reduce ? script.length : shown;
  const finished = visible >= script.length;

  return (
    <div ref={ref} className="relative mx-auto w-[min(86vw,320px)]">
      <PhoneFrame
        title={demo.business.name}
        subtitle="Kraya AI assistant · online"
        initials={demo.business.initials}
      >
        <div
          className="flex h-[27rem] flex-col justify-end gap-2 overflow-hidden px-3 py-4"
          aria-live="polite"
          aria-label="Example WhatsApp conversation"
        >
          <AnimatePresence initial={false}>
            {script.slice(0, visible).map((line, i) => (
              <motion.div
                key={i}
                layout
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
                className="flex"
              >
                <Bubble line={line} />
              </motion.div>
            ))}
            {typing && <TypingDots />}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2 px-3 pb-4">
          <span className="flex-1 rounded-full bg-white px-4 py-2 text-xs text-ink/40">Message</span>
          <span className="flex size-8 items-center justify-center rounded-full bg-[#00A884] text-white">
            <SendHorizontal className="size-4" aria-hidden />
          </span>
        </div>
      </PhoneFrame>

      {finished && !reduce && (
        <button
          type="button"
          onClick={() => setShown(0)}
          className="absolute -bottom-12 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium text-ink/60 transition-colors hover:text-brand"
        >
          <RotateCcw className="size-3.5" aria-hidden />
          Replay
        </button>
      )}
    </div>
  );
}

export function ChatDemo() {
  return (
    <section id="demo" className="overflow-hidden bg-cream py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-5 md:px-8 lg:grid-cols-2">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">{demo.kicker}</p>
          <h2 className="display mt-4 text-[clamp(2.5rem,5vw,4.5rem)]">
            {demo.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <ul className="mt-8 flex flex-col gap-4">
            {demo.points.map((point, i) => (
              <motion.li
                key={point}
                className="flex items-start gap-3 text-[0.95rem] leading-snug"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 + i * 0.1 }}
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                  <Check className="size-3" aria-hidden />
                </span>
                {point}
              </motion.li>
            ))}
          </ul>
          <CtaButton href={TRIAL_URL} variant="blue" className="mt-9">
            {TRIAL_LABEL}
          </CtaButton>
        </Reveal>

        <Phone />
      </div>
    </section>
  );
}
