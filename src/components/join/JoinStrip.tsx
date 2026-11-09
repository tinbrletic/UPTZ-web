"use client";

// The join entry strip: pick a division, leave a name and an email, send.
// Used as the first screen of /join and as the closing section of the home page.

import { useTranslation } from "@/hooks/useTranslation";
import { CONTACT_LIMITS, CONTACT_THROTTLE_MS, classifySendError } from "@/lib/contactForm";
import {
  DEFAULT_DIVISION,
  JOIN_CHOICES,
  prepareJoinSubmission,
  toContactTemplateParams,
  type JoinFormError,
} from "@/lib/joinForm";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { forwardRef, useCallback, useId, useImperativeHandle, useRef, useState } from "react";
import { JoinIcon } from "./JoinIcon";

type Status = "idle" | "sending" | "success";

export type JoinStripHandle = {
  /** Scroll the strip into view and focus its first field (or the confirmation). */
  focus: () => void;
  /** Pre-select a division, then focus. */
  choose: (id: string) => void;
};

export const JoinStrip = forwardRef<JoinStripHandle, { className?: string }>(function JoinStrip({ className = "" }, ref) {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [website, setWebsite] = useState("");
  const [division, setDivision] = useState<string>(DEFAULT_DIVISION);
  const [noteOpen, setNoteOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorKey, setErrorKey] = useState("");
  const [sent, setSent] = useState<{ name: string; email: string; division: string } | null>(null);

  const ids = { name: useId(), email: useId(), note: useId(), error: useId(), radios: useId() };
  const stripRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);
  const doneRef = useRef<HTMLDivElement | null>(null);

  // The form and the confirmation swap with an exit animation, so the next one
  // mounts later. Focus is applied by callback refs the moment it does.
  const pendingFocus = useRef<"done" | "name" | null>(null);
  const setDoneRef = useCallback((el: HTMLDivElement | null) => {
    doneRef.current = el;
    if (el && pendingFocus.current === "done") {
      pendingFocus.current = null;
      el.focus();
    }
  }, []);
  const setNameRef = useCallback((el: HTMLInputElement | null) => {
    nameRef.current = el;
    if (el && pendingFocus.current === "name") {
      pendingFocus.current = null;
      el.focus();
    }
  }, []);

  const succeed = (value: { name: string; email: string; division: string }) => {
    pendingFocus.current = "done";
    setSent(value);
    setStatus("success");
  };

  // An error describes the last attempt; editing any field retires it.
  const edited = () => {
    if (errorKey) setErrorKey("");
  };

  const choiceTitle = (id: string) => t(`join.form.choices.${id}`);

  const focusForm = () => {
    stripRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
    if (status === "success") doneRef.current?.focus({ preventScroll: true });
    else nameRef.current?.focus({ preventScroll: true });
  };

  const chooseAndFocus = (id: string) => {
    setDivision(id);
    focusForm();
  };

  const focusInvalid = (error: JoinFormError) => {
    if (error === "division") return document.getElementById(`${ids.radios}-${DEFAULT_DIVISION}`)?.focus();
    if (error === "invalidEmail") return emailRef.current?.focus();
    if (error === "required") return (!name.trim() ? nameRef : emailRef).current?.focus();
    if (note.length > CONTACT_LIMITS.message) return noteRef.current?.focus();
    return (name.trim().length > CONTACT_LIMITS.name ? nameRef : emailRef).current?.focus();
  };

  const reset = () => {
    setName("");
    setEmail("");
    setNote("");
    setNoteOpen(false);
    setDivision(DEFAULT_DIVISION);
    setErrorKey("");
    setSent(null);
    pendingFocus.current = "name";
    setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorKey("");

    const submission = prepareJoinSubmission({ name, email, message: note, division, website });

    if (submission.status === "spam") {
      // Look successful so bots get no signal, but send nothing.
      succeed({ name: name.trim(), email: email.trim(), division });
      return;
    }
    if (submission.status === "invalid") {
      setErrorKey(`join.form.errors.${submission.error}`);
      focusInvalid(submission.error);
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    // Join requests get their own template; until it exists they go through the contact template.
    const joinTemplateId = process.env.NEXT_PUBLIC_EMAILJS_JOIN_TEMPLATE_ID;
    const templateId = joinTemplateId || process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    if (!serviceId || !publicKey || !templateId) {
      console.error(
        "EmailJS is not configured: set NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_PUBLIC_KEY and NEXT_PUBLIC_EMAILJS_JOIN_TEMPLATE_ID (or NEXT_PUBLIC_EMAILJS_TEMPLATE_ID)."
      );
      setErrorKey("join.form.errors.failed");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        serviceId,
        templateId,
        joinTemplateId ? submission.params : toContactTemplateParams(submission.params),
        { publicKey, blockHeadless: true, limitRate: { id: "join-form", throttle: CONTACT_THROTTLE_MS } }
      );
      succeed({ name: submission.params.from_name, email: submission.params.from_email, division });
    } catch (error: unknown) {
      console.error("EmailJS error details:", error);
      setErrorKey(`join.form.errors.${classifySendError(error)}`);
      setStatus("idle");
    }
  };

  const swap = {
    initial: { opacity: 0, y: 8, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -8, filter: "blur(6px)" },
    transition: { duration: reduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] as const },
  };

  const languageNote = t("join.form.language");
  const inputClass =
    "h-11 w-full rounded-xl border border-white/20 bg-white/10 px-4 sm:h-12 text-base text-white transition-colors hover:border-white/35 focus:border-blue-300 focus:bg-white/15 aria-[invalid=true]:border-red-300";
  const errorFor = (fields: JoinFormError[]) => fields.some((f) => errorKey === `join.form.errors.${f}`);

  useImperativeHandle(ref, () => ({ focus: focusForm, choose: chooseAndFocus }));

  return (
    <div
      ref={stripRef}
      className={`flex scroll-mt-28 flex-col rounded-3xl border border-white/15 bg-gray-950/80 shadow-2xl shadow-black/40 backdrop-blur-md ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" && sent ? (
          <motion.div
            key="done"
            ref={setDoneRef}
            tabIndex={-1}
            role="status"
            {...swap}
            className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-8"
          >
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-blue-600">
                <JoinIcon name="check" className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xl font-semibold text-balance">{t("join.success.title", { name: sent.name })}</p>
                <p className="mt-1 text-white/80">
                  {t("join.success.body", { email: sent.email })} {t("join.success.division", { division: choiceTitle(sent.division) })}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={reset}
              className="self-start whitespace-nowrap rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white/10 md:self-center"
            >
              {t("join.success.again")}
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" {...swap} onSubmit={handleSubmit} noValidate aria-labelledby="join-form-title">
            <h2 id="join-form-title" className="sr-only">
              {t("join.form.title")}
            </h2>

            {/* Honeypot: off-screen and hidden from screen readers, so only bots fill it in. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="join-website">Website</label>
              <input id="join-website" type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>

            <fieldset className="px-4 pt-3 sm:pt-4 md:px-6 md:pt-5" aria-describedby={errorFor(["division"]) ? ids.error : undefined}>
              <legend className="mb-1.5 float-left w-full text-sm font-medium text-white/80 sm:mb-2">{t("join.form.division")}</legend>
              <div className="clear-both flex flex-wrap gap-2">
                {JOIN_CHOICES.map((choice) => {
                  const checked = division === choice.id;
                  return (
                    <label key={choice.id} className="relative">
                      <input
                        id={`${ids.radios}-${choice.id}`}
                        type="radio"
                        name="division"
                        value={choice.id}
                        checked={checked}
                        onChange={() => { setDivision(choice.id); edited(); }}
                        className="peer sr-only"
                      />
                      <span className="flex h-10 cursor-pointer items-center gap-1.5 rounded-full border border-white/25 px-4 text-sm font-medium text-white/90 transition-colors sm:h-11 hover:bg-white/10 peer-checked:border-white peer-checked:bg-white peer-checked:hover:bg-white peer-checked:text-gray-950 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue-400">
                        {checked && <JoinIcon name="check" className="h-4 w-4 text-blue-600" />}
                        {choiceTitle(choice.id)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="grid gap-2.5 px-4 pt-2.5 sm:gap-3 sm:pt-3 md:grid-cols-[1fr_1fr_auto] md:items-end md:px-6 md:pt-4">
              <div>
                <label htmlFor={ids.name} className="mb-1 block text-sm font-medium text-white/80 sm:mb-1.5">
                  {t("join.form.name")}
                </label>
                <input
                  ref={setNameRef}
                  id={ids.name}
                  name="name"
                  autoComplete="name"
                  maxLength={CONTACT_LIMITS.name}
                  value={name}
                  onChange={(e) => { setName(e.target.value); edited(); }}
                  aria-invalid={errorFor(["required", "tooLong"]) && (!name.trim() || name.length > CONTACT_LIMITS.name) ? true : undefined}
                  aria-describedby={errorKey ? ids.error : undefined}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor={ids.email} className="mb-1 block text-sm font-medium text-white/80 sm:mb-1.5">
                  {t("join.form.email")}
                </label>
                <input
                  ref={emailRef}
                  id={ids.email}
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={CONTACT_LIMITS.email}
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); edited(); }}
                  aria-invalid={errorFor(["invalidEmail"]) || (errorFor(["required"]) && !email.trim()) || (errorFor(["tooLong"]) && email.length > CONTACT_LIMITS.email) ? true : undefined}
                  aria-describedby={errorKey ? ids.error : undefined}
                  className={inputClass}
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-blue-600 px-6 font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-wait disabled:opacity-70 md:min-w-[18rem]"
              >
                {status === "sending" ? t("join.form.sending") : t(`join.form.send.${division}`)}
                <JoinIcon name="arrowRight" />
              </button>
            </div>

            {errorKey && (
              <p id={ids.error} role="alert" className="px-4 pt-3 text-sm font-medium text-red-200 md:px-6">
                {t(errorKey)}
              </p>
            )}

            {noteOpen && (
              <div id={ids.note} className="px-4 pt-4 md:px-6">
                <label htmlFor={`${ids.note}-field`} className="mb-1 block text-sm font-medium text-white/80 sm:mb-1.5">
                  {t("join.form.noteLabel")}
                </label>
                <textarea
                  ref={noteRef}
                  id={`${ids.note}-field`}
                  name="message"
                  rows={3}
                  maxLength={CONTACT_LIMITS.message}
                  value={note}
                  onChange={(e) => { setNote(e.target.value); edited(); }}
                  placeholder={t("join.form.notePlaceholder")}
                  className="w-full resize-y rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-base text-white placeholder:text-white/55 transition-colors hover:border-white/35 focus:border-blue-300 focus:bg-white/15"
                />
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 pb-4 pt-3 text-sm md:px-6 md:pb-5">
              <button
                type="button"
                aria-expanded={noteOpen}
                aria-controls={ids.note}
                onClick={() => {
                  edited();
                  if (noteOpen) {
                    setNote("");
                    setNoteOpen(false);
                  } else {
                    setNoteOpen(true);
                    requestAnimationFrame(() => noteRef.current?.focus());
                  }
                }}
                className="inline-flex items-center gap-1.5 font-medium text-blue-200 transition-colors hover:text-white"
              >
                <JoinIcon name="plus" className={`h-4 w-4 transition-transform duration-200 ${noteOpen ? "rotate-45" : ""}`} />
                {t(noteOpen ? "join.form.removeNote" : "join.form.addNote")}
              </button>
              {languageNote && <p className="text-white/75">{languageNote}</p>}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
});
