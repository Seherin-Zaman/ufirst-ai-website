"use client";

import { FormError, FormSuccess, SubmitButton } from "./FormShell";
import { Honeypot, SelectField, TextAreaField, TextField } from "./Field";
import { useFormSubmit } from "./useFormSubmit";
import { partnerSchema } from "@/lib/validation";

export function PartnerForm({ partnershipTypes }: { partnershipTypes: string[] }) {
  const { status, errors, message, onSubmit, reset } = useFormSubmit("/api/partner", partnerSchema);

  if (status === "success") {
    return (
      <FormSuccess
        title="Thank you — we have your partnership enquiry"
        text="Our team will review your details and get in touch to talk through the next steps."
        onReset={reset}
      />
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby={status === "error" ? "partner-form-error" : undefined} className="relative space-y-5">
      <div id="partner-form-error">
        {status === "error" && <FormError message={message} hasFieldErrors={Object.keys(errors).length > 0} />}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField name="name" label="Your name" autoComplete="name" required error={errors.name} />
        <TextField name="company" label="Company" autoComplete="organization" required error={errors.company} />
        <TextField name="email" label="Email" type="email" autoComplete="email" required error={errors.email} />
        <TextField name="phone" label="Phone" type="tel" autoComplete="tel" error={errors.phone} />
      </div>
      <TextField name="website" label="Website" type="url" autoComplete="url" error={errors.website} />
      <SelectField name="partnershipType" label="Partnership type" required options={partnershipTypes} error={errors.partnershipType} />
      <TextAreaField name="message" label="Tell us about your business" required error={errors.message} hint="Who do you serve, and how do you see us working together?" />
      <Honeypot />
      <SubmitButton status={status}>Become a Partner</SubmitButton>
    </form>
  );
}
