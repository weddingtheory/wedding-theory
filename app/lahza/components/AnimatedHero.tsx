'use client';

import Image from 'next/image';

export default function AnimatedHero() {
  return (
    <section className='relative h-[70vh] md:h-[90vh] w-full overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-b from-black/40 to-black/20 z-10' />
      <Image
        src='https://ik.imagekit.io/weddingtheory/Photos/0A4A8443-Edit.jpg?updatedAt=1730140135728'
        alt='LAHZA by Wedding Theory'
        fill
        className='object-cover'
        priority
        unoptimized
      />
      {/* <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className='absolute inset-0 z-20 flex flex-col items-center justify-center text-white'
      >
        <motion.h1 
          initial={{ letterSpacing: "0.1em", opacity: 0 }}
          animate={{ letterSpacing: "0.2em", opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className='font-serif text-4xl md:text-8xl text-center'
        >
          L A H Z A
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className='font-sans text-xl md:text-2xl mt-6 text-center font-light tracking-wider'
        >
          Signature Weddings by Wedding Theory
        </motion.p>
      </motion.div> */}
    </section>
  );
} 