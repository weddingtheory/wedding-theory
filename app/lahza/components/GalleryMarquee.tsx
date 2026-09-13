'use client';

import { useState } from 'react';
import Image from 'next/image';
import ImageLightbox from '../../components/ImageLightbox';

const DEFAULT_GALLERY_IMAGES = [
  'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/compressed/0A4A2855%20Edit.jpg',
  'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/compressed/0A4A4018.jpg',
  'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/compressed/0A4A7575.jpg',
  'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/compressed/ADL02297.jpg',
  'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/compressed/NA401349.jpg',
  'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/compressed/R&DWEDDINGFIRSTLOOK-9.jpg',
  'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/herocoursel/compressed/R&JChristianWeddingFirstlook-38.jpg',
].map((url) => ({ url, alt: 'A moment from a Wedding Theory story' }));

interface GalleryMarqueeProps {
  heading?: string;
  images?: { url: string; alt: string }[];
}

export default function GalleryMarquee({
  heading = 'Explore Our Portfolio',
  images = DEFAULT_GALLERY_IMAGES,
}: GalleryMarqueeProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Duplicated once so the marquee can loop seamlessly.
  const track = [...images, ...images];

  return (
    <section className='relative bg-white overflow-hidden'>
      {/* Full-width black label bar */}
      <div className='w-full bg-black py-3 md:py-3.5'>
        <p className='text-center text-[10px] md:text-xs tracking-[0.4em] uppercase text-white'>
          {heading}
        </p>
      </div>

      <div className='relative w-full py-12 md:py-20'>
        <div className='pointer-events-none absolute inset-y-0 left-0 w-10 md:w-28 z-10 bg-gradient-to-r from-white to-transparent' />
        <div className='pointer-events-none absolute inset-y-0 right-0 w-10 md:w-28 z-10 bg-gradient-to-l from-white to-transparent' />

        <div className='marquee-track flex gap-3 md:gap-5 w-max px-3 md:px-5'>
          {track.map((img, index) => (
            <button
              key={index}
              type='button'
              onClick={() => setLightboxIndex(index % images.length)}
              className={`relative h-[52vh] md:h-[64vh] w-[64vw] sm:w-[38vw] md:w-[23vw] shrink-0 overflow-hidden cursor-zoom-in group ${
                index % 2 === 0 ? 'md:-translate-y-3' : 'md:translate-y-5'
              }`}
              aria-label='Open image'
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes='(max-width: 768px) 64vw, 23vw'
                className='object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.03]'
              />
            </button>
          ))}
        </div>
      </div>

      <ImageLightbox
        images={images.map((img) => img.url)}
        initialImageIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
      />

      <style jsx>{`
        .marquee-track {
          animation: lahza-marquee 70s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
        @keyframes lahza-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
