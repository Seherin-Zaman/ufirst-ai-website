import Image from "next/image";
import { UserRound } from "lucide-react";
import { cn } from "@/lib/cn";
import { initials } from "@/lib/format";
import type { Person } from "@/types/content";

/** Photo when supplied; otherwise initials (real person) or a neutral silhouette (placeholder). */
export function PersonAvatar({ person, portrait, className }: { person: Person; portrait?: boolean; className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-forest-900",
        portrait ? "aspect-[4/5]" : "aspect-[5/4] sm:aspect-[4/5]",
        className,
      )}
    >
      {person.photo ? (
        <Image
          src={person.photo.src}
          alt={person.photo.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={person.isPlaceholder ? "Photo placeholder" : `${person.name} — photo not yet added`}
          className="absolute inset-0 grid place-items-center text-forest-300"
          style={{
            backgroundImage:
              "radial-gradient(100% 70% at 30% 0%, rgb(26 130 230 / 0.6), transparent 65%), radial-gradient(70% 60% at 100% 100%, rgb(111 208 251 / 0.14), transparent 60%)",
          }}
        >
          {person.isPlaceholder ? (
            <UserRound aria-hidden strokeWidth={1.2} className="size-20 opacity-60" />
          ) : (
            <span className="font-display text-5xl font-semibold">{initials(person.name)}</span>
          )}
        </div>
      )}
    </div>
  );
}
