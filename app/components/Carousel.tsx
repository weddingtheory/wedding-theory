'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const images = [
  {
    url: 'https://ik.imagekit.io/weddingtheory/Photos/Fold%201%20Gallery%20-20241130T074354Z-001/Fold%201%20Gallery/S&YFIRSTLOOK-46.jpg?updatedAt=1732952928150',
    alt: 'Wedding couple portrait',
  },
  {
    url: 'https://ik.imagekit.io/weddingtheory/Photos/Fold%201%20Gallery%20-20241130T074354Z-001/Fold%201%20Gallery/YDU02740.jpg?updatedAt=1732952927750',
    alt: 'Wedding celebration',
  },
  {
    url: 'https://ik.imagekit.io/weddingtheory/Photos/Fold%201%20Gallery%20-20241130T074354Z-001/Fold%201%20Gallery/_YDU2609.jpg?updatedAt=1732952925864',
    alt: 'Wedding ceremony',
  },
  {
    url: 'https://ik.imagekit.io/weddingtheory/Photos/Fold%201%20Gallery%20-20241130T074354Z-001/Fold%201%20Gallery/S&SWEDDINGFIRSTLOOK_-102.JPG?updatedAt=1732952924220',
    alt: 'First look moment',
  },
  {
    url: 'https://ik.imagekit.io/weddingtheory/Photos/Fold%201%20Gallery%20-20241130T074354Z-001/Fold%201%20Gallery/R&DWEDDINGFIRSTLOOK-9.JPG?updatedAt=1732952922429',
    alt: 'Wedding couple portrait',
  },
  {
    url: 'https://ik.imagekit.io/weddingtheory/Photos/Fold%201%20Gallery%20-20241130T074354Z-001/Fold%201%20Gallery/firstset-6.JPG?updatedAt=1732952920305',
    alt: 'Wedding celebration',
  },
  {
    url: 'https://ik.imagekit.io/weddingtheory/Photos/Fold%201%20Gallery%20-20241130T074354Z-001/Fold%201%20Gallery/G&SRECEPTIONCANDID-19.jpg?updatedAt=1732952919780',
    alt: 'Reception candid',
  },
  {
    url: 'https://ik.imagekit.io/weddingtheory/Photos/Fold%201%20Gallery%20-20241130T074354Z-001/Fold%201%20Gallery/firstset-9.JPG?updatedAt=1732952918164',
    alt: 'Wedding portrait',
  },
  {
    url: 'https://ik.imagekit.io/weddingtheory/Photos/Fold%201%20Gallery%20-20241130T074354Z-001/Fold%201%20Gallery/NA401349.jpg?updatedAt=1732952914133',
    alt: 'Candid wedding moment',
  },
  {
    url: 'https://ik.imagekit.io/weddingtheory/Photos/Fold%201%20Gallery%20-20241130T074354Z-001/Fold%201%20Gallery/ADL05650.jpg?updatedAt=1732952912211',
    alt: 'Wedding celebration',
  },
  {
    url: 'https://ik.imagekit.io/weddingtheory/Photos/Fold%201%20Gallery%20-20241130T074354Z-001/Fold%201%20Gallery/DSC01108.jpg?updatedAt=1732952910857',
    alt: 'Wedding portrait',
  },
  {
    url: 'https://ik.imagekit.io/weddingtheory/Photos/Fold%201%20Gallery%20-20241130T074354Z-001/Fold%201%20Gallery/0A4A7575.jpg?updatedAt=1732952909148',
    alt: 'Couple portrait',
  },
  {
    url: 'https://ik.imagekit.io/weddingtheory/Photos/Fold%201%20Gallery%20-20241130T074354Z-001/Fold%201%20Gallery/Chaitra&SagarPreWedding-84.JPG?updatedAt=1732952907966',
    alt: 'Pre-wedding shoot',
  },
  {
    url: 'https://ik.imagekit.io/weddingtheory/Photos/Fold%201%20Gallery%20-20241130T074354Z-001/Fold%201%20Gallery/A&Rwddingcandid-63.jpg?updatedAt=1732952905089',
    alt: 'Wedding candid',
  },
  {
    url: 'https://ik.imagekit.io/weddingtheory/Photos/Fold%201%20Gallery%20-20241130T074354Z-001/Fold%201%20Gallery/ADL00547%20(1).jpg?updatedAt=1732952906662',
    alt: 'Wedding ceremony',
  },
  {
    url: 'https://ik.imagekit.io/weddingtheory/Photos/Fold%201%20Gallery%20-20241130T074354Z-001/Fold%201%20Gallery/0A4A4018.jpg?updatedAt=1732952907259',
    alt: 'Wedding portrait',
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
            unoptimized
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );
} 