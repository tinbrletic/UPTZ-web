"use client";

import BlobContainer from "@/components/BlobContainer";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const { t } = useTranslation();
  const { locale } = useLanguage();  // Slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  // Static titles for immediate rendering - eliminates translation loading delay
  const staticTitles = {
    en: 'Innovations in Maritime Engineering',
    hr: 'Inovacije u pomorskom inženjerstvu'
  };
  // Use only static title for fastest LCP - no translation dependency
  const displayTitle = staticTitles[locale as keyof typeof staticTitles] || staticTitles.en;

  const slides = [
    {
      src: "/hero_section_slideshow/hero-slide-1.jpg",
      fallback: "linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #1e3a8a 100%)"
    },
    {
      src: "/about_landing_images/vilson.jpg",
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

  // Handle screen size changes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    // Check on mount
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Reset slide when screen size changes
  useEffect(() => {
    setCurrentProjectSlide(0);
  }, [isSmallScreen]);

  // Partner logos data
  const partnerLogos = [
    { file: "aitac.svg", name: "AITAC" },
    { file: "alarm_automatika.svg", name: "Alarm Automatika" },
    { file: "duing.svg", name: "Duing" },
    { file: "edyn.svg", name: "Edyn" },
    { file: "elog.svg", name: "Elog" },
    { file: "enia.svg", name: "Enia" },
    { file: "epropulsion.svg", name: "Epropulsion" },
    { file: "itt_ri.svg", name: "ITT Rijeka" },
    { file: "izit.svg", name: "IZIT" },
    { file: "kardcarbon.svg", name: "Kard Carbon" },
    { file: "kelteks.svg", name: "Kelteks" },
    { file: "kvocic.svg", name: "Kvocic" },
    { file: "loveco.svg", name: "Loveco" },
    { file: "marservis.svg", name: "Marservis" },
    { file: "montelektro.svg", name: "Montelektro" },
    { file: "pfri.svg", name: "PFRI" },
    { file: "pgz.svg", name: "PGZ" },
    { file: "poli_mix.svg", name: "Poli Mix" },
    { file: "poslovni_klub.svg", name: "Poslovni Klub" },
    { file: "proteam.svg", name: "Proteam" },
    { file: "PROXIMA.svg", name: "Proxima" },
    { file: "schrack.svg", name: "Schrack" },
    { file: "scri.svg", name: "SCRI" },
    { file: "szsur.svg", name: "SZSUR" }
  ];

  const featuredProjects = [
    {
      id: "vilson",
      name: t("projects.projectList.vilson"),
      path: `/${locale}/projects/vilson`,
      description: t("projects.shortDesc.vilson"),
      image: "/about_landing_images/vilson.jpg",
      competition: t("competitions.adriaEnergyBoatClass.name")
    },
    {
      id: "malo-vitra",
      name: t("projects.projectList.maloVitra"),
      path: `/${locale}/projects/malo-vitra`,
      description: t("projects.shortDesc.maloVitra"),
      image: "/about_landing_images/malo_vitra.jpg",
      competition: t("competitions.adriaEnergyBoatClass.name")
    },
    {
      id: "teredo-navalis",
      name: t("projects.projectList.teredoNavalis"),
      path: `/${locale}/projects/teredo-navalis`,
      description: t("projects.shortDesc.teredoNavalis"),
      image: "/about_landing_images/teredo_navalis.jpg",
      competition: t("competitions.adriaHydrofoil.name")
    },
    {
      id: "delta-one",
      name: t("projects.projectList.deltaOne"),
      path: `/${locale}/projects/delta-one`,
      description: `${t("projects.shortDesc.deltaOne")}`,
      image: "/delta_one/delta_one_1.jpg",
      competition: t("competitions.adriaHydrofoil.name")
    },
    {
      id: "hydrocontest",
      name: t("projects.projectList.hydroconx"),
      path: `/${locale}/projects/hydrocontest`,
      description: t("projects.shortDesc.hydroConX"),
      image: "/hydrocontest/hydrocontest_1.jpg",
      competition: t("competitions.hydroContest.name")
    }
  ];

  // Carousel state
  const [currentProjectSlide, setCurrentProjectSlide] = useState(0);
  const projectsPerPage = {
    sm: 1, // Small screens: 1 card
    lg: 3  // Large screens: 3 cards
  };

  const totalSlides = Math.ceil(featuredProjects.length / projectsPerPage.lg);
  const totalSlidesSmall = featuredProjects.length; // For small screens, each project is a slide

  const nextProjectSlide = () => {
    if (isSmallScreen) {
      setCurrentProjectSlide((prev) => (prev + 1) % totalSlidesSmall);
    } else {
      setCurrentProjectSlide((prev) => (prev + 1) % totalSlides);
    }
  };

  const prevProjectSlide = () => {
    if (isSmallScreen) {
      setCurrentProjectSlide((prev) => (prev - 1 + totalSlidesSmall) % totalSlidesSmall);
    } else {
      setCurrentProjectSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    }
  };
  return (
    <div className="relative">
      {/* Global Blob Background - optimized for mobile */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <BlobContainer animationType="normal" />
        {/* Reduce blob layers on mobile for better performance */}
        <div className="hidden sm:block">
          <BlobContainer animationType="reverse" className="opacity-30 lg:opacity-50" />
        </div>
        <div className="hidden lg:block">
          <BlobContainer animationType="slow" className="opacity-20 lg:opacity-30" />
        </div>
      </div>{/* Hero Section - 100vh */}
      <div className="relative min-h-screen flex items-center justify-center z-10 mb-1 sm:mb-2 lg:mb-4">
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
                sizes="100vw"
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
        />        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 text-center text-white" style={{ marginTop: '-20vh' }}>
          <h1 className="hero-title lg:text-5xl text-2xl font-bold">
            {displayTitle}
          </h1>
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
      </div>      {/* About Section - 100vh */}
      <div className="bg-primary min-h-screen flex items-center justify-center relative z-10 py-10 mb-2 sm:mb-4 lg:mb-8">
        <div className="container mx-auto px-4 relative z-10">

          {/* Zig-zag Content Rows */}
          <div className="max-w-7xl mx-auto space-y-16">

            {/* Row 1: Image Left, Text Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative h-56 lg:h-80 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/about_landing_images/vilson.jpg"
                  alt="Maritime Engineering Innovation"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">{t("about.subsection1.title")}</h3>
                <p className="text-lg text-gray-700">{t("about.subsection1.description")}</p>
              </div>
            </div>

            {/* Row 2: Text Left, Image Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 order-2 lg:order-1">
                <h3 className="text-2xl font-semibold">{t("about.subsection2.title")}</h3>
                <p className="text-lg text-gray-700">{t("about.subsection2.description")}</p>
              </div>
              <div className="relative h-56 lg:h-80 rounded-lg overflow-hidden shadow-lg order-1 lg:order-2">
                <Image
                  src="/about_landing_images/malo_vitra.jpg"
                  alt="Sustainable Maritime Solutions"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Row 3: Image Left, Text Right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative h-56 lg:h-80 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/about_landing_images/teredo_navalis.jpg"
                  alt="Research and Development"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">{t("about.subsection3.title")}</h3>
                <p className="text-lg text-gray-700">{t("about.subsection3.description")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects Section - 100vh */}
      <div className="bg-primary min-h-screen flex items-center justify-center relative z-10 py-10 mb-2 sm:mb-4 lg:mb-8">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-center">{t("home.projectsSection")}</h2>
          <p className="text-lg text-center mb-2 text-gray-700">
            {t("home.projectsSectionDescription")}
          </p>

          {/* Project Carousel */}
          <div className="max-w-6xl mx-auto">

            {/* Large Screen Carousel (3 cards) */}
            <div className="hidden lg:block">
              <div className="relative overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentProjectSlide * 100}%)` }}
                >
                  {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0">
                      <div className="grid grid-cols-3 gap-8 px-4 py-5">
                        {featuredProjects.slice(
                          slideIndex * projectsPerPage.lg,
                          slideIndex * projectsPerPage.lg + projectsPerPage.lg
                        ).map((project, index) => (
                          <div
                            key={project.id}
                            className={`bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group ${slideIndex === currentProjectSlide
                              ? index === 0
                                ? 'animate-fadeInUp'
                                : index === 1
                                  ? 'animate-fadeInUp-delay-1'
                                  : 'animate-fadeInUp-delay-2'
                              : 'opacity-100'
                              }`}
                            style={{ transformOrigin: 'center center' }}
                          >
                            <div className="relative h-48 overflow-hidden">
                              <Image
                                src={project.image}
                                alt={project.name}
                                fill
                                sizes="(max-width: 1024px) 100vw, 33vw"
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="p-4">
                              <p className="mb-1 text-xs text-blue-600 uppercase">{project.competition}</p>
                              <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{project.name}</h3>
                              <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
                              <Link
                                href={project.path}
                                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 hover:shadow-lg transition-all duration-300 font-medium text-sm transform hover:scale-105"
                              >
                                {t("projects.viewDetails")}
                                <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Small Screen Carousel (1 card) */}
            <div className="lg:hidden">
              <div className="relative">
                <div className="overflow-hidden py-5">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentProjectSlide * 100}%)` }}
                  >
                    {featuredProjects.map((project) => (
                      <div key={project.id} className="w-full flex-shrink-0 px-4">
                        <div className={`bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 max-w-sm mx-auto group transform hover:scale-105 animate-fadeInUp`} style={{ transformOrigin: 'center center' }}>
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={project.image}
                              alt={project.name}
                              fill
                              sizes="(max-width: 1024px) 100vw, 33vw"
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          <div className="p-4">
                            <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{project.name}</h3>
                            <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
                            <Link
                              href={project.path}
                              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 hover:shadow-lg transition-all duration-300 font-medium text-sm transform hover:scale-105"
                            >
                              {t("projects.viewDetails")}
                              <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Navigation */}
            <div className="flex items-center justify-center mt-4 space-x-6">
              {/* Previous Button */}
              <button
                onClick={prevProjectSlide}
                className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:bg-blue-50 group border border-gray-100"
                aria-label="Previous projects"
              >
                <svg className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Pagination Dots */}
              <div className="flex space-x-3">
                {/* Large screen pagination (based on groups of 3) */}
                <div className="hidden lg:flex space-x-3">
                  {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentProjectSlide(index)}
                      className={`w-4 h-4 rounded-full transition-all duration-300 transform hover:scale-125 ${index === currentProjectSlide
                        ? 'bg-blue-600 scale-110 shadow-lg shadow-blue-600/30'
                        : 'bg-gray-300 hover:bg-gray-400 shadow-md'
                        }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Small screen pagination (individual projects) */}
                <div className="lg:hidden flex space-x-3">
                  {featuredProjects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentProjectSlide(index)}
                      className={`w-4 h-4 rounded-full transition-all duration-300 transform hover:scale-125 ${index === currentProjectSlide
                        ? 'bg-blue-600 scale-110 shadow-lg shadow-blue-600/30'
                        : 'bg-gray-300 hover:bg-gray-400 shadow-md'
                        }`}
                      aria-label={`Go to project ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={nextProjectSlide}
                className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:bg-blue-50 group border border-gray-100"
                aria-label="Next projects"
              >
                <svg className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>      {/* Partners Section - 100vh */}
      <div className="bg-primary min-h-screen flex items-center justify-center relative z-10 py-10">
        <div className="w-full relative z-10">
          {/* Title and Description - Centered with container */}
          <div className="container mx-auto px-4 mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">{t("menu.partners")}</h2>
            <div className="max-w-6xl mx-auto">
              <p className="text-lg text-center mb-12 text-gray-700">
                {t("partners.introduction")}
              </p>
            </div>
          </div>

          {/* Infinite Scrolling Partner Logos - Full Width */}
          <div className="w-full overflow-hidden">
            {/* First Row - Right to Left */}
            <div className="flex animate-scroll-right-to-left mb-8">
              {partnerLogos.map((logo, index) => (
                <div key={`row1-${index}`} className="mx-8 flex-shrink-0">
                  <div className="h-36 w-48 relative transition-all duration-300 hover:scale-110">
                    <Image
                      src={`/partners_logos/${logo.file}`}
                      alt={logo.name}
                      fill
                      sizes="200px"
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {partnerLogos.map((logo, index) => (
                <div key={`row1-dup-${index}`} className="mx-8 flex-shrink-0">
                  <div className="h-36 w-48 relative transition-all duration-300 hover:scale-110">
                    <Image
                      src={`/partners_logos/${logo.file}`}
                      alt={logo.name}
                      fill
                      sizes="200px"
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Second Row - Left to Right (starts from right side) */}
            <div className="flex animate-scroll-left-to-right">
              {partnerLogos.map((logo, index) => (
                <div key={`row2-${index}`} className="mx-8 flex-shrink-0">
                  <div className="h-36 w-48 relative transition-all duration-300 hover:scale-110">
                    <Image
                      src={`/partners_logos/${logo.file}`}
                      alt={logo.name}
                      fill
                      sizes="200px"
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {partnerLogos.map((logo, index) => (
                <div key={`row2-dup-${index}`} className="mx-8 flex-shrink-0">
                  <div className="h-36 w-48 relative transition-all duration-300 hover:scale-110">
                    <Image
                      src={`/partners_logos/${logo.file}`}
                      alt={logo.name}
                      fill
                      sizes="200px"
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Read More Link - Centered with container */}
          <div className="container mx-auto px-4">
            <div className="text-center mt-12">
              <Link
                href={`/${locale}/partners`}
                className="text-white bg-blue-600 px-6 py-2 rounded font-semibold hover:bg-blue-800 transition-colors"
              >
                {t("partners.redirectTo")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
