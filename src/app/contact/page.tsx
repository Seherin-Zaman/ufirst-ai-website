import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { ContactForm } from "@/components/forms/ContactForm";
import { getServices, getSiteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import type { ContactValue } from "@/types/content";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us — Get in Touch",
  description: "Contact uFirst AI about AI automation for your business. Send an enquiry and tell us which services you are interested in.",
  path: "/contact",
});

function ContactItem({
  icon: Icon,
  label,
  item,
  href,
  ariaLabel,
  external,
}: {
  icon: typeof Mail;
  label: string;
  item: ContactValue;
  href?: string;
  ariaLabel?: string;
  external?: boolean;
}) {
  return (
    <div className="flex gap-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-forest-600 text-white">
        <Icon aria-hidden strokeWidth={1.6} className="size-5" />
      </span>
      <div>
        <p className="text-sm text-muted">{label}</p>
        {item.isPlaceholder || !href ? (
          <p className="flex flex-wrap items-center gap-2 font-medium">
            {item.value}
            {item.isPlaceholder && <PlaceholderTag />}
          </p>
        ) : (
          <a
            href={href}
            aria-label={ariaLabel}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="font-medium underline-offset-4 hover:underline"
          >
            {item.value}
          </a>
        )}
      </div>
    </div>
  );
}

export default async function ContactPage() {
  const [settings, services] = await Promise.all([getSiteSettings(), getServices()]);
  const { contact } = settings;
  const serviceOptions = [...services.map((s) => s.name), "Not sure yet / general enquiry"];

  return (
    <>
      <PageHero
        title="Get in Touch"
        description="Tell us about the repetitive work in your business. We will help you choose the services you need."
        breadcrumbs={[{ label: "Contact Us", href: "/contact" }]}
      />

      <Section labelledBy="contact-form-title">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <SectionHeading id="contact-form-title" title="Send us a message" />
            <div className="mt-8 rounded-3xl border border-line bg-surface p-6 sm:p-9">
              <ContactForm services={serviceOptions} />
            </div>
          </div>

          <aside aria-label="Contact details" className="space-y-8 lg:pt-3">
            {!contact.address.isPlaceholder && <ContactItem icon={MapPin} label="Office address" item={contact.address} />}
            {!contact.phone.isPlaceholder && (
              <ContactItem icon={Phone} label="Phone" item={contact.phone} href={`tel:${contact.phone.value.replace(/\s/g, "")}`} />
            )}
            <ContactItem
              icon={Mail}
              label="Email"
              item={contact.email}
              href={`mailto:${contact.email.value}`}
              ariaLabel="Email uFirst.Ai"
            />
            {contact.whatsapp && (
              <ContactItem
                icon={MessageCircle}
                label="WhatsApp"
                item={contact.whatsapp}
                href={`https://wa.me/${contact.whatsapp.value.replace(/\D/g, "")}`}
                ariaLabel="Contact uFirst.Ai on WhatsApp"
                external
              />
            )}
            {settings.social.some((s) => s.href) && (
              <div>
                <p className="mb-3 text-sm text-muted">Social media</p>
                <SocialLinks links={settings.social} />
              </div>
            )}
          </aside>
        </div>
      </Section>

      {contact.mapEmbedUrl && (
        <Section tone="mist" labelledBy="map-title" className="py-16! md:py-20!">
          <h2 id="map-title" className="font-display text-2xl font-semibold">Find us</h2>
          <div className="mt-6 overflow-hidden rounded-3xl border border-line">
            <iframe
              title="Map showing the uFirst.Ai office location"
              src={contact.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[380px] w-full border-0"
            />
          </div>
        </Section>
      )}
    </>
  );
}
