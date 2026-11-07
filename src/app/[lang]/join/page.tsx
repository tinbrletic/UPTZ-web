"use client";

import { JoinIcon } from "@/components/join/JoinIcon";
import { JoinStrip, type JoinStripHandle } from "@/components/join/JoinStrip";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { DEFAULT_DIVISION, OPEN_DIVISIONS } from "@/lib/joinForm";
import { getTranslationObject } from "@/utils/translationHelpers";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ACHIEVEMENTS_DATA } from "../achievements/data";

/** Photos of each division's real work. A division without one renders text-only. */
const DIVISION_PHOTOS: Partial<Record<string, string>> = {
  engineering: "/delta_one/delta_one_5.jpg",
  development: "/karolina/karolina_image2.jpg",
  marketing: "/hydrocontest/hydrocontest_4.jpg",
};

/** The hero's navy, as a solid surface for the closing band. */
const NAVY = "rgb(34 41 68)";

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

export default function Join() {
  const { t } = useTranslation();
  const { locale } = useLanguage();
  const strip = useRef<JoinStripHandle>(null);
  const focusForm = () => strip.current?.focus();
  const chooseAndFocus = (id: string) => strip.current?.choose(id);

  const facts = [t("join.hero.factFree"), t("join.hero.factTime"), t("join.hero.factWho")];
  const faq = getTranslationObject<{ q: string; a: string }[]>(locale, "join.faq.items", []);

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
                  <JoinIcon name="check" className="h-5 w-5 shrink-0 text-blue-300" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          <JoinStrip ref={strip} />

          <a href="#why" className="mx-auto mt-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-white/80 transition-colors hover:text-white">
            {t("join.hero.whyJoin")}
            <JoinIcon name="arrowDown" className="h-4 w-4" />
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

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {OPEN_DIVISIONS.map((d) => {
              const title = t(`join.divisions.${d.id}.title`);
              const work = getTranslationObject<string[]>(locale, `join.divisions.${d.id}.work`, []);
              const photo = DIVISION_PHOTOS[d.id];
              return (
                <article key={d.id} className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5">
                  {photo && (
                    <div className="relative aspect-[16/9]">
                      <Image src={photo} alt={t(`join.divisions.${d.id}.photoAlt`)} fill sizes="(min-width: 1024px) 23rem, 100vw" className="object-cover" />
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
                              <JoinIcon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
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
                        <JoinIcon name="arrowUp" className="h-4 w-4" />
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
              <JoinIcon name="arrowUp" className="h-4 w-4" />
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
              <JoinIcon name="arrowRight" className="h-4 w-4" />
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
              <JoinIcon name="arrowUp" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
