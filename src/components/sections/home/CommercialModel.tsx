import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { commercialSteps, scopingFactors } from "@/content/platform";

export function CommercialModel() {
  return (
    <Section tone="mist" labelledBy="commercial-title">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading
            id="commercial-title"
            title="One-Time Client Implementation"
            description="uFirst.Ai is not positioned as a mandatory recurring subscription. The client pays for the implementation and configuration of the system they select."
          />
          <ol className="mt-8 flex flex-wrap gap-2.5">
            {commercialSteps.map((s) => (
              <li key={s} className="rounded-full border border-line bg-surface px-4 py-2 text-[0.93rem]">
                {s}
              </li>
            ))}
          </ol>
          <p className="mt-6 text-muted">Additional work is handled separately when required.</p>
        </div>

        <Reveal>
          <div className="rounded-3xl border border-line bg-surface p-7 sm:p-9">
            <h3 className="font-display text-2xl font-semibold">Every implementation is scoped to the client</h3>
            <p className="mt-3 text-muted">
              The setup depends on the complexity of the solution required. There is no assumption that every client
              needs the same thing, or that every client needs all ten services.
            </p>
            <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {scopingFactors.map((f) => (
                <li key={f} className="flex items-center gap-3 text-[0.95rem]">
                  <span aria-hidden className="size-1.5 rounded-full bg-gold-500" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
