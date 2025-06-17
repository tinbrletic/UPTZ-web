"use client";

import { useEffect, useState } from "react";

interface ProjectDetail {
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}

interface ProjectDetailsCarouselProps {
  title: string;
  details: ProjectDetail[];
}

export default function ProjectDetailsCarousel({ title, details }: ProjectDetailsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || details.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === details.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, details.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? details.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10 seconds
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === details.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10 seconds
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10 seconds
  };

  if (!details || details.length === 0) {
    return null;
  }

  return (
    <div className="bg-primary min-h-screen flex items-center justify-center relative z-10 py-16">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold mb-16 text-center text-gray-800">
          {title}
        </h2>

        <div className="max-w-4xl mx-auto relative">
          {/* Main Card Display */}
          <div className="relative min-h-96 mb-8">
            <div className="absolute inset-0 bg-white rounded-2xl shadow-xl transition-all duration-500 ease-in-out">
              <div className="min-h-96 flex flex-col p-4 sm:p-6 md:p-8">
                {/* Category Badge */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-blue-100 text-blue-800 text-xs sm:text-sm font-semibold rounded-full">
                    {details[currentIndex].category}
                  </span>
                </div>

                {/* Icon */}
                <div className="mb-4 sm:mb-6 flex justify-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                    {details[currentIndex].icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-center text-center">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight">
                    {details[currentIndex].title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg px-2 sm:px-4">
                    {details[currentIndex].description}
                  </p>
                </div>
              </div>

              {/* Navigation Arrows */}
              {details.length > 1 && (
                <>
                  {/* Left Arrow */}
                  <button
                    onClick={goToPrevious}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
                    aria-label="Previous detail"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Right Arrow */}
                  <button
                    onClick={goToNext}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
                    aria-label="Next detail"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Slide Indicators */}
          {details.length > 1 && (
            <div className="flex justify-center space-x-2 mb-6">
              {details.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                    ? 'bg-blue-500 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Mini Cards Preview */}
          {details.length > 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {details.map((detail, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`p-3 sm:p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-left ${index === currentIndex
                    ? 'ring-2 ring-blue-500 bg-blue-50'
                    : 'hover:scale-105'
                    }`}
                >
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white mr-2 sm:mr-3 flex-shrink-0">
                      {detail.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-800 truncate">
                        {detail.title}
                      </h4>
                      <span className="text-xs text-blue-600 font-medium">
                        {detail.category}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
