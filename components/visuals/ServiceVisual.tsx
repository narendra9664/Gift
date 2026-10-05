import {
  ArrowDown,
  Bot,
  CheckCheck,
  CircleCheck,
  Clock,
  Flame,
  PhoneCall,
  Snowflake,
  UserRound,
} from "lucide-react";
import type { ServiceVisualKind } from "@/lib/content";

/* Small product moments drawn in code, one per service card. Sample data only. */

const card = "rounded-xl bg-white text-ink shadow-[0_14px_30px_-12px_rgba(0,0,0,0.35)]";

function Qualify() {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="ml-auto max-w-[85%] rounded-lg rounded-tr-none bg-[#D9FDD3] px-3 py-2 text-[12px] leading-snug text-ink shadow-md">
        Roughly what budget are you working with?
      </div>
      <div className="flex flex-wrap gap-1.5">
        {["Under ₹50L", "₹50–90L", "₹90L+"].map((c, i) => (
          <span
            key={c}
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
              i === 1 ? "bg-white text-ink ring-2 ring-ink" : "bg-white/25 text-white"
            }`}
          >
            {c}
          </span>
        ))}
      </div>
      <div className={`${card} mt-1 flex items-center gap-2 px-3 py-2.5`}>
        <CircleCheck className="size-4 shrink-0 text-[#16A34A]" />
        <span className="text-[12px] leading-tight">
          <strong className="block">Qualified</strong>
          <span className="text-ink/55">Budget fits · buying in 2 months</span>
        </span>
      </div>
    </div>
  );
}

function FollowUp() {
  const steps = [
    { day: "Day 1", text: "Hi Rahul, still looking?", done: true },
    { day: "Day 3", text: "Here’s the floor plan 📄", done: true },
    { day: "Day 7", text: "Scheduled · 10:00 am", done: false },
  ];
  return (
    <div className={`${card} p-3.5`}>
      <ol className="relative flex flex-col gap-3 before:absolute before:top-2 before:bottom-2 before:left-[5px] before:w-0.5 before:bg-ink/10">
        {steps.map((s) => (
          <li key={s.day} className="relative flex gap-3 pl-0">
            <span
              className={`relative z-10 mt-1 size-3 shrink-0 rounded-full ring-2 ring-white ${
                s.done ? "bg-[#7C3AED]" : "bg-ink/20"
              }`}
            />
            <span className="leading-tight">
              <span className="block text-[10px] font-semibold tracking-wide text-ink/45 uppercase">{s.day}</span>
              <span className="flex items-center gap-1 text-[12px]">
                {s.text}
                {s.done ? (
                  <CheckCheck className="size-3.5 text-[#53BDEB]" />
                ) : (
                  <Clock className="size-3.5 text-ink/40" />
                )}
              </span>
            </span>
          </li>
        ))}
      </ol>
      <div className="mt-3 rounded-lg bg-[#F3E8FF] px-3 py-2 text-[11px] font-semibold text-[#6D28D9]">
        Rahul replied on Day 3 🎉
      </div>
    </div>
  );
}

function Recover() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`${card} flex w-full items-center gap-2.5 px-3 py-2.5 opacity-90`}>
        <span className="flex size-8 items-center justify-center rounded-full bg-[#CFFAFE] text-[#0E7490]">
          <Snowflake className="size-4" />
        </span>
        <span className="leading-tight">
          <strong className="block text-[12px]">Vikram Rao</strong>
          <span className="text-[11px] text-ink/55">Quiet for 21 days</span>
        </span>
      </div>
      <span className="flex size-7 items-center justify-center rounded-full bg-white/25 text-white">
        <ArrowDown className="size-4" />
      </span>
      <div className={`${card} w-full px-3 py-2.5`}>
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-full bg-[#FFEDD5] text-[#C2410C]">
            <Flame className="size-4" />
          </span>
          <span className="leading-tight">
            <strong className="block text-[12px]">Back in the chat</strong>
            <span className="text-[11px] text-ink/55">after one scheduled nudge</span>
          </span>
        </div>
        <p className="mt-2 rounded-lg rounded-tl-none bg-[#F1F5F9] px-2.5 py-1.5 text-[12px]">
          Yes, still interested!
        </p>
      </div>
    </div>
  );
}

function Handoff() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-center gap-2">
        <span className="flex size-11 items-center justify-center rounded-full bg-white text-brand shadow-md">
          <Bot className="size-5" />
        </span>
        <span className="h-0.5 w-14 border-t-2 border-dashed border-white/70" />
        <span className="flex size-11 items-center justify-center rounded-full bg-sun text-ink shadow-md">
          <UserRound className="size-5" />
        </span>
      </div>
      <div className={`${card} p-3.5`}>
        <p className="flex items-center gap-1.5 text-[11px] font-semibold text-[#C2410C]">
          <Flame className="size-3.5" /> Hot lead for you, Priya
        </p>
        <p className="mt-1.5 text-[12px] leading-snug text-ink/70">
          Rahul · 3BHK · ₹90L budget · wants a call tomorrow
        </p>
        <span className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-[#16A34A] py-2 text-[12px] font-semibold text-white">
          <PhoneCall className="size-3.5" /> Call Rahul now
        </span>
      </div>
    </div>
  );
}

function Analytics() {
  const rows = [
    { label: "Leads", value: 300, width: "100%" },
    { label: "Replied", value: 288, width: "96%" },
    { label: "Qualified", value: 120, width: "40%" },
    { label: "Hot", value: 45, width: "15%" },
  ];
  return (
    <div className={`${card} p-3.5`}>
      <p className="text-[10px] font-semibold tracking-wide text-ink/45 uppercase">This month</p>
      <ul className="mt-2.5 flex flex-col gap-2">
        {rows.map((r) => (
          <li key={r.label}>
            <div className="flex justify-between text-[11px]">
              <span className="text-ink/60">{r.label}</span>
              <strong>{r.value}</strong>
            </div>
            <div className="mt-1 h-2 rounded-full bg-ink/6">
              <div className="h-full rounded-full bg-linear-to-r from-[#F472B6] to-[#C21C6E]" style={{ width: r.width }} />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-3 rounded-lg bg-[#FCE7F3] px-3 py-2 text-[11px] font-semibold text-[#BE185D]">
        34 leads went silent this week
      </p>
    </div>
  );
}

const visuals: Record<ServiceVisualKind, () => React.ReactElement> = {
  qualify: Qualify,
  followup: FollowUp,
  recover: Recover,
  handoff: Handoff,
  analytics: Analytics,
};

export function ServiceVisual({ kind }: { kind: ServiceVisualKind }) {
  const Visual = visuals[kind];
  return (
    <div aria-hidden>
      <Visual />
    </div>
  );
}
