'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const FALLBACK_IMAGES = [
  {
    url: 'https://ik.imagekit.io/weddingtheory/Photos/0A4A8443-Edit.jpg?updatedAt=1730140135728',
    alt: 'LAHZA by Wedding Theory',
  },
];

interface AnimatedHeroProps {
  // The full-bleed slideshow. Cross-fades to the next image every 2s.
  images?: { url: string; alt: string }[];
  // Kept subtle and centered — the image is the hero, not the type.
  wordmark?: string;
}

export default function AnimatedHero({
  images = FALLBACK_IMAGES,
  wordmark = 'Lahza',
}: AnimatedHeroProps) {
  const slides = images.length > 0 ? images : FALLBACK_IMAGES;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 2000);
    return () => clearInterval(id);
  }, [slides.length]);

  const current = slides[index % slides.length];

  return (
    <section className='relative h-[100svh] w-full overflow-hidden bg-black'>
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className='absolute inset-0'
        >
          <Image
            src={current.url}
            alt={current.alt}
            fill
            priority
            sizes='100vw'
            className='object-cover'
          />
        </motion.div>
      </AnimatePresence>

      {/* Gentle wash so the wordmark stays legible over any frame */}
      <div className='absolute inset-0 bg-black/25' />

      <div className='absolute inset-0 flex items-center justify-center px-4'>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, delay: 0.4 }}
          className='select-none text-center font-normal text-white/75'
          style={{
            fontFamily:
              'var(--font-lahza-achilo), var(--font-lahza-display), Georgia, serif',
            fontSize: 'clamp(2rem, 6vw, 4.5rem)',
            letterSpacing: '0.18em',
          }}
        >
          {wordmark}
        </motion.h1>
      </div>
    </section>
  );
}
