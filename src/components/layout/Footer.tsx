import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Logo } from "./Logo";
import { getSiteSettings } from "@/lib/content";
import { industries } from "@/content/home";

const footerServices = ["AI Automation", "AI Agents", "Custom AI Systems", "AI SaaS", "AI Strategy & Consulting"];

const linkClass = "text-muted underline-offset-4 transition-colors hover:text-fg hover:underline";

export async function Footer() {
  const settings = await getSiteSettings();
  const { contact } = settings;
  const year = new Date().getFullYear();
  const wa = contact.whatsapp && !contact.whatsapp.isPlaceholder ? contact.whatsapp : undefined;

  return (
    <footer className="tone-deepest bg-bg text-fg">
      <Container className="py-14 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_0.8fr_1.1fr_0.8fr_1.3fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-[0.95rem] text-muted">
              uFirst AI delivers intelligent AI solutions, automation and agentic AI services to help businesses grow, innovate and succeed in
              the global market.
            </p>
            {settings.social.some((s) => s.href) && (
              <div className="mt-6">
                <SocialLinks links={settings.social} />
              </div>
            )}
          </div>

          <nav aria-label="Footer: quick links">
            <h2 className="font-display text-base font-bold">Quick Links</h2>
            <ul className="mt-4 space-y-2.5 text-[0.95rem]">
              {settings.navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer: services">
            <h2 className="font-display text-base font-bold">Services</h2>
            <ul className="mt-4 space-y-2.5 text-[0.95rem]">
              {footerServices.map((s) => (
                <li key={s}>
                  <Link href="/services" className={linkClass}>
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-base font-bold">Markets</h2>
            <ul className="mt-4 space-y-2.5 text-[0.95rem] text-muted">
              {industries.markets.map((m) => (
                <li key={m.label}>{m.label}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-base font-bold">Contact</h2>
            <address className="mt-4 space-y-3 text-[0.95rem] not-italic">
              {!contact.email.isPlaceholder && (
                <a href={`mailto:${contact.email.value}`} aria-label="Email uFirst.Ai" className={`flex items-center gap-2.5 break-all ${linkClass}`}>
                  <Mail aria-hidden className="size-4 shrink-0 text-accent" />
                  {contact.email.value}
                </a>
              )}
              {wa && (
                <a
                  href={`https://wa.me/${wa.value.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact uFirst.Ai on WhatsApp"
                  className={`flex items-center gap-2.5 ${linkClass}`}
                >
                  <MessageCircle aria-hidden className="size-4 shrink-0 text-accent" />
                  {wa.value}
                </a>
              )}
              {!contact.address.isPlaceholder && <p className="text-muted">{contact.address.value}</p>}
              {!contact.phone.isPlaceholder && <p className="text-muted">{contact.phone.value}</p>}
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} uFirst Limited. All rights reserved.</p>
          <p>A Place of Excellence</p>
        </div>
      </Container>
    </footer>
  );
}
