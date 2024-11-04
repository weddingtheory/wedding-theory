'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { useSwipeable } from 'react-swipeable';

const blogPosts = [
  {
    id: 1,
    title: 'Neelam & Siddharth – In Perfect Sync',
    date: 'AUGUST 23, 2024',
    category: 'WEDDING',
    image:
      'https://ik.imagekit.io/weddingtheory/Photos/M&PEngagement-26%20(1).jpg?updatedAt=1730140136930',
    excerpt: 'A beautiful celebration of love and tradition...',
  },
  {
    id: 2,
    title: 'Elizabeth & Shaun – A Royal Affair',
    date: 'JULY 5, 2024',
    category: 'WEDDING',
    image:
      'https://ik.imagekit.io/weddingtheory/Photos/0A4A8443-Edit.jpg?updatedAt=1730140135728',
    excerpt: 'Where tradition meets modern elegance...',
  },
  {
    id: 3,
    title: 'Emilia & Rishi ~ A Garden Romance',
    date: 'JUNE 26, 2024',
    category: 'WEDDING',
    image:
      'https://ik.imagekit.io/weddingtheory/Photos/ADL00536.jpg?updatedAt=1730140142519',
    excerpt: 'An enchanting outdoor celebration...',
  },
  {
    id: 4,
    title: "Prerna & Vidal – It's Always Wine Time",
    date: 'JUNE 15, 2024',
    category: 'WEDDING',
    image:
      'https://ik.imagekit.io/weddingtheory/Photos/ADL08862.jpg?updatedAt=1730140125090',
    excerpt: 'A celebration filled with love and laughter...',
  },
  {
    id: 5,
    title: 'Sarah & Chris – Sunset Promises',
    date: 'MAY 30, 2024',
    category: 'WEDDING',
    image:
      'https://ik.imagekit.io/weddingtheory/Photos/MMP01287.jpg?updatedAt=1730140146040',
    excerpt: 'A magical evening of love...',
  },
  {
    id: 6,
    title: 'Maya & Raj – Traditional Elegance',
    date: 'MAY 15, 2024',
    category: 'WEDDING',
    image:
      'https://ik.imagekit.io/weddingtheory/Photos/S&CPREWEDFIRSTSET-6.JPG?updatedAt=1730140170874',
    excerpt: 'Where traditions tell their own story...',
  },
];

export default function BlogsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastTransitionTimeRef = useRef(Date.now());

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const startTimer = () => {
      timer = setInterval(() => {
        const currentTime = Date.now();
        const timeElapsed = currentTime - lastTransitionTimeRef.current;
        
        if (timeElapsed >= 3000) {  // 4 seconds
          setCurrentIndex((prev) => (prev + 1) % blogPosts.length);
          lastTransitionTimeRef.current = currentTime;
        }
      }, 3000);
    };

    startTimer();

    return () => {
      if (timer) clearInterval(timer);
    };
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % blogPosts.length);
    lastTransitionTimeRef.current = Date.now(); // Reset timer on manual navigation
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => 
      prev === 0 ? blogPosts.length - 1 : prev - 1
    );
    lastTransitionTimeRef.current = Date.now(); // Reset timer on manual navigation
  }, []);

  // Carousel Component
  const CarouselSection = () => {
    // Add these handlers inside the component to ensure proper context
    const handlers = useSwipeable({
      onSwipedLeft: goToNext,
      onSwipedRight: goToPrevious,
      trackMouse: true,
      trackTouch: true,
      delta: 10,
      rotationAngle: 0,
    });

    return (
      <div
        {...handlers}
        className='relative h-[60vh] lg:h-full overflow-hidden'
        style={{ touchAction: 'pan-y pinch-zoom' }}
      >
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7 }}
            className='absolute inset-0'
          >
            <Image
              src={blogPosts[currentIndex].image}
              alt={blogPosts[currentIndex].title}
              fill
              className='object-cover'
              priority
            />
            <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-60' />
            <motion.div
              className='absolute bottom-24 left-6 lg:bottom-32 lg:left-20 text-white z-10 max-w-xl
                backdrop-blur-md bg-black/20 p-6 rounded-xl
                border border-white/10 shadow-lg
                before:absolute before:inset-0 before:backdrop-blur-sm before:bg-gradient-to-r 
                before:from-white/10 before:to-transparent before:rounded-xl'
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <p className='text-xs md:text-sm font-light mb-2 relative z-10 text-white/70'>
                {blogPosts[currentIndex].date} /{' '}
                {blogPosts[currentIndex].category}
              </p>
              <h3 className='font-serif text-2xl md:text-4xl mb-3 leading-tight relative z-10 text-white/90'>
                {blogPosts[currentIndex].title}
              </h3>
              <Link
                href={`/blogs/${blogPosts[currentIndex].id}`}
                className='inline-block px-5 py-2 border border-white/60 rounded-full text-xs md:text-sm 
                  hover:bg-white hover:text-black transition-all duration-300
                  transform hover:scale-105 backdrop-blur-sm bg-black/10 relative z-10
                  text-white/80 hover:text-black'
              >
                Read Story
              </Link>
            </motion.div>

            {/* Navigation Dots - Moved above the frosted glass panel */}
            <div className='absolute bottom-8 right-6 lg:bottom-12 lg:right-20 flex gap-2'>
              {blogPosts.map((_, index) => (
                <button
                  key={index}
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => {
                    setCurrentIndex(index);
                    lastTransitionTimeRef.current = Date.now();
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'bg-white w-6'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Left/Right Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className='absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300'
          aria-label='Previous slide'
        >
          <IoChevronBackOutline size={24} />
        </button>
        <button
          onClick={goToNext}
          className='absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300'
          aria-label='Next slide'
        >
          <IoChevronForwardOutline size={24} />
        </button>
      </div>
    );
  };

  return (
    <div className='min-h-screen bg-[#f8f5f0]'>
      {/* Mobile Carousel */}
      <div className='lg:hidden w-full h-[60vh] mb-8'>
        <CarouselSection />
      </div>

      <div className='flex relative'>
        {/* Desktop Left Side - Fixed Carousel */}
        <div className='hidden lg:block w-1/2 sticky top-0 h-screen'>
          <CarouselSection />
        </div>

        {/* Right Side - Scrollable Blog Posts */}
        <div className='w-full lg:w-1/2 p-8 md:p-16'>
          <h1 className='font-serif text-4xl md:text-5xl lg:text-6xl text-gray-800 mb-16'>
            Latest Stories
          </h1>
          <div className='space-y-24 mb-24'>
            {blogPosts.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className='group cursor-pointer'
              >
                <div className='relative h-64 md:h-[500px] mb-6 overflow-hidden rounded-2xl'>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className='object-cover transition-transform duration-700 group-hover:scale-105'
                  />
                  <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500' />
                </div>
                <div className='space-y-4'>
                  <p className='text-sm text-gray-500'>
                    {post.date} / {post.category}
                  </p>
                  <h2 className='font-serif text-2xl md:text-3xl text-gray-800 transition-colors duration-300 group-hover:text-gray-600'>
                    {post.title}
                  </h2>
                  <p className='text-gray-600 leading-relaxed'>
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blogs/${post.id}`}
                    className='inline-block mt-4 text-sm font-medium text-gray-800 hover:text-gray-600 transition-colors duration-300'
                  >
                    Read More →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
