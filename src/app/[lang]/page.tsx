"use client";

import HomeHero from "@/components/home/HomeHero";
import NjordShowcase from "@/components/home/NjordShowcase";
import { JoinStrip, type JoinStripHandle } from "@/components/join/JoinStrip";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ACHIEVEMENTS_DATA } from "./achievements/data";

const PARTNER_LOGOS = [
  { file: "aitac.svg", name: "AITAC" },
  { file: "alarm_automatika.svg", name: "Alarm Automatika" },
  { file: "duing.svg", name: "Duing" },
  { file: "edyn.svg", name: "Edyn" },
  { file: "elog.svg", name: "Elog" },
  { file: "enia.svg", name: "Enia" },
  { file: "epropulsion.svg", name: "ePropulsion" },
  { file: "itt_ri.svg", name: "ITT Rijeka" },
  { file: "izit.svg", name: "IZIT" },
  { file: "kardcarbon.svg", name: "Kard Carbon" },
  { file: "kelteks.svg", name: "Kelteks" },
  { file: "kvocic.svg", name: "Kvočić" },
  { file: "loveco.svg", name: "Loveco" },
  { file: "marservis.svg", name: "Marservis" },
  { file: "montelektro.svg", name: "Montelektro" },
  { file: "pfri.svg", name: "PFRI" },
  { file: "pgz.svg", name: "PGZ" },
  { file: "poli_mix.svg", name: "Poli Mix" },
  { file: "poslovni_klub.svg", name: "Poslovni Klub" },
  { file: "proteam.svg", name: "Proteam" },
  { file: "PROXIMA.svg", name: "Proxima" },
  { file: "schrack.svg", name: "Schrack" },
  { file: "scri.svg", name: "SCRI" },
  { file: "szsur.svg", name: "SZSUR" },
];

/** The fleet, newest first. Competitions match the contest history in ./achievements/data. Njord has no project page yet, so it links to its section here. */
const FLEET: { id: string; name: string; path?: string; anchor?: string; image: string }[] = [
  { id: "njord", name: "Njord", anchor: "#njord", image: "/home/njord.webp" },
  { id: "karolina", name: "Karolina", path: "karolina", image: "/about_landing_images/karolina.jpg" },
  { id: "vilson", name: "Vilson", path: "vilson", image: "/about_landing_images/vilson.jpg" },
  { id: "maloVitra", name: "Malo Vitra", path: "malo-vitra", image: "/about_landing_images/malo_vitra.jpg" },
  { id: "teredoNavalis", name: "Teredo Navalis", path: "teredo-navalis", image: "/about_landing_images/teredo_navalis.jpg" },
  { id: "deltaOne", name: "Delta One", path: "delta-one", image: "/delta_one/delta_one_1.jpg" },
  { id: "hydroConX", name: "HydroConX", path: "hydrocontest", image: "/hydrocontest/hydrocontest_1.jpg" },
];

const yearOf = (edition: string) => Number(edition.match(/\d{4}/)?.[0] ?? 0);
/** The edition without its year (the ledger shows the year in its own column). */
const editionOnly = (edition: string) => edition.replace(/\s*·\s*\d{4}$/, "");
const classSlug = (vesselClass: string) => (vesselClass === "AI Class" ? "aiClass" : "energyClass");

function ordinal(rank: number, locale: string) {
  if (locale === "hr") return `${rank}.`;
  const s = rank % 10 === 1 && rank % 100 !== 11 ? "st" : rank % 10 === 2 && rank % 100 !== 12 ? "nd" : rank % 10 === 3 && rank % 100 !== 13 ? "rd" : "th";
  return `${rank}${s}`;
}

export default function Home() {
  const { t } = useTranslation();
  const { locale } = useLanguage();
  const strip = useRef<JoinStripHandle>(null);

  // Podium record, newest first; the hero leads with the newest win.
  const trophies = [...ACHIEVEMENTS_DATA.trophies].sort((a, b) => yearOf(b.edition) - yearOf(a.edition) || (a.rank as number) - (b.rank as number));
  const flagship = trophies.find((tr) => tr.rank === 1) ?? trophies[0];
  const resultLine = t("home.hero.resultLine", {
    rank: ordinal(flagship.rank as number, locale),
    class: t(`home.classes.${classSlug(flagship.vesselClass)}`),
    event: flagship.event,
    year: String(yearOf(flagship.edition)),
  });

  return (
    <div className="relative">
      <HomeHero
        resultLine={resultLine}
        resultHref={`/${locale}/achievements`}
        onJoin={() => strip.current?.focus()}
        onChooseTeam={(team) => strip.current?.choose(team)}
      />

      {/* Results */}
      <section aria-labelledby="home-results-title" className="relative z-10 bg-[#f5f7f9] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <h2 id="home-results-title" className="max-w-2xl text-3xl font-bold tracking-tight text-balance md:text-4xl">
              {t("home.results.title")}
            </h2>
            <Link href={`/${locale}/achievements`} className="inline-flex items-center gap-1.5 font-semibold text-blue-700 underline decoration-blue-700/30 underline-offset-4 hover:decoration-blue-700">
              {t("home.results.all")}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
          <ol className="mt-10 divide-y divide-gray-300 border-y border-gray-300">
            {trophies.map((tr) => (
              <li key={tr.id} className="grid grid-cols-[4.5rem_1fr] items-baseline gap-x-5 gap-y-1 py-6 sm:grid-cols-[5.5rem_6rem_1fr_auto] sm:gap-x-8">
                <span className="row-span-2 text-4xl font-bold leading-none tabular-nums text-gray-900 sm:row-span-1 sm:text-5xl">
                  {ordinal(tr.rank as number, locale)}
                </span>
                <span className="hidden text-lg font-semibold tabular-nums text-gray-500 sm:block">{yearOf(tr.edition)}</span>
                <span>
                  <span className="block text-lg font-semibold text-gray-900">{tr.event}</span>
                  <span className="mt-0.5 block text-gray-600">
                    <span className="tabular-nums sm:hidden">{yearOf(tr.edition)} · </span>
                    {t(`achievements.trophies.${tr.id}.label`)} · {editionOnly(tr.edition)}
                  </span>
                </span>
                <span className="font-semibold text-gray-900 sm:text-right">{tr.vessel}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="relative z-10 bg-[#f5f7f9]">
        <NjordShowcase />
      </div>

      {/* Fleet */}
      <section aria-labelledby="home-fleet-title" className="relative z-10 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 id="home-fleet-title" className="text-3xl font-bold tracking-tight md:text-4xl">
            {t("home.fleet.title")}
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-gray-700 text-pretty">{t("home.fleet.lead")}</p>
          <ul className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {FLEET.map((v) => (
              <li key={v.id}>
                <Link href={v.anchor ?? `/${locale}/projects/${v.path}`} className="group grid grid-cols-[7.5rem_1fr] items-center gap-5 sm:grid-cols-[10rem_1fr]">
                  <span className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-200">
                    <Image src={v.image} alt="" fill sizes="(min-width: 640px) 10rem, 7.5rem" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </span>
                  <span>
                    <span className="flex items-center gap-1.5 text-xl font-semibold text-gray-900 group-hover:text-blue-700">
                      {v.name}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                    <span className="mt-1 block text-sm font-medium text-blue-700">{t(`home.fleet.items.${v.id}.raced`)}</span>
                    <span className="mt-1 block text-gray-700 text-pretty">{t(`home.fleet.items.${v.id}.line`)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Partners */}
      <section aria-labelledby="home-partners-title" className="relative z-10 bg-[#f5f7f9] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <div>
              <h2 id="home-partners-title" className="text-3xl font-bold tracking-tight md:text-4xl">
                {t("home.partners.title")}
              </h2>
              <p className="mt-3 max-w-2xl text-lg text-gray-700 text-pretty">{t("home.partners.lead")}</p>
            </div>
            <Link href={`/${locale}/partners`} className="inline-flex items-center gap-1.5 font-semibold text-blue-700 underline decoration-blue-700/30 underline-offset-4 hover:decoration-blue-700">
              {t("home.partners.all")}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
          <ul className="mt-10 grid grid-cols-3 gap-x-6 gap-y-8 sm:grid-cols-4 lg:grid-cols-6">
            {PARTNER_LOGOS.map((logo) => (
              <li key={logo.file} className="relative h-14">
                <Image src={`/partners_logos/${logo.file}`} alt={logo.name} fill sizes="10rem" className="object-contain" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Join */}
      <section id="join" aria-labelledby="home-join-title" className="relative z-10 scroll-mt-24 bg-[#222944] py-16 text-white md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 id="home-join-title" className="max-w-3xl text-3xl font-bold tracking-tight text-balance md:text-5xl">
            {t("home.join.title")}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-white/85 text-pretty">{t("home.join.lead")}</p>
          <JoinStrip ref={strip} className="mt-10" />
        </div>
      </section>
    </div>
  );
}
