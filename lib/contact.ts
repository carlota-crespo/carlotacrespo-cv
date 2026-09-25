import type { Locale } from "@/i18n/routing";
import { CONTACT_SOURCE } from "./constants";

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  locale: Locale;
  createdAt: string;
  source: typeof CONTACT_SOURCE;
};

export type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactInput(input: {
  name: string;
  email: string;
  message: string;
}): FieldErrors {
  const errors: FieldErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const message = input.message.trim();

  if (name.length < 2 || name.length > 100) {
    errors.name = "name";
  }
  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    errors.email = "email";
  }
  if (message.length < 10 || message.length > 2000) {
    errors.message = "message";
  }

  return errors;
}

export async function submitContactForm(payload: ContactPayload) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => ({}))) as {
    error?: string;
  };

  if (!response.ok) {
    return {
      ok: false as const,
      status: response.status,
      error: data.error ?? "send_failed",
    };
  }

  return { ok: true as const };
}

export function buildContactPayload(
  input: { name: string; email: string; message: string },
  locale: Locale,
): ContactPayload {
  return {
    name: input.name.trim(),
    email: input.email.trim(),
    message: input.message.trim(),
    locale,
    createdAt: new Date().toISOString(),
    source: CONTACT_SOURCE,
  };
}
