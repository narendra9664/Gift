import {
  Bot,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesColumn,
  GraduationCap,
  HandHelping,
  RefreshCcwDot,
  Repeat2,
  Rocket,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Links                                                                      */
/* -------------------------------------------------------------------------- */

// TODO: point this at the real booking flow (Calendly, wa.me/<number>, etc.).
export const EXPERT_SESSION_URL = "#contact";
export const EXPERT_SESSION_LABEL = "Book A FREE Expert Session";

export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  // TODO: these pages don't exist yet — replace with real URLs.
  { label: "Pricing", href: "#" },
  { label: "Integrations", href: "#" },
  { label: "Blog", href: "#" },
];

/* -------------------------------------------------------------------------- */
/*  Images                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Every photo on the page comes from this manifest.
 *
 * The files in /public/images are low-resolution previews of images generated
 * in Canva. Replace each file with its full-size Canva download (keep the same
 * file name) before going live — see README.md for the Canva IDs.
 */
export const images = {
  hero: {
    src: "/images/hero.jpg",
    alt: "Sales rep in a navy suit leaping through a blue sky holding a phone",
  },
  ctaMan: {
    src: "/images/cta-man.png",
    alt: "Sales rep in a navy suit jumping while typing on a laptop",
  },
  qualification: {
    src: "/images/card-qualification.jpg",
    alt: "Woman in a pink suit running through a flower market with a laptop",
  },
  followups: {
    src: "/images/card-followups.jpg",
    alt: "Man in a green suit surrounded by flying message cards",
  },
  recovery: {
    src: "/images/card-recovery.jpg",
    alt: "Woman in a black suit working on a laptop while sitting on a crocodile",
  },
} as const;

export type ImageKey = keyof typeof images;

/** A photo slot: which image to show and how to crop it. */
export type Shot = {
  image: ImageKey;
  /** CSS object-position, e.g. "50% 30%". */
  position?: string;
  /** Zoom factor for tight crops such as avatars. */
  zoom?: number;
  /** Cut-out PNG shown on a sky gradient instead of a full-bleed photo. */
  cutout?: boolean;
};

/* -------------------------------------------------------------------------- */
/*  Hero                                                                       */
/* -------------------------------------------------------------------------- */

export const hero = {
  titleLines: ["Move the", "Business"],
  body: "Kraya builds AI sales systems that convert your ads into leads — and makes sure none of them die. WhatsApp-first automation for teams that never want to lose a lead.",
  badge: { value: 14, label: "Day free trial" },
  stats: [
    { value: 1000, suffix: "+", label: "Businesses growing" },
    { value: 3, suffix: "×", label: "Higher response rate" },
    { value: 50, suffix: "%", label: "More efficient reps" },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Services                                                                   */
/* -------------------------------------------------------------------------- */

export type Service = {
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  /** Tailwind background class for the small icon tile. */
  tile: string;
  shot: Shot;
};

export const services: Service[] = [
  {
    title: "AI Qualification",
    short: "Only talk to leads who are ready.",
    description: "Configure AI to engage and qualify leads automatically.",
    icon: Bot,
    tile: "bg-[#FF8A00]",
    shot: { image: "qualification", position: "50% 30%" },
  },
  {
    title: "Auto Follow-ups",
    short: "No enquiry goes quiet without a nudge.",
    description: "Automate follow-up sequences via WhatsApp with flexible timing.",
    icon: Repeat2,
    tile: "bg-[#A855F7]",
    shot: { image: "followups", position: "50% 40%" },
  },
  {
    title: "Lead Recovery",
    short: "Bring cold leads back to the table.",
    description: "Revive leads that went cold with scheduled nudges.",
    icon: RefreshCcwDot,
    tile: "bg-[#06B6D4]",
    shot: { image: "recovery", position: "45% 50%" },
  },
  {
    title: "Smart Handoff",
    short: "Your rep steps in at the right moment.",
    description: "Pull your rep in the moment a lead turns warm.",
    icon: HandHelping,
    tile: "bg-[#22C55E]",
    shot: { image: "ctaMan", cutout: true },
  },
  {
    title: "Analytics",
    short: "Know who’s silent and who’s ready.",
    description: "See exactly who went silent and who is ready to buy.",
    icon: ChartNoAxesColumn,
    tile: "bg-[#EC4899]",
    shot: { image: "hero", position: "62% 50%" },
  },
];

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

/** Face crops: `position` is the face centre, `zoom` how tight the crop is. */
export const avatars: Shot[] = [
  { image: "followups", position: "52% 33%", zoom: 2.4 },
  { image: "qualification", position: "42% 15%", zoom: 2.8 },
  { image: "ctaMan", position: "49% 12%", zoom: 3.2 },
  { image: "recovery", position: "48% 22%", zoom: 2.8 },
];

/* -------------------------------------------------------------------------- */
/*  Case study                                                                 */
/* -------------------------------------------------------------------------- */

export const caseStudy = {
  title: "Personal Coach Digital Presence",
  services: ["AI Qualification", "Auto Follow-up", "Lead Recovery"],
  stats: ["10x Growth.", "1200+ New leads"],
  growth: "10x",
  shot: { image: "followups", position: "50% 45%" } satisfies Shot,
  stack: [
    { image: "qualification", position: "50% 20%" },
    { image: "recovery", position: "50% 30%" },
  ] satisfies Shot[],
  tags: [
    { label: "AI Qualification", icon: Bot, tile: "bg-[#FF8A00]" },
    { label: "Auto Follow-up", icon: Repeat2, tile: "bg-[#06B6D4]" },
    { label: "Lead Recovery", icon: RefreshCcwDot, tile: "bg-[#A855F7]" },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Approach                                                                   */
/* -------------------------------------------------------------------------- */

export const approach = {
  steps: [
    {
      title: "Understand",
      body: "We map how leads reach you today — ads, IndiaMART, missed calls, walk-ins — and where they slip away.",
      shot: { image: "followups", position: "50% 38%" } satisfies Shot,
    },
    {
      title: "Define",
      body: "We identify the biggest opportunity and build a clear sales direction around it.",
      shot: { image: "hero", position: "60% 40%" } satisfies Shot,
    },
    {
      title: "Releasing old patterns",
      body: "We retire the spreadsheets, manual reminders and forgotten chats that slow your team down.",
      shot: { image: "ctaMan", cutout: true } satisfies Shot,
    },
    {
      title: "Foundations of your mind",
      body: "We set up the stages, habits and reports your team runs on every day.",
      shot: { image: "followups", position: "50% 70%" } satisfies Shot,
    },
  ],
  title: ["Less guessing.", "More direction."],
  body: "We don’t start by asking what you want to post next. We start by understanding what the business needs next.",
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
/*  CTA + footer                                                               */
/* -------------------------------------------------------------------------- */

export const cta = {
  title: ["Let’s make the", "next move", "clear."],
  body: "Tell us how leads reach you today, and we’ll show you where they’re slipping away.",
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
        { label: "Pricing", href: "#" },
        { label: "Integrations", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Contact", href: "#contact" },
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
