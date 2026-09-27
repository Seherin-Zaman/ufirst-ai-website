import { Cog, FileStack, Library, MessageSquareText, Search, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ragConsumers, ragSteps } from "@/content/platform";

const stepIcons: LucideIcon[] = [FileStack, Cog, Library, Search, MessageSquareText];

export function RagSection() {
  return (
    <Section tone="dark" labelledBy="rag-title">
      <SectionHeading
        id="rag-title"
        eyebrow="Knowledge layer"
        title="Simple Input. Grounded Response."
        description="RAG gives the AI access to your business's own knowledge, so answers come from your information rather than guesswork."
      />

      <Reveal className="mt-14">
        <ol className="grid gap-y-0 lg:grid-cols-5 lg:gap-x-6">
          {ragSteps.map((step, i) => {
            const Icon = stepIcons[i];
            const last = i === ragSteps.length - 1;
            return (
              <li key={step.title} className="relative">
                <div className="h-full rounded-3xl border border-line bg-surface p-5">
                  <span className="grid size-11 place-items-center rounded-xl bg-forest-600 text-white">
                    <Icon aria-hidden strokeWidth={1.6} className="size-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold leading-snug">{step.title}</h3>
                  <p className="mt-1.5 text-[0.93rem] text-muted">{step.text}</p>
                </div>
                {!last && (
                  <>
                    <div aria-hidden className="flow-y mx-auto h-8 w-px bg-white/15 lg:hidden" style={{ "--i": i } as React.CSSProperties} />
                    <div
                      aria-hidden
                      className="flow-x absolute top-1/2 left-full hidden h-px w-6 bg-white/15 lg:block"
                      style={{ "--i": i } as React.CSSProperties}
                    />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </Reveal>

      <div className="mt-14 grid gap-8 rounded-3xl border border-line bg-surface p-7 sm:p-9 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <h3 className="font-display text-2xl font-semibold">Configured once, reused across services</h3>
          <p className="mt-3 text-muted">
            The same RAG infrastructure can support several services. Business documents become usable context for
            every AI system that needs them.
          </p>
        </div>
        <ul className="flex flex-wrap gap-3 lg:justify-end">
          {ragConsumers.map((c) => (
            <li key={c} className="rounded-full border border-gold-500/50 bg-gold-500/10 px-5 py-2.5 font-medium text-gold-300">
              {c}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
