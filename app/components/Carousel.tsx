'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const desktopImages = [
  {
    url: 'https://ik.imagekit.io/weddingtheory/Photos/WT-9.jpg?updatedAt=1730140178246',
    alt: 'Wedding couple portrait',
  },
  {
    url: 'https://ik.imagekit.io/weddingtheory/Photos/V&PWeddingFirstlook-9.jpg?updatedAt=1730140182197',
    alt: 'Wedding couple in desert',
  },
  {
    url: 'https://ik.imagekit.io/weddingtheory/Photos/P&MFirstLook-6.jpg?updatedAt=1730140162633',
    alt: 'Couple first look',
  },
  {
    url: 'https://ik.imagekit.io/weddingtheory/Photos/T&DWEDDINGCANDID-56.jpg?updatedAt=1730140186211',
    alt: 'Wedding ceremony',
  },
];

const mobileImages = [
  {
    url: 'https://ik.imagekit.io/weddingtheory/Photos/ADL06378.JPG?updatedAt=1730140126483',
    alt: 'Wedding portrait mobile',
  },
  {
    url: 'https://ik.imagekit.io/weddingtheory/Photos/01%20copy.jpg?updatedAt=1730140124794',
    alt: 'Couple portrait mobile',
  },
  {
    url: 'https://ik.imagekit.io/weddingtheory/Photos/P&MFirstLook-6.jpg?updatedAt=1730140162633',
    alt: 'First look mobile',
  },
  {
    url: 'https://ik.imagekit.io/weddingtheory/Photos/M&PEngagement-245%20(1).jpg?updatedAt=1730140149027',
    alt: 'Engagement mobile',
  },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is typical md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % (isMobile ? mobileImages.length : desktopImages.length));
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(timer);
  }, [isMobile]);

  const images = isMobile ? mobileImages : desktopImages;

  return (
    <div className="relative w-full h-full">
      {images.map((image, index) => (
        <div
          key={image.url}
          className={`absolute w-full h-full transition-opacity duration-1000 ${
            index === currentIndex
              ? 'opacity-100'
              : 'opacity-0 pointer-events-none'
          }`}
        >
          <Image
            src={image.url}
            alt={image.alt}
            fill
            className="object-cover"
            unoptimized
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );
} 