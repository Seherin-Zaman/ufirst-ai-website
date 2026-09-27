import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import type { Service } from "@/types/content";

/**
 * "row"  — compact, borderless list row (home service library).
 * "full" — detailed card with capabilities and CTA (services page, related services).
 */
export function ServiceCard({ service, variant = "full" }: { service: Service; variant?: "row" | "full" }) {
  const href = `/services/${service.slug}`;

  if (variant === "row") {
    return (
      <Link
        href={href}
        className="group -mx-3 grid grid-cols-[3.25rem_1fr_auto] items-start gap-x-4 border-t border-line px-3 py-6 transition-colors hover:bg-surface-strong/50"
      >
        <span className="font-display text-2xl font-medium text-accent tabular-nums">{service.number}</span>
        <span>
          <span className="block font-display text-xl font-semibold leading-snug text-fg">{service.name}</span>
          <span className="mt-1.5 block text-[0.97rem] text-muted">{service.summary}</span>
        </span>
        <ArrowRight
          aria-hidden
          className="mt-1.5 size-5 text-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent"
        />
      </Link>
    );
  }

  return (
    <article className="group relative flex h-full flex-col rounded-3xl border border-line bg-surface p-7 transition-colors hover:border-forest-500/60 sm:p-8">
      <div className="flex items-start justify-between">
        <span className="grid size-12 place-items-center rounded-2xl bg-forest-600 text-white">
          <ServiceIcon name={service.icon} className="size-6" />
        </span>
        <span className="font-display text-3xl font-medium text-accent tabular-nums">{service.number}</span>
      </div>
      <h3 className="mt-6 font-display text-2xl font-semibold leading-tight text-fg">
        <Link href={href} className="after:absolute after:inset-0 after:rounded-3xl focus-visible:after:outline-2">
          {service.name}
        </Link>
      </h3>
      <p className="mt-3 text-muted">{service.summary}</p>
      <ul className="mt-6 space-y-2.5 text-[0.95rem] text-fg">
        {service.capabilities.slice(0, 3).map((c) => (
          <li key={c} className="flex gap-2.5">
            <Check aria-hidden className="mt-1 size-4 shrink-0 text-forest-500" />
            {c}
          </li>
        ))}
      </ul>
      <span className="mt-8 inline-flex items-center gap-2 pt-1 font-medium text-accent">
        Explore service
        <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </article>
  );
}
