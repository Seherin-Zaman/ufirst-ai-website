import { Mail, MapPin, MessageCircle } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { getInTouch, whyChoose } from "@/content/home";
import type { SiteSettings } from "@/types/content";
import { homeIcons } from "./icons";

export function WhyChooseContact({ contact, services }: { contact: SiteSettings["contact"]; services: string[] }) {
  const wa = contact.whatsapp && !contact.whatsapp.isPlaceholder ? contact.whatsapp : undefined;
  const email = contact.email.isPlaceholder ? undefined : contact.email;
  return (
    <Section labelledBy="why-title" className="py-16! md:py-20!">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
        <div>
          <SectionHeading id="why-title" eyebrow={whyChoose.eyebrow} title={whyChoose.title} />
          <ul className="mt-9 grid gap-4 sm:grid-cols-2">
            {whyChoose.items.map((w) => {
              const Icon = homeIcons[w.icon];
              return (
                <li key={w.title} className="rounded-2xl border border-line bg-surface p-6">
                  <Icon aria-hidden strokeWidth={1.5} className="size-9 text-accent" />
                  <h3 className="mt-4 font-display text-lg font-bold">{w.title}</h3>
                  <p className="mt-1.5 text-[0.93rem] text-muted">{w.text}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <div id="contact" className="tone-dark scroll-mt-24 rounded-3xl bg-gradient-to-br from-forest-900 to-forest-700 p-6 text-fg sm:p-9">
          <h2 className="font-display text-3xl font-bold">{getInTouch.title}</h2>
          <p className="mt-3 text-muted">{getInTouch.text}</p>
          <ul className="mt-6 space-y-4">
            {email && (
              <li className="flex items-center gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gold-500 text-white">
                  <Mail aria-hidden className="size-[1.1rem]" />
                </span>
                <span>
                  <span className="block text-sm text-muted">Email</span>
                  <a href={`mailto:${email.value}`} aria-label="Email uFirst.Ai" className="font-medium break-all underline-offset-4 hover:underline">
                    {email.value}
                  </a>
                </span>
              </li>
            )}
            {wa && (
              <li className="flex items-center gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gold-500 text-white">
                  <MessageCircle aria-hidden className="size-[1.1rem]" />
                </span>
                <span>
                  <span className="block text-sm text-muted">WhatsApp</span>
                  <a
                    href={`https://wa.me/${wa.value.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contact uFirst.Ai on WhatsApp"
                    className="font-medium underline-offset-4 hover:underline"
                  >
                    {wa.value}
                  </a>
                </span>
              </li>
            )}
            <li className="flex items-center gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gold-500 text-white">
                <MapPin aria-hidden className="size-[1.1rem]" />
              </span>
              <span>
                <span className="block text-sm text-muted">Location</span>
                <span className="font-medium">{getInTouch.location}</span>
              </span>
            </li>
          </ul>
          <div className="mt-7 rounded-2xl bg-white p-5 text-[#0b1b3a] sm:p-6 [--bg:#ffffff] [--fg:#0b1b3a] [--muted:#4a5b78] [--line:rgb(29_95_184/0.2)] [--surface:#ffffff] [--surface-strong:#e4eefb] [--accent:#1a6fd6]">
            <ContactForm services={services} />
          </div>
        </div>
      </div>
    </Section>
  );
}
