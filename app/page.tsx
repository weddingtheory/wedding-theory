'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import WeddingLogo from '../public/weddinglogo.png';
import dynamic from 'next/dynamic';

// Dynamically import heavy components
const AnimatedSection = dynamic(() => import('./components/AnimatedSection'), {
  ssr: false,
});
const Carousel = dynamic(() => import('./components/Carousel'), {
  ssr: false,
});
const ImageCarousel = dynamic(() => import('./components/ImageCarousel'), {
  ssr: false,
});
const AnimatedStats = dynamic(() => import('./components/AnimatedStats'), {
  ssr: false,
});
const WeddingGalleryCarousel = dynamic(
  () => import('./components/WeddingGalleryCarousel'),
  {
    ssr: false,
  }
);

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className='flex flex-col min-h-screen bg-[#f8f5f0]'>
      <main className='flex-grow flex flex-col items-center justify-center'>
        {/* Logo and Title Section */}
        <div className='w-full max-w-[2000px] mx-auto relative px-4 py-4 md:py-8'>
          <AnimatedSection className='text-center z-10 mb-6 md:mb-12'>
            <div className='flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6'>
              <div className='flex-shrink-0 mb-2 md:mb-0'>
                <Image
                  src={WeddingLogo}
                  alt='Wedding Theory'
                  width={100}
                  height={100}
                  className='w-14 md:w-20 h-auto object-contain'
                  priority
                />
              </div>
              <div className='text-center md:text-left flex flex-col items-center md:items-start gap-1'>
                <h1 className='font-serif text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-gray-800 leading-tight'>
                  Wedding Theory
                </h1>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: 'easeOut',
                  }}
                  className='relative mt-0.5 md:mt-1'
                >
                  <p className='font-serif text-[11px] sm:text-sm md:text-base text-gray-500 tracking-wider whitespace-nowrap'>
                    Transforming love stories into timeless art
                  </p>
                  <motion.div
                    className='absolute bottom-0 left-0 w-full h-[1px] bg-gray-300'
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 1,
                      ease: 'easeInOut',
                    }}
                    style={{ transformOrigin: 'left' }}
                  />
                </motion.div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Video Gallery Section - Moved to top */}
        <AnimatedSection className='w-full relative bg-[#fcfaf7]'>
          <div className='w-full h-[60vh] sm:h-[80vh] md:h-screen overflow-hidden relative'>
            <video
              src='https://weddingtheory.blr1.cdn.digitaloceanspaces.com/video/WEB1%202%20compressed.mp4'
              className='absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2'
              style={{
                pointerEvents: 'none',
                transform: `translate(-50%, -50%) scale(${
                  isMounted ? (window.innerWidth < 640 ? 1.2 : 1) : 1
                })`,
              }}
              autoPlay
              muted
              loop
              playsInline
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent' />
            <div className='absolute bottom-0 left-0 right-0 flex justify-center items-center pb-12 sm:pb-16 md:pb-20'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <Link
                  href='/films'
                  className='group relative inline-flex items-center gap-2 px-6 sm:px-12 py-3 sm:py-5
                    bg-transparent
                    hover:bg-white/10
                    border border-white/30
                    rounded-full
                    transition-all duration-500 ease-in-out
                    hover:shadow-[0_8px_30px_rgba(255,255,255,0.3)]
                    hover:scale-105'
                >
                  <span className='text-white font-medium tracking-[0.2em] uppercase text-xs sm:text-base'>
                    View Films
                  </span>
                  <svg
                    className='w-3 h-3 sm:w-4 sm:h-4 text-white transition-transform duration-300 group-hover:translate-x-1'
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
                </Link>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        <div className='w-full max-w-[2000px] mx-auto relative px-4'>
          {/* Decorative Separator */}
          <div className='my-10 md:my-12 flex items-center justify-center max-w-4xl mx-auto'>
            <div className='flex-grow h-[1px] bg-gradient-to-r from-transparent via-[#D4B08C] to-transparent'></div>
            <div className='mx-4 text-[#D4B08C]'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='w-6 h-6 animate-pulse'
              >
                <path d='M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z' />
              </svg>
            </div>
            <div className='flex-grow h-[1px] bg-gradient-to-r from-[#D4B08C] via-[#D4B08C] to-transparent'></div>
          </div>

          {/* Carousel Section */}
          <AnimatedSection className='relative z-0' delay={0.3}>
            <div className='w-full h-[65vh] md:h-[92vh] max-h-[1200px] rounded-xl overflow-hidden'>
              <Carousel />
            </div>
          </AnimatedSection>

          {/* Get in Touch Section */}
          <AnimatedSection className='mt-12 md:mt-16 text-center'>
            <p className='font-sans text-sm md:text-base text-gray-700 leading-relaxed text-center max-w-2xl mx-auto mb-8'>
              At Wedding Theory, we capture the vibrant colors and rich
              traditions of Indian weddings. From the mehndi ceremony to the
              grand reception, we preserve every precious moment. Let us weave
              your love story into a tapestry of beautiful memories.
            </p>
            <Link
              href='/contact'
              className='inline-block px-10 py-3.5 text-sm md:text-base 
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
          </AnimatedSection>

          {/* Wedding Gallery section */}
          <AnimatedSection className='w-full mt-14 md:mt-20'>
            <WeddingGalleryCarousel />
          </AnimatedSection>

          {/* Image Carousel Section */}
          <AnimatedSection className='w-full h-[60vh] md:h-screen bg-[#f8f5f0] mt-14 md:mt-20'>
            <div className='h-full w-full max-w-[1400px] mx-auto rounded-2xl overflow-hidden'>
              <ImageCarousel />
            </div>
          </AnimatedSection>

          {/* Blog CTA Section - Adjusted spacing */}
          <AnimatedSection className='w-full bg-[#f8f5f0] pt-14 pb-16 md:pt-20 md:pb-24'>
            <div className='max-w-4xl mx-auto px-4 text-center'>
              <h3 className='font-serif text-3xl md:text-4xl text-gray-800 mb-6'>
                Explore Our Wedding Journal
              </h3>
              <p className='font-sans text-gray-700 text-base md:text-lg mb-8 leading-relaxed'>
                Discover inspiring stories, wedding planning tips, and
                behind-the-scenes glimpses into the most beautiful Indian
                weddings. Let our blog guide you through your wedding journey.
              </p>
              <Link
                href='/blogs'
                className='inline-block px-4 py-2 text-base
                  text-[#68401b] font-medium 
                  transition-all duration-300 ease-in-out
                  hover:text-[#8B5E2B]
                  relative after:content-[""] after:absolute 
                  after:w-full after:h-0.5 after:bg-[#68401b]/30 
                  after:left-0 after:bottom-0
                  after:transition-all after:duration-500
                  hover:after:transform hover:after:scale-x-0
                  before:content-[""] before:absolute 
                  before:w-full before:h-0.5 before:bg-[#68401b] 
                  before:left-0 before:bottom-0
                  before:origin-left
                  before:scale-x-0
                  before:transition-transform before:duration-500
                  hover:before:scale-x-100
                  hover:before:origin-right'
              >
                Read Our Blog
              </Link>
            </div>
          </AnimatedSection>

          {/* LAHZA Promotion Section - Adjusted spacing */}
          <AnimatedSection className='w-full bg-[#f8f5f0] pt-14 pb-20 md:pt-20 md:pb-32'>
            <div className='max-w-7xl mx-auto px-4'>
              <div className='relative'>
                {/* Hero Image */}
                <div className='relative h-[60vh] md:h-[80vh] rounded-2xl overflow-hidden mb-16'>
                  <Image
                    src='https://ik.imagekit.io/weddingtheory/Photos/WT-2.jpg'
                    alt='LAHZA Premium Wedding Package'
                    fill
                    className='object-cover'
                    style={{ scale: 1.2 }}
                    priority
                  />
                  <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60' />

                  {/* Overlay Content - Moved to bottom */}
                  <div className='absolute inset-x-0 bottom-0 flex flex-col items-center justify-end text-center px-4 pb-12 md:pb-16'>
                    <h3 className='font-serif text-3xl md:text-4xl text-white mb-3'>
                      LAHZA
                    </h3>
                    <div className='w-16 h-[1px] bg-white/70 mx-auto mb-4'></div>
                    <p className='text-sm md:text-base text-white/90 max-w-xl mx-auto mb-6 tracking-wide'>
                      Our Premium Wedding Package
                    </p>
                    <Link
                      href='/lahza'
                      className='inline-block px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm 
                        bg-transparent hover:bg-white/10 
                        text-white font-medium 
                        rounded-full border border-white/80
                        transition-all duration-300 ease-in-out
                        hover:shadow-[0_4px_14px_0_rgba(255,255,255,0.3)]
                        hover:transform hover:scale-105
                        tracking-wider'
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Wedding Stories Section - Adjusted spacing */}
          <AnimatedSection className='w-full bg-[#f8f5f0] pt-14 pb-20 md:pt-20 md:pb-32'>
            <div className='max-w-6xl mx-auto px-4'>
              <div className='text-center'>
                <h3 className='font-serif text-3xl md:text-5xl lg:text-6xl text-gray-800 mb-8'>
                  Wedding Stories That Inspire
                </h3>
                <div className='w-32 h-[1px] bg-[#D4B08C] mx-auto mb-12'></div>
                <p className='font-sans text-gray-700 text-base md:text-lg mb-20 px-4 leading-relaxed max-w-3xl mx-auto'>
                  Every wedding tells a unique story - a story of love,
                  tradition, and celebration. Through our lens, we capture these
                  precious moments that become timeless memories, creating
                  visual narratives that will be cherished for generations.
                </p>

                {/* Statistics Grid with staggered animation */}
                <AnimatedStats
                  stats={[
                    { number: '500+', label: 'Weddings Captured' },
                    { number: '10+', label: 'Years Experience' },
                    { number: '50+', label: 'Cities Covered' },
                    { number: '500+', label: 'Happy Couples' },
                  ]}
                />

                <div className='text-center mt-16'>
                  <Link
                    href='/testimonial'
                    className='inline-block px-4 py-2 text-base
                      text-[#68401b] font-medium 
                      transition-all duration-300 ease-in-out
                      hover:text-[#8B5E2B]
                      relative after:content-[""] after:absolute 
                      after:w-full after:h-0.5 after:bg-[#68401b]/30 
                      after:left-0 after:bottom-0
                      after:transition-all after:duration-500
                      hover:after:transform hover:after:scale-x-0
                      before:content-[""] before:absolute 
                      before:w-full before:h-0.5 before:bg-[#68401b] 
                      before:left-0 before:bottom-0
                      before:origin-left
                      before:scale-x-0
                      before:transition-transform before:duration-500
                      hover:before:scale-x-100
                      hover:before:origin-right'
                  >
                    Explore Their Stories
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>
    </div>
  );
}
