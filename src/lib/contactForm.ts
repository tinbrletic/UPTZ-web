/**
 * Validation and spam filtering for the contact form.
 *
 * The form sends through EmailJS straight from the browser, so the EmailJS
 * keys are public and anyone can call the EmailJS API directly. Everything
 * here is therefore best-effort filtering of bots and mistakes that go
 * through our own form. The real limits (fixed recipient, escaping, quota,
 * reCAPTCHA) live in the EmailJS dashboard.
 */

export const CONTACT_LIMITS = {
  name: 100,
  email: 254, // RFC 5321 maximum address length
  message: 5000,
} as const;

/** Minimum time between two sends from the same browser (EmailJS limitRate). */
export const CONTACT_THROTTLE_MS = 10_000;

export type ContactFormInput = {
  name: string;
  email: string;
  message: string;
  /** Honeypot: hidden from people, so only bots fill it in. */
  website?: string;
};

export type ContactFormError = "required" | "invalidEmail" | "tooLong";

export type ContactTemplateParams = {
  from_name: string;
  from_email: string;
  message: string;
  title: string;
};

export type ContactSubmission =
  | { status: "ok"; params: ContactTemplateParams }
  | { status: "spam" }
  | { status: "invalid"; error: ContactFormError };

// One address only: no whitespace, display names, quotes, or list separators,
// and a top-level domain of at least two characters.
const EMAIL_PATTERN = /^[^\s@,;:<>()[\]\\"]+@[^\s@,;:<>()[\]\\"]+\.[^\s@,;:<>()[\]\\".]{2,}$/;

// The name ends up in the email subject, so keep it on a single line.
const CONTROL_CHARACTERS = /[\u0000-\u001F\u007F]+/g;

export function toSingleLine(value: string): string {
  return value.replace(CONTROL_CHARACTERS, " ").replace(/\s+/g, " ").trim();
}

/** One plain address: no display name, list separators or quotes. */
export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email);
}

export function prepareContactSubmission(input: ContactFormInput): ContactSubmission {
  if ((input.website ?? "").trim() !== "") {
    return { status: "spam" };
  }

  const name = toSingleLine(input.name);
  const email = input.email.trim();
  const message = input.message.trim();

  if (!name || !email || !message) {
    return { status: "invalid", error: "required" };
  }

  if (
    name.length > CONTACT_LIMITS.name ||
    email.length > CONTACT_LIMITS.email ||
    message.length > CONTACT_LIMITS.message
  ) {
    return { status: "invalid", error: "tooLong" };
  }

  if (!isValidEmail(email)) {
    return { status: "invalid", error: "invalidEmail" };
  }

  return {
    status: "ok",
    params: {
      from_name: name,
      from_email: email,
      message,
      title: `New Contact Form Submission from ${name}`,
    },
  };
}

export type ContactSendError = "rateLimited" | "failed";

/** Maps an EmailJS rejection to a message we can show the visitor. */
export function classifySendError(error: unknown): ContactSendError {
  if (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    (error as { status: unknown }).status === 429
  ) {
    return "rateLimited";
  }
  return "failed";
}
