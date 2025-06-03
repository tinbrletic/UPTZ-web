"use client";

import { useTranslation } from "@/hooks/useTranslation";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10 text-center">{t("menu.contact")}</h1>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">{t("contact.getInTouch")}</h2>
          <p className="mb-4">{t("contact.reachOut")}</p>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">{t("contact.email")}:</h3>
            <a href="mailto:info@uptz.org" className="text-blue-600 hover:text-blue-800 transition-colors">
              info@uptz.org
            </a>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">{t("contact.address")}:</h3>
            <address className="not-italic">
              UPTZ<br />
              Example Street 123<br />
              10000 Zagreb<br />
              Croatia
            </address>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">{t("contact.contactForm")}</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 font-medium">
                {t("contact.form.name")}
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 font-medium">
                {t("contact.form.email")}
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block mb-2 font-medium">
                {t("contact.form.message")}
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
            >
              {t("contact.form.send")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
