import { LinkedInIcon } from "@/components/ui/icons";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { PersonAvatar } from "./PersonAvatar";
import type { Person } from "@/types/content";

/** Profile card for a person (used for partner profiles). */
export function PersonCard({ person, compact, portrait }: { person: Person; compact?: boolean; portrait?: boolean }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface">
      <PersonAvatar person={person} portrait={portrait} />
      <div className="flex flex-1 flex-col items-center p-6 text-center">
        {person.isPlaceholder && <PlaceholderTag className="mb-3 self-start" />}
        <h3 className="font-display text-xl font-semibold text-fg">{person.name}</h3>
        <p className="mt-0.5 text-[0.95rem] font-medium text-accent">{person.designation}</p>
        {!compact && (person.bio || person.expertise.length > 0) && (
          <>
            <p className="mt-3 text-[0.95rem] text-muted">{person.bio}</p>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Expertise">
              {person.expertise.map((e, i) => (
                <li key={`${e}-${i}`} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                  {e}
                </li>
              ))}
            </ul>
          </>
        )}
        {(person.linkedin || person.isPlaceholder) && (
        <div className="mt-auto pt-5">
          {person.linkedin ? (
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${person.name} on LinkedIn`}
              className="inline-grid size-9 place-items-center rounded-full border border-line text-fg transition-colors hover:bg-surface-strong"
            >
              <LinkedInIcon className="size-4" />
            </a>
          ) : (
            <span className="text-xs text-muted">LinkedIn link to be added</span>
          )}
        </div>
        )}
      </div>
    </article>
  );
}
