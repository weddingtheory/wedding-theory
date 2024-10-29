'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';

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
    const isMobileByWidth = window.innerWidth < 768;
    const isMobileByAgent = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const newIsMobile = isMobileByWidth || isMobileByAgent;
    if (newIsMobile !== isMobile) {
      setIsMobile(newIsMobile);
    }
  }, [isMobile]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      checkMobile();
      const handleResize = () => {
        let timeoutId: NodeJS.Timeout | null = null;
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(checkMobile, 150);
      };

      window.addEventListener('resize', handleResize);
      window.addEventListener('orientationchange', checkMobile);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', checkMobile);
      };
    }
  }, [checkMobile]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % portfolioImages.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? portfolioImages.length - 1 : prevIndex - 1
    );
  };

  const handlers = useSwipeable({
    onSwipedLeft: goToNext,
    onSwipedRight: goToPrevious,
    trackMouse: true,
  });

  return (
    <div {...handlers} className="relative h-full w-full">
      {portfolioImages.map((image, index) => (
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
            className={`object-cover ${isMobile ? 'mobile-image' : 'desktop-image'}`}
            unoptimized
            priority={index === 0}
            sizes="100vw"
            style={{ 
              objectFit: 'cover',
              objectPosition: 'center',
              width: '100%',
              height: '100%',
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

      <button
        onClick={goToPrevious}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors duration-300"
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
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors duration-300"
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

      <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1 md:gap-2">
        {portfolioImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
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