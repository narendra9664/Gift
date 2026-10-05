"use client";

import { motion } from "framer-motion";
import {
  Bot,
  CheckCheck,
  CircleCheck,
  Flame,
  MessageCircle,
  RefreshCcwDot,
  Repeat2,
  type LucideIcon,
} from "lucide-react";
import { EASE_OUT } from "@/components/ui/Reveal";
import { Clouds } from "@/components/ui/shapes";

/* Illustrative sample data for the product mock-up. */
const statuses = {
  hot: { label: "Hot", icon: Flame, className: "bg-[#FFEDD5] text-[#C2410C]" },
  qualifying: { label: "Qualifying", icon: Bot, className: "bg-[#DBEAFE] text-[#1D4ED8]" },
  followup: { label: "Follow-up · Day 3", icon: Repeat2, className: "bg-[#F3E8FF] text-[#7E22CE]" },
  won: { label: "Won", icon: CircleCheck, className: "bg-[#DCFCE7] text-[#15803D]" },
  recovering: { label: "Recovering", icon: RefreshCcwDot, className: "bg-[#CFFAFE] text-[#0E7490]" },
} satisfies Record<string, { label: string; icon: LucideIcon; className: string }>;

const leads: { name: string; color: string; source: string; last: string; status: keyof typeof statuses }[] = [
  { name: "Rahul Mehta", color: "#FF8A00", source: "Meta ad", last: "What’s the price of the 3BHK?", status: "hot" },
  { name: "Sneha Iyer", color: "#06B6D4", source: "IndiaMART", last: "Need 200 units by March", status: "qualifying" },
  { name: "Arjun Patel", color: "#A855F7", source: "Missed call", last: "Kraya sent the brochure", status: "followup" },
  { name: "Fatima Khan", color: "#22C55E", source: "Website", last: "Booked a visit for Friday", status: "won" },
  { name: "Vikram Rao", color: "#EC4899", source: "Meta ad", last: "Yes, still interested!", status: "recovering" },
];

const tabs = [
  { label: "All", count: 128, active: true },
  { label: "Hot", count: 12 },
  { label: "Follow-up", count: 34 },
  { label: "Won", count: 9 },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("");

function Toast({
  children,
  className,
  delay,
}: {
  children: React.ReactNode;
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      className={`absolute z-20 ${className}`}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay + 0.6 }}
        className="flex items-center gap-2.5 rounded-xl bg-white/95 py-2.5 pr-4 pl-2.5 text-ink shadow-[0_18px_40px_-14px_rgba(0,30,90,0.45)] backdrop-blur"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Product mock-up for the hero: Kraya's lead inbox with live notifications. */
export function HeroDashboard() {
  return (
    <div className="relative mx-auto w-full max-w-[34rem] [perspective:1800px]" aria-hidden>
      <motion.div
        initial={{ opacity: 0, y: 60, rotateY: -22, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateY: -9, rotateX: 4 }}
        transition={{ duration: 1.3, ease: EASE_OUT, delay: 0.2 }}
        className="relative z-10 overflow-hidden rounded-2xl bg-white text-ink shadow-[0_50px_100px_-30px_rgba(0,25,80,0.65)]"
      >
        <div className="flex items-center gap-1.5 border-b border-ink/8 px-4 py-3">
          <span className="size-2.5 rounded-full bg-[#FF5F57]" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-2.5 rounded-full bg-[#28C840]" />
          <span className="ml-3 text-xs font-semibold">Kraya · Leads</span>
          <span className="ml-auto flex items-center gap-1.5 rounded-full bg-[#DCFCE7] px-2 py-0.5 text-[10px] font-semibold text-[#15803D]">
            <span className="size-1.5 animate-pulse rounded-full bg-[#22C55E]" />
            AI replying
          </span>
        </div>

        <div className="flex gap-1.5 px-4 pt-3 pb-2">
          {tabs.map((t) => (
            <span
              key={t.label}
              className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                t.active ? "bg-ink text-white" : "bg-ink/5 text-ink/60"
              }`}
            >
              {t.label} <span className="opacity-60">{t.count}</span>
            </span>
          ))}
        </div>

        <ul>
          {leads.map((lead, i) => {
            const status = statuses[lead.status];
            return (
              <motion.li
                key={lead.name}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.7 + i * 0.1 }}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-t border-ink/6 px-4 py-2.5"
              >
                <span
                  className="flex size-8 items-center justify-center rounded-full text-[10px] font-bold text-white"
                  style={{ background: lead.color }}
                >
                  {initials(lead.name)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[12px] font-semibold">{lead.name}</span>
                  <span className="block truncate text-[10.5px] text-ink/50">
                    {lead.source} · “{lead.last}”
                  </span>
                </span>
                <span
                  className={`flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold whitespace-nowrap ${status.className}`}
                >
                  <status.icon className="size-3" />
                  {status.label}
                </span>
              </motion.li>
            );
          })}
        </ul>
      </motion.div>

      <Toast className="-top-6 -left-2 sm:-left-10" delay={1.2}>
        <span className="flex size-8 items-center justify-center rounded-lg bg-[#25D366] text-white">
          <MessageCircle className="size-4" />
        </span>
        <span className="leading-tight">
          <span className="block text-[11px] font-semibold">New enquiry</span>
          <span className="block text-[10px] text-ink/50">Meta ad · 11:42 pm</span>
        </span>
      </Toast>

      <Toast className="top-[44%] -right-2 sm:-right-8" delay={1.5}>
        <span className="flex size-8 items-center justify-center rounded-lg bg-sun">
          <Flame className="size-4 text-[#E8590C]" />
        </span>
        <span className="leading-tight">
          <span className="block text-[11px] font-semibold">Hot lead → Priya</span>
          <span className="block text-[10px] text-ink/50">Budget fits · buying in 2 months</span>
        </span>
      </Toast>

      <Toast className="-bottom-5 left-4 hidden sm:block" delay={1.8}>
        <span className="flex size-8 items-center justify-center rounded-lg bg-brand text-white">
          <Bot className="size-4" />
        </span>
        <span className="leading-tight">
          <span className="flex items-center gap-1 text-[11px] font-semibold">
            AI replied instantly <CheckCheck className="size-3.5 text-[#53BDEB]" />
          </span>
          <span className="block text-[10px] text-ink/50">Asked budget & timeline</span>
        </span>
      </Toast>

      <Clouds
        seed={11}
        fade={false}
        className="pointer-events-none absolute -bottom-14 left-1/2 z-0 h-40 w-[140%] -translate-x-1/2 [mask-image:radial-gradient(ellipse_at_50%_35%,black_30%,transparent_68%)]"
      />
    </div>
  );
}
