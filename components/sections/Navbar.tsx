"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { CtaButton } from "@/components/ui/CtaButton";
import { navLinks, TRIAL_LABEL_SHORT, TRIAL_URL } from "@/lib/content";

export function Logo() {
  return (
    <a href="#top" className="flex items-center gap-1.5 text-xl font-bold tracking-tight">
      Kraya
      <span className="rounded-md bg-white/20 px-1.5 py-0.5 text-sm font-semibold">AI</span>
    </a>
  );
}

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-white transition-all duration-500 ${
        scrolled ? "bg-brand/90 shadow-[0_8px_30px_rgba(0,40,100,0.25)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 md:px-8">
        <Logo />

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="relative text-sm font-medium text-white/85 transition-colors hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <CtaButton href={TRIAL_URL} shape="pill" className="py-2.5">
            {TRIAL_LABEL_SHORT}
          </CtaButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-full p-2 transition-colors hover:bg-white/15 lg:hidden"
          aria-label="Open menu"
          aria-expanded={open}
        >
          <Menu className="size-6" />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col bg-brand px-5 pb-10 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex h-18 items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 hover:bg-white/15"
                aria-label="Close menu"
              >
                <X className="size-6" />
              </button>
            </div>
            <ul className="mt-8 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="display block py-2 text-5xl"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href={TRIAL_URL}
              onClick={() => setOpen(false)}
              className="mt-auto flex items-center justify-center gap-2 rounded-full bg-white py-4 font-semibold text-ink"
            >
              {TRIAL_LABEL_SHORT}
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
