"use client";

import BlobContainer from "@/components/BlobContainer";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const { t } = useTranslation();
  const { locale } = useLanguage();

  // Slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      src: "/hero_section_slideshow/hero-slide-1.jpg",
      fallback: "linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #1e3a8a 100%)"
    },
    {
      src: "/hero_section_slideshow/hero-slide-2.jpg",
      fallback: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)"
    },
    {
      src: "/hero_section_slideshow/hero-slide-3.jpg",
      fallback: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)"
    }
  ];

  // Auto-rotate slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const featuredProjects = [
    {
      id: "delta-one",
      name: t("projects.projectList.deltaOne"),
      path: `/${locale}/projects/delta-one`
    },
    {
      id: "malo-vitra",
      name: t("projects.projectList.maloVitra"),
      path: `/${locale}/projects/malo-vitra`
    }
  ];

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
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
            >
              {/* Try to load image, fallback to gradient */}
              <div
                className="absolute inset-0"
                style={{ background: slide.fallback }}
              />
              <Image
                src={slide.src}
                alt={`Hero slide ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
                onError={(e) => {
                  // Hide the image on error, let gradient show through
                  e.currentTarget.style.display = 'none';
                }}
                onLoad={(e) => {
                  // Show image if it loads successfully
                  e.currentTarget.style.display = 'block';
                }}
              />
            </div>
          ))}
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
          <h1 className="text-5xl font-bold">{t("heroTitle")}</h1>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                ? 'bg-white scale-110'
                : 'bg-white/50 hover:bg-white/75'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* About Section - 100vh */}
      <div className="bg-primary min-h-screen flex items-center justify-center relative z-10 py-12">
        <div className="container mx-auto px-4 relative z-10">

          {/* Zig-zag Content Rows */}
          <div className="max-w-6xl mx-auto space-y-16">

            {/* Row 1: Image Left, Text Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/about_landing_images/wilson.jpg"
                  alt="Maritime Engineering Innovation"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Wilson</h3>
                <p className="text-lg text-gray-700">
                  Our research focuses on cutting-edge solutions for maritime challenges, developing innovative technologies that push the boundaries of what's possible in naval architecture and marine engineering.
                </p>
              </div>
            </div>

            {/* Row 2: Text Left, Image Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 lg:order-1">
                <h3 className="text-2xl font-semibold">Malo Vitra</h3>
                <p className="text-lg text-gray-700">
                  We are committed to developing environmentally responsible technologies that reduce the maritime industry's ecological footprint while maintaining efficiency and performance standards.
                </p>
              </div>
              <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden shadow-lg lg:order-2">
                <Image
                  src="/about_landing_images/malo_vitra.jpg"
                  alt="Sustainable Maritime Solutions"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Row 3: Image Left, Text Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/about_landing_images/teredo_navalis.jpg"
                  alt="Research and Development"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Teredo Navalis</h3>
                <p className="text-lg text-gray-700">
                  Our multidisciplinary team combines theoretical research with practical application, ensuring that our innovations translate into real-world solutions for the maritime industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects Section - 100vh */}
      <div className="bg-primary h-screen flex items-center justify-center relative z-10">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold mb-8 text-center">{t("home.projectsSection")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuredProjects.map(project => (
              <div key={project.id} className="bg-gray-50 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                  <Link
                    href={project.path}
                    className="inline-block mt-4 text-blue-600 hover:text-blue-800 transition-colors font-medium"
                  >
                    {t("projects.viewDetails")} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href={`/${locale}/projects`}
              className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-700 transition-colors"
            >
              {t("menu.projects")}
            </Link>
          </div>
        </div>
      </div>

      {/* Partners Section - 100vh */}
      <div className="bg-primary h-screen flex items-center justify-center relative z-10">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold mb-8 text-center">{t("menu.partners")}</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-center mb-12 text-gray-700">
              {t("partners.introduction")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center">
              <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-gray-600">UPTZ</span>
                </div>
                <h3 className="text-lg font-semibold text-center">UPTZ</h3>
              </div>
              <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-gray-600">RWT+CC</span>
                </div>
                <h3 className="text-lg font-semibold text-center">RWT + Creative Commons</h3>
              </div>
              <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <span className="text-sm font-bold text-gray-600">Burza Nautike</span>
                </div>
                <h3 className="text-lg font-semibold text-center">Burza Nautike</h3>
              </div>
            </div>
            <div className="text-center mt-12">
              <Link
                href={`/${locale}/partners`}
                className="text-blue-600 font-semibold hover:text-blue-800 transition-colors"
              >
                {t("common.readMore")} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
