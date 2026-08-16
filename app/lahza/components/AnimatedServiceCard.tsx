'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ServiceCardProps {
  index: string;
  eyebrow: string;
  title: string;
  description: string;
  media: ReactNode;
  reverse?: boolean;
}

export default function AnimatedServiceCard({
  index,
  eyebrow,
  title,
  description,
  media,
  reverse = false,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
      className='group border-t border-neutral-300 pt-10 md:pt-14 w-full'
    >
      <div
        className={`flex flex-col ${
          reverse ? 'md:flex-row-reverse' : 'md:flex-row'
        } gap-8 md:gap-16 items-start md:items-center`}
      >
        <div className='flex-1 space-y-5 md:space-y-6'>
          <div className='flex items-baseline gap-4'>
            <span className='text-sm tracking-[0.2em] text-neutral-400 [font-family:var(--font-lahza-display)]'>
              {index}
            </span>
            <span className='text-xs tracking-[0.3em] text-neutral-500 uppercase'>
              {eyebrow}
            </span>
          </div>
          <h3 className='text-3xl md:text-4xl text-neutral-900 [font-family:var(--font-lahza-display)] font-medium relative inline-block'>
            {title}
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className='absolute left-0 -bottom-2 h-[1.5px] bg-[#68401b]'
            />
          </h3>
          <p className='text-neutral-600 leading-relaxed text-base md:text-lg max-w-md'>
            {description}
          </p>
        </div>
        <motion.div
          whileHover={{ scale: 1.015 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className='flex-1 w-full'
        >
          {media}
        </motion.div>
      </div>
    </motion.div>
  );
}
