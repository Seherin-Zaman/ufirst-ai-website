import type { Metadata } from "next";
import { FAQ } from "@/components/ui/FAQ";
import { JsonLd } from "@/components/ui/JsonLd";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { AboutIntro } from "@/components/sections/home/AboutIntro";
import { WhatWeBuild } from "@/components/sections/home/WhatWeBuild";
import { IndustriesMarkets } from "@/components/sections/home/IndustriesMarkets";
import { PartnersSection } from "@/components/sections/home/PartnersSection";
import { WhyChooseContact } from "@/components/sections/home/WhyChooseContact";
import { homeFaqs } from "@/content/platform";
import { getPartners, getServices, getSiteSettings } from "@/lib/content";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  return {
    ...buildMetadata({
      title: s.seo.title ?? s.name,
      description: s.seo.description ?? s.description,
      path: "/",
    }),
    title: { absolute: s.seo.title ?? s.name },
  };
}

export default async function HomePage() {
  const [settings, services, partners] = await Promise.all([getSiteSettings(), getServices(), getPartners()]);
  const serviceOptions = [...services.map((s) => s.name), "Not sure yet / general enquiry"];

  return (
    <>
      <JsonLd data={faqJsonLd(homeFaqs)} />
      <HomeHero />
      <AboutIntro />
      <WhatWeBuild />
      <IndustriesMarkets />
      <PartnersSection partners={partners} />
      <WhyChooseContact contact={settings.contact} services={serviceOptions} />
      <Section tone="mist" labelledBy="faq-title" className="py-16! md:py-20!">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading id="faq-title" title="Questions, answered" description="A few of the things businesses ask before they get started." />
          <FAQ items={homeFaqs} />
        </div>
      </Section>
    </>
  );
}
