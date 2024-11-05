"use client"

import Image from 'next/image'
import Link from 'next/link'
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube, FaPinterest, FaEnvelope, FaPhone, FaArrowUp } from 'react-icons/fa'
import { useEffect, useState } from 'react'

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Calculate 40% of page height
      const scrollThreshold = document.documentElement.scrollHeight * 0.3
      const shouldShow = window.scrollY > scrollThreshold
      setShowScrollTop(shouldShow)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer className='bg-white'>
      {/* Floating buttons container */}
      <div className='fixed bottom-12 sm:bottom-8 right-1 sm:right-8 flex flex-col items-center gap-2 sm:gap-4 z-50'>
        {/* Scroll to top button */}
        <button
          onClick={scrollToTop}
          className={`bg-[#544b47a3] w-12 h-12 sm:w-12 sm:h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-gray-700 active:bg-[#544b47a3] transition-all duration-300 transform ${
            showScrollTop
              ? 'translate-y-0 opacity-100'
              : 'translate-y-10 opacity-0 pointer-events-none'
          }`}
          aria-label='Scroll to top'
        >
          <FaArrowUp className='text-white w-5 h-5 sm:w-5 sm:h-5' />
        </button>

        {/* WhatsApp button */}
        <Link
          href='https://wa.me/919902584820'
          className='bg-[#25D366] w-12 h-12 sm:w-12 sm:h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-[#20bd5a] active:bg-[#25D366] transition-all'
          target='_blank'
          aria-label='Chat on WhatsApp'
        >
          <FaWhatsapp className='text-white w-7 h-7 sm:w-7 sm:h-7' />
        </Link>
      </div>

      <div className='max-w-7xl mx-auto px-4 py-12'>
        <div className='flex flex-col items-center space-y-8'>
          {/* Main logo */}
          <Link href='/'>
            <div className='w-48 h-auto'>
              <Image
                src='/weddinglogo.png'
                alt='Wedding Theory'
                width={200}
                height={100}
                className='w-full h-auto'
              />
            </div>
          </Link>
          {/* Contact Information */}
          <div className='flex flex-col items-center space-y-3 text-gray-600'>
            <Link
              href='tel:+919902584820'
              className='flex items-center gap-2 hover:text-gray-900'
            >
              <FaPhone className='w-5 h-5' />
              <span>+91 99025 84820</span>
            </Link>
            <Link
              href='mailto:wedddingtheoryofficial@gmail.com'
              className='flex items-center gap-2 hover:text-gray-900'
            >
              <FaEnvelope className='w-5 h-5' />
              <span>wedddingtheoryofficial@gmail.com</span>
            </Link>
          </div>

          {/* Social links with colored icons */}
          <div className='flex space-x-6'>
            <Link
              href='https://facebook.com'
              target='_blank'
              className='hover:opacity-80'
            >
              <FaFacebook className='w-8 h-8 text-[#1877F2]' />
            </Link>
            <Link
              href='https://instagram.com'
              target='_blank'
              className='hover:opacity-80'
            >
              <FaInstagram className='w-8 h-8 text-[#E4405F]' />
            </Link>
            <Link
              href='https://www.youtube.com/@weddingtheory3148'
              target='_blank'
              className='hover:opacity-80'
            >
              <FaYoutube className='w-8 h-8 text-[#FF0000]' />
            </Link>
            <Link
              href='https://in.pinterest.com/weddingtheoryofficial/_saved/'
              target='_blank'
              className='hover:opacity-80'
            >
              <FaPinterest className='w-8 h-8 text-[#E60023]' />
            </Link>
          </div>

          {/* Navigation links */}
          <div className='flex flex-wrap justify-center gap-8 text-sm text-gray-600'>
            <Link href='/about' className='hover:text-gray-900'>
              About
            </Link>
            <Link href='/contact' className='hover:text-gray-900'>
              Contact
            </Link>
            <Link href='/blogs' className='hover:text-gray-900'>
              Blogs
            </Link>
            <Link href='/testimonial' className='hover:text-gray-900'>
              Testimonial
            </Link>
          </div>

          {/* Copyright */}
          <div className='text-sm text-gray-500'>
            © {new Date().getFullYear()} Wedding Theory. All rights reserved.
          </div>

          {/* Developer Credit */}
          <div className='text-sm text-gray-500'>
            Designed and developed with ❤️ by{' '}
            <Link href='https://www.abhinavkr.in/' target='_blank' rel='noopener noreferrer' prefetch={false} className='hover:text-gray-900'>
              Abhinav Kumar
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer