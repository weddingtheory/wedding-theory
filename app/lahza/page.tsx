'use client';

import { motion } from 'framer-motion';
import { Cormorant, Parisienne } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Scoped display serif for LAHZA only — the rest of the site keeps Gotu.
// Cormorant: delicate, high-contrast, elegant — refined rather than loud.
const lahzaDisplay = Cormorant({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-lahza-display',
});

// A delicate flowing script reserved for single emphasized words/phrases
// inside pull-quotes — used sparingly, never split into letters.
const lahzaScript = Parisienne({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-lahza-script',
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
const EditorialCollage = dynamic(
  () => import('./components/EditorialCollage'),
  { ssr: false }
);

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Lahza() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const images = [
    "https://ik.imagekit.io/weddingtheory/Photos/01%20copy.jpg?updatedAt=1730140124794",
    "https://ik.imagekit.io/weddingtheory/Photos/T&DFIRSTSET-6.JPG?updatedAt=1730206583483",
    "https://ik.imagekit.io/weddingtheory/Photos/S&CPREWEDFIRSTSET-6.JPG?updatedAt=1730140170874",
    "https://ik.imagekit.io/weddingtheory/Photos/M&PEngagement-245%20(1).jpg?updatedAt=1730140149027"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      className={`${lahzaDisplay.variable} ${lahzaScript.variable} flex flex-col min-h-screen bg-white`}
    >
      <main className='flex-grow'>
        <AnimatedHero />

        {/* Manifesto */}
        <section className='relative bg-white py-24 md:py-40 overflow-hidden'>
          <div className='max-w-[1400px] mx-auto px-4'>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center'>
              <div className='md:col-span-7 relative'>
                <span
                  aria-hidden
                  className='absolute -top-8 md:-top-16 -left-2 md:-left-6 text-[7rem] md:text-[11rem] leading-none text-[#68401b]/15 [font-family:var(--font-lahza-display)] select-none pointer-events-none'
                >
                  &ldquo;
                </span>
                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                  className='relative text-3xl sm:text-4xl md:text-6xl leading-[1.25] text-neutral-900 [font-family:var(--font-lahza-display)] font-medium'
                >
                  A lahza is the moment your hands touched for the first time
                  as one — brief, unrepeated, and{' '}
                  <span className='[font-family:var(--font-lahza-script)] text-[1.5em] text-[#68401b] leading-none'>
                    yours forever
                  </span>
                  . We exist to hold onto it, beautifully.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className='mt-10 md:mt-14 text-xs tracking-[0.35em] uppercase text-neutral-400'
                >
                  — Wedding Theory
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE }}
                className='md:col-span-5'
              >
                <div className='aspect-[3/4] relative shadow-[0_30px_60px_-15px_rgba(0,0,0,0.25)]'>
                  <Image
                    src='https://ik.imagekit.io/weddingtheory/Photos/T&DFIRSTSET-6.JPG?updatedAt=1730206583483'
                    alt='A quiet moment, captured'
                    fill
                    sizes='(max-width: 768px) 100vw, 38vw'
                    className='object-cover contrast-[1.02]'
                  />
                </div>
                <p className='mt-5 text-center text-[11px] tracking-[0.3em] uppercase text-neutral-400'>
                  A Wedding, Once Lived
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <GalleryMarquee />

        <CinematicMoment />

        {/* Visual Artistry Section */}
        <section id='artistry' className='py-20 md:py-32'>
          <div className='max-w-[1400px] mx-auto px-4'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className='text-4xl md:text-5xl text-center text-neutral-900 mb-16 md:mb-20 [font-family:var(--font-lahza-display)] font-medium'
            >
              Visual Artistry
            </motion.h2>
            <div className='flex flex-col gap-16 md:gap-20'>
              <AnimatedServiceCard
                index='01'
                eyebrow='Photography'
                title='The Unscripted Moment'
                description='Relive every stolen glance and unguarded laugh. Our photographers move quietly through your day, two or three artists deep, trained to find the moment before you know it is happening — and keep it forever.'
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
                          src={images[currentImageIndex]}
                          alt='Candid Photography'
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
                          {images.map((_, index) => (
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
                                prev === 0 ? images.length - 1 : prev - 1
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
                                prev === images.length - 1 ? 0 : prev + 1
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
                eyebrow='Film'
                title='A Love Story, Directed by Life'
                description='Imagine the most beautiful film you have ever seen — and it is yours. With over a decade behind the lens, our filmmakers weave your wedding into a cinematic heirloom, scored and paced like the romance it is.'
                media={
                  <div className='aspect-[4/3] relative overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.25)] contrast-[1.02]'>
                    <iframe
                      src='https://www.youtube.com/embed/flUyMnitCj4?autoplay=1&mute=1&loop=1&playlist=flUyMnitCj4&cc_load_policy=1&cc_lang_pref=en'
                      className='absolute inset-0 w-full h-full'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                      title='Wedding Theory Cinematic Film'
                    />
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
              className='text-4xl md:text-5xl text-center text-neutral-900 mb-16 md:mb-20 [font-family:var(--font-lahza-display)] font-medium'
            >
              The Finer Details
            </motion.h2>
            <div className='flex flex-col gap-16 md:gap-20'>
              <AnimatedServiceCard
                index='03'
                eyebrow='Music'
                title='The Sound of Your Story'
                description='Every great love story deserves its own score. We collaborate with independent composers to create an original piece written only for you — a melody as singular as your fairytale.'
                media={
                  <div className='contrast-[1.02]'>
                    <iframe
                      src='https://open.spotify.com/embed/track/4AM44o1sPhmoWHjt7GmpSl?utm_source=generator&theme=0'
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

              <AnimatedServiceCard
                index='04'
                eyebrow='Print'
                title='Bound in Forever'
                description='Some moments are meant to be held, not scrolled past. Our in-house artisans design and craft heirloom albums by hand, so your story lives on a shelf, not just a server.'
                media={
                  <div className='aspect-[4/3] relative overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.25)]'>
                    <Image
                      src='https://cdn0.weddingwire.in/article/7121/3_2/1280/jpg/91217-indian-wedding-album-design-mili-ghosh-lead.jpeg'
                      alt='Wedding Album'
                      fill
                      className='object-cover contrast-[1.02]'
                      unoptimized
                    />
                  </div>
                }
                reverse
              />
            </div>
          </div>
        </section>

        <EditorialCollage />

        {/* CTA Section */}
        <section className='relative py-24 md:py-32 px-4 bg-white overflow-hidden'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='max-w-3xl mx-auto text-center'
          >
            <h2 className='text-4xl md:text-5xl mb-6 text-neutral-900 [font-family:var(--font-lahza-display)] font-medium italic'>
              Let&apos;s Write Your Chapter
            </h2>
            <p className='font-sans text-lg md:text-xl mb-12 leading-relaxed text-neutral-600'>
              Every love story deserves to be told beautifully, and kept
              forever. Let us begin yours.
            </p>
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className='inline-block'
            >
              <Link
                href='/contact'
                className='group relative inline-block px-12 py-4 text-xs md:text-sm
                    bg-[#68401b] hover:bg-[#7a4d22]
                    text-white font-medium
                    rounded-full
                    transition-all duration-500 ease-out
                    shadow-[0_15px_40px_-12px_rgba(104,64,27,0.6)]
                    hover:shadow-[0_20px_50px_-10px_rgba(104,64,27,0.7)]
                    hover:-translate-y-0.5
                    tracking-[0.2em] uppercase
                    overflow-hidden'
              >
                <span className='relative z-10'>Begin Your Story</span>
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
