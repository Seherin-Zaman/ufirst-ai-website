# Getting form submissions into your inbox

The contact and partner forms can email submissions straight to your company
address, with **Reply-To set to the person who wrote in** — so clicking
"Reply" in your inbox replies to them directly, not to the website.

This uses [Resend](https://resend.com), a transactional email service. The
free plan (100 emails/day) is enough for a contact form. No credit card is
needed to start.

## Setup (5 minutes)

1. **Sign up at resend.com** using the exact email address you want
   enquiries delivered to (for example your company address). Verify the
   account via the confirmation email Resend sends you.
2. In the Resend dashboard, go to **API Keys → Create API Key**. Copy the
   key — it's shown only once.
3. In your project folder, open (or create) **.env.local** and add:
   ```
   RESEND_API_KEY=re_your_key_here
   CONTACT_TO_EMAIL=your-company-address@example.com
   ```
   `CONTACT_TO_EMAIL` must be the same address you signed up to Resend with,
   until you complete step 4.
4. Restart the site (`npm run dev`, or redeploy) and submit the contact
   form to test it. The email should arrive within a few seconds — check
   Spam if not.

That's it — no domain, DNS, or code changes needed.

## Sending from your own domain (optional)

Until you do this, emails arrive **from** `onboarding@resend.dev` (Resend's
shared test address) but still land in your own inbox. To send from your
own address instead (for example `noreply@ufirst.ai`):

1. In Resend, go to **Domains → Add Domain** and follow the DNS records it
   gives you (added at whoever manages your domain's DNS).
2. Once verified, set in `.env.local`:
   ```
   RESEND_FROM_EMAIL=uFirst.Ai <noreply@ufirst.ai>
   ```
3. Once a domain is verified, `CONTACT_TO_EMAIL` can be any address, not
   just the one you signed up with.

## On a live deployment (Vercel, etc.)

Add the same variables (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and
`RESEND_FROM_EMAIL` if used) in your hosting provider's **Environment
Variables** settings, then redeploy.

## Using a webhook (e.g. n8n) instead

If you'd rather route submissions into n8n, Zapier, or a CRM instead of
email, leave `RESEND_API_KEY` unset and set `FORM_WEBHOOK_URL` instead (see
`.env.example`). If both are set, email takes priority.
