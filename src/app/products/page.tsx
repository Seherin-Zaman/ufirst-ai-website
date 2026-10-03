import type { Metadata } from "next";
import { BadgeCheck, Handshake, MailCheck, Search, Target, Workflow } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Our Products — AI Sales & Lead Generation Agent",
  description:
    "uFirst AI products: our flagship AI Sales & Lead Generation Agent finds, qualifies and engages the decision-makers that matter to your business.",
  path: "/products",
});

const features = [
  { icon: Search, title: "Researches prospects", text: "Builds target lists around your ideal customer: sector, company size, location and the roles that make buying decisions." },
  { icon: BadgeCheck, title: "Verified, sourced leads", text: "Every lead comes with the evidence behind it, so your team knows why a contact is worth approaching. Quality over volume." },
  { icon: Target, title: "Qualifies automatically", text: "Scores and prioritises leads against your criteria, so the best opportunities rise to the top of the list." },
  { icon: MailCheck, title: "Personalised outreach", text: "Drafts tailored first-touch messages and follow-ups in your brand voice, ready for review or automated sending." },
  { icon: Workflow, title: "Fits your workflow", text: "Pushes qualified leads and activity into your CRM and tools, instead of adding another dashboard to check." },
  { icon: Handshake, title: "Human in the loop", text: "Your team stays in control: approve messages, take over conversations and close the deal personally." },
];

const steps = [
  { title: "Define your target", text: "We agree your ideal customer profile, markets and the decision-makers you want to reach." },
  { title: "Configure the agent", text: "The agent is set up with your offer, tone of voice, qualification rules and integrations." },
  { title: "Launch and review", text: "Leads and outreach start flowing; you review results and refine targeting with us." },
  { title: "Scale what works", text: "Expand to new segments and markets once the pipeline is proven." },
];

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="AI products built to grow your business."
        description="Alongside our tailored AI services, uFirst AI builds ready-to-deploy AI products. Our flagship is the AI Sales & Lead Generation Agent."
        breadcrumbs={[{ label: "Our Products", href: "/products" }]}
      />

      <Section labelledBy="flagship-title">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-brand/15 px-3 py-1 text-sm font-semibold text-orange-brand">
              Flagship product
            </p>
            <SectionHeading id="flagship-title" title="AI Sales & Lead Generation Agent" />
            <p className="mt-5 text-justify text-lg hyphens-auto text-muted">
              An AI agent that finds, qualifies and engages the decision-makers who matter to your business. It does the
              research and first-touch outreach, so your sales team spends its time on real conversations rather than
              spreadsheets.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" variant="gold" size="lg" arrow>
                Book a Demo
              </Button>
              <Button href="/services" variant="secondary" size="lg" arrow>
                View Our Services
              </Button>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, text }) => (
              <li key={title} className="rounded-2xl border border-line bg-surface p-5 shadow-[0_10px_30px_-18px_rgb(11_37_84/0.35)]">
                <Icon aria-hidden strokeWidth={1.5} className="size-8 text-accent" />
                <h3 className="mt-3 font-display text-[1.05rem] font-bold">{title}</h3>
                <p className="mt-1.5 text-[0.93rem] text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="mist" labelledBy="how-title">
        <SectionHeading id="how-title" title="How it works" description="From first conversation to a working sales pipeline." />
        <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-line bg-surface p-6">
              <span className="font-display text-3xl font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-[0.95rem] text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="deepest" labelledBy="more-title">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <SectionHeading
            id="more-title"
            title="More AI products on the way"
            description="We are building further AI SaaS products for modern businesses. Get in touch to hear about them first or to discuss a product for your own business."
          />
          <Button href="/contact" variant="gold" size="lg" arrow>
            Get in Touch
          </Button>
        </div>
      </Section>
    </>
  );
}
