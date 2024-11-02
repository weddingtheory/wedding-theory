'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

const portfolioImages = [
  {
    desktop: 'https://ik.imagekit.io/weddingtheory/Photos/N&JFIRSTLOOK-96.jpg?updatedAt=1730140144622',
    mobile: 'https://ik.imagekit.io/weddingtheory/Photos/N&JFIRSTLOOK-96.jpg?updatedAt=1730140144622',
    alt: 'Portfolio image 1',
    title: 'Neha & Jay - A Timeless Romance',
    date: 'MARCH 15, 2024',
    location: 'Mumbai, India',
    excerpt: 'A beautiful celebration of love that blended modern elegance with traditional charm...'
  },
  {
    desktop: 'https://ik.imagekit.io/weddingtheory/Photos/MMP01287.jpg?updatedAt=1730140146040',
    mobile: 'https://ik.imagekit.io/weddingtheory/Photos/MMP01287.jpg?updatedAt=1730140146040',
    alt: 'Portfolio image 2',
    title: 'Priya & Arjun - Royal Celebrations',
    date: 'FEBRUARY 28, 2024',
    location: 'Udaipur, India',
    excerpt: 'A majestic wedding set against the backdrop of palace architecture...'
  },
  {
    desktop: 'https://ik.imagekit.io/weddingtheory/Photos/S&CPREWEDFIRSTSET-6.JPG?updatedAt=1730140170874',
    mobile: 'https://ik.imagekit.io/weddingtheory/Photos/ADL00536.jpg?updatedAt=1730140142519',
    alt: 'Portfolio image 3',
    title: 'Sneha & Chirag - A Dreamy Destination Wedding',
    date: 'JANUARY 10, 2024',
    location: 'Maldives',
    excerpt: 'A breathtaking destination wedding that combined the beauty of the Maldives with traditional Indian festivities...'
  },
  {
    desktop: 'https://ik.imagekit.io/weddingtheory/Photos/0A4A8443-Edit.jpg?updatedAt=1730140135728',
    mobile: 'https://ik.imagekit.io/weddingtheory/Photos/0A4A8443-Edit.jpg?updatedAt=1730140135728',
    alt: 'Portfolio image 4',
    title: 'Aarav & Aanya - A Magical Garden Wedding',
    date: 'DECEMBER 20, 2023',
    location: 'Bangalore, India',
    excerpt: 'A magical garden wedding that combined the beauty of Bangalore with traditional Indian rituals...'
  },
];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % portfolioImages.length);
    }, 4000);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % portfolioImages.length);
    resetTimer();
  }, [resetTimer]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(prev => prev === 0 ? portfolioImages.length - 1 : prev - 1);
    resetTimer();
  }, [resetTimer]);

  const handlers = useSwipeable({
    onSwipedLeft: goToNext,
    onSwipedRight: goToPrevious,
    trackMouse: true,
    trackTouch: true,
    delta: 10,
    swipeDuration: 500,
    touchEventOptions: { passive: false }
  });

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [resetTimer]);

  const checkMobile = useCallback(() => {
    const isMobileByWidth = window.innerWidth < 768;
    const isMobileByAgent = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const newIsMobile = isMobileByWidth || isMobileByAgent;
    if (newIsMobile !== isMobile) {
      setIsMobile(newIsMobile);
    }
  }, [isMobile]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      checkMobile();
      const handleResize = () => {
        let timeoutId: NodeJS.Timeout | null = null;
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(checkMobile, 150);
      };

      window.addEventListener('resize', handleResize);
      window.addEventListener('orientationchange', checkMobile);

      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', checkMobile);
      };
    }
  }, [checkMobile]);

  return (
    <div 
      {...handlers} 
      className="relative h-full w-full overflow-hidden touch-pan-y"
      style={{ touchAction: 'pan-y pinch-zoom' }}
    >
      <AnimatePresence initial={false} custom={currentIndex} mode='wait'>
        <motion.div
          key={currentIndex}
          custom={currentIndex}
          initial={{ 
            opacity: 0,
            scale: 1.15
          }}
          animate={{ 
            opacity: 1,
            scale: 1,
            transition: {
              opacity: { duration: 0.5 },
              scale: { duration: 0.7, ease: [0.645, 0.045, 0.355, 1] }
            }
          }}
          exit={{ 
            opacity: 0,
            scale: 0.95,
            transition: {
              opacity: { duration: 0.5 },
              scale: { duration: 0.5, ease: [0.645, 0.045, 0.355, 1] }
            }
          }}
          className="absolute inset-0"
        >
          <motion.div 
            className="relative h-full w-full"
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{
              scale: {
                duration: 8,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'reverse'
              }
            }}
          >
            <Image
              src={isMobile ? portfolioImages[currentIndex].mobile : portfolioImages[currentIndex].desktop}
              alt={portfolioImages[currentIndex].alt}
              fill
              className="object-cover rounded-2xl transform"
              priority={currentIndex === 0}
              sizes="(max-width: 768px) 100vw, 1400px"
              style={{ 
                objectPosition: 'center',
                objectFit: 'cover'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60 rounded-2xl" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-10 left-6 lg:bottom-16 lg:left-16 text-white z-10 max-w-xl"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              delay: 0.3,
              duration: 0.5,
              ease: 'easeOut'
            }}
          >
            <motion.p 
              className="text-sm font-light mb-2 opacity-90"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {portfolioImages[currentIndex].date} / {portfolioImages[currentIndex].location}
            </motion.p>
            <motion.h3 
              className="font-serif text-2xl md:text-4xl mb-3 leading-tight"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {portfolioImages[currentIndex].title}
            </motion.h3>
            <motion.p 
              className="text-sm md:text-base mb-5 opacity-80 line-clamp-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {portfolioImages[currentIndex].excerpt}
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Link
                href="/wedding-stories"
                className="inline-block px-5 py-2 border border-white/80 rounded-full text-sm 
                  hover:bg-white hover:text-black transition-all duration-300
                  transform hover:scale-105"
              >
                View Story
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-10 right-6 lg:bottom-16 lg:right-16 flex gap-1.5">
        {portfolioImages.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              resetTimer();
            }}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              currentIndex === index 
                ? 'bg-white w-6' 
                : 'bg-white/50 hover:bg-white/75 w-1.5'
            }`}
            whileHover={{ scale: 1.2 }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          goToPrevious();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 
          text-white/90 p-2 rounded-full transition-all duration-300
          hover:scale-110 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <IoChevronBackOutline size={20} />
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          goToNext();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 
          text-white/90 p-2 rounded-full transition-all duration-300
          hover:scale-110 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <IoChevronForwardOutline size={20} />
      </button>
    </div>
  );
} 