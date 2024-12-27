'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { MapPin, Calendar } from 'lucide-react';

interface Film {
  id: string;
  couple_names: string;
  title: string | null;
  description: string | null;
  location: string | null;
  video_url: string | null;
  wedding_date: string | null;
  status: string;
}

export default function Films() {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchFilms() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('films')
          .select('*')
          .order('wedding_date', { ascending: false });

        if (error) {
          return;
        }

        if (data) {
          setFilms(data);
        }
      } catch (_err) {
        // Handle error silently in production
      } finally {
        setLoading(false);
      }
    }

    fetchFilms();
  }, [supabase]);

  // Helper function to convert YouTube URL to embed URL
  const getEmbedUrl = (
    url: string | null
  ): { embedUrl: string; videoId: string } => {
    if (!url) return { embedUrl: '', videoId: '' };

    // Regular expressions for different YouTube URL formats
    const patterns = [
      // youtu.be URLs
      /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})(?:\?.*)?/,
      // youtube.com/watch URLs
      /(?:https?:\/\/)?(?:www\.|m\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})(?:&.*)?/,
      // youtube.com/embed URLs
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})(?:\?.*)?/,
      // youtube.com/v URLs
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]{11})(?:\?.*)?/,
      // youtube.com/shorts URLs
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})(?:\?.*)?/,
    ];

    // Try each pattern until we find a match
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return {
          embedUrl: `https://www.youtube.com/embed/${match[1]}`,
          videoId: match[1],
        };
      }
    }

    return { embedUrl: '', videoId: '' };
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-[#f8f5f0] flex items-center justify-center'>
        <div className='flex items-center space-x-2'>
          <div className='w-2 h-2 bg-[#68401b] rounded-full animate-bounce [animation-delay:-0.3s]'></div>
          <div className='w-2 h-2 bg-[#68401b] rounded-full animate-bounce [animation-delay:-0.15s]'></div>
          <div className='w-2 h-2 bg-[#68401b] rounded-full animate-bounce'></div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#f8f5f0]'>
      {/* Hero Video Section */}
      <section className='relative h-[50vh] sm:h-[80vh] md:h-[90vh] w-full overflow-hidden'>
        <div className='absolute inset-0 w-full h-full'>
          <video
            src='https://weddingtheory.blr1.cdn.digitaloceanspaces.com/video/insta%20flim%2001.mp4'
            className='absolute w-full h-full object-cover'
            style={{
              pointerEvents: 'none',
              transform: `translate(-50%, -50%) scale(${
                window.innerWidth < 640 ? 1.2 : 1
              })`,
              top: '50%',
              left: '50%',
            }}
            autoPlay
            muted
            loop
            playsInline
          />
          <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60'></div>
        </div>

        <div className='relative z-10 h-full flex items-center justify-center text-center text-white px-4'>
          <div className='space-y-6'>
            <h1 className='font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide font-light'>
              Wedding Films
            </h1>
            <div className='w-20 h-[1px] bg-white/60 mx-auto'></div>
            <p className='text-sm sm:text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wider opacity-90'>
              Turning weddings into the rom-coms they are
            </p>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className='py-16 sm:py-20 md:py-24 px-4 sm:px-8 bg-[#f8f5f0]'>
        <div className='max-w-7xl mx-auto space-y-24 sm:space-y-32 md:space-y-40'>
          {films && films.length > 0 ? (
            films.map((film, index) => (
              <div
                key={film.id}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-8 sm:gap-12 md:gap-16 items-center`}
              >
                {/* Video */}
                <div
                  className='w-full md:w-2/3 relative aspect-video overflow-hidden 
                              rounded-xl md:rounded-2xl
                              shadow-[0_4px_20px_rgba(0,0,0,0.08)] group'
                >
                  <iframe
                    className='w-full h-full absolute inset-0 transition-transform duration-700 
                              group-hover:scale-105'
                    style={{ border: 'none' }}
                    src={(() => {
                      const { embedUrl, videoId } = getEmbedUrl(film.video_url);
                      return embedUrl
                        ? `${embedUrl}?rel=0&modestbranding=1&autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1`
                        : '';
                    })()}
                    title={film.title || ''}
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    loading='lazy'
                    allowFullScreen
                  ></iframe>
                </div>

                {/* Content */}
                <div className='w-full md:w-1/3 text-center md:text-left pt-4 sm:pt-6 md:pt-0'>
                  <div className='space-y-6'>
                    {/* Title Section */}
                    <div className='space-y-4'>
                      <div className='space-y-2'>
                        <h2 className='font-serif text-2xl sm:text-3xl md:text-4xl tracking-wide font-light text-[#68401b]'>
                          {film.couple_names}
                        </h2>
                        {film.title && (
                          <h3 className='font-serif text-lg sm:text-xl md:text-2xl italic text-[#68401b]/80'>
                            {film.title}
                          </h3>
                        )}
                      </div>

                      {/* Location and Date */}
                      <div className='flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-sm sm:text-base'>
                        {film.location && (
                          <div className='flex items-center gap-2 text-gray-500'>
                            <MapPin className='w-4 h-4 text-[#68401b]' />
                            <span>{film.location}</span>
                          </div>
                        )}
                        {film.wedding_date && (
                          <div className='flex items-center gap-2 text-gray-500'>
                            <Calendar className='w-4 h-4 text-[#68401b]' />
                            <span>
                              {new Date(film.wedding_date).toLocaleDateString(
                                'en-US',
                                {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                }
                              )}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className='w-16 h-[1px] bg-[#D4B08C] mx-auto md:mx-0'></div>

                    {film.description && (
                      <p className='text-gray-600 font-light text-base sm:text-lg leading-relaxed'>
                        {film.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='text-center py-8'>
              <p className='text-gray-600'>No films available</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className='py-20 md:py-24 text-center bg-[#fcfaf7]'>
        <div className='max-w-4xl mx-auto px-4 space-y-8'>
          <h3 className='font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#68401b]'>
            Ready to tell your story?
          </h3>
          <p className='text-gray-600 text-lg'>
            Let us capture your special moments in our signature style
          </p>
          <Link
            href='/contact'
            className='inline-block px-10 py-4 text-base 
                      bg-[#68401b] hover:bg-[#5e4429] 
                      text-white font-medium 
                      rounded-full border border-[#D4B08C]
                      transition-all duration-300 ease-in-out
                      shadow-[0_4px_14px_0_rgba(198,160,124,0.39)]
                      hover:shadow-[0_6px_20px_rgba(198,160,124,0.45)]
                      hover:transform hover:scale-105
                      tracking-wide'
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
} 