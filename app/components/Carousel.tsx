'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const images = [
  {
    url: 'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/0A4A2855%20Edit.jpg',
    alt: 'Wedding couple portrait',
  },
  {
    url: 'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/0A4A7575.jpg',
    alt: 'Couple portrait',
  },
  {
    url: 'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/ADL02297.jpg',
    alt: 'Wedding celebration',
  },
  {
    url: 'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/ADL07659.jpg',
    alt: 'Wedding ceremony',
  },
  {
    url: 'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/DSC01108.jpg',
    alt: 'Wedding portrait',
  },
  {
    url: 'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/G&SRECEPTIONCANDID-19%20-%20Copy.jpg',
    alt: 'Reception candid',
  },
  {
    url: 'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/NA401349.jpg',
    alt: 'Candid wedding moment',
  },
  {
    url: 'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/R&JChristianWeddingFirstlook-38.jpg',
    alt: 'First look moment',
  },
  {
    url: 'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/S&NFIRSTLOOK-3.JPG',
    alt: 'Wedding first look',
  },
  {
    url: 'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/YDU02740.jpg',
    alt: 'Wedding celebration',
  },
  {
    url: 'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/firstset-6.JPG',
    alt: 'Wedding celebration',
  },
  {
    url: 'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/firstset-9.JPG',
    alt: 'Wedding portrait',
  },
  {
    url: 'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/L&MFirstlook-58.jpg',
    alt: 'Wedding first look portrait',
  }
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