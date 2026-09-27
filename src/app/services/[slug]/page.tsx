import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { getRelatedServices, getServiceBySlug, getServiceCategories, getServices } from "@/lib/content";
import { buildMetadata, serviceJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seo?.title ?? service.name,
    description: service.seo?.description ?? `${service.summary} ${service.description}`.slice(0, 160),
    path: `/services/${service.slug}`,
    ogImage: service.seo?.ogImage,
    noindex: service.seo?.noindex,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const [related, categories] = await Promise.all([getRelatedServices(service), getServiceCategories()]);
  const memberOf = categories.filter((c) => service.categories.includes(c.id));

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      <PageHero
        title={service.name}
        description={service.summary}
        breadcrumbs={[
          { label: "Our Services", href: "/services" },
          { label: service.name, href: `/services/${service.slug}` },
        ]}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button href="/contact" variant="gold" size="lg" arrow>
            Book a Consultation
          </Button>
          <p className="flex items-center gap-2 text-muted">
            <span className="font-display text-xl text-gold-300 tabular-nums">Service {service.number}</span>
            <span aria-hidden>of 10</span>
          </p>
        </div>
      </PageHero>

      <Section labelledBy="overview-title">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <span className="grid size-14 place-items-center rounded-2xl bg-forest-600 text-white">
              <ServiceIcon name={service.icon} className="size-7" />
            </span>
            <h2 id="overview-title" className="mt-6 font-display text-3xl font-semibold sm:text-4xl">
              What this service does
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-muted">{service.description}</p>
            <p className="mt-6 flex flex-wrap items-center gap-2 text-[0.95rem] text-muted">
              Part of:
              {memberOf.map((c) => (
                <span key={c.id} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1 text-fg">
                  <span aria-hidden className="size-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  {c.name}
                </span>
              ))}
            </p>
          </div>

          <div className="rounded-3xl border border-line bg-surface p-7 sm:p-9">
            <h3 className="font-display text-xl font-semibold">Key capabilities</h3>
            <ul className="mt-5 space-y-3.5">
              {service.capabilities.map((c) => (
                <li key={c} className="flex gap-3">
                  <Check aria-hidden className="mt-1 size-5 shrink-0 text-forest-500" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="dark" labelledBy="how-title">
        <SectionHeading id="how-title" title="How it works" description="Every service follows the same pattern: understanding, decision, action — with a person stepping in when required." />
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {service.workflow.map((step, i) => (
            <li key={step.title} className="relative rounded-3xl border border-line bg-surface p-7">
              <span className="font-display text-sm tabular-nums text-gold-300">Step {i + 1}</span>
              <h3 className="mt-3 font-display text-2xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-muted">{step.text}</p>
              {i < service.workflow.length - 1 && (
                <ArrowRight aria-hidden className="absolute top-1/2 -right-3.5 z-10 hidden size-7 -translate-y-1/2 rounded-full bg-forest-800 p-1.5 text-gold-300 md:block" />
              )}
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="mist" labelledBy="config-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <SectionHeading
            id="config-title"
            title="Configured around your business"
            description="This service starts from a reusable template. It is then fitted to your business information, brand identity, communication style, systems and human escalation rules — so it feels specific to you while running on the same uFirst.Ai foundation."
          />
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Button href="/contact" variant="primary" arrow>
              Book a Consultation
            </Button>
            <Button href="/services" variant="secondary">
              All services
            </Button>
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section labelledBy="related-title">
          <SectionHeading id="related-title" title="Works well with" description="Services that share a category with this one and are designed to work alongside it." />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {related.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
