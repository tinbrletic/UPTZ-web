"use client";

import Gallery from "@/components/Gallery";
import ProjectDetailsCarousel from "@/components/ProjectDetailsCarousel";
import { BatteryIcon, PropulsionIcon, SpecCardsGrid, SpeedIcon, VesselParametersIcon } from "@/components/SpecCard";
import { useTranslation } from "@/hooks/useTranslation";
import { getProjectDetailArray, getTranslationObject } from "@/utils/translationHelpers";
import Image from "next/image";

export default function Karolina() {
  const { t, locale } = useTranslation();

  return (
    <div className="relative">

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
              src="/about_landing_images/karolina.jpg"
              alt={`Karolina - ${t("heroTitle")}`}
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
          <h1 className="lg:text-5xl text-2xl font-bold">{t("projects.projectList.karolina")}</h1>
        </div>
      </div>

      {/* Drive System Section - 100vh */}
      <div className="bg-primary min-h-screen flex items-center justify-center relative z-10 py-10">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-center">{t("projects.driveSystem")}</h2>
          <p className="text-lg text-center mb-12 text-gray-600 max-w-3xl mx-auto">
            {t("projects.detail.karolina.driveSystemDesc")}
          </p>

          {/* Technical Specifications Grid */}
          <SpecCardsGrid
            specs={[
              {
                icon: <VesselParametersIcon />,
                title: t("projects.detail.karolina.specs.vesselDimensions.title"),
                value: t("projects.detail.karolina.specs.vesselDimensions.value"),
                unit: t("projects.detail.karolina.specs.vesselDimensions.unit"),
                description: t("projects.detail.karolina.specs.vesselDimensions.description")
              },
              {
                icon: <PropulsionIcon />,
                title: t("projects.detail.karolina.specs.propulsion.title"),
                value: t("projects.detail.karolina.specs.propulsion.value"),
                unit: t("projects.detail.karolina.specs.propulsion.unit"),
                description: t("projects.detail.karolina.specs.propulsion.description")
              },
              {
                icon: <BatteryIcon />,
                title: t("projects.detail.karolina.specs.batteryCapacity.title"),
                value: t("projects.detail.karolina.specs.batteryCapacity.value"),
                unit: t("projects.detail.karolina.specs.batteryCapacity.unit"),
                description: t("projects.detail.karolina.specs.batteryCapacity.description")
              },
              {
                icon: <PropulsionIcon />,
                title: t("projects.detail.karolina.specs.differentialDrive.title"),
                value: t("projects.detail.karolina.specs.differentialDrive.value"),
                unit: t("projects.detail.karolina.specs.differentialDrive.unit"),
                description: t("projects.detail.karolina.specs.differentialDrive.description")
              },
            ]}
            columns={2}
            className="max-w-6xl mx-auto"
          />
        </div>
      </div>

      {/* Vessel Construction Section */}
      <div className="bg-primary min-h-screen flex items-center justify-center relative z-10 py-16">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold mb-16 text-center text-gray-800">
            {t("projects.detail.karolina.vesselConstruction.title")}
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
                  {t("projects.detail.karolina.vesselConstruction.cockpitConstruction.title")}
                </h3>
              </div>
              <ul className="space-y-3">
                {getProjectDetailArray(
                  t,
                  "karolina",
                  "vesselConstruction.cockpitConstruction.points",
                  [
                    "Pilot space equipped with control joysticks",
                    "AMS switch enables switching between manual and autonomous operation modes",
                    "Kill switch located on the right side of the vessel",
                    "Safety system enables rapid vessel shutdown if needed"
                  ]
                ).map((point: string, index: number) => (
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
                  {t("projects.detail.karolina.vesselConstruction.motorSupport.title")}
                </h3>
              </div>
              <ul className="space-y-3">
                {getProjectDetailArray(
                  t,
                  "karolina",
                  "vesselConstruction.motorSupport.points",
                  [
                    "Two E-Propulsion electric motors with total propulsive power of 12 kW",
                    "Each motor is located in a separate hull",
                    "Differential propulsion enables control of thrust difference between left and right hulls",
                    "Precise vessel control through independent motor management"
                  ]
                ).map((point: string, index: number) => (
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
                  {t("projects.detail.karolina.vesselConstruction.structuralDesign.title")}
                </h3>
              </div>
              <ul className="space-y-3">
                {getProjectDetailArray(
                  t,
                  "karolina",
                  "vesselConstruction.structuralDesign.points",
                  [
                    "Catamaran with two hulls for stability and differential propulsion",
                    "Hull is made from biocomposite materials",
                    "Construction is oriented towards sustainability and minimal environmental impact",
                    "Vessel length is 4.95 m, width is 2.5 m",
                    "Lightweight and efficient construction using biocomposite materials"
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

      {/* Autonomous System Section */}
      <div className="bg-primary min-h-screen flex items-center justify-center relative z-10 py-16">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold mb-16 text-center text-gray-800">
            {t("projects.detail.karolina.autonomousSystem.title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Perception */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {t("projects.detail.karolina.autonomousSystem.perception.title")}
                </h3>
              </div>
              <ul className="space-y-3">
                {getProjectDetailArray(
                  t,
                  "karolina",
                  "autonomousSystem.perception.points",
                  [
                    "The ZED X stereo camera is mounted at the bow for environmental perception",
                    "The WaSR-T neural network is used for obstacle detection in a maritime environment",
                    "The network is based on a deep encoder-decoder architecture",
                    "Semantic segmentation is used to identify water and obstacles",
                    "WaSR-T uses temporal context from recent frames to improve detection"
                  ]
                ).map((point: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hardware */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 5h6m-6 2h6m0 0a2 2 0 012 2v2a2 2 0 01-2 2H9a2 2 0 01-2-2v-2a2 2 0 012-2zm0 0V9a2 2 0 012-2h6a2 2 0 012 2v2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {t("projects.detail.karolina.autonomousSystem.hardware.title")}
                </h3>
              </div>
              <ul className="space-y-3">
                {getProjectDetailArray(
                  t,
                  "karolina",
                  "autonomousSystem.hardware.points",
                  [
                    "Processor: NVIDIA Jetson AGX Orin - Ubuntu 22.04",
                    "CPU: 12-core ARM Cortex-A78AE",
                    "GPU: 2048-core NVIDIA Ampere GPU with 64 Tensor cores",
                    "Memory: 64 GB LPDDR5",
                    "Storage: 64 GB eMMC + 512 GB NVMe SSD"
                  ]
                ).map((point: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pixhawk */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-100 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {t("projects.detail.karolina.autonomousSystem.pixhawk.title")}
                </h3>
              </div>
              <ul className="space-y-3">
                {getProjectDetailArray(
                  t,
                  "karolina",
                  "autonomousSystem.pixhawk.points",
                  [
                    "Pixhawk 6X controller located inside the bow",
                    "IMU unit includes gyroscope and accelerometer",
                    "System uses magnetometer and barometer for estimation",
                    "Holybro M10 GPS module with integrated magnetometer",
                    "GPS and IMU data for position and orientation"
                  ]
                ).map((point: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Software */}
            <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4m0 6L8 4m4 4l4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {t("projects.detail.karolina.autonomousSystem.software.title")}
                </h3>
              </div>
              <ul className="space-y-3">
                {getProjectDetailArray(
                  t,
                  "karolina",
                  "autonomousSystem.software.points",
                  [
                    "ROS2 Humble environment",
                    "PX4 Autopilot system",
                    "Code written in C++ and Python",
                    "Gazebo simulation with VRX simulator for testing"
                  ]
                ).map((point: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation */}
            <div className="bg-gradient-to-br from-red-50 to-pink-100 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 003 16.382V5.618a1 1 0 011.553-.894L9 7.5m0 0l6.553-3.776A1 1 0 0117 5.618v10.764a1 1 0 01-1.447.894L9 12.5m0 0l6 3.5m0 0V20" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {t("projects.detail.karolina.autonomousSystem.navigation.title")}
                </h3>
              </div>
              <ul className="space-y-3">
                {getProjectDetailArray(
                  t,
                  "karolina",
                  "autonomousSystem.navigation.points",
                  [
                    "Algorithms for path planning and tracking",
                    "Navfn for path planning",
                    "Simple Smoother for path smoothing",
                    "MPPI and RPP controllers for motion control"
                  ]
                ).map((point: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section*/}
      <Gallery
        title={t("projects.detail.karolina.gallery.title")}
        images={[
          {
            src: "/about_landing_images/karolina.jpg",
            alt: t("projects.detail.karolina.gallery.images.vessel_overview"),
            caption: t("projects.detail.karolina.gallery.captions.vessel_overview")
          },
          {
            src: "/karolina/karolina_image1.jpeg",
            alt: t("projects.detail.karolina.gallery.images.construction_detail"),
            caption: t("projects.detail.karolina.gallery.captions.construction_detail")
          },
          {
            src: "/karolina/karolina_image2.jpg",
            alt: t("projects.detail.karolina.gallery.images.side_view"),
            caption: t("projects.detail.karolina.gallery.captions.side_view")
          }
        ]}
      />

      {/* Project Details Carousel Section */}
      <ProjectDetailsCarousel
        title={t("projects.detail.karolina.projectDetails.title")}
        details={(() => {
          const detailsData = getTranslationObject(
            locale,
            "projects.detail.karolina.projectDetails.details",
            [
              {
                title: "Competition Performance",
                description: "Excellent results in the Monaco Energy Boat Challenge",
                category: "Achievement"
              },
              {
                title: "Environmental Impact",
                description: "Zero-emission propulsion with solar energy",
                category: "Sustainability"
              },
              {
                title: "Innovation Features",
                description: "Advanced carbon fiber construction techniques",
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
