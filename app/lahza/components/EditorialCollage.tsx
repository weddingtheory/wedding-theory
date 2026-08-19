'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const DEFAULT_IMAGES = [
  {
    url: 'https://ik.imagekit.io/weddingtheory/Photos/S&CPREWEDFIRSTSET-6.JPG?updatedAt=1730140170874',
    alt: 'A quiet moment before the vows',
  },
  {
    url: 'https://ik.imagekit.io/weddingtheory/Photos/M&PEngagement-245%20(1).jpg?updatedAt=1730140149027',
    alt: 'A candid laugh, kept forever',
  },
];

const DEFAULT_VIDEO = {
  url: 'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/video/sonali%20samip%20website%20run%202.mov',
  alt: 'A Lahza Worth Keeping',
};

interface EditorialCollageProps {
  eyebrow?: string;
  // null/undefined keeps the styled quote below with its script-font
  // emphasis; a CMS-provided quote renders as plain text instead.
  quote?: string | null;
  images?: { url: string; alt: string }[];
  video?: { url: string; alt: string };
}

export default function EditorialCollage({
  eyebrow = 'A Lahza Worth Keeping',
  quote = null,
  images = DEFAULT_IMAGES,
  video = DEFAULT_VIDEO,
}: EditorialCollageProps) {
  const [firstImage, secondImage] = images.length >= 2 ? images : DEFAULT_IMAGES;

  return (
    <section className='relative bg-white py-24 md:py-36 overflow-hidden'>
      <div className='max-w-[1400px] mx-auto px-4'>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className='text-xs tracking-[0.35em] text-neutral-500 uppercase mb-14 md:mb-20 text-center'
        >
          {eyebrow}
        </motion.p>

        <div className='grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center'>
          {/* Two stacked images */}
          <div className='md:col-span-4 flex flex-col gap-6 md:gap-8'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
              className='relative aspect-[4/5] w-[85%] mx-auto md:mx-0 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.3)]'
            >
              <Image
                src={firstImage.url}
                alt={firstImage.alt}
                fill
                sizes='(max-width: 768px) 85vw, 28vw'
                className='object-cover'
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
              className='relative aspect-[3/4] w-[85%] mx-auto md:ml-auto md:mr-0 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.3)]'
            >
              <Image
                src={secondImage.url}
                alt={secondImage.alt}
                fill
                sizes='(max-width: 768px) 85vw, 28vw'
                className='object-cover'
              />
            </motion.div>
          </div>

          {/* Video with an overlapping quote */}
          <div className='md:col-span-8 relative mt-4 md:mt-0'>
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: EASE }}
              className='relative aspect-[16/10] shadow-[0_40px_80px_-25px_rgba(0,0,0,0.35)]'
            >
              <video
                src={video.url}
                aria-label={video.alt}
                className='absolute inset-0 w-full h-full object-cover'
                autoPlay
                muted
                loop
                playsInline
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent' />
            </motion.div>

            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
              className='relative md:absolute md:-left-6 lg:-left-14 md:bottom-10 mt-6 md:mt-0 max-w-[90%] md:max-w-[70%] text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-neutral-900 md:text-white [font-family:var(--font-lahza-display)] font-medium px-6 md:px-0'
            >
              {quote ?? (
                <>
                  &ldquo;Somewhere between the vows and the very last dance,{' '}
                  <span className='[font-family:var(--font-lahza-script)] text-[1.3em] leading-none'>
                    forever begins
                  </span>
                  .&rdquo;
                </>
              )}
            </motion.blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
