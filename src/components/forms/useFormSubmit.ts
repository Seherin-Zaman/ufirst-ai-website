"use client";

import { useState } from "react";
import type { ZodType } from "zod";
import { fieldErrors } from "@/lib/validation";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Client-side form submission with validation (same zod schema the API uses),
 * inline field errors, and a success / error state.
 */
export function useFormSubmit<T>(endpoint: string, schema: ZodType<T>) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors(errs);
      setStatus("idle");
      setMessage("");
      // Move focus to the first invalid field so keyboard and screen reader users land on it.
      const first = Object.keys(errs)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus("submitting");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; errors?: Record<string, string> };
      if (res.ok && json.ok) {
        setStatus("success");
        form.reset();
        return;
      }
      if (json.errors) setErrors(json.errors);
      setMessage(json.message ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setMessage("We could not reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  const reset = () => {
    setStatus("idle");
    setErrors({});
    setMessage("");
  };

  return { status, errors, message, onSubmit, reset };
}
