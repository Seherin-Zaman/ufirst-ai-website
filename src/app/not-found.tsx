import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="tone-deepest bg-bg py-28 text-fg md:py-40">
      <Container className="text-center">
        <p className="font-display text-7xl font-semibold text-accent">404</p>
        <h1 className="mt-6 font-display text-4xl font-semibold">This page could not be found</h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          The page may have moved or the address may be mistyped. Try one of the main sections instead.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/" variant="gold">Back to home</Button>
          <Button href="/services" variant="secondary">Explore our services</Button>
        </div>
      </Container>
    </section>
  );
}
