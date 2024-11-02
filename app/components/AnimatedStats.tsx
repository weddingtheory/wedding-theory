'use client';

import { motion } from 'framer-motion';

interface Stat {
  number: string;
  label: string;
}

interface AnimatedStatsProps {
  stats: Stat[];
}

export default function AnimatedStats({ stats }: AnimatedStatsProps) {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto mb-16'>
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className='text-center transform hover:scale-105 transition-transform duration-300'
        >
          <div className='font-serif text-4xl md:text-5xl text-[#68401b] mb-3'>
            {stat.number}
          </div>
          <div className='text-sm md:text-base text-gray-600'>
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
} 