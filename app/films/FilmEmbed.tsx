'use client';
import React, { useEffect, useRef, useState } from 'react';

interface FilmEmbedProps {
  embedUrl: string;
  videoId: string;
  title: string;
}

const command = (el: HTMLIFrameElement | null, func: string) =>
  el?.contentWindow?.postMessage(
    JSON.stringify({ event: 'command', func, args: [] }),
    '*'
  );

// Loads the YouTube embed (muted, autoplay) only once it scrolls into view, then
// plays/pauses it as it enters/leaves. Native `loading="lazy"` + `autoplay=1`
// loads the iframe well before it's visible, so it has already started (or been
// blocked by the browser) by the time the visitor gets there.
export default function FilmEmbed({ embedUrl, videoId, title }: FilmEmbedProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const loadedRef = useRef(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!loadedRef.current) {
            loadedRef.current = true;
            setShouldLoad(true); // autoplay=1 starts it on first load
          } else {
            command(iframeRef.current, 'playVideo');
          }
        } else if (loadedRef.current) {
          command(iframeRef.current, 'pauseVideo');
        }
      },
      { threshold: 0.4 }
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  const src = `${embedUrl}?rel=0&modestbranding=1&autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&playsinline=1&enablejsapi=1`;

  return (
    <div ref={wrapRef} className='absolute inset-0'>
      {shouldLoad && (
        <iframe
          ref={iframeRef}
          className='w-full h-full absolute inset-0 transition-transform duration-700 group-hover:scale-105'
          style={{ border: 'none' }}
          src={src}
          title={title}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        />
      )}
    </div>
  );
}
