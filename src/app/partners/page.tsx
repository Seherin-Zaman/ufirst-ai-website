import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { Button } from "@/components/ui/Button";
import { PartnerForm } from "@/components/forms/PartnerForm";
import { partnerBenefits, partnershipProcess, partnershipTypes, partnerTypeOptions, whyPartner } from "@/content/partners";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Be a Partner",
  description: "Partner with uFirst.Ai to bring reusable, tailored AI automation to your clients. Explore partnership types, benefits and how to get started.",
  path: "/partners",
});

export default function PartnersPage() {
  return (
    <>
      <PageHero
        title="Partner with uFirst.Ai"
        description="Bring reusable AI technology and tailored implementation to the businesses you work with."
        breadcrumbs={[{ label: "Be a Partner", href: "/partners" }]}
      >
        <Button href="#partner-form" variant="gold" size="lg" arrow>
          Become a Partner
        </Button>
      </PageHero>

      <Section labelledBy="why-partner-title">
        <SectionHeading id="why-partner-title" title="Why partner with us" />
        <div className="mt-12 grid gap-x-12 md:grid-cols-3">
          {whyPartner.map((w) => (
            <div key={w.title} className="border-t border-line py-7">
              <h3 className="font-display text-xl font-semibold">{w.title}</h3>
              <p className="mt-2 text-muted">{w.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="mist" labelledBy="types-title">
        <SectionHeading id="types-title" title="Partnership types" description="The partnership programme is still being defined. The entries below are placeholders." />
        <div className="mt-3"><PlaceholderTag>Draft — to be confirmed</PlaceholderTag></div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {partnershipTypes.map((t) => (
            <div key={t.title} className="rounded-3xl border border-dashed border-gold-500/70 bg-surface p-7">
              <h3 className="font-display text-xl font-semibold">{t.title}</h3>
              <p className="mt-2 text-muted">{t.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section labelledBy="benefits-title">
        <SectionHeading id="benefits-title" title="Benefits" />
        <div className="mt-3"><PlaceholderTag>Draft — to be confirmed</PlaceholderTag></div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {partnerBenefits.map((b) => (
            <li key={b.title} className="rounded-3xl border border-line bg-surface p-6">
              <h3 className="font-display text-lg font-semibold">{b.title}</h3>
              <p className="mt-2 text-[0.95rem] text-muted">{b.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="dark" labelledBy="process-partner-title">
        <SectionHeading id="process-partner-title" title="Partnership process" />
        <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {partnershipProcess.map((s, i) => (
            <li key={s.title} className="rounded-3xl border border-line bg-surface p-6">
              <span className="grid size-10 place-items-center rounded-full border border-gold-400/60 font-display text-sm tabular-nums text-gold-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-[0.95rem] text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="partner-form" labelledBy="partner-form-title">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            id="partner-form-title"
            title="Partnership enquiry"
            description="Tell us about your business and the kind of partnership you have in mind. Our team will get back to you."
          />
          <div className="rounded-3xl border border-line bg-surface p-6 sm:p-9">
            <PartnerForm partnershipTypes={partnerTypeOptions} />
          </div>
        </div>
      </Section>
    </>
  );
}
