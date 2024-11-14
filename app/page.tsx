'use client';
import React, { useState, useEffect } from 'react';
import AnimatedSection from './components/AnimatedSection';
import Carousel from './components/Carousel';
import ImageCarousel from './components/ImageCarousel';
import Link from 'next/link';
import Image from 'next/image';
import AnimatedStats from './components/AnimatedStats';

export default function Home() {
  const [scale, setScale] = useState(2);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      setScale(window.innerWidth < 640 ? 2.8 : 2);
    };

    // Set initial scale
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='flex flex-col min-h-screen bg-[#f8f5f0]'>
      <main className='flex-grow flex flex-col items-center justify-center px-4 py-4 md:py-8'>
        <div className='w-full max-w-6xl mx-auto relative'>
          <AnimatedSection className='text-center md:text-left z-10 mb-8 md:mb-0 md:absolute md:top-0 md:left-0'>
            <h2 className='font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-normal text-gray-800 leading-tight md:leading-none'>
              Celebrating
            </h2>
            <h2 className='font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-normal text-gray-800 leading-tight md:leading-none md:-mt-1 lg:-mt-2'>
              Indian
            </h2>
            <h2 className='font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-normal text-gray-800 leading-tight md:leading-none md:-mt-1 lg:-mt-2'>
              love stories
            </h2>
          </AnimatedSection>

          <AnimatedSection
            className='relative z-0 md:ml-[15%] md:mt-24'
            delay={0.3}
          >
            <div className='w-[90%] mx-auto md:w-full h-[45vh] md:h-[75vh] max-h-[800px] rounded-xl overflow-hidden'>
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

          {/* Decorative Separator */}
          <div className='my-16 md:my-20 flex items-center justify-center max-w-4xl mx-auto px-4'>
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
        </div>
      </main>

      {/* Image Carousel Section */}
      <AnimatedSection className='w-full h-[60vh] md:h-screen bg-[#f8f5f0] px-4 md:px-8'>
        <div className='h-full w-full max-w-[1400px] mx-auto rounded-2xl overflow-hidden'>
          <ImageCarousel />
        </div>
      </AnimatedSection>

      {/* Blog CTA Section */}
      <AnimatedSection className='w-full bg-[#f8f5f0] py-16 md:py-20'>
        <div className='max-w-4xl mx-auto px-4 text-center'>
          <h3 className='font-serif text-3xl md:text-4xl text-gray-800 mb-6'>
            Explore Our Wedding Journal
          </h3>
          <p className='font-sans text-gray-700 text-base md:text-lg mb-8 leading-relaxed'>
            Discover inspiring stories, wedding planning tips, and
            behind-the-scenes glimpses into the most beautiful Indian weddings.
            Let our blog guide you through your wedding journey.
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

      {/* Wedding Stories Section */}
      <AnimatedSection className='w-full bg-[#f8f5f0] py-24 md:py-32'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className='text-center'>
            <h3 className='font-serif text-3xl md:text-5xl lg:text-6xl text-gray-800 mb-8'>
              Wedding Stories That Inspire
            </h3>
            <div className='w-32 h-[1px] bg-[#D4B08C] mx-auto mb-12'></div>
            <p className='font-sans text-gray-700 text-base md:text-lg mb-20 px-4 leading-relaxed max-w-3xl mx-auto'>
              Every wedding tells a unique story - a story of love, tradition,
              and celebration. Through our lens, we capture these precious
              moments that become timeless memories, creating visual narratives
              that will be cherished for generations.
            </p>

            {/* Statistics Grid with staggered animation */}
            <AnimatedStats
              stats={[
                { number: '500+', label: 'Weddings Captured' },
                { number: '10+', label: 'Years Experience' },
                { number: '50+', label: 'Cities Covered' },
                { number: '1000+', label: 'Happy Couples' },
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

      {/* Video Gallery Section */}
      <AnimatedSection className='w-full relative bg-[#fcfaf7]'>
        {/* Full-width video background */}
        <div className='w-full h-[60vh] sm:h-[80vh] md:h-screen overflow-hidden'>
          <div className='relative w-full h-full'>
            <iframe
              src='https://www.youtube.com/embed/0Ky81YMuR7k?start=10&autoplay=1&mute=1&controls=0&loop=1&playlist=0Ky81YMuR7k&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1&playsinline=1&fs=0&disablekb=1&origin=yourwebsite.com'
              className='absolute top-1/2 left-1/2 w-[200%] sm:w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2'
              style={{
                pointerEvents: 'none',
                transform: `translate(-50%, -50%) scale(${isMounted ? (window.innerWidth < 640 ? 3.5 : scale) : 2})`,
              }}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
              frameBorder='0'
            ></iframe>
          </div>
        </div>

        {/* Button Section Below Video */}
        <div className='w-full bg-[#fcfaf7] py-10 sm:py-16 text-center'>
          <Link
            href='/films'
            className='inline-block px-8 sm:px-12 md:px-16 py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg
              bg-[#68401b] hover:bg-[#8B5E2B]
              text-white font-medium 
              rounded-full border border-[#D4B08C]
              transition-all duration-500 ease-in-out
              shadow-[0_4px_20px_0_rgba(104,64,27,0.3)]
              hover:shadow-[0_8px_30px_rgba(104,64,27,0.4)]
              hover:transform hover:scale-105
              tracking-[0.15em] sm:tracking-[0.2em] uppercase'
          >
            Films
          </Link>
        </div>
      </AnimatedSection>

      {/* LAHZA Promotion Section - Elegant */}
      <AnimatedSection className='w-full bg-[#f8f5f0] py-20 md:py-32'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='relative'>
            {/* Hero Image */}
            <div className='relative h-[60vh] md:h-[80vh] rounded-2xl overflow-hidden mb-16'>
              <Image
                src='https://ik.imagekit.io/weddingtheory/Photos/WT-2.jpg'
                alt='LAHZA Premium Wedding Package'
                fill
                className='object-cover'
                style={{ scale: 1.2   }}
                priority
              />
              <div className='absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40' />
              
              {/* Overlay Content */}
              <div className='absolute inset-0 flex flex-col items-center justify-center text-center px-4'>
                <h3 className='font-serif text-5xl md:text-7xl text-white mb-6'>
                  LAHZA
                </h3>
                <div className='w-24 h-[1px] bg-white/70 mx-auto mb-6'></div>
                <p className='text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-12 tracking-wide'>
                  Our Premium Wedding Package
                </p>
                <Link
                  href='/lahza'
                  className='inline-block px-8 sm:px-12 py-3 sm:py-4 text-sm sm:text-base 
                    bg-transparent hover:bg-white/10 
                    text-white font-medium 
                    rounded-full border-2 border-white
                    transition-all duration-300 ease-in-out
                    shadow-[0_4px_14px_0_rgba(255,255,255,0.39)]
                    hover:shadow-[0_6px_20px_rgba(255,255,255,0.45)]
                    hover:transform hover:scale-105
                    tracking-wider'
                >
                  Discover LAHZA
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
