"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { CONTACT_LIMITS, CONTACT_THROTTLE_MS, classifySendError } from "@/lib/contactForm";
import {
  DEFAULT_DIVISION,
  JOIN_CHOICES,
  OPEN_DIVISIONS,
  prepareJoinSubmission,
  toContactTemplateParams,
  type JoinFormError,
} from "@/lib/joinForm";
import { getTranslationObject } from "@/utils/translationHelpers";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useId, useRef, useState } from "react";
import { ACHIEVEMENTS_DATA } from "../achievements/data";

/** Photos of each division's real work. A division without one renders text-only. */
const DIVISION_PHOTOS: Partial<Record<string, string>> = {
  engineering: "/delta_one/delta_one_5.jpg",
  marketing: "/hydrocontest/hydrocontest_4.jpg",
};

/** The hero's navy, as a solid surface for the closing band. */
const NAVY = "rgb(34 41 68)";

type IconName = "check" | "arrowRight" | "arrowUp" | "arrowDown" | "plus";

function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, string> = {
    check: "M5 12.5l4.5 4.5L19 7.5",
    arrowRight: "M5 12h14M13 6l6 6-6 6",
    arrowUp: "M12 19V5M6 11l6-6 6 6",
    arrowDown: "M12 5v14M6 13l6 6 6-6",
    plus: "M12 5v14M5 12h14",
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className={className}>
      <path d={paths[name]} />
    </svg>
  );
}

function Ordinal({ rank, locale }: { rank: number; locale: string }) {
  if (locale === "hr") return <>{rank}.</>;
  const suffix = rank % 10 === 1 && rank % 100 !== 11 ? "st" : rank % 10 === 2 && rank % 100 !== 12 ? "nd" : rank % 10 === 3 && rank % 100 !== 13 ? "rd" : "th";
  return (
    <>
      {rank}
      <span className="align-top text-lg">{suffix}</span>
    </>
  );
}

type Status = "idle" | "sending" | "success";

export default function Join() {
  const { t } = useTranslation();
  const { locale } = useLanguage();
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

  const facts = [t("join.hero.factFree"), t("join.hero.factTime"), t("join.hero.factWho")];
  const languageNote = t("join.form.language");
  const faq = getTranslationObject<{ q: string; a: string }[]>(locale, "join.faq.items", []);
  const inputClass =
    "h-11 w-full rounded-xl border border-white/20 bg-white/10 px-4 sm:h-12 text-base text-white transition-colors hover:border-white/35 focus:border-blue-300 focus:bg-white/15 aria-[invalid=true]:border-red-300";
  const errorFor = (fields: JoinFormError[]) => fields.some((f) => errorKey === `join.form.errors.${f}`);

  return (
    <div className="relative">
      {/* Hero: the first screen is the form */}
      <section aria-labelledby="join-title" className="relative isolate overflow-hidden text-white">
        <Image
          src="/partners_hero_image.jpg"
          alt={t("join.hero.photoAlt")}
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[58%_38%]"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10" style={{ background: "linear-gradient(180deg, var(--uptz-overlay-top) 0%, var(--uptz-overlay-bottom) 100%)" }} />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[rgb(34_41_68/0.45)] lg:bg-transparent lg:[background:linear-gradient(90deg,rgb(34_41_68/0.9)_0%,rgb(34_41_68/0.55)_42%,rgb(34_41_68/0)_72%)]" />

        <div className="mx-auto flex min-h-[100svh] max-w-6xl flex-col px-5 pb-6 pt-[5.25rem] sm:px-8 sm:pt-28 lg:pb-8 lg:pt-32">
          <div className="flex flex-1 flex-col pb-4 pt-1 sm:pb-6 lg:pb-8 lg:pt-[9vh]">
            <h1 id="join-title" className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {t("join.hero.title")}
            </h1>
            <p className="mt-3 max-w-2xl text-base text-white/85 text-pretty sm:mt-4 sm:text-lg md:mt-5 md:text-xl">{t("join.hero.subtitle")}</p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-sm font-medium sm:mt-5 sm:gap-y-2 sm:text-base md:mt-7 md:gap-x-7 md:gap-y-3">
              {facts.map((fact) => (
                <li key={fact} className="flex items-center gap-2">
                  <Icon name="check" className="h-5 w-5 shrink-0 text-blue-300" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          {/* The entry strip */}
          <div
            ref={stripRef}
            className="flex scroll-mt-28 flex-col rounded-3xl border border-white/15 bg-gray-950/80 shadow-2xl shadow-black/40 backdrop-blur-md"
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
                      <Icon name="check" className="h-6 w-6" />
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
                            <span className="flex h-10 cursor-pointer items-center gap-1.5 rounded-full border border-white/25 px-4 text-sm font-medium text-white/90 transition-colors sm:h-11 hover:bg-white/10 peer-checked:border-white peer-checked:bg-white peer-checked:text-gray-950 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue-400">
                              {checked && <Icon name="check" className="h-4 w-4 text-blue-600" />}
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
                      <Icon name="arrowRight" />
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
                      <Icon name="plus" className={`h-4 w-4 transition-transform duration-200 ${noteOpen ? "rotate-45" : ""}`} />
                      {t(noteOpen ? "join.form.removeNote" : "join.form.addNote")}
                    </button>
                    {languageNote && <p className="text-white/75">{languageNote}</p>}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <a href="#why" className="mx-auto mt-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-white/80 transition-colors hover:text-white">
            {t("join.hero.whyJoin")}
            <Icon name="arrowDown" className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Where you'd fit */}
      <section id="why" aria-labelledby="why-title" className="relative z-10 scroll-mt-24 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 id="why-title" className="text-3xl font-bold md:text-4xl">
            {t("join.why.title")}
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-gray-600">{t("join.why.lead")}</p>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {OPEN_DIVISIONS.map((d) => {
              const title = t(`join.divisions.${d.id}.title`);
              const work = getTranslationObject<string[]>(locale, `join.divisions.${d.id}.work`, []);
              const photo = DIVISION_PHOTOS[d.id];
              return (
                <article key={d.id} className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5">
                  {photo && (
                    <div className="relative aspect-[16/9]">
                      <Image src={photo} alt={t(`join.divisions.${d.id}.photoAlt`)} fill sizes="(min-width: 1024px) 34rem, 100vw" className="object-cover" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6 md:p-8">
                    <h3 className="text-2xl font-bold">{title}</h3>
                    <p className="mt-2 text-gray-600 text-pretty">{t(`join.divisions.${d.id}.description`)}</p>
                    {work.length > 0 && (
                      <>
                        <h4 className="mt-6 text-sm font-semibold text-gray-900">{t("join.why.workLabel")}</h4>
                        <ul className="mt-3 space-y-2">
                          {work.map((item) => (
                            <li key={item} className="flex gap-2.5 text-gray-700">
                              <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                    <div className="mt-auto pt-8">
                      <button
                        type="button"
                        onClick={() => chooseAndFocus(d.id)}
                        className="inline-flex items-center gap-2 rounded-full border border-blue-600 px-5 py-2.5 font-semibold text-blue-700 transition-colors hover:bg-blue-50"
                      >
                        {t("join.why.choose", { division: title })}
                        <Icon name="arrowUp" className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-5 rounded-2xl bg-blue-50 p-6 ring-1 ring-blue-100 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <h3 className="text-xl font-bold">{t("join.divisions.not-sure.title")}</h3>
              <p className="mt-1 max-w-2xl text-gray-700 text-pretty">{t("join.divisions.not-sure.description")}</p>
            </div>
            <button
              type="button"
              onClick={() => chooseAndFocus(DEFAULT_DIVISION)}
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-blue-600 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-blue-700 md:self-center"
            >
              {t("join.why.writeAnyway")}
              <Icon name="arrowUp" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Proof */}
      <section aria-labelledby="proof-title" className="relative z-10 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
            <Image src="/hero_section_slideshow/hero-slide-3.jpg" alt={t("join.proof.photoAlt")} fill sizes="(min-width: 1024px) 36rem, 100vw" className="object-cover" />
          </div>
          <div>
            <h2 id="proof-title" className="text-3xl font-bold text-balance md:text-4xl">
              {t("join.proof.title")}
            </h2>
            <p className="mt-3 max-w-xl text-lg text-gray-600 text-pretty">{t("join.proof.lead")}</p>
            <ol className="mt-8 divide-y divide-gray-200 border-y border-gray-200">
              {ACHIEVEMENTS_DATA.trophies.map((trophy) => (
                <li key={trophy.id} className="grid grid-cols-[4.5rem_1fr] items-baseline gap-4 py-5">
                  <span className="text-4xl font-bold tabular-nums text-blue-700">
                    <Ordinal rank={trophy.rank as number} locale={locale} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold tracking-wide text-gray-900">{t(`achievements.trophies.${trophy.id}.label`)}</p>
                    <p className="mt-1 text-gray-600">
                      {trophy.event} · {trophy.edition} · {trophy.vessel}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <Link href={`/${locale}/achievements`} className="mt-6 inline-flex items-center gap-2 font-semibold text-blue-700 transition-colors hover:text-blue-800">
              {t("join.proof.all")}
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Before you write */}
      <section aria-labelledby="faq-title" className="relative z-10 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 id="faq-title" className="text-3xl font-bold md:text-4xl">
            {t("join.faq.title")}
          </h2>
          <dl className="mt-10 grid gap-x-14 gap-y-9 md:grid-cols-2">
            {faq.map((item) => (
              <div key={item.q}>
                <dt className="text-lg font-semibold text-gray-900">{item.q}</dt>
                <dd className="mt-2 max-w-prose leading-relaxed text-gray-600">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Close */}
      <section aria-labelledby="close-title" className="relative z-10 pb-20 md:pb-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col items-start gap-6 rounded-3xl px-6 py-10 text-white md:flex-row md:items-center md:justify-between md:px-12 md:py-14" style={{ background: NAVY }}>
            <h2 id="close-title" className="max-w-xl text-3xl font-bold text-balance md:text-4xl">
              {t("join.close.title")}
            </h2>
            <button
              type="button"
              onClick={focusForm}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold transition-colors hover:bg-blue-500"
            >
              {t("join.close.action")}
              <Icon name="arrowUp" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
