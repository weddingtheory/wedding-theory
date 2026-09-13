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
    <section className='relative bg-white overflow-hidden'>
      <div className='relative'>
        {/* Full-bleed, edge-to-edge video */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.1, ease: EASE }}
          className='relative w-full h-[100svh]'
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

          {/* Scrim so the overlaid heading stays legible against any frame */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent pointer-events-none' />

          {/* Heading sits directly on the video, bottom-left */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            className='absolute left-5 right-5 sm:right-auto bottom-6 md:left-10 md:bottom-10 z-10 max-w-[90%] sm:max-w-[70%] md:max-w-[55%] text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-white [font-family:var(--font-lahza-display)] font-normal [text-shadow:0_4px_28px_rgba(0,0,0,0.45)]'
          >
            {heading ?? (
              <>
                In Motion,
                <br />
                Forever Held
              </>
            )}
          </motion.h2>
        </motion.div>
      </div>
    </section>
  );
}
