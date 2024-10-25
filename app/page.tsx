import Image from 'next/image';
import Navbar from './components/Navbar';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen bg-[#f8f5f0]'>
      <Navbar />

      <main className='flex-grow flex flex-col items-center justify-center px-4 py-8 md:py-12 relative'>
        <div className='w-full max-w-6xl relative'>
          <div className='z-10 mb-6 md:mb-0 md:absolute md:top-0 md:left-0'>
            <h2 className='font-serif text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-normal text-gray-800 leading-tight md:leading-none'>
              Let&apos;s make
            </h2>
            <h2 className='font-serif text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-normal text-gray-800 leading-tight md:leading-none md:-mt-2 lg:-mt-4'>
              poetry
            </h2>
            <h2 className='font-serif text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-normal text-gray-800 leading-tight md:leading-none md:-mt-2 lg:-mt-4'>
              together
            </h2>
          </div>

          <div className='relative z-0 md:ml-[20%] md:mt-24'>
            <Image
              src='/couple.png'
              alt='Wedding couple in desert'
              width={801}
              height={600}
              className='object-cover w-full h-auto grayscale'
              
            />
            <div className='hidden md:block absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#f8f5f0]/70 to-transparent h-1/3'></div>
          </div>

          <div className='mt-6 md:absolute md:bottom-0 md:left-0 md:right-0 md:p-6 z-10'>
            <p className='font-sans text-base md:text-lg text-gray-700 leading-relaxed text-center md:text-right max-w-full md:max-w-md ml-auto'>
              At Wedding Theory, we capture your special day with creativity and
              passion. From candid moments to timeless portraits, we preserve
              every memory. Let us tell your unique love story through our lens.
            </p>
          </div>
        </div>
      </main>

      <footer className='w-full bg-[#f8f5f0] py-4 text-center text-sm text-gray-600'>
        <p className='font-sans'>
          &copy; 2024 Wedding Theory. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
