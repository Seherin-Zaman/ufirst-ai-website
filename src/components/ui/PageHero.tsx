import { Breadcrumbs } from "./Breadcrumbs";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import type { Link } from "@/types/content";

/** Header block used at the top of every inner page (the page's single H1). */
export function PageHero({
  title,
  description,
  breadcrumbs,
  children,
}: {
  title: string;
  description?: string;
  breadcrumbs: Link[];
  children?: React.ReactNode;
}) {
  return (
    <header className="tone-deepest relative overflow-hidden bg-bg text-fg">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(70% 90% at 90% 0%, rgb(26 130 230 / 0.45), transparent 60%), radial-gradient(50% 60% at 0% 100%, rgb(111 208 251 / 0.10), transparent 60%)",
        }}
      />
      <Container className="relative pt-12 pb-16 md:pt-16 md:pb-24">
        <Breadcrumbs items={breadcrumbs} />
        <SectionHeading as="h1" title={title} description={description} className="mt-10" />
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </header>
  );
}
