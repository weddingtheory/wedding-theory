import Carousel from './components/Carousel';
import ImageCarousel from './components/ImageCarousel';
import VideoGallery from './components/VideoGallery';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen bg-[#f8f5f0]'>
      <main className='flex-grow flex flex-col items-center justify-center px-4 py-4 md:py-8'>
        <div className='w-full max-w-6xl mx-auto relative'>
          <div className='text-center md:text-left z-10 mb-8 md:mb-0 md:absolute md:top-0 md:left-0'>
            <h2 className='font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-normal text-gray-800 leading-tight md:leading-none'>
              Celebrating
            </h2>
            <h2 className='font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-normal text-gray-800 leading-tight md:leading-none md:-mt-1 lg:-mt-2'>
              Indian
            </h2>
            <h2 className='font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-normal text-gray-800 leading-tight md:leading-none md:-mt-1 lg:-mt-2'>
              love stories
            </h2>
          </div>

          <div className='relative z-0 md:ml-[15%] md:mt-24'>
            <div className='w-[90%] mx-auto md:w-full h-[45vh] md:h-[75vh] max-h-[800px]'>
              <Carousel />
            </div>
            <div className='mt-8 text-center'>
              <Link
                href='/contact'
                className='inline-block px-10 py-3.5 text-sm md:text-base 
                    bg-[#68401b] hover:bg-[#5e4429] 
                    text-white font-medium 
                    rounded-full border border-[#D4B08C]
                    transition-all duration-300 ease-in-out
                    shadow-[0_4px_14px_0_rgba(198,160,124,0.39)]
                    hover:shadow-[0_6px_20px_rgba(198,160,124,0.45)]
                    hover:transform hover:scale-105
                    tracking-wide'
              >
                Get in Touch
              </Link>
            </div>
            <div className='mt-8 md:mt-10'>
              <p className='font-sans text-sm md:text-base text-gray-700 leading-relaxed text-center max-w-2xl mx-auto'>
                At Wedding Theory, we capture the vibrant colors and rich
                traditions of Indian weddings. From the mehndi ceremony to the
                grand reception, we preserve every precious moment. Let us weave
                your love story into a tapestry of beautiful memories.
              </p>
            </div>
          </div>
        </div>
      </main>

      <section className='w-full h-[60vh] md:h-screen bg-[#f8f5f0] px-4 md:px-8'>
        <div className='h-full w-full max-w-[1400px] mx-auto rounded-2xl overflow-hidden'>
          <ImageCarousel />
        </div>
      </section>

      {/* Video Gallery Section */}
      <section className='w-full px-4 md:px-8 py-8'>
        <VideoGallery />
      </section>
    </div>
  );
}
