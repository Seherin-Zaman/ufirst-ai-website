import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const products = [
  { name: "Easy Migrate", url: "https://easymigrate.ai", text: "An AI-powered platform that makes migration simpler and faster." },
  { name: "DiasporaBuild", url: "https://diasporabuild.com", text: "Manage a construction project in Africa from anywhere, with verified professionals, live progress tracking and secure milestone payments." },
  { name: "Lumina Real Estate AI", url: "https://dbase.abelam.com", text: "AI-powered underwriting, asset management and portfolio analytics for real estate." },
];

export function ProductLinks() {
  return (
    <Section labelledBy="our-products-title">
      <SectionHeading id="our-products-title" title="Our products" description="Explore the AI products in the uFirst AI portfolio." />
      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {products.map((p) => (
          <li key={p.name}>
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition hover:-translate-y-1 hover:border-accent">
              <h3 className="font-display text-xl font-bold">{p.name}</h3>
              <p className="mt-2 flex-1 text-[0.95rem] text-muted">{p.text}</p>
              <span className="mt-5 inline-flex items-center gap-1 font-semibold text-accent">
                Visit site <ArrowUpRight aria-hidden className="size-4" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
