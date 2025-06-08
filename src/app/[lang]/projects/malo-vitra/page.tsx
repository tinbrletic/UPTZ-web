"use client";

import BlobContainer from "@/components/BlobContainer";
import Gallery from "@/components/Gallery";
import { BatteryIcon, PropulsionIcon, SolarPanelIcon, SpecCardsGrid, SpeedIcon, VesselParametersIcon } from "@/components/SpecCard";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import Image from "next/image";


export default function MaloVitra() {
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
              src="/about_landing_images/malo_vitra.jpg"
              alt={`Malo Vitra - ${t("heroTitle")}`}
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
          <h1 className="lg:text-5xl text-2xl font-bold">{t("projects.projectList.maloVitra")}</h1>
        </div>
      </div>

      {/* Drive System Section - 100vh */}
      <div className="bg-primary min-h-screen flex items-center justify-center relative z-10 py-10">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-center">{t("projects.driveSystem")}</h2>
          <p className="text-lg text-center mb-12 text-gray-600 max-w-3xl mx-auto">
            {t("projects.detail.maloVitra.driveSystemDesc")}
          </p>

          {/* Technical Specifications Grid */}
          <SpecCardsGrid
            specs={[
              {
                icon: <SpeedIcon />,
                title: t("projects.detail.maloVitra.specs.maxSpeed.title"),
                value: t("projects.detail.maloVitra.specs.maxSpeed.value"),
                unit: t("projects.detail.maloVitra.specs.maxSpeed.unit"),
                description: t("projects.detail.maloVitra.specs.maxSpeed.description"),
              },
              {
                icon: <PropulsionIcon />,
                title: t("projects.detail.maloVitra.specs.solarPower.title"),
                value: t("projects.detail.maloVitra.specs.solarPower.value"),
                unit: t("projects.detail.maloVitra.specs.solarPower.unit"),
                description: t("projects.detail.maloVitra.specs.solarPower.description")
              },
              {
                icon: <BatteryIcon />,
                title: t("projects.detail.maloVitra.specs.batteryCapacity.title"),
                value: t("projects.detail.maloVitra.specs.batteryCapacity.value"),
                unit: t("projects.detail.maloVitra.specs.batteryCapacity.unit"),
                description: t("projects.detail.maloVitra.specs.batteryCapacity.description")
              },
              {
                icon: <SolarPanelIcon />,
                title: t("projects.detail.maloVitra.specs.solarPanels.title"),
                value: t("projects.detail.maloVitra.specs.solarPanels.value"),
                unit: t("projects.detail.maloVitra.specs.solarPanels.unit"),
                description: t("projects.detail.maloVitra.specs.solarPanels.description")
              },
              {
                icon: <VesselParametersIcon />,
                title: t("projects.detail.maloVitra.specs.vesselParameters.title"),
                value: t("projects.detail.maloVitra.specs.vesselParameters.value"),
                unit: t("projects.detail.maloVitra.specs.vesselParameters.unit"),
                description: t("projects.detail.maloVitra.specs.vesselParameters.description")
              }

            ]}
            columns={3}
            className="max-w-6xl mx-auto"
          />
        </div>
      </div>

      {/* Vessel Construction Section */}
      <div className="bg-primary min-h-screen flex items-center justify-center relative z-10 py-16">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold mb-16 text-center text-gray-800">
            {t("projects.detail.maloVitra.vesselConstruction.title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Cockpit Construction */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {t("projects.detail.maloVitra.vesselConstruction.cockpitConstruction.title")}
                </h3>
              </div>
              <ul className="space-y-3">
                {Array.isArray(t("projects.detail.maloVitra.vesselConstruction.cockpitConstruction.points")) &&
                  t("projects.detail.maloVitra.vesselConstruction.cockpitConstruction.points").map((point: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 leading-relaxed">{point}</span>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Motor Support */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {t("projects.detail.maloVitra.vesselConstruction.motorSupport.title")}
                </h3>
              </div>
              <ul className="space-y-3">
                {Array.isArray(t("projects.detail.maloVitra.vesselConstruction.motorSupport.points")) &&
                  t("projects.detail.maloVitra.vesselConstruction.motorSupport.points").map((point: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 leading-relaxed">{point}</span>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Driver's Bulkhead, Mirror, and Outer Decks */}
            <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {t("projects.detail.maloVitra.vesselConstruction.structuralDesign.title")}
                </h3>
              </div>
              <ul className="space-y-3">
                {Array.isArray(t("projects.detail.maloVitra.vesselConstruction.structuralDesign.points")) &&
                  t("projects.detail.maloVitra.vesselConstruction.structuralDesign.points").map((point: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 leading-relaxed">{point}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <Gallery
        title={t("projects.detail.maloVitra.gallery.title")}
        images={[
          {
            src: "/about_landing_images/malo_vitra.jpg",
            alt: t("projects.detail.maloVitra.gallery.images.vessel_overview"),
            caption: t("projects.detail.maloVitra.gallery.captions.vessel_overview")
          },
          {
            src: "/malo_vitra/malo_vitra_2.jpg",
            alt: t("projects.detail.maloVitra.gallery.images.construction_detail"),
            caption: t("projects.detail.maloVitra.gallery.captions.construction_detail")
          },
          {
            src: "/malo_vitra/malo_vitra_3.jpg",
            alt: t("projects.detail.maloVitra.gallery.images.cockpit_view"),
            caption: t("projects.detail.maloVitra.gallery.captions.cockpit_view")
          },
          {
            src: "/malo_vitra/malo_vitra_4.jpg",
            alt: t("projects.detail.maloVitra.gallery.images.propulsion_system"),
            caption: t("projects.detail.maloVitra.gallery.captions.propulsion_system")
          },
          {
            src: "/malo_vitra/malo_vitra_5.webp",
            alt: t("projects.detail.maloVitra.gallery.images.solar_panels"),
            caption: t("projects.detail.maloVitra.gallery.captions.solar_panels")
          },
          {
            src: "/malo_vitra/malo_vitra_6.jpg",
            alt: t("projects.detail.maloVitra.gallery.images.solar_panels"),
            caption: t("projects.detail.maloVitra.gallery.captions.solar_panels")
          },
          {
            src: "/malo_vitra/malo_vitra_7.jpg",
            alt: t("projects.detail.maloVitra.gallery.images.solar_panels"),
            caption: t("projects.detail.maloVitra.gallery.captions.solar_panels")
          },
          {
            src: "/malo_vitra/malo_vitra_8.webp",
            alt: t("projects.detail.maloVitra.gallery.images.solar_panels"),
            caption: t("projects.detail.maloVitra.gallery.captions.solar_panels")
          }
        ]}
      />

    </div>
  );
}
