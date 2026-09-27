import { Globe } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { industries } from "@/content/home";
import { homeIcons } from "./icons";

export function IndustriesMarkets() {
  return (
    <Section tone="dark" id="industries" labelledBy="industries-title" className="relative overflow-hidden py-16! md:py-20!">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(rgb(111 208 251 / 0.35) 1.2px, transparent 1.4px), radial-gradient(50% 70% at 60% 40%, rgb(26 130 230 / 0.35), transparent 70%)",
          backgroundSize: "14px 14px, auto",
          maskImage: "radial-gradient(60% 80% at 60% 45%, black, transparent 75%)",
        }}
      />
      <div className="relative grid gap-10 lg:grid-cols-[1.35fr_0.9fr] lg:items-center">
        <div>
          <SectionHeading id="industries-title" eyebrow={industries.eyebrow} title={industries.title} description={industries.description} />
          <ul className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {industries.items.map((i) => {
              const Icon = homeIcons[i.icon];
              return (
                <li key={i.label} className="flex items-center gap-3 rounded-xl border border-line bg-surface px-3 py-3 text-[0.9rem]">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gold-500/20 text-accent">
                    <Icon aria-hidden strokeWidth={1.7} className="size-[1.1rem]" />
                  </span>
                  {i.label}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-6 backdrop-blur-sm sm:p-7">
          <h3 className="flex items-center gap-3 font-display text-xl font-bold">
            <Globe aria-hidden strokeWidth={1.6} className="size-7 text-accent" />
            Our Target Markets
          </h3>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3.5">
            {industries.markets.map((m) => (
              <li key={m.label} className="flex items-center gap-3">
                <span aria-hidden className="text-2xl leading-none">
                  {m.flag}
                </span>
                {m.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
