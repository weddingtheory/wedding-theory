'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const HERO_IMAGE =
  'https://ik.imagekit.io/weddingtheory/Photos/0A4A8443-Edit.jpg?updatedAt=1730140135728';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface AnimatedHeroProps {
  eyebrow?: string;
  tagline?: string;
  backdropImage?: { url: string; alt: string };
}

export default function AnimatedHero({
  eyebrow = 'Signature Wedding Films & Photography',
  tagline = 'Every love story, told in a single unforgettable moment',
  backdropImage = { url: HERO_IMAGE, alt: 'LAHZA by Wedding Theory' },
}: AnimatedHeroProps) {
  return (
    <section className='relative bg-white pt-16 md:pt-24 pb-16 md:pb-20 overflow-hidden'>
      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className='relative z-30 text-center text-[11px] md:text-sm tracking-[0.35em] text-neutral-500 uppercase mb-4 md:mb-6 px-4'
      >
        {eyebrow}
      </motion.p>

      {/* Wordmark with a soft photographic backdrop behind it */}
      <div className='relative flex items-center justify-center px-4'>
        {/* Backdrop image — faded, sits behind the type, edges dissolve into the page */}
        <motion.div
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
          className='absolute z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] sm:w-[70%] md:w-[52%] aspect-[4/3]'
          style={{
            maskImage:
              'radial-gradient(ellipse 60% 60% at 50% 50%, black 40%, transparent 78%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 60% 60% at 50% 50%, black 40%, transparent 78%)',
          }}
        >
          <Image
            src={backdropImage.url}
            alt={backdropImage.alt}
            fill
            priority
            sizes='(max-width: 768px) 92vw, 52vw'
            className='object-cover opacity-40'
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
          className='relative z-20 select-none text-neutral-900 leading-[1.15] text-center [font-family:var(--font-lahza-script)]'
          style={{ fontSize: 'clamp(4.5rem, 17vw, 12.5rem)' }}
        >
          Lahza
        </motion.h1>
      </div>

      {/* Subtitle + underline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className='relative z-30 flex flex-col items-center pt-10 md:pt-14 px-4'
      >
        <p className='italic text-lg md:text-2xl text-neutral-600 text-center [font-family:var(--font-lahza-display)]'>
          {tagline}
        </p>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '64px' }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className='h-[2px] bg-[#68401b] mt-6'
        />
      </motion.div>
    </section>
  );
}
