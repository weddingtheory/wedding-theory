'use client';

import { motion } from 'framer-motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const DEFAULT_VIDEO_URL =
  'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/video/WEB1%202%20compressed.mp4';

interface CinematicMomentProps {
  // null/undefined keeps the styled two-line "In Motion, / Forever Held"
  // heading below; a CMS-provided heading renders as plain text instead.
  heading?: string | null;
  videoUrl?: string;
}

export default function CinematicMoment({
  heading = null,
  videoUrl = DEFAULT_VIDEO_URL,
}: CinematicMomentProps) {
  return (
    <section className='relative bg-white py-24 md:py-36 overflow-hidden'>
      <div className='relative'>
        {/* Video bleeds off the right edge of the screen, offset from center */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.1, ease: EASE }}
          className='relative ml-0 md:ml-[16%] lg:ml-[22%] w-full md:w-[84%] lg:w-[78%] aspect-[16/10] md:aspect-[16/9] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.4)]'
        >
          <video
            src={videoUrl}
            className='absolute inset-0 w-full h-full object-cover contrast-[1.02]'
            autoPlay
            muted
            loop
            playsInline
          />
        </motion.div>

        {/* Oversized serif line overlapping the video's left edge */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          className='relative md:absolute z-10 md:left-0 md:bottom-10 mt-8 md:mt-0 mx-auto md:mx-0 max-w-[80%] sm:max-w-[60%] md:max-w-[40%] text-center md:text-left text-4xl sm:text-5xl md:text-6xl leading-[0.95] text-neutral-900 [font-family:var(--font-lahza-display)] font-medium'
        >
          {heading ?? (
            <>
              In Motion,
              <br />
              <span className='[font-family:var(--font-lahza-script)] text-[1.3em] leading-none'>
                Forever Held
              </span>
            </>
          )}
        </motion.h2>
      </div>
    </section>
  );
}
