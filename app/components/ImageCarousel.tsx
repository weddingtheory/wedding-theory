'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const portfolioImages = [
  {
    desktop:
      'https://ik.imagekit.io/weddingtheory/Photos/N&JFIRSTLOOK-96.jpg?updatedAt=1730140144622',
    mobile:
      'https://ik.imagekit.io/weddingtheory/Photos/N&JFIRSTLOOK-96.jpg?updatedAt=1730140144622',
    alt: 'Portfolio image 1',
  },
  {
    desktop:
      'https://ik.imagekit.io/weddingtheory/Photos/MMP01287.jpg?updatedAt=1730140146040',
    mobile:
      'https://ik.imagekit.io/weddingtheory/Photos/MMP01287.jpg?updatedAt=1730140146040',
    alt: 'Portfolio image 2',
  },
  {
    desktop:
      'https://ik.imagekit.io/weddingtheory/Photos/S&CPREWEDFIRSTSET-6.JPG?updatedAt=1730140170874',
    mobile:
      'https://ik.imagekit.io/weddingtheory/Photos/ADL00536.jpg?updatedAt=1730140142519',
    alt: 'Portfolio image 3',
  },
  {
    desktop:
      'https://ik.imagekit.io/weddingtheory/Photos/0A4A8443-Edit.jpg?updatedAt=1730140135728',
    mobile:
      'https://ik.imagekit.io/weddingtheory/Photos/0A4A8443-Edit.jpg?updatedAt=1730140135728',
    alt: 'Portfolio image 4',
  },
  
];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const checkMobile = useCallback(() => {
    // Using both width and userAgent for better detection
    const isMobileByWidth = window.innerWidth < 768;
    const isMobileByAgent = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    const newIsMobile = isMobileByWidth || isMobileByAgent;
    if (newIsMobile !== isMobile) {
      setIsMobile(newIsMobile);
      console.log('Mobile status:', newIsMobile); // For debugging
    }
  }, [isMobile]);

  useEffect(() => {
    // Avoid hydration mismatch by running on mount
    if (typeof window !== 'undefined') {
      checkMobile();
      
      const handleResize = () => {
        // Debounce the resize event
        let timeoutId: NodeJS.Timeout | null = null;
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(checkMobile, 150);
      };

      window.addEventListener('resize', handleResize);
      
      // Also check on orientation change for mobile devices
      window.addEventListener('orientationchange', checkMobile);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', checkMobile);
      };
    }
  }, [checkMobile]);

  // Add a className that reflects the current state
  const imageClassName = `object-cover ${isMobile ? 'mobile-image' : 'desktop-image'}`;

  // Filter images based on device type
  const displayImages = portfolioImages.filter(image => 
    !isMobile || (isMobile && image.mobile)
  );

  // Update the goToNext and goToPrevious functions to use displayImages length
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % displayImages.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? displayImages.length - 1 : prevIndex - 1
    );
  };

  // Update the auto-advance effect to use 4000ms interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % displayImages.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [displayImages.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative h-screen overflow-hidden w-full">
      {/* Images */}
      {displayImages.map((image, index) => (
        <div
          key={`${image.desktop}-${index}`}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex
              ? 'opacity-100'
              : 'opacity-0 pointer-events-none'
          }`}
        >
          <Image
            src={isMobile ? image.mobile : image.desktop}
            alt={image.alt}
            fill
            className={imageClassName}
            unoptimized
            priority={index === 0}
            sizes="100vw"
            style={{ 
              objectFit: 'cover',
              width: '100%',
              height: '100%'
            }}
            onError={(e) => {
              console.error(`Failed to load image: ${isMobile ? image.mobile : image.desktop}`);
              if (isMobile) {
                (e.target as HTMLImageElement).src = image.desktop;
              }
            }}
          />
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {displayImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white scale-110'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      
    </div>
  );
} 