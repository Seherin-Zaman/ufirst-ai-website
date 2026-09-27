import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/content/platform";
import type { ProcessStep } from "@/types/content";

const phases: ProcessStep["phase"][] = ["Choose services", "Configure templates", "Deploy"];

export function ImplementationProcess({ compact }: { compact?: boolean }) {
  return (
    <Section tone="dark" labelledBy="process-title">
      <SectionHeading
        id="process-title"
        title="From Business Problem to Deployed AI System"
        description="A defined implementation path keeps every engagement clear, scoped and client-specific."
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {phases.map((phase, pi) => {
          const steps = processSteps.filter((s) => s.phase === phase);
          return (
            <Reveal key={phase} delay={pi * 90}>
              <div className="h-full rounded-3xl border border-line bg-surface p-6 sm:p-7">
                <h3 className="font-display text-xl font-semibold text-gold-300">{phase}</h3>
                <ol className="relative mt-6 space-y-7">
                  <span aria-hidden className="absolute top-3 bottom-3 left-[1.15rem] w-px bg-gradient-to-b from-gold-400/60 via-white/15 to-transparent" />
                  {steps.map((s) => (
                    <li key={s.number} className="relative flex gap-4">
                      <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-gold-400/60 bg-forest-900 font-display text-sm font-medium tabular-nums text-gold-300">
                        {s.number}
                      </span>
                      <div className="pt-0.5">
                        <h4 className="font-display text-lg font-semibold leading-snug">{s.title}</h4>
                        <p className="mt-1 text-[0.95rem] text-muted">{s.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          );
        })}
      </div>
      {!compact && (
        <p className="mt-8 text-muted">Choose services → Configure templates → Deploy.</p>
      )}
    </Section>
  );
}
