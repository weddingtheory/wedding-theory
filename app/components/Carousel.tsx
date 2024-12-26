'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const images = [
  {
    url: 'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/compressed/0A4A2855%20Edit.jpg',
    alt: 'Wedding couple portrait',
  },
  {
    url: 'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/compressed/0A4A4018.jpg',
    alt: 'Wedding portrait',
  },
  {
    url: 'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/compressed/0A4A7575.jpg',
    alt: 'Couple portrait',
  },
  {
    url: 'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/compressed/ADL02297.jpg',
    alt: 'Wedding celebration',
  },
  {
    url: 'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/compressed/NA401349.jpg',
    alt: 'Candid wedding moment',
  },
  {
    url: 'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/compressed/R&DWEDDINGFIRSTLOOK-9.jpg',
    alt: 'Wedding first look',
  },
  {
    url: 'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/compressed/R&JChristianWeddingFirstlook-38.jpg',
    alt: 'First look moment',
  },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

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
            priority={index === 0}
            unoptimized
            loading={index === 0 ? "eager" : "lazy"}
            sizes="100vw"
            quality={100}
          />
        </div>
      ))}
    </div>
  );
} 