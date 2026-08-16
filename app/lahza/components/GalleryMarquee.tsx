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
  heading = "Every Story We've Held",
  images = DEFAULT_GALLERY_IMAGES,
}: GalleryMarqueeProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Duplicated once so the marquee can loop seamlessly.
  const track = [...images, ...images];

  return (
    <section className='relative min-h-screen flex flex-col justify-center bg-white py-20 md:py-24 overflow-hidden'>
      <div className='max-w-[1400px] mx-auto px-4 mb-12 md:mb-16 text-center'>
        <h2 className='text-3xl md:text-5xl text-neutral-900 [font-family:var(--font-lahza-display)] font-medium'>
          {heading}
        </h2>
      </div>

      <div className='relative w-full'>
        <div className='pointer-events-none absolute inset-y-0 left-0 w-16 md:w-40 z-10 bg-gradient-to-r from-white to-transparent' />
        <div className='pointer-events-none absolute inset-y-0 right-0 w-16 md:w-40 z-10 bg-gradient-to-l from-white to-transparent' />

        <div className='marquee-track flex gap-5 md:gap-8 w-max'>
          {track.map((img, index) => (
            <button
              key={index}
              type='button'
              onClick={() => setLightboxIndex(index % images.length)}
              className='relative h-[62vw] max-h-[70vh] w-[78vw] sm:w-[48vw] md:w-[34vw] shrink-0 overflow-hidden shadow-[0_25px_60px_-20px_rgba(0,0,0,0.35)] cursor-zoom-in group'
              aria-label='Open image'
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes='(max-width: 768px) 78vw, 34vw'
                className='object-cover transition-transform duration-700 group-hover:scale-[1.03]'
              />
              <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500' />
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
          animation: lahza-marquee 130s linear infinite;
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
