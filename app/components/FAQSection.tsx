'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

const AnimatedSection = dynamic(() => import('./AnimatedSection'), { ssr: false });

const faqData = [
  {
    id: 1,
    question: 'How much does wedding photography cost in Bangalore?',
    answer:
      'Wedding photography costs in Bangalore vary by style, location, deliverables, and timeline. Budget-friendly wedding photography packages range from ₹1.5-2 lakhs, while luxury packages range from ₹3-5 lakhs.',
  },
  {
    id: 2,
    question: 'What is included in your wedding photography package?',
    answer:
      'Our packages include candid photography and videography, traditional coverage, and cinematic wedding films. Add-ons such as pre-wedding shoots, albums, drone shots, and wedding reels can be added as needed.',
  },
  {
    id: 3,
    question: 'How many days does it take to receive the final edited photos and videos?',
    answer:
      'You will receive 50-60 edited photos within 24 hours of the wedding. The full photo set will be delivered in 20 days, the candid wedding film in 45 days, and the traditional wedding video in 75 days.',
  },
  {
    id: 4,
    question: 'What type of weddings do you cover in Bangalore?',
    answer:
      'We cover all types of weddings in Bangalore, including South Indian, North Indian, Christian, and Muslim weddings.',
  },
  {
    id: 5,
    question: 'How can we contact you or get a quotation?',
    answer:
      'You can reach out to us directly via phone call or WhatsApp on +91 9902584820. For detailed enquiries and quotations, you can also email us at weddingtheoryofficial@gmail.com',
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  const renderAnswer = (item: (typeof faqData)[0]) => {
    if (item.id === 5) {
      return (
        <p className='font-sans text-gray-600 text-sm md:text-base lg:text-lg leading-relaxed'>
          You can reach out to us directly via phone call or WhatsApp on{' '}
          <a
            href='tel:+919902584820'
            className='text-[#68401b] font-medium underline decoration-[#D4B08C]/60 underline-offset-2 hover:decoration-[#68401b] hover:text-[#5e4429] transition-colors'
          >
            +91 9902584820
          </a>
          . For detailed enquiries and quotations, you can also email us at{' '}
          <a
            href='mailto:weddingtheoryofficial@gmail.com'
            className='text-[#68401b] font-medium underline decoration-[#D4B08C]/60 underline-offset-2 hover:decoration-[#68401b] hover:text-[#5e4429] transition-colors'
          >
            weddingtheoryofficial@gmail.com
          </a>
        </p>
      );
    }
    return (
      <p className='font-sans text-gray-600 text-sm md:text-base lg:text-lg leading-relaxed'>
        {item.answer}
      </p>
    );
  };

  return (
    <AnimatedSection className='w-full bg-[#f8f5f0] pt-14 pb-20 md:pt-20 md:pb-28'>
      <div className='max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 lg:px-8'>
        {/* Section header */}
        <div className='text-center mb-12 md:mb-16 lg:mb-20'>
          <h3 className='font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-800 mb-4'>
            Frequently Asked Questions
          </h3>
          <div className='w-20 lg:w-24 h-[1px] bg-[#D4B08C] mx-auto mb-6' />
          <p className='font-sans text-gray-600 text-sm md:text-base lg:text-lg max-w-xl mx-auto'>
            Everything you need to know about our wedding photography services
          </p>
        </div>

        {/* Accordion */}
        <div className='space-y-3 lg:space-y-4'>
          {faqData.map((item) => {
            const isOpen = openId === item.id;
            return (
              <motion.div
                key={item.id}
                layout
                className='rounded-xl overflow-hidden border border-[#D4B08C]/30 bg-white/80 backdrop-blur-sm shadow-[0_2px_12px_rgba(212,176,140,0.08)] hover:shadow-[0_4px_20px_rgba(212,176,140,0.12)] transition-shadow duration-300'
                initial={false}
              >
                <button
                  type='button'
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className='w-full flex items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5 lg:px-8 lg:py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B08C] focus-visible:ring-offset-2 rounded-xl'
                  aria-expanded={isOpen ? 'true' : 'false'}
                  aria-controls={`faq-answer-${item.id}`}
                  id={`faq-question-${item.id}`}
                >
                  <span className='font-serif text-gray-800 text-base md:text-lg lg:text-xl leading-snug pr-2'>
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className='flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[#D4B08C]/20 flex items-center justify-center text-[#68401b]'
                    aria-hidden
                  >
                    <svg
                      className='w-4 h-4 lg:w-5 lg:h-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 9l-7 7-7-7'
                      />
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${item.id}`}
                      role='region'
                      aria-labelledby={`faq-question-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                        transition: {
                          height: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
                          opacity: { duration: 0.25, delay: 0.05 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                          opacity: { duration: 0.2 },
                        },
                      }}
                      className='overflow-hidden'
                    >
                      <div className='px-5 pb-4 md:px-6 md:pb-5 lg:px-8 lg:pb-6 pt-0'>
                        <div className='border-l-2 border-[#D4B08C]/60 pl-4 md:pl-5 lg:pl-6'>
                          {renderAnswer(item)}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
