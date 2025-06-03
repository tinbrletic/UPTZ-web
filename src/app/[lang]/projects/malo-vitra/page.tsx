"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function MaloVitra() {
  const { t } = useTranslation();
  const { locale } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-8 text-sm">
          <Link href={`/${locale}`} className="text-blue-600 hover:underline">
            {t("menu.home")}
          </Link>{" "}
          &gt;{" "}
          <Link href={`/${locale}/projects`} className="text-blue-600 hover:underline">
            {t("menu.projects")}
          </Link>{" "}
          &gt;{" "}
          <span className="text-gray-600">{t("projects.projectList.maloVitra")}</span>
        </nav>

        <h1 className="text-4xl font-bold mb-6">{t("projects.projectList.maloVitra")}</h1>

        <div className="bg-gray-200 h-64 w-full rounded-lg mb-8 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">{t("projects.overview")}</h2>
          <p className="text-lg mb-4">{t("projects.detail.maloVitra.overview")}</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">{t("projects.features")}</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>{t("projects.detail.maloVitra.features.feature1")}</li>
            <li>{t("projects.detail.maloVitra.features.feature2")}</li>
            <li>{t("projects.detail.maloVitra.features.feature3")}</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">{t("projects.technical")}</h2>
          <p className="text-lg mb-4">{t("projects.detail.maloVitra.technical")}</p>
        </section>

        <div className="flex justify-center mt-12">
          <Link
            href={`/${locale}/projects`}
            className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-700 transition-colors mr-4"
          >
            {t("common.backToProjects")}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-full hover:bg-gray-300 transition-colors"
          >
            {t("common.contactUs")}
          </Link>
        </div>
      </div>
    </div>
  );
}
