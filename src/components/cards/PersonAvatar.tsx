import Image from "next/image";
import { UserRound } from "lucide-react";
import { cn } from "@/lib/cn";
import { initials } from "@/lib/format";
import type { Person } from "@/types/content";

/** Circular photo when supplied; otherwise initials (real person) or a neutral silhouette (placeholder). */
export function PersonAvatar({ person, className }: { person: Person; portrait?: boolean; className?: string }) {
  return (
    <div
      className={cn(
        "relative mx-auto mt-8 aspect-square w-40 shrink-0 overflow-hidden rounded-full bg-forest-900 ring-4 ring-line sm:w-44",
        className,
      )}
    >
      {person.photo ? (
        <Image
          src={person.photo.src}
          alt={person.photo.alt}
          fill
          sizes="176px"
          className="object-cover object-[50%_30%]"
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
            <UserRound aria-hidden strokeWidth={1.2} className="size-14 opacity-60" />
          ) : (
            <span className="font-display text-4xl font-semibold">{initials(person.name)}</span>
          )}
        </div>
      )}
    </div>
  );
}
