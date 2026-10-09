import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { expertiseAreas, technologyFoundation, whyChooseUs, workingPrinciples } from "@/content/platform";
import { buildMetadata } from "@/lib/seo";
import { mission, vision } from "@/content/home";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "uFirst.Ai is an AI-powered business automation platform. Learn about our reusable technology foundation, our delivery model and how we work with businesses.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Reusable AI technology. Tailored systems for individual businesses."
        description="uFirst.Ai is an AI-powered business automation platform. We build the technology once and configure it around each business we work with."
        breadcrumbs={[{ label: "About Us", href: "/about" }]}
      />

      <Section labelledBy="intro-title">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading id="intro-title" title="Company introduction" />
          <div className="space-y-5 text-lg text-muted">
            <p>
              uFirst.Ai is a centralized AI automation platform designed to help businesses automate repetitive
              communication, customer service, lead management, content, document processing and other business
              activities.
            </p>
            <p>
              The platform combines AI, RAG-based knowledge retrieval, automation, integrations and monitoring. On top of
              that foundation sit reusable service templates, which we configure for each client&apos;s brand, knowledge,
              systems and processes.
            </p>
            <p className="text-fg">Not ten unrelated applications — one platform, shaped into the right system for each business.</p>
          </div>
        </div>
      </Section>

      <Section tone="mist" labelledBy="story-title">
        <SectionHeading id="story-title" title="Our mission and vision" />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl bg-gradient-to-br from-forest-800 to-forest-600 p-7 text-white sm:p-9">
            <h3 className="font-display text-2xl font-bold">Our Mission</h3>
            <p className="mt-3 text-white/85">{mission}</p>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-7 sm:p-9">
            <h3 className="font-display text-2xl font-bold">Our Vision</h3>
            <p className="mt-3 text-muted">{vision}</p>
          </div>
        </div>
      </Section>

      <Section labelledBy="values-title">
        <SectionHeading
          id="values-title"
          title="Company values"
          description="The principles behind every system uFirst.Ai delivers."
        />
        <ul className="mt-10 grid gap-x-12 md:grid-cols-2">
          {workingPrinciples.map((v) => (
            <li key={v.title} className="border-t border-line py-6">
              <h3 className="font-display text-xl font-semibold">{v.title}</h3>
              <p className="mt-2 text-muted">{v.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="dark" labelledBy="expertise-title">
        <SectionHeading id="expertise-title" title="Our expertise" description="The reusable technology layers that make repeated, client-specific deployments possible." />
        <Reveal className="mt-12">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {expertiseAreas.map((area) => (
              <div key={area.name} className="rounded-3xl border border-line bg-surface p-6">
                <h3 className="font-display text-xl font-semibold text-gold-300">{area.name}</h3>
                <ul className="mt-4 space-y-2 text-[0.93rem] text-muted">
                  {area.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section labelledBy="tech-title">
        <SectionHeading
          id="tech-title"
          title="Technology foundation"
          description="A modern, reusable stack supports both the shared platform and each client-specific implementation."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {technologyFoundation.map((t) => (
            <li key={t.area} className="rounded-2xl border border-line bg-surface p-5">
              <p className="text-sm text-muted">{t.area}</p>
              <p className="mt-1 font-display text-lg font-semibold">{t.tech}</p>
              {t.text && <p className="mt-2 text-[0.9rem] text-muted">{t.text}</p>}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-sm text-muted">
          uFirst.Ai builds its own platform, workflows, templates and architecture on top of these technologies. It uses
          third-party platforms such as OpenAI, Supabase, n8n, PostgreSQL, pgvector, Vercel and GitHub, and does not own them.
        </p>
      </Section>

      <Section tone="mist" labelledBy="why-title">
        <SectionHeading id="why-title" title="Why choose uFirst.Ai" />
        <div className="mt-12 grid gap-x-12 md:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((w) => (
            <div key={w.title} className="border-t border-line py-7">
              <h3 className="font-display text-xl font-semibold">{w.title}</h3>
              <p className="mt-2 text-muted">{w.text}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
