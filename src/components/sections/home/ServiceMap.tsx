"use client";

import { useMemo, useState } from "react";
import { AudioLines, Workflow, UserRound } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import type { Service, ServiceCategory, ServiceCategoryId } from "@/types/content";

type Selection = { kind: "category"; id: ServiceCategoryId } | { kind: "service"; id: string } | null;

const platformIcons = { Automation: Workflow, "Human handoff": UserRound, Monitoring: AudioLines } as const;

/**
 * Interactive service map. Select a category to see which services belong to it,
 * or select a service to see every category it sits in. One service can belong to
 * several categories. Works with mouse hover, touch and keyboard.
 */
export function ServiceMap({
  services,
  categories,
  platformWide,
}: {
  services: Service[];
  categories: ServiceCategory[];
  platformWide: { name: string; text: string }[];
}) {
  const [selected, setSelected] = useState<Selection>(null);
  const [hovered, setHovered] = useState<Selection>(null);
  const active = hovered ?? selected;

  const catById = useMemo(() => new Map(categories.map((c) => [c.id, c])), [categories]);

  const activeServiceIds = useMemo(() => {
    if (!active) return new Set(services.map((s) => s.id));
    if (active.kind === "service") return new Set([active.id]);
    return new Set(services.filter((s) => s.categories.includes(active.id)).map((s) => s.id));
  }, [active, services]);

  const activeCategoryIds = useMemo(() => {
    if (!active) return new Set(categories.map((c) => c.id));
    if (active.kind === "category") return new Set([active.id]);
    return new Set(services.find((s) => s.id === active.id)?.categories ?? []);
  }, [active, services, categories]);

  const toggle = (next: NonNullable<Selection>) =>
    setSelected((cur) => (cur && cur.kind === next.kind && cur.id === next.id ? null : next));

  const mouseHover = (next: Selection) => (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setHovered(next);
  };

  const summary = (() => {
    if (!active) return "Select a category or a service to see how they overlap.";
    if (active.kind === "category") {
      const c = catById.get(active.id)!;
      const names = services.filter((s) => s.categories.includes(active.id)).map((s) => s.name);
      return `${c.name} includes ${names.length} services: ${names.join(", ")}.`;
    }
    const s = services.find((x) => x.id === active.id)!;
    return `${s.name} sits in ${s.categories.map((id) => catById.get(id)!.name).join(" and ")}.`;
  })();

  return (
    <Section tone="mist" labelledBy="map-title">
      <SectionHeading
        id="map-title"
        title="How the 10 Services Fit Together"
        description="The services overlap by design. They are built to work together, not sit in isolation, and one service can belong to more than one category."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.4fr] lg:gap-8">
        {/* Categories */}
        <div>
          <h3 className="mb-4 font-display text-lg font-semibold">Categories</h3>
          <ul className="space-y-2.5">
            {categories.map((c) => {
              const on = activeCategoryIds.has(c.id);
              const isSelected = selected?.kind === "category" && selected.id === c.id;
              const count = services.filter((s) => s.categories.includes(c.id)).length;
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => toggle({ kind: "category", id: c.id })}
                    onPointerEnter={mouseHover({ kind: "category", id: c.id })}
                    onPointerLeave={() => setHovered(null)}
                    className={cn(
                      "flex w-full items-center gap-4 rounded-2xl border bg-surface p-4 text-left transition-all duration-200",
                      isSelected ? "border-forest-600 ring-2 ring-forest-600/25" : "border-line",
                      !on && "opacity-40",
                    )}
                  >
                    <span aria-hidden className="size-3.5 shrink-0 rounded-full" style={{ backgroundColor: c.color }} />
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium text-fg">{c.name}</span>
                      <span className="block text-sm text-muted">{c.description}</span>
                    </span>
                    <span className="text-sm tabular-nums text-muted">{count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="mb-4 font-display text-lg font-semibold">Services</h3>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {services.map((s) => {
              const on = activeServiceIds.has(s.id);
              const isSelected = selected?.kind === "service" && selected.id === s.id;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => toggle({ kind: "service", id: s.id })}
                    onPointerEnter={mouseHover({ kind: "service", id: s.id })}
                    onPointerLeave={() => setHovered(null)}
                    className={cn(
                      "flex h-full w-full flex-col justify-between gap-3 rounded-2xl border bg-surface p-4 text-left transition-all duration-200",
                      isSelected ? "border-forest-600 ring-2 ring-forest-600/25" : "border-line",
                      !on && "opacity-35",
                    )}
                  >
                    <span className="flex gap-3">
                      <span className="font-display font-medium text-accent tabular-nums">{s.number}</span>
                      <span className="font-medium leading-snug text-fg">{s.name}</span>
                    </span>
                    <span className="flex gap-1.5" aria-hidden>
                      {s.categories.map((id) => (
                        <span key={id} className="size-2.5 rounded-full" style={{ backgroundColor: catById.get(id)!.color }} />
                      ))}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <p role="status" aria-live="polite" className="mt-6 min-h-12 rounded-2xl bg-forest-100 px-5 py-3.5 text-[0.95rem] text-forest-800">
        {summary}
      </p>

      {/* Platform-wide layer */}
      <div className="tone-dark mt-8 rounded-3xl bg-bg p-6 text-fg sm:p-8">
        <h3 className="font-display text-lg font-semibold">Platform-wide</h3>
        <p className="mt-1 text-sm text-muted">Automation, handoff and monitoring run behind every service.</p>
        <ul className="mt-5 grid gap-4 md:grid-cols-3">
          {platformWide.map((p) => {
            const Icon = platformIcons[p.name as keyof typeof platformIcons];
            return (
              <li key={p.name} className="flex gap-4 rounded-2xl border border-line bg-surface p-4">
                {Icon && <Icon aria-hidden strokeWidth={1.6} className="size-6 shrink-0 text-accent" />}
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-muted">{p.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
