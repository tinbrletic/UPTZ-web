"use client";

import BlobContainer from "@/components/BlobContainer";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function OpenSource() {
  const { t } = useTranslation();
  const { locale } = useLanguage();

  const repositories = [
    {
      id: "electric-bicycle",
      title: t("openSource.projects.electricBicycle.title"),
      author: t("openSource.projects.electricBicycle.author"),
      topics: [
        t("openSource.projects.electricBicycle.topics.midDriveVsHub"),
        t("openSource.projects.electricBicycle.topics.bldcMotor"),
        t("openSource.projects.electricBicycle.topics.lithiumBattery")
      ],
      downloadUrl: "https://drive.google.com/file/d/1tFhgbGCFRLFPlKbMMS8PxoROlkYms1uh/view?usp=share_link"
    }
  ];

  return (
    <div className="relative mt-10">
      <div className="fixed inset-0 pointer-events-none z-0">
        <BlobContainer animationType="normal" />
        <BlobContainer animationType="reverse" className="opacity-50" />
        <BlobContainer animationType="slow" className="opacity-30" />
      </div>
      <div className="container mx-auto px-4 py-12 pt-20 relative z-10">
        <h1 className="text-4xl font-bold mb-10 text-center">{t("menu.openSource")}</h1>

        <div className="max-w-4xl mx-auto">
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{t("openSource.introduction.title")}</h2>
            <p className="text-lg mb-4">{t("openSource.introduction.description")}</p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{t("openSource.ourRepositories")}</h2>

            <div className="space-y-6">
              {repositories.map(project => (
                <div key={project.id} className="bg-white shadow-lg rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4 italic">{project.author}</p>

                  <div className="mb-4">
                    <h4 className="font-medium mb-2">{t("openSource.topicsCovered")}</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {project.topics.map((topic, index) => (
                        <li key={index} className="text-gray-700">{topic}</li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={project.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {t("openSource.downloadProject")}
                  </a>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{t("openSource.contribute.title")}</h2>
            <p className="text-lg mb-4">{t("openSource.contribute.description")}</p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
              <p className="font-medium">{t("openSource.contribute.getInTouch")}</p>
              <Link
                href={`/${locale}/contact`}
                className="inline-block mt-2 text-blue-600 hover:text-blue-800 transition-colors font-medium"
              >
                {t("menu.contact")} →
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
