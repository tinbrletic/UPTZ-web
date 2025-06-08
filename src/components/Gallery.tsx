"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface GalleryProps {
  images: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  title: string;
}

export default function Gallery({ images, title }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goToPrevious();
      } else if (event.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center relative z-10 py-16">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold mb-16 text-center text-gray-800">
          {title}
        </h2>

        <div className="max-w-6xl mx-auto">
          {/* Main Image Display */}
          <div className="relative mb-8">
            <div className="relative h-96 md:h-[500px] lg:h-[600px] w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                className="object-cover transition-opacity duration-300"
                priority
              />

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  {/* Left Arrow */}
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
                    aria-label="Previous image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Right Arrow */}
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
                    aria-label="Next image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Image Counter */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentIndex + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Image Caption */}
            {images[currentIndex].caption && (
              <p className="text-center text-gray-600 mt-4 text-lg">
                {images[currentIndex].caption}
              </p>
            )}
          </div>

          {/* Thumbnail Preview Strip */}
          {images.length > 1 && (
            <div className="flex gap-3 justify-center overflow-x-auto pb-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 ${index === currentIndex
                      ? 'ring-4 ring-blue-500 ring-offset-2'
                      : 'ring-2 ring-gray-200 hover:ring-gray-300'
                    }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
                  {index === currentIndex && (
                    <div className="absolute inset-0 bg-blue-500/20"></div>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Keyboard Navigation Hint */}
          {images.length > 1 && (
            <p className="text-center text-gray-500 text-sm mt-6">
              Use arrow keys or click thumbnails to navigate
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
