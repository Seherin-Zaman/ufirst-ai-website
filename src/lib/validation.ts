import { z } from "zod";

const phone = z
  .string()
  .trim()
  .max(30, "Phone number is too long.")
  .regex(/^[+()\d\s.-]*$/, "Use digits, spaces, + ( ) . or - only.")
  .optional()
  .or(z.literal(""));

const honeypot = z.string().optional();

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(100),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.email("Enter a valid email address.").max(160),
  phone,
  service: z.string().trim().min(1, "Choose a service or “Not sure yet”."),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters).").max(4000),
  _gotcha: honeypot,
});

export const partnerSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(100),
  company: z.string().trim().min(2, "Enter your company name.").max(120),
  website: z
    .string()
    .trim()
    .max(200)
    .refine((v) => v === "" || /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/.*)?$/i.test(v), "Enter a valid website address.")
    .optional(),
  email: z.email("Enter a valid email address.").max(160),
  phone,
  partnershipType: z.string().trim().min(1, "Choose a partnership type."),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters).").max(4000),
  _gotcha: honeypot,
});

export type ContactInput = z.infer<typeof contactSchema>;
export type PartnerInput = z.infer<typeof partnerSchema>;

/** Flattens zod issues into { fieldName: message } for inline form errors. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
