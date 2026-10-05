import { ArrowRight } from "lucide-react";

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "white" | "blue";
  shape?: "rect" | "pill";
  className?: string;
};

const variants = {
  white:
    "bg-white text-ink hover:bg-ink hover:text-white focus-visible:outline-white",
  blue: "bg-brand text-white hover:bg-ink focus-visible:outline-brand",
};

export function CtaButton({
  href,
  children,
  variant = "white",
  shape = "rect",
  className = "",
}: CtaButtonProps) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2 whitespace-nowrap px-5 py-3 text-sm font-semibold shadow-sm transition-all duration-300 ease-out-expo hover:scale-[1.04] hover:shadow-lg active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 ${
        shape === "pill" ? "rounded-full" : "rounded-md"
      } ${variants[variant]} ${className}`}
    >
      {children}
      <ArrowRight
        aria-hidden
        className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
      />
    </a>
  );
}
