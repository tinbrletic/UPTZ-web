"use client";

import BlobContainer from "@/components/BlobContainer";
import Gallery from "@/components/Gallery";
import ProjectDetailsCarousel from "@/components/ProjectDetailsCarousel";
import { BatteryIcon, PropulsionIcon, SolarPanelIcon, SpecCardsGrid, SpeedIcon, VesselParametersIcon } from "@/components/SpecCard";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import Image from "next/image";

export default function TeredoNavalis() {
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
              src="/about_landing_images/teredo_navalis.jpg"
              alt={`Teredo Navalis - ${t("heroTitle")}`}
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
          <h1 className="lg:text-5xl text-2xl font-bold">{t("projects.projectList.teredoNavalis")}</h1>
        </div>
      </div>

      {/* Drive System Section - 100vh */}
      <div className="bg-primary min-h-screen flex items-center justify-center relative z-10 py-10">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-center">{t("projects.driveSystem")}</h2>
          <p className="text-lg text-center mb-12 text-gray-600 max-w-3xl mx-auto">
            {t("projects.detail.teredoNavalis.driveSystemDesc")}
          </p>

          {/* Technical Specifications Grid */}
          <SpecCardsGrid
            specs={[
              {
                icon: <SpeedIcon />,
                title: t("projects.detail.teredoNavalis.specs.maxSpeed.title"),
                value: t("projects.detail.teredoNavalis.specs.maxSpeed.value"),
                unit: t("projects.detail.teredoNavalis.specs.maxSpeed.unit"),
                description: t("projects.detail.teredoNavalis.specs.maxSpeed.description"),
              },
              {
                icon: <BatteryIcon />,
                title: t("projects.detail.teredoNavalis.specs.batteryCapacity.title"),
                value: t("projects.detail.teredoNavalis.specs.batteryCapacity.value"),
                unit: t("projects.detail.teredoNavalis.specs.batteryCapacity.unit"),
                description: t("projects.detail.teredoNavalis.specs.batteryCapacity.description")
              },
              {
                icon: <PropulsionIcon />,
                title: t("projects.detail.teredoNavalis.specs.propulsion.title"),
                value: t("projects.detail.teredoNavalis.specs.propulsion.value"),
                unit: t("projects.detail.teredoNavalis.specs.propulsion.unit"),
                description: t("projects.detail.teredoNavalis.specs.propulsion.description")
              },
              {
                icon: <VesselParametersIcon />,
                title: t("projects.detail.teredoNavalis.specs.vesselParameters.title"),
                value: t("projects.detail.teredoNavalis.specs.vesselParameters.value"),
                unit: t("projects.detail.teredoNavalis.specs.vesselParameters.unit"),
                description: t("projects.detail.teredoNavalis.specs.vesselParameters.description")
              },
              {
                icon: <SolarPanelIcon />,
                title: t("projects.detail.teredoNavalis.specs.solarPower.title"),
                value: t("projects.detail.teredoNavalis.specs.solarPower.value"),
                unit: t("projects.detail.teredoNavalis.specs.solarPower.unit"),
                description: t("projects.detail.teredoNavalis.specs.solarPower.description")
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
            {t("projects.detail.wilson.vesselConstruction.title")}
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
                  {t("projects.detail.wilson.vesselConstruction.cockpitConstruction.title")}
                </h3>
              </div>
              <ul className="space-y-3">
                {Array.isArray(t("projects.detail.wilson.vesselConstruction.cockpitConstruction.points"))
                  ? (t("projects.detail.wilson.vesselConstruction.cockpitConstruction.points") as unknown as string[]).map((point: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 leading-relaxed">{point}</span>
                    </li>
                  ))
                  : []
                }
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
                  {t("projects.detail.wilson.vesselConstruction.motorSupport.title")}
                </h3>
              </div>
              <ul className="space-y-3">
                {Array.isArray(t("projects.detail.wilson.vesselConstruction.motorSupport.points"))
                  ? (t("projects.detail.wilson.vesselConstruction.motorSupport.points") as unknown as string[]).map((point: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 leading-relaxed">{point}</span>
                    </li>
                  ))
                  : []
                }
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
                  {t("projects.detail.wilson.vesselConstruction.structuralDesign.title")}
                </h3>
              </div>
              <ul className="space-y-3">
                {Array.isArray(t("projects.detail.wilson.vesselConstruction.structuralDesign.points"))
                  ? (t("projects.detail.wilson.vesselConstruction.structuralDesign.points") as unknown as string[]).map((point: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 leading-relaxed">{point}</span>
                    </li>
                  ))
                  : []
                }
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <Gallery
        title={t("projects.detail.wilson.gallery.title")}
        images={[
          {
            src: "/about_landing_images/wilson.jpg",
            alt: t("projects.detail.wilson.gallery.images.vessel_overview"),
            caption: t("projects.detail.wilson.gallery.captions.vessel_overview")
          },
          {
            src: "/wilson/wilson_image1.jpg",
            alt: t("projects.detail.wilson.gallery.images.construction_detail"),
            caption: t("projects.detail.wilson.gallery.captions.construction_detail")
          },
          {
            src: "/wilson/wilson_image3.jpg",
            alt: t("projects.detail.wilson.gallery.images.cockpit_view"),
            caption: t("projects.detail.wilson.gallery.captions.cockpit_view")
          },
          {
            src: "/wilson/wilson_image4.jpg",
            alt: t("projects.detail.wilson.gallery.images.propulsion_system"),
            caption: t("projects.detail.wilson.gallery.captions.propulsion_system")
          },
          {
            src: "/wilson/wilson_image5.jpg",
            alt: t("projects.detail.wilson.gallery.images.solar_panels"),
            caption: t("projects.detail.wilson.gallery.captions.solar_panels")
          },
          {
            src: "/wilson/wilson_image6.jpg",
            alt: t("projects.detail.wilson.gallery.images.solar_panels"),
            caption: t("projects.detail.wilson.gallery.captions.solar_panels")
          }
        ]}
      />

      {/* Project Details Carousel Section */}
      <ProjectDetailsCarousel
        title={t("projects.detail.wilson.projectDetails.title")}
        details={(() => {
          const detailsData = t("projects.detail.wilson.projectDetails.details") as any;
          if (Array.isArray(detailsData)) {
            return detailsData.map((detail: any) => ({
              title: detail.title,
              description: detail.description,
              category: detail.category,
              icon: getDetailIcon(detail.category)
            }));
          }
          // Fallback data if translation fails
          return [
            {
              title: "Competition Performance",
              description: "Excellent results in the Monaco Energy Boat Challenge",
              category: "Achievement",
              icon: getDetailIcon("Achievement")
            },
            {
              title: "Environmental Impact",
              description: "Zero-emission propulsion with solar energy",
              category: "Sustainability",
              icon: getDetailIcon("Sustainability")
            },
            {
              title: "Innovation Features",
              description: "Advanced carbon fiber construction techniques",
              category: "Innovation",
              icon: getDetailIcon("Innovation")
            }
          ];
        })()}
      />

    </div>
  );
}

// Helper function to get appropriate icons for each category
function getDetailIcon(category: string) {
  switch (category.toLowerCase()) {
    case 'achievement':
    case 'postignuće':
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      );
    case 'sustainability':
    case 'održivost':
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9a9 9 0 01-9-9m9 9c0 5-4 9-9 9s-9-4-9-9m9 9a9 9 0 019-9" />
        </svg>
      );
    case 'innovation':
    case 'inovacija':
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    case 'teamwork':
    case 'timski rad':
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      );
    case 'engineering':
    case 'inženjerstvo':
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case 'future':
    case 'budućnost':
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    default:
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
}
