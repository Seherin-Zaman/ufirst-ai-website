import { Plus } from "lucide-react";
import type { FaqItem } from "@/types/content";

/** Accessible FAQ built on native <details>/<summary>: keyboard operable, no JavaScript. */
export function FAQ({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.question} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-display text-lg font-medium text-fg marker:hidden [&::-webkit-details-marker]:hidden">
            {item.question}
            <Plus
              aria-hidden
              className="size-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"
            />
          </summary>
          <p className="max-w-3xl pb-6 text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
