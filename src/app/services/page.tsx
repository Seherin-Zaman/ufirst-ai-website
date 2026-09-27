import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQ } from "@/components/ui/FAQ";
import { JsonLd } from "@/components/ui/JsonLd";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { ServiceMap } from "@/components/sections/home/ServiceMap";
import { CommercialModel } from "@/components/sections/home/CommercialModel";
import { PlatformArchitecture } from "@/components/sections/home/PlatformArchitecture";
import { RagSection } from "@/components/sections/home/RagSection";
import { AutomationSection } from "@/components/sections/home/AutomationSection";
import { ClientConfigSection } from "@/components/sections/home/ClientConfigSection";
import { ImplementationProcess } from "@/components/sections/home/ImplementationProcess";
import { DeploymentExamples } from "@/components/sections/home/DeploymentExamples";
import { deploymentExamples, homeFaqs } from "@/content/platform";
import { platformWideCapabilities } from "@/content/services";
import { getServiceCategories, getServices } from "@/lib/content";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Our Services — Ten Core AI Automation Services",
  description:
    "The uFirst.Ai service library: AI receptionist, RAG helpdesk, social media agent, email management, knowledge base, CRM automation, content scheduling, call summaries, document processing and website chatbot.",
  path: "/services",
});

export default async function ServicesPage() {
  const [services, categories] = await Promise.all([getServices(), getServiceCategories()]);
  return (
    <>
      <JsonLd data={faqJsonLd(homeFaqs)} />
      <PageHero
        title="Ten core services. Choose only the ones you need."
        description="Every service is built on the same reusable uFirst.Ai technology and configured around your business. Each client selects only the services they need."
        breadcrumbs={[{ label: "Our Services", href: "/services" }]}
      />

      <Section labelledBy="all-services-title">
        <SectionHeading id="all-services-title" title="The uFirst.Ai Service Library" description="Select a service to see what it does, how it works and which services it works well with." />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </Section>

      <ServiceMap services={services} categories={categories} platformWide={platformWideCapabilities} />
      <PlatformArchitecture />
      <RagSection />
      <AutomationSection />
      <ClientConfigSection />
      <ImplementationProcess />
      <DeploymentExamples examples={deploymentExamples} services={services} />
      <CommercialModel />

      <Section labelledBy="services-faq-title">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading id="services-faq-title" title="Questions, answered" />
          <FAQ items={homeFaqs} />
        </div>
      </Section>
    </>
  );
}
