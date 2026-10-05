"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { StickerBadge } from "@/components/ui/shapes";
import { footer, stickers } from "@/lib/content";

function StickerPile() {
  const bounds = useRef<HTMLDivElement>(null);
  return (
    <div ref={bounds} className="relative h-64 w-full max-w-xl sm:h-56 lg:ml-auto">
      {stickers.map((s, i) => (
        <motion.div
          key={s.label}
          className="absolute cursor-grab touch-none active:cursor-grabbing"
          // Offsets are a share of the free space, so a sticker never leaves the area.
          style={{
            left: `calc((100% - ${s.size}px) * ${s.x / 100})`,
            top: `calc((100% - ${s.size}px) * ${s.y / 100})`,
            rotate: s.rotate,
          }}
          drag
          dragConstraints={bounds}
          dragElastic={0.2}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 + i * 0.07 }}
          whileHover={{ scale: 1.1, rotate: s.rotate + 8 }}
          whileTap={{ scale: 0.95 }}
          title="Drag me"
        >
          <StickerBadge label={s.label} color={s.color} size={s.size} />
        </motion.div>
      ))}
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="overflow-x-clip bg-cream pb-10">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid items-end gap-8 border-b border-ink/10 pb-10 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <h2 className="display text-[clamp(2.75rem,5.6vw,5rem)]">
              {footer.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </Reveal>
          <StickerPile />
        </div>

        <div className="grid grid-cols-2 gap-10 py-12 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <p className="text-xl font-bold tracking-tight">
              Kraya <span className="rounded-md bg-brand px-1.5 py-0.5 text-sm font-semibold text-white">AI</span>
            </p>
            <p className="mt-3 text-xs text-ink/60">{footer.tagline}</p>
          </div>
          {footer.columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="text-xs font-semibold">{col.heading}</h3>
              <ul className="mt-3 flex flex-col gap-0.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="inline-block py-1.5 text-sm text-ink/65 transition-colors hover:text-brand">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-ink/10 pt-6 text-xs text-ink/55 sm:flex-row sm:items-center sm:gap-6">
          <p>© {year} Kraya AI. All rights reserved.</p>
          <a href="#" className="hover:text-brand">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-brand">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
