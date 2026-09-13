'use client';

import { motion } from 'framer-motion';
import localFont from 'next/font/local';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, type CSSProperties } from 'react';
import dynamic from 'next/dynamic';
import { useLahzaContent } from './lahzaContent';

// Achilo — the one typeface for the whole LAHZA page (headings, body, the
// hero wordmark, everything). Single weight, no italics. Glyph set is
// ASCII-only, so Georgia is the fallback for em-dashes and curly quotes.
const lahzaAchilo = localFont({
  src: './ACHILO.otf',
  variable: '--font-lahza-achilo',
  display: 'swap',
});

// Dynamically import heavy components
const AnimatedHero = dynamic(() => import('./components/AnimatedHero'), {
  ssr: false,
});
const AnimatedServiceCard = dynamic(
  () => import('./components/AnimatedServiceCard'),
  {
    ssr: false,
  }
);
const GalleryMarquee = dynamic(() => import('./components/GalleryMarquee'), {
  ssr: false,
});
const CinematicMoment = dynamic(
  () => import('./components/CinematicMoment'),
  { ssr: false }
);

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Lahza() {
  const content = useLahzaContent();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const photographyImages = content.visualArtistry.photography.images;

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [photographyImages.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % photographyImages.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [photographyImages.length]);

  return (
    <div
      className={`${lahzaAchilo.variable} flex flex-col min-h-screen bg-white`}
      style={
        {
          // Achilo is the display face — it drives every heading/title/wordmark
          // via these vars. Body copy stays in the site's readable Gotu.
          '--font-lahza-display': `${lahzaAchilo.style.fontFamily}, Georgia, serif`,
          '--font-lahza-script': `${lahzaAchilo.style.fontFamily}, Georgia, serif`,
        } as CSSProperties
      }
    >
      <main className='flex-grow'>
        <AnimatedHero images={content.hero.images} />

        {/* Manifesto — editorial, type-only */}
        <section className='relative bg-white py-24 md:py-40 overflow-hidden'>
          <div className='max-w-4xl mx-auto px-4 text-center'>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className='text-xs md:text-sm tracking-[0.35em] uppercase text-neutral-500 mb-10 md:mb-14'
            >
              {content.manifesto.byline}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
              className='[font-family:var(--font-lahza-display)] text-neutral-900 font-normal leading-[1.25] text-3xl sm:text-4xl md:text-[3.4rem]'
            >
              {content.manifesto.quote ??
                'A lahza is the moment your hands touched for the first time as one — brief, unrepeated, and yours.'}
            </motion.h2>
          </div>
        </section>

        <GalleryMarquee
          heading={content.gallery.heading}
          images={content.gallery.images}
        />

        <CinematicMoment
          heading={content.cinematicMoment.heading}
          videos={content.cinematicMoment.videos}
        />

        {/* Visual Artistry Section */}
        <section id='artistry' className='py-20 md:py-32'>
          <div className='max-w-[1400px] mx-auto px-4'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className='text-4xl md:text-5xl text-center text-neutral-900 mb-16 md:mb-20 [font-family:var(--font-lahza-display)] font-normal'
            >
              {content.visualArtistry.heading}
            </motion.h2>
            <div className='flex flex-col gap-16 md:gap-20'>
              <AnimatedServiceCard
                index='01'
                eyebrow={content.visualArtistry.photography.eyebrow}
                title={content.visualArtistry.photography.title}
                description={content.visualArtistry.photography.description}
                media={
                  <div className='aspect-[4/3] relative overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.25)] group'>
                    <div className='relative w-full h-full'>
                      {/* Current Image */}
                      <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: isTransitioning ? 0 : 1 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className='absolute inset-0'
                      >
                        <Image
                          src={
                            photographyImages[
                              currentImageIndex % photographyImages.length
                            ].url
                          }
                          alt={
                            photographyImages[
                              currentImageIndex % photographyImages.length
                            ].alt
                          }
                          fill
                          className='object-cover contrast-[1.02] transform scale-100 group-hover:scale-105 transition-transform duration-700'
                          priority
                        />
                      </motion.div>

                      {/* Overlay with gradient */}
                      <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

                      {/* Navigation Dots */}
                      <div className='absolute bottom-4 left-0 right-0 z-10'>
                        <div className='flex justify-center gap-3'>
                          {photographyImages.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setIsTransitioning(true);
                                setTimeout(() => {
                                  setCurrentImageIndex(index);
                                  setIsTransitioning(false);
                                }, 300);
                              }}
                              className={`w-2.5 h-2.5 rounded-full transition-all duration-500
                                ${
                                  currentImageIndex === index
                                    ? 'bg-white scale-125 shadow-lg'
                                    : 'bg-white/50 hover:bg-white/70'
                                }`}
                              aria-label={`Go to slide ${index + 1}`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Left/Right Navigation Arrows */}
                      <div className='absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        <button
                          onClick={() => {
                            setIsTransitioning(true);
                            setTimeout(() => {
                              setCurrentImageIndex((prev) =>
                                prev === 0
                                  ? photographyImages.length - 1
                                  : prev - 1
                              );
                              setIsTransitioning(false);
                            }, 300);
                          }}
                          className='p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors duration-300'
                          aria-label='Previous image'
                        >
                          <svg
                            className='w-6 h-6 text-white'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M15 19l-7-7 7-7'
                            />
                          </svg>
                        </button>

                        <button
                          onClick={() => {
                            setIsTransitioning(true);
                            setTimeout(() => {
                              setCurrentImageIndex((prev) =>
                                prev === photographyImages.length - 1
                                  ? 0
                                  : prev + 1
                              );
                              setIsTransitioning(false);
                            }, 300);
                          }}
                          className='p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors duration-300'
                          aria-label='Next image'
                        >
                          <svg
                            className='w-6 h-6 text-white'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M9 5l7 7-7 7'
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                }
              />

              <AnimatedServiceCard
                index='02'
                eyebrow={content.visualArtistry.film.eyebrow}
                title={content.visualArtistry.film.title}
                description={content.visualArtistry.film.description}
                media={
                  <div className='aspect-[4/3] relative overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.25)] contrast-[1.02]'>
                    {content.visualArtistry.film.video ? (
                      <video
                        src={content.visualArtistry.film.video.url}
                        aria-label={content.visualArtistry.film.video.alt}
                        className='absolute inset-0 w-full h-full object-cover'
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <iframe
                        src='https://www.youtube.com/embed/flUyMnitCj4?autoplay=1&mute=1&loop=1&playlist=flUyMnitCj4&cc_load_policy=1&cc_lang_pref=en'
                        className='absolute inset-0 w-full h-full'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                        title='Wedding Theory Cinematic Film'
                      />
                    )}
                  </div>
                }
                reverse
              />
            </div>
          </div>
        </section>

        {/* The Finer Details */}
        <section className='bg-white py-20 md:py-32'>
          <div className='max-w-[1400px] mx-auto px-4'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className='text-4xl md:text-5xl text-center text-neutral-900 mb-16 md:mb-20 [font-family:var(--font-lahza-display)] font-normal'
            >
              {content.finerDetails.heading}
            </motion.h2>
            <div className='flex flex-col gap-16 md:gap-20'>
              <AnimatedServiceCard
                index='03'
                eyebrow={content.finerDetails.music.eyebrow}
                title={content.finerDetails.music.title}
                description={content.finerDetails.music.description}
                media={
                  <div className='contrast-[1.02]'>
                    <iframe
                      src={content.finerDetails.music.spotifyEmbedUrl}
                      width='100%'
                      height='352'
                      frameBorder='0'
                      allowFullScreen
                      allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
                      loading='lazy'
                    ></iframe>
                  </div>
                }
              />
            </div>
          </div>
        </section>

        {/* Featured In */}
        <section className='bg-white py-20 md:py-28 px-4 border-t border-neutral-100'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='max-w-5xl mx-auto text-center'
          >
            <p className='text-xs md:text-sm tracking-[0.35em] uppercase text-neutral-500 mb-12 md:mb-14'>
              As Featured In
            </p>

            {/* Real feature — Canadian Bride Guide covered the Shefali & Eugene wedding */}
            <div className='mx-auto max-w-2xl border-t border-b border-neutral-200 py-9 md:py-10'>
              <p className='[font-family:var(--font-lahza-display)] text-2xl md:text-3xl text-neutral-900'>
                Canadian Bride Guide
              </p>
              <p className='mt-4 text-neutral-600 text-[15px] md:text-base leading-relaxed'>
                &ldquo;A Love Without Borders: Shefali &amp; Eugene&rsquo;s
                Global Celebration of Culture, Connection, and
                Commitment&rdquo;
              </p>
              <div className='mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs tracking-[0.2em] uppercase'>
                <a
                  href='https://www.canadianbrideguide.com/wedspo/a-love-without-borders-shefali-amp-eugenes-global-celebration-of-culture-connection-and-commitment'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-neutral-900 underline underline-offset-4 hover:text-neutral-500 transition-colors'
                >
                  Read the Feature
                </a>
                <Link
                  href='/wedding_journal/shefali-eugene-a-wedding-that-brought-two-worlds-together'
                  className='text-neutral-500 underline underline-offset-4 hover:text-neutral-900 transition-colors'
                >
                  View the Wedding Story
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className='relative py-24 md:py-32 px-4 bg-white overflow-hidden'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='max-w-3xl mx-auto text-center'
          >
            <h2 className='text-4xl md:text-5xl mb-6 text-neutral-900 [font-family:var(--font-lahza-display)] font-normal'>
              {content.cta.heading}
            </h2>
            <p className='text-lg md:text-xl mb-12 leading-relaxed text-neutral-600'>
              {content.cta.subtext}
            </p>
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className='inline-block'
            >
              <Link
                href='/contact'
                className='group relative inline-block px-12 py-4 text-xs md:text-sm
                    bg-black hover:bg-neutral-800
                    text-white font-medium
                    rounded-full
                    transition-all duration-500 ease-out
                    shadow-[0_15px_40px_-12px_rgba(0,0,0,0.5)]
                    hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6)]
                    hover:-translate-y-0.5
                    tracking-[0.2em] uppercase
                    overflow-hidden'
              >
                <span className='relative z-10'>{content.cta.buttonLabel}</span>
                {/* premium shine sweep */}
                <span className='absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12' />
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
