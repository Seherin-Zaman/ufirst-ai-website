import type { Metadata } from "next";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { AboutIntro } from "@/components/sections/home/AboutIntro";
import { WhatWeBuild } from "@/components/sections/home/WhatWeBuild";
import { IndustriesMarkets } from "@/components/sections/home/IndustriesMarkets";
import { PartnersSection } from "@/components/sections/home/PartnersSection";
import { WhyChooseContact } from "@/components/sections/home/WhyChooseContact";
import { getPartners, getServices, getSiteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

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
      <HomeHero />
      <AboutIntro />
      <WhatWeBuild />
      <IndustriesMarkets />
      <PartnersSection partners={partners} />
      <WhyChooseContact contact={settings.contact} services={serviceOptions} />
    </>
  );
}
