'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const DEFAULT_VIDEOS = [
  {
    url: 'https://weddingtheory.blr1.cdn.digitaloceanspaces.com/video/WEB1%202%20compressed.mp4',
    alt: 'A cinematic moment from a Wedding Theory story',
  },
];

interface CinematicMomentProps {
  // null/undefined keeps the styled two-line "In Motion, / Forever Held"
  // heading below; a CMS-provided heading renders as plain text instead.
  heading?: string | null;
  videos?: { url: string; alt: string }[];
}

export default function CinematicMoment({
  heading = null,
  videos: videosProp = DEFAULT_VIDEOS,
}: CinematicMomentProps) {
  const videos = videosProp.length > 0 ? videosProp : DEFAULT_VIDEOS;
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // When the active video finishes, hand off to the next one — wrapping
  // back to the first once the last video in the list ends.
  const advance = () => {
    setActiveIndex((prev) => (prev + 1) % videos.length);
  };

  useEffect(() => {
    // (Re)start whichever video just became active — this fires on mount
    // and every time we loop back to a video that already played once.
    const active = videoRefs.current[activeIndex];
    if (active) {
      active.currentTime = 0;
      active.play().catch(() => {});
    }
    // Keep every other video paused so nothing plays silently underneath.
    videoRefs.current.forEach((el, i) => {
      if (el && i !== activeIndex) el.pause();
    });
  }, [activeIndex]);

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
          {videos.map((video, i) => {
            // Only fully preload the video that's showing and the one
            // that's up next, so a long CMS-uploaded list doesn't try to
            // buffer every clip at once.
            const isNeighbor =
              i === activeIndex || i === (activeIndex + 1) % videos.length;
            return (
              <video
                key={`${video.url}-${i}`}
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                src={video.url}
                aria-label={video.alt}
                className={`absolute inset-0 w-full h-full object-cover contrast-[1.02] transition-opacity duration-1000 ease-in-out ${
                  i === activeIndex ? 'opacity-100' : 'opacity-0'
                }`}
                muted
                playsInline
                loop={videos.length === 1}
                preload={isNeighbor ? 'auto' : 'metadata'}
                onEnded={advance}
              />
            );
          })}
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
