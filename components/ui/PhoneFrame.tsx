type PhoneFrameProps = {
  title: string;
  subtitle: string;
  initials: string;
  children: React.ReactNode;
  className?: string;
};

/** A phone mock-up with a WhatsApp-style chat header. */
export function PhoneFrame({ title, subtitle, initials, children, className = "" }: PhoneFrameProps) {
  return (
    <div className={`rounded-[2.6rem] bg-ink p-2.5 shadow-[0_40px_80px_-30px_rgba(0,40,120,0.55)] ${className}`}>
      <div className="overflow-hidden rounded-[2.1rem] bg-[#EFEAE2]">
        <div className="flex items-center gap-3 bg-brand-deep px-4 pt-7 pb-3 text-white">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
            {initials}
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold">{title}</p>
            <p className="text-[11px] text-white/75">{subtitle}</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
