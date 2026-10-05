"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useId, useState } from "react";
import { LeadForm } from "@/components/ui/LeadForm";
import { Reveal } from "@/components/ui/Reveal";
import { calculator } from "@/lib/content";

type InputKey = keyof typeof calculator.inputs;
type Values = Record<InputKey, number>;

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

const format: Record<InputKey, (n: number) => string> = {
  leads: (n) => n.toLocaleString("en-IN"),
  value: inr,
  leak: (n) => `${n}%`,
  close: (n) => `${n}%`,
};

function Slider({ name, value, onChange }: { name: InputKey; value: number; onChange: (v: number) => void }) {
  const id = useId();
  const { label, min, max, step } = calculator.inputs[name];
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm font-medium text-ink/75">
          {label}
        </label>
        <output htmlFor={id} className="font-display text-2xl tracking-tight">
          {format[name](value)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuetext={format[name](value)}
        className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full accent-brand [&::-webkit-slider-thumb]:size-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-brand [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-brand"
        style={{ background: `linear-gradient(to right, var(--color-brand) ${fill}%, rgba(17,17,17,0.12) ${fill}%)` }}
      />
    </div>
  );
}

/** Smoothly tweens the displayed rupee amount when the inputs change. */
function AnimatedInr({ value, className }: { value: number; className?: string }) {
  const mv = useMotionValue(value);
  const text = useTransform(mv, inr);
  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.5, ease: "easeOut" });
    return () => controls.stop();
  }, [mv, value]);
  return <motion.span className={className}>{text}</motion.span>;
}

export function LeakCalculator() {
  const [values, setValues] = useState<Values>(() => {
    const entries = Object.entries(calculator.inputs).map(([k, v]) => [k, v.initial]);
    return Object.fromEntries(entries) as Values;
  });

  const monthlyLoss = values.leads * (values.leak / 100) * (values.close / 100) * values.value;
  const lostDeals = values.leads * (values.leak / 100) * (values.close / 100);

  return (
    <section id="calculator" className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="text-center">
          <h2 className="display text-[clamp(2.75rem,6vw,5.25rem)]">
            {calculator.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-ink/65">{calculator.body}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="grid overflow-hidden rounded-3xl bg-white shadow-[0_30px_70px_-35px_rgba(17,17,17,0.35)] lg:grid-cols-[1.1fr_1fr]">
            <div className="flex flex-col gap-8 p-6 sm:p-10">
              {(Object.keys(calculator.inputs) as InputKey[]).map((key) => (
                <Slider
                  key={key}
                  name={key}
                  value={values[key]}
                  onChange={(v) => setValues((prev) => ({ ...prev, [key]: v }))}
                />
              ))}
              <p className="text-xs text-ink/45">{calculator.footnote}</p>
            </div>

            <div className="flex flex-col bg-linear-to-br from-brand-light via-brand to-brand-deep p-6 text-white sm:p-10">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase">You’re likely losing</p>
              <p className="mt-3" aria-live="polite">
                <AnimatedInr value={monthlyLoss} className="display block text-[clamp(3rem,7vw,4.75rem)]" />
                <span className="mt-1 block text-sm text-white/85">every month</span>
              </p>
              <p className="mt-5 text-sm leading-relaxed text-white/90">
                That’s about <strong>{Math.round(lostDeals).toLocaleString("en-IN")} sales</strong> a month and{" "}
                <strong>{inr(monthlyLoss * 12)}</strong> a year walking out of your WhatsApp.
              </p>

              <div className="mt-auto border-t border-white/20 pt-6">
                <p className="mb-4 mt-8 text-sm font-semibold">{calculator.capture.heading}</p>
                <LeadForm
                  formName="leak-report"
                  submitLabel={calculator.capture.submit}
                  successMessage={calculator.capture.success}
                  extra={{
                    leads_per_month: String(values.leads),
                    sale_value: String(values.value),
                    leak_percent: String(values.leak),
                    close_rate: String(values.close),
                    monthly_loss: String(Math.round(monthlyLoss)),
                  }}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
