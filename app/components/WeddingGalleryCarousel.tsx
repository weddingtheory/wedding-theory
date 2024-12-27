'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { IoChevronBackOutline, IoChevronForwardOutline, IoLocationOutline, IoCalendarClearOutline } from 'react-icons/io5';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import ImageLightbox from './ImageLightbox';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface WeddingStory {
  id: string;
  couple_names: string;
  location: string | null;
  featured_image_key: string | null;
  gallery_images: string[] | null;
  wedding_date: string | null;
  is_featured_home: boolean | null;
  status: string;
}

export default function WeddingGalleryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [weddingStories, setWeddingStories] = useState<WeddingStory[]>([]);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function fetchFeaturedWeddings() {
      try {
        const { data, error } = await supabase
          .from('weddings')
          .select('*')
          .eq('status', 'published')
          .eq('is_featured_home', true)
          .order('wedding_date', { ascending: false });

        if (error) throw error;
        setWeddingStories(data || []);
      } catch (error) {
        console.error('Error fetching featured weddings:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedWeddings();
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setCurrentIndex(prev => {
        if (isMobile) {
          return (prev + 1) % weddingStories.length;
        } else {
          return (prev + 3 >= weddingStories.length) ? 0 : prev + 3;
        }
      });
    }, 6000);
  }, [isMobile, weddingStories.length]);

  const goToNext = useCallback(() => {
    if (isMobile) {
      setCurrentIndex(prev => (prev + 1) % weddingStories.length);
    } else {
      setCurrentIndex(prev => prev + 3 >= weddingStories.length ? 0 : prev + 3);
    }
    resetTimer();
  }, [isMobile, resetTimer, weddingStories.length]);

  const goToPrevious = useCallback(() => {
    if (isMobile) {
      setCurrentIndex(prev => prev === 0 ? weddingStories.length - 1 : prev - 1);
    } else {
      setCurrentIndex(prev => prev - 3 < 0 ? Math.max(weddingStories.length - 3, 0) : prev - 3);
    }
    resetTimer();
  }, [isMobile, resetTimer, weddingStories.length]);

  const handlers = useSwipeable({
    onSwipedLeft: goToNext,
    onSwipedRight: goToPrevious,
    trackMouse: true,
    trackTouch: true
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [resetTimer]);

  const handlePrevClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    goToPrevious();
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    goToNext();
  };

  const handleDotClick = (index: number) => {
    if (isMobile) {
      setCurrentIndex(index);
    } else {
      setCurrentIndex(index * 3);
    }
    resetTimer();
  };

  const openLightbox = useCallback((storyIndex: number) => {
    setSelectedStoryIndex(storyIndex);
    setCurrentImageIndex(0);
    setLightboxOpen(true);
  }, []);

  // Handler for when user changes image in lightbox
  const handleImageChange = useCallback((newIndex: number) => {
    // Use setTimeout to avoid state updates during render
    setTimeout(() => {
      setCurrentImageIndex(newIndex);
    }, 0);
  }, []);

  const formatLocation = (location: string | null) => {
    if (!location) return null;
    return location.replace(/^\/+|\/+$/g, '').trim();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#68401b]"></div>
      </div>
    );
  }

  if (weddingStories.length === 0) {
    return null;
  }

  return (
    <div className='w-full overflow-hidden py-8 md:py-12'>
      <div className='mb-16 md:mb-20 flex items-center justify-center max-w-4xl mx-auto px-4'>
        <div className='flex-grow h-[1px] bg-gradient-to-r from-transparent via-[#D4B08C] to-transparent'></div>
        <div className='mx-4 text-[#D4B08C]'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='w-5 h-5 md:w-6 md:h-6 animate-pulse'
          >
            <path d='M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z' />
          </svg>
        </div>
        <div className='flex-grow h-[1px] bg-gradient-to-r from-[#D4B08C] via-[#D4B08C] to-transparent'></div>
      </div>

      <motion.div
        className='text-center mb-10 md:mb-14'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className='font-serif text-3xl md:text-4xl lg:text-5xl text-gray-800 mb-3'>
          WEDDING GALLERY
        </h2>
        <div className='w-16 md:w-20 h-[1px] bg-[#D4B08C] mx-auto mb-4'></div>
        <p className='text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4'>
          Explore our collection of beautiful wedding stories and celebrations
        </p>
      </motion.div>

      <div className='relative w-full max-w-6xl mx-auto px-4 md:px-8 mb-10 md:mb-14'>
        {!isMobile ? (
          <>
            <div className='min-h-[500px] overflow-hidden'>
              <AnimatePresence mode='wait' initial={false}>
                <motion.div
                  key={currentIndex}
                  className='grid grid-cols-3 gap-6 md:gap-10'
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.7, ease: [0.645, 0.045, 0.355, 1] }}
                >
                  {Array(3)
                    .fill(null)
                    .map((_, idx) => {
                      const story = weddingStories[currentIndex + idx];
                      return story ? (
                        <motion.div
                          key={story.id}
                          className='relative group cursor-pointer'
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.2 }}
                          onClick={() => openLightbox(currentIndex + idx)}
                        >
                          <div className='flex flex-col h-full'>
                            <div
                              className='relative aspect-[3/4] rounded-xl overflow-hidden 
                            shadow-lg hover:shadow-xl transition-all duration-500
                            transform hover:-translate-y-1'
                            >
                              <Image
                                src={story.featured_image_key || ''}
                                alt={story.couple_names}
                                fill
                                className='object-cover transition-transform duration-700 
                                group-hover:scale-105'
                                sizes='(max-width: 1280px) 33vw, 400px'
                                priority={idx === 0}
                              />
                              <div
                                className='absolute inset-0 bg-gradient-to-b 
                              from-transparent via-transparent to-black/30 
                              group-hover:opacity-0 transition-opacity duration-500'
                              />
                            </div>
                            <div className='text-center mt-4 transform transition-all duration-500 px-2'>
                              <h3 className='font-serif text-xl md:text-2xl text-gray-800 mb-2 tracking-wide'>
                                {story.couple_names}
                              </h3>
                              <div className='flex flex-wrap items-center justify-center gap-3 text-gray-600'>
                                {story.wedding_date && (
                                  <div className='flex items-center gap-1.5'>
                                    <IoCalendarClearOutline className='w-3.5 h-3.5 flex-shrink-0 relative top-[0.5px]' />
                                    <span className='text-sm tracking-wide'>
                                      {new Date(
                                        story.wedding_date
                                      ).toLocaleDateString('en-US', {
                                        month: 'long',
                                        year: 'numeric',
                                      })}
                                    </span>
                                  </div>
                                )}
                                {story.location && (
                                  <div className='flex items-center gap-1.5'>
                                    <IoLocationOutline className='w-3.5 h-3.5 flex-shrink-0 relative top-[0.5px]' />
                                    <span className='text-sm tracking-wide'>
                                      {formatLocation(story.location)}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <div
                          key={`empty-${idx}`}
                          className='relative aspect-[3/4] rounded-xl overflow-hidden bg-[#f8f5f0]'
                        />
                      );
                    })}
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              onClick={handlePrevClick}
              className='absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 
                text-white/90 p-2 rounded-full transition-all duration-300
                hover:scale-110 backdrop-blur-sm z-10'
              aria-label='Previous slide'
            >
              <IoChevronBackOutline size={20} />
            </button>

            <button
              onClick={handleNextClick}
              className='absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 
                text-white/90 p-2 rounded-full transition-all duration-300
                hover:scale-110 backdrop-blur-sm z-10'
              aria-label='Next slide'
            >
              <IoChevronForwardOutline size={20} />
            </button>

            <div className='flex justify-center gap-3 mt-8'>
              {Array(Math.ceil(weddingStories.length / 3))
                .fill(null)
                .map((_, index) => (
                  <button
                    key={index}
                    aria-label={`Go to slide group ${index + 1}`}
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${
                      Math.floor(currentIndex / 3) === index
                        ? 'bg-[#D4B08C] w-8'
                        : 'bg-gray-300 hover:bg-[#D4B08C]/50'
                    }`}
                    onClick={() => handleDotClick(index)}
                  />
                ))}
            </div>
          </>
        ) : (
          <div {...handlers} className='relative overflow-hidden'>
            <AnimatePresence mode='wait' initial={false}>
              <motion.div
                key={currentIndex}
                className='w-full cursor-pointer'
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, ease: [0.645, 0.045, 0.355, 1] }}
                onClick={() => openLightbox(currentIndex)}
              >
                <div className='flex flex-col'>
                  <div className='relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg'>
                    <Image
                      src={
                        weddingStories[currentIndex]?.featured_image_key || ''
                      }
                      alt={weddingStories[currentIndex]?.couple_names || ''}
                      fill
                      className='object-cover'
                      sizes='(max-width: 768px) 100vw, 300px'
                      priority
                    />
                    <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30' />
                  </div>
                  <motion.div
                    className='text-center mt-3 px-2'
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className='font-serif text-xl text-gray-800 mb-2 tracking-wide'>
                      {weddingStories[currentIndex]?.couple_names}
                    </h3>
                    <div className='flex flex-wrap items-center justify-center gap-3 text-gray-600'>
                      {weddingStories[currentIndex]?.wedding_date && (
                        <div className='flex items-center gap-1.5'>
                          <IoCalendarClearOutline className='w-3.5 h-3.5 flex-shrink-0 relative top-[0.5px]' />
                          <span className='text-sm tracking-wide'>
                            {new Date(
                              weddingStories[currentIndex].wedding_date
                            ).toLocaleDateString('en-US', {
                              month: 'long',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                      )}
                      {weddingStories[currentIndex]?.location && (
                        <div className='flex items-center gap-1.5'>
                          <IoLocationOutline className='w-3.5 h-3.5 flex-shrink-0 relative top-[0.5px]' />
                          <span className='text-sm tracking-wide'>
                            {formatLocation(
                              weddingStories[currentIndex].location
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={handlePrevClick}
              className='absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 
                text-white/90 p-2 rounded-full transition-all duration-300
                hover:scale-110 backdrop-blur-sm z-10'
              aria-label='Previous slide'
            >
              <IoChevronBackOutline size={20} />
            </button>

            <button
              onClick={handleNextClick}
              className='absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 
                text-white/90 p-2 rounded-full transition-all duration-300
                hover:scale-110 backdrop-blur-sm z-10'
              aria-label='Next slide'
            >
              <IoChevronForwardOutline size={20} />
            </button>

            <div className='flex justify-center gap-2 mt-3'>
              {weddingStories.map((_, index) => (
                <button
                  key={index}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    currentIndex === index
                      ? 'bg-[#D4B08C] w-6'
                      : 'bg-gray-300 hover:bg-[#D4B08C]/50'
                  }`}
                  onClick={() => handleDotClick(index)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className='mt-8 md:mt-12 text-center'>
        <Link
          href='/weddings'
          className="inline-block px-6 py-3 text-base
            text-[#68401b] font-medium 
            transition-all duration-300 ease-in-out
            hover:text-[#8B5E2B]
            relative after:content-[''] after:absolute 
            after:w-full after:h-0.5 after:bg-[#68401b]/30 
            after:left-0 after:bottom-0
            after:transition-all after:duration-500
            hover:after:transform hover:after:scale-x-0
            before:content-[''] before:absolute 
            before:w-full before:h-0.5 before:bg-[#68401b] 
            before:left-0 before:bottom-0
            before:origin-left
            before:scale-x-0
            before:transition-transform before:duration-500
            hover:before:scale-x-100
            hover:before:origin-right
            tracking-wider"
        >
          Explore More Galleries
        </Link>
      </div>

      {/* Image Lightbox */}
      <ImageLightbox
        images={weddingStories[selectedStoryIndex]?.gallery_images || []}
        initialImageIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onImageChange={handleImageChange}
      />
    </div>
  );
} 