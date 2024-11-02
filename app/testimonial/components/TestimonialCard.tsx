'use client';

import { motion } from 'framer-motion';

interface TestimonialCardProps {
  name: string;
  content: string[];
  imageUrl: string;
  videoUrl: string;
  reverse?: boolean;
}

export default function TestimonialCard({
  name,
  content,
  imageUrl,
  videoUrl,
  reverse = false
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

  return (
    <motion.div 
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${reverse ? 'md:direction-rtl' : ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* Quote Section */}
      <motion.div 
        className={`order-2 ${reverse ? 'md:order-2' : 'md:order-1'}`}
        variants={itemVariants}
      >
        <div className='relative'>
          <motion.span 
            className='absolute -top-20 -left-4 text-[120px] text-gray-200 font-serif'
            initial={{ opacity: 0, rotate: -10 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            &ldquo;
          </motion.span>
          <div className='space-y-6'>
            <motion.h2 
              className='font-serif text-3xl md:text-6xl text-gray-800 leading-tight'
              variants={itemVariants}
            >
              {name}
            </motion.h2>
            <motion.div 
              className='text-gray-600 text-md leading-relaxed space-y-4'
              variants={itemVariants}
            >
              {content.map((paragraph, index) => (
                <motion.p 
                  key={index}
                  variants={itemVariants}
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "tween", duration: 0.2 }}
            >
              <a
                href={videoUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center px-6 py-3 bg-[#FDF8F7] hover:bg-[#FAF0EE] text-gray-800 rounded-lg transition-colors duration-300 border border-[#E8E0DE]'
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
          </div>
        </div>
      </motion.div>

      {/* Image Section */}
      <motion.div 
        className={`order-1 ${reverse ? 'md:order-1' : 'md:order-2'}`}
        variants={imageVariants}
      >
        <motion.div 
          className='relative aspect-[4/5] w-full max-w-md mx-auto overflow-hidden rounded-lg shadow-lg'
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