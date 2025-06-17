"use client";

import BlobContainer from "@/components/BlobContainer";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import Image from "next/image";

export default function AboutUs() {
  const { t } = useTranslation();
  const { locale } = useLanguage();

  return (
    <div className="relative">
      {/* Global Blob Background - spans entire page */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <BlobContainer animationType="normal" />
        <BlobContainer animationType="reverse" className="opacity-50" />
        <BlobContainer animationType="slow" className="opacity-30" />
      </div>

      {/* Hero Section - 100vh */}
      <div className="relative h-screen flex items-center justify-center z-10">
        {/* Slideshow Background */}
        <div className="absolute inset-0">
          <div
            className={`absolute inset-0 `}
          >
            {/* Try to load image, fallback to gradient */}
            <div
              className="absolute inset-0"
            />
            <Image
              src="/aboutUs_hero_image.jpg"
              alt={`About us - ${t("heroTitle")}`}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(180deg, rgba(34, 41, 68, 0.95) 0%, rgba(97, 97, 129, 0.10) 100%)'
          }}
        />

        {/* Content */}
        <div className="relative z-20 container mx-auto px-12 text-center text-white" style={{ marginTop: 'clamp(-5rem, -20vh, -10rem)' }}>
          <h1 className="lg:text-5xl text-2xl font-bold">{t("aboutUs.heroTitle")}</h1>
          <p className="mt-4 lg:text-xl text-base">{t("aboutUs.heroDescription")}</p>
        </div>
      </div>

      {/* Team Sections */}
      <div className="relative z-10 py-20 bg-primary">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* Team Introduction */}
          <section className="mb-16 text-center">
            <h2 className="text-4xl font-bold mb-6">
              {t("aboutUs.team.title")}
            </h2>
            <p className="text-lg max-w-4xl mx-auto mb-12">
              {t("aboutUs.team.description")}
            </p>
          </section>

          {/* Divisions - Stacked Vertically */}
          <div className="space-y-16 flex flex-col items-center">

            {/* Divisions - Stacked Vertically */}
            <div className="space-y-16">

              {/* Project Managers */}
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 w-full max-w-5xl">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 mr-4 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      {t("aboutUs.team.divisions.projectManagers.title")}
                    </h3>
                    <p className="text-gray-600">
                      {t("aboutUs.team.divisions.projectManagers.description")}
                    </p>
                  </div>
                </div>
                {/* Team members for Project Managers */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                  {/* Add more project managers here */}
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden bg-gray-200">
                      <Image src="/team_pictures/LJUBO_slika_404237006e_ca4651cc03.webp" alt="Ljubomir Pozder" width={96} height={96} className="object-cover" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Ljubomir Pozder</h4>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden bg-gray-200">
                      <Image src="/team_pictures/PETAR_slika_69b8ecd704_af62a70b78.webp" alt="Petar Topljak" width={96} height={96} className="object-cover" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Petar Topljak</h4>
                  </div>
                  {/* Example team member - Replace with actual project managers */}
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden bg-gray-200">
                      {/* Uncomment and replace with actual image: */}
                      {/* <Image src="/team_pictures/MEMBER_NAME.webp" alt="Member Name" width={96} height={96} className="object-cover" /> */}
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900">Karlo Džafić</h4>
                  </div>
                </div>
              </div>

              {/* Manufacturing */}
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 w-full max-w-5xl">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 mr-4 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      {t("aboutUs.team.divisions.manufacturing.title")}
                    </h3>
                    <p className="text-gray-600">
                      {t("aboutUs.team.divisions.manufacturing.description")}
                    </p>
                  </div>
                </div>
                {/* Team members for Manufacturing */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden bg-gray-200">
                      <Image src="/team_pictures/MARTIN_slika_94e4788510_4df36bff2c.webp" alt="Martin Nikolla" width={96} height={96} className="object-cover" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Martin Nikolla</h4>
                  </div>
                  {/* Add manufacturing team members here */}
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden bg-gray-200">
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900">Domagoj Štefan</h4>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden bg-gray-200">
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900">Jakov Mozetič</h4>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden bg-gray-200">
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900">Ante Vrkić</h4>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden bg-gray-200">
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900">Hrvoje Šušak</h4>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden bg-gray-200">
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900">Marino Mikelić</h4>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden bg-gray-200">
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900">Matija Šarić</h4>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden bg-gray-200">
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900">Mario Sternak</h4>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden bg-gray-200">
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900">Aleksandar Banjanin</h4>
                  </div>
                </div>
              </div>

              {/* Electrical Team */}
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 w-full max-w-5xl">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 mr-4 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      {t("aboutUs.team.divisions.electrical.title")}
                    </h3>
                    <p className="text-gray-600">
                      {t("aboutUs.team.divisions.electrical.description")}
                    </p>
                  </div>
                </div>
                {/* Team members for Electrical Team */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden bg-gray-200">
                      <Image src="/team_pictures/DAMIR_slika_28ff1762dc_c4e6dd38f5.webp" alt="Damir" width={96} height={96} className="object-cover" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Damir Lukšić</h4>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden bg-gray-200">
                      <Image src="/team_pictures/VINKO_slika_ccc3da9af4_66144bbdf5.webp" alt="Vinko Grubišić" width={96} height={96} className="object-cover" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Vinko Grubišić</h4>
                  </div>
                  {/* Add electrical team members here */}
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden bg-gray-200">
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900">Stefano Beaković</h4>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden bg-gray-200">
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900">Martin Mozetič</h4>
                  </div>
                </div>
              </div>

              {/* Development Team
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 w-full max-w-5xl">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 mr-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      {t("aboutUs.team.divisions.development.title")}
                    </h3>
                    <p className="text-gray-600">
                      {t("aboutUs.team.divisions.development.description")}
                    </p>
                  </div>
                </div>
                Team members for Development Team
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                  Add development team members here
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden bg-gray-200">
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900">Software Developer</h4>
                    <p className="text-sm text-gray-600">Full Stack Developer</p>
                  </div>
                </div>
              </div> */}

              {/* Marketing and Web */}
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 w-full max-w-5xl">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 mr-4 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-600" width="24" height="24" viewBox="0 0 24 24" fill="currentcolor">
                      <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM4 9H14.5V12.5H4V9ZM4 14.5H14.5V18H5C4.45 18 4 17.55 4 17V14.5ZM19 18H16.5V9H20V17C20 17.55 19.55 18 19 18Z" fill="currentcolor" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      {t("aboutUs.team.divisions.marketing.title")}
                    </h3>
                    <p className="text-gray-600">
                      {t("aboutUs.team.divisions.marketing.description")}
                    </p>
                  </div>
                </div>
                {/* Team members for Marketing and Web */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                  {/* Add marketing and web team members here */}
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden bg-gray-200">
                      <Image src="/team_pictures/PIA_slika_eda8af2472_6bf32799e8.webp" alt="Damir" width={96} height={96} className="object-cover" />
                    </div>
                    <h4 className="font-semibold text-gray-900">
                      Pia Biondić
                    </h4>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden bg-gray-200">
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900">Marko Kozlov</h4>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden bg-gray-200">
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900">Krešimir Nikolić</h4>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden bg-gray-200">
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900">Tin Brletić</h4>
                  </div>
                </div>
              </div>

              {/* Volunteers
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 w-full max-w-5xl">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 mr-4 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      {t("aboutUs.team.divisions.volunteers.title")}
                    </h3>
                    <p className="text-gray-600">
                      {t("aboutUs.team.divisions.volunteers.description")}
                    </p>
                  </div>
                </div>
                Team members for Volunteers
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                  Add volunteer team members here
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden bg-gray-200">
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900">Volunteer Name</h4>
                    <p className="text-sm text-gray-600">Support Role</p>
                  </div>
                </div>
              </div>*/}
            </div>
          </div>

          {/* Call to Action */}
          <section className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold mb-4">Join Our Team</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Are you passionate about maritime engineering and innovation? We&apos;re always looking for dedicated individuals to join our various divisions.
              </p>
              <a
                href={`/${locale}/contact`}
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                {t("common.contactUs")}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
