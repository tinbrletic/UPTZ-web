"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function Projects() {
  const { t } = useTranslation();
  const { locale } = useLanguage();

  const projects = [
    {
      id: "delta-one",
      name: t("projects.projectList.deltaOne"),
      path: `/${locale}/projects/delta-one`
    },
    {
      id: "malo-vitra",
      name: t("projects.projectList.maloVitra"),
      path: `/${locale}/projects/malo-vitra`
    },
    {
      id: "teredo-navalis",
      name: t("projects.projectList.teredoNavalis"),
      path: `/${locale}/projects/teredo-navalis`
    },
    {
      id: "wilson",
      name: t("projects.projectList.wilson"),
      path: `/${locale}/projects/wilson`
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10 text-center">{t("menu.projects")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(project => (
          <div key={project.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
              <p className="text-gray-600 mb-4">{t(`projects.shortDesc.${project.id}`)}</p>
              <Link
                href={project.path}
                className="inline-block mt-2 text-blue-600 hover:text-blue-800 transition-colors font-medium"
              >
                {t("projects.viewDetails")} →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
