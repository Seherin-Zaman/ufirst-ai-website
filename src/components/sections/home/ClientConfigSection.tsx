import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { configurationAreas } from "@/content/platform";

export function ClientConfigSection() {
  return (
    <Section tone="mist" labelledBy="config-title">
      <SectionHeading
        id="config-title"
        title="Every Client Gets a System Built Around Their Business"
        description="The reusable technology stays the same. The configuration layer around it is tailored to how your business actually operates."
      />
      <Reveal className="mt-14">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {configurationAreas.map((area) => (
            <div key={area.name} className="rounded-3xl border border-line bg-surface p-6">
              <h3 className="font-display text-xl font-semibold">{area.name}</h3>
              <ul className="mt-4 space-y-2.5">
                {area.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[0.97rem]">
                    <span aria-hidden className="size-1.5 rounded-full bg-forest-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="tone-dark flex flex-col justify-between rounded-3xl bg-bg p-6 text-fg md:col-span-2 lg:col-span-1">
            <div>
              <h3 className="font-display text-xl font-semibold">Outcome</h3>
              <p className="mt-3 text-muted">Tailored at the configuration layer, on top of reusable technology.</p>
            </div>
            <p className="mt-8 font-display text-xl leading-snug text-gold-300">
              A system that feels specific to the client while using the same uFirst.Ai foundation.
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
