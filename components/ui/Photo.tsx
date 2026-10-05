import Image from "next/image";
import { images, type Shot } from "@/lib/content";

type PhotoProps = {
  shot: Shot;
  sizes: string;
  className?: string;
  preload?: boolean;
};

/** Renders a photo slot from the image manifest, filling its positioned parent. */
export function Photo({ shot, sizes, className = "", preload }: PhotoProps) {
  const img = images[shot.image];

  if (shot.cutout) {
    return (
      <div className="absolute inset-0 bg-linear-to-b from-[#8fcaff] via-brand-light to-brand">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes={sizes}
          preload={preload}
          className={`object-contain object-bottom pt-4 ${className}`}
        />
      </div>
    );
  }

  const position = shot.position ?? "50% 50%";
  return (
    <Image
      src={img.src}
      alt={img.alt}
      fill
      sizes={sizes}
      preload={preload}
      className={`object-cover ${className}`}
      style={{ objectPosition: position, ...(shot.zoom && zoomTo(position, shot.zoom)) }}
    />
  );
}

/**
 * With object-cover, the point at `position` lands at the same percentage of the
 * frame. Scale around that point, then move it to the centre of the frame.
 */
function zoomTo(position: string, zoom: number) {
  const [x, y] = position.split(" ").map((v) => parseFloat(v));
  return {
    transformOrigin: position,
    transform: `translate(${50 - x}%, ${50 - y}%) scale(${zoom})`,
  };
}
