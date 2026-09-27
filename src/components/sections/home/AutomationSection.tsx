import { BrainCircuit, Database, GitBranch, MessageSquare, UserCheck, Zap, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { automationSteps } from "@/content/platform";
import { cn } from "@/lib/cn";

const icons: LucideIcon[] = [MessageSquare, BrainCircuit, Database, GitBranch, Zap, UserCheck];

const phaseStyle: Record<string, string> = {
  Understanding: "bg-forest-100 text-forest-800",
  Decision: "bg-gold-300/50 text-gold-700",
  Action: "bg-violet-brand/15 text-violet-brand",
};

export function AutomationSection() {
  return (
    <Section labelledBy="automation-title">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="automation-title"
            eyebrow="Automation"
            title="Automation Connects AI to Real Business Work"
            description="AI understands. Automation acts. People step in when required."
          />
          <p className="mt-6 max-w-xl text-muted">
            n8n is the automation layer at the heart of uFirst.Ai — the connective tissue between AI and operations. It
            handles workflows, triggers, actions, scheduling, notifications and integrations.
          </p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {(["Understanding", "Decision", "Action"] as const).map((p, i) => (
              <li key={p} className="flex items-center gap-3">
                <span className={cn("rounded-full px-4 py-1.5 text-sm font-medium", phaseStyle[p])}>{p}</span>
                {i < 2 && <span aria-hidden className="text-muted">→</span>}
              </li>
            ))}
          </ul>
        </div>

        <Reveal>
          <ol>
            {automationSteps.map((step, i) => {
              const Icon = icons[i];
              const last = i === automationSteps.length - 1;
              return (
                <li key={step.title} className="relative flex gap-5 pb-8 last:pb-0">
                  {!last && (
                    <div
                      aria-hidden
                      className="flow-y absolute top-14 bottom-0 left-[1.35rem] w-px bg-forest-600/25"
                      style={{ "--i": i } as React.CSSProperties}
                    />
                  )}
                  <span className="relative z-10 grid size-11 shrink-0 place-items-center rounded-2xl bg-forest-600 text-white">
                    <Icon aria-hidden strokeWidth={1.6} className="size-5" />
                  </span>
                  <div className="flex-1 rounded-2xl border border-line bg-surface p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-display text-lg font-semibold">{step.title}</h3>
                      <span className={cn("rounded-full px-3 py-1 text-xs font-medium", phaseStyle[step.phase])}>{step.phase}</span>
                    </div>
                    <p className="mt-1.5 text-[0.95rem] text-muted">{step.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </div>
    </Section>
  );
}
