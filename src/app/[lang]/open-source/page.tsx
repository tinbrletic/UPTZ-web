"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export default function OpenSource() {
  const { t } = useTranslation();
  const { locale } = useLanguage();

  const repositories = [
    {
      id: "repo1",
      name: t("openSource.repos.repo1.name"),
      description: t("openSource.repos.repo1.description"),
      github: "https://github.com/uptz/repo1"
    },
    {
      id: "repo2",
      name: t("openSource.repos.repo2.name"),
      description: t("openSource.repos.repo2.description"),
      github: "https://github.com/uptz/repo2"
    },
    {
      id: "repo3",
      name: t("openSource.repos.repo3.name"),
      description: t("openSource.repos.repo3.description"),
      github: "https://github.com/uptz/repo3"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10 text-center">{t("menu.openSource")}</h1>

      <div className="max-w-4xl mx-auto">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{t("openSource.introduction.title")}</h2>
          <p className="text-lg mb-4">{t("openSource.introduction.description")}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t("openSource.ourRepositories")}</h2>

          <div className="space-y-6">
            {repositories.map(repo => (
              <div key={repo.id} className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">{repo.name}</h3>
                <p className="mb-4">{repo.description}</p>
                <a
                  href={repo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  {t("openSource.viewOnGithub")}
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
  );
}
