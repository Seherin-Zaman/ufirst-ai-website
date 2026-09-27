import { NextResponse } from "next/server";
import type { ZodType } from "zod";
import { fieldErrors } from "@/lib/validation";
import { isEmailConfigured, sendContactEmail, sendPartnerEmail } from "@/lib/email";

/**
 * Shared POST handler for the contact and partner forms.
 *
 * Delivery, in order of preference:
 *  1. Email via Resend, if RESEND_API_KEY and CONTACT_TO_EMAIL are set
 *     (see docs/EMAIL_SETUP.md). Reply-to is set to the enquirer, so
 *     replying from your inbox goes straight to them.
 *  2. A webhook (for example n8n), if FORM_WEBHOOK_URL is set instead.
 *  3. In development with neither configured, the submission is logged.
 *     In production with neither configured, the API returns 503 so an
 *     enquiry is never silently lost.
 */
export async function handleFormPost<T extends { _gotcha?: string }>(
  request: Request,
  schema: ZodType<T>,
  kind: "contact" | "partner",
) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Please check the highlighted fields.", errors: fieldErrors(parsed.error) },
      { status: 422 },
    );
  }

  // Honeypot: bots fill hidden fields. Pretend success, deliver nothing.
  if (parsed.data._gotcha) return NextResponse.json({ ok: true });

  const { _gotcha, ...payload } = parsed.data;
  void _gotcha;

  if (isEmailConfigured()) {
    try {
      if (kind === "contact") {
        await sendContactEmail(payload as never);
      } else {
        await sendPartnerEmail(payload as never);
      }
      return NextResponse.json({ ok: true });
    } catch (error) {
      console.error(`[form:${kind}] email delivery failed`, error);
      return NextResponse.json(
        { ok: false, message: "We could not send your message. Please try again in a moment." },
        { status: 502 },
      );
    }
  }

  const webhook = process.env.FORM_WEBHOOK_URL;

  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[form:${kind}] (no FORM_WEBHOOK_URL set — logged only)`, payload);
      return NextResponse.json({ ok: true });
    }
    console.error(`[form:${kind}] FORM_WEBHOOK_URL is not configured; submission not delivered.`);
    return NextResponse.json(
      { ok: false, message: "Our form is temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, submittedAt: new Date().toISOString(), ...payload }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(`[form:${kind}] delivery failed`, error);
    return NextResponse.json(
      { ok: false, message: "We could not send your message. Please try again in a moment." },
      { status: 502 },
    );
  }
}
