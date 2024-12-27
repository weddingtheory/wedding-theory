'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  media: ReactNode;
  reverse?: boolean;
}

export default function AnimatedServiceCard({
  title,
  description,
  icon,
  media,
  reverse = false,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
      className='group bg-white p-10 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 w-full'
    >
      <div
        className={`flex flex-col ${
          reverse ? 'md:flex-row-reverse' : 'md:flex-row'
        } gap-10 items-center`}
      >
        <div className='flex-1 space-y-6'>
          <div className='flex items-center space-x-4'>
            <div className='w-12 h-12 rounded-full bg-[#412e0d] flex items-center justify-center'>
              {icon}
            </div>
            <h3 className='font-serif text-3xl text-gray-800'>{title}</h3>
          </div>
          <p className='font-sans text-gray-800 leading-relaxed text-lg'>
            {description}
          </p>
        </div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className='flex-1 w-full'
        >
          {media}
        </motion.div>
      </div>
    </motion.div>
  );
}
