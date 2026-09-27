"use client";

import { FormError, FormSuccess, SubmitButton } from "./FormShell";
import { Honeypot, SelectField, TextAreaField, TextField } from "./Field";
import { useFormSubmit } from "./useFormSubmit";
import { contactSchema } from "@/lib/validation";

export function ContactForm({ services }: { services: string[] }) {
  const { status, errors, message, onSubmit, reset } = useFormSubmit("/api/contact", contactSchema);

  if (status === "success") {
    return (
      <FormSuccess
        title="Thank you — your message is on its way"
        text="Our team will review your enquiry and get back to you."
        onReset={reset}
      />
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby={status === "error" ? "contact-form-error" : undefined} className="relative space-y-5">
      <div id="contact-form-error">
        {status === "error" && <FormError message={message} hasFieldErrors={Object.keys(errors).length > 0} />}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField name="name" label="Name" autoComplete="name" required error={errors.name} />
        <TextField name="company" label="Company" autoComplete="organization" error={errors.company} />
        <TextField name="email" label="Email" type="email" autoComplete="email" required error={errors.email} />
        <TextField name="phone" label="Phone" type="tel" autoComplete="tel" error={errors.phone} />
      </div>
      <SelectField name="service" label="Service" required options={services} error={errors.service} />
      <TextAreaField name="message" label="Message" required error={errors.message} hint="What repetitive work would you like to automate?" />
      <Honeypot />
      <SubmitButton status={status}>Send message</SubmitButton>
    </form>
  );
}
