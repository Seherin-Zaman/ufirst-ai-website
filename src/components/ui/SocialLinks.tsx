import { LinkedInIcon, XIcon, YouTubeIcon } from "./icons";
import type { SocialLink } from "@/types/content";

const iconFor = { LinkedIn: LinkedInIcon, X: XIcon, YouTube: YouTubeIcon } as const;

/** Only renders profiles that have a real URL, so no dead social links ship. */
export function SocialLinks({ links }: { links: SocialLink[] }) {
  const live = links.filter((l) => l.href && l.platform in iconFor);
  if (live.length === 0) return null;
  return (
    <ul className="flex items-center gap-2">
      {live.map((l) => {
        const Icon = iconFor[l.platform as keyof typeof iconFor];
        return (
          <li key={l.platform}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`uFirst.Ai on ${l.platform}`}
              className="grid size-10 place-items-center rounded-full border border-line text-fg transition-colors hover:bg-surface-strong"
            >
              <Icon className="size-4" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
