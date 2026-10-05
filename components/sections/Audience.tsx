"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { ScallopClipDef } from "@/components/ui/shapes";
import { audience } from "@/lib/content";

function AudienceItem({ item, delay }: { item: (typeof audience)[number]; delay: number }) {
  return (
    <Reveal delay={delay} className="mx-auto flex max-w-xs flex-col items-center text-center">
      <span className={`flex size-9 items-center justify-center rounded-lg text-white ${item.tile}`}>
        <item.icon className="size-4.5" aria-hidden />
      </span>
      <h3 className="mt-4 font-display text-3xl tracking-tight">{item.title}</h3>
      <p className="mt-2 text-sm leading-snug text-ink/60">{item.body}</p>
    </Reveal>
  );
}

export function Audience() {
  const [owners, ceos, coaches, established] = audience;

  return (
    <section className="bg-cream py-24 md:py-32">
      <ScallopClipDef />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <h2 className="display text-center text-[clamp(2.75rem,6vw,5.25rem)]">
            Different businesses.
            <br />
            Same problem.
          </h2>
          <p className="mx-auto mt-5 max-w-sm text-center text-sm text-ink/60">
            You know your business works. The challenge is turning every enquiry into a conversation that closes.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 sm:grid-cols-2">
          <AudienceItem item={owners} delay={0} />
          <AudienceItem item={ceos} delay={0.1} />
        </div>

        <Reveal delay={0.1} className="my-12 flex justify-center">
          <div className="flex items-center gap-2 rounded-full bg-sun px-4 py-3 shadow-[0_18px_40px_-18px_rgba(150,110,0,0.5)] sm:gap-4 sm:px-6">
            {audience.map((item, i) => (
              <motion.div
                key={item.title}
                aria-hidden
                className={`relative flex size-16 items-center justify-center text-white [clip-path:url(#scallop)] sm:size-20 ${item.tile}`}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
                whileHover={{ scale: 1.12, rotate: -8 }}
              >
                <span className="absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.55),transparent_55%)]" />
                <item.icon className="relative size-7 drop-shadow-sm sm:size-8" />
              </motion.div>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-12 sm:grid-cols-2">
          <div className="sm:justify-self-start">
            <AudienceItem item={coaches} delay={0} />
          </div>
          <div className="sm:justify-self-end">
            <AudienceItem item={established} delay={0.1} />
          </div>
        </div>
      </div>
    </section>
  );
}
