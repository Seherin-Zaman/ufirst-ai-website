import { BrainCircuit, Database, Workflow } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { integrationChannels } from "@/content/platform";

const engines = [
  { title: "AI engine", text: "Agent system, prompts, tools and responses", icon: BrainCircuit },
  { title: "RAG engine", text: "Documents, embeddings and retrieval", icon: Database },
  { title: "Automation", text: "Workflows, triggers, actions and scheduling", icon: Workflow },
];

export function PlatformArchitecture() {
  return (
    <Section tone="dark" labelledBy="architecture-title">
      <SectionHeading
        id="architecture-title"
        title="Build Once. Reuse Across Services."
        description="A centralized technology foundation powers every service, so each new deployment starts from proven infrastructure rather than from scratch."
      />
      <Reveal className="mt-14">
        <div className="mx-auto max-w-5xl space-y-4">
          <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="font-display text-xl font-semibold">Core uFirst.Ai platform</h3>
              <p className="text-sm text-muted">Centralized technology foundation</p>
            </div>
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {engines.map(({ title, text, icon: Icon }) => (
                <li key={title} className="rounded-2xl border border-line bg-surface-strong p-5">
                  <Icon aria-hidden strokeWidth={1.6} className="size-6 text-accent" />
                  <h4 className="mt-4 font-display text-lg font-semibold">{title}</h4>
                  <p className="mt-1.5 text-[0.95rem] text-muted">{text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="font-display text-xl font-semibold">Integrations</h3>
              <p className="text-sm text-muted">APIs and webhooks</p>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {integrationChannels.map((c) => (
                <li key={c} className="rounded-full border border-line px-4 py-2 text-[0.93rem]">
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-forest-600 p-6 text-white sm:p-8">
            <h3 className="font-display text-xl font-semibold">Service templates</h3>
            <p className="mt-1.5 text-forest-100/85">Reusable service logic, configured for each client.</p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
