/* Decorative SVG shapes: clouds, scalloped badges and the laurel wreath. */

const round = (n: number) => Math.round(n * 1000) / 1000;

/** Small seeded PRNG so server and client render identical shapes. */
function random(seed: number) {
  let t = seed;
  return () => {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/** Path for a scalloped circle that fits a `size` × `size` box. */
export function scallopPath(size = 1, bumps = 14) {
  const c = size / 2;
  const inner = size * 0.42;
  const control = size * 0.56;
  let d = "";
  for (let i = 0; i <= bumps; i++) {
    const a = (i / bumps) * Math.PI * 2 - Math.PI / 2;
    const x = round(c + inner * Math.cos(a));
    const y = round(c + inner * Math.sin(a));
    if (i === 0) {
      d += `M${x} ${y}`;
      continue;
    }
    const m = a - Math.PI / bumps;
    d += `Q${round(c + control * Math.cos(m))} ${round(c + control * Math.sin(m))} ${x} ${y}`;
  }
  return `${d}Z`;
}

/** Hidden clip-path definition, used as `clip-path: url(#scallop)`. */
export function ScallopClipDef() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden>
      <clipPath id="scallop" clipPathUnits="objectBoundingBox">
        <path d={scallopPath(1, 12)} />
      </clipPath>
    </svg>
  );
}

type CloudsProps = {
  className?: string;
  /** Colour the clouds fade into at the bottom. */
  base?: string;
  /** Set false for free-floating clouds that shouldn't fade into a section below. */
  fade?: boolean;
  seed?: number;
};

/** A bank of puffy clouds that sits on the bottom edge of a section. Pass its size via `className`. */
export function Clouds({ className = "", base = "#f5f5f0", fade = true, seed = 1 }: CloudsProps) {
  const rand = random(seed);
  // Three rows of puffs, back to front. The front row dips below the bottom
  // edge so the bank always reads as solid where it meets the next section.
  const rows = [
    { gap: [150, 170], r: [40, 45], cy: (r: number) => 160 - r * 0.2 + rand() * 40 },
    { gap: [55, 55], r: [40, 40], cy: (r: number) => 225 - r * 0.3 + rand() * 25 },
    { gap: [50, 40], r: [55, 45], cy: (r: number) => 300 + r * 0.05 },
  ];
  const puffs: { cx: number; cy: number; r: number }[] = [];
  for (const row of rows) {
    for (let x = -60 + rand() * 60; x < 1500; x += row.gap[0] + rand() * row.gap[1]) {
      const r = row.r[0] + rand() * row.r[1];
      puffs.push({ cx: x, cy: row.cy(r), r });
    }
  }
  const shade = `cloud-shade-${seed}`;
  const fadeId = `cloud-fade-${seed}`;
  const soft = `cloud-soft-${seed}`;

  return (
    <svg
      viewBox="0 0 1440 300"
      preserveAspectRatio="xMidYMax slice"
      className={`pointer-events-none block ${className}`}
      aria-hidden
    >
      <defs>
        <radialGradient id={shade} cx="0.42" cy="0.32" r="0.72">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#ffffff" />
          <stop offset="0.85" stopColor="#e4eefa" />
          <stop offset="1" stopColor="#c6d9f0" />
        </radialGradient>
        <linearGradient id={fadeId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={base} stopOpacity="0" />
          <stop offset="1" stopColor={base} />
        </linearGradient>
        <filter id={soft} x="-5%" y="-20%" width="110%" height="140%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>
      <g filter={`url(#${soft})`}>
        {puffs.map((p, i) => (
          <circle key={i} cx={round(p.cx)} cy={round(p.cy)} r={round(p.r)} fill={`url(#${shade})`} />
        ))}
      </g>
      {fade && <rect x="-10" y="215" width="1460" height="86" fill={`url(#${fadeId})`} />}
    </svg>
  );
}

type StickerProps = {
  label: string;
  color: string;
  size: number;
};

/** A glossy, scalloped sticker badge with a label. */
export function StickerBadge({ label, color, size }: StickerProps) {
  const words = label.split(" ");
  const lines = words.length > 1 && label.length > 7 ? [words[0], words.slice(1).join(" ")] : [label];
  const fontSize = lines.some((l) => l.length > 9) ? 11 : lines.length > 1 ? 13 : 15;
  const id = `sticker-${label.replace(/\W/g, "")}`;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className="drop-shadow-[0_6px_10px_rgba(17,17,17,0.18)]"
      aria-hidden
    >
      <defs>
        <radialGradient id={`${id}-fill`} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.75" />
          <stop offset="0.35" stopColor={color} />
          <stop offset="1" stopColor={color} />
        </radialGradient>
        <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <path d={scallopPath(100)} fill={color} />
      <path d={scallopPath(100)} fill={`url(#${id}-fill)`} stroke={`url(#${id}-edge)`} strokeWidth="1.5" />
      <ellipse cx="36" cy="28" rx="16" ry="7" fill="#ffffff" opacity="0.35" transform="rotate(-30 36 28)" />
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={fontSize}
        fontWeight={600}
        fill="#111111"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {lines.map((line, i) => (
          <tspan key={line} x="50" dy={lines.length === 1 ? 0 : i === 0 ? -fontSize * 0.55 : fontSize * 1.1}>
            {line}
          </tspan>
        ))}
      </text>
    </svg>
  );
}

/** Outline laurel wreath used around the hero badge number. */
export function Laurel({ className = "" }: { className?: string }) {
  const leaves: { x: number; y: number; angle: number }[] = [];
  for (let i = 0; i < 7; i++) {
    const a = ((125 + i * 21) * Math.PI) / 180;
    const x = 50 + 36 * Math.cos(a);
    const y = 50 + 36 * Math.sin(a);
    const angle = (a * 180) / Math.PI + 90 + 35;
    leaves.push({ x, y, angle });
  }
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden>
      {[1, -1].map((side) => (
        <g key={side} transform={side === -1 ? "translate(100 0) scale(-1 1)" : undefined}>
          {leaves.map((l, i) => (
            <ellipse
              key={i}
              cx={round(l.x)}
              cy={round(l.y)}
              rx="7"
              ry="3"
              stroke="currentColor"
              strokeWidth="2"
              transform={`rotate(${round(l.angle)} ${round(l.x)} ${round(l.y)})`}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}
