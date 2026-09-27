import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whatWeBuild } from "@/content/home";
import { homeIcons } from "./icons";

export function WhatWeBuild() {
  return (
    <Section tone="mist" labelledBy="build-title" className="relative overflow-hidden py-16! md:py-20!">
      <div className="grid gap-10 xl:grid-cols-[1fr_300px] xl:items-center">
        <div>
          <SectionHeading id="build-title" eyebrow={whatWeBuild.eyebrow} title={whatWeBuild.title} description={whatWeBuild.description} />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {whatWeBuild.items.map((s) => {
              const Icon = homeIcons[s.icon];
              return (
                <li key={s.title} className="flex flex-col rounded-2xl border border-line bg-surface p-5 transition-shadow hover:shadow-[0_14px_34px_-18px_rgb(11_37_84/0.45)]">
                  <Icon aria-hidden strokeWidth={1.5} className="size-8 text-accent" />
                  <h3 className="mt-4 font-display text-[1.02rem] leading-snug font-bold">{s.title}</h3>
                </li>
              );
            })}
          </ul>
          <Link href="/services" className="mt-8 inline-flex items-center gap-2 font-semibold text-accent underline-offset-4 hover:underline">
            See all services in detail <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
        <div aria-hidden className="relative mx-auto hidden aspect-square w-full max-w-[300px] xl:block">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgb(26_130_230/0.35),transparent_68%)]" />
          <div className="absolute inset-[14%] rounded-full border-2 border-gold-400/50" />
          <div className="absolute inset-[26%] rounded-full border border-dashed border-gold-500/60" />
          <div className="absolute inset-[34%] grid place-items-center rounded-full bg-gradient-to-br from-forest-700 to-gold-500 font-display text-5xl font-extrabold text-white shadow-[0_0_60px_rgb(26_130_230/0.6)]">
            AI
          </div>
        </div>
      </div>
    </Section>
  );
}
