"use client";

import { useId, useRef, useState } from "react";
import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import type { DeploymentExample, Service } from "@/types/content";

/**
 * Tabs showing how different businesses can combine services.
 * The selections are illustrative configurations, not client case studies.
 */
export function DeploymentExamples({ examples, services }: { examples: DeploymentExample[]; services: Service[] }) {
  const [index, setIndex] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = examples[index];

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % examples.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + examples.length) % examples.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = examples.length - 1;
    else return;
    e.preventDefault();
    setIndex(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section labelledBy="examples-title">
      <SectionHeading
        id="examples-title"
        title="One Business, Multiple AI Capabilities"
        description="Not every client needs all ten services. Each deployment is shaped around the business and the channels it already uses."
      />

      <div className="mt-12">
        <div role="tablist" aria-label="Example businesses" className="flex flex-wrap gap-2">
          {examples.map((ex, i) => (
            <button
              key={ex.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`${baseId}-tab-${ex.id}`}
              aria-selected={i === index}
              aria-controls={`${baseId}-panel`}
              tabIndex={i === index ? 0 : -1}
              onClick={() => setIndex(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "rounded-full border px-5 py-2.5 text-[0.95rem] font-medium transition-colors",
                i === index ? "border-forest-600 bg-forest-600 text-white" : "border-line text-fg hover:bg-surface-strong",
              )}
            >
              {ex.name}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`${baseId}-panel`}
          aria-labelledby={`${baseId}-tab-${current.id}`}
          className="mt-6 grid gap-8 rounded-3xl border border-line bg-surface p-6 sm:p-9 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12"
        >
          <div>
            <h3 className="font-display text-3xl font-semibold">{current.name}</h3>
            <p className="mt-3 text-muted">{current.tagline}</p>
            <h4 className="mt-8 font-display text-base font-semibold">What the business needs</h4>
            <ul className="mt-3 space-y-2.5">
              {current.needs.map((n) => (
                <li key={n} className="flex gap-2.5 text-[0.97rem]">
                  <Check aria-hidden className="mt-1 size-4 shrink-0 text-forest-500" />
                  {n}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base font-semibold">Services in this illustrative configuration</h4>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {services.map((s) => {
                const on = current.serviceIds.includes(s.id);
                return (
                  <li
                    key={s.id}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl border px-4 py-3 text-[0.93rem] transition-all duration-300",
                      on ? "border-forest-600 bg-forest-600 text-white" : "border-line text-muted opacity-60",
                    )}
                  >
                    <span className="font-display tabular-nums opacity-80">{s.number}</span>
                    <span className="leading-snug">{s.name}</span>
                    <span className="sr-only">{on ? " (included)" : " (not included)"}</span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-sm text-muted">Illustrative only — every client selects the combination that fits their business.</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
