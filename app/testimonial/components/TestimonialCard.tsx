'use client';

import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface TestimonialCardProps {
  name: string;
  content: string[];
  imageUrl: string;
  videoUrl: string;
  reverse?: boolean;
  location?: string | null;
  weddingDate?: string | null;
}

export default function TestimonialCard({
  name,
  content,
  imageUrl,
  videoUrl,
  reverse = false,
  location,
  weddingDate
}: TestimonialCardProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0,
      x: reverse ? -50 : 50
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const formattedDate = weddingDate 
    ? format(new Date(weddingDate), 'MMMM d, yyyy')
    : null;

  return (
    <motion.div 
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${reverse ? 'md:direction-rtl' : ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* Quote Section */}
      <motion.div 
        className={`order-2 md:order-${reverse ? '2' : '1'} px-4 md:px-0`}
        variants={itemVariants}
      >
        <div className='relative'>
          <motion.span 
            className='absolute -top-16 md:-top-20 -left-2 md:-left-4 text-[80px] md:text-[120px] text-gray-300 font-serif'
            initial={{ opacity: 0, rotate: -10 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            &ldquo;
          </motion.span>
          <div className='space-y-4 md:space-y-6'>
            <motion.h2 
              className='font-serif text-2xl md:text-3xl lg:text-6xl text-gray-800 leading-tight mt-6 md:mt-0'
              variants={itemVariants}
            >
              {name}
            </motion.h2>
            {(location || formattedDate) && (
              <motion.div 
                className='flex flex-wrap gap-3 md:gap-4 text-gray-600 text-sm md:text-base'
                variants={itemVariants}
              >
                {location && (
                  <div className='flex items-center gap-1.5 md:gap-2'>
                    <svg className='w-4 h-4 md:w-5 md:h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                    </svg>
                    <span>{location}</span>
                  </div>
                )}
                {formattedDate && (
                  <div className='flex items-center gap-1.5 md:gap-2'>
                    <svg className='w-4 h-4 md:w-5 md:h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                    </svg>
                    <span>{formattedDate}</span>
                  </div>
                )}
              </motion.div>
            )}
            <motion.div 
              className='text-gray-600 text-sm md:text-md leading-relaxed space-y-3 md:space-y-4'
              variants={itemVariants}
            >
              {content.map((paragraph, index) => (
                <motion.p 
                  key={index}
                  variants={itemVariants}
                  className='leading-relaxed'
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>
            {videoUrl && videoUrl !== '#' && (
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "tween", duration: 0.2 }}
                className='pt-2 md:pt-4'
              >
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='inline-flex items-center px-5 md:px-6 py-2.5 md:py-3 bg-[#FDF8F7] hover:bg-[#FAF0EE] text-gray-800 rounded-lg transition-colors duration-300 border border-[#E8E0DE] text-sm md:text-base shadow-sm hover:shadow-md'
                >
                  <span>View their wedding</span>
                  <motion.span 
                    className="ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    →
                  </motion.span>
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Image Section */}
      <motion.div 
        className={`order-1 md:order-${reverse ? '1' : '2'} px-4 md:px-0`}
        variants={imageVariants}
      >
        <motion.div 
          className='relative aspect-[4/5] w-full max-w-[280px] sm:max-w-[320px] md:max-w-md mx-auto overflow-hidden rounded-xl md:rounded-2xl shadow-lg'
          whileHover={{ scale: 1.03 }}
          transition={{ type: "tween", duration: 0.3 }}
        >
          <motion.img
            src={imageUrl}
            alt={`${name} Wedding`}
            className='w-full h-full object-cover'
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            whileHover={{ scale: 1.07 }}
          />
          <motion.div 
            className='absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-20 transition-all duration-300'
            whileHover={{ opacity: 1 }}
            initial={{ opacity: 0 }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
} 