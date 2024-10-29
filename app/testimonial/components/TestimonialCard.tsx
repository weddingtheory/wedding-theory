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
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${reverse ? 'md:direction-rtl' : ''}`}>
      {/* Quote Section */}
      <div className={`order-2 ${reverse ? 'md:order-2' : 'md:order-1'}`}>
        <div className='relative'>
          <span className='absolute -top-20 -left-4 text-[120px] text-gray-200 font-serif'>
            &ldquo;
          </span>
          <div className='space-y-6'>
            <h2 className='font-serif text-4xl md:text-6xl text-gray-800 leading-tight'>
              {name}
            </h2>
            <div className='text-gray-600 text-lg leading-relaxed space-y-4'>
              {content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <motion.div
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
                <span className="ml-2">→</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className={`order-1 ${reverse ? 'md:order-1' : 'md:order-2'}`}>
        <motion.div 
          className='relative aspect-[4/5] w-full max-w-md mx-auto overflow-hidden rounded-lg shadow-lg'
          whileHover={{ scale: 1.03 }}
          transition={{ type: "tween", duration: 0.3 }}
        >
          <motion.img
            src={imageUrl}
            alt={`${name} Wedding`}
            className='w-full h-full object-cover'
            whileHover={{ scale: 1.07 }}
            transition={{ type: "tween", duration: 0.3 }}
          />
          <motion.div 
            className='absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-20 transition-all duration-300'
            whileHover={{ opacity: 1 }}
            initial={{ opacity: 0 }}
          />
        </motion.div>
      </div>
    </div>
  );
} 