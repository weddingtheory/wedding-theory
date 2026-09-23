'use client';
import React, { useRef, useState } from 'react';

const FADE_SECONDS = 1.2;

interface CrossfadeLoopVideoProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

// Loops a single video by running two stacked copies and crossfading between
// them shortly before the active one ends, so there is no hard cut/flash on loop.
export default function CrossfadeLoopVideo({
  src,
  alt,
  className = '',
  style,
}: CrossfadeLoopVideoProps) {
  const refs = useRef<(HTMLVideoElement | null)[]>([null, null]);
  const [active, setActive] = useState(0);
  const switching = useRef(false);

  const handleTimeUpdate = (i: number) => {
    if (i !== active || switching.current) return;
    const el = refs.current[i];
    if (!el || !el.duration || !isFinite(el.duration)) return;
    if (el.duration - el.currentTime > FADE_SECONDS) return;

    const next = refs.current[1 - i];
    if (!next) return;
    switching.current = true;
    next.currentTime = 0;
    next.play().catch(() => {});
    setActive(1 - i);
    // Let the fade finish, then rewind the outgoing copy so it's ready next time.
    window.setTimeout(() => {
      el.pause();
      el.currentTime = 0;
      switching.current = false;
    }, FADE_SECONDS * 1000 + 100);
  };

  return (
    <>
      {[0, 1].map((i) => (
        <video
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          src={src}
          aria-label={alt}
          aria-hidden={i !== active}
          className={`${className} transition-opacity ease-in-out ${
            i === active ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ ...style, transitionDuration: `${FADE_SECONDS}s` }}
          autoPlay={i === 0}
          preload='auto'
          muted
          playsInline
          onTimeUpdate={() => handleTimeUpdate(i)}
          // Safety net if timeupdate never caught the tail (e.g. throttled tab)
          onEnded={() => {
            if (i !== active) return;
            const el = refs.current[i];
            if (el) {
              el.currentTime = 0;
              el.play().catch(() => {});
            }
          }}
        />
      ))}
    </>
  );
}
