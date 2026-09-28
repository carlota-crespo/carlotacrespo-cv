"use client";

import { FormEvent, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  buildContactPayload,
  submitContactForm,
  validateContactInput,
} from "@/lib/contact";
import { getContactDraft, setContactDraft } from "@/lib/contactDraft";
import { track } from "@/lib/analytics";
import type { Locale } from "@/i18n/routing";

type Status = "idle" | "validating" | "submitting" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale() as Locale;
  const initial = useMemo(() => getContactDraft(), []);
  const [name, setName] = useState(initial.name);
  const [email, setEmail] = useState(initial.email);
  const [message, setMessage] = useState(initial.message);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [started, setStarted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [formError, setFormError] = useState<string | null>(null);

  function persist(next: { name?: string; email?: string; message?: string }) {
    setContactDraft(next);
  }

  function onStart() {
    if (!started) {
      setStarted(true);
      track("form_start");
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") {
      return;
    }

    setStatus("validating");
    const errors = validateContactInput({ name, email, message });
    if (Object.keys(errors).length > 0) {
      setFieldErrors({
        name: errors.name ? t("errors.name") : undefined,
        email: errors.email ? t("errors.email") : undefined,
        message: errors.message ? t("errors.message") : undefined,
      });
      setStatus("idle");
      setFormError(null);
      return;
    }

    setFieldErrors({});
    setStatus("submitting");
    setFormError(null);

    if (honeypot.trim()) {
      setStatus("error");
      setFormError(t("sendError"));
      track("form_error");
      return;
    }

    const result = await submitContactForm(
      buildContactPayload({ name, email, message }, locale),
    );

    if (result.ok) {
      setStatus("success");
      track("form_submit");
      setName("");
      setEmail("");
      setMessage("");
      setContactDraft({ name: "", email: "", message: "" });
      return;
    }

    setStatus("error");
    track("form_error");
    setFormError(result.error === "not_enabled" ? t("notEnabled") : t("sendError"));
  }

  const disabled = status === "submitting";

  return (
    <form className="relative mt-8 space-y-5" onSubmit={onSubmit} noValidate>
      <div aria-hidden="true" className="hidden">
          <input
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
      </div>
      <div>
        <label htmlFor="contact-name" className="block font-semibold">
          {t("fields.name")}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={100}
          autoComplete="name"
          value={name}
          disabled={disabled}
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
          className="mt-2 w-full min-h-11 rounded-full border border-line bg-background px-4 py-2 text-foreground"
          onFocus={onStart}
          onChange={(event) => {
            setName(event.target.value);
            persist({ name: event.target.value });
          }}
        />
        {fieldErrors.name ? (
          <p id="contact-name-error" className="mt-1 text-sm text-amber-800" role="alert">
            {fieldErrors.name}
          </p>
        ) : null}
      </div>
      <div>
        <label htmlFor="contact-email" className="block font-semibold">
          {t("fields.email")}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          value={email}
          disabled={disabled}
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
          className="mt-2 w-full min-h-11 rounded-full border border-line bg-background px-4 py-2 text-foreground"
          onFocus={onStart}
          onChange={(event) => {
            setEmail(event.target.value);
            persist({ email: event.target.value });
          }}
        />
        {fieldErrors.email ? (
          <p id="contact-email-error" className="mt-1 text-sm text-amber-800" role="alert">
            {fieldErrors.email}
          </p>
        ) : null}
      </div>
      <div>
        <label htmlFor="contact-message" className="block font-semibold">
          {t("fields.message")}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={6}
          value={message}
          disabled={disabled}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={
            fieldErrors.message ? "contact-message-error" : undefined
          }
          className="mt-2 w-full rounded-3xl border border-line bg-background px-4 py-3 text-foreground"
          onFocus={onStart}
          onChange={(event) => {
            setMessage(event.target.value);
            persist({ message: event.target.value });
          }}
        />
        {fieldErrors.message ? (
          <p
            id="contact-message-error"
            className="mt-1 text-sm text-amber-800"
            role="alert"
          >
            {fieldErrors.message}
          </p>
        ) : null}
      </div>
      <button
        type="submit"
        disabled={disabled}
        className="inline-flex min-h-12 items-center rounded-full bg-teal px-6 py-2.5 font-semibold text-white hover:bg-teal/90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? t("sending") : t("submit")}
      </button>
      <div className="sr-only" aria-live="polite">
        {status === "submitting" ? t("sending") : null}
        {status === "success" ? t("success") : null}
        {formError}
      </div>
      {status === "success" ? (
        <p className="rounded-2xl bg-teal/15 p-4" role="status">
          {t("success")}
        </p>
      ) : null}
      {formError ? (
        <p className="rounded-2xl border border-amber-300 bg-white/70 p-4 text-amber-900" role="alert">
          {formError}
        </p>
      ) : null}
    </form>
  );
}
