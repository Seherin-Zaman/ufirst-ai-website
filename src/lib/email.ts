import { Resend } from "resend";

/**
 * Sends form submissions straight to a company inbox via Resend, with
 * reply-to set to the person who submitted the form — so clicking "Reply"
 * in your inbox replies to them directly, not to the website.
 *
 * Setup: create a Resend account (resend.com) using the address you want to
 * receive enquiries at, then set RESEND_API_KEY and CONTACT_TO_EMAIL in
 * .env.local. See docs/EMAIL_SETUP.md for step-by-step instructions.
 */

type ContactPayload = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
};

type PartnerPayload = {
  name: string;
  company: string;
  website?: string;
  email: string;
  phone?: string;
  partnershipType: string;
  message: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value?: string): string {
  if (!value) return "";
  return `<tr><td style="padding:4px 12px 4px 0;color:#6b7b74;white-space:nowrap;vertical-align:top;"><strong>${label}</strong></td><td style="padding:4px 0;">${escapeHtml(value)}</td></tr>`;
}

function buildHtml(title: string, rows: string, message: string): string {
  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;">
    <h2 style="color:#1F6D5C;margin:0 0 12px;">${title}</h2>
    <table style="border-collapse:collapse;margin-bottom:16px;">${rows}</table>
    <p style="color:#6b7b74;margin:0 0 4px;"><strong>Message</strong></p>
    <p style="white-space:pre-wrap;margin:0;">${escapeHtml(message)}</p>
  </div>`;
}

function getClient(): { client: Resend; to: string; from: string } | null {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return null;
  // onboarding@resend.dev works with no domain setup, sending only to the
  // address associated with the Resend account. Set RESEND_FROM_EMAIL once
  // a sending domain is verified in Resend to send from your own address.
  const from = process.env.RESEND_FROM_EMAIL || "uFirst.Ai website <onboarding@resend.dev>";
  return { client: new Resend(apiKey), to, from };
}

/** True once RESEND_API_KEY and CONTACT_TO_EMAIL are both set. */
export function isEmailConfigured(): boolean {
  return getClient() !== null;
}

export async function sendContactEmail(payload: ContactPayload): Promise<void> {
  const setup = getClient();
  if (!setup) throw new Error("Email is not configured (missing RESEND_API_KEY or CONTACT_TO_EMAIL).");
  const rows =
    row("Name", payload.name) +
    row("Company", payload.company) +
    row("Email", payload.email) +
    row("Phone", payload.phone) +
    row("Service", payload.service);
  const { error } = await setup.client.emails.send({
    from: setup.from,
    to: setup.to,
    replyTo: payload.email,
    subject: `New enquiry from ${payload.name} — ${payload.service}`,
    html: buildHtml("New website enquiry", rows, payload.message),
  });
  if (error) throw new Error(error.message);
}

export async function sendPartnerEmail(payload: PartnerPayload): Promise<void> {
  const setup = getClient();
  if (!setup) throw new Error("Email is not configured (missing RESEND_API_KEY or CONTACT_TO_EMAIL).");
  const rows =
    row("Name", payload.name) +
    row("Company", payload.company) +
    row("Website", payload.website) +
    row("Email", payload.email) +
    row("Phone", payload.phone) +
    row("Partnership type", payload.partnershipType);
  const { error } = await setup.client.emails.send({
    from: setup.from,
    to: setup.to,
    replyTo: payload.email,
    subject: `New partner enquiry from ${payload.name} (${payload.company})`,
    html: buildHtml("New partner enquiry", rows, payload.message),
  });
  if (error) throw new Error(error.message);
}
