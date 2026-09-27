import { Eye, Target } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { about, mission, vision } from "@/content/home";
import { homeIcons } from "./icons";

export function AboutIntro() {
  return (
    <Section labelledBy="about-title" className="py-16! md:py-20!">
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.6fr] lg:items-center lg:gap-12">
        <div>
          <SectionHeading id="about-title" eyebrow={about.eyebrow} title={about.title} />
          <p className="mt-5 text-muted">{about.text}</p>
          <div className="mt-7">
            <Button href={about.cta.href} variant="gold" arrow>
              {about.cta.label}
            </Button>
          </div>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {about.pillars.map((p) => {
            const Icon = homeIcons[p.icon];
            return (
              <li key={p.title} className="rounded-2xl border border-line bg-surface p-5 shadow-[0_10px_30px_-18px_rgb(11_37_84/0.35)]">
                <Icon aria-hidden strokeWidth={1.5} className="size-10 text-accent" />
                <h3 className="mt-4 font-display text-[1.05rem] leading-snug font-bold">{p.title}</h3>
                <p className="mt-2 text-[0.93rem] text-muted">{p.text}</p>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        <div className="flex gap-5 rounded-2xl bg-gradient-to-br from-forest-800 to-forest-600 p-7 text-white sm:p-9">
          <Target aria-hidden strokeWidth={1.4} className="size-14 shrink-0 text-gold-300" />
          <div>
            <h3 className="font-display text-2xl font-bold">Our Mission</h3>
            <p className="mt-3 text-white/85">{mission}</p>
          </div>
        </div>
        <div className="flex gap-5 rounded-2xl border border-line bg-forest-100 p-7 sm:p-9">
          <Eye aria-hidden strokeWidth={1.4} className="size-14 shrink-0 text-accent" />
          <div>
            <h3 className="font-display text-2xl font-bold">Our Vision</h3>
            <p className="mt-3 text-muted">{vision}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
