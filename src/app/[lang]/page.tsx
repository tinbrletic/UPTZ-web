"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function Home() {
  const { t } = useTranslation();
  const { locale } = useLanguage();

  const featuredProjects = [
    {
      id: "delta-one",
      name: t("projects.projectList.deltaOne"),
      path: `/${locale}/projects/delta-one`
    },
    {
      id: "malo-vitra",
      name: t("projects.projectList.maloVitra"),
      path: `/${locale}/projects/malo-vitra`
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">{t("welcome")}</h1>
          <p className="text-2xl mb-6">{t("introduction")}</p>
          <p className="text-xl mb-8">{t("home.headline")}</p>
          <Link
            href={`/${locale}/projects`}
            className="bg-white text-blue-700 font-semibold py-2 px-6 rounded-full hover:bg-blue-50 transition-colors"
          >
            {t("home.callToAction")}
          </Link>
        </div>
      </div>

      {/* About Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">{t("home.aboutSection")}</h2>
          <div className="max-w-3xl mx-auto text-lg">
            <p className="mb-6">{t("home.aboutText")}</p>
            <div className="text-center mt-8">
              <Link
                href={`/${locale}/about-us`}
                className="text-blue-600 font-semibold hover:text-blue-800 transition-colors"
              >
                {t("common.readMore")} →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">{t("home.projectsSection")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuredProjects.map(project => (
              <div key={project.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                  <Link
                    href={project.path}
                    className="inline-block mt-4 text-blue-600 hover:text-blue-800 transition-colors font-medium"
                  >
                    {t("projects.viewDetails")} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href={`/${locale}/projects`}
              className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-700 transition-colors"
            >
              {t("menu.projects")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
