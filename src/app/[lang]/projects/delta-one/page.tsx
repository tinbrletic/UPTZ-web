"use client";


import BlobContainer from "@/components/BlobContainer";
import Gallery from "@/components/Gallery";
import ProjectDetailsCarousel from "@/components/ProjectDetailsCarousel";
import { AutonomyIcon, BatteryIcon, PropulsionIcon, SolarPanelIcon, SpecCardsGrid, SpeedIcon, TelemetryIcon, VesselParametersIcon } from "@/components/SpecCard";
import { useTranslation } from "@/hooks/useTranslation";
import { getProjectDetailArray, getTranslationObject } from "@/utils/translationHelpers";
import Image from "next/image";

export default function DeltaOne() {
  const { t, locale } = useTranslation();

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
              src="/delta_one/delta_one_1.jpg"
              alt={`Delta One - ${t("heroTitle")}`}
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
          <h1 className="lg:text-5xl text-2xl font-bold">{t("projects.projectList.deltaOne")}</h1>
        </div>
      </div>

      {/* Drive System Section - 100vh */}
      <div className="bg-primary min-h-screen flex items-center justify-center relative z-10 py-10">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-center">{t("projects.driveSystem")}</h2>
          <p className="text-lg text-center mb-12 text-gray-600 max-w-3xl mx-auto">
            {t("projects.detail.deltaOne.driveSystemDesc")}
          </p>

          {/* Technical Specifications Grid */}
          <SpecCardsGrid
            specs={[
              {
                icon: <SpeedIcon />,
                title: t("projects.detail.deltaOne.specs.maxSpeed.title"),
                value: t("projects.detail.deltaOne.specs.maxSpeed.value"),
                unit: t("projects.detail.deltaOne.specs.maxSpeed.unit"),
                description: t("projects.detail.deltaOne.specs.maxSpeed.description"),
              },
              {
                icon: <BatteryIcon />,
                title: t("projects.detail.deltaOne.specs.batteryCapacity.title"),
                value: t("projects.detail.deltaOne.specs.batteryCapacity.value"),
                unit: t("projects.detail.deltaOne.specs.batteryCapacity.unit"),
                description: t("projects.detail.deltaOne.specs.batteryCapacity.description")
              },
              {
                icon: <VesselParametersIcon />,
                title: t("projects.detail.deltaOne.specs.vesselParameters.title"),
                value: t("projects.detail.deltaOne.specs.vesselParameters.value"),
                unit: t("projects.detail.deltaOne.specs.vesselParameters.unit"),
                description: t("projects.detail.deltaOne.specs.vesselParameters.description")
              },
              {
                icon: <SolarPanelIcon />,
                title: t("projects.detail.deltaOne.specs.solarPower.title"),
                value: t("projects.detail.deltaOne.specs.solarPower.value"),
                unit: t("projects.detail.deltaOne.specs.solarPower.unit"),
                description: t("projects.detail.deltaOne.specs.solarPower.description")
              },
              {
                icon: <AutonomyIcon />,
                title: t("projects.detail.deltaOne.specs.autonomy.title"),
                value: t("projects.detail.deltaOne.specs.autonomy.value"),
                unit: t("projects.detail.deltaOne.specs.autonomy.unit"),
                description: t("projects.detail.deltaOne.specs.autonomy.description")
              },
              {
                icon: <TelemetryIcon />,
                title: t("projects.detail.deltaOne.specs.telemetry.title"),
                value: t("projects.detail.deltaOne.specs.telemetry.value"),
                unit: t("projects.detail.deltaOne.specs.telemetry.unit"),
                description: t("projects.detail.deltaOne.specs.telemetry.description")
              },
              {
                icon: <PropulsionIcon />,
                title: t("projects.detail.deltaOne.specs.propulsion.title"),
                value: t("projects.detail.deltaOne.specs.propulsion.value"),
                unit: t("projects.detail.deltaOne.specs.propulsion.unit"),
                description: t("projects.detail.deltaOne.specs.propulsion.description")
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
            {t("projects.detail.deltaOne.vesselConstruction.title")}
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
                  {t("projects.detail.deltaOne.vesselConstruction.hullConstruction.title")}
                </h3>
              </div>
              <ul className="space-y-3">
                {getProjectDetailArray(
                  t,
                  "deltaOne",
                  "vesselConstruction.hullConstruction.points",
                  [
                    "Sandwich construction using styrofoam and PET core materials",
                    "Carbon fiber and glass fiber reinforcement for strength and durability",
                    "Epoxy resin matrix system for superior water resistance",
                    "Vacuum bagging technique ensuring consistent laminate quality",
                    "Lightweight design optimized for solar-powered operation",
                    "Precision-formed hull geometry for stable operation at speed"
                  ]
                ).map((point: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Systems Integration */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {t("projects.detail.deltaOne.vesselConstruction.systemsIntegration.title")}
                </h3>
              </div>
              <ul className="space-y-3">
                {getProjectDetailArray(
                  t,
                  "deltaOne",
                  "vesselConstruction.systemsIntegration.points",
                  [
                    "Integrated solar panel mounting with optimal sun exposure",
                    "Waterproof battery compartment with air cooling system",
                    "Cable management system for clean installation",
                    "Bluetooth telemetry system for real-time monitoring",
                    "Steering wheel control system for precise maneuvering",
                    "Modular design allowing for easy maintenance and upgrades"
                  ]
                ).map((point: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Power Management */}
            <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {t("projects.detail.deltaOne.vesselConstruction.powerManagement.title")}
                </h3>
              </div>
              <ul className="space-y-3">
                {getProjectDetailArray(
                  t,
                  "deltaOne",
                  "vesselConstruction.powerManagement.points",
                  [
                    "Dual MMPT controllers for maximum solar energy harvesting",
                    "14S13P LiFePo4 battery configuration for reliable power storage",
                    "48V system voltage optimized for marine electric propulsion",
                    "Air cooling system preventing battery overheating",
                    "Real-time energy monitoring via Bluetooth connectivity",
                    "Efficient power distribution to minimize energy losses"
                  ]
                ).map((point: string, index: number) => (
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
        title={t("projects.detail.deltaOne.gallery.title")}
        images={[
          {
            src: "/delta_one/delta_one_1.jpg",
            alt: t("projects.detail.deltaOne.gallery.images.vessel_overview"),
            caption: t("projects.detail.deltaOne.gallery.captions.vessel_overview")
          },
          {
            src: "/delta_one/delta_one_2.jpg",
            alt: t("projects.detail.deltaOne.gallery.images.solar_panels"),
            caption: t("projects.detail.deltaOne.gallery.captions.solar_panels")
          },
          {
            src: "/delta_one/delta_one_3.jpg",
            alt: t("projects.detail.deltaOne.gallery.images.cockpit"),
            caption: t("projects.detail.deltaOne.gallery.captions.cockpit")
          },
          {
            src: "/delta_one/delta_one_4.jpg",
            alt: t("projects.detail.deltaOne.gallery.images.systems_integration"),
            caption: t("projects.detail.deltaOne.gallery.captions.systems_integration")
          },
          {
            src: "/delta_one/delta_one_5.jpg",
            alt: t("projects.detail.deltaOne.gallery.images.power_management"),
            caption: t("projects.detail.deltaOne.gallery.captions.power_management")
          },
          {
            src: "/delta_one/delta_one_6.jpg",
            alt: t("projects.detail.deltaOne.gallery.images.testing"),
            caption: t("projects.detail.deltaOne.gallery.captions.testing")
          },
          {
            src: "/delta_one/delta_one_7.jpg",
            alt: t("projects.detail.deltaOne.gallery.images.competition"),
            caption: t("projects.detail.deltaOne.gallery.captions.competition")
          },
          {
            src: "/delta_one/delta_one_8.jpg",
            alt: t("projects.detail.deltaOne.gallery.images.team"),
            caption: t("projects.detail.deltaOne.gallery.captions.team")
          },
          {
            src: "/delta_one/delta_one_9.jpg",
            alt: t("projects.detail.deltaOne.gallery.images.awards"),
            caption: t("projects.detail.deltaOne.gallery.captions.awards")
          }
        ]}
      />

      {/* Project Details Carousel Section */}
      <ProjectDetailsCarousel
        title={t("projects.detail.deltaOne.projectDetails.title")}
        details={(() => {
          const detailsData = getTranslationObject(
            locale,
            "projects.detail.deltaOne.projectDetails.details",
            [
              {
                title: "Monaco Energy Boat Challenge Entry",
                description: "Delta One was developed for the prestigious Monaco Energy Boat Challenge",
                category: "Competition"
              },
              {
                title: "Environmental Impact",
                description: "Zero-emission propulsion with solar energy technology",
                category: "Sustainability"
              },
              {
                title: "Innovation Features",
                description: "Advanced solar panel system and Bluetooth telemetry",
                category: "Innovation"
              }
            ]
          );

          if (Array.isArray(detailsData)) {
            return detailsData.map((detail: { title: string; description: string; category: string }) => ({
              title: detail.title,
              description: detail.description,
              category: detail.category,
              icon: getDetailIcon(detail.category)
            }));
          }

          // Fallback data if translation fails
          return [
            {
              title: "Monaco Energy Boat Challenge Entry",
              description: "Delta One was developed for the prestigious Monaco Energy Boat Challenge",
              category: "Competition",
              icon: getDetailIcon("Competition")
            },
            {
              title: "Environmental Impact",
              description: "Zero-emission propulsion with solar energy technology",
              category: "Sustainability",
              icon: getDetailIcon("Sustainability")
            },
            {
              title: "Innovation Features",
              description: "Advanced solar panel system and Bluetooth telemetry",
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
    case 'competition':
    case 'natjecanje':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <g clipPath="url(#clip0_586_2585)">
            <path d="M5.33333 24V21.3333H10.6667V17.2C9.57778 16.9556 8.60556 16.4944 7.75 15.8167C6.89444 15.1389 6.26667 14.2889 5.86667 13.2667C4.2 13.0667 2.80556 12.3389 1.68333 11.0833C0.561111 9.82778 0 8.35556 0 6.66667V5.33333C0 4.6 0.261111 3.97222 0.783333 3.45C1.30556 2.92778 1.93333 2.66667 2.66667 2.66667H5.33333V0H18.6667V2.66667H21.3333C22.0667 2.66667 22.6944 2.92778 23.2167 3.45C23.7389 3.97222 24 4.6 24 5.33333V6.66667C24 8.35556 23.4389 9.82778 22.3167 11.0833C21.1944 12.3389 19.8 13.0667 18.1333 13.2667C17.7333 14.2889 17.1056 15.1389 16.25 15.8167C15.3944 16.4944 14.4222 16.9556 13.3333 17.2V21.3333H18.6667V24H5.33333ZM5.33333 10.4V5.33333H2.66667V6.66667C2.66667 7.51111 2.91111 8.27222 3.4 8.95C3.88889 9.62778 4.53333 10.1111 5.33333 10.4ZM12 14.6667C13.1111 14.6667 14.0556 14.2778 14.8333 13.5C15.6111 12.7222 16 11.7778 16 10.6667V2.66667H8V10.6667C8 11.7778 8.38889 12.7222 9.16667 13.5C9.94444 14.2778 10.8889 14.6667 12 14.6667ZM18.6667 10.4C19.4667 10.1111 20.1111 9.62778 20.6 8.95C21.0889 8.27222 21.3333 7.51111 21.3333 6.66667V5.33333H18.6667V10.4Z" fill="currentcolor" />
          </g>
          <defs>
            <clipPath id="clip0_586_2585">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    case 'heritage':
    case 'naslijeđe':
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    case 'timeline':
    case 'vremenska linija':
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'education':
    case 'obrazovanje':
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
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
