"use client";

import BlobContainer from "@/components/BlobContainer";
import { useTranslation } from "@/hooks/useTranslation";
import Image from "next/image";

export default function Partners() {
  const { t } = useTranslation();

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
              src="/partners_hero_image.jpg"
              alt={`Partners - ${t("heroTitle")}`}
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
        <div className="relative z-20 container mx-auto px-4 text-center text-white" style={{ marginTop: '-20vh' }}>
          <h1 className="lg:text-5xl text-2xl font-bold">{t("partners.heroTitle")}</h1>
          <h3 className="mt-4 lg:text-xl text-base">{t("partners.heroDescription")}</h3>
        </div>
      </div>

      {/* Partner Sections */}
      <div className="relative z-10 py-20">
        <div className="container mx-auto px-4">

          {/* Diamond Partners */}
          <section className="mb-20">
            <div className="flex justify-center mb-8 items-center gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none">
                <path d="M8.09997 30.9C7.42782 31.5714 6.8946 32.3688 6.5308 33.2465C6.16699 34.1241 5.97974 35.0649 5.97974 36.015C5.97974 36.9651 6.16699 37.9058 6.5308 38.7835C6.8946 39.6612 7.42782 40.4585 8.09997 41.13L30.8699 63.8999C31.5414 64.5721 32.3388 65.1053 33.2164 65.4691C34.0941 65.8329 35.0349 66.0202 35.9849 66.0202C36.935 66.0202 37.8758 65.8329 38.7535 65.4691C39.6311 65.1053 40.4285 64.5721 41.0999 63.8999L63.8699 41.13C64.5421 40.4585 65.0753 39.6612 65.4391 38.7835C65.8029 37.9058 65.9902 36.9651 65.9902 36.015C65.9902 35.0649 65.8029 34.1241 65.4391 33.2465C65.0753 32.3688 64.5421 31.5714 63.8699 30.9L41.0999 8.13C40.4285 7.45785 39.6311 6.92463 38.7535 6.56083C37.8758 6.19702 36.935 6.00977 35.9849 6.00977C35.0349 6.00977 34.0941 6.19702 33.2164 6.56083C32.3388 6.92463 31.5414 7.45785 30.8699 8.13L8.09997 30.9Z" stroke="#1E3A8A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h2 className="text-5xl font-bold text-center text-blue-900">
                {t("partners.categories.diamond")}
              </h2>
            </div>
            <div className="flex justify-center items-center gap-8 flex-wrap">
              {/* Diamond partners get larger logos - 200px height */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Image
                  src="/partners_logos/scri.svg"
                  alt="SCRI - Studentski Centar Rijeka"
                  width={200}
                  height={120}
                  className="h-24 w-auto object-contain"
                />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Image
                  src="/partners_logos/szsur.svg"
                  alt="SZSUR - Studentski Zbor Sveučilišta u Rijeci"
                  width={200}
                  height={120}
                  className="h-24 w-auto object-contain"
                />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Image
                  src="/partners_logos/epropulsion.svg"
                  alt="ePropulsion"
                  width={200}
                  height={120}
                  className="h-24 w-auto object-contain"
                />
              </div>
            </div>
          </section>

          {/* Platinum Partners */}
          <section className="mb-20">
            <div className="flex justify-center mb-8 items-center gap-4">

              <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none">
                <path d="M36 66C52.5685 66 66 52.5685 66 36C66 19.4315 52.5685 6 36 6C19.4315 6 6 19.4315 6 36C6 52.5685 19.4315 66 36 66Z" stroke="#3B82F6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M36 39C37.6569 39 39 37.6569 39 36C39 34.3431 37.6569 33 36 33C34.3431 33 33 34.3431 33 36C33 37.6569 34.3431 39 36 39Z" stroke="#3B82F6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h2 className="text-4xl font-bold text-center">
                {t("partners.categories.platinum")}
              </h2>
            </div>
            <div className="flex justify-center items-center gap-6 flex-wrap">
              {/* Platinum partners get medium logos - 140px height */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Image
                  src="/partners_logos/kardcarbon.svg"
                  alt="KardCarbon"
                  width={140}
                  height={70}
                  className="h-16 w-auto object-contain"
                />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Image
                  src="/partners_logos/kelteks.svg"
                  alt="Kelteks"
                  width={140}
                  height={70}
                  className="h-16 w-auto object-contain"
                />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Image
                  src="/partners_logos/enia.svg"
                  alt="Enia"
                  width={140}
                  height={70}
                  className="h-16 w-auto object-contain"
                />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Image
                  src="/partners_logos/schrack.svg"
                  alt="Schrack"
                  width={140}
                  height={70}
                  className="h-16 w-auto object-contain"
                />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Image
                  src="/partners_logos/pgz.svg"
                  alt="PGZ"
                  width={140}
                  height={70}
                  className="h-16 w-auto object-contain"
                />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Image
                  src="/partners_logos/poslovni_klub.svg"
                  alt="Poslovni Klub Partneri"
                  width={140}
                  height={70}
                  className="h-16 w-auto object-contain"
                />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Image
                  src="/partners_logos/poli_mix.svg"
                  alt="Poli-mix"
                  width={140}
                  height={70}
                  className="h-16 w-auto object-contain"
                />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Image
                  src="/partners_logos/edyn.svg"
                  alt="Edyn"
                  width={140}
                  height={70}
                  className="h-16 w-auto object-contain"
                />
              </div>
            </div>
          </section>

          {/* Gold Partners */}
          <section className="mb-20">
            <div className="flex justify-center mb-8 items-center gap-4">

              <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none">
                <path d="M36 66C52.5685 66 66 52.5685 66 36C66 19.4315 52.5685 6 36 6C19.4315 6 6 19.4315 6 36C6 52.5685 19.4315 66 36 66Z" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h2 className="text-4xl font-bold text-center text-yellow-900">
                {t("partners.categories.gold")}
              </h2>
            </div>
            <div className="flex justify-center items-center gap-4 flex-wrap">
              {/* Gold partners get standard logos - 120px height */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Image
                  src="/partners_logos/loveco.svg"
                  alt="Loveco"
                  width={120}
                  height={60}
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Image
                  src="/partners_logos/pfri.svg"
                  alt="PFRI - Pomorski fakultet Rijeka"
                  width={120}
                  height={60}
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Image
                  src="/partners_logos/izit.svg"
                  alt="IZIT"
                  width={120}
                  height={60}
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Image
                  src="/partners_logos/alarm_automatika.svg"
                  alt="Alarm Automatika"
                  width={120}
                  height={60}
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Image
                  src="/partners_logos/montelektro.svg"
                  alt="Montelektro"
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Image
                  src="/partners_logos/marservis.svg"
                  alt="Marservis"
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Image
                  src="/partners_logos/aitac.svg"
                  alt="AITAC"
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Image
                  src="/partners_logos/duing.svg"
                  alt="Duing"
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Image
                  src="/partners_logos/elog.svg"
                  alt="Elog"
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Image
                  src="/partners_logos/proteam.svg"
                  alt="ProTeam"
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              </div>
            </div>
          </section>

          {/* Silver Partners */}
          <section className="mb-20">
            <div className="flex justify-center mb-8 items-center gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none">
                <path d="M30.3 6.54599C34.0651 5.81735 37.935 5.81735 41.7 6.54599" stroke="#6B7280" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M41.7 65.4541C37.935 66.1827 34.0651 66.1827 30.3 65.4541" stroke="#6B7280" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M52.8269 11.1631C56.0113 13.3208 58.7511 16.0707 60.8969 19.2631" stroke="#6B7280" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.54599 41.7C5.81735 37.935 5.81735 34.0651 6.54599 30.3" stroke="#6B7280" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M60.8371 52.8269C58.6794 56.0113 55.9295 58.7511 52.7371 60.8969" stroke="#6B7280" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M65.4541 30.3C66.1827 34.0651 66.1827 37.935 65.4541 41.7" stroke="#6B7280" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11.1631 19.173C13.3208 15.9886 16.0707 13.2489 19.2631 11.103" stroke="#6B7280" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M19.173 60.8371C15.9886 58.6794 13.2489 55.9295 11.103 52.7371" stroke="#6B7280" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h2 className="text-4xl font-bold text-center text-gray-700 ">
                {t("partners.categories.silver")}
              </h2>
            </div>
            <div className="flex justify-center items-center gap-3 flex-wrap">
              {/* Silver partners get smaller logos - 110px height */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Image
                  src="/partners_logos/kvocic.svg"
                  alt="Kvočić"
                  width={110}
                  height={55}
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Image
                  src="/partners_logos/itt_ri.svg"
                  alt="ITT Rijeka"
                  width={110}
                  height={55}
                  className="h-10 w-auto object-contain"
                />
              </div>
            </div>
          </section>

        </div>
      </div>

    </div>
  );
}
