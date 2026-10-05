"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceVisual } from "@/components/visuals/ServiceVisual";
import { services, servicesTitle } from "@/lib/content";

export function Services() {
  const track = useRef<HTMLUListElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 300) + 16), behavior: "smooth" });
  };

  return (
    <section id="features" className="overflow-hidden bg-linear-to-b from-brand-light to-brand py-24 text-white md:py-28">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-5 md:px-8">
        <Reveal>
          <h2 className="display text-center text-[clamp(2.75rem,6vw,5rem)]">
            {servicesTitle.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <ul
          ref={track}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 md:px-8 xl:justify-center"
        >
          {services.map((s) => (
            <li
              key={s.title}
              className={`group relative aspect-[3/5] w-[72vw] max-w-[300px] shrink-0 snap-center overflow-hidden rounded-2xl bg-linear-to-b shadow-[0_20px_50px_-20px_rgba(0,30,90,0.6)] transition-transform duration-500 ease-out-expo hover:-translate-y-2 sm:w-[260px] xl:w-[min(17vw,272px)] ${s.gradient}`}
            >
              {/* Decorative depth. */}
              <span aria-hidden className="absolute -top-16 -right-16 size-48 rounded-full bg-white/12" />
              <span aria-hidden className="absolute -bottom-24 -left-12 size-56 rounded-full bg-black/8" />

              <span className="absolute top-4 left-4 flex size-8 items-center justify-center rounded-md bg-white/20 text-white ring-1 ring-white/30">
                <s.icon className="size-4" aria-hidden />
              </span>
              <div className="absolute inset-x-4 top-16 transition-transform duration-500 ease-out-expo group-hover:-translate-y-1.5 group-hover:scale-[1.02]">
                <ServiceVisual kind={s.visual} />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/35 to-transparent p-5 pt-10">
                <h3 className="font-display text-[1.9rem] leading-none tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-snug text-white/85">{s.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mt-8 flex justify-center gap-3 xl:hidden">
        {([-1, 1] as const).map((dir) => (
          <button
            key={dir}
            type="button"
            onClick={() => scroll(dir)}
            aria-label={dir === -1 ? "Previous service" : "Next service"}
            className="flex size-11 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white hover:text-brand"
          >
            {dir === -1 ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />}
          </button>
        ))}
      </div>
    </section>
  );
}
