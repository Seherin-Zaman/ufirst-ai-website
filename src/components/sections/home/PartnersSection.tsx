import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PersonCard } from "@/components/cards/PersonCard";
import type { Partner } from "@/types/content";

export function PartnersSection({ partners }: { partners: Partner[] }) {
  return (
    <Section labelledBy="partners-title">
      <SectionHeading
        id="partners-title"
        title="Meet Our Partners"
        description="The partners working with uFirst.Ai."
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {partners.map((p) => (
          <PersonCard key={p.id} person={p} compact portrait />
        ))}
      </div>
    </Section>
  );
}
