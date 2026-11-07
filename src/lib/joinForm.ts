/**
 * The join form: who can be picked, validation, and what is sent to EmailJS.
 *
 * Same trust model as the contact form (see contactForm.ts): this runs in the
 * browser and filters mistakes and simple bots; the recipient and real limits
 * live in the EmailJS dashboard.
 */
import { CONTACT_LIMITS, isValidEmail, toSingleLine } from "./contactForm.ts";

/**
 * Divisions open to new members this season. To open or close one, edit this
 * list and its `join.divisions.<id>` strings in both translation files.
 * `emailLabel` is what the team sees in the email, so it stays in English.
 */
export const OPEN_DIVISIONS = [
  { id: "engineering", emailLabel: "Engineering Team" },
  { id: "development", emailLabel: "Development Team" },
  { id: "marketing", emailLabel: "Marketing and Web" },
] as const;

export const NOT_SURE = { id: "not-sure", emailLabel: "Not sure yet" } as const;

/** Every choice the form offers, in display order: open divisions, then "Not sure yet". */
export const JOIN_CHOICES: ReadonlyArray<{ id: string; emailLabel: string }> = [...OPEN_DIVISIONS, NOT_SURE];

/** Pre-selected: a valid answer for anyone who doesn't know where they'd fit yet. */
export const DEFAULT_DIVISION = NOT_SURE.id;

export type JoinFormInput = {
  name: string;
  email: string;
  /** The optional few words. */
  message: string;
  division: string;
  /** Honeypot: hidden from people, so only bots fill it in. */
  website?: string;
};

export type JoinFormError = "required" | "invalidEmail" | "tooLong" | "division";

/** Params for the dedicated EmailJS join template. */
export type JoinTemplateParams = {
  from_name: string;
  from_email: string;
  division: string;
  message: string;
  title: string;
};

export type JoinSubmission =
  | { status: "ok"; params: JoinTemplateParams }
  | { status: "spam" }
  | { status: "invalid"; error: JoinFormError };

export function prepareJoinSubmission(input: JoinFormInput): JoinSubmission {
  if ((input.website ?? "").trim() !== "") {
    return { status: "spam" };
  }

  const name = toSingleLine(input.name);
  const email = input.email.trim();
  const message = input.message.trim();

  if (!name || !email) {
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

  const choice = JOIN_CHOICES.find((c) => c.id === input.division);
  if (!choice) {
    return { status: "invalid", error: "division" };
  }

  return {
    status: "ok",
    params: {
      from_name: name,
      from_email: email,
      division: choice.emailLabel,
      message,
      title: `Join request: ${choice.emailLabel} — ${name}`,
    },
  };
}

/**
 * Until the owner creates the EmailJS join template, join requests go through
 * the contact template. It has no division field, so the division leads the
 * message and the subject still says it is a join request.
 */
export function toContactTemplateParams(params: JoinTemplateParams) {
  const lead = `Division: ${params.division}`;
  return {
    from_name: params.from_name,
    from_email: params.from_email,
    title: params.title,
    message: params.message ? `${lead}\n\n${params.message}` : lead,
  };
}
