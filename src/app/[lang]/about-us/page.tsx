"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function AboutUs() {
  const { t } = useTranslation();
  const { locale } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10 text-center">{t("menu.aboutUs")}</h1>

      <div className="max-w-4xl mx-auto">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{t("aboutUs.mission.title")}</h2>
          <p className="text-lg mb-4">{t("aboutUs.mission.description")}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{t("aboutUs.vision.title")}</h2>
          <p className="text-lg mb-4">{t("aboutUs.vision.description")}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{t("aboutUs.history.title")}</h2>
          <p className="text-lg mb-4">{t("aboutUs.history.description")}</p>
        </section>

        <div className="text-center mt-8">
          <Link
            href={`/${locale}/projects`}
            className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-700 transition-colors"
          >
            {t("menu.projects")}
          </Link>
        </div>
      </div>
    </div>
  );
}
