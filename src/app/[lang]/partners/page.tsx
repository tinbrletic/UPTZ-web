"use client";

import { useTranslation } from "@/hooks/useTranslation";

export default function Partners() {
  const { t } = useTranslation();

  const partners = [
    {
      id: "partner1",
      name: t("partners.list.partner1.name"),
      description: t("partners.list.partner1.description"),
      website: "https://example.com/partner1"
    },
    {
      id: "partner2",
      name: t("partners.list.partner2.name"),
      description: t("partners.list.partner2.description"),
      website: "https://example.com/partner2"
    },
    {
      id: "partner3",
      name: t("partners.list.partner3.name"),
      description: t("partners.list.partner3.description"),
      website: "https://example.com/partner3"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10 text-center">{t("menu.partners")}</h1>

      <div className="max-w-4xl mx-auto">
        <p className="text-lg mb-8 text-center">{t("partners.introduction")}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {partners.map(partner => (
            <div key={partner.id} className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4">{partner.name}</h2>
              <p className="mb-4">{partner.description}</p>
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                {t("partners.visitWebsite")} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
