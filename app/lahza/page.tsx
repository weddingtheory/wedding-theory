'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

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

  // Icons
  const cameraIcon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-6 w-6 text-white'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'
      />
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M15 13a3 3 0 11-6 0 3 3 0 016 0z'
      />
    </svg>
  );

  const filmIcon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-6 w-6 text-white'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
      />
    </svg>
  );

  const musicIcon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-6 w-6 text-white'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3'
      />
    </svg>
  );

  const printIcon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-6 w-6 text-white'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
      />
    </svg>
  );

  return (
    <div className='flex flex-col min-h-screen bg-[#f8f5f0]'>
      <main className='flex-grow'>
        <AnimatedHero />
        
        {/* Add LAHZA heading below hero */}
        <div className='text-center py-16'>
          <div className="relative inline-block">
            <motion.div className="overflow-hidden">
              {/* Individual letters with stagger animation */}
              <motion.h1 
                className='text-5xl md:text-6xl tracking-[0.3em] font-serif text-gray-800'
              >
                {'LAHZA'.split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.7,
                      delay: index * 0.1,
                      ease: [0.33, 1, 0.68, 1]  // Custom easing
                    }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.h1>
            </motion.div>

            {/* Single elegant underline */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{
                duration: 1,
                delay: 0.7,
                ease: [0.33, 1, 0.68, 1]
              }}
              className="absolute left-0 right-0 mx-auto -bottom-4 h-[2px] bg-gradient-to-r from-transparent via-[#68401b] to-transparent"
            />
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 1.2,
              ease: [0.33, 1, 0.68, 1]
            }}
            className='text-xl text-gray-700 mt-8 tracking-wide'
          >
            Signature Weddings by Wedding Theory
          </motion.p>
        </div>

        

        {/* Visual Artistry Section */}
        <section className='bg-white py-20 md:py-32'>
          <div className='max-w-[1400px] mx-auto px-4'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className='font-serif text-4xl md:text-5xl text-center text-gray-800 mb-16'
            >
              Visual Artistry
            </motion.h2>
            <div className='flex flex-col gap-16'>
              <AnimatedServiceCard
                title='Candid Photography'
                description='Relive an authentic moment with our candid photography! Our team of 2-3 technical experts brings hands-on expertise, a sharp eye for detail, and swift presence of mind to capture every precious moment using the photojournalistic method.'
                icon={cameraIcon}
                media={
                  <div className='aspect-[4/3] relative rounded-2xl overflow-hidden shadow-md group'>
                    <div className='relative w-full h-full'>
                      {/* Current Image */}
                      <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: isTransitioning ? 0 : 1 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={images[currentImageIndex]}
                          alt='Candid Photography'
                          fill
                          className='object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700'
                          priority
                        />
                      </motion.div>

                      {/* Overlay with gradient */}
                      <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

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
                                ${currentImageIndex === index 
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
                              setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
                              setIsTransitioning(false);
                            }, 300);
                          }}
                          className='p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors duration-300'
                          aria-label="Previous image"
                        >
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        
                        <button
                          onClick={() => {
                            setIsTransitioning(true);
                            setTimeout(() => {
                              setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
                              setIsTransitioning(false);
                            }, 300);
                          }}
                          className='p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors duration-300'
                          aria-label="Next image"
                        >
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                }
              />

              <AnimatedServiceCard
                title='Film'
                description="Imagine your love story as the most romantic movie you've ever seen! With 10+ years of industry experience, our film experts create cinematic masterpieces that capture the essence of your special day."
                icon={filmIcon}
                media={
                  <div className='aspect-[4/3] relative rounded-2xl overflow-hidden shadow-md'>
                    <iframe
                      src='https://www.youtube.com/embed/flUyMnitCj4?autoplay=1&mute=1&loop=1&playlist=flUyMnitCj4'
                      className='absolute inset-0 w-full h-full'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                    />
                  </div>
                }
                reverse
              />
            </div>
          </div>
        </section>

        {/* Enhanced Services Section */}
        <section className='py-20 md:py-32'>
          <div className='max-w-[1400px] mx-auto px-4'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className='font-serif text-4xl md:text-5xl text-center text-gray-800 mb-16'
            >
              Signature Elements
            </motion.h2>
            <div className='flex flex-col gap-16'>
              <AnimatedServiceCard
                title='Music'
                description='Your wedding film deserves a unique soundtrack. We collaborate with independent artists to compose an original track for your fairy tale story.'
                icon={musicIcon}
                media={
                  <iframe
                    style={{ borderRadius: '12px' }}
                    src='https://open.spotify.com/embed/track/4AM44o1sPhmoWHjt7GmpSl?utm_source=generator&theme=0'
                    width='100%'
                    height='352'
                    frameBorder='0'
                    allowFullScreen
                    allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
                    loading='lazy'
                  ></iframe>
                }
              />

              <AnimatedServiceCard
                title='Print'
                description='Let us help you create a timeless wedding album. Our in-house experts craft custom-made albums with professionally designed templates ensuring your memories are preserved in elegant style.'
                icon={printIcon}
                media={
                  <div className='aspect-[4/3] relative rounded-2xl overflow-hidden shadow-md'>
                    <Image
                      src='https://cdn0.weddingwire.in/article/7121/3_2/1280/jpg/91217-indian-wedding-album-design-mili-ghosh-lead.jpeg'
                      alt='Wedding Album'
                      fill
                      className='object-cover'
                      unoptimized
                    />
                  </div>
                }
                reverse
              />
            </div>
          </div>
        </section>

        {/* Updated CTA Section */}
        <section className='relative py-24 md:py-32 px-4 bg-[#f8f5f0] overflow-hidden'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className='max-w-4xl mx-auto text-center'
          >
            <h2 className='font-serif text-4xl md:text-5xl mb-6 text-gray-800'>
              Let&apos;s Create Your Story Together
            </h2>
            <p className='font-sans text-lg md:text-xl mb-12 leading-relaxed text-gray-700'>
              Every love story is unique. Let us help you preserve yours in the
              most beautiful way possible.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href='/contact'
                className='inline-block px-10 py-3.5 text-sm md:text-base 
                    bg-[#68401b] hover:bg-[#5e4429] 
                    text-white font-medium 
                    rounded-full border border-[#D4B08C]
                    transition-all duration-300 ease-in-out
                    shadow-[0_4px_14px_0_rgba(198,160,124,0.39)]
                    hover:shadow-[0_6px_20px_rgba(198,160,124,0.45)]
                    tracking-wide'
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
