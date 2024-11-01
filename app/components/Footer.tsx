import Image from 'next/image'
import Link from 'next/link'
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube, FaPinterest, FaEnvelope, FaPhone } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-white">
      {/* WhatsApp floating button */}
      <Link 
        href="https://wa.me/919902584820" 
        className="fixed bottom-8 right-8 bg-[#25D366] w-14 h-14 flex items-center justify-center rounded-full shadow-lg hover:bg-[#20bd5a] transition-all z-50"
        target="_blank"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-white w-8 h-8" />
      </Link>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center space-y-8">
          {/* Main logo */}
          <div className="w-48 h-auto">
            <Image
              src="/weddinglogo.png"
              alt="Wedding Theory"
              width={200}
              height={100}
              className="w-full h-auto"
            />
          </div>

          {/* Contact Information */}
          <div className="flex flex-col items-center space-y-3 text-gray-600">
            <Link href="tel:+919902584820" className="flex items-center gap-2 hover:text-gray-900">
              <FaPhone className="w-5 h-5" />
              <span>+91 99025 84820</span>
            </Link>
            <Link href="mailto:wedddingtheoryofficial@gmail.com" className="flex items-center gap-2 hover:text-gray-900">
              <FaEnvelope className="w-5 h-5" />
              <span>wedddingtheoryofficial@gmail.com</span>
            </Link>
          </div>

          {/* Social links with colored icons */}
          <div className="flex space-x-6">
            <Link href="https://facebook.com" target="_blank" className="hover:opacity-80">
              <FaFacebook className="w-8 h-8 text-[#1877F2]" />
            </Link>
            <Link href="https://instagram.com" target="_blank" className="hover:opacity-80">
              <FaInstagram className="w-8 h-8 text-[#E4405F]" />
            </Link>
            <Link href="https://www.youtube.com/@weddingtheory3148" target="_blank" className="hover:opacity-80">
              <FaYoutube className="w-8 h-8 text-[#FF0000]" />
            </Link>
            <Link href="https://in.pinterest.com/weddingtheoryofficial/_saved/" target="_blank" className="hover:opacity-80">
              <FaPinterest className="w-8 h-8 text-[#E60023]" />
            </Link>
          </div>

          {/* Navigation links */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
            <Link href="/about" className="hover:text-gray-900">About</Link>
            <Link href="/contact" className="hover:text-gray-900">Contact</Link>
            <Link href="/blog" className="hover:text-gray-900">Blog</Link>
            <Link href="/testimonial" className="hover:text-gray-900">Testimonial</Link>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} Wedding Theory. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer