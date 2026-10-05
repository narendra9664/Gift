import {
  Bot,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesColumn,
  GraduationCap,
  HandHelping,
  MessagesSquare,
  MoonStar,
  RefreshCcwDot,
  Repeat2,
  Rocket,
  Split,
  UserRoundX,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Calls to action                                                            */
/* -------------------------------------------------------------------------- */

// TODO: point this at the real sign-up page once there is one. Until then the
// trial buttons open the on-page trial form, which saves leads to Netlify Forms.
export const TRIAL_URL = "#start-trial";
export const TRIAL_LABEL = "Start 14-day free trial";
export const TRIAL_LABEL_SHORT = "Start free trial";
export const PRICE_NOTE = "14-day free trial · Plans from ₹2,999/month";

// TODO: only promise a response time your team can actually keep.
export const CALLBACK_PROMISE = "We’ll WhatsApp you your login within one business hour.";

export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Calculator", href: "#calculator" },
  { label: "Pricing", href: TRIAL_URL },
  { label: "FAQ", href: "#faq" },
];

/* -------------------------------------------------------------------------- */
/*  Hero — what the customer wants                                             */
/* -------------------------------------------------------------------------- */

export const hero = {
  titleLines: ["Stop losing", "WhatsApp leads"],
  body: "Kraya’s AI replies to every enquiry in seconds, asks your qualifying questions and follows up until the lead is ready — so your team only talks to buyers.",
  secondary: { label: "See it in action", href: "#demo" },
  badge: { value: 14, label: "Day free trial" },
  // TODO: 3× and 50% came from the brief, not published data. Verify or replace.
  stats: [
    { value: 1000, suffix: "+", label: "Businesses growing" },
    { value: 3, suffix: "×", label: "Higher response rate" },
    { value: 50, suffix: "%", label: "More efficient reps" },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Problem — the villain, its symptoms and how it feels                       */
/* -------------------------------------------------------------------------- */

export const problem = {
  statement: {
    dark: "Your business doesn’t need more",
    light: "chats. It needs a system that closes.",
  },
  kicker: "Sound familiar?",
  symptoms: [
    {
      title: "The 11 pm enquiry",
      body: "A lead messages at night. Nobody replies. By morning they’ve bought from someone else.",
      icon: MoonStar,
      tile: "bg-[#A855F7]",
    },
    {
      title: "The missed follow-up",
      body: "Your rep said they’d follow up. They didn’t — and you’ll never know.",
      icon: UserRoundX,
      tile: "bg-[#FF8A00]",
    },
    {
      title: "The chat pile-up",
      body: "Hundreds of chats, and no idea who is actually ready to buy.",
      icon: MessagesSquare,
      tile: "bg-[#06B6D4]",
    },
    {
      title: "The scattered sources",
      body: "Meta ads, IndiaMART and missed calls all land in different places.",
      icon: Split,
      tile: "bg-[#EC4899]",
    },
  ] satisfies { title: string; body: string; icon: LucideIcon; tile: string }[],
  feeling:
    "You’re paying for every one of these leads. Watching them leak away shouldn’t be part of the job.",
};

/* -------------------------------------------------------------------------- */
/*  Services                                                                   */
/* -------------------------------------------------------------------------- */

export type ServiceVisualKind = "qualify" | "followup" | "recover" | "handoff" | "analytics";

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  /** Tailwind background class for the small icon tile. */
  tile: string;
  /** Tailwind gradient classes for the card background. */
  gradient: string;
  visual: ServiceVisualKind;
};

export const servicesTitle = ["Everything your", "sales team needs"];

export const services: Service[] = [
  {
    title: "AI Qualification",
    description: "Configure AI to engage and qualify leads automatically.",
    icon: Bot,
    tile: "bg-[#FF8A00]",
    gradient: "from-[#FFA233] to-[#F26B00]",
    visual: "qualify",
  },
  {
    title: "Auto Follow-ups",
    description: "Automate follow-up sequences via WhatsApp with flexible timing.",
    icon: Repeat2,
    tile: "bg-[#A855F7]",
    gradient: "from-[#B978FA] to-[#7C3AED]",
    visual: "followup",
  },
  {
    title: "Lead Recovery",
    description: "Revive leads that went cold with scheduled nudges.",
    icon: RefreshCcwDot,
    tile: "bg-[#06B6D4]",
    gradient: "from-[#2CCBE6] to-[#0784A3]",
    visual: "recover",
  },
  {
    title: "Smart Handoff",
    description: "Pull your rep in the moment a lead turns warm.",
    icon: HandHelping,
    tile: "bg-[#22C55E]",
    gradient: "from-[#3DD674] to-[#138A3E]",
    visual: "handoff",
  },
  {
    title: "Analytics",
    description: "See exactly who went silent and who is ready to buy.",
    icon: ChartNoAxesColumn,
    tile: "bg-[#EC4899]",
    gradient: "from-[#F472B6] to-[#C21C6E]",
    visual: "analytics",
  },
];

/* -------------------------------------------------------------------------- */
/*  Product demo                                                               */
/* -------------------------------------------------------------------------- */

export type ChatLine =
  | { from: "lead" | "bot"; text: string; time: string }
  | { from: "system"; text: string };

export const demo = {
  kicker: "Example conversation",
  title: ["Kraya works", "the night shift."],
  points: [
    "Replies in seconds — even at 11:42 pm.",
    "Asks your qualifying questions: budget, timeline, location.",
    "Books the call and alerts your rep the moment a lead is hot.",
  ],
  business: { name: "Skyline Homes", initials: "SH" },
  chat: [
    { from: "lead", text: "Hi, saw your ad. What’s the price of the 3BHK?", time: "11:42 pm" },
    {
      from: "bot",
      text: "Hi Rahul 👋 The 3BHK starts at ₹85 lakh. Are you planning to buy in the next 3 months?",
      time: "11:42 pm",
    },
    { from: "lead", text: "Yes, within 2 months.", time: "11:43 pm" },
    { from: "bot", text: "Great. Roughly what budget are you working with?", time: "11:43 pm" },
    { from: "lead", text: "Around 90 lakh.", time: "11:44 pm" },
    {
      from: "bot",
      text: "Perfect, that fits. I’ve booked a call with Priya from our team for 10:30 am tomorrow ✅",
      time: "11:44 pm",
    },
    { from: "system", text: "Hot lead · assigned to Priya" },
  ] satisfies ChatLine[],
};

/* -------------------------------------------------------------------------- */
/*  Audience                                                                   */
/* -------------------------------------------------------------------------- */

export const audience = [
  {
    title: "Business Owners",
    body: "You built the business. Now your WhatsApp needs to work as hard as you do.",
    icon: BriefcaseBusiness,
    tile: "bg-[#A855F7]",
  },
  {
    title: "CEOs & Founders",
    body: "Give your team one system that connects ads, follow-ups, and closing.",
    icon: Rocket,
    tile: "bg-[#06B6D4]",
  },
  {
    title: "Coaches & Consultants",
    body: "Turn scattered enquiries into a brand and pipeline people understand.",
    icon: GraduationCap,
    tile: "bg-[#EC4899]",
  },
  {
    title: "Established Businesses",
    body: "Modernise your sales without losing what makes the business valuable.",
    icon: Building2,
    tile: "bg-[#FF8A00]",
  },
];

/* -------------------------------------------------------------------------- */
/*  Case study                                                                 */
/* -------------------------------------------------------------------------- */

// TODO: placeholder from the brief. Replace with a real, named customer result.
export const caseStudy = {
  title: "Personal Coach Digital Presence",
  services: ["AI Qualification", "Auto Follow-up", "Lead Recovery"],
  stats: ["10x Growth.", "1200+ New leads"],
  growth: "10x",
  chart: {
    label: "New leads per month",
    value: "1,200+",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    points: [120, 190, 340, 560, 860, 1240],
  },
  tags: [
    { label: "AI Qualification", icon: Bot, tile: "bg-[#FF8A00]" },
    { label: "Auto Follow-up", icon: Repeat2, tile: "bg-[#06B6D4]" },
    { label: "Lead Recovery", icon: RefreshCcwDot, tile: "bg-[#A855F7]" },
  ],
};

/* -------------------------------------------------------------------------- */
/*  System (how it works)                                                      */
/* -------------------------------------------------------------------------- */

export const system = {
  title: ["One system,", "from first message", "to closed deal."],
  body: "An ad can create an enquiry. A system turns it into a sale. Kraya runs the whole journey: capture, qualify, follow up and hand off.",
  steps: [
    {
      title: "Lead lands",
      body: "Every enquiry — ads, IndiaMART, missed call — becomes a tracked lead.",
    },
    {
      title: "Kraya qualifies",
      body: "Asks your discovery questions, keeps only the ready ones.",
    },
    {
      title: "Follows up",
      body: "Chases quiet leads for days until they reply.",
    },
    {
      title: "Flags the hot one",
      body: "Your rep gets pulled in the moment a lead is warm.",
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Lead leak calculator (lead magnet)                                         */
/* -------------------------------------------------------------------------- */

export const calculator = {
  title: ["How much is your", "WhatsApp leaking?"],
  body: "Move the sliders. The result is the revenue you’d win if the leads you never follow up closed at your normal rate.",
  footnote: "An estimate based only on the numbers you enter.",
  inputs: {
    leads: { label: "Leads per month", min: 50, max: 5000, step: 50, initial: 300 },
    value: { label: "Average sale value", min: 1000, max: 500000, step: 1000, initial: 20000 },
    leak: { label: "Leads that never get a proper follow-up", min: 5, max: 80, step: 5, initial: 30 },
    close: { label: "Your close rate", min: 1, max: 50, step: 1, initial: 10 },
  },
  capture: {
    heading: "Get this report on WhatsApp",
    submit: "Send my report",
    success: "Done — we’ll send your report to WhatsApp.",
  },
};

/* -------------------------------------------------------------------------- */
/*  FAQ                                                                        */
/* -------------------------------------------------------------------------- */

export const faqs = [
  {
    q: "How does Kraya handle WhatsApp compliance?",
    a: "Kraya is built on the official WhatsApp Business API through Meta-approved infrastructure, ensuring every message goes out through verified, compliant channels.",
  },
  {
    q: "Can Kraya qualify leads before my team talks to them?",
    a: "Yes. The AI Qualification Bot asks your discovery questions on WhatsApp and only assigns a lead to a rep once it’s ready for a sales conversation.",
  },
  {
    q: "Will my sales team still be in control?",
    a: "Yes. Kraya tracks calls and messages, lets you set custom sales stages, and pulls a rep in the moment a lead turns warm. Your team decides how every deal closes.",
  },
  {
    q: "Which businesses use Kraya?",
    a: "Teams in education, healthcare, fitness, real estate and logistics use Kraya to reply faster, stop lead drop-off and close more deals from the same enquiries.",
  },
  {
    q: "How much does Kraya cost?",
    a: "Plans start at ₹2,999 per month, and every plan comes with a 14-day free trial.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Trial CTA + footer                                                         */
/* -------------------------------------------------------------------------- */

export const trial = {
  title: ["Try Kraya free", "for 14 days."],
  body: "Leave your name and WhatsApp number. We’ll set up your account and send you the login.",
  submit: "Start my free trial",
};

/* -------------------------------------------------------------------------- */
/*  End-of-page pop-up                                                         */
/* -------------------------------------------------------------------------- */

export const popup = {
  badge: "Free",
  kicker: "Before you go…",
  title: ["See Kraya reply to", "your own leads."],
  body: "Leave your details and we’ll WhatsApp you a free demo set up for your business.",
  industriesLabel: "What do you sell? (optional)",
  industries: ["Education", "Real estate", "Healthcare", "Fitness", "Logistics", "Other"],
  submit: "Get my free demo",
  // TODO: only promise a response time your team can actually keep.
  success: "We’ll WhatsApp you within one business hour to set up your demo.",
  privacy: "We’ll only use your number to contact you about Kraya.",
};

/** Draggable footer stickers; x / y are % offsets inside the sticker area. */
export const stickers = [
  { label: "WhatsApp API", color: "#90EE90", size: 84, x: 0, y: 4, rotate: 20 },
  { label: "AI Qualification", color: "#FFD700", size: 104, x: 8, y: 48, rotate: -14 },
  { label: "Auto Follow-up", color: "#90EE90", size: 92, x: 28, y: 4, rotate: 12 },
  { label: "CRM", color: "#F9A8D4", size: 64, x: 32, y: 66, rotate: -24 },
  { label: "Lead Recovery", color: "#DDA0DD", size: 118, x: 47, y: 36, rotate: -8 },
  { label: "Smart Handoff", color: "#8CCBFF", size: 100, x: 70, y: 0, rotate: 16 },
  { label: "Broadcasts", color: "#FFD700", size: 76, x: 70, y: 62, rotate: 10 },
  { label: "Analytics", color: "#FFA500", size: 80, x: 86, y: 40, rotate: -18 },
];

export const footer = {
  title: ["Better sales start", "with a clearer system."],
  tagline: "AI Sales. WhatsApp-First. Growth.",
  columns: [
    {
      heading: "Explore",
      links: [
        { label: "Features", href: "#features" },
        { label: "How It Works", href: "#how-it-works" },
        { label: "Lead Leak Calculator", href: "#calculator" },
        { label: "Pricing", href: TRIAL_URL },
        { label: "FAQ", href: "#faq" },
        { label: TRIAL_LABEL_SHORT, href: TRIAL_URL },
      ],
    },
    {
      heading: "Services",
      links: services.map((s) => ({ label: s.title, href: "#features" })),
    },
    {
      // TODO: add the real profile URLs and email address.
      heading: "Connect",
      links: [
        { label: "LinkedIn", href: "#" },
        { label: "Instagram", href: "#" },
        { label: "Facebook", href: "#" },
        { label: "Email", href: "#" },
      ],
    },
  ],
};
