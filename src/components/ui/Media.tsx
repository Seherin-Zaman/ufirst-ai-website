import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ImageAsset } from "@/types/content";

/**
 * Renders a CMS image with next/image (responsive, lazy, AVIF/WebP), or a
 * neutral placeholder when no image has been supplied yet.
 */
export function Media({
  image,
  aspect = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority,
  placeholderLabel = "Image placeholder",
  className,
}: {
  image?: ImageAsset;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  placeholderLabel?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-forest-900", aspect, className)}>
      {image ? (
        <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div
          role="img"
          aria-label={placeholderLabel}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-forest-300"
          style={{
            backgroundImage:
              "radial-gradient(120% 80% at 20% 0%, rgb(26 130 230 / 0.55), transparent 60%), radial-gradient(90% 70% at 100% 100%, rgb(111 208 251 / 0.16), transparent 55%), repeating-linear-gradient(135deg, rgb(255 255 255 / 0.035) 0 1px, transparent 1px 14px)",
          }}
        >
          <ImageIcon aria-hidden strokeWidth={1.4} className="size-8 opacity-70" />
          <span className="text-xs">{placeholderLabel}</span>
        </div>
      )}
    </div>
  );
}
